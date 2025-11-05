import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import findLast from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("findLast", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("finds last matching element", function testBasicFind() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const result = findLast(isEven)([1, 3, 4, 6, 7, 8])
			assertEquals(result, 8)
		})

		it("returns null when no match", function testNoMatch() {
			function isNegative(n: number): boolean {
				return n < 0
			}
			const result = findLast(isNegative)([1, 2, 3, 4, 5])
			assertEquals(result, null)
		})

		it("handles empty array", function testEmptyArray() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = findLast(alwaysTrue)([])
			assertEquals(result, null)
		})

		it("finds last match when multiple exist", function testMultipleMatches() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const result = findLast(isEven)([2, 4, 6, 8, 1])
			assertEquals(result, 8)
		})

		it("finds element at index 0", function testFirstElement() {
			function isOne(n: number): boolean {
				return n === 1
			}
			const result = findLast(isOne)([1, 2, 3])
			assertEquals(result, 1)
		})

		it("finds element at last index", function testLastElement() {
			function isFive(n: number): boolean {
				return n === 5
			}
			const result = findLast(isFive)([1, 2, 3, 4, 5])
			assertEquals(result, 5)
		})

		it("works with string predicate", function testStringPredicate() {
			function startsWithA(s: string): boolean {
				//++ [EXCEPTION] Using native .startsWith() for test logic
				return s.startsWith("a")
			}
			const result = findLast(startsWithA)([
				"hello",
				"apple",
				"world",
				"avocado",
			])
			assertEquals(result, "avocado")
		})

		it("works with object predicate", function testObjectPredicate() {
			function hasIdTwo(obj: { id: number }): boolean {
				return obj.id === 2
			}
			const result = findLast(hasIdTwo)([{ id: 1 }, { id: 2 }, { id: 3 }])
			assertEquals(result, { id: 2 })
		})

		it("predicate receives index parameter", function testPredicateWithIndex() {
			function indexLessThan3(
				_value: number,
				index: number,
			): boolean {
				return index < 3
			}
			const result = findLast(indexLessThan3)([10, 20, 30, 40, 50])
			assertEquals(result, 30)
		})

		it("predicate receives array parameter", function testPredicateWithArray() {
			function lastElementGreaterThan(
				value: number,
				_index: number,
				array: ReadonlyArray<number>,
			): boolean {
				//++ [EXCEPTION] Using array index access and .length for test logic
				return value > array[array.length - 1]
			}
			//++ Last element is 3, so we want last value > 3
			//++ Index 3: 3 > 3 = false
			//++ Index 2: 6 > 3 = true <- last match
			const result = findLast(lastElementGreaterThan)([5, 8, 6, 3])
			assertEquals(result, 6)
		})

		it("handles predicate that always returns true", function testAlwaysTrue() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = findLast(alwaysTrue)([1, 2, 3])
			assertEquals(result, 3)
		})

		it("handles predicate that always returns false", function testAlwaysFalse() {
			function alwaysFalse(): boolean {
				return false
			}
			const result = findLast(alwaysFalse)([1, 2, 3])
			assertEquals(result, null)
		})

		it("handles single element array match", function testSingleMatch() {
			function isTrue(v: boolean): boolean {
				return v
			}
			const result = findLast(isTrue)([true])
			assertEquals(result, true)
		})

		it("handles single element array no match", function testSingleNoMatch() {
			function isTrue(v: boolean): boolean {
				return v
			}
			const result = findLast(isTrue)([false])
			assertEquals(result, null)
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			function isTarget(n: number): boolean {
				return n === 500
			}
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const result = findLast(isTarget)(input)
			assertEquals(result, 500)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const input = ok([1, 3, 4, 6, 7, 8])
			const result = findLast(isEven)(input)
			assertEquals(result, ok(8))
		})

		it("passes through error unchanged", function testResultError() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = findLast(isEven)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			function alwaysTrue(): boolean {
				return true
			}
			const input = ok([])
			const result = findLast(alwaysTrue)(input)
			assertEquals(result, ok(null))
		})

		it("handles Result with no match", function testResultNoMatch() {
			function isNegative(n: number): boolean {
				return n < 0
			}
			const input = ok([1, 2, 3, 4, 5])
			const result = findLast(isNegative)(input)
			assertEquals(result, ok(null))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const input = success([1, 3, 4, 6, 7, 8])
			const result = findLast(isEven)(input)
			assertEquals(result, success(8))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = findLast(isEven)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			function alwaysTrue(): boolean {
				return true
			}
			const input = success([])
			const result = findLast(alwaysTrue)(input)
			assertEquals(result, success(null))
		})

		it("handles Validation with no match", function testValidationNoMatch() {
			function isNegative(n: number): boolean {
				return n < 0
			}
			const input = success([1, 2, 3, 4, 5])
			const result = findLast(isNegative)(input)
			assertEquals(result, success(null))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("result is null or valid element from array", function testValidElementProperty() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findLast(isEven)(arr)
					//++ [EXCEPTION] Using native .includes() for test assertion
					assertEquals(result === null || arr.includes(result), true)
				}),
			)
		})

		it("returned element matches predicate", function testMatchingElementProperty() {
			function isPositive(n: number): boolean {
				return n > 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findLast(isPositive)(arr)
					if (result !== null) {
						assertEquals(isPositive(result), true)
					} else {
						//++ [EXCEPTION] Using native .every() for test assertion
						assertEquals(
							arr.every(function checkNonPositive(n) {
								return n <= 0
							}),
							true,
						)
					}
				}),
			)
		})

		it("last matching element is returned", function testLastMatchProperty() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findLast(isEven)(arr)
					if (result !== null) {
						//++ Find the last index of the result
						let lastIndex = -1
						//++ [EXCEPTION] Using loop for test assertion
						for (let i = 0; i < arr.length; i++) {
							if (arr[i] === result) {
								lastIndex = i
							}
						}
						//++ All elements after lastIndex should not match
						//++ [EXCEPTION] Using loop for test assertion
						for (let i = lastIndex + 1; i < arr.length; i++) {
							assertEquals(isEven(arr[i]), false)
						}
					}
				}),
			)
		})

		it("consistent with native findLast", function testNativeConsistency() {
			function isNegative(n: number): boolean {
				return n < 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const ourResult = findLast(isNegative)(arr)
					//++ [EXCEPTION] Using native .findLast() for comparison
					const nativeResult = arr.findLast(isNegative)
					const expectedResult = nativeResult === undefined
						? null
						: nativeResult
					assertEquals(ourResult, expectedResult)
				}),
			)
		})
	})
})
