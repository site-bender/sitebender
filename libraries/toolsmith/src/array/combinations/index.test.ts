import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import combinations from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for combinations (generates all k-element combinations)

//++ Plain array path tests

Deno.test("combinations with k=0 returns one empty combination", function testCombinationsKZero() {
	const result = combinations<number>(0)([1, 2, 3])

	assertEquals(result, [[]])
})

Deno.test("combinations with k=1 returns single elements", function testCombinationsKOne() {
	const result = combinations<number>(1)([1, 2, 3])

	assertEquals(result, [[1], [2], [3]])
})

Deno.test("combinations with k=2 from 3 elements", function testCombinationsKTwo() {
	const result = combinations<number>(2)([1, 2, 3])

	assertEquals(result, [
		[1, 2],
		[1, 3],
		[2, 3],
	])
})

Deno.test("combinations with k=3 from 4 elements", function testCombinationsKThree() {
	const result = combinations<number>(3)([1, 2, 3, 4])

	assertEquals(result, [
		[1, 2, 3],
		[1, 2, 4],
		[1, 3, 4],
		[2, 3, 4],
	])
})

Deno.test("combinations with k equals array length", function testCombinationsKEqualsLength() {
	const result = combinations<number>(3)([1, 2, 3])

	assertEquals(result, [[1, 2, 3]])
})

Deno.test("combinations with k greater than array length", function testCombinationsKGreater() {
	const result = combinations<number>(5)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("combinations with empty array", function testCombinationsEmpty() {
	const result = combinations<number>(2)([])

	assertEquals(result, [])
})

Deno.test("combinations with negative k returns empty", function testCombinationsNegativeK() {
	const result = combinations<number>(-1)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("combinations with non-integer k returns empty", function testCombinationsNonIntegerK() {
	const result = combinations<number>(2.5)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("combinations with strings", function testCombinationsStrings() {
	const result = combinations<string>(2)(["a", "b", "c"])

	assertEquals(result, [
		["a", "b"],
		["a", "c"],
		["b", "c"],
	])
})

//++ Result monad path tests

Deno.test("combinations with Result ok generates combinations", function testCombinationsResultOk() {
	const result = combinations<number>(2)(ok([1, 2, 3, 4]))

	assertEquals(
		result,
		ok([
			[1, 2],
			[1, 3],
			[1, 4],
			[2, 3],
			[2, 4],
			[3, 4],
		]),
	)
})

Deno.test("combinations with Result ok and empty array", function testCombinationsResultEmpty() {
	const result = combinations<number>(2)(ok([]))

	assertEquals(result, ok([]))
})

Deno.test("combinations with Result error passes through", function testCombinationsResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = combinations<number>(2)(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("combinations with Validation success generates combinations", function testCombinationsValidationSuccess() {
	const result = combinations<number>(2)(success([1, 2, 3, 4]))

	assertEquals(
		result,
		success([
			[1, 2],
			[1, 3],
			[1, 4],
			[2, 3],
			[2, 4],
			[3, 4],
		]),
	)
})

Deno.test("combinations with Validation success and empty array", function testCombinationsValidationEmpty() {
	const result = combinations<number>(2)(success([]))

	assertEquals(result, success([]))
})

Deno.test("combinations with Validation failure passes through", function testCombinationsValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = combinations<number>(2)(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("combinations count matches formula", function testCombinationsCountProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 8 }),
			fc.integer({ min: 0, max: 8 }),
			function propertyCombinationsCount(
				arr: ReadonlyArray<number>,
				k: number,
			) {
				const result = combinations<number>(k)(arr)

				if (k > arr.length || k < 0 || !Number.isInteger(k)) {
					assertEquals(result.length, 0)
				} else if (k === 0) {
					assertEquals(result.length, 1)
				} else {
					//++ C(n, k) = n! / (k! * (n - k)!)
					const factorial = function fact(n: number): number {
						if (n <= 1) return 1
						let result = 1
						for (let i = 2; i <= n; i++) {
							result *= i
						}
						return result
					}

					const expectedCount = factorial(arr.length) /
						(factorial(k) * factorial(arr.length - k))

					assertEquals(result.length, expectedCount)
				}
			},
		),
	)
})

Deno.test("combinations all same size", function testCombinationsSizeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 8 }),
			fc.integer({ min: 1, max: 8 }),
			function propertyCombinationsSize(arr: ReadonlyArray<number>, k: number) {
				const result = combinations<number>(k)(arr)

				if (k <= arr.length) {
					result.forEach(function checkCombinationSize(
						combo: ReadonlyArray<number>,
					) {
						assertEquals(combo.length, k)
					})
				}
			},
		),
	)
})

Deno.test("combinations always returns array of arrays", function testCombinationsTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 8 }),
			fc.integer({ min: 0, max: 8 }),
			function propertyCombinationsType(arr: ReadonlyArray<number>, k: number) {
				const result = combinations<number>(k)(arr)

				assertEquals(Array.isArray(result), true)
				result.forEach(function checkArrayType(combo: ReadonlyArray<number>) {
					assertEquals(Array.isArray(combo), true)
				})
			},
		),
	)
})

Deno.test("combinations elements are from input array", function testCombinationsElementsProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 8 }),
			fc.integer({ min: 1, max: 8 }),
			function propertyCombinationsElements(
				arr: ReadonlyArray<number>,
				k: number,
			) {
				const result = combinations<number>(k)(arr)

				result.forEach(function checkElements(combo: ReadonlyArray<number>) {
					combo.forEach(function checkElement(element: number) {
						assertEquals(arr.includes(element), true)
					})
				})
			},
		),
	)
})
