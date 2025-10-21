import { assertEquals } from "@std/assert"

import isNotEmpty from "./index.ts"

Deno.test("isNotEmpty - string predicate", async function isNotEmptyTests(t) {
	await t.step(
		"returns false for empty string",
		function emptyString() {
			assertEquals(isNotEmpty(""), false)
		},
	)

	await t.step(
		"returns true for single character string",
		function singleCharacter() {
			assertEquals(isNotEmpty("a"), true)
			assertEquals(isNotEmpty(" "), true)
			assertEquals(isNotEmpty("0"), true)
		},
	)

	await t.step(
		"returns true for multiple character string",
		function multipleCharacters() {
			assertEquals(isNotEmpty("hello"), true)
			assertEquals(isNotEmpty("hello world"), true)
		},
	)

	await t.step(
		"returns false for non-string values",
		function nonStringValues() {
			assertEquals(isNotEmpty([1] as never), false)
			assertEquals(isNotEmpty({ a: 1 } as never), false)
			assertEquals(isNotEmpty(null as never), false)
			assertEquals(isNotEmpty(123 as never), false)
		},
	)
})
