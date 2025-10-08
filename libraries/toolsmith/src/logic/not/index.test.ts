import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import not from "./index.ts"

Deno.test("not", async function notTests(t) {
	await t.step(
		"returns true for falsy values",
		function returnsTrueForFalsy() {
			assertEquals(not(false), true)
			assertEquals(not(0), true)
			assertEquals(not(""), true)
			assertEquals(not(null), true)
			assertEquals(not(undefined), true)
			assertEquals(not(NaN), true)
		},
	)

	await t.step(
		"returns false for truthy values",
		function returnsFalseForTruthy() {
			assertEquals(not(true), false)
			assertEquals(not(1), false)
			assertEquals(not(-1), false)
			assertEquals(not("hello"), false)
			assertEquals(not("0"), false)
			assertEquals(not({}), false)
			assertEquals(not([]), false)
			assertEquals(not([1, 2, 3]), false)
			assertEquals(not({ key: "value" }), false)
		},
	)

	await t.step(
		"handles boolean negation",
		function booleanNegation() {
			assertEquals(not(true), false)
			assertEquals(not(false), true)
		},
	)

	await t.step(
		"handles edge cases",
		function edgeCases() {
			// Infinity
			assertEquals(not(Infinity), false)
			assertEquals(not(-Infinity), false)

			// Symbol
			const sym = Symbol("test")
			assertEquals(not(sym), false)

			// Function
			const fn = function () {}
			assertEquals(not(fn), false)

			// BigInt zero
			assertEquals(not(BigInt(0)), true)

			// BigInt non-zero
			assertEquals(not(BigInt(1)), false)

			// Date
			const date = new Date()
			assertEquals(not(date), false)

			// RegExp
			const regex = /test/
			assertEquals(not(regex), false)
		},
	)

	await t.step(
		"composes with itself (double negation)",
		function doubleNegation() {
			assertEquals(not(not(true)), true)
			assertEquals(not(not(false)), false)
			assertEquals(not(not(0)), false)
			assertEquals(not(not(1)), true)
			assertEquals(not(not("")), false)
			assertEquals(not(not("hello")), true)
		},
	)
})

Deno.test("not - property: double negation law", function doubleNegationLaw() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyDoubleNegation(value) {
				assertEquals(not(not(value)), value)
			},
		),
	)
})

Deno.test("not - property: involution (applying twice returns original)", function involution() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyInvolution(value) {
				const negated = not(value)
				const doubleNegated = not(negated)
				// Double negation should coerce to boolean and return equivalent value
				assertEquals(doubleNegated, Boolean(value))
			},
		),
	)
})

Deno.test("not - property: exclusive truth values", function exclusiveTruth() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyExclusive(value) {
				const original = Boolean(value)
				const negated = not(value)
				// One must be true, the other false
				assertEquals(original !== negated, true)
			},
		),
	)
})
