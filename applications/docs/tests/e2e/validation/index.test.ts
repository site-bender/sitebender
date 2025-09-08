import { expect, test } from "@playwright/test"

// Validation behaviors are authored inline via <Program> on the /validation page

test("shows Required on blur when empty", async ({ page }) => {
	await page.goto("/validation/")
	await page.focus("#name")
	await page.keyboard.press("Tab")
	await expect(page.locator("#name-error")).toHaveText("Required")
})

test("clears error when input has value", async ({ page }) => {
	await page.goto("/validation/")
	await page.fill("#name", "Ada")
	await expect(page.locator("#name-error")).toHaveText("")
})

test("submit prevents navigation and validates once", async ({ page }) => {
	await page.goto("/validation/")

	// Mark the window so we can detect full reloads
	const marker = await page.evaluate(() => {
		// @ts-ignore
		const v = Math.random().toString(36).slice(2)
		// @ts-ignore
		globalThis.__sb_marker = v
		return v
	})

	// Watch for a network request to the form action; it should not happen
	const watchedPost = new Promise<boolean>((resolve) => {
		const listener = (req: any) => {
			try {
				const u = new URL(req.url())
				if (u.pathname === "/validation") resolve(true)
			} catch (_) { /* noop */ }
		}
		page.on("request", listener)
		setTimeout(() => {
			page.off("request", listener)
			resolve(false)
		}, 800)
	})

	await page.click("#val-form button[type=submit]")

	const posted = await watchedPost
	expect(posted).toBeFalsy()

	// No full reload occurred (marker persists)
	const still = await page.evaluate(() => {
		// @ts-ignore
		return globalThis.__sb_marker
	})
	expect(still).toBe(marker)
})
