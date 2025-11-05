import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import zipObj from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("zipObj", function testZipObj() {
	describe("Plain array path", function testPlainArrayPath() {
		it("creates object from equal length arrays", function testEqualLength() {
			const keys = ["a", "b", "c"]
			const values = [1, 2, 3]
			const result = zipObj(keys)(values)
			assertEquals(result, { a: 1, b: 2, c: 3 })
		})

		it("handles keys longer than values", function testKeysLonger() {
			const keys = ["a", "b", "c", "d"]
			const values = [1, 2]
			const result = zipObj(keys)(values)
			assertEquals(result, { a: 1, b: 2, c: undefined, d: undefined })
		})

		it("handles values longer than keys", function testValuesLonger() {
			const keys = ["a", "b"]
			const values = [1, 2, 3, 4]
			const result = zipObj(keys)(values)
			assertEquals(result, { a: 1, b: 2 })
		})

		it("returns empty object for empty arrays", function testEmptyArrays() {
			const result = zipObj([])([] as Array<number>)
			assertEquals(result, {})
		})

		it("works with string values", function testStringValues() {
			const keys = ["first", "last"]
			const values = ["John", "Doe"]
			const result = zipObj(keys)(values)
			assertEquals(result, { first: "John", last: "Doe" })
		})

		it("works with number keys", function testNumberKeys() {
			const keys = [1, 2, 3]
			const values = ["a", "b", "c"]
			const result = zipObj(keys)(values)
			assertEquals(result, { 1: "a", 2: "b", 3: "c" })
		})

		it("handles mixed key types", function testMixedKeys() {
			const keys = ["a", 1, "b", 2]
			const values = [10, 20, 30, 40]
			const result = zipObj(keys)(values)
			assertEquals(result, { a: 10, 1: 20, b: 30, 2: 40 })
		})

		it("handles object values", function testObjectValues() {
			const keys = ["user", "admin"]
			const values = [{ id: 1 }, { id: 2 }]
			const result = zipObj(keys)(values)
			assertEquals(result, { user: { id: 1 }, admin: { id: 2 } })
		})

		it("overwrites duplicate keys with last value", function testDuplicateKeys() {
			const keys = ["a", "b", "a"]
			const values = [1, 2, 3]
			const result = zipObj(keys)(values)
			assertEquals(result, { a: 3, b: 2 })
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const keys = Array.from({ length: 1000 }, function createKey(
				_,
				i: number,
			) {
				return `key${i}`
			})
			const values = Array.from({ length: 1000 }, function createValue(
				_,
				i: number,
			) {
				return i
			})
			const result = zipObj(keys)(values)
			//++ [EXCEPTION] Using Object.keys and array.length for assertion
			assertEquals(Object.keys(result).length, 1000)
			assertEquals(result.key0, 0)
			assertEquals(result.key999, 999)
		})

		it("handles null and undefined values", function testNullUndefined() {
			const keys = ["a", "b", "c"]
			const values = [null, undefined, 1]
			const result = zipObj(keys)(values)
			assertEquals(result, { a: null, b: undefined, c: 1 })
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const keys = ["a", "b", "c"]
			const values = ok([1, 2, 3])
			const result = zipObj(keys)(values)

			assertEquals(result, ok({ a: 1, b: 2, c: 3 }))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const keys = ["a", "b"]
			const values = error(testError)
			const result = zipObj(keys)(values)

			assertEquals(result, error(testError))
		})

		it("handles empty arrays in successful Result", function testEmptyResult() {
			const keys: Array<string> = []
			const values = ok([])
			const result = zipObj(keys)(values)

			assertEquals(result, ok({}))
		})

		it("handles Result with mismatched lengths", function testResultMismatch() {
			const keys = ["a", "b", "c"]
			const values = ok([1, 2])
			const result = zipObj(keys)(values)

			assertEquals(result, ok({ a: 1, b: 2, c: undefined }))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const keys = ["a", "b", "c"]
			const values = success([1, 2, 3])
			const result = zipObj(keys)(values)

			assertEquals(result, success({ a: 1, b: 2, c: 3 }))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const keys = ["a", "b"]
			const values = failure([testError])
			const result = zipObj(keys)(values)

			assertEquals(result, failure([testError]))
		})

		it("handles empty arrays in successful Validation", function testEmptyValidation() {
			const keys: Array<string> = []
			const values = success([])
			const result = zipObj(keys)(values)

			assertEquals(result, success({}))
		})

		it("handles Validation with mismatched lengths", function testValidationMismatch() {
			const keys = ["a", "b", "c"]
			const values = success([1, 2])
			const result = zipObj(keys)(values)

			assertEquals(result, success({ a: 1, b: 2, c: undefined }))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("object has keys from keys array", function testKeysProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.string()),
					fc.array(fc.integer()),
					function testProperty(
						keys,
						values,
					) {
						const result = zipObj(keys)(values)
						//++ [EXCEPTION] Using Object.keys and array.length
						const actualLength = Object.keys(result).length
						//++ Result length may be less than or equal to keys.length due to duplicates
						assertEquals(actualLength <= keys.length, true)
					},
				),
			)
		})

		it("all keys in result come from keys array", function testKeysSourceProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.string()),
					fc.array(fc.integer()),
					function testProperty(
						keys,
						values,
					) {
						const result = zipObj(keys)(values)
						//++ [EXCEPTION] Using Object.keys and native .every()
						const allKeysValid = Object.keys(result).every(
							function checkKey(
								key: string,
							): boolean {
								return keys.includes(key)
							},
						)
						assertEquals(allKeysValid, true)
					},
				),
			)
		})

		it("result is an object", function testResultIsObject() {
			fc.assert(
				fc.property(
					fc.array(fc.string()),
					fc.array(fc.integer()),
					function testProperty(
						keys,
						values,
					) {
						const result = zipObj(keys)(values)
						//++ [EXCEPTION] Using typeof operator
						assertEquals(typeof result, "object")
						assertEquals(result !== null, true)
					},
				),
			)
		})

		it("empty keys array produces empty object", function testEmptyKeysProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					function testProperty(
						values,
					) {
						const result = zipObj([])(values)
						//++ [EXCEPTION] Using Object.keys and array.length
						assertEquals(Object.keys(result).length, 0)
					},
				),
			)
		})
	})
})
