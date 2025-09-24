import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import joinPath from "./index.ts"

//++ Tests for joinPath function
Deno.test("joinPath", async function testJoinPath(t) {
	await t.step("joins two path segments", function testTwoSegments() {
		const result = joinPath("usr")("local")

		assertEquals(result, "usr/local")
	})

	await t.step("handles absolute paths", function testAbsolutePaths() {
		const result = joinPath("/usr")("local")

		assertEquals(result, "/usr/local")
	})

	await t.step("handles empty base path", function testEmptyBase() {
		const result = joinPath("")("file.ts")

		assertEquals(result, "file.ts")
	})

	await t.step("handles empty second path", function testEmptySecond() {
		const result = joinPath("src")("")

		assertEquals(result, "src")
	})

	await t.step("handles both empty", function testBothEmpty() {
		const result = joinPath("")("")

		assertEquals(result, "")
	})

	await t.step("handles trailing slashes", function testTrailingSlashes() {
		const result = joinPath("src/")("codewright")

		assertEquals(result, "src/codewright")
	})

	await t.step("handles leading slash on second segment", function testLeadingSlashSecond() {
		const result = joinPath("src")("/codewright")

		assertEquals(result, "src/codewright")
	})

	await t.step("handles relative paths", function testRelativePaths() {
		const joinToBase = joinPath("./src")

		assertEquals(joinToBase("codewright"), "./src/codewright")
		assertEquals(joinToBase("utils"), "./src/utils")
	})

	await t.step("handles parent references", function testParentRefs() {
		const result = joinPath("../lib")("index.ts")

		assertEquals(result, "../lib/index.ts")
	})

	await t.step("is curried for reuse", function testCurrying() {
		const joinToScripts = joinPath("scripts")

		assertEquals(joinToScripts("analyzeFiles"), "scripts/analyzeFiles")
		assertEquals(joinToScripts("walkFolder"), "scripts/walkFolder")
		assertEquals(joinToScripts("types"), "scripts/types")
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/walkFolder/joinPath/index.test.ts
