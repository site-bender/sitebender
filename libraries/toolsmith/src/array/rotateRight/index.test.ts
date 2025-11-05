import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import rotateRight from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("rotateRight", function testRotateRight() {
	describe("Plain array path", function testPlainArrayPath() {
		it("rotates elements right by 1 position", function testBasicRotateRight() {
			const input = [1, 2, 3, 4, 5]
			const result = rotateRight(1)(input)
			assertEquals(result, [5, 1, 2, 3, 4])
		})

		it("rotates elements right by 2 positions", function testRotateRightBy2() {
			const input = [1, 2, 3, 4, 5]
			const result = rotateRight(2)(input)
			assertEquals(result, [4, 5, 1, 2, 3])
		})

		it("returns empty array when input is empty", function testEmptyArray() {
			const result = rotateRight(1)([])
			assertEquals(result, [])
		})

		it("handles rotation by 0 (returns copy)", function testRotateBy0() {
			const input = [1, 2, 3]
			const result = rotateRight(0)(input)
			assertEquals(result, [1, 2, 3])
		})

		it("handles rotation equal to array length (returns copy)", function testRotateByLength() {
			const input = [1, 2, 3]
			const result = rotateRight(3)(input)
			assertEquals(result, [1, 2, 3])
		})

		it("handles rotation greater than array length", function testRotateGreaterThanLength() {
			const input = [1, 2, 3]
			const result = rotateRight(5)(input)
			assertEquals(result, [2, 3, 1])
		})

		it("handles negative rotation (rotates left)", function testNegativeRotation() {
			const input = [1, 2, 3, 4, 5]
			const result = rotateRight(-1)(input)
			assertEquals(result, [2, 3, 4, 5, 1])
		})

		it("handles single element array", function testSingleElement() {
			const input = [42]
			const result = rotateRight(1)(input)
			assertEquals(result, [42])
		})

		it("works with string arrays", function testStringArrays() {
			const input = ["a", "b", "c", "d"]
			const result = rotateRight(2)(input)
			assertEquals(result, ["c", "d", "a", "b"])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function createElement(
				_,
				i: number,
			) {
				return i
			})
			const result = rotateRight(100)(input)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 1000)
			assertEquals(result[0], 900)
			assertEquals(result[999], 899)
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const input = ok([1, 2, 3, 4])
			const result = rotateRight(1)(input)

			assertEquals(result, ok([4, 1, 2, 3]))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = error(testError)
			const result = rotateRight(1)(input)

			assertEquals(result, error(testError))
		})

		it("handles empty array in successful Result", function testEmptyResult() {
			const input = ok([])
			const result = rotateRight(1)(input)

			assertEquals(result, ok([]))
		})

		it("handles rotation by 0 in Result", function testRotateBy0Result() {
			const input = ok([1, 2, 3])
			const result = rotateRight(0)(input)

			assertEquals(result, ok([1, 2, 3]))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const input = success([1, 2, 3, 4])
			const result = rotateRight(1)(input)

			assertEquals(result, success([4, 1, 2, 3]))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = failure([testError])
			const result = rotateRight(1)(input)

			assertEquals(result, failure([testError]))
		})

		it("handles empty array in successful Validation", function testEmptyValidation() {
			const input = success([])
			const result = rotateRight(1)(input)

			assertEquals(result, success([]))
		})

		it("handles rotation by 0 in Validation", function testRotateBy0Validation() {
			const input = success([1, 2, 3])
			const result = rotateRight(0)(input)

			assertEquals(result, success([1, 2, 3]))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("rotating by array length returns copy", function testRotateByLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1, maxLength: 100 }),
					function testProperty(
						arr,
					) {
						//++ [EXCEPTION] Using array.length for property test
						const result = rotateRight(arr.length)(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		it("rotating empty array returns empty", function testEmptyProperty() {
			fc.assert(
				fc.property(
					fc.integer(),
					function testProperty(
						positions,
					) {
						const result = rotateRight(positions)([])
						assertEquals(result, [])
					},
				),
			)
		})

		it("result length equals input length", function testLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer(),
					function testProperty(
						arr,
						positions,
					) {
						const result = rotateRight(positions)(arr)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, arr.length)
					},
				),
			)
		})

		it("rotating twice is commutative", function testCommutativeProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 }), {
						minLength: 1,
						maxLength: 20,
					}),
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 10 }),
					function testProperty(
						arr,
						positions1,
						positions2,
					) {
						const result1 = rotateRight(positions2)(
							rotateRight(positions1)(arr),
						)
						const result2 = rotateRight(positions1 + positions2)(arr)
						assertEquals(result1, result2)
					},
				),
			)
		})
	})
})
