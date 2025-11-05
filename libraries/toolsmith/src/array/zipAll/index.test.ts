import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import zipAll from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("zipAll", function testZipAll() {
	describe("Plain array path", function testPlainArrayPath() {
		it("zips equal length arrays", function testEqualLength() {
			const array1 = [1, 2, 3]
			const array2 = ["a", "b", "c"]
			const result = zipAll(array2)(array1)
			assertEquals(result, [[1, "a"], [2, "b"], [3, "c"]])
		})

		it("fills undefined for shorter first array", function testFirstShorter() {
			const array1 = [1, 2]
			const array2 = ["a", "b", "c", "d"]
			const result = zipAll(array2)(array1)
			assertEquals(result, [
				[1, "a"],
				[2, "b"],
				[undefined, "c"],
				[undefined, "d"],
			])
		})

		it("fills undefined for shorter second array", function testSecondShorter() {
			const array1 = [1, 2, 3, 4]
			const array2 = ["a", "b"]
			const result = zipAll(array2)(array1)
			assertEquals(result, [
				[1, "a"],
				[2, "b"],
				[3, undefined],
				[4, undefined],
			])
		})

		it("returns empty array for both empty arrays", function testBothEmpty() {
			const result = zipAll([])([] as Array<number>)
			assertEquals(result, [])
		})

		it("handles first array empty", function testFirstEmpty() {
			const array2 = ["a", "b", "c"]
			const result = zipAll(array2)([] as Array<number>)
			assertEquals(result, [
				[undefined, "a"],
				[undefined, "b"],
				[undefined, "c"],
			])
		})

		it("handles second array empty", function testSecondEmpty() {
			const array1 = [1, 2, 3]
			const result = zipAll([])(array1)
			assertEquals(result, [
				[1, undefined],
				[2, undefined],
				[3, undefined],
			])
		})

		it("works with same type arrays", function testSameTypes() {
			const array1 = [1, 2, 3]
			const array2 = [10, 20, 30, 40]
			const result = zipAll(array2)(array1)
			assertEquals(result, [
				[1, 10],
				[2, 20],
				[3, 30],
				[undefined, 40],
			])
		})

		it("works with object arrays", function testObjectArrays() {
			const array1 = [{ id: 1 }, { id: 2 }]
			const array2 = [{ name: "a" }, { name: "b" }, { name: "c" }]
			const result = zipAll(array2)(array1)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 3)
			assertEquals(result[0], [{ id: 1 }, { name: "a" }])
			assertEquals(result[1], [{ id: 2 }, { name: "b" }])
			assertEquals(result[2], [undefined, { name: "c" }])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const array1 = Array.from({ length: 1000 }, function createValue(
				_,
				i: number,
			) {
				return i
			})
			const array2 = Array.from({ length: 500 }, function createValue(
				_,
				i: number,
			) {
				return `value${i}`
			})
			const result = zipAll(array2)(array1)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 1000)
			assertEquals(result[0], [0, "value0"])
			assertEquals(result[499], [499, "value499"])
			assertEquals(result[999], [999, undefined])
		})

		it("works with boolean arrays", function testBooleanArrays() {
			const array1 = [true, false]
			const array2 = [false, true, false]
			const result = zipAll(array2)(array1)
			assertEquals(result, [
				[true, false],
				[false, true],
				[undefined, false],
			])
		})

		it("handles null values in arrays", function testNullValues() {
			const array1 = [null, 1, null]
			const array2 = [2, null]
			const result = zipAll(array2)(array1)
			assertEquals(result, [
				[null, 2],
				[1, null],
				[null, undefined],
			])
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const array2 = ["a", "b", "c"]
			const array1 = ok([1, 2, 3])
			const result = zipAll(array2)(array1)

			assertEquals(result, ok([[1, "a"], [2, "b"], [3, "c"]]))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const array2 = ["a", "b"]
			const array1 = error(testError)
			const result = zipAll(array2)(array1)

			assertEquals(result, error(testError))
		})

		it("handles empty arrays in successful Result", function testEmptyResult() {
			const array2: Array<string> = []
			const array1 = ok([])
			const result = zipAll(array2)(array1)

			assertEquals(result, ok([]))
		})

		it("handles Result with mismatched lengths", function testResultMismatch() {
			const array2 = ["a", "b"]
			const array1 = ok([1, 2, 3, 4])
			const result = zipAll(array2)(array1)

			assertEquals(
				result,
				ok([
					[1, "a"],
					[2, "b"],
					[3, undefined],
					[4, undefined],
				]),
			)
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const array2 = ["a", "b", "c"]
			const array1 = success([1, 2, 3])
			const result = zipAll(array2)(array1)

			assertEquals(result, success([[1, "a"], [2, "b"], [3, "c"]]))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const array2 = ["a", "b"]
			const array1 = failure([testError])
			const result = zipAll(array2)(array1)

			assertEquals(result, failure([testError]))
		})

		it("handles empty arrays in successful Validation", function testEmptyValidation() {
			const array2: Array<string> = []
			const array1 = success([])
			const result = zipAll(array2)(array1)

			assertEquals(result, success([]))
		})

		it("handles Validation with mismatched lengths", function testValidationMismatch() {
			const array2 = ["a", "b"]
			const array1 = success([1, 2, 3, 4])
			const result = zipAll(array2)(array1)

			assertEquals(
				result,
				success([
					[1, "a"],
					[2, "b"],
					[3, undefined],
					[4, undefined],
				]),
			)
		})
	})

	describe("Property-based tests", function testProperties() {
		it("result length equals max of input lengths", function testLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					function testProperty(
						arr1,
						arr2,
					) {
						const result = zipAll(arr2)(arr1)
						//++ [EXCEPTION] Using native Math.max and array.length
						const expectedLength = Math.max(arr1.length, arr2.length)
						assertEquals(result.length, expectedLength)
					},
				),
			)
		})

		it("all pairs contain values from input arrays", function testValuesProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					function testProperty(
						arr1,
						arr2,
					) {
						const result = zipAll(arr2)(arr1)
						//++ [EXCEPTION] Using native .forEach() and index access
						result.forEach(function checkPair(
							pair: [number | undefined, string | undefined],
							index: number,
						): void {
							const expectedFirst = index < arr1.length
								? arr1[index]
								: undefined
							const expectedSecond = index < arr2.length
								? arr2[index]
								: undefined
							assertEquals(pair, [expectedFirst, expectedSecond])
						})
					},
				),
			)
		})

		it("both empty arrays produce empty result", function testBothEmptyProperty() {
			fc.assert(
				fc.property(
					fc.constant([]),
					fc.constant([]),
					function testProperty(
						arr1,
						arr2,
					) {
						const result = zipAll(arr2)(arr1)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, 0)
					},
				),
			)
		})

		it("no pairs are lost or added", function testCountProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					function testProperty(
						arr1,
						arr2,
					) {
						const result = zipAll(arr2)(arr1)
						//++ [EXCEPTION] Using native Math.max and array.length
						assertEquals(result.length, Math.max(arr1.length, arr2.length))
					},
				),
			)
		})
	})
})
