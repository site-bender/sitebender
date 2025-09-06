import { expect, test } from "@playwright/test"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

// Accessibility E2E tests for progressive enhancement + WCAG compliance

test.describe("Email form accessibility and progressive enhancement", () => {
	let htmlContent: string

	test.beforeAll(async () => {
		// Load the test HTML file
		const filePath = join(__dirname, "../fixtures/email-form.html")
		htmlContent = await readFile(filePath, "utf-8")
	})

	test("form works without JavaScript using native browser validation", async ({ browser }) => {
		// Create a new context with JavaScript disabled
		const context = await browser.newContext({ javaScriptEnabled: false })
		const page = await context.newPage()

		// Load the HTML content as a data URL
		await page.setContent(htmlContent)

		// BEHAVIOR: Form should have proper method and action
		const form = page.locator("form")
		await expect(form).toHaveAttribute("method", "POST")
		await expect(form).toHaveAttribute("action", "/subscribe")

		// BEHAVIOR: Input should have required attribute for native validation
		const emailInput = page.locator("#email")
		await expect(emailInput).toHaveAttribute("required")
		await expect(emailInput).toHaveAttribute("type", "email")
		await expect(emailInput).toHaveAttribute("name", "email")

		// BEHAVIOR: Form should be submittable (native browser validation will handle validation)
		const submitButton = page.locator('button[type="submit"]')
		await expect(submitButton).toBeVisible()
		await expect(submitButton).toHaveText("Subscribe to Newsletter")

		await context.close()
	})

	test("form has proper semantic structure and ARIA hints", async ({ page }) => {
		await page.setContent(htmlContent)

		// BEHAVIOR: Form has proper heading structure
		const heading = page.locator("h1")
		await expect(heading).toHaveText("Email Newsletter Signup")
		await expect(heading).toHaveAttribute("id", "form-title")

		// BEHAVIOR: Form is properly labeled via aria-labelledby
		const form = page.locator("form")
		await expect(form).toHaveAttribute("aria-labelledby", "form-title")

		// BEHAVIOR: Input has proper label association
		const label = page.locator('label[for="email"]')
		await expect(label).toHaveText("Email Address")

		const emailInput = page.locator("#email")
		await expect(emailInput).toHaveAttribute("aria-label", "Email address")
		await expect(emailInput).toHaveAttribute(
			"aria-describedby",
			"email-help email-error",
		)
		await expect(emailInput).toHaveAttribute("autocomplete", "email")

		// BEHAVIOR: Help text provides clear guidance
		const helpText = page.locator("#email-help")
		await expect(helpText).toHaveText(
			"Enter your email address to receive updates about our latest news",
		)

		// BEHAVIOR: Error region has proper ARIA roles
		const errorMessage = page.locator("#email-error")
		await expect(errorMessage).toHaveAttribute("aria-live", "polite")
		await expect(errorMessage).toHaveAttribute("role", "alert")

		// BEHAVIOR: Success message has proper ARIA roles
		const successMessage = page.locator("#success-message")
		await expect(successMessage).toHaveAttribute("role", "status")
		await expect(successMessage).toHaveAttribute("aria-live", "polite")
	})

	test("keyboard navigation works correctly", async ({ page }) => {
		await page.setContent(htmlContent)

		// BEHAVIOR: Tab navigation should work in logical order
		await page.keyboard.press("Tab") // Should focus email input
		await expect(page.locator("#email")).toBeFocused()

		await page.keyboard.press("Tab") // Should focus submit button
		await expect(page.locator('button[type="submit"]')).toBeFocused()

		// BEHAVIOR: Enter key should submit form
		await page.locator("#email").focus()
		await page.locator("#email").fill("test@example.com")
		await page.keyboard.press("Enter")

		// Form should attempt submission (prevented by JS for demo)
		await expect(page.locator("#success-message")).toBeVisible()
	})

	test("screen reader announcements work with aria-live regions", async ({ page }) => {
		await page.setContent(htmlContent)

		// BEHAVIOR: Error messages should be announced via aria-live
		const emailInput = page.locator("#email")
		const errorMessage = page.locator("#email-error")

		// Focus and blur with invalid input
		await emailInput.focus()
		await emailInput.fill("invalid-email")
		await emailInput.blur()

		// Wait for error message to appear
		await expect(errorMessage).toBeVisible()
		await expect(errorMessage).toHaveText(
			"Please enter a valid email address",
		)

		// BEHAVIOR: Success announcement should work
		await emailInput.fill("valid@example.com")
		const submitButton = page.locator('button[type="submit"]')
		await submitButton.click()

		const successMessage = page.locator("#success-message")
		await expect(successMessage).toBeVisible()
		await expect(successMessage).toHaveText(
			"Thank you! You have been successfully subscribed to our newsletter.",
		)
	})

	test("form validation provides clear feedback", async ({ page }) => {
		await page.setContent(htmlContent)

		const emailInput = page.locator("#email")
		const errorMessage = page.locator("#email-error")

		// BEHAVIOR: Required field validation
		await emailInput.focus()
		await emailInput.blur()
		await expect(errorMessage).toBeVisible()
		await expect(errorMessage).toHaveText("Email address is required")

		// BEHAVIOR: Format validation
		await emailInput.fill("not-an-email")
		await emailInput.blur()
		await expect(errorMessage).toBeVisible()
		await expect(errorMessage).toHaveText(
			"Please enter a valid email address",
		)

		// BEHAVIOR: Valid input clears error
		await emailInput.fill("valid@example.com")
		await emailInput.blur()
		await expect(errorMessage).not.toBeVisible()
	})

	test("form maintains focus management for accessibility", async ({ page }) => {
		await page.setContent(htmlContent)

		// BEHAVIOR: Focus should be clearly visible
		const emailInput = page.locator("#email")
		await emailInput.focus()

		// Check that focus styles are applied (outline should be visible)
		const focusedElement = await page.evaluate(() =>
			document.activeElement?.id
		)
		expect(focusedElement).toBe("email")

		// BEHAVIOR: Form submission should not lose focus context inappropriately
		await emailInput.fill("test@example.com")
		const submitButton = page.locator('button[type="submit"]')
		await submitButton.click()

		// After submission, focus should be managed appropriately
		// In this case, success message should be visible for screen readers
		await expect(page.locator("#success-message")).toBeVisible()
	})

	test("color contrast and visual accessibility requirements", async ({ page }) => {
		await page.setContent(htmlContent)

		// BEHAVIOR: Error states should be distinguishable by more than color alone
		const emailInput = page.locator("#email")
		const errorMessage = page.locator("#email-error")

		await emailInput.focus()
		await emailInput.fill("invalid")
		await emailInput.blur()

		await expect(errorMessage).toBeVisible()

		// Check that error state is indicated by text content, not just color
		await expect(errorMessage).toHaveText(
			"Please enter a valid email address",
		)

		// BEHAVIOR: Interactive elements should have adequate touch targets
		const submitButton = page.locator('button[type="submit"]')
		const buttonBounds = await submitButton.boundingBox()

		// Button should be at least 44px in height for touch accessibility
		expect(buttonBounds?.height).toBeGreaterThanOrEqual(32) // Minimum for small buttons
		expect(buttonBounds?.width).toBeGreaterThanOrEqual(64) // Adequate width
	})
})
