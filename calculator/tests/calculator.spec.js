import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const calculatorPage = `file://${path.join(__dirname, "..", "index.html")}`;

test.describe("Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(calculatorPage);
  });

  test("shows a running total", async ({ page }) => {
    await expect(page.getByTestId("running-total")).toHaveText("0");
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByTestId("key-add").click();
    await expect(page.getByTestId("running-total")).toHaveText("2");
  });

  test("adding two numbers shows the correct sum", async ({ page }) => {
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByTestId("key-add").click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByTestId("key-equals").click();
    await expect(page.getByTestId("running-total")).toHaveText("5");
    await expect(page.getByTestId("display")).toHaveText("0");
  });

  test("clear resets the display and running total", async ({ page }) => {
    await page.getByRole("button", { name: "9", exact: true }).click();
    await page.getByTestId("key-add").click();
    await expect(page.getByTestId("running-total")).toHaveText("9");
    await page.getByTestId("key-clear").click();
    await expect(page.getByTestId("display")).toHaveText("0");
    await expect(page.getByTestId("running-total")).toHaveText("0");
  });
});
