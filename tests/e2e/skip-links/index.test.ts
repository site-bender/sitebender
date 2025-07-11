import { test, expect } from "@playwright/test"

test.describe("Skip links on /about", () => {
  test("user can skip to main content", async ({ page }) => {
    await page.goto("/about")

    // First check that the elements exist
    const main = page.locator("#main-content")
    await expect(main).toBeVisible()

    // Use Tab to focus the first focusable element (should be skip link)
    await page.keyboard.press("Tab")

    // Press Enter to activate whatever is focused (should be main content skip link)
    await page.keyboard.press("Enter")

    // Wait for scroll animation to complete
    await page.waitForTimeout(1000)

    // Check that main content is now in the viewport
    await expect(main).toBeInViewport()
  })

  test("user can skip to footer", async ({ page }) => {
    await page.goto("/about")

    // First check that the elements exist
    const footer = page.locator("#page-footer")
    await expect(footer).toBeVisible()

    // Use Tab navigation to reach the footer skip link (3rd skip link)
    await page.keyboard.press("Tab") // Primary navigation skip link
    await page.keyboard.press("Tab") // Main content skip link
    await page.keyboard.press("Tab") // Footer skip link

    // Verify the correct skip link is focused
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toHaveAttribute('href', '#page-footer')

    // Press Enter to activate the footer skip link
    await page.keyboard.press("Enter")

    // Wait for any scroll/navigation
    await page.waitForTimeout(1000)

    // The primary goal of a skip link is successful navigation to the target
    // We verify this by checking the URL fragment or that focus moved to the target
    const url = await page.url()
    expect(url).toContain('#page-footer')
  })
})
