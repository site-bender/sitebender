import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import fc from "fast-check"

import partitionBy from "./index.ts"
import error from "../../monads/result/error/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

describe("partitionBy", function describeTests() {
	describe("Plain array path", function describePlainPath() {
		it("groups consecutive elements by identity", function testBasicPartitionBy() {
			function identity(value: number): number {
				return value
			}
			const result = partitionBy(identity)([1, 1, 2, 3, 3, 3, 4])
			assertEquals(result, [[1, 1], [2], [3, 3, 3], [4]])
		})

		it("handles empty array", function testEmptyArray() {
			function identity(value: number): number {
				return value
			}
			const result = partitionBy(identity)([])
			assertEquals(result, [])
		})

		it("handles single element array", function testSingleElement() {
			function identity(value: number): number {
				return value
			}
			const result = partitionBy(identity)([1])
			assertEquals(result, [[1]])
		})

		it("handles array with all same key", function testAllSameKey() {
			function constant(): string {
				return "same"
			}
			const result = partitionBy(constant)([1, 2, 3, 4, 5])
			assertEquals(result, [[1, 2, 3, 4, 5]])
		})

		it("handles array with all different keys", function testAllDifferentKeys() {
			function identity(value: number): number {
				return value
			}
			const result = partitionBy(identity)([1, 2, 3, 4, 5])
			assertEquals(result, [[1], [2], [3], [4], [5]])
		})

		it("groups by string case", function testStringCase() {
			function toLowerCase(value: string): string {
				return value.toLowerCase()
			}
			const result = partitionBy(toLowerCase)(["a", "A", "b", "B", "b", "c"])
			assertEquals(result, [["a", "A"], ["b", "B", "b"], ["c"]])
		})

		it("groups by object property", function testObjectProperty() {
			function getType(obj: { type: string }): string {
				return obj.type
			}
			const result = partitionBy(getType)([
				{ type: "a" },
				{ type: "a" },
				{ type: "b" },
				{ type: "c" },
				{ type: "c" },
			])
			assertEquals(result.length, 3)
			assertEquals(result[0].length, 2)
			assertEquals(result[1].length, 1)
			assertEquals(result[2].length, 2)
		})

		it("groups by modulo", function testModulo() {
			function mod3(value: number): number {
				//++ [EXCEPTION] Using modulo operator for test logic
				return value % 3
			}
			const result = partitionBy(mod3)([0, 3, 6, 1, 4, 7, 2, 5])
			assertEquals(result, [[0, 3, 6], [1, 4, 7], [2, 5]])
		})

		it("groups by sign", function testSign() {
			function getSign(value: number): string {
				if (value > 0) return "positive"
				if (value < 0) return "negative"
				return "zero"
			}
			const result = partitionBy(getSign)([1, 2, -1, -2, 0, 3])
			assertEquals(result, [[1, 2], [-1, -2], [0], [3]])
		})

		it("groups by even/odd", function testEvenOdd() {
			function isEven(value: number): boolean {
				//++ [EXCEPTION] Using modulo operator for test logic
				return value % 2 === 0
			}
			const result = partitionBy(isEven)([2, 4, 1, 3, 5, 6, 8])
			assertEquals(result, [[2, 4], [1, 3, 5], [6, 8]])
		})

		it("handles predicate returning objects", function testObjectKeys() {
			function getFirstChar(value: string): { char: string } {
				return { char: value[0] }
			}
			const result = partitionBy(getFirstChar)(["apple", "apricot", "banana"])
			// Different object references, so each element is its own group
			assertEquals(result.length, 3)
		})

		it("handles NaN keys", function testNaNKeys() {
			function returnNaN(): number {
				return NaN
			}
			const result = partitionBy(returnNaN)([1, 2, 3])
			// NaN !== NaN, so each element is its own group
			assertEquals(result, [[1], [2], [3]])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			function identity(value: number): number {
				return value
			}
			const input = Array.from({ length: 1000 }, function makeElement(_, i) {
				//++ [EXCEPTION] Using Math.floor and division operator for test setup
				return Math.floor(i / 10)
			})
			const result = partitionBy(identity)(input)
			assertEquals(result.length, 100)
			//++ [EXCEPTION] Using forEach to verify group sizes
			result.forEach(function checkGroup(group) {
				assertEquals(group.length, 10)
			})
		})
	})

	describe("Result monad path", function describeResultPath() {
		it("transforms successful Result", function testResultSuccess() {
			function identity(value: number): number {
				return value
			}
			const input = ok([1, 1, 2, 3, 3, 3, 4])
			const result = partitionBy(identity)(input)
			assertEquals(result, ok([[1, 1], [2], [3, 3, 3], [4]]))
		})

		it("passes through error unchanged", function testResultError() {
			function identity(value: number): number {
				return value
			}
			const input = error({
				_tag: "ValidationError",
				message: "Test error",
			})
			const result = partitionBy(identity)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Result", function testResultEmptyArray() {
			function identity(value: number): number {
				return value
			}
			const input = ok([])
			const result = partitionBy(identity)(input)
			assertEquals(result, ok([]))
		})

		it("handles Result with custom predicate", function testResultCustomPredicate() {
			function toLowerCase(value: string): string {
				return value.toLowerCase()
			}
			const input = ok(["a", "A", "b", "B", "b"])
			const result = partitionBy(toLowerCase)(input)
			assertEquals(result, ok([["a", "A"], ["b", "B", "b"]]))
		})
	})

	describe("Validation monad path", function describeValidationPath() {
		it("transforms successful Validation", function testValidationSuccess() {
			function identity(value: number): number {
				return value
			}
			const input = success([1, 1, 2, 3, 3, 3, 4])
			const result = partitionBy(identity)(input)
			assertEquals(result, success([[1, 1], [2], [3, 3, 3], [4]]))
		})

		it("passes through failure unchanged", function testValidationFailure() {
			function identity(value: number): number {
				return value
			}
			const input = failure([{
				_tag: "ValidationError",
				message: "Test failure",
			}])
			const result = partitionBy(identity)(input)
			assertEquals(result, input)
		})

		it("handles empty array in successful Validation", function testValidationEmptyArray() {
			function identity(value: number): number {
				return value
			}
			const input = success([])
			const result = partitionBy(identity)(input)
			assertEquals(result, success([]))
		})

		it("handles Validation with custom predicate", function testValidationCustomPredicate() {
			function toLowerCase(value: string): string {
				return value.toLowerCase()
			}
			const input = success(["a", "A", "b", "B", "b"])
			const result = partitionBy(toLowerCase)(input)
			assertEquals(result, success([["a", "A"], ["b", "B", "b"]]))
		})
	})

	describe("Property-based tests", function describePropertyTests() {
		it("concatenating all groups returns original array", function testConcatenationProperty() {
			function identity(value: number): number {
				return value
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const groups = partitionBy(identity)(arr)
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

		it("all elements in each group have same predicate result", function testGroupKeyProperty() {
			function identity(value: number): number {
				return value
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const groups = partitionBy(identity)(arr)
					//++ [EXCEPTION] Using loop to check groups
					for (let i = 0; i < groups.length; i++) {
						const group = groups[i]
						if (group.length > 0) {
							const firstKey = identity(group[0])
							//++ [EXCEPTION] Using loop to check group elements
							for (let j = 1; j < group.length; j++) {
								const currentKey = identity(group[j])
								assertEquals(currentKey, firstKey)
							}
						}
					}
				}),
			)
		})

		it("adjacent groups have different predicate results", function testAdjacentGroupsProperty() {
			function identity(value: number): number {
				return value
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const groups = partitionBy(identity)(arr)
					//++ [EXCEPTION] Using loop to check adjacent groups
					for (let i = 1; i < groups.length; i++) {
						const prevGroup = groups[i - 1]
						const currGroup = groups[i]
						const prevKey = identity(prevGroup[0])
						const currKey = identity(currGroup[0])
						assertEquals(prevKey !== currKey, true)
					}
				}),
			)
		})

		it("preserves order of elements", function testOrderProperty() {
			function identity(value: number): number {
				return value
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					const groups = partitionBy(identity)(arr)
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

		it("number of groups matches number of key changes plus one", function testGroupCountProperty() {
			function identity(value: number): number {
				return value
			}
			fc.assert(
				fc.property(fc.array(fc.integer()), function testProperty(arr) {
					if (arr.length === 0) {
						const groups = partitionBy(identity)(arr)
						assertEquals(groups.length, 0)
						return
					}

					let changes = 0
					let prevKey = identity(arr[0])
					//++ [EXCEPTION] Using loop to count key changes
					for (let i = 1; i < arr.length; i++) {
						const currKey = identity(arr[i])
						if (currKey !== prevKey) {
							changes++
							prevKey = currKey
						}
					}

					const groups = partitionBy(identity)(arr)
					assertEquals(groups.length, changes + 1)
				}),
			)
		})
	})
})
