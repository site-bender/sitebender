import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import dropRepeats from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("dropRepeats", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("removes consecutive duplicates", function testBasicDropRepeats() {
			const result = dropRepeats([1, 1, 2, 3, 3, 3, 4])
			assertEquals(result, [1, 2, 3, 4])
		})

		it("handles empty array", function testEmptyArray() {
			const result = dropRepeats([])
			assertEquals(result, [])
		})

		it("handles single element array", function testSingleElement() {
			const result = dropRepeats([1])
			assertEquals(result, [1])
		})

		it("handles array with no duplicates", function testNoDuplicates() {
			const result = dropRepeats([1, 2, 3, 4, 5])
			assertEquals(result, [1, 2, 3, 4, 5])
		})

		it("handles array with all duplicates", function testAllDuplicates() {
			const result = dropRepeats([1, 1, 1, 1, 1])
			assertEquals(result, [1])
		})

		it("preserves non-consecutive duplicates", function testNonConsecutiveDuplicates() {
			const result = dropRepeats([1, 2, 1, 2, 1])
			assertEquals(result, [1, 2, 1, 2, 1])
		})

		it("handles string arrays", function testStringArrays() {
			const result = dropRepeats(["a", "a", "b", "c", "c", "d"])
			assertEquals(result, ["a", "b", "c", "d"])
		})

		it("handles object references", function testObjectReferences() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 3 }
			const result = dropRepeats([obj1, obj1, obj2, obj3, obj3])
			assertEquals(result, [obj1, obj2, obj3])
		})

		it("handles different objects with same values", function testDifferentObjects() {
			const obj1 = { id: 1 }
			const obj2 = { id: 1 }
			const result = dropRepeats([obj1, obj2])
			// Different object references, so both preserved
			assertEquals(result, [obj1, obj2])
		})

		it("handles NaN values", function testNaNValues() {
			const result = dropRepeats([NaN, NaN, 1, NaN, NaN])
			// Object.is(NaN, NaN) is true, so consecutive NaNs are removed
			assertEquals(result, [NaN, 1, NaN])
		})

		it("handles +0 and -0", function testPlusMinusZero() {
			const result = dropRepeats([+0, -0, +0])
			// Object.is(+0, -0) is false, so they are treated as different
			assertEquals(result, [+0, -0, +0])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				//++ [EXCEPTION] Using modulo operator for test setup
				return Math.floor(i / 10) // Creates groups of 10 duplicates
			})
			const result = dropRepeats(input)
			assertEquals(result.length, 100)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			const input = ok([1, 1, 2, 3, 3, 3, 4])
			const result = dropRepeats(input)
			assertEquals(result, ok([1, 2, 3, 4]))
		})

		it("passes through error unchanged", function testResultError() {
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = dropRepeats(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			const input = ok([])
			const result = dropRepeats(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with single element", function testResultSingleElement() {
			const input = ok([1])
			const result = dropRepeats(input)
			assertEquals(result, ok([1]))
		})

		it("handles Result with no duplicates", function testResultNoDuplicates() {
			const input = ok([1, 2, 3, 4])
			const result = dropRepeats(input)
			assertEquals(result, ok([1, 2, 3, 4]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			const input = success([1, 1, 2, 3, 3, 3, 4])
			const result = dropRepeats(input)
			assertEquals(result, success([1, 2, 3, 4]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = dropRepeats(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			const input = success([])
			const result = dropRepeats(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with single element", function testValidationSingleElement() {
			const input = success([1])
			const result = dropRepeats(input)
			assertEquals(result, success([1]))
		})

		it("handles Validation with no duplicates", function testValidationNoDuplicates() {
			const input = success([1, 2, 3, 4])
			const result = dropRepeats(input)
			assertEquals(result, success([1, 2, 3, 4]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("result length is at most input length", function testResultLengthProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = dropRepeats(arr)
					assertEquals(result.length <= arr.length, true)
				}),
			)
		})

		it("idempotent: dropRepeats(dropRepeats(x)) = dropRepeats(x)", function testIdempotentProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const once = dropRepeats(arr)
					const twice = dropRepeats(once)
					assertEquals(twice, once)
				}),
			)
		})

		it("no consecutive duplicates in result", function testNoConsecutiveDuplicates() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = dropRepeats(arr)
					//++ [EXCEPTION] Using loop to check consecutive elements
					for (let index = 1; index < result.length; index++) {
						const current = result[index]
						const previous = result[index - 1]
						assertEquals(current !== previous, true)
					}
				}),
			)
		})

		it("preserves order of elements", function testOrderProperty() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = dropRepeats(arr)
					// Every element in result should appear in original in same order
					let originalIndex = 0
					//++ [EXCEPTION] Using loop to track indices
					for (
						let resultIndex = 0;
						resultIndex < result.length;
						resultIndex++
					) {
						const element = result[resultIndex]
						// Find element in original starting from last found position
						let found = false
						//++ [EXCEPTION] Using loop to search
						for (let i = originalIndex; i < arr.length; i++) {
							if (arr[i] === element) {
								originalIndex = i + 1
								found = true
								break
							}
						}
						assertEquals(found, true)
					}
				}),
			)
		})

		it("handles arrays with alternating duplicates", function testAlternatingDuplicates() {
			fc.assert(
				fc.property(
					fc.integer(),
					fc.integer(),
					fc.integer({ min: 1, max: 20 }),
					function testProperty(a, b, count) {
						const alternating: Array<number> = []
						//++ [EXCEPTION] Using loop to build test array
						for (let i = 0; i < count; i++) {
							alternating.push(a)
							alternating.push(b)
						}
						const result = dropRepeats(alternating)
						// Should be [a, b, a, b, ...] if a !== b, or [a] if a === b
						if (a === b) {
							assertEquals(result, [a])
						} else {
							assertEquals(result.length, count * 2)
						}
					},
				),
			)
		})
	})
})
