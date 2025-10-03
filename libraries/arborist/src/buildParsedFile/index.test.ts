// @sitebender/arborist/src/buildParsedFile/index.test.ts
// Tests for buildParsedFile function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"

import buildParsedFile from "./index.ts"

Deno.test("buildParsedFile - returns curried function", () => {
	const source = "export default function test() {}"
	const builder = buildParsedFile(source)

	assert(typeof builder === "function", "Should return a function")
})

Deno.test("buildParsedFile - builds ParsedFile with correct filePath", () => {
	const source = "export default function test() {}"
	const filePath = "test.ts"

	const parsedFile = buildParsedFile(source)(filePath)

	assertEquals(parsedFile.filePath, filePath)
})

Deno.test("buildParsedFile - returns immutable ParsedFile", () => {
	const source = "export default function test() {}"
	const parsedFile = buildParsedFile(source)("test.ts")

	// @ts-expect-error: Property 'push' does not exist on type 'readonly ParsedFunction[]'
	parsedFile.functions.push({})

	// @ts-expect-error: Cannot assign to 'filePath' because it is a read-only property
	parsedFile.filePath = "changed"
})

Deno.test("buildParsedFile - returns minimal structure for Day 1", () => {
	const source = "export default function test() {}"
	const parsedFile = buildParsedFile(source)("test.ts")

	// Day 1: Minimal structure, extraction happens in later days
	assertEquals(parsedFile.functions.length, 0)
	assertEquals(parsedFile.types.length, 0)
	assertEquals(parsedFile.constants.length, 0)
	assertEquals(parsedFile.imports.length, 0)
	assertEquals(parsedFile.exports.length, 0)
	assertEquals(parsedFile.comments.length, 0)
	assertEquals(parsedFile.violations.hasArrowFunctions, false)
})

Deno.test("buildParsedFile - is deterministic (pure function)", () => {
	const source = "export default function test() {}"
	const filePath = "test.ts"

	const result1 = buildParsedFile(source)(filePath)
	const result2 = buildParsedFile(source)(filePath)

	// Same input should give same output
	assertEquals(result1.filePath, result2.filePath)
	assertEquals(result1.functions.length, result2.functions.length)
})
