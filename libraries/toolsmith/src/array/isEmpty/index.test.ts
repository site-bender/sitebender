import { assertEquals } from "@std/assert"

import isEmpty from "./index.ts"

Deno.test("isEmpty - array predicate", async function isEmptyTests(t) {
	await t.step(
		"returns true for empty array",
		function emptyArray() {
			assertEquals(isEmpty([]), true)
		},
	)

	await t.step(
		"returns false for single element array",
		function singleElement() {
			assertEquals(isEmpty([1]), false)
			assertEquals(isEmpty(["hello"]), false)
			assertEquals(isEmpty([null]), false)
		},
	)

	await t.step(
		"returns false for multiple element array",
		function multipleElements() {
			assertEquals(isEmpty([1, 2, 3]), false)
			assertEquals(isEmpty(["a", "b", "c"]), false)
		},
	)

	await t.step(
		"returns false for non-array values",
		function nonArrayValues() {
			assertEquals(isEmpty("" as never), false)
			assertEquals(isEmpty({} as never), false)
			assertEquals(isEmpty(null as never), false)
			assertEquals(isEmpty(123 as never), false)
		},
	)
})
