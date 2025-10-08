import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isNotEmpty from "./index.ts"

Deno.test("isNotEmpty", async function isNotEmptyTests(t) {
	await t.step(
		"returns true for arrays with elements",
		function returnsTrueForNonEmptyArrays() {
			assertEquals(isNotEmpty([1, 2, 3]), true)
			assertEquals(isNotEmpty(["a"]), true)
			assertEquals(isNotEmpty([null, undefined]), true)
			assertEquals(isNotEmpty([0]), true)
			assertEquals(isNotEmpty([false]), true)
			assertEquals(isNotEmpty([""]), true)
		},
	)

	await t.step(
		"returns false for empty arrays",
		function returnsFalseForEmptyArrays() {
			assertEquals(isNotEmpty([]), false)
		},
	)

	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			assertEquals(isNotEmpty(null), false)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			assertEquals(isNotEmpty(undefined), false)
		},
	)

	await t.step(
		"handles readonly arrays",
		function handlesReadonlyArrays() {
			const readonlyArr: ReadonlyArray<number> = [1, 2, 3]
			assertEquals(isNotEmpty(readonlyArr), true)

			const emptyReadonly: ReadonlyArray<number> = []
			assertEquals(isNotEmpty(emptyReadonly), false)
		},
	)

	await t.step(
		"handles mixed type arrays",
		function handlesMixedTypes() {
			assertEquals(isNotEmpty([1, "two", true, null, { key: "value" }]), true)
			assertEquals(isNotEmpty([undefined, null, 0, false, ""]), true)
		},
	)
})

Deno.test("isNotEmpty - property: non-empty arrays always return true", function nonEmptyProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			function propertyNonEmpty(arr) {
				assertEquals(isNotEmpty(arr), true)
			},
		),
	)
})

Deno.test("isNotEmpty - property: empty array always returns false", function emptyArrayProperty() {
	fc.assert(
		fc.property(
			fc.constant([]),
			function propertyEmpty(arr) {
				assertEquals(isNotEmpty(arr), false)
			},
		),
	)
})

Deno.test("isNotEmpty - property: null and undefined always return false", function nullishProperty() {
	fc.assert(
		fc.property(
			fc.constantFrom(null, undefined),
			function propertyNullish(value) {
				assertEquals(isNotEmpty(value), false)
			},
		),
	)
})
