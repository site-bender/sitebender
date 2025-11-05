import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import dropLast from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("dropLast", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("drops last n elements", function testBasicDropLast() {
			const result = dropLast(2)([1, 2, 3, 4, 5])
			assertEquals(result, [1, 2, 3])
		})

		it("returns empty array when n >= length", function testDropLastAll() {
			const result = dropLast(5)([1, 2, 3])
			assertEquals(result, [])
		})

		it("returns empty array when dropping from empty array", function testEmptyArray() {
			const result = dropLast(3)([])
			assertEquals(result, [])
		})

		it("returns original array when n = 0", function testDropLastZero() {
			const result = dropLast(0)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("returns original array when n < 0", function testDropLastNegative() {
			const result = dropLast(-1)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("drops one element", function testDropLastOne() {
			const result = dropLast(1)([1, 2, 3])
			assertEquals(result, [1, 2])
		})

		it("handles single element array", function testSingleElement() {
			const result = dropLast(1)([1])
			assertEquals(result, [])
		})

		it("works with string arrays", function testStringArrays() {
			const result = dropLast(2)(["a", "b", "c", "d"])
			assertEquals(result, ["a", "b"])
		})

		it("works with object arrays", function testObjectArrays() {
			const input = [{ id: 1 }, { id: 2 }, { id: 3 }]
			const result = dropLast(1)(input)
			assertEquals(result, [{ id: 1 }, { id: 2 }])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const result = dropLast(500)(input)
			assertEquals(result.length, 500)
			//++ [EXCEPTION] Using array index access for test assertion
			assertEquals(result[0], 0)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([1, 2, 3, 4, 5])
			const result = dropLast(2)(input)
			assertEquals(result, ok([1, 2, 3]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = dropLast(2)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = dropLast(3)(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with n = 0", function testResultDropLastZero() {
			const input = ok([1, 2, 3])
			const result = dropLast(0)(input)
			assertEquals(result, ok([1, 2, 3]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([1, 2, 3, 4, 5])
			const result = dropLast(2)(input)
			assertEquals(result, success([1, 2, 3]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = dropLast(2)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = dropLast(3)(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with n = 0", function testValidationDropLastZero() {
			const input = success([1, 2, 3])
			const result = dropLast(0)(input)
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
						const result = dropLast(n)(arr)
						//++ [EXCEPTION] Using native .length and Math.max for test assertion
						//++ When n <= 0, we return full array, so effective n is 0
						const effectiveN = Math.max(0, n)
						const expectedLength = Math.max(0, arr.length - effectiveN)
						assertEquals(result.length, expectedLength)
					},
				),
			)
		})

		it("dropping 0 returns original array", function testDropLastZeroProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = dropLast(0)(arr)
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
						const result = dropLast(n)(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		it("dropping length or more returns empty array", function testDropLastAllProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(arr) {
						const result = dropLast(arr.length)(arr)
						assertEquals(result, [])
					},
				),
			)
		})

		it("last element of result is element at index length-n-1", function testLastElementProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.nat(),
					function testProperty(arr, n) {
						//++ [EXCEPTION] Using native .length for test logic
						if (n >= arr.length || n === 0) {
							return
						}
						const result = dropLast(n)(arr)
						//++ [EXCEPTION] Using array index access for test assertion
						assertEquals(result[result.length - 1], arr[arr.length - n - 1])
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
						const ourResult = dropLast(n)(arr)
						//++ [EXCEPTION] Using native .slice() for comparison
						if (n <= 0) {
							assertEquals(ourResult, arr)
						} else {
							//++ [EXCEPTION] Using Math.max for test logic
							const endIndex = Math.max(0, arr.length - n)
							const nativeResult = arr.slice(0, endIndex)
							assertEquals(ourResult, nativeResult)
						}
					},
				),
			)
		})
	})
})
