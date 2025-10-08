import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import find from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"


Deno.test("find", async function findTests(t) {
	await t.step(
		"finds first matching element",
		function findsFirstMatch() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const result = find(isEven)([1, 3, 4, 6, 8])

			assertEquals(isOk(result), true)
			assertEquals(result.value, 4) // First even number
		},
	)

	await t.step(
		"returns error when no element matches",
		function returnsErrorWhenNotFound() {
			const isNegative = function (n: number): boolean {
				return n < 0
			}
			const result = find(isNegative)([1, 2, 3, 4, 5])

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "FIND_ELEMENT_NOT_FOUND")
				assertEquals(result.error.field, "array")
			}
		},
	)

	await t.step(
		"finds string by predicate",
		function findsString() {
			const isLong = function (s: string): boolean {
				return s.length > 3
			}
			const result = find(isLong)(["a", "ab", "abcd", "abcde"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, "abcd")
		},
	)

	await t.step(
		"returns error for empty array",
		function returnsErrorForEmptyArray() {
			const result = find(function () {
				return true
			})([])

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "FIND_ELEMENT_NOT_FOUND")
			}
		},
	)

	await t.step(
		"returns error for non-array input",
		function returnsErrorForNonArray() {
			const result = find(function () {
				return true
			})(null as unknown as ReadonlyArray<number>)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "FIND_INVALID_INPUT")
				assertEquals(result.error.field, "array")
			}
		},
	)

	await t.step(
		"works with objects",
		function worksWithObjects() {
			type Person = { readonly name: string; readonly age: number }
			const isAdult = function (p: Person): boolean {
				return p.age >= 18
			}
			const people: ReadonlyArray<Person> = [
				{ name: "Alice", age: 15 },
				{ name: "Bob", age: 20 },
				{ name: "Charlie", age: 25 },
			]

			const result = find(isAdult)(people)

			assertEquals(isOk(result), true)
			assertEquals(result.value, { name: "Bob", age: 20 })
		},
	)

	await t.step(
		"handles falsy values correctly",
		function handlesFalsyValues() {
			const isZero = function (n: number): boolean {
				return n === 0
			}
			const result = find(isZero)([1, 2, 0, 3, 4])

			assertEquals(isOk(result), true)
			assertEquals(result.value, 0)
		},
	)

	await t.step(
		"finds undefined values correctly",
		function findsUndefined() {
			const isUndefined = function (
				x: string | undefined,
			): x is undefined {
				return x === undefined
			}
			const result = find(isUndefined)(["a", "b", undefined, "d"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, undefined)
		},
	)
})

Deno.test("find - property: found element satisfies predicate", function satisfiesProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertySatisfies(arr) {
				const isPositive = function (n: number): boolean {
					return n > 0
				}
				const result = find(isPositive)(arr)

				if (isOk(result)) {
					// If found, element must satisfy predicate
					assertEquals(isPositive(result.value), true)
				}
				// If error, no positive numbers exist
				if (isError(result)) {
					assertEquals(
						arr.some(isPositive),
						false,
					)
				}
			},
		),
	)
})

Deno.test("find - property: finds first occurrence", function firstOccurrenceProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyFirstOccurrence(arr) {
				const isEven = function (n: number): boolean {
					return n % 2 === 0
				}
				const result = find(isEven)(arr)

				if (isOk(result)) {
					const found = result.value
					const index = arr.indexOf(found)
					// All elements before found must not satisfy predicate
					for (let i = 0; i < index; i++) {
						assertEquals(isEven(arr[i]), false)
					}
				}
			},
		),
	)
})
