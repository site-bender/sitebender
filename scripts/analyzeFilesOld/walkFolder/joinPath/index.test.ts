import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import joinPath from "./index.ts"

//++ Tests for joinPath function
Deno.test("joinPath", async function testJoinPath(t) {
	await t.step("joins multiple path segments", function testMultipleSegments() {
		const result = joinPath("usr", "local", "bin")
		assertEquals(result, "usr/local/bin")
	})

	await t.step("handles single segment", function testSingleSegment() {
		const result = joinPath("home")
		assertEquals(result, "home")
	})

	await t.step("filters out empty strings", function testEmptyStrings() {
		const result = joinPath("usr", "", "bin")
		assertEquals(result, "usr/bin")
	})

	await t.step("filters out falsy values", function testFalsyValues() {
		const result = joinPath("usr", "", "local", "", "bin")
		assertEquals(result, "usr/local/bin")
	})

	await t.step("handles all empty segments", function testAllEmpty() {
		const result = joinPath("", "", "")
		assertEquals(result, "")
	})

	await t.step("handles no arguments", function testNoArguments() {
		const result = joinPath()
		assertEquals(result, "")
	})

	await t.step("preserves leading slash", function testLeadingSlash() {
		const result = joinPath("/usr", "local", "bin")
		assertEquals(result, "/usr/local/bin")
	})

	await t.step("handles trailing slashes", function testTrailingSlashes() {
		const result = joinPath("usr/", "local/", "bin")
		assertEquals(result, "usr//local//bin") // Note: doesn't normalize slashes
	})

	await t.step("works with relative paths", function testRelativePaths() {
		const result = joinPath(".", "folder", "file.ts")
		assertEquals(result, "./folder/file.ts")
	})

	await t.step("works with parent directory references", function testParentRefs() {
		const result = joinPath("..", "parent", "file.ts")
		assertEquals(result, "../parent/file.ts")
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/walkFolder/joinPath/index.test.ts