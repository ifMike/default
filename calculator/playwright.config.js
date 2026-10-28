const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:4173",
  },
  webServer: {
    command: "npx --yes serve -l 4173 .",
    cwd: __dirname,
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
  },
});
