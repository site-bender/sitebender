import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import takeLast from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("takeLast", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("takes last n elements", function testBasicTakeLast() {
			const result = takeLast(3)([1, 2, 3, 4, 5])
			assertEquals(result, [3, 4, 5])
		})

		it("returns all elements when n >= length", function testTakeLastAll() {
			const result = takeLast(5)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("returns empty array when taking from empty array", function testEmptyArray() {
			const result = takeLast(3)([])
			assertEquals(result, [])
		})

		it("returns empty array when n = 0", function testTakeLastZero() {
			const result = takeLast(0)([1, 2, 3])
			assertEquals(result, [])
		})

		it("returns empty array when n < 0", function testTakeLastNegative() {
			const result = takeLast(-1)([1, 2, 3])
			assertEquals(result, [])
		})

		it("takes one element", function testTakeLastOne() {
			const result = takeLast(1)([1, 2, 3])
			assertEquals(result, [3])
		})

		it("handles single element array", function testSingleElement() {
			const result = takeLast(1)([1])
			assertEquals(result, [1])
		})

		it("works with string arrays", function testStringArrays() {
			const result = takeLast(2)(["a", "b", "c", "d"])
			assertEquals(result, ["c", "d"])
		})

		it("works with object arrays", function testObjectArrays() {
			const input = [{ id: 1 }, { id: 2 }, { id: 3 }]
			const result = takeLast(2)(input)
			assertEquals(result, [{ id: 2 }, { id: 3 }])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const result = takeLast(500)(input)
			assertEquals(result.length, 500)
			//++ [EXCEPTION] Using array index access for test assertion
			assertEquals(result[0], 500)
			assertEquals(result[499], 999)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([1, 2, 3, 4, 5])
			const result = takeLast(3)(input)
			assertEquals(result, ok([3, 4, 5]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = takeLast(2)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = takeLast(3)(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with n = 0", function testResultTakeLastZero() {
			const input = ok([1, 2, 3])
			const result = takeLast(0)(input)
			assertEquals(result, ok([]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([1, 2, 3, 4, 5])
			const result = takeLast(3)(input)
			assertEquals(result, success([3, 4, 5]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = takeLast(2)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = takeLast(3)(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with n = 0", function testValidationTakeLastZero() {
			const input = success([1, 2, 3])
			const result = takeLast(0)(input)
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
						const result = takeLast(n)(arr)
						//++ [EXCEPTION] Using native .length and Math.min for test assertion
						const expectedLength = Math.min(n, arr.length)
						assertEquals(result.length, expectedLength)
					},
				),
			)
		})

		it("taking 0 returns empty array", function testTakeLastZeroProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = takeLast(0)(arr)
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
						const result = takeLast(n)(arr)
						assertEquals(result, [])
					},
				),
			)
		})

		it("taking length or more returns all elements", function testTakeLastAllProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(arr) {
						const result = takeLast(arr.length)(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		it("last element of result matches last element of array", function testLastElementProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.integer({ min: 1 }),
					function testProperty(arr, n) {
						const result = takeLast(n)(arr)
						//++ [EXCEPTION] Using array index access for test assertion
						assertEquals(result[result.length - 1], arr[arr.length - 1])
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
						const ourResult = takeLast(n)(arr)
						//++ [EXCEPTION] Using native .slice() for comparison
						const nativeResult = n <= 0 ? [] : arr.slice(-n)
						assertEquals(ourResult, nativeResult)
					},
				),
			)
		})
	})
})
