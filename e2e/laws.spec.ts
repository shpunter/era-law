import { expect, test } from "@playwright/test";
import { enact, level, locked, openBoard, readUp } from "./helpers";

// hive laws are gated by cumulative law-points spent (`limit`):
//   limit 0  → l000, l010, l020, l030   (always open)
//   limit 5  → l100, l110, l120
//   limit 15 → l200, l210, l220
//   limit 30 → l300, l310
//   limit 50 → l400, l410, l420
// resLaw 143_000 → hero level 54, so affordability is never the blocker here;
// the only gate exercised is the spend/limit lock.

test.describe("law lock (spend gate)", () => {
  test("laws above the spent-point threshold are locked and cannot be enacted", async ({
    page,
  }) => {
    await openBoard(page, "hive");

    // Nothing spent yet: only the limit-0 tier is open.
    expect(await locked(page, "l000")).toBe(false);
    expect(await locked(page, "l100")).toBe(true);
    expect(await locked(page, "l200")).toBe(true);
    expect(await locked(page, "l300")).toBe(true);
    expect(await locked(page, "l400")).toBe(true);

    // Clicking a locked law is a no-op: no level gained, nothing pushed up.
    await enact(page, "l200");
    expect(await level(page, "l200")).toBe(0);
    expect((await readUp(page)).history.flat()).not.toContain("l200");
  });

  test("spending enough points unlocks the next tier only", async ({ page }) => {
    await openBoard(page, "hive");

    // Spend 6 on an always-open law (l020: limit 0, cost 2, max 3).
    await enact(page, "l020");
    await enact(page, "l020");
    await enact(page, "l020");
    await expect.poll(() => level(page, "l020")).toBe(3);

    // limit-5 tier is now open; higher tiers stay locked.
    await expect.poll(() => locked(page, "l100")).toBe(false);
    expect(await locked(page, "l200")).toBe(true);
    expect(await locked(page, "l300")).toBe(true);
    expect(await locked(page, "l400")).toBe(true);

    // The freshly unlocked law can now be enacted.
    await enact(page, "l100");
    await expect.poll(() => level(page, "l100")).toBe(1);
  });
});

test.describe("bus patchUp", () => {
  test("hydration flag is pushed up once persisted state is loaded", async ({
    page,
  }) => {
    await openBoard(page, "hive");

    // The remote flips `up.hydrated` to true once its IDB read completes, so the
    // host can drop its loading state.
    await expect.poll(async () => (await readUp(page)).hydrated).toBe(true);
  });


  test("daily-income law pushes a mine entry up", async ({ page }) => {
    await openBoard(page, "hive");

    // Reach the limit-5 tier, then enact a daily law (l100: +250 gold/day).
    await enact(page, "l020");
    await enact(page, "l020");
    await enact(page, "l020");
    await enact(page, "l100");

    await expect
      .poll(async () => (await readUp(page)).history.flat())
      .toContain("l100");

    const up = await readUp(page);
    expect(up.mine[0]).toContainEqual({ resID: "gold", amount: 250 });
  });

  test("once-income law pushes resource entries up", async ({ page }) => {
    await openBoard(page, "hive");

    // l000: one-time 2500 gold / 5 wood / 5 ore, limit 0.
    await enact(page, "l000");

    await expect
      .poll(async () => (await readUp(page)).history.flat())
      .toContain("l000");

    const up = await readUp(page);
    expect(up.resource[0]).toContainEqual({ resID: "gold", amount: 2500 });
    expect(up.resource[0]).toContainEqual({ resID: "wood", amount: 5 });
    expect(up.resource[0]).toContainEqual({ resID: "ore", amount: 5 });
    // No daily law enacted → no mine output.
    expect(up.mine.flat()).toHaveLength(0);
  });
});
