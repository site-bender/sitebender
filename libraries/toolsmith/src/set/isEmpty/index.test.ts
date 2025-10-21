import { assertEquals } from "@std/assert"

import isEmpty from "./index.ts"

Deno.test("isEmpty - set predicate", async function isEmptyTests(t) {
	await t.step(
		"returns true for empty set",
		function emptySet() {
			assertEquals(isEmpty(new Set()), true)
		},
	)

	await t.step(
		"returns false for single element set",
		function singleElement() {
			assertEquals(isEmpty(new Set([1])), false)
			assertEquals(isEmpty(new Set(["hello"])), false)
		},
	)

	await t.step(
		"returns false for multiple element set",
		function multipleElements() {
			assertEquals(isEmpty(new Set([1, 2, 3])), false)
		},
	)

	await t.step(
		"returns false for non-set values",
		function nonSetValues() {
			assertEquals(isEmpty([] as never), false)
			assertEquals(isEmpty({} as never), false)
			assertEquals(isEmpty(new Map() as never), false)
			assertEquals(isEmpty(null as never), false)
		},
	)
})
