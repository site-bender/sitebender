import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import findDuplicates from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("findDuplicates", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("finds duplicates in array", function testBasicFind() {
			const result = findDuplicates([1, 2, 3, 2, 4, 3, 5])
			assertEquals(result, [2, 3])
		})

		it("returns empty array when no duplicates", function testNoDuplicates() {
			const result = findDuplicates([1, 2, 3, 4, 5])
			assertEquals(result, [])
		})

		it("handles empty array", function testEmptyArray() {
			const result = findDuplicates([])
			assertEquals(result, [])
		})

		it("handles single element array", function testSingleElement() {
			const result = findDuplicates([1])
			assertEquals(result, [])
		})

		it("handles array with all duplicates", function testAllDuplicates() {
			const result = findDuplicates([1, 1, 1, 1])
			assertEquals(result, [1])
		})

		it("returns duplicates in order of first occurrence", function testOrdering() {
			const result = findDuplicates([3, 1, 2, 3, 2, 1])
			assertEquals(result, [3, 1, 2])
		})

		it("handles multiple occurrences of same element", function testMultipleOccurrences() {
			const result = findDuplicates([1, 2, 1, 2, 1, 2])
			assertEquals(result, [1, 2])
		})

		it("works with string arrays", function testStringArrays() {
			const result = findDuplicates(["a", "b", "c", "a", "b"])
			assertEquals(result, ["a", "b"])
		})

		it("works with objects by reference", function testObjectReferences() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 3 }
			const result = findDuplicates([obj1, obj2, obj1, obj3, obj2])
			assertEquals(result, [obj1, obj2])
		})

		it("different objects with same values are not duplicates", function testDifferentObjects() {
			const result = findDuplicates([{ id: 1 }, { id: 1 }, { id: 2 }])
			assertEquals(result, [])
		})

		it("handles NaN values correctly", function testNaN() {
			const result = findDuplicates([NaN, 1, NaN, 2])
			assertEquals(result, [NaN])
		})

		it("handles +0 and -0 as same value", function testZeros() {
			//++ Map treats +0 and -0 as the same key
			const result = findDuplicates([+0, -0, +0, -0])
			assertEquals(result.length, 1)
		})

		it("handles null and undefined", function testNullUndefined() {
			const result = findDuplicates([null, undefined, null, undefined, 1])
			assertEquals(result, [null, undefined])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			//++ Create array with duplicates: [0,1,2,...,99,0,1,2,...,99]
			const input = Array.from({ length: 200 }, function makeElement(_, i) {
				//++ [EXCEPTION] Using modulo operator for test setup
				return i % 100
			})
			const result = findDuplicates(input)
			assertEquals(result.length, 100)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([1, 2, 3, 2, 4, 3, 5])
			const result = findDuplicates(input)
			assertEquals(result, ok([2, 3]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = findDuplicates(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = findDuplicates(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with no duplicates", function testResultNoDuplicates() {
			const input = ok([1, 2, 3, 4, 5])
			const result = findDuplicates(input)
			assertEquals(result, ok([]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([1, 2, 3, 2, 4, 3, 5])
			const result = findDuplicates(input)
			assertEquals(result, success([2, 3]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = findDuplicates(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = findDuplicates(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with no duplicates", function testValidationNoDuplicates() {
			const input = success([1, 2, 3, 4, 5])
			const result = findDuplicates(input)
			assertEquals(result, success([]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("result length is at most half of input length", function testLengthProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findDuplicates(arr)
					//++ Each duplicate appears at least twice, so at most half can be duplicates
					//++ [EXCEPTION] Using native .length for test assertion
					assertEquals(result.length <= Math.ceil(arr.length / 2), true)
				}),
			)
		})

		it("all returned elements appear in original array", function testContainmentProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findDuplicates(arr)
					//++ [EXCEPTION] Using native .every() and .includes() for test assertion
					assertEquals(
						result.every(function checkIncludes(item) {
							return arr.includes(item)
						}),
						true,
					)
				}),
			)
		})

		it("all returned elements appear more than once in original", function testDuplicateProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findDuplicates(arr)
					//++ [EXCEPTION] Using native .every() for test assertion
					assertEquals(
						result.every(function checkDuplicate(item) {
							let count = 0
							//++ [EXCEPTION] Using loop to count occurrences
							for (let i = 0; i < arr.length; i++) {
								if (arr[i] === item) {
									count++
								}
							}
							return count > 1
						}),
						true,
					)
				}),
			)
		})

		it("no duplicates in result array", function testNoDuplicatesInResult() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findDuplicates(arr)
					//++ [EXCEPTION] Using loop to check for duplicates
					for (let i = 0; i < result.length; i++) {
						for (let j = i + 1; j < result.length; j++) {
							assertEquals(result[i] !== result[j], true)
						}
					}
				}),
			)
		})

		it("preserves order of first occurrences", function testOrderProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findDuplicates(arr)
					//++ Each duplicate should appear in result in order of first occurrence
					//++ [EXCEPTION] Using loop to check order
					for (let i = 0; i < result.length - 1; i++) {
						const firstOccurrenceI = arr.indexOf(result[i])
						const firstOccurrenceJ = arr.indexOf(result[i + 1])
						assertEquals(firstOccurrenceI < firstOccurrenceJ, true)
					}
				}),
			)
		})

		it("idempotent: findDuplicates(findDuplicates(x)) = []", function testIdempotentProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const once = findDuplicates(arr)
					const twice = findDuplicates(once)
					assertEquals(twice, [])
				}),
			)
		})
	})
})
