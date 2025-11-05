import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import xprod from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("xprod", function testXprod() {
	describe("Plain array path", function testPlainArrayPath() {
		it("creates cartesian product of two arrays", function testBasicProduct() {
			const array1 = [1, 2]
			const array2 = ["a", "b", "c"]
			const result = xprod(array1)(array2)
			assertEquals(result, [
				[1, "a"],
				[1, "b"],
				[1, "c"],
				[2, "a"],
				[2, "b"],
				[2, "c"],
			])
		})

		it("returns empty array when first array is empty", function testFirstEmpty() {
			const result = xprod([])(["a", "b"])
			assertEquals(result, [])
		})

		it("returns empty array when second array is empty", function testSecondEmpty() {
			const result = xprod([1, 2])([] as ReadonlyArray<string>)
			assertEquals(result, [])
		})

		it("returns empty array when both arrays are empty", function testBothEmpty() {
			const result = xprod([])([] as ReadonlyArray<string>)
			assertEquals(result, [])
		})

		it("works with same type arrays", function testSameTypes() {
			const array1 = [1, 2]
			const array2 = [3, 4]
			const result = xprod(array1)(array2)
			assertEquals(result, [
				[1, 3],
				[1, 4],
				[2, 3],
				[2, 4],
			])
		})

		it("works with single element arrays", function testSingleElements() {
			const array1 = [1]
			const array2 = ["a"]
			const result = xprod(array1)(array2)
			assertEquals(result, [[1, "a"]])
		})

		it("works with boolean arrays", function testBooleanArrays() {
			const array1 = [true, false]
			const array2 = [false, true]
			const result = xprod(array1)(array2)
			assertEquals(result, [
				[true, false],
				[true, true],
				[false, false],
				[false, true],
			])
		})

		it("works with object arrays", function testObjectArrays() {
			const array1 = [{ id: 1 }, { id: 2 }]
			const array2 = [{ name: "a" }]
			const result = xprod(array1)(array2)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 2)
			assertEquals(result[0], [{ id: 1 }, { name: "a" }])
			assertEquals(result[1], [{ id: 2 }, { name: "a" }])
		})

		it("handles larger arrays", function testLargerArrays() {
			const array1 = [1, 2, 3]
			const array2 = ["a", "b", "c", "d"]
			const result = xprod(array1)(array2)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 12)
			assertEquals(result[0], [1, "a"])
			assertEquals(result[11], [3, "d"])
		})

		it("works with string arrays", function testStringArrays() {
			const array1 = ["x", "y"]
			const array2 = ["1", "2", "3"]
			const result = xprod(array1)(array2)
			assertEquals(result, [
				["x", "1"],
				["x", "2"],
				["x", "3"],
				["y", "1"],
				["y", "2"],
				["y", "3"],
			])
		})

		it("handles arrays with null and undefined", function testNullUndefined() {
			const array1 = [null, 1]
			const array2 = [undefined, 2]
			const result = xprod(array1)(array2)
			assertEquals(result, [
				[null, undefined],
				[null, 2],
				[1, undefined],
				[1, 2],
			])
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const array1 = [1, 2]
			const array2 = ok(["a", "b"])
			const result = xprod(array1)(array2)

			assertEquals(
				result,
				ok([
					[1, "a"],
					[1, "b"],
					[2, "a"],
					[2, "b"],
				]),
			)
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const array1 = [1, 2]
			const array2 = error(testError)
			const result = xprod(array1)(array2)

			assertEquals(result, error(testError))
		})

		it("handles empty arrays in successful Result", function testEmptyResult() {
			const array1: Array<number> = []
			const array2 = ok([])
			const result = xprod(array1)(array2)

			assertEquals(result, ok([]))
		})

		it("handles Result with single elements", function testResultSingleElement() {
			const array1 = [1]
			const array2 = ok(["a"])
			const result = xprod(array1)(array2)

			assertEquals(result, ok([[1, "a"]]))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const array1 = [1, 2]
			const array2 = success(["a", "b"])
			const result = xprod(array1)(array2)

			assertEquals(
				result,
				success([
					[1, "a"],
					[1, "b"],
					[2, "a"],
					[2, "b"],
				]),
			)
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const array1 = [1, 2]
			const array2 = failure([testError])
			const result = xprod(array1)(array2)

			assertEquals(result, failure([testError]))
		})

		it("handles empty arrays in successful Validation", function testEmptyValidation() {
			const array1: Array<number> = []
			const array2 = success([])
			const result = xprod(array1)(array2)

			assertEquals(result, success([]))
		})

		it("handles Validation with single elements", function testValidationSingleElement() {
			const array1 = [1]
			const array2 = success(["a"])
			const result = xprod(array1)(array2)

			assertEquals(result, success([[1, "a"]]))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("result length equals product of input lengths", function testLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					function testProperty(
						arr1,
						arr2,
					) {
						const result = xprod(arr1)(arr2)
						//++ [EXCEPTION] Using array.length for assertion
						const expectedLength = arr1.length * arr2.length
						assertEquals(result.length, expectedLength)
					},
				),
			)
		})

		it("all pairs are unique combinations", function testUniquenessProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 })),
					fc.array(fc.string()),
					function testProperty(
						arr1,
						arr2,
					) {
						const result = xprod(arr1)(arr2)
						//++ [EXCEPTION] Using native .every() and .includes()
						const allUnique = result.every(function checkPair(
							pair: [number, string],
							_index: number,
						): boolean {
							const [first, second] = pair
							return arr1.includes(first) && arr2.includes(second)
						})
						assertEquals(allUnique, true)
					},
				),
			)
		})

		it("empty first array produces empty result", function testFirstEmptyProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr2,
					) {
						const result = xprod([])(arr2)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, 0)
					},
				),
			)
		})

		it("empty second array produces empty result", function testSecondEmptyProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr1,
					) {
						const result = xprod(arr1)([])
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, 0)
					},
				),
			)
		})
	})
})
