import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const calculatorPage = `file://${path.join(__dirname, "..", "index.html")}`;

async function tap(page, label) {
  await page.getByRole("button", { name: label, exact: true }).click();
}

test.describe("Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(calculatorPage);
  });

  test("shows a running total label while adding", async ({ page }) => {
    await expect(page.locator("#display")).toHaveText("0");

    await tap(page, "5");
    await tap(page, "+");
    await expect(page.locator("#running-total")).toHaveText("5");

    await tap(page, "3");
    await expect(page.locator("#running-total")).toHaveText("5 +");
    await tap(page, "=");
    await expect(page.locator("#display")).toHaveText("8");
    await expect(page.locator("#running-total")).toHaveText("8");
  });

  test("adding two numbers shows the correct sum", async ({ page }) => {
    await tap(page, "7");
    await tap(page, "+");
    await tap(page, "5");
    await tap(page, "=");
    await expect(page.locator("#display")).toHaveText("12");
  });

  test("clear resets the display", async ({ page }) => {
    await tap(page, "9");
    await tap(page, "+");
    await tap(page, "1");
    await tap(page, "=");
    await expect(page.locator("#display")).toHaveText("10");

    await tap(page, "AC");
    await expect(page.locator("#display")).toHaveText("0");
    await expect(page.locator("#running-total")).toHaveText("");
  });
});
