import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
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

		it("preserves keys array order", () => {
			const result = pick(["role", "id", "name"])(testObj)
			// Properties are returned in the order specified in the keys array
			expect(Object.keys(result)).toEqual(["role", "id", "name"])
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

	describe("property-based tests", () => {
		describe("pick properties", () => {
			it("picked object only contains specified keys", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					(obj, keys) => {
						const result = pick(keys)(obj)
						const resultKeys = Object.keys(result)
						
						// Every key in result should be in the keys array
						for (const key of resultKeys) {
							expect(keys).toContain(key)
						}
					}
				))
			})

			it("picked values match original values", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					(obj, keys) => {
						const result = pick(keys)(obj)
						
						// Every value in result should match original
						for (const key of Object.keys(result)) {
							expect(result[key]).toBe(obj[key])
						}
					}
				))
			})

			it("pick is idempotent", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					(obj, keys) => {
						const once = pick(keys)(obj)
						const twice = pick(keys)(once)
						expect(twice).toEqual(once)
					}
				))
			})

			it("empty keys returns empty object", () => {
				fc.assert(fc.property(
					fc.object(),
					(obj) => {
						const result = pick([])(obj)
						expect(result).toEqual({})
					}
				))
			})

			it("pick creates new object", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					(obj, keys) => {
						const result = pick(keys)(obj)
						expect(result).not.toBe(obj)
					}
				))
			})
		})

		describe("omit properties", () => {
			it("omitted object doesn't contain specified keys", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					(obj, keys) => {
						const result = omit(keys)(obj)
						
						// No key in result should be in the keys array (own properties only)
						for (const key of keys) {
							expect(Object.prototype.hasOwnProperty.call(result, key)).toBe(false)
						}
					}
				))
			})

			it("omitted values match original values", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					(obj, keys) => {
						const result = omit(keys)(obj)
						
						// Every value in result should match original
						for (const key of Object.keys(result)) {
							expect(result[key]).toBe(obj[key])
						}
					}
				))
			})

			it("omit is idempotent", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					(obj, keys) => {
						const once = omit(keys)(obj)
						const twice = omit(keys)(once)
						expect(twice).toEqual(once)
					}
				))
			})

			it("empty keys returns full object copy", () => {
				fc.assert(fc.property(
					fc.object(),
					(obj) => {
						const result = omit([])(obj)
						expect(result).toEqual(obj)
						expect(result).not.toBe(obj)
					}
				))
			})

			it("omit creates new object", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					(obj, keys) => {
						const result = omit(keys)(obj)
						expect(result).not.toBe(obj)
					}
				))
			})
		})

		describe("pick and omit relationship properties", () => {
			it("pick and omit partition the object", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					(obj, keys) => {
						const picked = pick(keys)(obj)
						const omitted = omit(keys)(obj)
						
						// No overlapping keys
						for (const key of Object.keys(picked)) {
							expect(omitted).not.toHaveProperty(key)
						}
						
						// Combined they have all original keys
						const combined = { ...picked, ...omitted }
						expect(Object.keys(combined).sort()).toEqual(Object.keys(obj).sort())
					}
				))
			})

			it("pick of all keys equals object", () => {
				fc.assert(fc.property(
					fc.object(),
					(obj) => {
						const allKeys = Object.keys(obj)
						const result = pick(allKeys)(obj)
						expect(result).toEqual(obj)
					}
				))
			})

			it("omit of all keys equals empty", () => {
				fc.assert(fc.property(
					fc.object(),
					(obj) => {
						const allKeys = Object.keys(obj)
						const result = omit(allKeys)(obj)
						expect(result).toEqual({})
					}
				))
			})

			it("composing pick functions", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.array(fc.string()),
					fc.array(fc.string()),
					(obj, keys1, keys2) => {
						// Picking keys2 from pick(keys1) should be same as 
						// picking intersection of keys1 and keys2
						const composed = pick(keys2)(pick(keys1)(obj))
						const intersection = keys1.filter(k => keys2.includes(k))
						const direct = pick(intersection)(obj)
						expect(composed).toEqual(direct)
					}
				))
			})

			it("null and undefined handling", () => {
				fc.assert(fc.property(
					fc.array(fc.string()),
					(keys) => {
						// pick and omit should handle null/undefined gracefully
						expect(pick(keys)(null as any)).toEqual({})
						expect(pick(keys)(undefined as any)).toEqual({})
						expect(omit(keys)(null as any)).toEqual({})
						expect(omit(keys)(undefined as any)).toEqual({})
					}
				))
			})
		})
	})
})