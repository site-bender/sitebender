import { assertEquals } from "@std/assert"

import isEmpty from "./index.ts"

Deno.test("isEmpty - object predicate", async function isEmptyTests(t) {
	await t.step(
		"returns true for empty object",
		function emptyObject() {
			assertEquals(isEmpty({}), true)
		},
	)

	await t.step(
		"returns false for single property object",
		function singleProperty() {
			assertEquals(isEmpty({ a: 1 }), false)
			assertEquals(isEmpty({ name: "test" }), false)
		},
	)

	await t.step(
		"returns false for multiple property object",
		function multipleProperties() {
			assertEquals(isEmpty({ a: 1, b: 2 }), false)
		},
	)

	await t.step(
		"returns false for non-object values",
		function nonObjectValues() {
			assertEquals(isEmpty([] as never), false)
			assertEquals(isEmpty("" as never), false)
			assertEquals(isEmpty(new Map() as never), false)
			assertEquals(isEmpty(new Set() as never), false)
			assertEquals(isEmpty(null as never), false)
		},
	)
})
