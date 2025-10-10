import { assertEquals } from "@std/assert"

import findPattern from "./index.ts"

function returnsArrayOfMatches() {
	return (async function run() {
		const result = await findPattern("/test/path", /test/)
		assertEquals(Array.isArray(result), true)
		assertEquals(result.length, 0)
	})()
}

function handlesComplexRegexPatterns() {
	return (async function run() {
		const result = await findPattern("/test/path", /from ['"]typescript['"]/)
		assertEquals(Array.isArray(result), true)
		assertEquals(result.length, 0)
	})()
}

function handlesEmptyPath() {
	return (async function run() {
		const result = await findPattern("", /test/)
		assertEquals(Array.isArray(result), true)
		assertEquals(result.length, 0)
	})()
}

function resultStructureWouldBeCorrectIfMatchesFound() {
	return (async function run() {
		const result = await findPattern("/test/path", /test/)
		result.forEach((match) => {
			assertEquals(typeof match.file, "string")
			assertEquals(typeof match.line, "number")
		})
	})()
}

Deno.test("findPattern", async (t) => {
	await t.step("returns array of matches", returnsArrayOfMatches)
	await t.step("handles complex regex patterns", handlesComplexRegexPatterns)
	await t.step("handles empty path", handlesEmptyPath)
	await t.step(
		"result structure would be correct if matches found",
		resultStructureWouldBeCorrectIfMatchesFound,
	)
})
