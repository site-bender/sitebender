import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isDefined from "../../validation/isDefined/index.ts"
import isString from "../../validation/isString/index.ts"
import and from "./index.ts"

Deno.test("and - value mode", async function andValueModeTests(t) {
	await t.step(
		"returns true when both values are truthy",
		function bothTruthy() {
			assertEquals(and(true)(true), true)
			assertEquals(and(1)(2), true)
			assertEquals(and("hello")("world"), true)
			assertEquals(and({})([]), true)
		},
	)

	await t.step(
		"returns false when first value is falsy",
		function firstFalsy() {
			assertEquals(and(false)(true), false)
			assertEquals(and(0)(1), false)
			assertEquals(and("")("hello"), false)
			assertEquals(and(null)({}), false)
			assertEquals(and(undefined)(1), false)
		},
	)

	await t.step(
		"returns false when second value is falsy",
		function secondFalsy() {
			assertEquals(and(true)(false), false)
			assertEquals(and(1)(0), false)
			assertEquals(and("hello")(""), false)
			assertEquals(and({})(null), false)
		},
	)

	await t.step(
		"returns false when both values are falsy",
		function bothFalsy() {
			assertEquals(and(false)(false), false)
			assertEquals(and(0)(0), false)
			assertEquals(and("")(""), false)
			assertEquals(and(null)(undefined), false)
		},
	)

	await t.step(
		"is curried",
		function curried() {
			const andTrue = and(true)
			assertEquals(andTrue(true), true)
			assertEquals(andTrue(false), false)

			const andFalse = and(false)
			assertEquals(andFalse(true), false)
			assertEquals(andFalse(false), false)
		},
	)
})

Deno.test("and - predicate mode", async function andPredicateModeTests(t) {
	await t.step(
		"combines two predicates",
		function combinePredicates() {
			const isDefinedAndString = and(isDefined)(isString)

			assertEquals(isDefinedAndString("hello"), true)
			assertEquals(isDefinedAndString(null), false)
			assertEquals(isDefinedAndString(undefined), false)
			assertEquals(isDefinedAndString(42), false)
		},
	)

	await t.step(
		"short-circuits on first predicate failure",
		function shortCircuit() {
			let secondCalled = false

			const alwaysFalse = function () {
				return false
			}

			const trackCalls = function () {
				secondCalled = true
				return true
			}

			const combined = and(alwaysFalse)(trackCalls)
			combined("test")

			assertEquals(secondCalled, false)
		},
	)

	await t.step(
		"calls second predicate when first passes",
		function callsSecond() {
			let secondCalled = false

			const alwaysTrue = function () {
				return true
			}

			const trackCalls = function () {
				secondCalled = true
				return true
			}

			const combined = and(alwaysTrue)(trackCalls)
			combined("test")

			assertEquals(secondCalled, true)
		},
	)

	await t.step(
		"works with custom predicates",
		function customPredicates() {
			const isPositive = function (n: unknown): n is number {
				return typeof n === "number" && n > 0
			}

			const isEven = function (n: unknown): n is number {
				return typeof n === "number" && n % 2 === 0
			}

			const isPositiveAndEven = and(isPositive)(isEven)

			assertEquals(isPositiveAndEven(4), true)
			assertEquals(isPositiveAndEven(3), false)
			assertEquals(isPositiveAndEven(-2), false)
			assertEquals(isPositiveAndEven("test"), false)
		},
	)
})

Deno.test("and - property: commutative for booleans", function commutative() {
	fc.assert(
		fc.property(
			fc.boolean(),
			fc.boolean(),
			function propertyCommutative(a, b) {
				assertEquals(and(a)(b), and(b)(a))
			},
		),
	)
})

Deno.test("and - property: associative", function associative() {
	fc.assert(
		fc.property(
			fc.boolean(),
			fc.boolean(),
			fc.boolean(),
			function propertyAssociative(a, b, c) {
				// (a && b) && c === a && (b && c)
				const left = and(and(a)(b))(c)
				const right = and(a)(and(b)(c))
				assertEquals(left, right)
			},
		),
	)
})

Deno.test("and - property: identity element (true)", function identity() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyIdentity(value) {
				assertEquals(and(true)(value), value)
				assertEquals(and(value)(true), value)
			},
		),
	)
})

Deno.test("and - property: annihilator element (false)", function annihilator() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyAnnihilator(value) {
				assertEquals(and(false)(value), false)
				assertEquals(and(value)(false), false)
			},
		),
	)
})

Deno.test("and - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyIdempotent(value) {
				assertEquals(and(value)(value), value)
			},
		),
	)
})
