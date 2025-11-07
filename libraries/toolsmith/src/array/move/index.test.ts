import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import move from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("move", function testMove() {
	describe("Plain array path", function testPlainArrayPath() {
		it("moves element forward", function testMoveForward() {
			const input = [1, 2, 3, 4, 5]
			const result = move(1)(3)(input)
			assertEquals(result, [1, 3, 4, 2, 5])
		})

		it("moves element backward", function testMoveBackward() {
			const input = [1, 2, 3, 4, 5]
			const result = move(3)(1)(input)
			assertEquals(result, [1, 4, 2, 3, 5])
		})

		it("moves first element to end", function testMoveFirstToEnd() {
			const input = [1, 2, 3, 4, 5]
			const result = move(0)(4)(input)
			assertEquals(result, [2, 3, 4, 5, 1])
		})

		it("moves last element to beginning", function testMoveLastToBeginning() {
			const input = [1, 2, 3, 4, 5]
			const result = move(4)(0)(input)
			assertEquals(result, [5, 1, 2, 3, 4])
		})

		it("returns copy when from equals to", function testFromEqualsTo() {
			const input = [1, 2, 3]
			const result = move(1)(1)(input)
			assertEquals(result, [1, 2, 3])
		})

		it("returns copy when from is out of bounds", function testFromOutOfBounds() {
			const input = [1, 2, 3]
			const result = move(5)(1)(input)
			assertEquals(result, [1, 2, 3])
		})

		it("returns copy when to is out of bounds", function testToOutOfBounds() {
			const input = [1, 2, 3]
			const result = move(1)(5)(input)
			assertEquals(result, [1, 2, 3])
		})

		it("returns copy when from is negative", function testFromNegative() {
			const input = [1, 2, 3]
			const result = move(-1)(1)(input)
			assertEquals(result, [1, 2, 3])
		})

		it("returns copy when to is negative", function testToNegative() {
			const input = [1, 2, 3]
			const result = move(1)(-1)(input)
			assertEquals(result, [1, 2, 3])
		})

		it("returns empty array when input is empty", function testEmptyArray() {
			const result = move(0)(1)([])
			assertEquals(result, [])
		})

		it("handles single element array", function testSingleElement() {
			const input = [42]
			const result = move(0)(0)(input)
			assertEquals(result, [42])
		})

		it("works with string arrays", function testStringArrays() {
			const input = ["a", "b", "c", "d"]
			const result = move(0)(3)(input)
			assertEquals(result, ["b", "c", "d", "a"])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function createElement(
				_,
				i: number,
			) {
				return i
			})
			const result = move(0)(999)(input)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 1000)
			assertEquals(result[0], 1)
			assertEquals(result[999], 0)
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const input = ok([1, 2, 3, 4])
			const result = move(0)(3)(input)

			assertEquals(result, ok([2, 3, 4, 1]))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = error(testError)
			const result = move(0)(2)(input)

			assertEquals(result, error(testError))
		})

		it("handles empty array in successful Result", function testEmptyResult() {
			const input = ok([])
			const result = move(0)(1)(input)

			assertEquals(result, ok([]))
		})

		it("handles from equals to in Result", function testFromEqualsToResult() {
			const input = ok([1, 2, 3])
			const result = move(1)(1)(input)

			assertEquals(result, ok([1, 2, 3]))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const input = success([1, 2, 3, 4])
			const result = move(0)(3)(input)

			assertEquals(result, success([2, 3, 4, 1]))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = failure([testError])
			const result = move(0)(2)(input)

			assertEquals(result, failure([testError]))
		})

		it("handles empty array in successful Validation", function testEmptyValidation() {
			const input = success([])
			const result = move(0)(1)(input)

			assertEquals(result, success([]))
		})

		it("handles from equals to in Validation", function testFromEqualsToValidation() {
			const input = success([1, 2, 3])
			const result = move(1)(1)(input)

			assertEquals(result, success([1, 2, 3]))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("moving to same position returns copy", function testMoveToSameProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1, maxLength: 100 }),
					function testProperty(
						arr,
					) {
						//++ [EXCEPTION] Using array.length for property test
						const validIndex = arr.length > 0 ? 0 : 0
						const result = move(validIndex)(validIndex)(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		it("moving empty array returns empty", function testEmptyProperty() {
			fc.assert(
				fc.property(
					fc.integer(),
					fc.integer(),
					function testProperty(
						from,
						to,
					) {
						const result = move(from)(to)([])
						assertEquals(result, [])
					},
				),
			)
		})

		it("result length equals input length", function testLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
					function testProperty(
						arr,
					) {
						//++ [EXCEPTION] Using array.length for property test
						const from = 0
						const to = arr.length - 1
						const result = move(from)(to)(arr)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, arr.length)
					},
				),
			)
		})

		it("element exists at new position", function testElementAtNewPosition() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 2, maxLength: 50 }),
					function testProperty(
						arr,
					) {
						//++ [EXCEPTION] Using array.length for property test
						const from = 0
						const to = arr.length - 1
						const element = arr[from]
						const result = move(from)(to)(arr)
						assertEquals(result[to], element)
					},
				),
			)
		})
	})
})
