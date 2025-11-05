import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import flatten from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("flatten", function testFlatten() {
	describe("Plain array path", function testPlainArrayPath() {
		it("flattens nested arrays with default depth 1", function testDefaultDepth() {
			const input = [[1, 2], [3, 4], [5, 6]]
			const result = flatten()(input)
			assertEquals(result, [1, 2, 3, 4, 5, 6])
		})

		it("flattens nested arrays with depth 2", function testDepth2() {
			const input = [[[1, 2]], [[3, 4]], [[5, 6]]]
			const result = flatten(2)(input)
			assertEquals(result, [1, 2, 3, 4, 5, 6])
		})

		it("returns empty array when flattening empty array", function testEmptyArray() {
			const result = flatten()([])
			assertEquals(result, [])
		})

		it("handles mixed nested and flat elements", function testMixedElements() {
			const input = [1, [2, 3], 4, [5, 6]]
			const result = flatten()(input)
			assertEquals(result, [1, 2, 3, 4, 5, 6])
		})

		it("respects depth limit", function testDepthLimit() {
			const input = [[[1, 2]], [[3, 4]]]
			const result = flatten(1)(input)
			assertEquals(result, [[1, 2], [3, 4]])
		})

		it("handles depth 0 (no flattening)", function testDepth0() {
			const input = [[1, 2], [3, 4]]
			const result = flatten(0)(input)
			assertEquals(result, [[1, 2], [3, 4]])
		})

		it("works with string arrays", function testStringArrays() {
			const input = [["a", "b"], ["c", "d"]]
			const result = flatten()(input)
			assertEquals(result, ["a", "b", "c", "d"])
		})

		it("works with deeply nested arrays", function testDeeplyNested() {
			const input = [[[[1]]]]
			const result = flatten(3)(input)
			assertEquals(result, [1])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function createNestedArray(
				_,
				i: number,
			) {
				return [i]
			})
			const result = flatten()(input)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 1000)
			assertEquals(result[0], 0)
			assertEquals(result[999], 999)
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const input = ok([[1, 2], [3, 4]])
			const result = flatten()(input)

			assertEquals(result, ok([1, 2, 3, 4]))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = error(testError)
			const result = flatten()(input)

			assertEquals(result, error(testError))
		})

		it("handles empty array in successful Result", function testEmptyResult() {
			const input = ok([])
			const result = flatten()(input)

			assertEquals(result, ok([]))
		})

		it("handles Result with depth parameter", function testResultWithDepth() {
			const input = ok([[[1, 2]], [[3, 4]]])
			const result = flatten(2)(input)

			assertEquals(result, ok([1, 2, 3, 4]))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const input = success([[1, 2], [3, 4]])
			const result = flatten()(input)

			assertEquals(result, success([1, 2, 3, 4]))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = failure([testError])
			const result = flatten()(input)

			assertEquals(result, failure([testError]))
		})

		it("handles empty array in successful Validation", function testEmptyValidation() {
			const input = success([])
			const result = flatten()(input)

			assertEquals(result, success([]))
		})

		it("handles Validation with depth parameter", function testValidationWithDepth() {
			const input = success([[[1, 2]], [[3, 4]]])
			const result = flatten(2)(input)

			assertEquals(result, success([1, 2, 3, 4]))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("result length is sum of nested array lengths", function testLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.array(fc.integer())),
					function testProperty(
						nestedArr,
					) {
						const result = flatten()(nestedArr)
						//++ [EXCEPTION] Using native .reduce() and array.length
						const expectedLength = nestedArr.reduce(
							function sumLengths(
								sum: number,
								arr: ReadonlyArray<number>,
							): number {
								return sum + arr.length
							},
							0,
						)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, expectedLength)
					},
				),
			)
		})

		it("flattening empty arrays returns empty array", function testEmptyProperty() {
			fc.assert(
				fc.property(
					fc.constant([[]]),
					function testProperty(
						arr,
					) {
						const result = flatten()(arr)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, 0)
					},
				),
			)
		})

		it("depth 0 returns original structure", function testDepth0Property() {
			fc.assert(
				fc.property(
					fc.array(fc.array(fc.integer())),
					function testProperty(
						arr,
					) {
						const result = flatten(0)(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		it("flattening preserves all elements", function testPreservationProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.array(fc.integer({ min: 0, max: 100 }))),
					function testProperty(
						nestedArr,
					) {
						const result = flatten()(nestedArr)
						//++ [EXCEPTION] Using native .reduce() for calculation
						const allElements = nestedArr.reduce(
							function collectElements(
								acc: Array<number>,
								arr: ReadonlyArray<number>,
							): Array<number> {
								return [...acc, ...arr]
							},
							[] as Array<number>,
						)
						assertEquals(result, allElements)
					},
				),
			)
		})
	})
})
