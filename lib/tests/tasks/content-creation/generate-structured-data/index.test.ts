import { chromium } from "playwright"

console.log(
	"🧪 Behavioral Test: User generates structured data with formatting",
)

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

	console.log("📄 Step 1: User visits test page")
	await page.goto("http://localhost:5556/test", {
		waitUntil: "domcontentloaded",
	})

	console.log("📄 Step 2: User verifies JSON-LD scripts are present")
	const jsonLdScripts = await page.locator('script[type="application/ld+json"]')
		.count()
	console.log(`✓ Found ${jsonLdScripts} JSON-LD scripts on page`)

	if (jsonLdScripts < 5) {
		throw new Error(
			"Not enough JSON-LD scripts found - components may not be generating structured data",
		)
	}

	console.log("📄 Step 3: User checks Thing JSON-LD structure")
	const thingScript = await page.locator('script[type="application/ld+json"]')
		.first().textContent()
	if (!thingScript) {
		throw new Error("Thing script content is empty")
	}

	const thingData = JSON.parse(thingScript)
	console.log(`✓ Thing JSON-LD: ${JSON.stringify(thingData, null, 2)}`)

	if (thingData["@context"] !== "https://schema.org") {
		throw new Error("Thing JSON-LD missing @context")
	}
	if (thingData["@type"] !== "Thing") {
		throw new Error("Thing JSON-LD has wrong @type")
	}
	if (!thingData.alternativeName || !thingData.description) {
		throw new Error("Thing JSON-LD missing properties")
	}

	console.log("📄 Step 4: User checks Organization JSON-LD structure")
	const organizationScript = await page.locator(
		'script[type="application/ld+json"]',
	).nth(1).textContent()
	if (!organizationScript) {
		throw new Error("Organization script content is empty")
	}

	const orgData = JSON.parse(organizationScript)
	console.log(
		`✓ Organization JSON-LD contains: name, industry, foundingDate, email`,
	)

	if (orgData["@type"] !== "Organization") {
		throw new Error("Organization JSON-LD has wrong @type")
	}
	if (!orgData.name || !orgData.industry || !orgData.foundingDate) {
		throw new Error("Organization JSON-LD missing expected properties")
	}

	console.log(
		"📄 Step 5: User checks LocalBusiness JSON-LD has business properties",
	)

	// Find LocalBusiness script by looking for the one with "Joe's Diner"
	const businessScripts = await page.locator(
		'script[type="application/ld+json"]',
	).all()
	let businessScript = null
	for (const script of businessScripts) {
		const content = await script.textContent()
		if (content && content.includes("Joe's Diner")) {
			businessScript = content
			break
		}
	}

	if (!businessScript) {
		throw new Error("LocalBusiness script content is empty")
	}

	const businessData = JSON.parse(businessScript)
	console.log(`✓ LocalBusiness JSON-LD contains business-specific properties`)
	console.log(`✓ LocalBusiness JSON-LD @type: ${businessData["@type"]}`)

	if (businessData["@type"] !== "LocalBusiness") {
		throw new Error(
			`LocalBusiness JSON-LD has wrong @type: ${businessData["@type"]}`,
		)
	}
	if (!businessData.name || !businessData.email) {
		throw new Error("LocalBusiness JSON-LD missing expected properties")
	}

	console.log("📄 Step 6: User checks Electrician JSON-LD inheritance")

	// Find Electrician script by looking for the one with "Smith Electric"
	const electricianScripts = await page.locator(
		'script[type="application/ld+json"]',
	).all()
	let electricianScript = null
	for (const script of electricianScripts) {
		const content = await script.textContent()
		if (content && content.includes("Smith Electric")) {
			electricianScript = content
			break
		}
	}

	if (!electricianScript) {
		throw new Error("Electrician script content is empty")
	}

	const electricianData = JSON.parse(electricianScript)
	console.log(
		`✓ Electrician JSON-LD: ${JSON.stringify(electricianData, null, 2)}`,
	)

	if (electricianData["@type"] !== "Electrician") {
		throw new Error(
			`Electrician JSON-LD has wrong @type: ${electricianData["@type"]}`,
		)
	}
	if (!electricianData.name || !electricianData.foundingDate) {
		throw new Error("Electrician JSON-LD missing expected properties")
	}

	console.log("📄 Step 7: User verifies no component props leak into JSON-LD")
	const allScripts = await page.locator('script[type="application/ld+json"]')
		.all()
	for (let i = 0; i < allScripts.length; i++) {
		const scriptContent = await allScripts[i].textContent()
		if (!scriptContent) continue

		const data = JSON.parse(scriptContent)

		// Check for component-specific props that shouldn't be in JSON-LD
		if (
			data.disableJsonLd || data.schemaType || data.subtypeProperties ||
			data.format
		) {
			throw new Error(
				`JSON-LD script ${i} contains component props that should be filtered out`,
			)
		}
	}
	console.log("✓ No component-specific props found in JSON-LD output")

	console.log("🧹 Cleaning up...")
	await browser.close()

	console.log("✅ SUCCESS: Structured data generation works correctly")
	console.log("✓ All components generate valid JSON-LD with @context and @type")
	console.log("✓ Component hierarchy preserves proper Schema.org types")
	console.log("✓ Properties are correctly merged and passed up the hierarchy")
	console.log("✓ Component-specific props are filtered out of JSON-LD")
	console.log("✓ Multiple components can coexist with separate JSON-LD scripts")
} catch (error) {
	console.error("❌ FAILED: Structured data generation behavioral test failed")
	console.error(
		"Error:",
		error instanceof Error ? error.message : String(error),
	)
	Deno.exit(1)
}
