import { assertEquals } from "jsr:@std/assert@1"
import buildGraph from "./index.ts"

Deno.test("buildGraph - builds import graph for small directory", async () => {
	// Test on the privacy directory (small, well-defined)
	const graph = await buildGraph(
		"/Users/guy/Workspace/@sitebender/sitebender/libraries/warden/src/privacy",
	)

	// Should be a Map
	assertEquals(graph instanceof Map, true)

	// Should have entries for the privacy functions
	const keys = Array.from(graph.keys())
	assertEquals(keys.length > 0, true)

	// Should have isPrivateFunction, getParentScope, isValidImport
	const hasIsPrivateFunction = keys.some((key) =>
		key.includes("isPrivateFunction/index.ts")
	)
	const hasGetParentScope = keys.some((key) =>
		key.includes("getParentScope/index.ts")
	)
	const hasIsValidImport = keys.some((key) =>
		key.includes("isValidImport/index.ts")
	)

	assertEquals(hasIsPrivateFunction, true)
	assertEquals(hasGetParentScope, true)
	assertEquals(hasIsValidImport, true)
})

Deno.test("buildGraph - resolves import paths correctly", async () => {
	const graph = await buildGraph(
		"/Users/guy/Workspace/@sitebender/sitebender/libraries/warden/src/privacy",
	)

	// Find isValidImport entry
	const isValidImportFile = Array.from(graph.keys()).find((key) =>
		key.includes("isValidImport/index.ts")
	)

	if (isValidImportFile) {
		const imports = graph.get(isValidImportFile)
		assertEquals(Array.isArray(imports), true)

		if (imports && imports.length > 0) {
			// Check that resolved paths are absolute
			imports.forEach((importInfo) => {
				if (importInfo.specifier.startsWith("../")) {
					// Relative imports should be resolved to absolute paths
					assertEquals(importInfo.resolved.startsWith("/"), true)
				}
			})
		}
	}
})

Deno.test("buildGraph - handles external module imports", async () => {
	const graph = await buildGraph(
		"/Users/guy/Workspace/@sitebender/sitebender/libraries/warden/src/privacy",
	)

	// Check for files with external imports
	const entries = Array.from(graph.entries())
	let foundExternalImport = false

	// Privacy functions should have imported from toolsmith or other external sources
	if (entries.length > 0) {
		for (const [_filePath, imports] of entries) {
			for (const importInfo of imports) {
				// Check if specifier is an external module (starts with @ or doesn't start with ./ or ../)
				if (
					importInfo.specifier.startsWith("@") ||
					(!importInfo.specifier.startsWith("./") &&
						!importInfo.specifier.startsWith("../"))
				) {
					// External import should be preserved as-is in resolved field
					assertEquals(importInfo.resolved, importInfo.specifier)
					foundExternalImport = true
				}
			}
		}

		// Privacy functions import from jsr:@std or similar
		// If no external imports found, that's OK too (test might run on minimal file set)
		assertEquals(
			foundExternalImport || entries.length === 0,
			true,
			`Expected external imports in privacy directory`,
		)
	}
})

Deno.test("buildGraph - handles empty directory", async () => {
	// Create temp directory
	const tempDir = await Deno.makeTempDir()

	const graph = await buildGraph(tempDir)

	assertEquals(graph instanceof Map, true)
	assertEquals(graph.size, 0)

	// Cleanup
	await Deno.remove(tempDir)
})

Deno.test("buildGraph - handles non-existent directory", async () => {
	const graph = await buildGraph("/nonexistent/directory")

	assertEquals(graph instanceof Map, true)
	assertEquals(graph.size, 0)
})

Deno.test("buildGraph - performance test on Warden src directory", async () => {
	const startTime = performance.now()

	const graph = await buildGraph(
		"/Users/guy/Workspace/@sitebender/sitebender/libraries/warden/src",
	)

	const endTime = performance.now()
	const executionTime = endTime - startTime

	// Should complete in reasonable time (< 5 seconds for Warden's size)
	assertEquals(executionTime < 5000, true)

	// Should have built a graph with multiple files
	assertEquals(graph.size > 5, true)

	console.log(
		`Built graph of ${graph.size} files in ${executionTime.toFixed(2)}ms`,
	)
})

Deno.test("buildGraph - includes test files", async () => {
	const graph = await buildGraph(
		"/Users/guy/Workspace/@sitebender/sitebender/libraries/warden/src/privacy",
	)

	const keys = Array.from(graph.keys())
	const hasTestFiles = keys.some((key) => key.includes(".test.ts"))

	// Should include test files
	assertEquals(hasTestFiles, true)
})

Deno.test("buildGraph - captures line and column information", async () => {
	const graph = await buildGraph(
		"/Users/guy/Workspace/@sitebender/sitebender/libraries/warden/src/privacy",
	)

	const entries = Array.from(graph.entries())

	if (entries.length > 0) {
		const [_filePath, imports] = entries[0]

		if (imports.length > 0) {
			const firstImport = imports[0]
			assertEquals(typeof firstImport.line, "number")
			assertEquals(typeof firstImport.column, "number")
			assertEquals(firstImport.line > 0, true)
		}
	}
})
