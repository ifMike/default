import { test, expect } from "@playwright/test";

test.describe("Calculator page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/index.html");
  });

  test("shows a running total label and initial zero", async ({ page }) => {
    await expect(page.getByTestId("running-total-label")).toHaveText("Running total");
    await expect(page.getByTestId("display")).toHaveText("0");
  });

  test("adding two numbers shows the correct sum", async ({ page }) => {
    await page.getByTestId("btn-2").click();
    await page.getByTestId("btn-add").click();
    await page.getByTestId("btn-3").click();
    await page.getByTestId("btn-add").click();
    await expect(page.getByTestId("display")).toHaveText("5");
  });

  test("clear resets the display", async ({ page }) => {
    await page.getByTestId("btn-7").click();
    await page.getByTestId("btn-add").click();
    await expect(page.getByTestId("display")).toHaveText("7");
    await page.getByTestId("btn-clear").click();
    await expect(page.getByTestId("display")).toHaveText("0");
  });
});
