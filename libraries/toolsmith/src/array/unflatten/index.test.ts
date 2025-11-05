import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import unflatten from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("unflatten", function testUnflatten() {
	describe("Plain array path", function testPlainArrayPath() {
		it("creates nested structure from flat array with depth markers", function testBasicNesting() {
			const depths = [0, 1, 1, 0]
			const array = ["a", "b", "c", "d"]
			const result = unflatten(depths)(array)
			assertEquals(result, ["a", ["b", "c"], "d"])
		})

		it("handles multiple nesting levels", function testMultipleLevels() {
			const depths = [0, 1, 2, 2, 1, 0]
			const array = ["a", "b", "c", "d", "e", "f"]
			const result = unflatten(depths)(array)
			assertEquals(result, ["a", ["b", ["c", "d"], "e"], "f"])
		})

		it("returns empty array when input is empty", function testEmptyArray() {
			const result = unflatten([])([])
			assertEquals(result, [])
		})

		it("returns empty array when depths is empty", function testEmptyDepths() {
			const result = unflatten([])([1, 2, 3])
			assertEquals(result, [])
		})

		it("returns empty array when array is empty but depths is not", function testEmptyArrayWithDepths() {
			const result = unflatten([0, 1, 2])([])
			assertEquals(result, [])
		})

		it("handles single element at depth 0", function testSingleElement() {
			const result = unflatten([0])([42])
			assertEquals(result, [42])
		})

		it("handles all elements at same depth", function testFlatStructure() {
			const depths = [0, 0, 0, 0]
			const array = [1, 2, 3, 4]
			const result = unflatten(depths)(array)
			assertEquals(result, [1, 2, 3, 4])
		})

		it("handles nested array at start", function testNestedStart() {
			const depths = [1, 1, 0]
			const array = ["a", "b", "c"]
			const result = unflatten(depths)(array)
			assertEquals(result, [["a", "b"], "c"])
		})

		it("handles nested array at end", function testNestedEnd() {
			const depths = [0, 1, 1]
			const array = ["a", "b", "c"]
			const result = unflatten(depths)(array)
			assertEquals(result, ["a", ["b", "c"]])
		})

		it("handles deeply nested structure", function testDeeplyNested() {
			const depths = [0, 1, 2, 3, 3, 2, 1, 0]
			const array = [1, 2, 3, 4, 5, 6, 7, 8]
			const result = unflatten(depths)(array)
			assertEquals(result, [1, [2, [3, [4, 5], 6], 7], 8])
		})

		it("works with string arrays", function testStringArrays() {
			const depths = [0, 1, 1, 0]
			const array = ["a", "b", "c", "d"]
			const result = unflatten(depths)(array)
			assertEquals(result, ["a", ["b", "c"], "d"])
		})

		it("works with mixed types", function testMixedTypes() {
			const depths = [0, 1, 1, 0]
			const array = [1, "a", 2, "b"]
			const result = unflatten(depths)(array)
			assertEquals(result, [1, ["a", 2], "b"])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const depths = Array.from({ length: 1000 }, function createDepth(
				_,
				i: number,
			) {
				return i % 3
			})
			const array = Array.from({ length: 1000 }, function createElement(
				_,
				i: number,
			) {
				return i
			})
			const result = unflatten(depths)(array)
			//++ Result should be an array
			assertEquals(Array.isArray(result), true)
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const depths = [0, 1, 1, 0]
			const input = ok(["a", "b", "c", "d"])
			const result = unflatten(depths)(input)

			assertEquals(result, ok(["a", ["b", "c"], "d"]))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const depths = [0, 1, 1]
			const input = error(testError)
			const result = unflatten(depths)(input)

			assertEquals(result, error(testError))
		})

		it("handles empty array in successful Result", function testEmptyResult() {
			const input = ok([])
			const result = unflatten([])(input)

			assertEquals(result, ok([]))
		})

		it("handles multi-level nesting in Result", function testMultiLevelResult() {
			const depths = [0, 1, 2, 2, 1, 0]
			const input = ok([1, 2, 3, 4, 5, 6])
			const result = unflatten(depths)(input)

			assertEquals(result, ok([1, [2, [3, 4], 5], 6]))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const depths = [0, 1, 1, 0]
			const input = success(["a", "b", "c", "d"])
			const result = unflatten(depths)(input)

			assertEquals(result, success(["a", ["b", "c"], "d"]))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const depths = [0, 1, 1]
			const input = failure([testError])
			const result = unflatten(depths)(input)

			assertEquals(result, failure([testError]))
		})

		it("handles empty array in successful Validation", function testEmptyValidation() {
			const input = success([])
			const result = unflatten([])(input)

			assertEquals(result, success([]))
		})

		it("handles multi-level nesting in Validation", function testMultiLevelValidation() {
			const depths = [0, 1, 2, 2, 1, 0]
			const input = success([1, 2, 3, 4, 5, 6])
			const result = unflatten(depths)(input)

			assertEquals(result, success([1, [2, [3, 4], 5], 6]))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("empty arrays return empty", function testEmptyProperty() {
			const result = unflatten([])([])
			assertEquals(result, [])
		})

		it("all depth 0 preserves flat structure", function testFlatPreservation() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr,
					) {
						//++ [EXCEPTION] Using array.length for calculation
						const depths = Array.from(
							{ length: arr.length },
							function createZero() {
								return 0
							},
						)
						const result = unflatten(depths)(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		it("single element at depth 0 returns single-element array", function testSingleElement() {
			fc.assert(
				fc.property(
					fc.integer(),
					function testProperty(
						n,
					) {
						const result = unflatten([0])([n])
						assertEquals(result, [n])
					},
				),
			)
		})

		it("result is always an array", function testArrayResult() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer({ min: 0, max: 3 })),
					function testProperty(
						arr,
						depths,
					) {
						const result = unflatten(depths)(arr)
						assertEquals(Array.isArray(result), true)
					},
				),
			)
		})
	})
})
