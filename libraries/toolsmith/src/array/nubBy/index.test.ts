import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import nubBy from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("nubBy", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("removes duplicates using custom equality", function testBasicNubBy() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = nubBy(equals)([1, 2, 1, 3, 2, 4])
			assertEquals(result, [1, 2, 3, 4])
		})

		it("handles empty array", function testEmptyArray() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = nubBy(equals)([])
			assertEquals(result, [])
		})

		it("handles single element array", function testSingleElement() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = nubBy(equals)([1])
			assertEquals(result, [1])
		})

		it("handles array with no duplicates", function testNoDuplicates() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = nubBy(equals)([1, 2, 3, 4, 5])
			assertEquals(result, [1, 2, 3, 4, 5])
		})

		it("handles array with all duplicates", function testAllDuplicates() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = nubBy(equals)([1, 1, 1, 1, 1])
			assertEquals(result, [1])
		})

		it("removes duplicates by case-insensitive comparison", function testCaseInsensitive() {
			function caseInsensitiveEquals(a: string, b: string): boolean {
				return a.toLowerCase() === b.toLowerCase()
			}
			const result = nubBy(caseInsensitiveEquals)(["a", "A", "b", "B", "c"])
			assertEquals(result, ["a", "b", "c"])
		})

		it("removes duplicates by object property", function testObjectProperty() {
			function equalById(
				a: { id: number },
				b: { id: number },
			): boolean {
				return a.id === b.id
			}
			const obj1 = { id: 1, name: "first" }
			const obj2 = { id: 2, name: "second" }
			const obj3 = { id: 1, name: "duplicate" }
			const result = nubBy(equalById)([obj1, obj2, obj3])
			assertEquals(result.length, 2)
			assertEquals(result[0], obj1)
			assertEquals(result[1], obj2)
		})

		it("removes duplicates by approximate equality", function testApproximateEquality() {
			function approximatelyEqual(a: number, b: number): boolean {
				//++ [EXCEPTION] Using Math.abs for floating-point comparison
				return Math.abs(a - b) < 0.01
			}
			const result = nubBy(approximatelyEqual)([1.0, 1.005, 2.0, 2.005, 3.0])
			assertEquals(result.length, 3)
		})

		it("removes duplicates by modulo", function testModulo() {
			function sameModulo3(a: number, b: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return a % 3 === b % 3
			}
			const result = nubBy(sameModulo3)([1, 4, 2, 5, 3, 6, 7])
			assertEquals(result, [1, 2, 3])
		})

		it("preserves first occurrence", function testFirstOccurrence() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = nubBy(equals)([1, 2, 3, 2, 1])
			assertEquals(result, [1, 2, 3])
		})

		it("handles predicate that always returns true", function testAlwaysTrue() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = nubBy(alwaysTrue)([1, 2, 3, 4, 5])
			assertEquals(result, [1])
		})

		it("handles predicate that always returns false", function testAlwaysFalse() {
			function alwaysFalse(): boolean {
				return false
			}
			const result = nubBy(alwaysFalse)([1, 1, 1, 1])
			assertEquals(result, [1, 1, 1, 1])
		})

		it("handles object references", function testObjectReferences() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = obj1 // Same reference
			function sameReference(a: { id: number }, b: { id: number }): boolean {
				return a === b
			}
			const result = nubBy(sameReference)([obj1, obj2, obj3])
			assertEquals(result, [obj1, obj2])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				//++ [EXCEPTION] Using modulo operator for test setup
				return i % 100
			})
			const result = nubBy(equals)(input)
			assertEquals(result.length, 100)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = ok([1, 2, 1, 3, 2, 4])
			const result = nubBy(equals)(input)
			assertEquals(result, ok([1, 2, 3, 4]))
		})

		it("passes through error unchanged", function testResultError() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = nubBy(equals)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = ok([])
			const result = nubBy(equals)(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with custom equality", function testResultCustomEquality() {
			function caseInsensitiveEquals(a: string, b: string): boolean {
				return a.toLowerCase() === b.toLowerCase()
			}
			const input = ok(["a", "A", "b", "B", "c"])
			const result = nubBy(caseInsensitiveEquals)(input)
			assertEquals(result, ok(["a", "b", "c"]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = success([1, 2, 1, 3, 2, 4])
			const result = nubBy(equals)(input)
			assertEquals(result, success([1, 2, 3, 4]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = nubBy(equals)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = success([])
			const result = nubBy(equals)(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with custom equality", function testValidationCustomEquality() {
			function caseInsensitiveEquals(a: string, b: string): boolean {
				return a.toLowerCase() === b.toLowerCase()
			}
			const input = success(["a", "A", "b", "B", "c"])
			const result = nubBy(caseInsensitiveEquals)(input)
			assertEquals(result, success(["a", "b", "c"]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("result length is at most input length", function testResultLengthProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = nubBy(equals)(arr)
					assertEquals(result.length <= arr.length, true)
				}),
			)
		})

		it("idempotent: nubBy(nubBy(x)) = nubBy(x)", function testIdempotentProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const once = nubBy(equals)(arr)
					const twice = nubBy(equals)(once)
					assertEquals(twice, once)
				}),
			)
		})

		it("no two elements in result are equal by equality function", function testNoDuplicatesProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = nubBy(equals)(arr)
					//++ [EXCEPTION] Using nested loops to check all pairs
					for (let i = 0; i < result.length; i++) {
						for (let j = i + 1; j < result.length; j++) {
							assertEquals(equals(result[i], result[j]), false)
						}
					}
				}),
			)
		})

		it("preserves order of first occurrences", function testOrderProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = nubBy(equals)(arr)
					//++ Every element in result should appear in original in same order
					let originalIndex = 0
					//++ [EXCEPTION] Using loop to track indices
					for (
						let resultIndex = 0;
						resultIndex < result.length;
						resultIndex++
					) {
						const element = result[resultIndex]
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

		it("all original elements are represented in result", function testCompletenessProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = nubBy(equals)(arr)
					//++ [EXCEPTION] Using forEach to check each element
					arr.forEach(function checkElement(element) {
						let found = false
						//++ [EXCEPTION] Using forEach to search
						result.forEach(function searchResult(resultElement) {
							if (equals(element, resultElement)) {
								found = true
							}
						})
						assertEquals(found, true)
					})
				}),
			)
		})

		it("symmetric equality function produces same result", function testSymmetryProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result1 = nubBy(equals)(arr)
					//++ Using reversed equality (should be same for symmetric function)
					function reversedEquals(a: number, b: number): boolean {
						return equals(b, a)
					}
					const result2 = nubBy(reversedEquals)(arr)
					assertEquals(result1, result2)
				}),
			)
		})
	})
})
