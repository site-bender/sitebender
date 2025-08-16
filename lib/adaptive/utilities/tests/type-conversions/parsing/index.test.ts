import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import parseJson from "../../../castValue/parseJson/index.ts"

describe("JSON Parsing Behaviors", () => {
	describe("when parsing valid JSON", () => {
		it("parses simple objects", () => {
			const result = parseJson('{"name":"John","age":30}')
			expect(result.right).toEqual({ name: "John", age: 30 })
		})

		it("parses arrays", () => {
			const result = parseJson('[1,2,3,4,5]')
			expect(result.right).toEqual([1, 2, 3, 4, 5])
		})

		it("parses nested objects", () => {
			const json = '{"user":{"name":"Alice","details":{"age":25,"city":"NYC"}}}'
			const result = parseJson(json)
			expect(result.right).toEqual({
				user: {
					name: "Alice",
					details: {
						age: 25,
						city: "NYC",
					},
				},
			})
		})

		it("parses arrays of objects", () => {
			const json = '[{"id":1,"name":"Item1"},{"id":2,"name":"Item2"}]'
			const result = parseJson(json)
			expect(result.right).toEqual([
				{ id: 1, name: "Item1" },
				{ id: 2, name: "Item2" },
			])
		})

		it("parses primitive values", () => {
			expect(parseJson('"hello"').right).toBe("hello")
			expect(parseJson("42").right).toBe(42)
			expect(parseJson("3.14").right).toBe(3.14)
			expect(parseJson("true").right).toBe(true)
			expect(parseJson("false").right).toBe(false)
			expect(parseJson("null").right).toBe(null)
		})

		it("handles escaped characters", () => {
			const result = parseJson('"hello\\"world\\""')
			expect(result.right).toBe('hello"world"')
		})

		it("handles unicode characters", () => {
			const result = parseJson('"Hello \\u0041\\u0042\\u0043"')
			expect(result.right).toBe("Hello ABC")
		})

		it("parses empty structures", () => {
			expect(parseJson("{}").right).toEqual({})
			expect(parseJson("[]").right).toEqual([])
		})

		it("preserves number precision", () => {
			const result = parseJson("0.123456789012345")
			expect(result.right).toBe(0.123456789012345)
		})

		it("handles special number values", () => {
			expect(parseJson("0").right).toBe(0)
			expect(parseJson("-0").right).toBe(-0)
			expect(parseJson("1e10").right).toBe(10000000000)
			expect(parseJson("2.5e-3").right).toBe(0.0025)
		})
	})

	describe("when parsing invalid JSON", () => {
		it("returns error for malformed JSON", () => {
			const result = parseJson("{invalid json}")
			expect(result.left).toBeDefined()
			expect(result.left?.[0].message).toContain("Cannot parse")
		})

		it("returns error for trailing commas", () => {
			const result = parseJson('{"a":1,}')
			expect(result.left).toBeDefined()
		})

		it("returns error for single quotes", () => {
			const result = parseJson("{'name':'value'}")
			expect(result.left).toBeDefined()
		})

		it("returns error for unquoted keys", () => {
			const result = parseJson("{name: 'value'}")
			expect(result.left).toBeDefined()
		})

		it("returns error for undefined values", () => {
			const result = parseJson('{"value":undefined}')
			expect(result.left).toBeDefined()
		})

		it("returns error for functions", () => {
			const result = parseJson('{"fn":function(){}}')
			expect(result.left).toBeDefined()
		})

		it("returns error for NaN and Infinity", () => {
			expect(parseJson("NaN")).toHaveProperty("left")
			expect(parseJson("Infinity")).toHaveProperty("left")
			expect(parseJson("-Infinity")).toHaveProperty("left")
		})

		it("returns error for incomplete JSON", () => {
			expect(parseJson('{"name":')).toHaveProperty("left")
			expect(parseJson("[1,2,")).toHaveProperty("left")
			expect(parseJson('"unclosed string')).toHaveProperty("left")
		})

		it("returns error for comments", () => {
			const result = parseJson('{"a":1 /* comment */}')
			expect(result.left).toBeDefined()
		})

		it("returns error for multiple root values", () => {
			const result = parseJson('{"a":1}{"b":2}')
			expect(result.left).toBeDefined()
		})
	})

	describe("when handling edge cases", () => {
		it("returns error for empty string", () => {
			const result = parseJson("")
			expect(result.left).toBeDefined()
		})

		it("returns error for whitespace only", () => {
			const result = parseJson("   \n\t  ")
			expect(result.left).toBeDefined()
		})

		it("handles whitespace around valid JSON", () => {
			const result = parseJson('  \n {"a":1}  \t')
			expect(result.right).toEqual({ a: 1 })
		})

		it("parses strings with special characters", () => {
			const json = '"Line 1\\nLine 2\\tTabbed\\r\\nWindows"'
			const result = parseJson(json)
			expect(result.right).toBe("Line 1\nLine 2\tTabbed\r\nWindows")
		})

		it("preserves object property order", () => {
			const json = '{"z":1,"y":2,"x":3}'
			const result = parseJson(json)
			expect(Object.keys(result.right as object)).toEqual(["z", "y", "x"])
		})

		it("handles deeply nested structures", () => {
			const deep = {
				level1: {
					level2: {
						level3: {
							level4: {
								level5: "deep",
							},
						},
					},
				},
			}
			const json = JSON.stringify(deep)
			const result = parseJson(json)
			expect(result.right).toEqual(deep)
		})

		it("handles large arrays", () => {
			const largeArray = Array.from({ length: 1000 }, (_, i) => i)
			const json = JSON.stringify(largeArray)
			const result = parseJson(json)
			expect(result.right).toEqual(largeArray)
		})

		it("preserves date strings as strings", () => {
			const result = parseJson('"2024-03-15T10:30:00Z"')
			expect(result.right).toBe("2024-03-15T10:30:00Z")
			expect(typeof result.right).toBe("string")
		})
	})
})
