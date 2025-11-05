import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import intersection from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("intersection", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("returns elements that exist in both arrays", function testBasicIntersection() {
			const result = intersection([2, 3, 4])([1, 2, 3, 4, 5])
			assertEquals(result, [2, 3, 4])
		})

		it("returns empty array when second array is empty", function testEmptyArray2() {
			const result = intersection([])([1, 2, 3])
			assertEquals(result, [])
		})

		it("returns empty array when first array is empty", function testEmptyArray1() {
			const result = intersection([1, 2, 3])([])
			assertEquals(result, [])
		})

		it("returns all elements when arrays are identical", function testIdenticalArrays() {
			const result = intersection([1, 2, 3])([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("preserves duplicates from first array", function testPreservesDuplicates() {
			const result = intersection([2])([1, 2, 2, 3])
			assertEquals(result, [2, 2])
		})

		it("handles string arrays", function testStringArrays() {
			const result = intersection(["b", "c"])(["a", "b", "c", "d"])
			assertEquals(result, ["b", "c"])
		})

		it("handles arrays with no overlap", function testNoOverlap() {
			const result = intersection([4, 5, 6])([1, 2, 3])
			assertEquals(result, [])
		})

		it("handles single element arrays with match", function testSingleElementMatch() {
			const result = intersection([1])([1])
			assertEquals(result, [1])
		})

		it("handles single element arrays without match", function testSingleElementNoMatch() {
			const result = intersection([2])([1])
			assertEquals(result, [])
		})

		it("handles object references", function testObjectReferences() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 3 }
			const result = intersection([obj2, obj3])([obj1, obj2, obj3])
			assertEquals(result, [obj2, obj3])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const array1 = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const array2 = Array.from({ length: 500 }, function makeElement(_, i) {
				return i * 2
			})
			const result = intersection(array2)(array1)
			// Should contain even numbers up to 998
			assertEquals(result.length, 500)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([1, 2, 3, 4, 5])
			const result = intersection([2, 3, 4])(input)
			assertEquals(result, ok([2, 3, 4]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = intersection([2, 3, 4])(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = intersection([1, 2, 3])(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with no overlap", function testResultNoOverlap() {
			const input = ok([1, 2, 3])
			const result = intersection([4, 5, 6])(input)
			assertEquals(result, ok([]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([1, 2, 3, 4, 5])
			const result = intersection([2, 3, 4])(input)
			assertEquals(result, success([2, 3, 4]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = intersection([2, 3, 4])(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = intersection([1, 2, 3])(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with no overlap", function testValidationNoOverlap() {
			const input = success([1, 2, 3])
			const result = intersection([4, 5, 6])(input)
			assertEquals(result, success([]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("intersection with empty array returns empty", function testEmptyArrayProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = intersection([])(arr)
					assertEquals(result, [])
				}),
			)
		})

		it("intersection with itself returns original", function testSelfIntersectionProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = intersection(arr)(arr)
					assertEquals(result, arr)
				}),
			)
		})

		it("result length is at most minimum of both arrays", function testResultLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(array1, array2) {
						const result = intersection(array2)(array1)
						const minLength = Math.min(array1.length, array2.length)
						assertEquals(result.length <= minLength, true)
					},
				),
			)
		})

		it("all elements in result exist in both arrays", function testBothArraysProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(array1, array2) {
						const result = intersection(array2)(array1)
						const set1 = new Set(array1)
						const set2 = new Set(array2)
						const allInBoth = result.every(function checkInBoth(element) {
							return set1.has(element) && set2.has(element)
						})
						assertEquals(allInBoth, true)
					},
				),
			)
		})

		it("intersection is commutative for unique elements", function testCommutativityProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(array1, array2) {
						const result1 = new Set(intersection(array2)(array1))
						const result2 = new Set(intersection(array1)(array2))
						assertEquals(
							result1.size === result2.size &&
								Array.from(result1).every(function checkElement(element) {
									return result2.has(element)
								}),
							true,
						)
					},
				),
			)
		})
	})
})
