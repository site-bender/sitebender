import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import sort from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for sort (array sorting with three-path pattern)

//++ Plain array path tests

Deno.test("sort sorts numbers in ascending order by default", function testSortNumbers() {
	const result = sort<number>()([3, 1, 4, 1, 5, 9, 2, 6])

	assertEquals(result, [1, 1, 2, 3, 4, 5, 6, 9])
})

Deno.test("sort sorts strings alphabetically by default", function testSortStrings() {
	const result = sort<string>()(["banana", "apple", "cherry", "date"])

	assertEquals(result, ["apple", "banana", "cherry", "date"])
})

Deno.test("sort with custom comparator descending", function testSortCustomDescending() {
	function descending(a: number, b: number): number {
		return b - a
	}
	const result = sort(descending)([3, 1, 4, 1, 5])

	assertEquals(result, [5, 4, 3, 1, 1])
})

Deno.test("sort handles empty array", function testSortEmpty() {
	const result = sort<number>()([])

	assertEquals(result, [])
})

Deno.test("sort handles single element", function testSortSingle() {
	const result = sort<number>()([42])

	assertEquals(result, [42])
})

Deno.test("sort handles already sorted array", function testSortAlreadySorted() {
	const result = sort<number>()([1, 2, 3, 4, 5])

	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("sort handles reverse sorted array", function testSortReverse() {
	const result = sort<number>()([5, 4, 3, 2, 1])

	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("sort handles duplicates", function testSortDuplicates() {
	const result = sort<number>()([3, 1, 3, 2, 1, 2])

	assertEquals(result, [1, 1, 2, 2, 3, 3])
})

Deno.test("sort with custom object comparator", function testSortObjects() {
	function byAge(a: { age: number }, b: { age: number }): number {
		return a.age - b.age
	}
	const result = sort(byAge)([
		{ age: 30 },
		{ age: 20 },
		{ age: 40 },
	])

	assertEquals(result, [{ age: 20 }, { age: 30 }, { age: 40 }])
})

//++ Result monad path tests

Deno.test("sort with Result ok returns ok with sorted array", function testSortResultOk() {
	const input = ok([3, 1, 4, 1, 5])
	const result = sort<number>()(input)

	assertEquals(result, ok([1, 1, 3, 4, 5]))
})

Deno.test("sort with Result ok and custom comparator", function testSortResultCustom() {
	function descending(a: number, b: number): number {
		return b - a
	}
	const input = ok([3, 1, 4])
	const result = sort(descending)(input)

	assertEquals(result, ok([4, 3, 1]))
})

Deno.test("sort with Result error passes through unchanged", function testSortResultError() {
	const err = error({ _tag: "ValidationError", message: "test error" })
	const result = sort<number>()(err)

	assertEquals(result, err)
})

Deno.test("sort with Result ok empty array", function testSortResultEmpty() {
	const input = ok<ReadonlyArray<number>>([])
	const result = sort<number>()(input)

	assertEquals(result, ok([]))
})

//++ Validation monad path tests

Deno.test("sort with Validation success returns success with sorted array", function testSortValidationSuccess() {
	const input = success([3, 1, 4, 1, 5])
	const result = sort<number>()(input)

	assertEquals(result, success([1, 1, 3, 4, 5]))
})

Deno.test("sort with Validation success and custom comparator", function testSortValidationCustom() {
	function descending(a: number, b: number): number {
		return b - a
	}
	const input = success([3, 1, 4])
	const result = sort(descending)(input)

	assertEquals(result, success([4, 3, 1]))
})

Deno.test("sort with Validation failure passes through unchanged", function testSortValidationFailure() {
	const fail = failure([{ _tag: "ValidationError", message: "test error" }])
	const result = sort<number>()(fail)

	assertEquals(result, fail)
})

Deno.test("sort with Validation success empty array", function testSortValidationEmpty() {
	const input = success<ReadonlyArray<number>>([])
	const result = sort<number>()(input)

	assertEquals(result, success([]))
})

//++ Property-based tests

Deno.test("sort property: result is sorted", function testSortPropertySorted() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function testIsSorted(arr) {
				function ascending(a: number, b: number): number {
					return a - b
				}
				const result = sort(ascending)(arr) as ReadonlyArray<number>

				function checkSorted(index: number): boolean {
					if (index >= result.length - 1) {
						return true
					}

					if (result[index] > result[index + 1]) {
						return false
					}

					return checkSorted(index + 1)
				}

				return checkSorted(0)
			},
		),
	)
})

Deno.test("sort property: preserves length", function testSortPropertyLength() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function testLength(arr) {
				const result = sort<number>()(arr) as ReadonlyArray<number>

				return result.length === arr.length
			},
		),
	)
})

Deno.test("sort property: preserves elements", function testSortPropertyElements() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function testElements(arr) {
				function ascending(a: number, b: number): number {
					return a - b
				}
				const result = sort(ascending)(arr) as ReadonlyArray<number>
				const sortedOriginal = [...arr].sort(function (a, b) {
					return a - b
				})

				function checkEqual(index: number): boolean {
					if (index >= result.length) {
						return true
					}

					if (result[index] !== sortedOriginal[index]) {
						return false
					}

					return checkEqual(index + 1)
				}

				return checkEqual(0)
			},
		),
	)
})
