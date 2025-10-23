import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isPlainObject from "./index.ts"

Deno.test("isPlainObject", async function isPlainObjectTests(t) {
	await t.step(
		"returns true for plain object literals",
		function returnsTrueForPlainObjects() {
			assertEquals(isPlainObject({}), true)
			assertEquals(isPlainObject({ a: 1, b: 2 }), true)
		},
	)

	await t.step(
		"returns true for Object.create(null)",
		function returnsTrueForObjectCreateNull() {
			assertEquals(isPlainObject(Object.create(null)), true)
		},
	)

	await t.step(
		"returns true for new Object()",
		function returnsTrueForNewObject() {
			assertEquals(isPlainObject(new Object()), true)
		},
	)

	await t.step(
		"returns false for arrays",
		function returnsFalseForArrays() {
			assertEquals(isPlainObject([]), false)
		},
	)

	await t.step(
		"returns false for Date objects",
		function returnsFalseForDates() {
			assertEquals(isPlainObject(new Date()), false)
		},
	)

	await t.step(
		"returns false for RegExp objects",
		function returnsFalseForRegExps() {
			assertEquals(isPlainObject(/test/), false)
		},
	)

	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			assertEquals(isPlainObject(null), false)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			assertEquals(isPlainObject(undefined), false)
		},
	)

	await t.step(
		"returns false for strings",
		function returnsFalseForStrings() {
			assertEquals(isPlainObject("hello"), false)
		},
	)

	await t.step(
		"returns false for numbers",
		function returnsFalseForNumbers() {
			assertEquals(isPlainObject(42), false)
		},
	)

	await t.step(
		"returns false for class instances",
		function returnsFalseForClassInstances() {
			class TestClass {}
			assertEquals(isPlainObject(new TestClass()), false)
		},
	)
})

Deno.test("isPlainObject - property: object literals return true", function objectLiteralsTrue() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.anything()),
			function propertyObjectLiterals(value) {
				assertEquals(isPlainObject(value), true)
			},
		),
	)
})

Deno.test("isPlainObject - property: primitives return false", function primitivesFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.integer(),
				fc.float(),
				fc.boolean(),
			),
			function propertyPrimitives(value) {
				assertEquals(isPlainObject(value), false)
			},
		),
	)
})
