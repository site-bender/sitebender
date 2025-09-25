import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import checkExtension from "./index.ts"

//++ Tests for checkExtension function
Deno.test("checkExtension", async function testCheckExtension(t) {
	await t.step(
		"creates a predicate for checking file extension",
		function testCreatesPredicate() {
			const checkFile = checkExtension("file.ts")

			assertEquals(typeof checkFile, "function")
		},
	)

	await t.step("matches files with the extension", function testMatches() {
		const checkFile = checkExtension("file.ts")

		assertEquals(checkFile(".ts"), true)
		assertEquals(checkFile(".js"), false)
	})

	await t.step("handles different file paths", function testDifferentPaths() {
		const checkIndexFile = checkExtension("src/index.ts")

		assertEquals(checkIndexFile(".ts"), true)
		assertEquals(checkIndexFile(".tsx"), false)
		assertEquals(checkIndexFile("index.ts"), true)
		assertEquals(checkIndexFile("/index.ts"), true)
	})

	await t.step("is case sensitive", function testCaseSensitive() {
		const checkFile = checkExtension("file.ts")

		assertEquals(checkFile(".ts"), true)
		assertEquals(checkFile(".TS"), false)
		assertEquals(checkFile(".Ts"), false)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/walkFolder/shouldIncludeFile/checkExtension/index.test.ts
