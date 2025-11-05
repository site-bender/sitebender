import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import take from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("take", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("takes first n elements", function testBasicTake() {
			const result = take(3)([1, 2, 3, 4, 5])
			assertEquals(result, [1, 2, 3])
		})

		it("returns all elements when n >= length", function testTakeAll() {
			const result = take(5)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("returns empty array when taking from empty array", function testEmptyArray() {
			const result = take(3)([])
			assertEquals(result, [])
		})

		it("returns empty array when n = 0", function testTakeZero() {
			const result = take(0)([1, 2, 3])
			assertEquals(result, [])
		})

		it("returns empty array when n < 0", function testTakeNegative() {
			const result = take(-1)([1, 2, 3])
			assertEquals(result, [])
		})

		it("takes one element", function testTakeOne() {
			const result = take(1)([1, 2, 3])
			assertEquals(result, [1])
		})

		it("handles single element array", function testSingleElement() {
			const result = take(1)([1])
			assertEquals(result, [1])
		})

		it("works with string arrays", function testStringArrays() {
			const result = take(2)(["a", "b", "c", "d"])
			assertEquals(result, ["a", "b"])
		})

		it("works with object arrays", function testObjectArrays() {
			const input = [{ id: 1 }, { id: 2 }, { id: 3 }]
			const result = take(2)(input)
			assertEquals(result, [{ id: 1 }, { id: 2 }])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const result = take(500)(input)
			assertEquals(result.length, 500)
			//++ [EXCEPTION] Using array index access for test assertion
			assertEquals(result[0], 0)
			assertEquals(result[499], 499)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([1, 2, 3, 4, 5])
			const result = take(3)(input)
			assertEquals(result, ok([1, 2, 3]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = take(2)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = take(3)(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with n = 0", function testResultTakeZero() {
			const input = ok([1, 2, 3])
			const result = take(0)(input)
			assertEquals(result, ok([]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([1, 2, 3, 4, 5])
			const result = take(3)(input)
			assertEquals(result, success([1, 2, 3]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = take(2)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = take(3)(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with n = 0", function testValidationTakeZero() {
			const input = success([1, 2, 3])
			const result = take(0)(input)
			assertEquals(result, success([]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("result length is min(n, length)", function testLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ min: 0 }),
					function testProperty(arr, n) {
						const result = take(n)(arr)
						//++ [EXCEPTION] Using native .length and Math.min for test assertion
						const expectedLength = Math.min(n, arr.length)
						assertEquals(result.length, expectedLength)
					},
				),
			)
		})

		it("taking 0 returns empty array", function testTakeZeroProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = take(0)(arr)
					assertEquals(result, [])
				}),
			)
		})

		it("negative n returns empty array", function testNegativeProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ max: -1 }),
					function testProperty(arr, n) {
						const result = take(n)(arr)
						assertEquals(result, [])
					},
				),
			)
		})

		it("taking length or more returns all elements", function testTakeAllProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(arr) {
						const result = take(arr.length)(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		it("first element of result matches first element of array", function testFirstElementProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.integer({ min: 1 }),
					function testProperty(arr, n) {
						const result = take(n)(arr)
						//++ [EXCEPTION] Using array index access for test assertion
						assertEquals(result[0], arr[0])
					},
				),
			)
		})

		it("consistent with native slice", function testNativeConsistency() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer(),
					function testProperty(arr, n) {
						const ourResult = take(n)(arr)
						//++ [EXCEPTION] Using native .slice() for comparison
						const nativeResult = n <= 0 ? [] : arr.slice(0, n)
						assertEquals(ourResult, nativeResult)
					},
				),
			)
		})
	})
})
