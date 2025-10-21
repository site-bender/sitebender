import { assertEquals } from "@std/assert"

import isNotEmpty from "./index.ts"

Deno.test("isNotEmpty - object predicate", async function isNotEmptyTests(t) {
	await t.step(
		"returns false for empty object",
		function emptyObject() {
			assertEquals(isNotEmpty({}), false)
		},
	)

	await t.step(
		"returns true for single property object",
		function singleProperty() {
			assertEquals(isNotEmpty({ a: 1 }), true)
			assertEquals(isNotEmpty({ name: "test" }), true)
		},
	)

	await t.step(
		"returns true for multiple property object",
		function multipleProperties() {
			assertEquals(isNotEmpty({ a: 1, b: 2 }), true)
		},
	)

	await t.step(
		"returns false for non-object values",
		function nonObjectValues() {
			assertEquals(isNotEmpty([1] as never), false)
			assertEquals(isNotEmpty("hello" as never), false)
			assertEquals(isNotEmpty(new Map([["a", 1]]) as never), false)
			assertEquals(isNotEmpty(new Set([1]) as never), false)
			assertEquals(isNotEmpty(null as never), false)
		},
	)
})
