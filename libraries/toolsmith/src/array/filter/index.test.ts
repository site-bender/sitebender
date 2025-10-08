import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import filter from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("filter", async function filterTests(t) {
	await t.step(
		"filters elements matching predicate",
		function filtersMatchingElements() {
			const isEven = function (n: number): boolean {
				return n % 2 === 0
			}
			const result = filter(isEven)([1, 2, 3, 4, 5, 6])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [2, 4, 6])
			}
		},
	)

	await t.step(
		"returns empty array when no elements match",
		function returnsEmptyArray() {
			const isNegative = function (n: number): boolean {
				return n < 0
			}
			const result = filter(isNegative)([1, 2, 3, 4, 5])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [])
			}
		},
	)

	await t.step(
		"returns all elements when all match",
		function returnsAllElements() {
			const isPositive = function (n: number): boolean {
				return n > 0
			}
			const result = filter(isPositive)([1, 2, 3, 4, 5])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [1, 2, 3, 4, 5])
			}
		},
	)

	await t.step(
		"works with string predicates",
		function worksWithStrings() {
			const isLong = function (s: string): boolean {
				return s.length > 3
			}
			const result = filter(isLong)(["a", "ab", "abc", "abcd", "abcde"])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, ["abcd", "abcde"])
			}
		},
	)

	await t.step(
		"returns error for non-array input",
		function returnsErrorForNonArray() {
			const result = filter(function () {
				return true
			})(null as unknown as ReadonlyArray<number>)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "FILTER_INVALID_INPUT")
				assertEquals(result.error.field, "array")
			}
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			const result = filter(function () {
				return true
			})([])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [])
			}
		},
	)

	await t.step(
		"works with object predicates",
		function worksWithObjects() {
			type Person = { readonly name: string; readonly age: number }
			const isAdult = function (p: Person): boolean {
				return p.age >= 18
			}
			const people: ReadonlyArray<Person> = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 17 },
				{ name: "Charlie", age: 30 },
			]

			const result = filter(isAdult)(people)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [
					{ name: "Alice", age: 25 },
					{ name: "Charlie", age: 30 },
				])
			}
		},
	)
})

Deno.test("filter - property: result is subset of original", function subsetProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertySubset(arr) {
				const result = filter(function (n: number): boolean {
					return n > 0
				})(arr)

				if (isOk(result)) {
					const filtered = result.value
					// Every element in filtered must be in original
					assertEquals(
						filtered.every(function (item) {
							return arr.includes(item)
						}),
						true,
					)
					// Filtered length <= original length
					assertEquals(filtered.length <= arr.length, true)
				}
			},
		),
	)
})

Deno.test("filter - property: idempotent filtering", function idempotentProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyIdempotent(arr) {
				const predicate = function (n: number): boolean {
					return n > 0
				}
				const result1 = filter(predicate)(arr)

				assertEquals(isOk(result1), true)
				if (isOk(result1)) {
					const result2 = filter(predicate)(result1.value)

					assertEquals(isOk(result2), true)
					if (isOk(result2)) {
						// Filtering twice should give same result as filtering once
						assertEquals(result1.value, result2.value)
					}
				}
			},
		),
	)
})
