import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import path from "../../../object/path/index.ts"
import pathOr from "../../../object/pathOr/index.ts"

describe("Object Accessing Behaviors", () => {
	describe("when accessing nested properties with path", () => {
		const testObj = {
			user: {
				name: "Alice",
				address: {
					city: "New York",
					zip: "10001",
				},
				hobbies: ["reading", "coding", "hiking"],
			},
			settings: {
				theme: "dark",
				notifications: true,
			},
		}

		it("accesses nested property with dot notation", () => {
			const result = path("user.name")(testObj)
			expect(result).toBe("Alice")
		})

		it("accesses deeply nested property", () => {
			const result = path("user.address.city")(testObj)
			expect(result).toBe("New York")
		})

		it("accesses array elements", () => {
			const result = path("user.hobbies.0")(testObj)
			expect(result).toBe("reading")
		})

		it("returns undefined for non-existent path", () => {
			const result = path("user.phone")(testObj)
			expect(result).toBeUndefined()
		})

		it("returns undefined for invalid deep path", () => {
			const result = path("user.address.country.name")(testObj)
			expect(result).toBeUndefined()
		})

		it("handles array path notation", () => {
			const result = path(["user", "address", "city"])(testObj)
			expect(result).toBe("New York")
		})

		it("handles numeric keys in arrays", () => {
			const result = path(["user", "hobbies", 1])(testObj)
			expect(result).toBe("coding")
		})

		it("returns undefined for null/undefined object", () => {
			expect(path("any.path")(null)).toBeUndefined()
			expect(path("any.path")(undefined)).toBeUndefined()
		})

		it("handles empty path", () => {
			const result = path("")(testObj)
			expect(result).toBe(testObj)
		})

		it("handles root level properties", () => {
			const result = path("settings")(testObj)
			expect(result).toEqual({ theme: "dark", notifications: true })
		})

		it("works with arrays", () => {
			const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
			expect(path("1.id")(arr)).toBe(2)
			expect(path([2, "id"])(arr)).toBe(3)
		})

		it("handles special characters in keys", () => {
			const obj = { "key.with.dots": "value", "key[with]brackets": "another" }
			expect(path(["key.with.dots"])(obj)).toBe("value")
			expect(path(["key[with]brackets"])(obj)).toBe("another")
		})
	})

	describe("when accessing with default value using pathOr", () => {
		const testObj = {
			user: {
				name: "Bob",
				age: 30,
				preferences: {
					color: "blue",
				},
			},
		}

		it("returns value when path exists", () => {
			const result = pathOr("user.name")("default")(testObj)
			expect(result).toBe("Bob")
		})

		it("returns default when path doesn't exist", () => {
			const result = pathOr("user.email")("unknown")(testObj)
			expect(result).toBe("unknown")
		})

		it("returns default for deeply nested missing path", () => {
			const result = pathOr("user.preferences.theme")("red")(testObj)
			expect(result).toBe("red")
		})

		it("returns default for null/undefined object", () => {
			expect(pathOr("any.path")("default")(null)).toBe("default")
			expect(pathOr("any.path")("default")(undefined)).toBe("default")
		})

		it("handles array paths with default", () => {
			const result = pathOr(["user", "hobbies", 0])("default")(testObj)
			expect(result).toBe("default")
		})

		it("returns actual value even if falsy", () => {
			const obj = { flag: false, count: 0, text: "" }
			expect(pathOr("flag")(true)(obj)).toBe(false)
			expect(pathOr("count")(10)(obj)).toBe(0)
			expect(pathOr("text")("default")(obj)).toBe("")
		})

		it("handles different default types", () => {
			expect(pathOr("missing")(0)({})).toBe(0)
			expect(pathOr("missing")([])({})).toEqual([])
			expect(pathOr("missing")({})({})).toEqual({})
			expect(pathOr("missing")(null)({})).toBeNull()
		})

		it("works with complex default values", () => {
			const defaultUser = { name: "Guest", role: "visitor" }
			const result = pathOr("currentUser")(defaultUser)({})
			expect(result).toEqual(defaultUser)
		})

		it("handles empty path with default", () => {
			const result = pathOr("")("default")(testObj)
			expect(result).toBe(testObj)
		})

		it("handles numeric paths in arrays", () => {
			const arr = ["a", "b", "c"]
			expect(pathOr("1")("default")(arr)).toBe("b")
			expect(pathOr("5")("default")(arr)).toBe("default")
		})
	})

	describe("path edge cases", () => {
		it("handles objects with null prototype", () => {
			const obj = Object.create(null)
			obj.key = "value"
			expect(path("key")(obj)).toBe("value")
			expect(path("missing")(obj)).toBeUndefined()
		})

		it("doesn't access prototype properties", () => {
			const obj = { own: "property" }
			expect(path("toString")(obj)).toBeUndefined()
			expect(path("constructor")(obj)).toBeUndefined()
			expect(path("own")(obj)).toBe("property")
		})

		it("handles circular references safely", () => {
			const obj: any = { a: { b: {} } }
			obj.a.b.c = obj
			expect(path("a.b")(obj)).toBeDefined()
			expect(path("a.b.c.a.b")(obj)).toBeDefined()
		})

		it("handles mixed nesting types", () => {
			const mixed = {
				arr: [{ nested: { value: 42 } }],
				obj: { arr: [1, 2, 3] },
			}
			expect(path("arr.0.nested.value")(mixed)).toBe(42)
			expect(path("obj.arr.1")(mixed)).toBe(2)
		})
	})

	describe("property-based tests", () => {
		describe("path function properties", () => {
			it("returns undefined for non-existent paths", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					(obj, nonExistentKey) => {
						fc.pre(!obj.hasOwnProperty(nonExistentKey))
						const result = path(nonExistentKey)(obj)
						expect(result).toBeUndefined()
					}
				))
			})

			it("returns correct value for existing top-level properties", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.anything(),
					(key, value) => {
						const obj = { [key]: value }
						const result = path(key)(obj)
						expect(result).toBe(value)
					}
				))
			})

			it("handles array notation consistently", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.anything(),
					(key, value) => {
						const obj = { [key]: value }
						
						// Both string and array notation should work the same
						const stringResult = path(key)(obj)
						const arrayResult = path([key])(obj)
						
						expect(stringResult).toBe(arrayResult)
					}
				))
			})

			it("handles nested object access correctly", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.anything(),
					(key1, key2, value) => {
						fc.pre(key1 !== key2)
						const obj = { [key1]: { [key2]: value } }
						
						const dotResult = path(`${key1}.${key2}`)(obj)
						const arrayResult = path([key1, key2])(obj)
						
						expect(dotResult).toBe(value)
						expect(arrayResult).toBe(value)
						expect(dotResult).toBe(arrayResult)
					}
				))
			})

			it("returns undefined for null/undefined inputs", () => {
				fc.assert(fc.property(
					fc.string(),
					(pathStr) => {
						expect(path(pathStr)(null)).toBeUndefined()
						expect(path(pathStr)(undefined)).toBeUndefined()
					}
				))
			})

			it("handles array indices correctly", () => {
				fc.assert(fc.property(
					fc.array(fc.anything(), { minLength: 1, maxLength: 10 }),
					(arr) => {
						for (let i = 0; i < arr.length; i++) {
							expect(path(String(i))(arr)).toBe(arr[i])
							expect(path([i])(arr)).toBe(arr[i])
						}
					}
				))
			})
		})

		describe("pathOr function properties", () => {
			it("returns default for non-existent paths", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.anything(),
					(obj, nonExistentKey, defaultValue) => {
						fc.pre(!obj.hasOwnProperty(nonExistentKey))
						const result = pathOr(nonExistentKey)(defaultValue)(obj)
						expect(result).toBe(defaultValue)
					}
				))
			})

			it("returns actual value when path exists", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.anything().filter(v => v !== undefined),
					fc.anything(),
					(key, value, defaultValue) => {
						fc.pre(value !== defaultValue)
						const obj = { [key]: value }
						const result = pathOr(key)(defaultValue)(obj)
						expect(result).toBe(value)
					}
				))
			})

			it("returns actual value even when falsy", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.oneof(fc.constant(false), fc.constant(0), fc.constant(""), fc.constant(null)),
					fc.anything(),
					(key, falsyValue, defaultValue) => {
						fc.pre(falsyValue !== defaultValue)
						const obj = { [key]: falsyValue }
						const result = pathOr(key)(defaultValue)(obj)
						expect(result).toBe(falsyValue)
					}
				))
			})

			it("returns default for null/undefined inputs", () => {
				fc.assert(fc.property(
					fc.string(),
					fc.anything(),
					(pathStr, defaultValue) => {
						expect(pathOr(pathStr)(defaultValue)(null)).toBe(defaultValue)
						expect(pathOr(pathStr)(defaultValue)(undefined)).toBe(defaultValue)
					}
				))
			})

			it("pathOr behavior matches path with fallback", () => {
				fc.assert(fc.property(
					fc.object(),
					fc.string(),
					fc.anything(),
					(obj, pathStr, defaultValue) => {
						const pathResult = path(pathStr)(obj)
						const pathOrResult = pathOr(pathStr)(defaultValue)(obj)
						
						if (pathResult === undefined) {
							expect(pathOrResult).toBe(defaultValue)
						} else {
							expect(pathOrResult).toBe(pathResult)
						}
					}
				))
			})
		})

		describe("consistency properties", () => {
			it("path and pathOr are consistent for existing values", () => {
				fc.assert(fc.property(
					fc.record({
						key: fc.string().filter(s => s.length > 0 && !s.includes('.')),
						value: fc.anything().filter(v => v !== undefined),
						default: fc.anything()
					}),
					({ key, value, default: defaultValue }) => {
						const obj = { [key]: value }
						
						const pathResult = path(key)(obj)
						const pathOrResult = pathOr(key)(defaultValue)(obj)
						
						expect(pathResult).toBe(value)
						expect(pathOrResult).toBe(value)
						expect(pathResult).toBe(pathOrResult)
					}
				))
			})

			it("empty path returns the object itself", () => {
				fc.assert(fc.property(
					fc.object(),
					(obj) => {
						expect(path("")(obj)).toBe(obj)
						expect(path([])(obj)).toBe(obj)
					}
				))
			})

			it("path operations are safe with prototype pollution attempts", () => {
				// Test with an object that doesn't have these as own properties
				const obj = { normalProp: "value", nested: { prop: "nested value" } }
				
				// These should not access prototype properties
				expect(path("constructor")(obj)).toBeUndefined()
				expect(path("toString")(obj)).toBeUndefined()
				expect(path("__proto__")(obj)).toBeUndefined()
				expect(path("prototype")(obj)).toBeUndefined()
				expect(path("valueOf")(obj)).toBeUndefined()
				expect(path("hasOwnProperty")(obj)).toBeUndefined()
				
				// But normal properties should work
				expect(path("normalProp")(obj)).toBe("value")
				expect(path("nested.prop")(obj)).toBe("nested value")
			})
		})

		describe("deep path properties", () => {
			it("deep paths work with nested objects", () => {
				fc.assert(fc.property(
					fc.array(fc.string().filter(s => s.length > 0 && !s.includes('.') && !s.includes('[') && !s.includes(']')), { minLength: 2, maxLength: 4 }),
					fc.anything().filter(v => v !== undefined),
					(keys, value) => {
						// Build nested object
						let obj: any = value
						for (let i = keys.length - 1; i >= 0; i--) {
							obj = { [keys[i]]: obj }
						}
						
						// Test dot notation
						const dotPath = keys.join('.')
						expect(path(dotPath)(obj)).toBe(value)
						
						// Test array notation
						expect(path(keys)(obj)).toBe(value)
						
						// Test pathOr
						expect(pathOr(dotPath)("default")(obj)).toBe(value)
						expect(pathOr(keys)("default")(obj)).toBe(value)
					}
				))
			})

			it("partial paths return intermediate objects", () => {
				fc.assert(fc.property(
					fc.array(fc.string().filter(s => s.length > 0 && !s.includes('.')), { minLength: 3, maxLength: 5 }),
					fc.anything(),
					(keys, value) => {
						// Build nested object
						let obj: any = value
						for (let i = keys.length - 1; i >= 0; i--) {
							obj = { [keys[i]]: obj }
						}
						
						// Test partial paths
						for (let i = 1; i < keys.length; i++) {
							const partialKeys = keys.slice(0, i)
							const partialPath = partialKeys.join('.')
							const result = path(partialPath)(obj)
							
							expect(result).toBeDefined()
							expect(typeof result).toBe("object")
						}
					}
				))
			})
		})

		describe("type preservation properties", () => {
			it("preserves data types correctly", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.oneof(
						fc.string(),
						fc.integer(),
						fc.boolean(),
						fc.array(fc.anything()),
						fc.object()
					),
					(key, value) => {
						const obj = { [key]: value }
						const result = path(key)(obj)
						
						expect(result).toBe(value)
						expect(typeof result).toBe(typeof value)
						
						if (Array.isArray(value)) {
							expect(Array.isArray(result)).toBe(true)
						}
					}
				))
			})

			it("handles different object types consistently", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.anything().filter(v => v !== undefined),
					(key, value) => {
						// Test with regular object
						const regularObj = { [key]: value }
						
						// Test with array (if key is numeric)
						const numKey = parseInt(key, 10)
						if (!isNaN(numKey) && numKey >= 0) {
							const arr: any[] = []
							arr[numKey] = value
							
							expect(path(key)(arr)).toBe(value)
							expect(path([numKey])(arr)).toBe(value)
						}
						
						expect(path(key)(regularObj)).toBe(value)
					}
				))
			})
		})

		describe("edge case properties", () => {
			it("handles objects with null prototype", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.anything().filter(v => v !== undefined),
					(key, value) => {
						const obj = Object.create(null)
						obj[key] = value
						
						expect(path(key)(obj)).toBe(value)
						expect(pathOr(key)("default")(obj)).toBe(value)
					}
				))
			})

			it("safely handles circular references", () => {
				fc.assert(fc.property(
					fc.string().filter(s => s.length > 0 && !s.includes('.')),
					fc.anything(),
					(key, value) => {
						const obj: any = { [key]: value }
						obj.self = obj // Create circular reference
						
						// Should still work for non-circular paths
						expect(path(key)(obj)).toBe(value)
						expect(path("self")(obj)).toBe(obj)
						
						// Should work for paths through circular reference
						expect(path(`self.${key}`)(obj)).toBe(value)
					}
				))
			})

			it("handles numeric string keys consistently", () => {
				fc.assert(fc.property(
					fc.integer({ min: 0, max: 100 }),
					fc.anything(),
					(numericKey, value) => {
						const stringKey = String(numericKey)
						
						const obj = { [stringKey]: value }
						const arr: any[] = []
						arr[numericKey] = value
						
						// Object access
						expect(path(stringKey)(obj)).toBe(value)
						expect(path([stringKey])(obj)).toBe(value)
						
						// Array access
						expect(path(stringKey)(arr)).toBe(value)
						expect(path([numericKey])(arr)).toBe(value)
						expect(path([stringKey])(arr)).toBe(value)
					}
				))
			})
		})
	})
})