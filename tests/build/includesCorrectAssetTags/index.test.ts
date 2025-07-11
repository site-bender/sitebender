import { assert, assertStringIncludes } from "https://deno.land/std@0.220.1/assert/mod.ts"
import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

const TEST_OUTPUT_DIR = "./dist"

async function cleanTestOutput(): Promise<void> {
	try {
		await Deno.remove(TEST_OUTPUT_DIR, { recursive: true })
	} catch {
		// Directory doesn't exist, which is fine
	}
}

async function fileExists(path: string): Promise<boolean> {
	try {
		await Deno.stat(path)
		return true
	} catch {
		return false
	}
}

async function readFile(path: string): Promise<string> {
	return await Deno.readTextFile(path)
}

async function runBuild(): Promise<void> {
	const logger = {
		log: () => {}, // Silent for tests
		info: () => {},
		warn: () => {},
		error: () => {},
	}

	const buildComplete = (await import("~scripts/build/index.ts")).default

	await buildComplete()
}

Deno.test("build includes correct asset tags", async (t) => {
	await cleanTestOutput()

	await t.step("should include CSS link tags for components used on test page", async () => {
		await runBuild()

		const testPagePath = join(TEST_OUTPUT_DIR, "test", "index.html")
		assert(await fileExists(testPagePath))

		const htmlContent = await readFile(testPagePath)

		// Verify CSS links are included
		assertStringIncludes(htmlContent, '<link rel="stylesheet" href="/styles/components/forms/index.css">')
		assertStringIncludes(htmlContent, '<link rel="stylesheet" href="/styles/components/forms/fields/autocomplete-field/index.css">')
		assertStringIncludes(htmlContent, '<link rel="stylesheet" href="/styles/components/forms/test/index.css">')
	})

	await t.step("should include script tags for components with client-side code", async () => {
		await runBuild()

		const testPagePath = join(TEST_OUTPUT_DIR, "test", "index.html")
		const htmlContent = await readFile(testPagePath)

		// Verify script tags are included for components that have client-side JavaScript
		assertStringIncludes(htmlContent, '<script src="/scripts/components/forms/fields/autocomplete-field/index.js"></script>')
	})

	await t.step("should not include duplicate asset tags", async () => {
		await runBuild()

		const testPagePath = join(TEST_OUTPUT_DIR, "test", "index.html")
		const htmlContent = await readFile(testPagePath)

		// Count occurrences of a specific CSS link to ensure no duplicates
		const cssLinkPattern = '<link rel="stylesheet" href="/styles/components/forms/index.css">'
		const occurrences = (htmlContent.match(new RegExp(cssLinkPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length

		assert(occurrences === 1, `Expected 1 occurrence of CSS link, found ${occurrences}`)
	})

	await t.step("should include base styles on all pages", async () => {
		await runBuild()

		const aboutPagePath = join(TEST_OUTPUT_DIR, "about", "index.html")
		assert(await fileExists(aboutPagePath))

		const htmlContent = await readFile(aboutPagePath)

		// Verify base styles are included
		assertStringIncludes(htmlContent, '<link rel="stylesheet" href="/styles/reset/index.css">')
		assertStringIncludes(htmlContent, '<link rel="stylesheet" href="/styles/base/index.css">')
		assertStringIncludes(htmlContent, '<link rel="stylesheet" href="/styles/utilities/index.css">')
	})

	await t.step("should not include key attributes in asset tags", async () => {
		await runBuild()

		const testPagePath = join(TEST_OUTPUT_DIR, "test", "index.html")
		const htmlContent = await readFile(testPagePath)

		// Verify no key attributes are present in the final HTML
		assert(!htmlContent.includes('key='), "HTML should not contain key attributes")
	})

	// Cleanup after all tests
	await cleanTestOutput()
})
