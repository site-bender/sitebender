import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isString from "./index.ts"

Deno.test("isString", async function isStringTests(t) {
	await t.step(
		"returns true for string primitives",
		function returnsTrueForStrings() {
			assertEquals(isString(""), true)
			assertEquals(isString("hello"), true)
			assertEquals(isString("123"), true)
			assertEquals(isString("true"), true)
			assertEquals(isString("null"), true)
			assertEquals(isString("undefined"), true)
			assertEquals(isString(" "), true)
			assertEquals(isString("\n"), true)
			assertEquals(isString("\t"), true)
		},
	)

	await t.step(
		"returns false for String objects",
		function returnsFalseForStringObjects() {
			const stringObj1 = Object(String(""))
			const stringObj2 = Object(String("hello"))
			assertEquals(isString(stringObj1), false)
			assertEquals(isString(stringObj2), false)
		},
	)

	await t.step(
		"returns false for numbers",
		function returnsFalseForNumbers() {
			assertEquals(isString(0), false)
			assertEquals(isString(1), false)
			assertEquals(isString(-1), false)
			assertEquals(isString(3.14), false)
			assertEquals(isString(NaN), false)
			assertEquals(isString(Infinity), false)
			assertEquals(isString(-Infinity), false)
		},
	)

	await t.step(
		"returns false for booleans",
		function returnsFalseForBooleans() {
			assertEquals(isString(true), false)
			assertEquals(isString(false), false)
		},
	)

	await t.step(
		"returns false for null and undefined",
		function returnsFalseForNullish() {
			assertEquals(isString(null), false)
			assertEquals(isString(undefined), false)
		},
	)

	await t.step(
		"returns false for objects and arrays",
		function returnsFalseForObjects() {
			assertEquals(isString({}), false)
			assertEquals(isString([]), false)
			assertEquals(isString({ key: "value" }), false)
			assertEquals(isString([1, 2, 3]), false)
			assertEquals(isString(["a", "b"]), false)
		},
	)

	await t.step(
		"works as type guard",
		function typeGuard() {
			const value: string | number = "test"

			if (isString(value)) {
				// TypeScript knows value is string here
				assertEquals(value.length, 4)
				assertEquals(value.toUpperCase(), "TEST")
			}

			const numberValue: string | number = 42

			if (!isString(numberValue)) {
				// TypeScript knows numberValue is number here
				assertEquals(numberValue, 42)
			}
		},
	)

	await t.step("works with array filter", function arrayFilter() {
		const values: Array<string | number | boolean | null> = [
			"hello",
			42,
			"world",
			true,
			"test",
			null,
		]
		const strings = values.filter(isString)

		assertEquals(strings.length, 3)
		assertEquals(strings, ["hello", "world", "test"])
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allStrings = ["a", "b", "c"]
		const someStrings = ["a", 1, "c", 2]
		const noStrings = [1, 2, 3, true, false]

		assertEquals(allStrings.every(isString), true)
		assertEquals(someStrings.every(isString), false)
		assertEquals(noStrings.every(isString), false)

		assertEquals(allStrings.some(isString), true)
		assertEquals(someStrings.some(isString), true)
		assertEquals(noStrings.some(isString), false)
	})

	await t.step(
		"handles template literals",
		function templateLiterals() {
			const name = "World"
			const greeting = `Hello ${name}`
			assertEquals(isString(greeting), true)
			assertEquals(isString(`test`), true)
			assertEquals(isString(`${42}`), true)
		},
	)

	await t.step(
		"handles edge cases",
		function edgeCases() {
			// Empty string
			assertEquals(isString(""), true)

			// String with only whitespace
			assertEquals(isString("   "), true)

			// String with special characters
			assertEquals(isString("!@#$%^&*()"), true)

			// Unicode strings
			assertEquals(isString("你好"), true)
			assertEquals(isString("🚀"), true)

			// Multiline strings
			assertEquals(isString("line1\nline2"), true)

			// Symbol
			const sym = Symbol("test")
			assertEquals(isString(sym), false)

			// Function
			const fn = function () {}
			assertEquals(isString(fn), false)

			// BigInt
			const big = BigInt(9007199254740991)
			assertEquals(isString(big), false)

			// Date
			const date = new Date()
			assertEquals(isString(date), false)

			// RegExp
			const regex = /test/
			assertEquals(isString(regex), false)
		},
	)
})

Deno.test("isString - property: all strings return true", function allStringsTrue() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyAllStrings(value) {
				assertEquals(isString(value), true)
			},
		),
	)
})

Deno.test("isString - property: all non-strings return false", function nonStringsFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.boolean(),
				fc.float(),
				fc.array(fc.anything()),
				fc.object(),
				fc.constant(null),
				fc.constant(undefined),
			),
			function propertyNonStrings(value) {
				assertEquals(isString(value), false)
			},
		),
	)
})

Deno.test("isString - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyIdempotent(value) {
				const first = isString(value)
				const second = isString(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("isString - property: string concatenation preserves type", function concatPreservesType() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			function propertyConcatPreserves(a, b) {
				const result = a + b
				assertEquals(isString(result), true)
			},
		),
	)
})
