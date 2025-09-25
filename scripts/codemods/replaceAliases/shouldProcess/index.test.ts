import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import shouldProcess from "./index.ts"

//++ Tests for shouldProcess function that checks if a file should be processed
Deno.test("shouldProcess", async function testShouldProcess(t) {
	await t.step("returns true for .ts files", function testTsFiles() {
		assertEquals(shouldProcess("file.ts"), true)
		assertEquals(shouldProcess("/path/to/file.ts"), true)
		assertEquals(shouldProcess("src/pagewright/Button.ts"), true)
		assertEquals(shouldProcess("index.ts"), true)
	})

	await t.step("returns true for .tsx files", function testTsxFiles() {
		assertEquals(shouldProcess("component.tsx"), true)
		assertEquals(shouldProcess("/path/to/Component.tsx"), true)
		assertEquals(shouldProcess("src/pages/Home.tsx"), true)
		assertEquals(shouldProcess("App.tsx"), true)
	})

	await t.step(
		"returns false for non-TypeScript files",
		function testNonTsFiles() {
			assertEquals(shouldProcess("file.js"), false)
			assertEquals(shouldProcess("script.jsx"), false)
			assertEquals(shouldProcess("readme.md"), false)
			assertEquals(shouldProcess("style.css"), false)
			assertEquals(shouldProcess("data.json"), false)
			assertEquals(shouldProcess("image.png"), false)
		},
	)

	await t.step(
		"returns false for files without extension",
		function testNoExtension() {
			assertEquals(shouldProcess("README"), false)
			assertEquals(shouldProcess("Makefile"), false)
			assertEquals(shouldProcess(".gitignore"), false)
		},
	)

	await t.step("handles edge cases", function testEdgeCases() {
		// File ending with .ts but not as extension
		assertEquals(shouldProcess("file.test.ts"), true)
		assertEquals(shouldProcess("file.d.ts"), true)
		assertEquals(shouldProcess("file.spec.ts"), true)

		// Files with .ts or .tsx in the middle
		assertEquals(shouldProcess("file.ts.bak"), false)
		assertEquals(shouldProcess("old.tsx.txt"), false)

		// Empty string
		assertEquals(shouldProcess(""), false)

		// Just extension
		assertEquals(shouldProcess(".ts"), true)
		assertEquals(shouldProcess(".tsx"), true)
	})

	await t.step("is case sensitive", function testCaseSensitive() {
		assertEquals(shouldProcess("file.TS"), false)
		assertEquals(shouldProcess("file.TSX"), false)
		assertEquals(shouldProcess("file.Ts"), false)
		assertEquals(shouldProcess("file.tS"), false)
	})

	await t.step(
		"handles paths with special characters",
		function testSpecialChars() {
			assertEquals(shouldProcess("my-file.ts"), true)
			assertEquals(shouldProcess("my_file.tsx"), true)
			assertEquals(shouldProcess("file@v1.0.0.ts"), true)
			assertEquals(shouldProcess("file (copy).tsx"), true)
			assertEquals(shouldProcess("file[1].ts"), true)
		},
	)

	await t.step("handles absolute and relative paths", function testPaths() {
		assertEquals(shouldProcess("/absolute/path/file.ts"), true)
		assertEquals(shouldProcess("./relative/path/file.tsx"), true)
		assertEquals(shouldProcess("../parent/file.ts"), true)
		assertEquals(shouldProcess("~/home/file.tsx"), true)
		assertEquals(shouldProcess("C:\\Windows\\file.ts"), true)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/codemods/replaceAliases/shouldProcess/index.test.ts
