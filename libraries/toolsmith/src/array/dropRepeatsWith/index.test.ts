import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import dropRepeatsWith from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("dropRepeatsWith", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("removes consecutive duplicates using custom comparator", function testBasicDropRepeatsWith() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = dropRepeatsWith(equals)([1, 1, 2, 3, 3, 3, 4])
			assertEquals(result, [1, 2, 3, 4])
		})

		it("handles case-insensitive string comparison", function testCaseInsensitive() {
			function caseInsensitiveEquals(a: string, b: string): boolean {
				return a.toLowerCase() === b.toLowerCase()
			}
			const result = dropRepeatsWith(caseInsensitiveEquals)([
				"a",
				"A",
				"b",
				"B",
				"b",
			])
			assertEquals(result, ["a", "b"])
		})

		it("handles object comparison by property", function testObjectComparison() {
			function equalById(
				a: { id: number },
				b: { id: number },
			): boolean {
				return a.id === b.id
			}
			const result = dropRepeatsWith(equalById)([
				{ id: 1 },
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 3 },
			])
			assertEquals(result.length, 3)
			assertEquals(result[0].id, 1)
			assertEquals(result[1].id, 2)
			assertEquals(result[2].id, 3)
		})

		it("handles empty array", function testEmptyArray() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = dropRepeatsWith(equals)([])
			assertEquals(result, [])
		})

		it("handles single element array", function testSingleElement() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = dropRepeatsWith(equals)([1])
			assertEquals(result, [1])
		})

		it("handles array with no duplicates", function testNoDuplicates() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = dropRepeatsWith(equals)([1, 2, 3, 4, 5])
			assertEquals(result, [1, 2, 3, 4, 5])
		})

		it("handles comparator that always returns true", function testAlwaysTrue() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = dropRepeatsWith(alwaysTrue)([1, 2, 3, 4, 5])
			assertEquals(result, [1])
		})

		it("handles comparator that always returns false", function testAlwaysFalse() {
			function alwaysFalse(): boolean {
				return false
			}
			const result = dropRepeatsWith(alwaysFalse)([1, 1, 1, 1])
			assertEquals(result, [1, 1, 1, 1])
		})

		it("handles approximate equality for floats", function testApproximateEquality() {
			function approximatelyEqual(a: number, b: number): boolean {
				//++ [EXCEPTION] Using Math.abs for floating-point comparison
				return Math.abs(a - b) < 0.01
			}
			const result = dropRepeatsWith(approximatelyEqual)([
				1.0,
				1.005,
				1.02,
				2.0,
				2.005,
			])
			assertEquals(result, [1.0, 1.02, 2.0])
		})

		it("handles modulo comparison", function testModuloComparison() {
			function sameModulo3(a: number, b: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return a % 3 === b % 3
			}
			const result = dropRepeatsWith(sameModulo3)([1, 4, 7, 2, 5, 8, 3, 6])
			assertEquals(result, [1, 2, 3])
		})

		it("preserves non-consecutive duplicates", function testNonConsecutiveDuplicates() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = dropRepeatsWith(equals)([1, 2, 1, 2, 1])
			assertEquals(result, [1, 2, 1, 2, 1])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				//++ [EXCEPTION] Using Math.floor and division operator for test setup
				return Math.floor(i / 10)
			})
			const result = dropRepeatsWith(equals)(input)
			assertEquals(result.length, 100)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = ok([1, 1, 2, 3, 3, 3, 4])
			const result = dropRepeatsWith(equals)(input)
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
			const result = dropRepeatsWith(equals)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = ok([])
			const result = dropRepeatsWith(equals)(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with custom comparator", function testResultCustomComparator() {
			function caseInsensitiveEquals(a: string, b: string): boolean {
				return a.toLowerCase() === b.toLowerCase()
			}
			const input = ok(["a", "A", "b", "B", "b"])
			const result = dropRepeatsWith(caseInsensitiveEquals)(input)
			assertEquals(result, ok(["a", "b"]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = success([1, 1, 2, 3, 3, 3, 4])
			const result = dropRepeatsWith(equals)(input)
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
			const result = dropRepeatsWith(equals)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = success([])
			const result = dropRepeatsWith(equals)(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with custom comparator", function testValidationCustomComparator() {
			function caseInsensitiveEquals(a: string, b: string): boolean {
				return a.toLowerCase() === b.toLowerCase()
			}
			const input = success(["a", "A", "b", "B", "b"])
			const result = dropRepeatsWith(caseInsensitiveEquals)(input)
			assertEquals(result, success(["a", "b"]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("result length is at most input length", function testResultLengthProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = dropRepeatsWith(equals)(arr)
					assertEquals(result.length <= arr.length, true)
				}),
			)
		})

		it("idempotent with same comparator", function testIdempotentProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const once = dropRepeatsWith(equals)(arr)
					const twice = dropRepeatsWith(equals)(once)
					assertEquals(twice, once)
				}),
			)
		})

		it("preserves order of elements", function testOrderProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = dropRepeatsWith(equals)(arr)
					let originalIndex = 0
					//++ [EXCEPTION] Using loop to verify order preservation
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

		it("handles alternating values correctly", function testAlternatingValues() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
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
						const result = dropRepeatsWith(equals)(alternating)
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
