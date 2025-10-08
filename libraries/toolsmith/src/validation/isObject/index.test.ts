import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isObject from "./index.ts"

Deno.test("isObject", async function isObjectTests(t) {
	await t.step(
		"returns true for plain objects",
		function returnsTrueForPlainObjects() {
			assertEquals(isObject({}), true)
			assertEquals(isObject({ a: 1, b: 2 }), true)
		},
	)

	await t.step(
		"returns true for arrays",
		function returnsTrueForArrays() {
			assertEquals(isObject([]), true)
			assertEquals(isObject([1, 2, 3]), true)
		},
	)

	await t.step(
		"returns true for Date objects",
		function returnsTrueForDates() {
			assertEquals(isObject(new Date()), true)
		},
	)

	await t.step(
		"returns true for RegExp objects",
		function returnsTrueForRegExps() {
			assertEquals(isObject(/test/), true)
		},
	)

	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			assertEquals(isObject(null), false)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			assertEquals(isObject(undefined), false)
		},
	)

	await t.step(
		"returns false for strings",
		function returnsFalseForStrings() {
			assertEquals(isObject("hello"), false)
		},
	)

	await t.step(
		"returns false for numbers",
		function returnsFalseForNumbers() {
			assertEquals(isObject(42), false)
		},
	)

	await t.step(
		"returns false for booleans",
		function returnsFalseForBooleans() {
			assertEquals(isObject(true), false)
			assertEquals(isObject(false), false)
		},
	)
})

Deno.test("isObject - property: all objects return true", function allObjectsTrue() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.object(),
				fc.array(fc.anything()),
				fc.date(),
			),
			function propertyObjects(value) {
				assertEquals(isObject(value), true)
			},
		),
	)
})

Deno.test("isObject - property: all primitives return false", function primitivesFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.integer(),
				fc.float(),
				fc.boolean(),
			),
			function propertyPrimitives(value) {
				assertEquals(isObject(value), false)
			},
		),
	)
})
