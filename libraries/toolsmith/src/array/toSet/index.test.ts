import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import toSet from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("toSet", function testToSet() {
	describe("Plain array path", function testPlainArrayPath() {
		it("converts array with duplicates to Set", function testWithDuplicates() {
			const input = [1, 2, 2, 3, 3, 3, 4]
			const result = toSet(input)
			assertEquals(result, new Set([1, 2, 3, 4]))
		})

		it("converts array without duplicates to Set", function testWithoutDuplicates() {
			const input = [1, 2, 3, 4, 5]
			const result = toSet(input)
			assertEquals(result, new Set([1, 2, 3, 4, 5]))
		})

		it("returns empty Set when converting empty array", function testEmptyArray() {
			const result = toSet([])
			assertEquals(result, new Set())
		})

		it("works with string arrays", function testStringArrays() {
			const input = ["a", "b", "b", "c", "c", "c"]
			const result = toSet(input)
			assertEquals(result, new Set(["a", "b", "c"]))
		})

		it("works with mixed types", function testMixedTypes() {
			const input = [1, "a", 1, "a", 2, "b"]
			const result = toSet(input)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.size, 4)
		})

		it("preserves objects by reference", function testObjectReference() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const input = [obj1, obj2, obj1]
			const result = toSet(input)
			//++ [EXCEPTION] Using Set.has for verification
			assertEquals(result.size, 2)
			assertEquals(result.has(obj1), true)
			assertEquals(result.has(obj2), true)
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function createValue(
				_,
				i: number,
			) {
				return i % 100
			})
			const result = toSet(input)
			//++ [EXCEPTION] Using Set.size for assertion
			assertEquals(result.size, 100)
		})

		it("works with boolean arrays", function testBooleanArrays() {
			const input = [true, false, true, false, true]
			const result = toSet(input)
			assertEquals(result, new Set([true, false]))
		})

		it("removes all duplicates from array", function testRemoveAllDuplicates() {
			const input = [1, 1, 1, 1, 1]
			const result = toSet(input)
			assertEquals(result, new Set([1]))
		})

		it("handles null and undefined values", function testNullUndefined() {
			const input = [null, undefined, null, undefined, 1, 1]
			const result = toSet(input)
			//++ [EXCEPTION] Using Set.size for assertion
			assertEquals(result.size, 3)
			assertEquals(result.has(null), true)
			assertEquals(result.has(undefined), true)
			assertEquals(result.has(1), true)
		})

		it("works with number arrays", function testNumberArrays() {
			const input = [1.5, 2.5, 1.5, 3.5, 2.5]
			const result = toSet(input)
			assertEquals(result, new Set([1.5, 2.5, 3.5]))
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const input = ok([1, 2, 2, 3, 3, 3])
			const result = toSet(input)

			assertEquals(result, ok(new Set([1, 2, 3])))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = error(testError)
			const result = toSet(input)

			assertEquals(result, error(testError))
		})

		it("handles empty array in successful Result", function testEmptyResult() {
			const input = ok([])
			const result = toSet(input)

			assertEquals(result, ok(new Set()))
		})

		it("handles Result with string array", function testResultWithStrings() {
			const input = ok(["a", "b", "b", "c"])
			const result = toSet(input)

			assertEquals(result, ok(new Set(["a", "b", "c"])))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const input = success([1, 2, 2, 3, 3, 3])
			const result = toSet(input)

			assertEquals(result, success(new Set([1, 2, 3])))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = failure([testError])
			const result = toSet(input)

			assertEquals(result, failure([testError]))
		})

		it("handles empty array in successful Validation", function testEmptyValidation() {
			const input = success([])
			const result = toSet(input)

			assertEquals(result, success(new Set()))
		})

		it("handles Validation with string array", function testValidationWithStrings() {
			const input = success(["a", "b", "b", "c"])
			const result = toSet(input)

			assertEquals(result, success(new Set(["a", "b", "c"])))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("Set size is less than or equal to array length", function testSizeProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr,
					) {
						const result = toSet(arr)
						//++ [EXCEPTION] Using Set.size and array.length for assertion
						assertEquals(result.size <= arr.length, true)
					},
				),
			)
		})

		it("converting empty arrays returns empty Set", function testEmptyProperty() {
			fc.assert(
				fc.property(
					fc.constant([]),
					function testProperty(
						arr,
					) {
						const result = toSet(arr)
						//++ [EXCEPTION] Using Set.size for assertion
						assertEquals(result.size, 0)
					},
				),
			)
		})

		it("all array elements are in the Set", function testElementsProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 })),
					function testProperty(
						arr,
					) {
						const result = toSet(arr)
						//++ [EXCEPTION] Using native .every() for verification
						const allPresent = arr.every(function checkPresence(
							element: number,
						): boolean {
							return result.has(element)
						})
						assertEquals(allPresent, true)
					},
				),
			)
		})

		it("Set has no duplicates", function testNoDuplicatesProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr,
					) {
						const result = toSet(arr)
						//++ [EXCEPTION] Using Array.from and Set constructor
						const resultArray = Array.from(result)
						const resultSet = new Set(resultArray)
						assertEquals(resultSet.size, resultArray.length)
					},
				),
			)
		})

		it("converting Set to array and back produces same Set", function testIdempotenceProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr,
					) {
						const set1 = toSet(arr)
						//++ [EXCEPTION] Using Array.from
						const arr2 = Array.from(set1)
						const set2 = toSet(arr2)
						assertEquals(set1, set2)
					},
				),
			)
		})
	})
})
