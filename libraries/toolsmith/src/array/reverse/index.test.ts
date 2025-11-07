import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import reverse from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("reverse", function testReverse() {
	describe("Plain array path", function testPlainArrayPath() {
		it("reverses array order", function testBasicReverse() {
			const input = [1, 2, 3, 4, 5]
			const result = reverse(input)
			assertEquals(result, [5, 4, 3, 2, 1])
		})

		it("returns empty array when input is empty", function testEmptyArray() {
			const result = reverse([])
			assertEquals(result, [])
		})

		it("handles single element array", function testSingleElement() {
			const input = [42]
			const result = reverse(input)
			assertEquals(result, [42])
		})

		it("handles two element array", function testTwoElements() {
			const input = [1, 2]
			const result = reverse(input)
			assertEquals(result, [2, 1])
		})

		it("works with string arrays", function testStringArrays() {
			const input = ["a", "b", "c", "d"]
			const result = reverse(input)
			assertEquals(result, ["d", "c", "b", "a"])
		})

		it("works with mixed types", function testMixedTypes() {
			const input = [1, "a", 2, "b"]
			const result = reverse(input)
			assertEquals(result, ["b", 2, "a", 1])
		})

		it("handles array with duplicates", function testDuplicates() {
			const input = [1, 2, 2, 3, 3, 3]
			const result = reverse(input)
			assertEquals(result, [3, 3, 3, 2, 2, 1])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function createElement(
				_,
				i: number,
			) {
				return i
			})
			const result = reverse(input)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 1000)
			assertEquals(result[0], 999)
			assertEquals(result[999], 0)
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const input = ok([1, 2, 3, 4])
			const result = reverse(input)

			assertEquals(result, ok([4, 3, 2, 1]))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = error(testError)
			const result = reverse(input)

			assertEquals(result, error(testError))
		})

		it("handles empty array in successful Result", function testEmptyResult() {
			const input = ok([])
			const result = reverse(input)

			assertEquals(result, ok([]))
		})

		it("handles single element in Result", function testSingleElementResult() {
			const input = ok([42])
			const result = reverse(input)

			assertEquals(result, ok([42]))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const input = success([1, 2, 3, 4])
			const result = reverse(input)

			assertEquals(result, success([4, 3, 2, 1]))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = failure([testError])
			const result = reverse(input)

			assertEquals(result, failure([testError]))
		})

		it("handles empty array in successful Validation", function testEmptyValidation() {
			const input = success([])
			const result = reverse(input)

			assertEquals(result, success([]))
		})

		it("handles single element in Validation", function testSingleElementValidation() {
			const input = success([42])
			const result = reverse(input)

			assertEquals(result, success([42]))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("reversing twice returns original", function testReversetwice() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr,
					) {
						const result = reverse(reverse(arr))
						assertEquals(result, arr)
					},
				),
			)
		})

		it("result length equals input length", function testLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						arr,
					) {
						const result = reverse(arr)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, arr.length)
					},
				),
			)
		})

		it("first element becomes last", function testFirstBecomesLast() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1, maxLength: 100 }),
					function testProperty(
						arr,
					) {
						const result = reverse(arr)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result[result.length - 1], arr[0])
					},
				),
			)
		})

		it("last element becomes first", function testLastBecomesFirst() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1, maxLength: 100 }),
					function testProperty(
						arr,
					) {
						const result = reverse(arr)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result[0], arr[arr.length - 1])
					},
				),
			)
		})
	})
})
