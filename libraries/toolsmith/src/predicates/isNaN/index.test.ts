import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isNaN from "./index.ts"

Deno.test("isNaN", async function isNaNTests(t) {
	await t.step(
		"returns true for NaN",
		function returnsTrueForNaN() {
			assertEquals(isNaN(NaN), true)
			assertEquals(isNaN(Number.NaN), true)
			assertEquals(isNaN(0 / 0), true)
		},
	)

	await t.step(
		"returns false for numbers",
		function returnsFalseForNumbers() {
			assertEquals(isNaN(42), false)
			assertEquals(isNaN(0), false)
		},
	)

	await t.step(
		"returns false for Infinity",
		function returnsFalseForInfinity() {
			assertEquals(isNaN(Infinity), false)
			assertEquals(isNaN(-Infinity), false)
		},
	)

	await t.step(
		"returns false for strings",
		function returnsFalseForStrings() {
			assertEquals(isNaN("NaN"), false)
		},
	)

	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			assertEquals(isNaN(null), false)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			assertEquals(isNaN(undefined), false)
		},
	)

	await t.step(
		"returns false for objects",
		function returnsFalseForObjects() {
			assertEquals(isNaN({}), false)
		},
	)
})

Deno.test("isNaN - property: all valid numbers return false", function allValidNumbersFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.float({ noNaN: true }),
			),
			function propertyValidNumbers(value) {
				assertEquals(isNaN(value), false)
			},
		),
	)
})

Deno.test("isNaN - property: all non-numbers return false", function nonNumbersFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.boolean(),
				fc.array(fc.anything()),
				fc.dictionary(fc.string(), fc.anything()),
			),
			function propertyNonNumbers(value) {
				assertEquals(isNaN(value), false)
			},
		),
	)
})
