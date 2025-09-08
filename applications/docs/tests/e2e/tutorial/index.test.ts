import { expect, test } from "@playwright/test"

test("name mirrors to #out", async ({ page }) => {
	await page.goto("/tutorial/")
	await page.fill("#name", "Ada")
	await expect(page.locator("#out")).toHaveText("Ada")
})

test("submit updates query string and prevents navigation", async ({ page }) => {
	await page.goto("/tutorial/")
	await page.fill("#favorite", "chess")

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
				if (u.pathname === "/ignored-by-engine") resolve(true)
			} catch (_) { /* noop */ }
		}
		page.on("request", listener)
		setTimeout(() => {
			page.off("request", listener)
			resolve(false)
		}, 800)
	})

	await page.click("#profile button[type=submit]")

	// URL should update
	await expect(page).toHaveURL(/\?favorite=chess/)

	// No network POST occurred
	const posted = await watchedPost
	expect(posted).toBeFalsy()

	// No full reload occurred (marker persists)
	const still = await page.evaluate(() => {
		// @ts-ignore
		return globalThis.__sb_marker
	})
	expect(still).toBe(marker)
})

test("sum updates on input", async ({ page }) => {
	await page.goto("/tutorial/")
	await page.fill("#a", "2")
	await page.fill("#b", "5")
	await expect(page.locator("#sum")).toHaveText("7")
})
