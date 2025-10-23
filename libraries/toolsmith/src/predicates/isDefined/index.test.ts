import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isDefined from "./index.ts"

Deno.test("isDefined", async function isDefinedTests(t) {
	await t.step(
		"returns true for defined values",
		function returnsTrueForDefined() {
			assertEquals(isDefined(0), true)
			assertEquals(isDefined(""), true)
			assertEquals(isDefined("hello"), true)
			assertEquals(isDefined(42), true)
			assertEquals(isDefined(false), true)
			assertEquals(isDefined(true), true)
			assertEquals(isDefined({}), true)
			assertEquals(isDefined([]), true)
			assertEquals(isDefined({ key: "value" }), true)
			assertEquals(isDefined([1, 2, 3]), true)
			assertEquals(isDefined(NaN), true)
			assertEquals(isDefined(Infinity), true)
			assertEquals(isDefined(-Infinity), true)
		},
	)

	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			assertEquals(isDefined(null), false)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			assertEquals(isDefined(undefined), false)
		},
	)

	await t.step(
		"works as type guard with null",
		function typeGuardWithNull() {
			const value: string | null = "test"

			if (isDefined(value)) {
				// TypeScript knows value is string here
				assertEquals(value.length, 4)
			}

			const nullValue: string | null = null

			if (!isDefined(nullValue)) {
				// TypeScript knows nullValue is null here
				assertEquals(nullValue, null)
			}
		},
	)

	await t.step(
		"works as type guard with undefined",
		function typeGuardWithUndefined() {
			const value: number | undefined = 42

			if (isDefined(value)) {
				// TypeScript knows value is number here
				assertEquals(value, 42)
			}

			const undefinedValue: number | undefined = undefined

			if (!isDefined(undefinedValue)) {
				// TypeScript knows undefinedValue is undefined here
				assertEquals(undefinedValue, undefined)
			}
		},
	)

	await t.step(
		"works as type guard with null | undefined",
		function typeGuardWithNullOrUndefined() {
			const value: string | null | undefined = "hello"

			if (isDefined(value)) {
				// TypeScript knows value is string here
				assertEquals(value.toUpperCase(), "HELLO")
			}
		},
	)

	await t.step("works with array filter", function arrayFilter() {
		const values = [1, null, 2, undefined, 3, null, 4]
		const defined = values.filter(isDefined)

		assertEquals(defined.length, 4)
		assertEquals(defined, [1, 2, 3, 4])
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allDefined = [1, 2, 3, 4]
		const someUndefined = [1, null, 3, undefined]
		const allNullish = [null, undefined, null]

		assertEquals(allDefined.every(isDefined), true)
		assertEquals(someUndefined.every(isDefined), false)
		assertEquals(allNullish.every(isDefined), false)

		assertEquals(allDefined.some(isDefined), true)
		assertEquals(someUndefined.some(isDefined), true)
		assertEquals(allNullish.some(isDefined), false)
	})

	await t.step(
		"handles edge cases",
		function edgeCases() {
			// Symbol
			const sym = Symbol("test")
			assertEquals(isDefined(sym), true)

			// Function
			const fn = function () {}
			assertEquals(isDefined(fn), true)

			// BigInt
			const big = BigInt(9007199254740991)
			assertEquals(isDefined(big), true)

			// Date
			const date = new Date()
			assertEquals(isDefined(date), true)

			// RegExp
			const regex = /test/
			assertEquals(isDefined(regex), true)

			// Error
			const err = new Error("test")
			assertEquals(isDefined(err), true)
		},
	)
})

Deno.test("isDefined - property: double negation", function doubleNegation() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyDoubleNegation(value) {
				const result = isDefined(value)
				// If defined, should be defined when checked twice
				if (result) {
					assertEquals(isDefined(value), true)
				}
				// If not defined, should consistently be not defined
				if (!result) {
					assertEquals(isDefined(value), false)
				}
			},
		),
	)
})

Deno.test("isDefined - property: null and undefined are never defined", function neverDefined() {
	fc.assert(
		fc.property(
			fc.constantFrom(null, undefined),
			function propertyNeverDefined(value) {
				assertEquals(isDefined(value), false)
			},
		),
	)
})

Deno.test("isDefined - property: all other values are defined", function otherValuesDefined() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.string(),
				fc.boolean(),
				fc.float(),
				fc.array(fc.anything()),
				fc.object(),
			),
			function propertyOtherDefined(value) {
				assertEquals(isDefined(value), true)
			},
		),
	)
})
