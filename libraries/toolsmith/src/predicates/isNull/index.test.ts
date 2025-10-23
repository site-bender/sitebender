import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isNull from "./index.ts"

Deno.test("isNull", async function isNullTests(t) {
	await t.step(
		"returns true for null",
		function returnsTrueForNull() {
			assertEquals(isNull(null), true)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			assertEquals(isNull(undefined), false)
		},
	)

	await t.step(
		"returns false for falsy values",
		function returnsFalseForFalsy() {
			assertEquals(isNull(0), false)
			assertEquals(isNull(""), false)
			assertEquals(isNull(false), false)
			assertEquals(isNull(NaN), false)
		},
	)

	await t.step(
		"returns false for truthy values",
		function returnsFalseForTruthy() {
			assertEquals(isNull(1), false)
			assertEquals(isNull("hello"), false)
			assertEquals(isNull(true), false)
			assertEquals(isNull({}), false)
			assertEquals(isNull([]), false)
			assertEquals(isNull({ key: "value" }), false)
			assertEquals(isNull([1, 2, 3]), false)
		},
	)

	await t.step(
		"works as type guard",
		function typeGuard() {
			const value: string | null = null

			if (isNull(value)) {
				// TypeScript knows value is null here
				assertEquals(value, null)
			}

			const stringValue: string | null = "test"

			if (!isNull(stringValue)) {
				// TypeScript knows stringValue is string here
				assertEquals(stringValue.length, 4)
			}
		},
	)

	await t.step("works with array filter", function arrayFilter() {
		const values = [1, null, "test", null, undefined, null]
		const nullValues = values.filter(isNull)

		assertEquals(nullValues.length, 3)
		assertEquals(nullValues, [null, null, null])
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allNull = [null, null, null]
		const someNull = [1, null, 3, null]
		const noNull = [1, 2, 3, undefined]

		assertEquals(allNull.every(isNull), true)
		assertEquals(someNull.every(isNull), false)
		assertEquals(noNull.every(isNull), false)

		assertEquals(allNull.some(isNull), true)
		assertEquals(someNull.some(isNull), true)
		assertEquals(noNull.some(isNull), false)
	})

	await t.step(
		"distinguishes null from undefined",
		function distinguishNullFromUndefined() {
			const nullValue = null
			const undefinedValue = undefined

			assertEquals(isNull(nullValue), true)
			assertEquals(isNull(undefinedValue), false)

			// Explicit check that they are different
			if (isNull(nullValue)) {
				assertEquals(isNull(undefinedValue), false)
			}
		},
	)

	await t.step(
		"handles edge cases",
		function edgeCases() {
			// Object with null prototype
			const obj = Object.create(null)
			assertEquals(isNull(obj), false)

			// Symbol
			const sym = Symbol("test")
			assertEquals(isNull(sym), false)

			// Function
			const fn = function () {}
			assertEquals(isNull(fn), false)

			// BigInt
			const big = BigInt(0)
			assertEquals(isNull(big), false)

			// Date
			const date = new Date()
			assertEquals(isNull(date), false)

			// RegExp
			const regex = /test/
			assertEquals(isNull(regex), false)
		},
	)
})

Deno.test("isNull - property: only null returns true", function onlyNullTrue() {
	fc.assert(
		fc.property(
			fc.constant(null),
			function propertyOnlyNull(value) {
				assertEquals(isNull(value), true)
			},
		),
	)
})

Deno.test("isNull - property: all non-null values return false", function nonNullFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.string(),
				fc.boolean(),
				fc.float(),
				fc.array(fc.anything()),
				fc.object(),
				fc.constant(undefined),
			),
			function propertyNonNull(value) {
				assertEquals(isNull(value), false)
			},
		),
	)
})

Deno.test("isNull - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyIdempotent(value) {
				const first = isNull(value)
				const second = isNull(value)
				assertEquals(first, second)
			},
		),
	)
})
