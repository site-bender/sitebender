import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import shouldIncludeFile from "./index.ts"

//++ Tests for shouldIncludeFile function
Deno.test("shouldIncludeFile", async function testShouldIncludeFile(t) {
	const checkTsFiles = shouldIncludeFile([".ts", ".tsx"])

	await t.step("creates a predicate function", function testCreatesPredicate() {
		assertEquals(typeof checkTsFiles, "function")
	})

	await t.step("matches TypeScript files", function testMatchesTs() {
		assertEquals(checkTsFiles("src/index.ts"), true)
		assertEquals(checkTsFiles("test.ts"), true)
		assertEquals(checkTsFiles("/absolute/path/file.ts"), true)
	})

	await t.step("matches TSX files", function testMatchesTsx() {
		assertEquals(checkTsFiles("pagewright/Button.tsx"), true)
		assertEquals(checkTsFiles("App.tsx"), true)
	})

	await t.step(
		"rejects non-matching extensions",
		function testRejectsNonMatching() {
			assertEquals(checkTsFiles("script.js"), false)
			assertEquals(checkTsFiles("style.css"), false)
			assertEquals(checkTsFiles("README.md"), false)
			assertEquals(checkTsFiles("Makefile"), false)
		},
	)

	await t.step(
		"handles empty extensions array",
		function testEmptyExtensions() {
			const checkFile = shouldIncludeFile([])

			assertEquals(checkFile("anything.ts"), false)
			assertEquals(checkFile("file.js"), false)
		},
	)

	await t.step(
		"handles multiple extensions",
		function testMultipleExtensions() {
			const checkFile = shouldIncludeFile([
				".js",
				".jsx",
				".ts",
				".tsx",
				".mjs",
			])

			assertEquals(checkFile("script.js"), true)
			assertEquals(checkFile("component.jsx"), true)
			assertEquals(checkFile("index.ts"), true)
			assertEquals(checkFile("App.tsx"), true)
			assertEquals(checkFile("module.mjs"), true)
			assertEquals(checkFile("style.css"), false)
		},
	)

	await t.step("is case sensitive", function testCaseSensitive() {
		const checkFile = shouldIncludeFile([".ts"])

		assertEquals(checkFile("file.ts"), true)
		assertEquals(checkFile("file.TS"), false)
		assertEquals(checkFile("file.Ts"), false)
	})

	await t.step("handles files with multiple dots", function testMultipleDots() {
		const checkFile = shouldIncludeFile([".ts", ".test.ts"])

		assertEquals(checkFile("file.test.ts"), true)
		assertEquals(checkFile("another.spec.ts"), true)
		assertEquals(checkFile("file.test.js"), false)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/walkFolder/shouldIncludeFile/index.test.ts
