import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isNull from "../../validation/isNull/index.ts"
import isUndefined from "../../validation/isUndefined/index.ts"
import or from "./index.ts"

Deno.test("or - value mode", async function orValueModeTests(t) {
	await t.step(
		"returns true when first value is truthy",
		function firstTruthy() {
			assertEquals(or(true)(false), true)
			assertEquals(or(1)(0), true)
			assertEquals(or("hello")(""), true)
			assertEquals(or({})(null), true)
		},
	)

	await t.step(
		"returns true when second value is truthy",
		function secondTruthy() {
			assertEquals(or(false)(true), true)
			assertEquals(or(0)(1), true)
			assertEquals(or("")("hello"), true)
			assertEquals(or(null)({}), true)
		},
	)

	await t.step(
		"returns true when both values are truthy",
		function bothTruthy() {
			assertEquals(or(true)(true), true)
			assertEquals(or(1)(2), true)
			assertEquals(or("hello")("world"), true)
			assertEquals(or({})([]), true)
		},
	)

	await t.step(
		"returns false when both values are falsy",
		function bothFalsy() {
			assertEquals(or(false)(false), false)
			assertEquals(or(0)(0), false)
			assertEquals(or("")(""), false)
			assertEquals(or(null)(undefined), false)
		},
	)

	await t.step(
		"is curried",
		function curried() {
			const orTrue = or(true)
			assertEquals(orTrue(true), true)
			assertEquals(orTrue(false), true)

			const orFalse = or(false)
			assertEquals(orFalse(true), true)
			assertEquals(orFalse(false), false)
		},
	)
})

Deno.test("or - predicate mode", async function orPredicateModeTests(t) {
	await t.step(
		"combines two predicates",
		function combinePredicates() {
			const isNullOrUndefined = or(isNull)(isUndefined)

			assertEquals(isNullOrUndefined(null), true)
			assertEquals(isNullOrUndefined(undefined), true)
			assertEquals(isNullOrUndefined("hello"), false)
			assertEquals(isNullOrUndefined(0), false)
		},
	)

	await t.step(
		"short-circuits on first predicate success",
		function shortCircuit() {
			let secondCalled = false

			const alwaysTrue = function () {
				return true
			}

			const trackCalls = function () {
				secondCalled = true
				return false
			}

			const combined = or(alwaysTrue)(trackCalls)
			combined("test")

			assertEquals(secondCalled, false)
		},
	)

	await t.step(
		"calls second predicate when first fails",
		function callsSecond() {
			let secondCalled = false

			const alwaysFalse = function () {
				return false
			}

			const trackCalls = function () {
				secondCalled = true
				return false
			}

			const combined = or(alwaysFalse)(trackCalls)
			combined("test")

			assertEquals(secondCalled, true)
		},
	)

	await t.step(
		"works with custom predicates",
		function customPredicates() {
			const isNegative = function (n: unknown): n is number {
				return typeof n === "number" && n < 0
			}

			const isZero = function (n: unknown): n is number {
				return typeof n === "number" && n === 0
			}

			const isNonPositive = or(isNegative)(isZero)

			assertEquals(isNonPositive(-5), true)
			assertEquals(isNonPositive(0), true)
			assertEquals(isNonPositive(5), false)
			assertEquals(isNonPositive("test"), false)
		},
	)
})

Deno.test("or - property: commutative for booleans", function commutative() {
	fc.assert(
		fc.property(
			fc.boolean(),
			fc.boolean(),
			function propertyCommutative(a, b) {
				assertEquals(or(a)(b), or(b)(a))
			},
		),
	)
})

Deno.test("or - property: associative", function associative() {
	fc.assert(
		fc.property(
			fc.boolean(),
			fc.boolean(),
			fc.boolean(),
			function propertyAssociative(a, b, c) {
				// (a || b) || c === a || (b || c)
				const left = or(or(a)(b))(c)
				const right = or(a)(or(b)(c))
				assertEquals(left, right)
			},
		),
	)
})

Deno.test("or - property: identity element (false)", function identity() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyIdentity(value) {
				assertEquals(or(false)(value), value)
				assertEquals(or(value)(false), value)
			},
		),
	)
})

Deno.test("or - property: annihilator element (true)", function annihilator() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyAnnihilator(value) {
				assertEquals(or(true)(value), true)
				assertEquals(or(value)(true), true)
			},
		),
	)
})

Deno.test("or - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyIdempotent(value) {
				assertEquals(or(value)(value), value)
			},
		),
	)
})
