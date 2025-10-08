import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isUndefined from "./index.ts"

Deno.test("isUndefined", async function isUndefinedTests(t) {
	await t.step(
		"returns true for undefined",
		function returnsTrueForUndefined() {
			assertEquals(isUndefined(undefined), true)
		},
	)

	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			assertEquals(isUndefined(null), false)
		},
	)

	await t.step(
		"returns false for falsy values",
		function returnsFalseForFalsy() {
			assertEquals(isUndefined(0), false)
			assertEquals(isUndefined(""), false)
			assertEquals(isUndefined(false), false)
			assertEquals(isUndefined(NaN), false)
		},
	)

	await t.step(
		"returns false for truthy values",
		function returnsFalseForTruthy() {
			assertEquals(isUndefined(1), false)
			assertEquals(isUndefined("hello"), false)
			assertEquals(isUndefined(true), false)
			assertEquals(isUndefined({}), false)
			assertEquals(isUndefined([]), false)
			assertEquals(isUndefined({ key: "value" }), false)
			assertEquals(isUndefined([1, 2, 3]), false)
		},
	)

	await t.step(
		"works as type guard",
		function typeGuard() {
			const value: number | undefined = undefined

			if (isUndefined(value)) {
				// TypeScript knows value is undefined here
				assertEquals(value, undefined)
			}

			const numberValue: number | undefined = 42

			if (!isUndefined(numberValue)) {
				// TypeScript knows numberValue is number here
				assertEquals(numberValue, 42)
			}
		},
	)

	await t.step("works with array filter", function arrayFilter() {
		const values = [1, undefined, "test", undefined, null, undefined]
		const undefinedValues = values.filter(isUndefined)

		assertEquals(undefinedValues.length, 3)
		assertEquals(undefinedValues, [undefined, undefined, undefined])
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allUndefined = [undefined, undefined, undefined]
		const someUndefined = [1, undefined, 3, undefined]
		const noUndefined = [1, 2, 3, null]

		assertEquals(allUndefined.every(isUndefined), true)
		assertEquals(someUndefined.every(isUndefined), false)
		assertEquals(noUndefined.every(isUndefined), false)

		assertEquals(allUndefined.some(isUndefined), true)
		assertEquals(someUndefined.some(isUndefined), true)
		assertEquals(noUndefined.some(isUndefined), false)
	})

	await t.step(
		"distinguishes undefined from null",
		function distinguishUndefinedFromNull() {
			const undefinedValue = undefined
			const nullValue = null

			assertEquals(isUndefined(undefinedValue), true)
			assertEquals(isUndefined(nullValue), false)

			// Explicit check that they are different
			if (isUndefined(undefinedValue)) {
				assertEquals(isUndefined(nullValue), false)
			}
		},
	)

	await t.step(
		"handles edge cases",
		function edgeCases() {
			// Void function returns undefined
			const voidResult = (function () {})()
			assertEquals(isUndefined(voidResult), true)

			// Missing object property is undefined
			const obj = {} as { prop?: string }
			assertEquals(isUndefined(obj.prop), true)

			// Uninitialized variable would be undefined
			let uninit: string | undefined
			assertEquals(isUndefined(uninit), true)

			// Symbol
			const sym = Symbol("test")
			assertEquals(isUndefined(sym), false)

			// Function
			const fn = function () {}
			assertEquals(isUndefined(fn), false)

			// BigInt
			const big = BigInt(0)
			assertEquals(isUndefined(big), false)

			// Date
			const date = new Date()
			assertEquals(isUndefined(date), false)

			// RegExp
			const regex = /test/
			assertEquals(isUndefined(regex), false)
		},
	)
})

Deno.test("isUndefined - property: only undefined returns true", function onlyUndefinedTrue() {
	fc.assert(
		fc.property(
			fc.constant(undefined),
			function propertyOnlyUndefined(value) {
				assertEquals(isUndefined(value), true)
			},
		),
	)
})

Deno.test("isUndefined - property: all non-undefined values return false", function nonUndefinedFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.string(),
				fc.boolean(),
				fc.float(),
				fc.array(fc.anything()),
				fc.object(),
				fc.constant(null),
			),
			function propertyNonUndefined(value) {
				assertEquals(isUndefined(value), false)
			},
		),
	)
})

Deno.test("isUndefined - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyIdempotent(value) {
				const first = isUndefined(value)
				const second = isUndefined(value)
				assertEquals(first, second)
			},
		),
	)
})
