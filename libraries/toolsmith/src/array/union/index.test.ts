import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import union from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("union", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("returns unique elements from both arrays", function testBasicUnion() {
			const result = union([1, 2, 3])([3, 4, 5])
			assertEquals(result, [1, 2, 3, 4, 5])
		})

		it("removes duplicates from combined arrays", function testRemovesDuplicates() {
			const result = union([1, 2, 2, 3])([2, 3, 3, 4])
			assertEquals(result, [1, 2, 3, 4])
		})

		it("handles empty first array", function testEmptyArray1() {
			const result = union([])([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("handles empty second array", function testEmptyArray2() {
			const result = union([1, 2, 3])([])
			assertEquals(result, [1, 2, 3])
		})

		it("handles both arrays empty", function testBothEmpty() {
			const result = union([])([])
			assertEquals(result, [])
		})

		it("handles identical arrays", function testIdenticalArrays() {
			const result = union([1, 2, 3])([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("handles string arrays", function testStringArrays() {
			const result = union(["a", "b"])(["b", "c", "d"])
			assertEquals(result, ["a", "b", "c", "d"])
		})

		it("handles arrays with no overlap", function testNoOverlap() {
			const result = union([1, 2, 3])([4, 5, 6])
			assertEquals(result, [1, 2, 3, 4, 5, 6])
		})

		it("handles single element arrays", function testSingleElement() {
			const result = union([1])([2])
			assertEquals(result, [1, 2])
		})

		it("handles object references", function testObjectReferences() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 3 }
			const result = union([obj1, obj2])([obj2, obj3])
			assertEquals(result, [obj1, obj2, obj3])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const array1 = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const array2 = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i + 500
			})
			const result = union(array1)(array2)
			// Should contain 0-1499 (unique elements)
			assertEquals(result.length, 1500)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([3, 4, 5])
			const result = union([1, 2, 3])(input)
			assertEquals(result, ok([1, 2, 3, 4, 5]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = union([1, 2, 3])(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = union([1, 2, 3])(input)
			assertEquals(result, ok([1, 2, 3]))
		})

		it("handles Result with duplicates", function testResultDuplicates() {
			const input = ok([2, 3, 3, 4])
			const result = union([1, 2, 2, 3])(input)
			assertEquals(result, ok([1, 2, 3, 4]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([3, 4, 5])
			const result = union([1, 2, 3])(input)
			assertEquals(result, success([1, 2, 3, 4, 5]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = union([1, 2, 3])(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = union([1, 2, 3])(input)
			assertEquals(result, success([1, 2, 3]))
		})

		it("handles Validation with duplicates", function testValidationDuplicates() {
			const input = success([2, 3, 3, 4])
			const result = union([1, 2, 2, 3])(input)
			assertEquals(result, success([1, 2, 3, 4]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("union with empty array returns deduplicated array", function testEmptyArrayProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = union([])(arr)
					const deduped = [...new Set(arr)]
					assertEquals(result, deduped)
				}),
			)
		})

		it("union with itself returns deduplicated array", function testSelfUnionProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = union(arr)(arr)
					const deduped = [...new Set(arr)]
					assertEquals(result, deduped)
				}),
			)
		})

		it("result contains all unique elements from both arrays", function testAllElementsProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(array1, array2) {
						const result = union(array1)(array2)
						const expected = new Set([...array1, ...array2])
						assertEquals(result.length, expected.size)
					},
				),
			)
		})

		it("union is commutative", function testCommutativityProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(array1, array2) {
						const result1 = new Set(union(array1)(array2))
						const result2 = new Set(union(array2)(array1))
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

		it("union is associative", function testAssociativityProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(array1, array2, array3) {
						const result1 = new Set(union(union(array1)(array2))(array3))
						const result2 = new Set(union(array1)(union(array2)(array3)))
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
