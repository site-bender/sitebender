import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import difference from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("difference", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("returns elements in minuend not in subtrahend", function testBasicDifference() {
			const result = difference([2, 3, 4])([1, 2, 3, 4, 5])
			assertEquals(result, [1, 5])
		})

		it("returns all elements when subtrahend is empty", function testEmptySubtrahend() {
			const result = difference([])([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("returns empty array when minuend is empty", function testEmptyMinuend() {
			const result = difference([1, 2, 3])([])
			assertEquals(result, [])
		})

		it("returns empty array when all elements are in subtrahend", function testAllInSubtrahend() {
			const result = difference([1, 2, 3])([1, 2, 3])
			assertEquals(result, [])
		})

		it("preserves duplicates in minuend", function testPreservesDuplicates() {
			const result = difference([2])([1, 2, 2, 3])
			assertEquals(result, [1, 3])
		})

		it("handles string arrays", function testStringArrays() {
			const result = difference(["b", "c"])(["a", "b", "c", "d"])
			assertEquals(result, ["a", "d"])
		})

		it("handles arrays with no overlap", function testNoOverlap() {
			const result = difference([4, 5, 6])([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("handles single element arrays", function testSingleElement() {
			const result = difference([1])([1])
			assertEquals(result, [])
		})

		it("handles object references", function testObjectReferences() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 3 }
			const result = difference([obj2])([obj1, obj2, obj3])
			assertEquals(result, [obj1, obj3])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const minuend = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const subtrahend = Array.from(
				{ length: 500 },
				function makeElement(_, i) {
					return i * 2
				},
			)
			const result = difference(subtrahend)(minuend)
			// Should contain odd numbers (1, 3, 5, ..., 999) = 500 elements
			assertEquals(result.length, 500)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([1, 2, 3, 4, 5])
			const result = difference([2, 3, 4])(input)
			assertEquals(result, ok([1, 5]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = difference([2, 3, 4])(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = difference([1, 2, 3])(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with no overlap", function testResultNoOverlap() {
			const input = ok([1, 2, 3])
			const result = difference([4, 5, 6])(input)
			assertEquals(result, ok([1, 2, 3]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([1, 2, 3, 4, 5])
			const result = difference([2, 3, 4])(input)
			assertEquals(result, success([1, 5]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = difference([2, 3, 4])(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = difference([1, 2, 3])(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with no overlap", function testValidationNoOverlap() {
			const input = success([1, 2, 3])
			const result = difference([4, 5, 6])(input)
			assertEquals(result, success([1, 2, 3]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("difference with empty subtrahend returns original", function testEmptySubtrahendProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = difference([])(arr)
					assertEquals(result, arr)
				}),
			)
		})

		it("difference with itself returns empty array", function testSelfDifferenceProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = difference(arr)(arr)
					assertEquals(result, [])
				}),
			)
		})

		it("result length is at most minuend length", function testResultLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(minuend, subtrahend) {
						const result = difference(subtrahend)(minuend)
						assertEquals(result.length <= minuend.length, true)
					},
				),
			)
		})

		it("no element in result exists in subtrahend", function testNoOverlapProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(minuend, subtrahend) {
						const result = difference(subtrahend)(minuend)
						const subtrahendSet = new Set(subtrahend)
						const hasOverlap = result.some(function checkOverlap(element) {
							return subtrahendSet.has(element)
						})
						assertEquals(hasOverlap, false)
					},
				),
			)
		})

		it("all elements in result exist in minuend", function testSubsetProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(minuend, subtrahend) {
						const result = difference(subtrahend)(minuend)
						const minuendSet = new Set(minuend)
						const allInMinuend = result.every(function checkInMinuend(element) {
							return minuendSet.has(element)
						})
						assertEquals(allInMinuend, true)
					},
				),
			)
		})
	})
})
