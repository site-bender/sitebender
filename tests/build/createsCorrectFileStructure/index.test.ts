import { assertEquals, assert } from "https://deno.land/std@0.220.1/assert/mod.ts"
import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

// Test using the actual dist directory since build functions are hardcoded to it
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

async function runBuild(): Promise<void> {
	// Create a simple logger for tests
	const logger = {
		log: () => {}, // Silent for tests
		info: () => {},
		warn: () => {},
		error: () => {},
	}

	// Import build function - the complete build process
	const buildComplete = (await import("~scripts/build/index.ts")).default

	// Run complete build process
	await buildComplete()
}

Deno.test("build creates correct file structure", async (t) => {
	await cleanTestOutput()

	await t.step("should create HTML files for all routes", async () => {
		await runBuild()

		// Verify main route files exist
		assert(await fileExists(join(TEST_OUTPUT_DIR, "index.html")))
		assert(await fileExists(join(TEST_OUTPUT_DIR, "about", "index.html")))
		assert(await fileExists(join(TEST_OUTPUT_DIR, "contact", "index.html")))
		assert(await fileExists(join(TEST_OUTPUT_DIR, "test", "index.html")))
	})

	await t.step("should create CSS files with kebab-case names", async () => {
		await runBuild()

		// Verify CSS structure exists
		assert(await fileExists(join(TEST_OUTPUT_DIR, "styles", "components", "index.css")))
		assert(await fileExists(join(TEST_OUTPUT_DIR, "styles", "components", "forms", "index.css")))
		assert(await fileExists(join(TEST_OUTPUT_DIR, "styles", "components", "forms", "fields", "autocomplete-field", "index.css")))
	})

	await t.step("should create JavaScript files for components with scripts", async () => {
		await runBuild()

		// Verify JS structure exists
		assert(await fileExists(join(TEST_OUTPUT_DIR, "scripts", "components", "forms", "fields", "autocomplete-field", "index.js")))
	})

	await t.step("should preserve static assets", async () => {
		await runBuild()

		// Verify static files are copied
		assert(await fileExists(join(TEST_OUTPUT_DIR, "favicon.ico")))
		assert(await fileExists(join(TEST_OUTPUT_DIR, "favicon.svg")))
	})

	// Cleanup after all tests
	await cleanTestOutput()
})
