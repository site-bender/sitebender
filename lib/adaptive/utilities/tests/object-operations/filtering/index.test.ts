import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import pick from "../../../object/pick/index.ts"
import omit from "../../../object/omit/index.ts"

describe("Object Filtering Behaviors", () => {
	describe("when picking properties", () => {
		const testObj = {
			id: 1,
			name: "Alice",
			age: 30,
			email: "alice@example.com",
			password: "secret",
			role: "admin",
		}

		it("picks specified properties", () => {
			const result = pick(["id", "name", "email"])(testObj)
			expect(result).toEqual({
				id: 1,
				name: "Alice",
				email: "alice@example.com",
			})
		})

		it("picks single property", () => {
			const result = pick(["name"])(testObj)
			expect(result).toEqual({ name: "Alice" })
		})

		it("ignores non-existent properties", () => {
			const result = pick(["id", "name", "phone"])(testObj)
			expect(result).toEqual({
				id: 1,
				name: "Alice",
			})
		})

		it("returns empty object when no properties match", () => {
			const result = pick(["foo", "bar"])(testObj)
			expect(result).toEqual({})
		})

		it("returns empty object for empty pick array", () => {
			const result = pick([])(testObj)
			expect(result).toEqual({})
		})

		it("handles null and undefined values", () => {
			const obj = { a: null, b: undefined, c: "value" }
			const result = pick(["a", "b", "c"])(obj)
			expect(result).toEqual({ a: null, b: undefined, c: "value" })
		})

		it("handles empty object", () => {
			const result = pick(["any", "keys"])({})
			expect(result).toEqual({})
		})

		it("creates shallow copy", () => {
			const obj = { a: { nested: "value" }, b: 2 }
			const result = pick(["a"])(obj)
			expect(result.a).toBe(obj.a) // Same reference
			expect(result).not.toBe(obj) // Different object
		})

		it("preserves property order", () => {
			const result = pick(["role", "id", "name"])(testObj)
			expect(Object.keys(result)).toEqual(["id", "name", "role"])
		})

		it("handles arrays", () => {
			const arr = ["a", "b", "c"]
			const result = pick(["0", "2"])(arr)
			expect(result).toEqual({ "0": "a", "2": "c" })
		})

		it("picks from nested objects", () => {
			const nested = {
				user: { name: "Bob", age: 25 },
				settings: { theme: "dark" },
			}
			const result = pick(["user"])(nested)
			expect(result).toEqual({ user: { name: "Bob", age: 25 } })
		})

		it("handles duplicate keys in pick array", () => {
			const result = pick(["id", "name", "id"])(testObj)
			expect(result).toEqual({ id: 1, name: "Alice" })
		})
	})

	describe("when omitting properties", () => {
		const testObj = {
			id: 1,
			name: "Bob",
			age: 25,
			email: "bob@example.com",
			password: "secret",
			role: "user",
		}

		it("omits specified properties", () => {
			const result = omit(["password", "role"])(testObj)
			expect(result).toEqual({
				id: 1,
				name: "Bob",
				age: 25,
				email: "bob@example.com",
			})
		})

		it("omits single property", () => {
			const result = omit(["password"])(testObj)
			expect(result).toEqual({
				id: 1,
				name: "Bob",
				age: 25,
				email: "bob@example.com",
				role: "user",
			})
		})

		it("ignores non-existent properties", () => {
			const result = omit(["foo", "bar"])(testObj)
			expect(result).toEqual(testObj)
		})

		it("returns full object when omit array is empty", () => {
			const result = omit([])(testObj)
			expect(result).toEqual(testObj)
		})

		it("returns empty object when omitting all properties", () => {
			const result = omit(Object.keys(testObj))(testObj)
			expect(result).toEqual({})
		})

		it("handles null and undefined values", () => {
			const obj = { a: null, b: undefined, c: "value", d: "keep" }
			const result = omit(["c"])(obj)
			expect(result).toEqual({ a: null, b: undefined, d: "keep" })
		})

		it("handles empty object", () => {
			const result = omit(["any", "keys"])({})
			expect(result).toEqual({})
		})

		it("creates shallow copy", () => {
			const obj = { a: { nested: "value" }, b: 2, c: 3 }
			const result = omit(["b"])(obj)
			expect(result.a).toBe(obj.a) // Same reference
			expect(result).not.toBe(obj) // Different object
		})

		it("preserves remaining property order", () => {
			const result = omit(["age", "password"])(testObj)
			expect(Object.keys(result)).toEqual(["id", "name", "email", "role"])
		})

		it("handles arrays", () => {
			const arr = ["a", "b", "c", "d"]
			const result = omit(["1", "3"])(arr)
			expect(result).toEqual({ "0": "a", "2": "c" })
		})

		it("omits from nested objects", () => {
			const nested = {
				user: { name: "Charlie", age: 30 },
				settings: { theme: "light" },
				data: { value: 42 },
			}
			const result = omit(["settings"])(nested)
			expect(result).toEqual({
				user: { name: "Charlie", age: 30 },
				data: { value: 42 },
			})
		})

		it("handles duplicate keys in omit array", () => {
			const result = omit(["password", "age", "password"])(testObj)
			expect(result).toEqual({
				id: 1,
				name: "Bob",
				email: "bob@example.com",
				role: "user",
			})
		})
	})

	describe("pick and omit relationship", () => {
		const obj = { a: 1, b: 2, c: 3, d: 4 }

		it("pick and omit are complementary", () => {
			const keys = ["a", "c"]
			const picked = pick(keys)(obj)
			const omitted = omit(keys)(obj)
			
			expect(picked).toEqual({ a: 1, c: 3 })
			expect(omitted).toEqual({ b: 2, d: 4 })
			
			// Combined they should equal original
			expect({ ...picked, ...omitted }).toEqual(obj)
		})

		it("picking all is identity", () => {
			const allKeys = Object.keys(obj)
			const result = pick(allKeys)(obj)
			expect(result).toEqual(obj)
		})

		it("omitting all is empty", () => {
			const allKeys = Object.keys(obj)
			const result = omit(allKeys)(obj)
			expect(result).toEqual({})
		})

		it("picking none is empty", () => {
			const result = pick([])(obj)
			expect(result).toEqual({})
		})

		it("omitting none is identity", () => {
			const result = omit([])(obj)
			expect(result).toEqual(obj)
		})
	})
})