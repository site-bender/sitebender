import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import drop from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("drop", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("drops first n elements", function testBasicDrop() {
			const result = drop(2)([1, 2, 3, 4, 5])
			assertEquals(result, [3, 4, 5])
		})

		it("returns empty array when n >= length", function testDropAll() {
			const result = drop(5)([1, 2, 3])
			assertEquals(result, [])
		})

		it("returns empty array when dropping from empty array", function testEmptyArray() {
			const result = drop(3)([])
			assertEquals(result, [])
		})

		it("returns original array when n = 0", function testDropZero() {
			const result = drop(0)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("returns original array when n < 0", function testDropNegative() {
			const result = drop(-1)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("drops one element", function testDropOne() {
			const result = drop(1)([1, 2, 3])
			assertEquals(result, [2, 3])
		})

		it("handles single element array", function testSingleElement() {
			const result = drop(1)([1])
			assertEquals(result, [])
		})

		it("works with string arrays", function testStringArrays() {
			const result = drop(2)(["a", "b", "c", "d"])
			assertEquals(result, ["c", "d"])
		})

		it("works with object arrays", function testObjectArrays() {
			const input = [{ id: 1 }, { id: 2 }, { id: 3 }]
			const result = drop(1)(input)
			assertEquals(result, [{ id: 2 }, { id: 3 }])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const result = drop(500)(input)
			assertEquals(result.length, 500)
			//++ [EXCEPTION] Using array index access for test assertion
			assertEquals(result[0], 500)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([1, 2, 3, 4, 5])
			const result = drop(2)(input)
			assertEquals(result, ok([3, 4, 5]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = drop(2)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = drop(3)(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with n = 0", function testResultDropZero() {
			const input = ok([1, 2, 3])
			const result = drop(0)(input)
			assertEquals(result, ok([1, 2, 3]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([1, 2, 3, 4, 5])
			const result = drop(2)(input)
			assertEquals(result, success([3, 4, 5]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = drop(2)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = drop(3)(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with n = 0", function testValidationDropZero() {
			const input = success([1, 2, 3])
			const result = drop(0)(input)
			assertEquals(result, success([1, 2, 3]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("result length is max(0, length - max(0, n))", function testLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer(),
					function testProperty(arr, n) {
						const result = drop(n)(arr)
						//++ [EXCEPTION] Using native .length and Math.max for test assertion
						//++ When n <= 0, we return full array, so effective n is 0
						const effectiveN = Math.max(0, n)
						const expectedLength = Math.max(0, arr.length - effectiveN)
						assertEquals(result.length, expectedLength)
					},
				),
			)
		})

		it("dropping 0 returns original array", function testDropZeroProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = drop(0)(arr)
					assertEquals(result, arr)
				}),
			)
		})

		it("negative n returns original array", function testNegativeProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ max: -1 }),
					function testProperty(arr, n) {
						const result = drop(n)(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		it("dropping length or more returns empty array", function testDropAllProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(arr) {
						const result = drop(arr.length)(arr)
						assertEquals(result, [])
					},
				),
			)
		})

		it("first element of result is element at index n", function testFirstElementProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.nat(),
					function testProperty(arr, n) {
						//++ [EXCEPTION] Using native .length for test logic
						if (n >= arr.length) {
							return
						}
						const result = drop(n)(arr)
						//++ [EXCEPTION] Using array index access for test assertion
						assertEquals(result[0], arr[n])
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
						const ourResult = drop(n)(arr)
						//++ [EXCEPTION] Using native .slice() for comparison
						const nativeResult = n <= 0 ? arr : arr.slice(n)
						assertEquals(ourResult, nativeResult)
					},
				),
			)
		})
	})
})
