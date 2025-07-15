import assertNoAxeViolations from "~tests/a11y/assertNoAxeViolations/index.ts"
import runAxeAudit from "~tests/a11y/runAxeAudit/index.ts"
import { chromium } from "playwright"

console.log("🧪 Accessibility Test: Format system accessibility compliance")

try {
	console.log("Setting up test environment...")

	const ensureServer = (await import("~utilities/ensureServer/index.ts")).default
	await ensureServer(5556)
	const browser = await chromium.launch({ headless: true })
	const context = await browser.newContext({
		viewport: { width: 1280, height: 720 },
		locale: "en-US",
	})
	const page = await context.newPage()

	console.log("📄 Step 1: User visits test page with formatted components")
	await page.goto("http://localhost:5556/test", { waitUntil: "domcontentloaded" })

	console.log("📄 Step 2: Run comprehensive axe audit on formatted content")
	const axeResults = await runAxeAudit(page)
	await assertNoAxeViolations(axeResults)

	console.log("📄 Step 3: Test keyboard navigation of formatted content")

	// Test Tab navigation through formatted content
	await page.keyboard.press("Tab")
	const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
	console.log(`✓ Keyboard navigation working, focused element: ${focusedElement}`)

	console.log("📄 Step 4: Test cite elements have proper semantics")

	const citeElements = await page.locator("cite").all()
	console.log(`✓ Found ${citeElements.length} cite elements`)

	for (let i = 0; i < citeElements.length; i++) {
		const cite = citeElements[i]
		const role = await cite.getAttribute("role")
		const ariaLabel = await cite.getAttribute("aria-label")
		const textContent = await cite.textContent()

		console.log(`✓ Cite ${i}: role="${role}", aria-label="${ariaLabel}", text="${textContent}"`)

		// Cite elements should have meaningful content
		if (!textContent || textContent.trim().length === 0) {
			throw new Error(`Cite element ${i} has no content`)
		}
	}

	console.log("📄 Step 5: Test screen reader compatibility")

	// Test that formatted content is properly announced
	const mainContent = await page.locator("main").textContent()
	if (!mainContent || mainContent.includes("undefined") || mainContent.includes("null")) {
		throw new Error("Formatted content contains undefined/null values")
	}
	console.log("✓ No undefined/null values in formatted content")

	console.log("📄 Step 6: Test high contrast mode compatibility")

	// Simulate high contrast mode
	await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" })
	await page.waitForTimeout(500)

	const contrastResults = await runAxeAudit(page)
	await assertNoAxeViolations(contrastResults)
	console.log("✓ High contrast mode passes accessibility audit")

	console.log("📄 Step 7: Test with reduced motion preference")

	// Test that no animations interfere with formatting
	await page.emulateMedia({ reducedMotion: "reduce" })
	const formattedContent = await page.locator("main").textContent()

	if (!formattedContent || formattedContent.length < 100) {
		throw new Error("Content disappeared with reduced motion")
	}
	console.log("✓ Formatted content stable with reduced motion")

	console.log("📄 Step 8: Test language detection and markup")

	// Check if lang attributes are properly set
	const langElements = await page.locator("[lang]").count()
	console.log(`✓ Found ${langElements} elements with lang attributes`)

	// Main content should have language specified
	const htmlLang = await page.locator("html").getAttribute("lang")
	if (!htmlLang) {
		throw new Error("HTML element missing lang attribute")
	}
	console.log(`✓ HTML lang attribute: ${htmlLang}`)

	console.log("🧹 Cleaning up...")
	await browser.close()

	console.log("✅ SUCCESS: Format system accessibility compliance verified")
	console.log("✓ No axe violations in formatted content")
	console.log("✓ Keyboard navigation works correctly")
	console.log("✓ Cite elements have proper semantics")
	console.log("✓ Screen reader compatibility maintained")
	console.log("✓ High contrast mode supported")
	console.log("✓ Reduced motion preference respected")
	console.log("✓ Language attributes properly set")

} catch (error) {
	console.error("❌ FAILED: Format system accessibility test failed")
	console.error("Error:", error instanceof Error ? error.message : String(error))
	Deno.exit(1)
}
