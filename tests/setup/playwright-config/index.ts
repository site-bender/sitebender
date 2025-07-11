import type { Browser, BrowserContext } from "playwright"

import { chromium } from "playwright"

export type TestContext = {
	browser: Browser
	context: BrowserContext
	baseURL: string
}

export const setupPlaywright = async (): Promise<TestContext> => {
	const browser = await chromium.launch({
		headless: true, // Force headless for tests
		slowMo: 0, // Remove delay for tests
	})

	const context = await browser.newContext({
		viewport: { width: 1280, height: 720 },
		locale: "en-US",
		// Test progressive enhancement by occasionally disabling JavaScript
		javaScriptEnabled: true,
	})

	const baseURL = "http://localhost:5556"

	return { browser, context, baseURL }
}

export const teardownPlaywright = async (testContext: TestContext): Promise<void> => {
	await testContext.context?.close()
	await testContext.browser?.close()
}

export const createTestPage = async (testContext: TestContext) => {
	return await testContext.context.newPage()
}

// Simple test to verify configuration works
if (import.meta.main) {
	console.log("Playwright configuration loaded successfully")
}
