import type { Page } from "@playwright/test";

// The lawBus `up` slice: everything the remote pushes back to the host.
export type UpState = {
  resource: { resID: string; amount: number }[][];
  mine: { resID: string; amount: number }[][];
  history: string[][];
  bonus: { law: number };
  hydrated: boolean;
};

// Minimal shape of the globalThis-pinned BehaviorSubject the bus exposes.
type Bus = {
  getValue: () => { down: Record<string, unknown>; up: UpState };
  next: (value: unknown) => void;
};

/**
 * Load the standalone board and push host state DOWN so the remote renders the
 * given faction at a law level derived from `resLaw`. Resolves once that
 * faction's board is on screen.
 */
export const openBoard = async (
  page: Page,
  faction: string,
  resLaw = 143_000,
): Promise<void> => {
  await page.goto("/");
  // Wait for the bus module to load and pin itself on window.
  await page.waitForFunction(() => "__lawState$" in window);

  await page.evaluate(
    ({ faction, resLaw }) => {
      const s = (window as unknown as { __lawState$: Bus }).__lawState$;
      const prev = s.getValue();
      s.next({
        ...prev,
        down: { ...prev.down, faction, resLaw, historyIDX: 0 },
      });
    },
    { faction, resLaw },
  );

  await page.locator(`[data-faction="${faction}"]`).waitFor();
};

export const law = (page: Page, id: string) =>
  page.getByTestId(`law-${id}`);

export const level = async (page: Page, id: string): Promise<number> =>
  Number(await law(page, id).getAttribute("data-level"));

export const locked = async (page: Page, id: string): Promise<boolean> =>
  (await law(page, id).getAttribute("data-locked")) === "true";

export const enact = (page: Page, id: string): Promise<void> =>
  law(page, id).click();

export const readUp = (page: Page): Promise<UpState> =>
  page.evaluate(() =>
    (window as unknown as { __lawState$: Bus }).__lawState$.getValue().up,
  );
