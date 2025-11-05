import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import takeLastWhile from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("takeLastWhile", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("takes last elements while predicate is true", function testBasicTakeLastWhile() {
			function isPositive(n: number): boolean {
				return n > 0
			}
			const result = takeLastWhile(isPositive)([1, 2, -3, 4, 5])
			assertEquals(result, [4, 5])
		})

		it("returns empty array when predicate is false for last element", function testLastElementFalse() {
			function isPositive(n: number): boolean {
				return n > 0
			}
			const result = takeLastWhile(isPositive)([1, 2, 3, -4])
			assertEquals(result, [])
		})

		it("returns empty array when taking from empty array", function testEmptyArray() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = takeLastWhile(alwaysTrue)([])
			assertEquals(result, [])
		})

		it("returns all elements when predicate is always true", function testAlwaysTrue() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = takeLastWhile(alwaysTrue)([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("returns empty array when predicate is always false", function testAlwaysFalse() {
			function alwaysFalse(): boolean {
				return false
			}
			const result = takeLastWhile(alwaysFalse)([1, 2, 3])
			assertEquals(result, [])
		})

		it("handles single element array with true predicate", function testSingleElementTrue() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = takeLastWhile(alwaysTrue)([1])
			assertEquals(result, [1])
		})

		it("handles single element array with false predicate", function testSingleElementFalse() {
			function alwaysFalse(): boolean {
				return false
			}
			const result = takeLastWhile(alwaysFalse)([1])
			assertEquals(result, [])
		})

		it("works with string predicate", function testStringPredicate() {
			function startsWithB(s: string): boolean {
				//++ [EXCEPTION] Using native .startsWith() for test logic
				return s.startsWith("b")
			}
			const result = takeLastWhile(startsWithB)(["apple", "banana", "berry"])
			assertEquals(result, ["banana", "berry"])
		})

		it("works with object predicate", function testObjectPredicate() {
			function hasHighId(obj: { id: number }): boolean {
				return obj.id > 5
			}
			const result = takeLastWhile(hasHighId)([
				{ id: 1 },
				{ id: 6 },
				{ id: 7 },
			])
			assertEquals(result, [{ id: 6 }, { id: 7 }])
		})

		it("predicate receives index parameter", function testPredicateWithIndex() {
			function indexGreaterThanTwo(
				_value: number,
				index: number,
			): boolean {
				return index > 2
			}
			const result = takeLastWhile(indexGreaterThanTwo)([10, 20, 30, 40, 50])
			assertEquals(result, [40, 50])
		})

		it("predicate receives array parameter", function testPredicateWithArray() {
			function greaterThanFirst(
				value: number,
				_index: number,
				array: ReadonlyArray<number>,
			): boolean {
				//++ [EXCEPTION] Using array index access for test logic
				return value > array[0]
			}
			//++ First element is 5, so we want elements from end > 5
			//++ [3, 6, 8] are > 5, but 3 breaks the consecutive-from-end requirement
			const result = takeLastWhile(greaterThanFirst)([5, 3, 6, 8])
			assertEquals(result, [6, 8])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			function greaterThan500(n: number): boolean {
				return n > 500
			}
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				return i
			})
			const result = takeLastWhile(greaterThan500)(input)
			assertEquals(result.length, 499)
			//++ [EXCEPTION] Using array index access for test assertion
			assertEquals(result[0], 501)
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			function isPositive(n: number): boolean {
				return n > 0
			}
			const input = ok([1, 2, -3, 4, 5])
			const result = takeLastWhile(isPositive)(input)
			assertEquals(result, ok([4, 5]))
		})

		it("passes through error unchanged", function testResultError() {
			function isPositive(n: number): boolean {
				return n > 0
			}
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = takeLastWhile(isPositive)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			function alwaysTrue(): boolean {
				return true
			}
			const input = ok([])
			const result = takeLastWhile(alwaysTrue)(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with always false predicate", function testResultAlwaysFalse() {
			function alwaysFalse(): boolean {
				return false
			}
			const input = ok([1, 2, 3])
			const result = takeLastWhile(alwaysFalse)(input)
			assertEquals(result, ok([]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			function isPositive(n: number): boolean {
				return n > 0
			}
			const input = success([1, 2, -3, 4, 5])
			const result = takeLastWhile(isPositive)(input)
			assertEquals(result, success([4, 5]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			function isPositive(n: number): boolean {
				return n > 0
			}
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = takeLastWhile(isPositive)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			function alwaysTrue(): boolean {
				return true
			}
			const input = success([])
			const result = takeLastWhile(alwaysTrue)(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with always false predicate", function testValidationAlwaysFalse() {
			function alwaysFalse(): boolean {
				return false
			}
			const input = success([1, 2, 3])
			const result = takeLastWhile(alwaysFalse)(input)
			assertEquals(result, success([]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("result length is at most array length", function testLengthProperty() {
			function alwaysTrue(): boolean {
				return true
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = takeLastWhile(alwaysTrue)(arr)
					//++ [EXCEPTION] Using native .length for test assertion
					assertEquals(result.length <= arr.length, true)
				}),
			)
		})

		it("always false predicate returns empty array", function testAlwaysFalseProperty() {
			function alwaysFalse(): boolean {
				return false
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = takeLastWhile(alwaysFalse)(arr)
					assertEquals(result, [])
				}),
			)
		})

		it("always true predicate returns entire array", function testAlwaysTrueProperty() {
			function alwaysTrue(): boolean {
				return true
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = takeLastWhile(alwaysTrue)(arr)
					assertEquals(result, arr)
				}),
			)
		})

		it("all elements in result satisfy predicate", function testPredicateSatisfied() {
			function isPositive(n: number): boolean {
				return n > 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = takeLastWhile(isPositive)(arr)
					//++ [EXCEPTION] Using native .every() for test assertion
					assertEquals(
						result.every(function checkPositive(n) {
							return isPositive(n)
						}),
						true,
					)
				}),
			)
		})

		it("result is suffix of original array", function testSuffixProperty() {
			function isEven(n: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return n % 2 === 0
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const result = takeLastWhile(isEven)(arr)
					//++ Result should be a suffix of arr
					//++ [EXCEPTION] Using native .slice() for test assertion
					const expectedSuffix = arr.slice(arr.length - result.length)
					assertEquals(result, expectedSuffix)
				}),
			)
		})
	})
})
