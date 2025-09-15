import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import matchesExtension from "./index.ts"

//++ Tests for matchesExtension function
Deno.test("matchesExtension", async function testMatchesExtension(t) {
	await t.step("creates a predicate for path", function testCreatesPredicate() {
		const checkExtension = matchesExtension("file.ts")
		assertEquals(typeof checkExtension, "function")
	})

	await t.step("matches correct extension", function testMatches() {
		const checkExtension = matchesExtension("src/index.ts")
		assertEquals(checkExtension(".ts"), true)
	})

	await t.step("does not match incorrect extension", function testNoMatch() {
		const checkExtension = matchesExtension("src/index.ts")
		assertEquals(checkExtension(".js"), false)
	})

	await t.step("handles tsx files", function testTsxFiles() {
		const checkExtension = matchesExtension("components/Button.tsx")
		assertEquals(checkExtension(".tsx"), true)
		assertEquals(checkExtension(".ts"), false)
		assertEquals(checkExtension(".jsx"), false)
	})

	await t.step("handles files with no extension", function testNoExtension() {
		const checkExtension = matchesExtension("README")
		assertEquals(checkExtension(".md"), false)
		assertEquals(checkExtension(""), true) // Empty string matches end
	})

	await t.step("handles dotfiles", function testDotfiles() {
		const checkExtension = matchesExtension(".gitignore")
		assertEquals(checkExtension(".gitignore"), true)
		assertEquals(checkExtension("ignore"), true)
		assertEquals(checkExtension(".ignore"), false)
	})

	await t.step("case sensitive matching", function testCaseSensitive() {
		const checkExtension = matchesExtension("File.TS")
		assertEquals(checkExtension(".TS"), true)
		assertEquals(checkExtension(".ts"), false)
	})

	await t.step("handles paths with multiple dots", function testMultipleDots() {
		const checkExtension = matchesExtension("file.test.ts")
		assertEquals(checkExtension(".ts"), true)
		assertEquals(checkExtension(".test.ts"), true)
		assertEquals(checkExtension("test.ts"), true)
	})

	await t.step("handles absolute paths", function testAbsolutePaths() {
		const checkExtension = matchesExtension("/usr/local/file.js")
		assertEquals(checkExtension(".js"), true)
		assertEquals(checkExtension(".ts"), false)
	})

	await t.step("handles Windows-style paths", function testWindowsPaths() {
		const checkExtension = matchesExtension("C:\\Users\\file.py")
		assertEquals(checkExtension(".py"), true)
		assertEquals(checkExtension(".js"), false)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/walkFolder/shouldIncludeFile/matchesExtension/index.test.ts