import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import zipWith from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("zipWith", function testZipWith() {
	describe("Plain array path", function testPlainArrayPath() {
		it("combines equal length arrays with function", function testEqualLength() {
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			const array1 = [1, 2, 3]
			const array2 = [10, 20, 30]
			const result = zipWith(add)(array1)(array2)
			assertEquals(result, [11, 22, 33])
		})

		it("stops at shorter array length", function testUnequalLength() {
			function concat(a: string) {
				return function concatWithA(b: string): string {
					return a + b
				}
			}
			const array1 = ["a", "b", "c"]
			const array2 = ["x", "y"]
			const result = zipWith(concat)(array1)(array2)
			assertEquals(result, ["ax", "by"])
		})

		it("returns empty array when first array is empty", function testFirstEmpty() {
			function multiply(a: number) {
				return function multiplyWithA(b: number): number {
					return a * b
				}
			}
			const result = zipWith(multiply)([])(
				[1, 2, 3] as ReadonlyArray<number>,
			)
			assertEquals(result, [])
		})

		it("returns empty array when second array is empty", function testSecondEmpty() {
			function multiply(a: number) {
				return function multiplyWithA(b: number): number {
					return a * b
				}
			}
			const result = zipWith(multiply)([1, 2, 3])(
				[] as ReadonlyArray<number>,
			)
			assertEquals(result, [])
		})

		it("returns empty array when both arrays are empty", function testBothEmpty() {
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			const result = zipWith(add)([])([] as ReadonlyArray<number>)
			assertEquals(result, [])
		})

		it("creates pairs when function returns tuples", function testTupleFn() {
			function makePair(a: number) {
				return function makePairWithA(b: string): [number, string] {
					return [a, b]
				}
			}
			const array1 = [1, 2, 3]
			const array2 = ["a", "b", "c"]
			const result = zipWith(makePair)(array1)(array2)
			assertEquals(result, [[1, "a"], [2, "b"], [3, "c"]])
		})

		it("works with object transformation", function testObjectTransform() {
			function combine(a: number) {
				return function combineWithA(
					b: string,
				): { value: number; label: string } {
					return { value: a, label: b }
				}
			}
			const array1 = [1, 2]
			const array2 = ["one", "two"]
			const result = zipWith(combine)(array1)(array2)
			assertEquals(result, [
				{ value: 1, label: "one" },
				{ value: 2, label: "two" },
			])
		})

		it("handles complex function logic", function testComplexFunction() {
			function compare(a: number) {
				return function compareWithA(b: number): string {
					if (a > b) {
						return "greater"
					}
					if (a < b) {
						return "less"
					}
					return "equal"
				}
			}
			const array1 = [1, 5, 3]
			const array2 = [2, 5, 1]
			const result = zipWith(compare)(array1)(array2)
			assertEquals(result, ["less", "equal", "greater"])
		})

		it("works with boolean logic", function testBooleanLogic() {
			function and(a: boolean) {
				return function andWithA(b: boolean): boolean {
					return a && b
				}
			}
			const array1 = [true, true, false, false]
			const array2 = [true, false, true, false]
			const result = zipWith(and)(array1)(array2)
			assertEquals(result, [true, false, false, false])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			function multiply(a: number) {
				return function multiplyWithA(b: number): number {
					return a * b
				}
			}
			const array1 = Array.from({ length: 1000 }, function createValue(
				_,
				i: number,
			) {
				return i
			})
			const array2 = Array.from({ length: 1000 }, function createValue(
				_,
				i: number,
			) {
				return i * 2
			})
			const result = zipWith(multiply)(array1)(array2)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 1000)
			assertEquals(result[0], 0)
			assertEquals(result[10], 10 * 20)
			assertEquals(result[999], 999 * 1998)
		})

		it("works with different types", function testDifferentTypes() {
			function format(a: number) {
				return function formatWithA(b: boolean): string {
					return `${a}:${b}`
				}
			}
			const array1 = [1, 2, 3]
			const array2 = [true, false, true]
			const result = zipWith(format)(array1)(array2)
			assertEquals(result, ["1:true", "2:false", "3:true"])
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			const array1 = [1, 2, 3]
			const array2 = ok([10, 20, 30])
			const result = zipWith(add)(array1)(array2)

			assertEquals(result, ok([11, 22, 33]))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			const array1 = [1, 2]
			const array2 = error(testError)
			const result = zipWith(add)(array1)(array2)

			assertEquals(result, error(testError))
		})

		it("handles empty arrays in successful Result", function testEmptyResult() {
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			const array1: Array<number> = []
			const array2 = ok([])
			const result = zipWith(add)(array1)(array2)

			assertEquals(result, ok([]))
		})

		it("handles Result with unequal lengths", function testResultUnequalLength() {
			function multiply(a: number) {
				return function multiplyWithA(b: number): number {
					return a * b
				}
			}
			const array1 = [2, 3, 4, 5]
			const array2 = ok([10, 20])
			const result = zipWith(multiply)(array1)(array2)

			assertEquals(result, ok([20, 60]))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			const array1 = [1, 2, 3]
			const array2 = success([10, 20, 30])
			const result = zipWith(add)(array1)(array2)

			assertEquals(result, success([11, 22, 33]))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			const array1 = [1, 2]
			const array2 = failure([testError])
			const result = zipWith(add)(array1)(array2)

			assertEquals(result, failure([testError]))
		})

		it("handles empty arrays in successful Validation", function testEmptyValidation() {
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			const array1: Array<number> = []
			const array2 = success([])
			const result = zipWith(add)(array1)(array2)

			assertEquals(result, success([]))
		})

		it("handles Validation with unequal lengths", function testValidationUnequalLength() {
			function multiply(a: number) {
				return function multiplyWithA(b: number): number {
					return a * b
				}
			}
			const array1 = [2, 3, 4, 5]
			const array2 = success([10, 20])
			const result = zipWith(multiply)(array1)(array2)

			assertEquals(result, success([20, 60]))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("result length equals min of input lengths", function testLengthProperty() {
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(
						arr1,
						arr2,
					) {
						const result = zipWith(add)(arr1)(arr2)
						//++ [EXCEPTION] Using native Math.min and array.length
						const expectedLength = Math.min(arr1.length, arr2.length)
						assertEquals(result.length, expectedLength)
					},
				),
			)
		})

		it("function is applied to all pairs", function testApplicationProperty() {
			function multiply(a: number) {
				return function multiplyWithA(b: number): number {
					return a * b
				}
			}
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					function testProperty(
						arr1,
						arr2,
					) {
						const result = zipWith(multiply)(arr1)(arr2)
						//++ [EXCEPTION] Using native Math.min and array.length
						const minLength = Math.min(arr1.length, arr2.length)
						//++ [EXCEPTION] Using native .every() and index access
						const allCorrect = result.every(function checkValue(
							value: number,
							index: number,
						): boolean {
							return value === arr1[index] * arr2[index]
						})
						assertEquals(allCorrect, true)
						assertEquals(result.length, minLength)
					},
				),
			)
		})

		it("empty first array produces empty result", function testFirstEmptyProperty() {
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr2,
					) {
						const result = zipWith(add)([])(arr2)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, 0)
					},
				),
			)
		})

		it("empty second array produces empty result", function testSecondEmptyProperty() {
			function add(a: number) {
				return function addToA(b: number): number {
					return a + b
				}
			}
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr1,
					) {
						const result = zipWith(add)(arr1)([])
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, 0)
					},
				),
			)
		})
	})
})
