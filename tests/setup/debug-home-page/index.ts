import { chromium } from "playwright"

console.log("🔍 Debugging: Examining backstage page structure")

try {
	const browser = await chromium.launch({ headless: true })
	const context = await browser.newContext({
		viewport: { width: 1280, height: 720 },
	})
	const page = await context.newPage()

	console.log("Loading backstage page...")
	await page.goto("http://localhost:5556/backstage", { waitUntil: "domcontentloaded" })

	// Take a screenshot to see what's on the page
	await page.screenshot({ path: "tests/fixtures/backstage-page-debug/index.png" })
	console.log("✓ Backstage page screenshot saved")

	// Get all links
	const links = await page.locator('a').all()
	console.log(`Found ${links.length} links on the page:`)

	for (let i = 0; i < links.length; i++) {
		const link = links[i]
		const href = await link.getAttribute('href')
		const text = await link.textContent()
		const ariaLabel = await link.getAttribute('aria-label')
		console.log(`  ${i + 1}. href="${href}" text="${text}" aria-label="${ariaLabel}"`)
	}

	// Get page title and basic content
	const title = await page.title()
	const bodyText = await page.textContent('body')

	console.log(`\nPage title: ${title}`)
	console.log(`Body content preview: ${bodyText?.substring(0, 200)}...`)

	await browser.close()

} catch (error) {
	console.error("Error:", error instanceof Error ? error.message : String(error))
}
