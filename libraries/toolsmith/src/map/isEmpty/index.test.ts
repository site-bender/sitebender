import { assertEquals } from "@std/assert"

import isEmpty from "./index.ts"

Deno.test("isEmpty - map predicate", async function isEmptyTests(t) {
	await t.step(
		"returns true for empty map",
		function emptyMap() {
			assertEquals(isEmpty(new Map()), true)
		},
	)

	await t.step(
		"returns false for single entry map",
		function singleEntry() {
			assertEquals(isEmpty(new Map([["a", 1]])), false)
			assertEquals(isEmpty(new Map([[1, "hello"]])), false)
		},
	)

	await t.step(
		"returns false for multiple entry map",
		function multipleEntries() {
			assertEquals(isEmpty(new Map([["a", 1], ["b", 2]])), false)
		},
	)

	await t.step(
		"returns false for non-map values",
		function nonMapValues() {
			assertEquals(isEmpty([] as never), false)
			assertEquals(isEmpty({} as never), false)
			assertEquals(isEmpty(new Set() as never), false)
			assertEquals(isEmpty(null as never), false)
		},
	)
})
