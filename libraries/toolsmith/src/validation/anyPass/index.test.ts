import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import anyPass from "./index.ts"

Deno.test("anyPass", async function anyPassTests(t) {
	await t.step(
		"returns true when any predicate passes",
		function returnsTrueWhenAnyPasses() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const isNegative = function (n: number): boolean {
				return n < 0
			}
			const greaterThan100 = function (n: number): boolean {
				return n > 100
			}

			const anyPredicates = anyPass([isEven, isNegative, greaterThan100])
			assertEquals(anyPredicates(42), true) // even
			assertEquals(anyPredicates(-5), true) // negative
			assertEquals(anyPredicates(200), true) // > 100
		},
	)

	await t.step(
		"returns false when all predicates fail",
		function returnsFalseWhenAllFail() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const isNegative = function (n: number): boolean {
				return n < 0
			}
			const greaterThan100 = function (n: number): boolean {
				return n > 100
			}

			const anyPredicates = anyPass([isEven, isNegative, greaterThan100])
			assertEquals(anyPredicates(43), false) // odd, positive, <= 100
		},
	)

	await t.step(
		"returns false for empty predicate array",
		function returnsFalseForEmptyArray() {
			const anyPredicates = anyPass([])
			assertEquals(anyPredicates(42), false)
		},
	)

	await t.step(
		"returns true with single passing predicate",
		function returnsTrueWithSinglePassing() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const anyPredicates = anyPass([isEven])
			assertEquals(anyPredicates(42), true)
		},
	)

	await t.step(
		"returns false with single failing predicate",
		function returnsFalseWithSingleFailing() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const anyPredicates = anyPass([isEven])
			assertEquals(anyPredicates(43), false)
		},
	)

	await t.step(
		"is curried",
		function isCurried() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const isNegative = function (n: number): boolean {
				return n < 0
			}

			const checkEvenOrNegative = anyPass([isEven, isNegative])
			assertEquals(checkEvenOrNegative(42), true)
			assertEquals(checkEvenOrNegative(-5), true)
			assertEquals(checkEvenOrNegative(43), false)
		},
	)

	await t.step(
		"short-circuits on first success",
		function shortCircuits() {
			let callCount = 0
			const incrementAndPass = function (): boolean {
				callCount++
				return true
			}
			const incrementAndFail = function (): boolean {
				callCount++
				return false
			}

			const anyPredicates = anyPass([
				incrementAndFail,
				incrementAndPass,
				incrementAndFail,
			])
			anyPredicates(0)

			// Should call first two predicates, then stop
			assertEquals(callCount, 2)
		},
	)
})

Deno.test("anyPass - property: empty array always returns false", function emptyArrayFalse() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyEmptyArray(value) {
				const anyPredicates = anyPass([])
				assertEquals(anyPredicates(value), false)
			},
		),
	)
})
