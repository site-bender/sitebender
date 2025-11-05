import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import groupWith from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("groupWith", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("groups consecutive equal elements", function testBasicGroupWith() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = groupWith(equals)([1, 1, 2, 3, 3, 3, 4])
			assertEquals(result, [[1, 1], [2], [3, 3, 3], [4]])
		})

		it("handles empty array", function testEmptyArray() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = groupWith(equals)([])
			assertEquals(result, [])
		})

		it("handles single element array", function testSingleElement() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = groupWith(equals)([1])
			assertEquals(result, [[1]])
		})

		it("handles array with no consecutive equal elements", function testNoConsecutiveEquals() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = groupWith(equals)([1, 2, 3, 4, 5])
			assertEquals(result, [[1], [2], [3], [4], [5]])
		})

		it("handles array with all equal elements", function testAllEqual() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const result = groupWith(equals)([1, 1, 1, 1, 1])
			assertEquals(result, [[1, 1, 1, 1, 1]])
		})

		it("groups by ascending order", function testAscendingOrder() {
			function isAscending(a: number, b: number): boolean {
				return a < b
			}
			const result = groupWith(isAscending)([1, 2, 3, 1, 2, 3, 4])
			assertEquals(result, [[1, 2, 3], [1, 2, 3, 4]])
		})

		it("groups by case-insensitive equality", function testCaseInsensitive() {
			function caseInsensitiveEquals(a: string, b: string): boolean {
				return a.toLowerCase() === b.toLowerCase()
			}
			const result = groupWith(caseInsensitiveEquals)([
				"a",
				"A",
				"b",
				"B",
				"b",
				"c",
			])
			assertEquals(result, [["a", "A"], ["b", "B", "b"], ["c"]])
		})

		it("handles predicate that always returns true", function testAlwaysTrue() {
			function alwaysTrue(): boolean {
				return true
			}
			const result = groupWith(alwaysTrue)([1, 2, 3, 4, 5])
			assertEquals(result, [[1, 2, 3, 4, 5]])
		})

		it("handles predicate that always returns false", function testAlwaysFalse() {
			function alwaysFalse(): boolean {
				return false
			}
			const result = groupWith(alwaysFalse)([1, 1, 1, 1])
			assertEquals(result, [[1], [1], [1], [1]])
		})

		it("groups by difference less than threshold", function testDifferenceThreshold() {
			function closeEnough(a: number, b: number): boolean {
				//++ [EXCEPTION] Using Math.abs for floating-point comparison
				return Math.abs(a - b) <= 1
			}
			const result = groupWith(closeEnough)([1, 2, 3, 5, 6, 10])
			assertEquals(result, [[1, 2, 3], [5, 6], [10]])
		})

		it("handles object references", function testObjectReferences() {
			const obj1 = { id: 1 }
			const obj2 = { id: 1 }
			const obj3 = { id: 2 }
			function sameReference(a: { id: number }, b: { id: number }): boolean {
				return a === b
			}
			const result = groupWith(sameReference)([obj1, obj1, obj2, obj3])
			assertEquals(result, [[obj1, obj1], [obj2], [obj3]])
		})

		it("handles object comparison by property", function testObjectComparison() {
			function equalById(
				a: { id: number },
				b: { id: number },
			): boolean {
				return a.id === b.id
			}
			const result = groupWith(equalById)([
				{ id: 1 },
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 3 },
			])
			assertEquals(result.length, 3)
			assertEquals(result[0].length, 2)
			assertEquals(result[1].length, 1)
			assertEquals(result[2].length, 2)
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				//++ [EXCEPTION] Using Math.floor and division operator for test setup
				return Math.floor(i / 10)
			})
			const result = groupWith(equals)(input)
			assertEquals(result.length, 100)
			//++ [EXCEPTION] Using forEach to verify group sizes
			result.forEach(function checkGroup(group) {
				assertEquals(group.length, 10)
			})
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = ok([1, 1, 2, 3, 3, 3, 4])
			const result = groupWith(equals)(input)
			assertEquals(result, ok([[1, 1], [2], [3, 3, 3], [4]]))
		})

		it("passes through error unchanged", function testResultError() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = groupWith(equals)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = ok([])
			const result = groupWith(equals)(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with custom predicate", function testResultCustomPredicate() {
			function isAscending(a: number, b: number): boolean {
				return a < b
			}
			const input = ok([1, 2, 3, 1, 2, 3, 4])
			const result = groupWith(isAscending)(input)
			assertEquals(result, ok([[1, 2, 3], [1, 2, 3, 4]]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = success([1, 1, 2, 3, 3, 3, 4])
			const result = groupWith(equals)(input)
			assertEquals(result, success([[1, 1], [2], [3, 3, 3], [4]]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = groupWith(equals)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			const input = success([])
			const result = groupWith(equals)(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with custom predicate", function testValidationCustomPredicate() {
			function isAscending(a: number, b: number): boolean {
				return a < b
			}
			const input = success([1, 2, 3, 1, 2, 3, 4])
			const result = groupWith(isAscending)(input)
			assertEquals(result, success([[1, 2, 3], [1, 2, 3, 4]]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("concatenating all groups returns original array", function testConcatenationProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const groups = groupWith(equals)(arr)
					const flattened: Array<number> = []
					//++ [EXCEPTION] Using forEach and push to flatten
					groups.forEach(function flattenGroup(group) {
						group.forEach(function addElement(element) {
							flattened.push(element)
						})
					})
					assertEquals(flattened, arr)
				}),
			)
		})

		it("all elements in each group satisfy predicate with previous", function testGroupPredicateProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const groups = groupWith(equals)(arr)
					//++ [EXCEPTION] Using loop to check groups
					for (let i = 0; i < groups.length; i++) {
						const group = groups[i]
						//++ [EXCEPTION] Using loop to check group elements
						for (let j = 1; j < group.length; j++) {
							const current = group[j]
							const previous = group[j - 1]
							assertEquals(equals(previous, current), true)
						}
					}
				}),
			)
		})

		it("adjacent groups do not satisfy predicate", function testAdjacentGroupsProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const groups = groupWith(equals)(arr)
					//++ [EXCEPTION] Using loop to check adjacent groups
					for (let i = 1; i < groups.length; i++) {
						const prevGroup = groups[i - 1]
						const currGroup = groups[i]
						const lastOfPrev = prevGroup[prevGroup.length - 1]
						const firstOfCurr = currGroup[0]
						assertEquals(equals(lastOfPrev, firstOfCurr), false)
					}
				}),
			)
		})

		it("preserves order of elements", function testOrderProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const groups = groupWith(equals)(arr)
					let originalIndex = 0
					//++ [EXCEPTION] Using nested loops to verify order
					for (let i = 0; i < groups.length; i++) {
						const group = groups[i]
						for (let j = 0; j < group.length; j++) {
							assertEquals(group[j], arr[originalIndex])
							originalIndex++
						}
					}
				}),
			)
		})

		it("number of groups matches number of predicate changes plus one", function testGroupCountProperty() {
			function equals(a: number, b: number): boolean {
				return a === b
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					if (arr.length === 0) {
						const groups = groupWith(equals)(arr)
						assertEquals(groups.length, 0)
						return
					}

					let changes = 0
					//++ [EXCEPTION] Using loop to count predicate changes
					for (let i = 1; i < arr.length; i++) {
						if (!equals(arr[i - 1], arr[i])) {
							changes++
						}
					}

					const groups = groupWith(equals)(arr)
					assertEquals(groups.length, changes + 1)
				}),
			)
		})
	})
})
