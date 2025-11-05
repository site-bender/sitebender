import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import nub from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("nub", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("removes duplicate elements", function testBasicNub() {
			const result = nub([1, 2, 2, 3, 3, 3, 4])
			assertEquals(result, [1, 2, 3, 4])
		})

		it("returns empty array for empty input", function testEmptyArray() {
			const result = nub([])
			assertEquals(result, [])
		})

		it("returns same array when no duplicates", function testNoDuplicates() {
			const result = nub([1, 2, 3, 4, 5])
			assertEquals(result, [1, 2, 3, 4, 5])
		})

		it("handles single element array", function testSingleElement() {
			const result = nub([1])
			assertEquals(result, [1])
		})

		it("handles all duplicates", function testAllDuplicates() {
			const result = nub([5, 5, 5, 5])
			assertEquals(result, [5])
		})

		it("handles string arrays", function testStringArrays() {
			const result = nub(["a", "b", "a", "c", "b"])
			assertEquals(result, ["a", "b", "c"])
		})

		it("preserves first occurrence order", function testPreservesOrder() {
			const result = nub([3, 1, 2, 1, 3, 2])
			assertEquals(result, [3, 1, 2])
		})

		it("handles object references", function testObjectReferences() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 3 }
			const result = nub([obj1, obj2, obj1, obj3, obj2])
			assertEquals(result, [obj1, obj2, obj3])
		})

		it("handles arrays with different types", function testMixedTypes() {
			const result = nub([1, "1", 2, "2", 1, "1"])
			assertEquals(result, [1, "1", 2, "2"])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const array = Array.from({ length: 10000 }, function makeElement(_, i) {
				return i % 100
			})
			const result = nub(array)
			assertEquals(result.length, 100)
		})

		it("handles null and undefined", function testNullUndefined() {
			const result = nub([null, undefined, null, 1, undefined, 1])
			assertEquals(result, [null, undefined, 1])
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([1, 2, 2, 3, 3, 3, 4])
			const result = nub(input)
			assertEquals(result, ok([1, 2, 3, 4]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = nub(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = nub(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with no duplicates", function testResultNoDuplicates() {
			const input = ok([1, 2, 3, 4, 5])
			const result = nub(input)
			assertEquals(result, ok([1, 2, 3, 4, 5]))
		})

		it("handles Result with all duplicates", function testResultAllDuplicates() {
			const input = ok([5, 5, 5, 5])
			const result = nub(input)
			assertEquals(result, ok([5]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([1, 2, 2, 3, 3, 3, 4])
			const result = nub(input)
			assertEquals(result, success([1, 2, 3, 4]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = nub(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = nub(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with no duplicates", function testValidationNoDuplicates() {
			const input = success([1, 2, 3, 4, 5])
			const result = nub(input)
			assertEquals(result, success([1, 2, 3, 4, 5]))
		})

		it("handles Validation with all duplicates", function testValidationAllDuplicates() {
			const input = success([5, 5, 5, 5])
			const result = nub(input)
			assertEquals(result, success([5]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("nub returns array with unique elements", function testUniqueProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = nub(arr)
					const resultSet = new Set(result)
					assertEquals(result.length, resultSet.size)
				}),
			)
		})

		it("nub is idempotent", function testIdempotentProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result1 = nub(arr)
					const result2 = nub(result1)
					assertEquals(result1, result2)
				}),
			)
		})

		it("result length is at most input length", function testLengthProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = nub(arr)
					assertEquals(result.length <= arr.length, true)
				}),
			)
		})

		it("all result elements exist in input", function testSubsetProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = nub(arr)
					const inputSet = new Set(arr)
					const allInInput = result.every(function checkInInput(element) {
						return inputSet.has(element)
					})
					assertEquals(allInInput, true)
				}),
			)
		})

		it("preserves order of first occurrences", function testOrderProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = nub(arr)
					const seen = new Set()
					const expectedOrder: Array<number> = []

					for (let i = 0; i < arr.length; i++) {
						const element = arr[i]
						if (!seen.has(element)) {
							seen.add(element)
							expectedOrder.push(element)
						}
					}

					assertEquals(result, expectedOrder)
				}),
			)
		})
	})
})
