import * as fc from "fast-check"
import { assert, assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import groupBy from "../../../../src/simple/array/groupBy/index.ts"

describe("groupBy", () => {
	it("groups objects by property", () => {
		const people = [
			{ name: "Alice", age: 30 },
			{ name: "Bob", age: 25 },
			{ name: "Charlie", age: 30 },
		]
		const result = groupBy((p: { name: string; age: number }) => p.age)(
			people,
		)
		assertEquals(result["25"], [{ name: "Bob", age: 25 }])
		assertEquals(result["30"], [
			{ name: "Alice", age: 30 },
			{ name: "Charlie", age: 30 },
		])
	})

	it("groups numbers by even/odd", () => {
		const isEven = (x: number) => x % 2 === 0 ? "even" : "odd"
		const result = groupBy(isEven)([1, 2, 3, 4, 5])
		assertEquals(result.odd, [1, 3, 5])
		assertEquals(result.even, [2, 4])
	})

	it("handles empty array", () => {
		const result = groupBy((x: number) => x)([])
		assertEquals(result, {})
	})

	it("handles null input", () => {
		const result = groupBy((x: number) => x)(null)
		assertEquals(result, {})
	})

	it("handles undefined input", () => {
		const result = groupBy((x: number) => x)(undefined)
		assertEquals(result, {})
	})

	it("groups single element", () => {
		const result = groupBy((x: number) => x)([42])
		assertEquals(result, { "42": [42] })
	})

	it("groups all elements to same key", () => {
		const result = groupBy(() => "same")([1, 2, 3, 4])
		assertEquals(result, { same: [1, 2, 3, 4] })
	})

	it("groups all elements to different keys", () => {
		const result = groupBy((x: number) => x)([1, 2, 3])
		assertEquals(result, { "1": [1], "2": [2], "3": [3] })
	})

	it("converts numeric keys to strings", () => {
		const result = groupBy((x: number) => x % 10)([5, 15, 25])
		assertEquals(result["5"], [5, 15, 25])
		assert(typeof Object.keys(result)[0] === "string")
	})

	it("groups strings by length", () => {
		const result = groupBy((s: string) => s.length)([
			"a",
			"bb",
			"ccc",
			"dd",
			"e",
		])
		assertEquals(result, {
			"1": ["a", "e"],
			"2": ["bb", "dd"],
			"3": ["ccc"],
		})
	})

	it("groups strings by first character", () => {
		const result = groupBy((s: string) => s[0])([
			"apple",
			"banana",
			"apricot",
			"berry",
		])
		assertEquals(result, {
			"a": ["apple", "apricot"],
			"b": ["banana", "berry"],
		})
	})

	it("handles special values as keys", () => {
		const result = groupBy((x: any) => x)(
			[null, undefined, NaN, true, false],
		)
		assertEquals(result["null"], [null])
		assertEquals(result["undefined"], [undefined])
		assertEquals(result["NaN"], [NaN])
		assertEquals(result["true"], [true])
		assertEquals(result["false"], [false])
	})

	it("preserves element order within groups", () => {
		const data = [
			{ id: 1, type: "a" },
			{ id: 2, type: "b" },
			{ id: 3, type: "a" },
			{ id: 4, type: "b" },
			{ id: 5, type: "a" },
		]
		const result = groupBy((x: { id: number; type: string }) => x.type)(
			data,
		)
		assertEquals(result.a, [
			{ id: 1, type: "a" },
			{ id: 3, type: "a" },
			{ id: 5, type: "a" },
		])
		assertEquals(result.b, [
			{ id: 2, type: "b" },
			{ id: 4, type: "b" },
		])
	})

	it("groups dates by year", () => {
		const dates = [
			new Date("2023-01-15"),
			new Date("2024-06-20"),
			new Date("2023-12-25"),
			new Date("2024-03-10"),
		]
		const result = groupBy((d: Date) => d.getFullYear())(dates)
		assertEquals(result["2023"].length, 2)
		assertEquals(result["2024"].length, 2)
	})

	it("groups with computed keys", () => {
		const result = groupBy((n: number) => {
			if (n < 0) return "negative"
			if (n === 0) return "zero"
			return "positive"
		})([-2, -1, 0, 1, 2, 3])
		assertEquals(result.negative, [-2, -1])
		assertEquals(result.zero, [0])
		assertEquals(result.positive, [1, 2, 3])
	})

	it("is curried", () => {
		const groupByType = groupBy((x: { type: string; value: number }) => x.type)
		assert(typeof groupByType === "function")

		const data1 = [{ type: "A", value: 1 }]
		const data2 = [{ type: "B", value: 2 }]

		assertEquals(groupByType(data1), { "A": [{ type: "A", value: 1 }] })
		assertEquals(groupByType(data2), { "B": [{ type: "B", value: 2 }] })
	})

	it("handles arrays with mixed types", () => {
		const mixed = [1, "a", 2, "b", 3, "c"]
		const result = groupBy((x: any) => typeof x)(mixed)
		assertEquals(result.number, [1, 2, 3])
		assertEquals(result.string, ["a", "b", "c"])
	})

	it("handles large arrays efficiently", () => {
		const largeArray = Array.from({ length: 10000 }, (_, i) => ({
			id: i,
			group: i % 100,
		}))
		const result = groupBy((x: { group: number }) => x.group)(largeArray)
		assertEquals(Object.keys(result).length, 100)
		// Each group should have 100 items
		Object.values(result).forEach((group) => {
			assertEquals(group.length, 100)
		})
	})

	it("handles symbols converted to strings", () => {
		const sym = Symbol("test")
		const result = groupBy(() => sym as any)([1, 2, 3])
		assertEquals(result["Symbol(test)"], [1, 2, 3])
	})

	it("groups by boolean values", () => {
		const result = groupBy((n: number) => n > 0 ? "positive" : "non-positive")([
			1,
			-1,
			2,
			-2,
			0,
		])
		assertEquals(result["positive"], [1, 2])
		assertEquals(result["non-positive"], [-1, -2, 0])
	})

	it("handles prototype property names as keys", () => {
		// These are property names that exist on Object.prototype
		const result1 = groupBy(() => "toString")([1, 2, 3])
		assertEquals(result1["toString"], [1, 2, 3])

		const result2 = groupBy(() => "valueOf")([1, 2])
		assertEquals(result2["valueOf"], [1, 2])

		const result3 = groupBy(() => "constructor")([1])
		assertEquals(result3["constructor"], [1])

		const result4 = groupBy(() => "hasOwnProperty")([1, 2])
		assertEquals(result4["hasOwnProperty"], [1, 2])
	})

	// Property-based tests
	describe("property tests", () => {
		it("all elements are preserved in groups", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.string()),
					(arr, keyFn) => {
						const grouped = groupBy(keyFn)(arr)
						const allElements = Object.values(grouped).flat()
						assertEquals(allElements.length, arr.length)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("groups are disjoint (no element in multiple groups)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const grouped = groupBy((x: number) => x % 3)(arr)
						const groups = Object.values(grouped)

						// Check each element appears exactly once across all groups
						arr.forEach((element) => {
							const appearances = groups.filter((group) =>
								group.includes(element)
							).length
							assertEquals(appearances, appearances > 0 ? 1 : 0)
						})
					},
				),
				{ numRuns: 100 },
			)
		})

		it("empty array produces empty object", () => {
			fc.assert(
				fc.property(
					fc.func(fc.string()),
					(keyFn) => {
						const result = groupBy(keyFn)([])
						assertEquals(result, {})
					},
				),
				{ numRuns: 50 },
			)
		})

		it("constant key function groups all elements together", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					fc.string(),
					(arr, constantKey) => {
						const result = groupBy(() => constantKey)(arr)
						assertEquals(Object.keys(result).length, 1)
						assertEquals(result[String(constantKey)], arr)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("identity function creates singleton groups", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 })),
					(arr) => {
						// Use unique array to ensure identity creates singletons
						const unique = Array.from(new Set(arr))
						const result = groupBy((x: number) => x)(unique)

						Object.values(result).forEach((group) => {
							assertEquals(group.length, 1)
						})
						assertEquals(Object.keys(result).length, unique.length)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("preserves relative order within groups", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.tuple(fc.integer(), fc.integer({ min: 0, max: 5 })),
					),
					(pairs) => {
						const result = groupBy((p: [number, number]) => p[1])(
							pairs,
						)

						Object.values(result).forEach((group) => {
							// Check that indices in original array are increasing
							const indices = group.map((item) => pairs.indexOf(item))
							for (let i = 1; i < indices.length; i++) {
								assert(indices[i] > indices[i - 1])
							}
						})
					},
				),
				{ numRuns: 100 },
			)
		})
	})
})
