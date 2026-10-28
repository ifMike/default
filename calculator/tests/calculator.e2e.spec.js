import { test, expect } from "@playwright/test";

test.describe("calculator page", () => {
  test("running total, add, and clear", async ({ page }) => {
    await page.goto("/index.html");

    const display = page.getByTestId("display");
    await expect(display).toHaveText("0");

    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await expect(display).toHaveText("12");

    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "Add" }).click();
    await expect(display).toHaveText("46");

    await page.getByRole("button", { name: "AC" }).click();
    await expect(display).toHaveText("0");
  });
});
