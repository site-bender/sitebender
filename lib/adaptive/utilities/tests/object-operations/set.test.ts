import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import set from "../../unsafe/object/set/index.ts"

describe("set", () => {
	describe("basic setting", () => {
		it("sets a simple property", () => {
			const result = set("name")("Bob")({ name: "Alice", age: 30 })
			expect(result).toEqual({ name: "Bob", age: 30 })
		})

		it("sets a nested property", () => {
			const result = set("user.email")("new@example.com")({
				user: { name: "Alice", email: "old@example.com" }
			})
			expect(result).toEqual({
				user: { name: "Alice", email: "new@example.com" }
			})
		})

		it("creates intermediate objects as needed", () => {
			const result = set("a.b.c")(42)({})
			expect(result).toEqual({ a: { b: { c: 42 } } })
		})
	})

	describe("array path notation", () => {
		it("accepts array of keys", () => {
			const result = set(["user", "settings", "theme"])("dark")({
				user: { settings: { theme: "light" } }
			})
			expect(result).toEqual({
				user: { settings: { theme: "dark" } }
			})
		})

		it("handles numeric keys in array path", () => {
			const result = set(["data", 0, "value"])(100)({
				data: [{ value: 0 }, { value: 50 }]
			})
			expect(result).toEqual({
				data: [{ value: 100 }, { value: 50 }]
			})
		})
	})

	describe("array handling", () => {
		it("sets array elements by index", () => {
			const result = set("items.1")("updated")({ items: ["a", "b", "c"] })
			expect(result).toEqual({ items: ["a", "updated", "c"] })
		})

		it("extends array if index is out of bounds", () => {
			const result = set("items.5")("new")({ items: ["a", "b"] })
			expect(result).toEqual({ 
				items: ["a", "b", undefined, undefined, undefined, "new"] 
			})
		})

		it("creates array when numeric key is used on undefined", () => {
			const result = set("items.0")("first")({})
			expect(result).toEqual({ items: ["first"] })
		})

		it("converts array to object for non-numeric keys", () => {
			const result = set("items.name")("value")({ items: [1, 2, 3] })
			expect(result).toEqual({ items: { "0": 1, "1": 2, "2": 3, name: "value" } })
		})
	})

	describe("edge cases", () => {
		it("handles null input", () => {
			const result = set("a.b")(10)(null)
			expect(result).toEqual({ a: { b: 10 } })
		})

		it("handles undefined input", () => {
			const result = set("x")(5)(undefined)
			expect(result).toEqual({ x: 5 })
		})

		it("handles empty path", () => {
			const result = set("")("value")({ a: 1 })
			expect(result).toBe("value")
		})

		it("handles empty array path", () => {
			const result = set([])("value")({ a: 1 })
			expect(result).toBe("value")
		})

		it("replaces primitive with object when needed", () => {
			const result = set("a.b")(2)({ a: "string" })
			expect(result).toEqual({ a: { b: 2 } })
		})
	})

	describe("immutability", () => {
		it("doesn't modify original object", () => {
			const original = { a: { b: 1 } }
			const result = set("a.b")(2)(original)
			expect(original).toEqual({ a: { b: 1 } })
			expect(result).toEqual({ a: { b: 2 } })
			expect(result).not.toBe(original)
			expect(result.a).not.toBe(original.a)
		})

		it("doesn't modify original array", () => {
			const original = { items: [1, 2, 3] }
			const result = set("items.1")(20)(original)
			expect(original).toEqual({ items: [1, 2, 3] })
			expect(result).toEqual({ items: [1, 20, 3] })
			expect(result.items).not.toBe(original.items)
		})
	})

	describe("partial application", () => {
		it("allows partial application for reusable setters", () => {
			const setUserName = set("user.name")
			const setAlice = setUserName("Alice")
			
			const result1 = setAlice({ user: { name: "Bob", id: 1 } })
			expect(result1).toEqual({ user: { name: "Alice", id: 1 } })
			
			const result2 = setAlice({ user: { name: "Charlie", id: 2 } })
			expect(result2).toEqual({ user: { name: "Alice", id: 2 } })
		})

		it("allows building complex setters", () => {
			const setTheme = set(["settings", "appearance", "theme"])
			const setDarkTheme = setTheme("dark")
			
			const result = setDarkTheme({ settings: {} })
			expect(result).toEqual({
				settings: { appearance: { theme: "dark" } }
			})
		})
	})

	describe("property-based tests", () => {
		it("setting then getting returns the set value", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.anything(),
					fc.object(),
					(path, value, obj) => {
						// Skip empty paths as they replace entire object
						if (!path) return true
						
						const result = set(path)(value)(obj)
						const keys = path.split(".")
						let current = result
						
						for (let i = 0; i < keys.length - 1; i++) {
							if (current == null || typeof current !== "object") {
								return true // Can't traverse further
							}
							current = current[keys[i]]
						}
						
						if (current != null && typeof current === "object") {
							const lastKey = keys[keys.length - 1]
							expect(current[lastKey]).toEqual(value)
						}
					}
				)
			)
		})

		it("is immutable", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.anything(),
					fc.object(),
					(path, value, obj) => {
						const original = JSON.parse(JSON.stringify(obj))
						set(path)(value)(obj)
						expect(obj).toEqual(original)
					}
				)
			)
		})
	})
})