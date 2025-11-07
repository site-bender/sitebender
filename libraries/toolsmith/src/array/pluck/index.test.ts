import { describe, it } from "@std/testing/bdd"
import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import pluck from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

describe("pluck", function testPluck() {
	describe("Plain array path", function testPlainArrayPath() {
		it("extracts property from objects", function testBasicPluck() {
			const input = [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }]
			const result = pluck("name")(input)
			assertEquals(result, ["Alice", "Bob"])
		})

		it("returns empty array when input is empty", function testEmptyArray() {
			const result = pluck("name")([])
			assertEquals(result, [])
		})

		it("returns undefined for missing properties", function testMissingProperty() {
			type Item = { name?: string; age?: number }
			const input: Array<Item> = [{ name: "Alice" }, { age: 25 }]
			const result = pluck<Item, "name">("name")(input)
			assertEquals(result, ["Alice", undefined])
		})

		it("returns null for null items", function testNullItems() {
			const input = [{ name: "Alice" }, null, { name: "Bob" }]
			const result = pluck("name" as keyof NonNullable<typeof input[0]>)(input)
			assertEquals(result, ["Alice", null, "Bob"])
		})

		it("returns null for undefined items", function testUndefinedItems() {
			const input = [{ name: "Alice" }, undefined, { name: "Bob" }]
			const result = pluck("name" as keyof NonNullable<typeof input[0]>)(input)
			assertEquals(result, ["Alice", null, "Bob"])
		})

		it("returns null for non-object items", function testNonObjectItems() {
			const input = [{ name: "Alice" }, 42, { name: "Bob" }]
			const result = pluck("name" as keyof typeof input[0])(input)
			assertEquals(result, ["Alice", null, "Bob"])
		})

		it("works with number properties", function testNumberProperties() {
			const input = [{ id: 1, value: 10 }, { id: 2, value: 20 }]
			const result = pluck("value")(input)
			assertEquals(result, [10, 20])
		})

		it("works with boolean properties", function testBooleanProperties() {
			const input = [{ active: true }, { active: false }]
			const result = pluck("active")(input)
			assertEquals(result, [true, false])
		})

		it("works with nested object properties", function testNestedProperties() {
			const input = [
				{ user: { name: "Alice" } },
				{ user: { name: "Bob" } },
			]
			const result = pluck("user")(input)
			assertEquals(result, [{ name: "Alice" }, { name: "Bob" }])
		})

		it("works with array properties", function testArrayProperties() {
			const input = [{ tags: ["a", "b"] }, { tags: ["c", "d"] }]
			const result = pluck("tags")(input)
			assertEquals(result, [["a", "b"], ["c", "d"]])
		})

		it("handles large arrays efficiently", function testLargeArrays() {
			const input = Array.from({ length: 1000 }, function createObject(
				_,
				i: number,
			) {
				return { id: i, value: i * 2 }
			})
			const result = pluck("value")(input)
			//++ [EXCEPTION] Using array.length for assertion
			assertEquals(result.length, 1000)
			assertEquals(result[0], 0)
			assertEquals(result[999], 1998)
		})

		it("handles objects with null property values", function testNullPropertyValues() {
			const input = [{ name: null }, { name: "Bob" }]
			const result = pluck("name")(input)
			assertEquals(result, [null, "Bob"])
		})

		it("handles objects with undefined property values", function testUndefinedPropertyValues() {
			const input = [{ name: undefined }, { name: "Bob" }]
			const result = pluck("name")(input)
			assertEquals(result, [undefined, "Bob"])
		})
	})

	describe("Result monad path", function testResultPath() {
		it("transforms successful Result", function testSuccessfulResult() {
			const input = ok([{ name: "Alice" }, { name: "Bob" }])
			const result = pluck("name")(input)

			assertEquals(result, ok(["Alice", "Bob"]))
		})

		it("passes through error unchanged", function testErrorPassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = error(testError)
			const result = pluck("name")(input)

			assertEquals(result, error(testError))
		})

		it("handles empty array in successful Result", function testEmptyResult() {
			const input = ok([])
			const result = pluck("name")(input)

			assertEquals(result, ok([]))
		})

		it("handles missing properties in Result", function testMissingPropertiesResult() {
			type Item = { name?: string; age?: number }
			const input = ok<Array<Item>>([{ name: "Alice" }, { age: 25 }])
			const result = pluck<Item, "name">("name")(input)

			assertEquals(result, ok(["Alice", undefined]))
		})
	})

	describe("Validation monad path", function testValidationPath() {
		it("transforms successful Validation", function testSuccessfulValidation() {
			const input = success([{ name: "Alice" }, { name: "Bob" }])
			const result = pluck("name")(input)

			assertEquals(result, success(["Alice", "Bob"]))
		})

		it("passes through failure unchanged", function testFailurePassthrough() {
			const testError = {
				_tag: "TestError" as const,
				message: "test error",
			}
			const input = failure([testError])
			const result = pluck("name")(input)

			assertEquals(result, failure([testError]))
		})

		it("handles empty array in successful Validation", function testEmptyValidation() {
			const input = success([])
			const result = pluck("name")(input)

			assertEquals(result, success([]))
		})

		it("handles missing properties in Validation", function testMissingPropertiesValidation() {
			type Item = { name?: string; age?: number }
			const input = success<Array<Item>>([{ name: "Alice" }, { age: 25 }])
			const result = pluck<Item, "name">("name")(input)

			assertEquals(result, success(["Alice", undefined]))
		})
	})

	describe("Property-based tests", function testProperties() {
		it("result length equals input length", function testLengthProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.record({ name: fc.string(), age: fc.integer() })),
					function testProperty(
						arr,
					) {
						const result = pluck("name")(arr)
						//++ [EXCEPTION] Using array.length for assertion
						assertEquals(result.length, arr.length)
					},
				),
			)
		})

		it("empty array returns empty array", function testEmptyProperty() {
			type TestObject = { name: string }
			const result = pluck<TestObject, "name">("name")([])
			assertEquals(result, [])
		})

		it("plucking existing property preserves values", function testPreservationProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.record({ value: fc.integer() })),
					function testProperty(
						arr,
					) {
						const result = pluck("value")(arr)
						const expected = arr.map(function extractValue(
							obj: { value: number },
						) {
							return obj.value
						})
						assertEquals(result, expected)
					},
				),
			)
		})

		it("all objects have property means no nulls", function testAllHaveProperty() {
			fc.assert(
				fc.property(
					fc.array(fc.record({ name: fc.string() }), { minLength: 1 }),
					function testProperty(
						arr,
					) {
						const result = pluck("name")(arr)
						const hasNull = result.some(function checkNull(
							val: string | null,
						) {
							return val === null
						})
						assertEquals(hasNull, false)
					},
				),
			)
		})
	})
})
