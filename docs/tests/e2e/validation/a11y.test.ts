import { test, expect } from "@playwright/test"

// Basic a11y checks for the Validation page

test("name input has required and aria-describedby", async ({ page }) => {
  await page.goto("/validation/")
  const input = page.locator("#name")
  await expect(await input.getAttribute("required")).not.toBeNull()
  await expect(input).toHaveAttribute("aria-describedby", "name-error")
})

test("aria-live region updates on blur", async ({ page }) => {
  await page.goto("/validation/")
  await page.focus("#name")
  await page.keyboard.press("Tab")
  await expect(page.locator("#name-error")).toHaveText("Required")
})
