import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isNumber from "./index.ts"

Deno.test("isNumber", async function isNumberTests(t) {
	await t.step(
		"returns true for number primitives",
		function returnsTrueForNumbers() {
			assertEquals(isNumber(0), true)
			assertEquals(isNumber(1), true)
			assertEquals(isNumber(-1), true)
			assertEquals(isNumber(42), true)
			assertEquals(isNumber(3.14), true)
			assertEquals(isNumber(-3.14), true)
			assertEquals(isNumber(0.1), true)
			assertEquals(isNumber(Number.MAX_SAFE_INTEGER), true)
			assertEquals(isNumber(Number.MIN_SAFE_INTEGER), true)
			assertEquals(isNumber(Number.MAX_VALUE), true)
			assertEquals(isNumber(Number.MIN_VALUE), true)
			assertEquals(isNumber(Number.EPSILON), true)
		},
	)

	await t.step(
		"returns false for NaN",
		function returnsFalseForNaN() {
			assertEquals(isNumber(NaN), false)
			assertEquals(isNumber(Number.NaN), false)
			assertEquals(isNumber(0 / 0), false)
		},
	)

	await t.step(
		"returns true for Infinity",
		function returnsTrueForInfinity() {
			assertEquals(isNumber(Infinity), true)
			assertEquals(isNumber(-Infinity), true)
			assertEquals(isNumber(Number.POSITIVE_INFINITY), true)
			assertEquals(isNumber(Number.NEGATIVE_INFINITY), true)
		},
	)

	await t.step(
		"returns false for Number objects",
		function returnsFalseForNumberObjects() {
			const numObj1 = Object(Number(42))
			const numObj2 = Object(Number(0))
			assertEquals(isNumber(numObj1), false)
			assertEquals(isNumber(numObj2), false)
		},
	)

	await t.step(
		"returns false for strings",
		function returnsFalseForStrings() {
			assertEquals(isNumber("0"), false)
			assertEquals(isNumber("42"), false)
			assertEquals(isNumber("3.14"), false)
			assertEquals(isNumber(""), false)
			assertEquals(isNumber("hello"), false)
		},
	)

	await t.step(
		"returns false for booleans",
		function returnsFalseForBooleans() {
			assertEquals(isNumber(true), false)
			assertEquals(isNumber(false), false)
		},
	)

	await t.step(
		"returns false for null and undefined",
		function returnsFalseForNullish() {
			assertEquals(isNumber(null), false)
			assertEquals(isNumber(undefined), false)
		},
	)

	await t.step(
		"returns false for objects and arrays",
		function returnsFalseForObjects() {
			assertEquals(isNumber({}), false)
			assertEquals(isNumber([]), false)
			assertEquals(isNumber([1, 2, 3]), false)
			assertEquals(isNumber({ value: 42 }), false)
		},
	)

	await t.step(
		"works as type guard",
		function typeGuard() {
			const value: number | string = 42

			if (isNumber(value)) {
				// TypeScript knows value is number here
				assertEquals(value * 2, 84)
			}

			const stringValue: number | string = "hello"

			if (!isNumber(stringValue)) {
				// TypeScript knows stringValue is string here
				assertEquals(stringValue.length, 5)
			}
		},
	)

	await t.step("works with array filter", function arrayFilter() {
		const values: Array<number | string | boolean | null> = [
			1,
			"hello",
			42,
			true,
			3.14,
			null,
			NaN,
		]
		const numbers = values.filter(isNumber)

		assertEquals(numbers.length, 3)
		assertEquals(numbers, [1, 42, 3.14])
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allNumbers = [1, 2, 3, 4.5]
		const someNumbers = [1, "hello", 3, true]
		const noNumbers = ["a", "b", true, false, null]

		assertEquals(allNumbers.every(isNumber), true)
		assertEquals(someNumbers.every(isNumber), false)
		assertEquals(noNumbers.every(isNumber), false)

		assertEquals(allNumbers.some(isNumber), true)
		assertEquals(someNumbers.some(isNumber), true)
		assertEquals(noNumbers.some(isNumber), false)
	})

	await t.step(
		"handles edge cases",
		function edgeCases() {
			// Zero
			assertEquals(isNumber(0), true)
			assertEquals(isNumber(-0), true)

			// Negative zero
			assertEquals(isNumber(Object.is(0, -0) ? 0 : -0), true)

			// Scientific notation
			assertEquals(isNumber(1e10), true)
			assertEquals(isNumber(1e-10), true)

			// Hexadecimal
			assertEquals(isNumber(0xff), true)

			// Octal
			assertEquals(isNumber(0o10), true)

			// Binary
			assertEquals(isNumber(0b1010), true)

			// Symbol
			const sym = Symbol("test")
			assertEquals(isNumber(sym), false)

			// Function
			const fn = function () {}
			assertEquals(isNumber(fn), false)

			// BigInt
			const big = BigInt(42)
			assertEquals(isNumber(big), false)

			// Date
			const date = new Date()
			assertEquals(isNumber(date), false)

			// RegExp
			const regex = /test/
			assertEquals(isNumber(regex), false)
		},
	)
})

Deno.test("isNumber - property: all finite numbers return true", function allFiniteNumbersTrue() {
	fc.assert(
		fc.property(
			fc.integer(),
			function propertyAllIntegers(value) {
				assertEquals(isNumber(value), true)
			},
		),
	)

	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true }),
			function propertyAllFloats(value) {
				assertEquals(isNumber(value), true)
			},
		),
	)
})

Deno.test("isNumber - property: all non-numbers return false", function nonNumbersFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.boolean(),
				fc.array(fc.anything()),
				fc.object(),
				fc.constant(null),
				fc.constant(undefined),
			),
			function propertyNonNumbers(value) {
				assertEquals(isNumber(value), false)
			},
		),
	)
})

Deno.test("isNumber - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyIdempotent(value) {
				const first = isNumber(value)
				const second = isNumber(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("isNumber - property: arithmetic operations preserve number type", function arithmeticPreserves() {
	fc.assert(
		fc.property(
			fc.integer(),
			fc.integer({ min: 1 }),
			function propertyArithmetic(a, b) {
				assertEquals(isNumber(a + b), true)
				assertEquals(isNumber(a - b), true)
				assertEquals(isNumber(a * b), true)
				assertEquals(isNumber(a / b), true)
			},
		),
	)
})
