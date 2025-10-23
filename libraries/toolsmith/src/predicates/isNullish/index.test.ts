import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isNullish from "./index.ts"

Deno.test("isNullish", async function isNullishTests(t) {
	await t.step(
		"returns true for null",
		function returnsTrueForNull() {
			assertEquals(isNullish(null), true)
		},
	)

	await t.step(
		"returns true for undefined",
		function returnsTrueForUndefined() {
			assertEquals(isNullish(undefined), true)
		},
	)

	await t.step(
		"returns false for 0",
		function returnsFalseForZero() {
			assertEquals(isNullish(0), false)
		},
	)

	await t.step(
		"returns false for empty string",
		function returnsFalseForEmptyString() {
			assertEquals(isNullish(""), false)
		},
	)

	await t.step(
		"returns false for false",
		function returnsFalseForFalse() {
			assertEquals(isNullish(false), false)
		},
	)

	await t.step(
		"returns false for empty array",
		function returnsFalseForEmptyArray() {
			assertEquals(isNullish([]), false)
		},
	)

	await t.step(
		"returns false for empty object",
		function returnsFalseForEmptyObject() {
			assertEquals(isNullish({}), false)
		},
	)

	await t.step(
		"returns false for numbers",
		function returnsFalseForNumbers() {
			assertEquals(isNullish(42), false)
		},
	)

	await t.step(
		"returns false for strings",
		function returnsFalseForStrings() {
			assertEquals(isNullish("hello"), false)
		},
	)
})

Deno.test("isNullish - property: all nullish values return true", function allNullishValuesTrue() {
	fc.assert(
		fc.property(
			fc.constantFrom(null, undefined),
			function propertyNullish(value) {
				assertEquals(isNullish(value), true)
			},
		),
	)
})

Deno.test("isNullish - property: all non-nullish values return false", function nonNullishValuesFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.boolean(),
				fc.integer(),
				fc.float(),
				fc.string(),
				fc.array(fc.anything()),
				fc.object(),
			),
			function propertyNonNullish(value) {
				assertEquals(isNullish(value), false)
			},
		),
	)
})
