import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import transpose from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("transpose", function testTranspose() {
	describe("Plain array path", function testPlainArrayPath() {
		it("transposes a 2x3 matrix", function testBasicTranspose() {
			const input = [[1, 2, 3], [4, 5, 6]]
			const result = transpose(input)
			assertEquals(result, [[1, 4], [2, 5], [3, 6]])
		})

		it("transposes a 3x2 matrix", function testReverseTranspose() {
			const input = [[1, 4], [2, 5], [3, 6]]
			const result = transpose(input)
			assertEquals(result, [[1, 2, 3], [4, 5, 6]])
		})

		it("returns empty array when transposing empty array", function testEmptyArray() {
			const result = transpose([])
			assertEquals(result, [])
		})

		it("handles single row", function testSingleRow() {
			const input = [[1, 2, 3]]
			const result = transpose(input)
			assertEquals(result, [[1], [2], [3]])
		})

		it("handles single column", function testSingleColumn() {
			const input = [[1], [2], [3]]
			const result = transpose(input)
			assertEquals(result, [[1, 2, 3]])
		})

		it("handles 1x1 matrix", function test1x1() {
			const input = [[42]]
			const result = transpose(input)
			assertEquals(result, [[42]])
		})

		it("handles jagged arrays (rows of different lengths)", function testJaggedArrays() {
			const input = [[1, 2, 3], [4, 5], [6]]
			const result = transpose(input)
			assertEquals(result, [[1, 4, 6], [2, 5, undefined], [
				3,
				undefined,
				undefined,
			]])
		})

		it("handles empty rows", function testEmptyRows() {
			const input = [[1, 2], [], [3, 4]]
			const result = transpose(input)
			assertEquals(result, [[1, undefined, 3], [2, undefined, 4]])
		})

		it("works with string arrays", function testStringArrays() {
			const input = [["a", "b"], ["c", "d"]]
			const result = transpose(input)
			assertEquals(result, [["a", "c"], ["b", "d"]])
		})

		it("works with mixed types", function testMixedTypes() {
			const input = [[1, "a"], [2, "b"]]
			const result = transpose(input)
			assertEquals(result, [[1, 2], ["a", "b"]])
		})

		it("handles large matrices efficiently", function testLargeMatrix() {
			const input = Array.from({ length: 100 }, function createRow(
				_,
				i: number,
			) {
				return Array.from({ length: 100 }, function createElement(
					__,
					j: number,
				) {
					return i * 100 + j
				})
			})
			const result = transpose(input)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 100)
			assertEquals(result[0].length, 100)
			assertEquals(result[0][0], 0)
			assertEquals(result[99][99], 9999)
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const input = ok([[1, 2], [3, 4]])
			const result = transpose(input)

			assertEquals(result, ok([[1, 3], [2, 4]]))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = error(testError)
			const result = transpose(input)

			assertEquals(result, error(testError))
		})

		it("handles empty array in successful Result", function testEmptyResult() {
			const input = ok([])
			const result = transpose(input)

			assertEquals(result, ok([]))
		})

		it("handles jagged arrays in Result", function testJaggedResult() {
			const input = ok([[1, 2, 3], [4, 5]])
			const result = transpose(input)

			assertEquals(result, ok([[1, 4], [2, 5], [3, undefined]]))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const input = success([[1, 2], [3, 4]])
			const result = transpose(input)

			assertEquals(result, success([[1, 3], [2, 4]]))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = failure([testError])
			const result = transpose(input)

			assertEquals(result, failure([testError]))
		})

		it("handles empty array in successful Validation", function testEmptyValidation() {
			const input = success([])
			const result = transpose(input)

			assertEquals(result, success([]))
		})

		it("handles jagged arrays in Validation", function testJaggedValidation() {
			const input = success([[1, 2, 3], [4, 5]])
			const result = transpose(input)

			assertEquals(result, success([[1, 4], [2, 5], [3, undefined]]))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("empty matrix returns empty", function testEmptyProperty() {
			const result = transpose([])
			assertEquals(result, [])
		})

		it("single element matrices transpose to themselves", function testSingleElement() {
			fc.assert(
				fc.property(
					fc.integer(),
					function testProperty(
						n,
					) {
						const result = transpose([[n]])
						assertEquals(result, [[n]])
					},
				),
			)
		})

		it("result length equals max row length", function testResultLength() {
			fc.assert(
				fc.property(
					fc.array(fc.array(fc.integer(), { minLength: 0, maxLength: 10 }), {
						minLength: 1,
						maxLength: 10,
					}),
					function testProperty(
						matrix,
					) {
						const result = transpose(matrix)
						//++ Find max row length
						//++ [EXCEPTION] Using native .reduce() and array.length
						const maxLength = matrix.reduce(
							function findMax(
								max: number,
								row: ReadonlyArray<number>,
							): number {
								return Math.max(max, row.length)
							},
							0,
						)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, maxLength)
					},
				),
			)
		})
	})
})
