import { assertEquals } from "jsr:@std/assert@1.0.9"
import { describe, it } from "jsr:@std/testing@1.0.7/bdd"
import * as fc from "npm:fast-check@3.23.1"

import zipObj from "../../../../src/simple/array/zipObj/index.ts"

describe("zipObj", () => {
	describe("behavioral tests", () => {
		it("should create object from arrays of same length", () => {
			assertEquals(
				zipObj([1, 2, 3])(["a", "b", "c"]),
				{ a: 1, b: 2, c: 3 },
			)
		})

		it("should handle more keys than values", () => {
			assertEquals(
				zipObj([1, 2])(["a", "b", "c", "d"]),
				{ a: 1, b: 2, c: undefined, d: undefined },
			)
		})

		it("should handle more values than keys (extra values ignored)", () => {
			assertEquals(
				zipObj([1, 2, 3, 4, 5])(["x", "y", "z"]),
				{ x: 1, y: 2, z: 3 },
			)
		})

		it("should create configuration object from arrays", () => {
			const settingNames = ["theme", "fontSize", "autoSave", "notifications"]
			const settingValues = ["dark", 14, true, false] as const
			assertEquals(
				zipObj(settingValues)(settingNames),
				{ theme: "dark", fontSize: 14, autoSave: true, notifications: false },
			)
		})

		it("should handle numeric keys", () => {
			assertEquals(
				zipObj(["a", "b", "c"])([1, 2, 3]),
				{ 1: "a", 2: "b", 3: "c" },
			)
		})

		it("should handle mixed string and numeric keys", () => {
			const keys: Array<string | number> = ["name", 42, "age", 100]
			const values = ["Alice", "answer", 30, "percent"]
			assertEquals(
				zipObj(values)(keys),
				{ name: "Alice", 42: "answer", age: 30, 100: "percent" },
			)
		})

		it("should handle duplicate keys (last value wins)", () => {
			assertEquals(
				zipObj([1, 2, 3, 4])(["a", "b", "a", "b"]),
				{ a: 3, b: 4 }, // Later values override earlier ones
			)
		})

		it("should handle different types of values", () => {
			const values: Array<any> = [
				null,
				undefined,
				true,
				42,
				"string",
				{ obj: true },
				[1, 2, 3],
			]
			const keys = ["null", "undef", "bool", "num", "str", "obj", "arr"]
			assertEquals(
				zipObj(values)(keys),
				{
					null: null,
					undef: undefined,
					bool: true,
					num: 42,
					str: "string",
					obj: { obj: true },
					arr: [1, 2, 3],
				},
			)
		})

		it("should handle symbols as values", () => {
			const sym1 = Symbol("a")
			const sym2 = Symbol("b")
			const result = zipObj([sym1, sym2])(["first", "second"])
			assertEquals(result.first, sym1)
			assertEquals(result.second, sym2)
		})

		it("should handle dates as values", () => {
			const date1 = new Date("2024-01-01")
			const date2 = new Date("2024-12-31")
			assertEquals(
				zipObj([date1, date2])(["start", "end"]),
				{ start: date1, end: date2 },
			)
		})

		it("should handle functions as values", () => {
			const fn1 = () => 1
			const fn2 = () => 2
			const result = zipObj([fn1, fn2])(["first", "second"])
			assertEquals(result.first, fn1)
			assertEquals(result.second, fn2)
		})

		it("should handle empty keys array", () => {
			assertEquals(zipObj([1, 2, 3])([]), {})
		})

		it("should handle empty values array", () => {
			assertEquals(
				zipObj([])(["a", "b", "c"]),
				{ a: undefined, b: undefined, c: undefined },
			)
		})

		it("should handle both empty arrays", () => {
			assertEquals(zipObj([])([]), {})
		})

		it("should handle null and undefined inputs", () => {
			assertEquals(zipObj([1, 2, 3])(null), {})
			assertEquals(zipObj([1, 2, 3])(undefined), {})
			assertEquals(
				zipObj(null)(["a", "b"]),
				{ a: undefined, b: undefined },
			)
			assertEquals(
				zipObj(undefined)(["a", "b"]),
				{ a: undefined, b: undefined },
			)
			assertEquals(zipObj(null)(null), {})
			assertEquals(zipObj(undefined)(undefined), {})
		})

		it("should handle non-array inputs", () => {
			assertEquals(zipObj([1, 2])("not an array" as any), {})
			assertEquals(zipObj("not an array" as any)(["a", "b"]), { a: undefined, b: undefined })
			assertEquals(zipObj([1, 2])(123 as any), {})
			assertEquals(zipObj([1, 2])({} as any), {})
		})

		it("should preserve original arrays", () => {
			const keys = ["a", "b", "c"]
			const values = [1, 2, 3]
			const result = zipObj(values)(keys)
			assertEquals(result, { a: 1, b: 2, c: 3 })
			assertEquals(keys, ["a", "b", "c"]) // Unchanged
			assertEquals(values, [1, 2, 3]) // Unchanged
		})

		it("should handle single element arrays", () => {
			assertEquals(zipObj([42])(["answer"]), { answer: 42 })
		})

		it("should handle special numeric values", () => {
			assertEquals(
				zipObj([Infinity, -Infinity, NaN, 0, -0])(["inf", "negInf", "nan", "zero", "negZero"]),
				{
					inf: Infinity,
					negInf: -Infinity,
					nan: NaN,
					zero: 0,
					negZero: -0,
				},
			)
		})

		it("should be curried", () => {
			const zipWithColors = zipObj(["red", "green", "blue"])
			assertEquals(
				zipWithColors(["r", "g", "b"]),
				{ r: "red", g: "green", b: "blue" },
			)
			assertEquals(
				zipWithColors(["color1", "color2"]),
				{ color1: "red", color2: "green" },
			)
		})

		it("should handle nested objects and arrays as values", () => {
			const values = [
				{ nested: { deep: true } },
				[1, [2, [3]]],
				new Map([["key", "value"]]),
			]
			const keys = ["obj", "arr", "map"]
			const result = zipObj(values)(keys)
			assertEquals(result.obj, { nested: { deep: true } })
			assertEquals(result.arr, [1, [2, [3]]])
			assertEquals(result.map instanceof Map, true)
		})

		it("should handle very long arrays", () => {
			const keys = Array(1000).fill(0).map((_, i) => `key${i}`)
			const values = Array(1000).fill(0).map((_, i) => i)
			const result = zipObj(values)(keys)
			assertEquals(Object.keys(result).length, 1000)
			assertEquals(result.key0, 0)
			assertEquals(result.key999, 999)
		})

		it("should handle sparse arrays", () => {
			const sparseKeys = ["a", , "c", , "e"] as const
			const sparseValues = [1, , 3, , 5] as const
			const result = zipObj(sparseValues)(sparseKeys)
			assertEquals(result.a, 1)
			assertEquals(result.c, 3)
			assertEquals(result.e, 5)
			assertEquals("undefined" in result, true) // Sparse elements become "undefined" key
		})
	})

	describe("property-based tests", () => {
		it("should have at most as many properties as keys", () => {
			fc.assert(
				fc.property(
					fc.array(fc.string()),
					fc.array(fc.integer()),
					(keys, values) => {
						const result = zipObj(values)(keys)
						const uniqueKeys = new Set(keys)
						return Object.keys(result).length <= uniqueKeys.size
					},
				),
			)
		})

		it("should preserve all unique keys", () => {
			fc.assert(
				fc.property(
					fc.uniqueArray(fc.string()),
					fc.array(fc.integer()),
					(keys, values) => {
						const result = zipObj(values)(keys)
						return keys.every((key) => key in result)
					},
				),
			)
		})

		it("should map keys to correct values by index", () => {
			fc.assert(
				fc.property(
					fc.uniqueArray(fc.string()),
					fc.array(fc.integer()),
					(keys, values) => {
						const result = zipObj(values)(keys)
						for (let i = 0; i < keys.length; i++) {
							const expected = i < values.length ? values[i] : undefined
							if (result[keys[i]] !== expected) {
								return false
							}
						}
						return true
					},
				),
			)
		})

		it("should produce empty object for empty or null keys", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(values) => {
						const withEmpty = zipObj(values)([])
						const withNull = zipObj(values)(null)
						const withUndefined = zipObj(values)(undefined)
						return Object.keys(withEmpty).length === 0 &&
							Object.keys(withNull).length === 0 &&
							Object.keys(withUndefined).length === 0
					},
				),
			)
		})

		it("should fill missing values with undefined", () => {
			fc.assert(
				fc.property(
					fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
					(keys) => {
						const result = zipObj([])(keys)
						return Object.values(result).every((v) => v === undefined)
					},
				),
			)
		})

		it("should be reversible with Object.entries for unique keys", () => {
			fc.assert(
				fc.property(
					fc.uniqueArray(fc.string(), { minLength: 1, maxLength: 10 }),
					fc.array(fc.integer()),
					(keys, values) => {
						const obj = zipObj(values)(keys)
						const entries = Object.entries(obj)
						
						// Reconstruct keys and values from object
						const reconstructedKeys = entries.map(([k]) => k)
						const reconstructedValues = entries.map(([, v]) => v)

						// Check keys match (order might differ)
						const keysSet = new Set(keys)
						const reconstructedSet = new Set(reconstructedKeys)
						if (keysSet.size !== reconstructedSet.size) return false
						for (const key of keys) {
							if (!reconstructedSet.has(key)) return false
						}

						// Check values match up to keys length
						const expectedLength = Math.min(keys.length, values.length)
						for (let i = 0; i < expectedLength; i++) {
							const keyIndex = reconstructedKeys.indexOf(keys[i])
							if (reconstructedValues[keyIndex] !== values[i]) return false
						}

						return true
					},
				),
			)
		})
	})

	describe("JSDoc examples", () => {
		it("should match basic usage example", () => {
			assertEquals(
				zipObj([1, 2, 3])(["a", "b", "c"]),
				{ a: 1, b: 2, c: 3 },
			)
		})

		it("should match more keys than values example", () => {
			assertEquals(
				zipObj([1, 2])(["a", "b", "c", "d"]),
				{ a: 1, b: 2, c: undefined, d: undefined },
			)
		})

		it("should match more values than keys example", () => {
			assertEquals(
				zipObj([1, 2, 3, 4, 5])(["x", "y", "z"]),
				{ x: 1, y: 2, z: 3 },
			)
		})

		it("should match configuration object example", () => {
			const settingNames = ["theme", "fontSize", "autoSave", "notifications"]
			const settingValues = ["dark", 14, true, false] as const
			assertEquals(
				zipObj(settingValues)(settingNames),
				{ theme: "dark", fontSize: 14, autoSave: true, notifications: false },
			)
		})

		it("should match null/undefined handling examples", () => {
			assertEquals(zipObj([1, 2, 3])(null), {})
			assertEquals(zipObj(null)(["a", "b"]), { a: undefined, b: undefined })
		})
	})
})