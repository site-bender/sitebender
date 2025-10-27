import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isBoolean from "./index.ts"

Deno.test("isBoolean", async function isBooleanTests(t) {
	await t.step(
		"returns true for boolean primitives",
		function returnsTrueForBooleans() {
			assertEquals(isBoolean(true), true)
			assertEquals(isBoolean(false), true)
		},
	)

	await t.step(
		"returns false for Boolean objects",
		function returnsFalseForBooleanObjects() {
			const boolObj1 = Object(Boolean(true))
			const boolObj2 = Object(Boolean(false))
			assertEquals(isBoolean(boolObj1), false)
			assertEquals(isBoolean(boolObj2), false)
		},
	)

	await t.step(
		"returns false for numbers",
		function returnsFalseForNumbers() {
			assertEquals(isBoolean(0), false)
			assertEquals(isBoolean(1), false)
			assertEquals(isBoolean(-1), false)
			assertEquals(isBoolean(3.14), false)
			assertEquals(isBoolean(NaN), false)
			assertEquals(isBoolean(Infinity), false)
			assertEquals(isBoolean(-Infinity), false)
		},
	)

	await t.step(
		"returns false for strings",
		function returnsFalseForStrings() {
			assertEquals(isBoolean("true"), false)
			assertEquals(isBoolean("false"), false)
			assertEquals(isBoolean(""), false)
			assertEquals(isBoolean("hello"), false)
		},
	)

	await t.step(
		"returns false for null and undefined",
		function returnsFalseForNullish() {
			assertEquals(isBoolean(null), false)
			assertEquals(isBoolean(undefined), false)
		},
	)

	await t.step(
		"returns false for objects and arrays",
		function returnsFalseForObjects() {
			assertEquals(isBoolean({}), false)
			assertEquals(isBoolean([]), false)
			assertEquals(isBoolean({ key: true }), false)
			assertEquals(isBoolean([true, false]), false)
		},
	)

	await t.step(
		"works as type guard",
		function typeGuard() {
			const value: boolean | number = true

			if (isBoolean(value)) {
				// TypeScript knows value is boolean here
				assertEquals(value, true)
				assertEquals(!value, false)
			}

			const numberValue: boolean | number = 42

			if (!isBoolean(numberValue)) {
				// TypeScript knows numberValue is number here
				assertEquals(numberValue, 42)
			}
		},
	)

	await t.step("works with array filter", function arrayFilter() {
		const values: Array<string | number | boolean | null> = [
			true,
			42,
			false,
			"hello",
			true,
			null,
		]
		const booleans = values.filter(isBoolean)

		assertEquals(booleans.length, 3)
		assertEquals(booleans, [true, false, true])
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allBooleans = [true, false, true]
		const someBooleans = [true, 1, false, 2]
		const noBooleans = [1, 2, 3, "test", null]

		assertEquals(allBooleans.every(isBoolean), true)
		assertEquals(someBooleans.every(isBoolean), false)
		assertEquals(noBooleans.every(isBoolean), false)

		assertEquals(allBooleans.some(isBoolean), true)
		assertEquals(someBooleans.some(isBoolean), true)
		assertEquals(noBooleans.some(isBoolean), false)
	})

	await t.step(
		"handles boolean coercion edge cases",
		function booleanCoercion() {
			// These values are truthy/falsy but not booleans
			assertEquals(isBoolean(0), false)
			assertEquals(isBoolean(1), false)
			assertEquals(isBoolean(""), false)
			assertEquals(isBoolean("non-empty"), false)
			assertEquals(isBoolean([]), false)
			assertEquals(isBoolean({}), false)

			// Explicit boolean conversion creates primitives
			assertEquals(isBoolean(Boolean(0)), true)
			assertEquals(isBoolean(Boolean(1)), true)
			assertEquals(isBoolean(Boolean("")), true)
			assertEquals(isBoolean(Boolean("non-empty")), true)

			// Double negation creates primitives
			assertEquals(isBoolean(!!0), true)
			assertEquals(isBoolean(!!1), true)
			assertEquals(isBoolean(!!""), true)
		},
	)

	await t.step(
		"handles edge cases",
		function edgeCases() {
			// Symbol
			const sym = Symbol("test")
			assertEquals(isBoolean(sym), false)

			// Function
			const fn = function () {}
			assertEquals(isBoolean(fn), false)

			// BigInt
			const big = BigInt(1)
			assertEquals(isBoolean(big), false)

			// Date
			const date = new Date()
			assertEquals(isBoolean(date), false)

			// RegExp
			const regex = /test/
			assertEquals(isBoolean(regex), false)
		},
	)
})

Deno.test("isBoolean - property: all booleans return true", function allBooleansTrue() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyAllBooleans(value) {
				assertEquals(isBoolean(value), true)
			},
		),
	)
})

Deno.test("isBoolean - property: all non-booleans return false", function nonBooleansFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.string(),
				fc.float(),
				fc.array(fc.anything()),
				fc.object(),
				fc.constant(null),
				fc.constant(undefined),
			),
			function propertyNonBooleans(value) {
				assertEquals(isBoolean(value), false)
			},
		),
	)
})

Deno.test("isBoolean - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyIdempotent(value) {
				const first = isBoolean(value)
				const second = isBoolean(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("isBoolean - property: negation preserves boolean type", function negationPreservesType() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyNegationPreserves(value) {
				const negated = !value
				assertEquals(isBoolean(negated), true)
				const doubleNegated = !!value
				assertEquals(isBoolean(doubleNegated), true)
			},
		),
	)
})

Deno.test("isBoolean - property: Boolean() creates boolean primitives", function booleanFunctionCreates() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyBooleanFunction(value) {
				const converted = Boolean(value)
				assertEquals(isBoolean(converted), true)
			},
		),
	)
})
