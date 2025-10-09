import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import allPass from "./index.ts"

Deno.test("allPass", async function allPassTests(t) {
	await t.step(
		"returns true when all predicates pass",
		function returnsTrueWhenAllPass() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const isPositive = function (n: number): boolean {
				return n > 0
			}
			const lessThan100 = function (n: number): boolean {
				return n < 100
			}

			const allPredicates = allPass([isEven, isPositive, lessThan100])
			assertEquals(allPredicates(42), true)
		},
	)

	await t.step(
		"returns false when any predicate fails",
		function returnsFalseWhenAnyFails() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const isPositive = function (n: number): boolean {
				return n > 0
			}
			const lessThan100 = function (n: number): boolean {
				return n < 100
			}

			const allPredicates = allPass([isEven, isPositive, lessThan100])
			assertEquals(allPredicates(43), false) // odd number
			assertEquals(allPredicates(-42), false) // negative
			assertEquals(allPredicates(200), false) // >= 100
		},
	)

	await t.step(
		"returns true for empty predicate array",
		function returnsTrueForEmptyArray() {
			const allPredicates = allPass([])
			assertEquals(allPredicates(42), true)
		},
	)

	await t.step(
		"returns true with single passing predicate",
		function returnsTrueWithSinglePassing() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const allPredicates = allPass([isEven])
			assertEquals(allPredicates(42), true)
		},
	)

	await t.step(
		"returns false with single failing predicate",
		function returnsFalseWithSingleFailing() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const allPredicates = allPass([isEven])
			assertEquals(allPredicates(43), false)
		},
	)

	await t.step(
		"is curried",
		function isCurried() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const isPositive = function (n: number): boolean {
				return n > 0
			}

			const checkEvenAndPositive = allPass([isEven, isPositive])
			assertEquals(checkEvenAndPositive(42), true)
			assertEquals(checkEvenAndPositive(43), false)
		},
	)

	await t.step(
		"short-circuits on first failure",
		function shortCircuits() {
			let callCount = 0
			const incrementAndFail = function (): boolean {
				callCount++
				return false
			}
			const incrementAndPass = function (): boolean {
				callCount++
				return true
			}

			const allPredicates = allPass([
				incrementAndPass,
				incrementAndFail,
				incrementAndPass,
			])
			allPredicates(0)

			// Should call first two predicates, then stop
			assertEquals(callCount, 2)
		},
	)
})

Deno.test("allPass - property: empty array always returns true", function emptyArrayTrue() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyEmptyArray(value) {
				const allPredicates = allPass([])
				assertEquals(allPredicates(value), true)
			},
		),
	)
})
