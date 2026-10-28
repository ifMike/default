const { test, expect } = require("@playwright/test");

async function pressDigit(page, digit) {
  await page.locator(`[data-digit="${digit}"]`).click();
}

test("shows running total, adds two numbers, and clears", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("total")).toHaveText("0");

  await pressDigit(page, "2");
  await expect(page.getByTestId("total")).toHaveText("2");

  await page.getByTestId("add").click();
  await expect(page.getByTestId("total")).toHaveText("2");

  await pressDigit(page, "3");
  await expect(page.getByTestId("total")).toHaveText("3");

  await page.getByTestId("equals").click();
  await expect(page.getByTestId("total")).toHaveText("5");

  await page.getByTestId("clear").click();
  await expect(page.getByTestId("total")).toHaveText("0");
});
