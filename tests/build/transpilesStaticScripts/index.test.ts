import { assertEquals, assert } from "https://deno.land/std@0.220.1/assert/mod.ts"
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

async function runBuild(): Promise<void> {
	const buildComplete = (await import("~scripts/build/index.ts")).default
	await buildComplete()
}

Deno.test("build transpiles static scripts", async (t) => {
	await cleanTestOutput()

	await t.step("should transpile TypeScript files in static/scripts to JavaScript in dist/scripts", async () => {
		// Verify source files exist
		assert(await fileExists("./static/scripts/supportsCssLayers/index.ts"))
		assert(await fileExists("./static/scripts/replaceLegacyWithModernCss/index.ts"))

		await runBuild()

		// Verify transpiled files were created with kebab-case paths
		assert(await fileExists(join(TEST_OUTPUT_DIR, "scripts", "supports-css-layers", "index.js")))
		assert(await fileExists(join(TEST_OUTPUT_DIR, "scripts", "replace-legacy-with-modern-css", "index.js")))

		// Verify content was transpiled, not just copied
		const transpiledContent = await Deno.readTextFile(join(TEST_OUTPUT_DIR, "scripts", "supports-css-layers", "index.js"))

		// Should not contain TypeScript-specific syntax
		assertEquals(transpiledContent.includes(": boolean"), false)
		assertEquals(transpiledContent.includes(": void"), false)

		// Should contain the actual functionality
		assert(transpiledContent.includes("supportsCssLayers"))
		assert(transpiledContent.includes("CSS.supports"))
	})
})
