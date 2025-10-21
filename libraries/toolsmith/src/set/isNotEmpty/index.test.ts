import { assertEquals } from "@std/assert"

import isNotEmpty from "./index.ts"

Deno.test("isNotEmpty - set predicate", async function isNotEmptyTests(t) {
	await t.step(
		"returns false for empty set",
		function emptySet() {
			assertEquals(isNotEmpty(new Set()), false)
		},
	)

	await t.step(
		"returns true for single element set",
		function singleElement() {
			assertEquals(isNotEmpty(new Set([1])), true)
			assertEquals(isNotEmpty(new Set(["hello"])), true)
		},
	)

	await t.step(
		"returns true for multiple element set",
		function multipleElements() {
			assertEquals(isNotEmpty(new Set([1, 2, 3])), true)
		},
	)

	await t.step(
		"returns false for non-set values",
		function nonSetValues() {
			assertEquals(isNotEmpty([1] as never), false)
			assertEquals(isNotEmpty({ a: 1 } as never), false)
			assertEquals(isNotEmpty(new Map([["a", 1]]) as never), false)
			assertEquals(isNotEmpty(null as never), false)
		},
	)
})
