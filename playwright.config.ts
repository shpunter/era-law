import { defineConfig, devices } from "@playwright/test";

// E2E runs against the standalone dev server (`vite`), which mounts the remote
// as a plain React app. Tests drive host-pushed state through the lawBus
// (window.__lawState$) and read enacted-law output back off the same bus.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:8085",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:8085",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
