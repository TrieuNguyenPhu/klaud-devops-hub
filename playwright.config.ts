import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests", testMatch: "**/*.spec.ts", fullyParallel: false, workers: 1,
  timeout: 60000, reporter: "list", outputDir: ".qa/test-results",
  use: { baseURL: "http://localhost:3000", browserName: "chromium", channel: process.env.CI ? undefined : "chrome", headless: true, viewport: { width: 1440, height: 1000 }, screenshot: "only-on-failure", trace: "retain-on-failure" },
  webServer: { command: "npm run start -- --port 3000", url: "http://localhost:3000", reuseExistingServer: !process.env.CI, timeout: 60000 },
});
