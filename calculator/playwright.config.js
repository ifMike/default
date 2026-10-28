import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  webServer: {
    command: "python3 -m http.server 8765",
    url: "http://127.0.0.1:8765",
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://127.0.0.1:8765",
    headless: true,
  },
});
