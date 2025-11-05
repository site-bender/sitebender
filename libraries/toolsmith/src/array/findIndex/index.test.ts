import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import findIndex from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("findIndex", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("finds index of first matching element", function testBasicFind() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const result = findIndex(isEven)([1, 3, 5, 8, 10])
			assertEquals(result, 3)
		})

		it("returns -1 when no match", function testNoMatch() {
			function isNegative(n: number): boolean {
				return n < 0
			}
			const result = findIndex(isNegative)([1, 2, 3, 4, 5])
			assertEquals(result, -1)
		})

		it("handles empty array", function testEmptyArray() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = findIndex(alwaysTrue)([])
			assertEquals(result, -1)
		})

		it("finds first match when multiple exist", function testMultipleMatches() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const result = findIndex(isEven)([1, 3, 4, 6, 8])
			assertEquals(result, 2)
		})

		it("finds element at index 0", function testFirstElement() {
			function isOne(n: number): boolean {
				return n === 1
			}
			const result = findIndex(isOne)([1, 2, 3])
			assertEquals(result, 0)
		})

		it("finds element at last index", function testLastElement() {
			function isFive(n: number): boolean {
				return n === 5
			}
			const result = findIndex(isFive)([1, 2, 3, 4, 5])
			assertEquals(result, 4)
		})

		it("works with string predicate", function testStringPredicate() {
			function startsWithA(s: string): boolean {
				//++ [EXCEPTION] Using native .startsWith() for test logic
				return s.startsWith("a")
			}
			const result = findIndex(startsWithA)([
				"hello",
				"world",
				"apple",
				"banana",
			])
			assertEquals(result, 2)
		})

		it("works with object predicate", function testObjectPredicate() {
			function hasIdTwo(obj: { id: number }): boolean {
				return obj.id === 2
			}
			const result = findIndex(hasIdTwo)([{ id: 1 }, { id: 2 }, { id: 3 }])
			assertEquals(result, 1)
		})

		it("predicate receives index parameter", function testPredicateWithIndex() {
			function indexGreaterThanValue(
				value: number,
				index: number,
			): boolean {
				return index > value
			}
			//++ index 0: 0 > 10 = false
			//++ index 1: 1 > 9 = false
			//++ index 2: 2 > 2 = false
			//++ index 3: 3 > 1 = true <- first match
			const result = findIndex(indexGreaterThanValue)([10, 9, 2, 1, 0])
			assertEquals(result, 3)
		})

		it("predicate receives array parameter", function testPredicateWithArray() {
			function firstElementGreaterThan(
				value: number,
				_index: number,
				array: ReadonlyArray<number>,
			): boolean {
				//++ [EXCEPTION] Using array index access for test logic
				return value > array[0]
			}
			const result = findIndex(firstElementGreaterThan)([5, 3, 6, 8])
			assertEquals(result, 2)
		})

		it("handles predicate that always returns true", function testAlwaysTrue() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = findIndex(alwaysTrue)([1, 2, 3])
			assertEquals(result, 0)
		})

		it("handles predicate that always returns false", function testAlwaysFalse() {
			function alwaysFalse(): boolean {
				return false
			}
			const result = findIndex(alwaysFalse)([1, 2, 3])
			assertEquals(result, -1)
		})

		it("handles single element array match", function testSingleMatch() {
			function isTrue(v: boolean): boolean {
				return v
			}
			const result = findIndex(isTrue)([true])
			assertEquals(result, 0)
		})

		it("handles single element array no match", function testSingleNoMatch() {
			function isTrue(v: boolean): boolean {
				return v
			}
			const result = findIndex(isTrue)([false])
			assertEquals(result, -1)
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			function isTarget(n: number): boolean {
				return n === 500
			}
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const result = findIndex(isTarget)(input)
			assertEquals(result, 500)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const input = ok([1, 3, 5, 8, 10])
			const result = findIndex(isEven)(input)
			assertEquals(result, ok(3))
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
			const result = findIndex(isEven)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			function alwaysTrue(): boolean {
				return true
			}
			const input = ok([])
			const result = findIndex(alwaysTrue)(input)
			assertEquals(result, ok(-1))
		})

		it("handles Result with no match", function testResultNoMatch() {
			function isNegative(n: number): boolean {
				return n < 0
			}
			const input = ok([1, 2, 3, 4, 5])
			const result = findIndex(isNegative)(input)
			assertEquals(result, ok(-1))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			const input = success([1, 3, 5, 8, 10])
			const result = findIndex(isEven)(input)
			assertEquals(result, success(3))
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
			const result = findIndex(isEven)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			function alwaysTrue(): boolean {
				return true
			}
			const input = success([])
			const result = findIndex(alwaysTrue)(input)
			assertEquals(result, success(-1))
		})

		it("handles Validation with no match", function testValidationNoMatch() {
			function isNegative(n: number): boolean {
				return n < 0
			}
			const input = success([1, 2, 3, 4, 5])
			const result = findIndex(isNegative)(input)
			assertEquals(result, success(-1))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("result is -1 or valid index", function testValidIndexProperty() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findIndex(isEven)(arr)
					//++ [EXCEPTION] Using native .length for test assertion
					assertEquals(
						result === -1 || (result >= 0 && result < arr.length),
						true,
					)
				}),
			)
		})

		it("returned index points to matching element", function testMatchingElementProperty() {
			function isPositive(n: number): boolean {
				return n > 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findIndex(isPositive)(arr)
					if (result !== -1) {
						//++ [EXCEPTION] Using array index access for test assertion
						assertEquals(isPositive(arr[result]), true)
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

		it("first matching index is returned", function testFirstMatchProperty() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = findIndex(isEven)(arr)
					if (result !== -1) {
						//++ All elements before result should not match
						//++ [EXCEPTION] Using loop for test assertion
						for (let i = 0; i < result; i++) {
							assertEquals(isEven(arr[i]), false)
						}
					}
				}),
			)
		})

		it("consistent with native findIndex", function testNativeConsistency() {
			function isNegative(n: number): boolean {
				return n < 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const ourResult = findIndex(isNegative)(arr)
					//++ [EXCEPTION] Using native .findIndex() for comparison
					const nativeResult = arr.findIndex(isNegative)
					assertEquals(ourResult, nativeResult)
				}),
			)
		})
	})
})
