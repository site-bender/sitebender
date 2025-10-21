import { assertEquals } from "@std/assert"

import isNotEmpty from "./index.ts"

Deno.test("isNotEmpty - map predicate", async function isNotEmptyTests(t) {
	await t.step(
		"returns false for empty map",
		function emptyMap() {
			assertEquals(isNotEmpty(new Map()), false)
		},
	)

	await t.step(
		"returns true for single entry map",
		function singleEntry() {
			assertEquals(isNotEmpty(new Map([["a", 1]])), true)
			assertEquals(isNotEmpty(new Map([[1, "hello"]])), true)
		},
	)

	await t.step(
		"returns true for multiple entry map",
		function multipleEntries() {
			assertEquals(isNotEmpty(new Map([["a", 1], ["b", 2]])), true)
		},
	)

	await t.step(
		"returns false for non-map values",
		function nonMapValues() {
			assertEquals(isNotEmpty([1] as never), false)
			assertEquals(isNotEmpty({ a: 1 } as never), false)
			assertEquals(isNotEmpty(new Set([1]) as never), false)
			assertEquals(isNotEmpty(null as never), false)
		},
	)
})
