import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isDate from "./index.ts"

Deno.test("isDate", async function isDateTests(t) {
	await t.step(
		"returns true for Date objects",
		function returnsTrueForDates() {
			assertEquals(isDate(new Date()), true)
			assertEquals(isDate(new Date("2024-01-01")), true)
		},
	)

	await t.step(
		"returns true for invalid dates",
		function returnsTrueForInvalidDates() {
			assertEquals(isDate(new Date("invalid")), true)
		},
	)

	await t.step(
		"returns false for date strings",
		function returnsFalseForDateStrings() {
			assertEquals(isDate("2024-01-01"), false)
		},
	)

	await t.step(
		"returns false for timestamps",
		function returnsFalseForTimestamps() {
			assertEquals(isDate(Date.now()), false)
		},
	)

	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			assertEquals(isDate(null), false)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			assertEquals(isDate(undefined), false)
		},
	)

	await t.step(
		"returns false for objects",
		function returnsFalseForObjects() {
			assertEquals(isDate({}), false)
		},
	)

	await t.step(
		"returns false for arrays",
		function returnsFalseForArrays() {
			assertEquals(isDate([]), false)
		},
	)
})

Deno.test("isDate - property: all Date objects return true", function allDatesTrue() {
	fc.assert(
		fc.property(
			fc.date(),
			function propertyDates(value) {
				assertEquals(isDate(value), true)
			},
		),
	)
})

Deno.test("isDate - property: all non-Date values return false", function nonDatesFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.integer(),
				fc.float(),
				fc.boolean(),
				fc.array(fc.anything()),
				fc.dictionary(fc.string(), fc.anything()),
			),
			function propertyNonDates(value) {
				assertEquals(isDate(value), false)
			},
		),
	)
})
