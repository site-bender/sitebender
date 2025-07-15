import { chromium } from "playwright"

console.log("🧪 Behavioral Test: User accesses about information")

try {
	console.log("Setting up test environment...")

	const ensureServer =
		(await import("~utilities/ensureServer/index.ts")).default
	await ensureServer(5556)
	const browser = await chromium.launch({ headless: true })
	const context = await browser.newContext({
		viewport: { width: 1280, height: 720 },
		locale: "en-US",
	})
	const page = await context.newPage()

	console.log("📄 Step 1: User starts at backstage (development home page)")
	await page.goto("http://localhost:5556/backstage", {
		waitUntil: "domcontentloaded",
	})

	const homeUrl = page.url()
	console.log(`✓ Started at: ${homeUrl}`)

	if (!homeUrl.includes("/backstage")) {
		throw new Error("Failed to load backstage page")
	}

	console.log("📄 Step 2: User looks for About link in navigation")

	// Check for About links using various selectors
	const aboutSelectors = [
		'a[href="/about"]',
		'a[href="about"]',
		'a:has-text("About")',
		'nav a:has-text("About")',
		'[aria-label*="About"]',
		'a:text-is("About")',
	]

	let aboutLinkFound = false
	for (const selector of aboutSelectors) {
		try {
			const link = await page.locator(selector).first()
			if (await link.isVisible()) {
				console.log(`✓ Found About link using selector: ${selector}`)
				await link.click()
				await page.waitForLoadState("domcontentloaded")
				aboutLinkFound = true
				break
			}
		} catch {
			// Continue to next selector
		}
	}

	if (!aboutLinkFound) {
		console.log(
			"⚠️  No About link found in backstage navigation - user needs to access directly",
		)
		console.log("📄 Step 2 (Fallback): User accesses About page directly")

		// In a real scenario, user might:
		// - Type /about in URL bar
		// - Use a bookmark
		// - Follow a shared link
		await page.goto("http://localhost:5556/about", {
			waitUntil: "domcontentloaded",
		})
	}

	const aboutUrl = page.url()
	console.log(`✓ Now at: ${aboutUrl}`)

	console.log("📄 Step 3: User verifies they are on the About page")
	if (!aboutUrl.includes("/about")) {
		throw new Error("Not on About page")
	}

	console.log("📄 Step 4: User reads about content")
	const pageContent = await page.textContent("body")

	if (!pageContent) {
		throw new Error("About page has no content")
	}

	const hasErrorIndicators = pageContent.toLowerCase().includes("404") ||
		pageContent.toLowerCase().includes("not found") ||
		pageContent.toLowerCase().includes("error")

	if (hasErrorIndicators) {
		console.error(
			"\n--- DEBUG: About page content ---\n" + pageContent +
				"\n--- END DEBUG ---\n",
		)
		throw new Error("About page shows error content")
	}

	// Verify there's meaningful content
	const contentLength = pageContent.trim().length
	if (contentLength < 20) {
		throw new Error("About page has insufficient content")
	}

	console.log(`✓ About page contains ${contentLength} characters of content`)
	console.log(`✓ Content preview: "${pageContent.trim().substring(0, 100)}..."`)

	// Take a screenshot for verification
	await page.screenshot({
		path: "tests/fixtures/about-page-access-test/index.png",
	})
	console.log(
		"✓ Screenshot saved to tests/fixtures/about-page-access-test/index.png",
	)

	console.log("🧹 Cleaning up...")
	await browser.close()

	if (aboutLinkFound) {
		console.log(
			"✅ SUCCESS: User successfully navigated to About via backstage navigation",
		)
	} else {
		console.log(
			"✅ SUCCESS: User accessed About information (backstage navigation could be improved)",
		)
		console.log(
			"💡 SUGGESTION: Add About link to backstage page navigation for better UX",
		)
		console.log(
			"📝 NOTE: When real home page is ready, update test to start from / instead of /backstage",
		)
	}
} catch (error) {
	console.error("❌ FAILED: Behavioral test failed")
	console.error(
		"Error:",
		error instanceof Error ? error.message : String(error),
	)
	Deno.exit(1)
}
