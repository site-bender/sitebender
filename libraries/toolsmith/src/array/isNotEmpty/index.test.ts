import { assertEquals } from "@std/assert"

import isNotEmpty from "./index.ts"

Deno.test("isNotEmpty - array predicate", async function isNotEmptyTests(t) {
	await t.step(
		"returns false for empty array",
		function emptyArray() {
			assertEquals(isNotEmpty([]), false)
		},
	)

	await t.step(
		"returns true for single element array",
		function singleElement() {
			assertEquals(isNotEmpty([1]), true)
			assertEquals(isNotEmpty(["hello"]), true)
			assertEquals(isNotEmpty([null]), true)
		},
	)

	await t.step(
		"returns true for multiple element array",
		function multipleElements() {
			assertEquals(isNotEmpty([1, 2, 3]), true)
			assertEquals(isNotEmpty(["a", "b", "c"]), true)
		},
	)

	await t.step(
		"returns false for non-array values",
		function nonArrayValues() {
			assertEquals(isNotEmpty("hello" as never), false)
			assertEquals(isNotEmpty({ a: 1 } as never), false)
			assertEquals(isNotEmpty(null as never), false)
			assertEquals(isNotEmpty(123 as never), false)
		},
	)
})
