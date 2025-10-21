import { assertEquals } from "@std/assert"

import isEmpty from "./index.ts"

Deno.test("isEmpty - string predicate", async function isEmptyTests(t) {
	await t.step(
		"returns true for empty string",
		function emptyString() {
			assertEquals(isEmpty(""), true)
		},
	)

	await t.step(
		"returns false for single character string",
		function singleCharacter() {
			assertEquals(isEmpty("a"), false)
			assertEquals(isEmpty(" "), false)
			assertEquals(isEmpty("0"), false)
		},
	)

	await t.step(
		"returns false for multiple character string",
		function multipleCharacters() {
			assertEquals(isEmpty("hello"), false)
			assertEquals(isEmpty("hello world"), false)
		},
	)

	await t.step(
		"returns false for non-string values",
		function nonStringValues() {
			assertEquals(isEmpty([] as never), false)
			assertEquals(isEmpty({} as never), false)
			assertEquals(isEmpty(null as never), false)
			assertEquals(isEmpty(123 as never), false)
		},
	)
})
