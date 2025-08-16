import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import merge from "../../../object/merge/index.ts"

describe("Object Merging Behaviors", () => {
	describe("when merging objects", () => {
		it("merges two objects with non-overlapping keys", () => {
			const result = merge({ b: 2, c: 3 })({ a: 1 })
			expect(result).toEqual({ a: 1, b: 2, c: 3 })
		})

		it("source defaults are overridden by target values", () => {
			const result = merge({ x: "default", y: 10 })({ x: "override", y: 5, z: 3 })
			expect(result).toEqual({ x: "override", y: 5, z: 3 })
		})

		it("merges multiple sources from left to right", () => {
			const result = merge({ b: 2 }, { c: 3 }, { b: 20, d: 4 })({ a: 1 })
			expect(result).toEqual({ a: 1, b: 20, c: 3, d: 4 })
		})

		it("handles empty source object", () => {
			const result = merge({})({ a: 1, b: 2 })
			expect(result).toEqual({ a: 1, b: 2 })
		})

		it("handles empty target object", () => {
			const result = merge({ a: 1, b: 2 })({})
			expect(result).toEqual({ a: 1, b: 2 })
		})

		it("handles null target", () => {
			const result = merge({ a: 1, b: 2 })(null)
			expect(result).toEqual({ a: 1, b: 2 })
		})

		it("handles undefined target", () => {
			const result = merge({ a: 1, b: 2 })(undefined)
			expect(result).toEqual({ a: 1, b: 2 })
		})

		it("handles null source", () => {
			const result = merge(null)({ a: 1, b: 2 })
			expect(result).toEqual({ a: 1, b: 2 })
		})

		it("handles undefined source", () => {
			const result = merge(undefined)({ a: 1, b: 2 })
			expect(result).toEqual({ a: 1, b: 2 })
		})

		it("handles multiple null/undefined sources", () => {
			const result = merge(null, { b: 2 }, undefined, { c: 3 })({ a: 1 })
			expect(result).toEqual({ a: 1, b: 2, c: 3 })
		})

		it("replaces arrays instead of merging them", () => {
			const result = merge({ arr: [3, 4, 5] })({ arr: [1, 2], other: "value" })
			expect(result).toEqual({ arr: [1, 2], other: "value" }) // target array wins
		})

		it("performs shallow merge only", () => {
			const target = { 
				user: { name: "John", age: 25, city: "NYC" },
				settings: { theme: "dark" }
			}
			const source = { 
				user: { age: 30 },
				settings: { theme: "light", notifications: true },
				newProp: "value"
			}
			const result = merge(source)(target)
			
			// Target's nested objects win entirely (shallow merge)
			expect(result).toEqual({
				user: { name: "John", age: 25, city: "NYC" },
				settings: { theme: "dark" },
				newProp: "value"
			})
		})

		it("preserves reference types", () => {
			const date = new Date()
			const regex = /test/
			const fn = () => "hello"
			
			const result = merge({ date, regex, fn })({ other: "value" })
			expect(result.date).toBe(date)
			expect(result.regex).toBe(regex)
			expect(result.fn).toBe(fn)
		})

		it("creates a new object (immutable)", () => {
			const target = { a: 1, b: 2 }
			const source = { c: 3 }
			const result = merge(source)(target)
			
			expect(result).not.toBe(target)
			expect(result).not.toBe(source)
			expect(target).toEqual({ a: 1, b: 2 })
			expect(source).toEqual({ c: 3 })
		})

		it("handles falsy values correctly", () => {
			const result = merge({ 
				zero: 0, 
				empty: "", 
				falsy: false,
				nil: null,
				undef: undefined
			})({ existing: "value" })
			
			expect(result).toEqual({
				existing: "value",
				zero: 0,
				empty: "",
				falsy: false,
				nil: null,
				undef: undefined
			})
		})

		it("works with partial application", () => {
			const withDefaults = merge({ role: "user", active: true })
			
			const user1 = withDefaults({ name: "Alice" })
			expect(user1).toEqual({ name: "Alice", role: "user", active: true })
			
			const user2 = withDefaults({ name: "Bob", role: "admin" })
			expect(user2).toEqual({ name: "Bob", role: "admin", active: true })
		})

		it("merges objects with symbol keys", () => {
			const sym1 = Symbol("key1")
			const sym2 = Symbol("key2")
			
			const target = { [sym1]: "value1", regular: "target" }
			const source = { [sym2]: "value2", regular: "source" }
			
			const result = merge(source)(target)
			expect(result[sym1]).toBe("value1")
			expect(result[sym2]).toBe("value2")
			expect(result.regular).toBe("target") // target overrides source
		})
	})

	describe("property-based tests", () => {
		it("merge with empty object is identity", () => {
			fc.assert(fc.property(
				fc.object(),
				(obj) => {
					const withEmpty = merge({})(obj)
					const emptyWith = merge(obj)({})
					
					expect(withEmpty).toEqual(obj)
					expect(emptyWith).toEqual(obj)
					expect(withEmpty).not.toBe(obj) // Still creates new object
				}
			))
		})

		it("merge creates new object", () => {
			fc.assert(fc.property(
				fc.object(),
				fc.object(),
				(target, source) => {
					const result = merge(source)(target)
					expect(result).not.toBe(target)
					expect(result).not.toBe(source)
				}
			))
		})

		it("merge preserves all keys from both objects", () => {
			fc.assert(fc.property(
				fc.object(),
				fc.object(),
				(target, source) => {
					const result = merge(source)(target)
					const allKeys = new Set([
						...Object.keys(target),
						...Object.keys(source)
					])
					
					expect(Object.keys(result).sort()).toEqual(
						Array.from(allKeys).sort()
					)
				}
			))
		})

		it("target properties override source defaults", () => {
			fc.assert(fc.property(
				fc.string().filter(s => s.length > 0),
				fc.anything(),
				fc.anything(),
				(key, targetValue, sourceValue) => {
					fc.pre(targetValue !== sourceValue)
					
					const target = { [key]: targetValue, other: "stays" }
					const source = { [key]: sourceValue }
					const result = merge(source)(target)
					
					expect(result[key]).toBe(targetValue) // target wins
					expect(result.other).toBe("stays")
				}
			))
		})

		it("handles null and undefined gracefully", () => {
			fc.assert(fc.property(
				fc.object(),
				(obj) => {
					expect(merge(null)(obj)).toEqual(obj)
					expect(merge(undefined)(obj)).toEqual(obj)
					expect(merge(obj)(null)).toEqual(obj)
					expect(merge(obj)(undefined)).toEqual(obj)
				}
			))
		})

		it("multiple sources override in order", () => {
			fc.assert(fc.property(
				fc.string().filter(s => s.length > 0),
				fc.array(fc.anything(), { minLength: 2, maxLength: 5 }),
				(key, values) => {
					const sources = values.map((value, i) => ({ [key]: value, [`prop${i}`]: i }))
					const result = merge(...sources)({})
					
					// Last value should win
					expect(result[key]).toBe(values[values.length - 1])
					
					// All other properties should be present
					values.forEach((_, i) => {
						expect(result[`prop${i}`]).toBe(i)
					})
				}
			))
		})

		it("doesn't modify input objects", () => {
			fc.assert(fc.property(
				fc.object(),
				fc.object(),
				(target, source) => {
					const targetCopy = { ...target }
					const sourceCopy = { ...source }
					
					merge(source)(target)
					
					expect(target).toEqual(targetCopy)
					expect(source).toEqual(sourceCopy)
				}
			))
		})

		it("handles objects with prototype properties correctly", () => {
			fc.assert(fc.property(
				fc.object(),
				fc.object(),
				(ownProps, otherProps) => {
					// Create object with prototype chain
					const proto = { inherited: "fromProto", ...otherProps }
					const target = Object.create(proto)
					Object.assign(target, ownProps)
					
					const source = { newProp: "value" }
					const result = merge(source)(target)
					
					// Should only merge own properties
					expect(result.inherited).toBeUndefined()
					expect(result.newProp).toBe("value")
					
					// Own properties should be copied
					for (const key in ownProps) {
						expect(result[key]).toBe(ownProps[key])
					}
				}
			))
		})

		it("merge operation is deterministic", () => {
			fc.assert(fc.property(
				fc.object(),
				fc.object(),
				(target, source) => {
					const result1 = merge(source)(target)
					const result2 = merge(source)(target)
					
					expect(result1).toEqual(result2)
				}
			))
		})
	})

	describe("use cases", () => {
		it("merges configuration objects", () => {
			const defaultConfig = {
				port: 3000,
				host: "localhost",
				debug: false,
				timeout: 5000
			}
			
			const userConfig = {
				port: 8080,
				debug: true
			}
			
			const result = merge(defaultConfig)(userConfig)  // apply defaults to user config
			expect(result).toEqual({
				port: 8080,  // user config wins
				host: "localhost",  // from defaults
				debug: true,  // user config wins
				timeout: 5000  // from defaults
			})
		})

		it("creates object with defaults", () => {
			const createUser = merge({
				role: "user",
				active: true,
				createdAt: new Date("2024-01-01")
			})
			
			const admin = createUser({
				name: "Admin",
				email: "admin@example.com",
				role: "admin"
			})
			
			expect(admin.role).toBe("admin")
			expect(admin.active).toBe(true)
			expect(admin.createdAt).toEqual(new Date("2024-01-01"))
		})

		it("combines multiple configuration sources", () => {
			const defaults = { theme: "light", fontSize: 14, showGrid: true }
			const userPrefs = { theme: "dark", fontSize: 16 }
			const sessionOverrides = { showGrid: false }
			
			const finalConfig = merge(defaults, userPrefs, sessionOverrides)({})
			
			expect(finalConfig).toEqual({
				theme: "dark",
				fontSize: 16,
				showGrid: false
			})
		})
	})
})