import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import groupBy from "../../unsafe/array/groupBy/index.ts"

describe("groupBy", () => {
	describe("basic grouping", () => {
		it("groups by property value", () => {
			const people = [
				{ name: "Alice", age: 30 },
				{ name: "Bob", age: 25 },
				{ name: "Charlie", age: 30 }
			]
			const result = groupBy((p: typeof people[0]) => p.age)(people)
			expect(result).toEqual({
				"25": [{ name: "Bob", age: 25 }],
				"30": [
					{ name: "Alice", age: 30 },
					{ name: "Charlie", age: 30 }
				]
			})
		})

		it("groups by computed value", () => {
			const result = groupBy((x: number) => x % 2 === 0 ? "even" : "odd")([1, 2, 3, 4, 5])
			expect(result).toEqual({
				odd: [1, 3, 5],
				even: [2, 4]
			})
		})

		it("groups strings by length", () => {
			const result = groupBy((s: string) => s.length)(["a", "bb", "ccc", "dd", "e"])
			expect(result).toEqual({
				"1": ["a", "e"],
				"2": ["bb", "dd"],
				"3": ["ccc"]
			})
		})
	})

	describe("key conversion", () => {
		it("converts numeric keys to strings", () => {
			const result = groupBy((x: number) => x)([1, 2, 1, 3, 2])
			expect(result).toEqual({
				"1": [1, 1],
				"2": [2, 2],
				"3": [3]
			})
		})

		it("handles boolean keys", () => {
			const result = groupBy((x: number) => x > 0)([1, -1, 2, -2, 0])
			expect(result).toEqual({
				"true": [1, 2],
				"false": [-1, -2, 0]
			})
		})

		it("handles null and undefined keys", () => {
			const result = groupBy((x: { val?: number }) => x.val)([
				{ val: 1 },
				{ val: undefined },
				{ val: null },
				{ val: 1 }
			])
			expect(result["1"]).toEqual([{ val: 1 }, { val: 1 }])
			expect(result["undefined"]).toEqual([{ val: undefined }])
			expect(result["null"]).toEqual([{ val: null }])
		})
	})

	describe("order preservation", () => {
		it("maintains original order within groups", () => {
			const items = [
				{ id: 1, type: "A" },
				{ id: 2, type: "B" },
				{ id: 3, type: "A" },
				{ id: 4, type: "B" },
				{ id: 5, type: "A" }
			]
			const result = groupBy((item: typeof items[0]) => item.type)(items)
			expect(result.A.map(i => i.id)).toEqual([1, 3, 5])
			expect(result.B.map(i => i.id)).toEqual([2, 4])
		})
	})

	describe("edge cases", () => {
		it("handles empty array", () => {
			const result = groupBy((x: number) => x)([])
			expect(result).toEqual({})
		})

		it("handles null input", () => {
			const result = groupBy((x: number) => x)(null)
			expect(result).toEqual({})
		})

		it("handles undefined input", () => {
			const result = groupBy((x: number) => x)(undefined)
			expect(result).toEqual({})
		})

		it("handles single element", () => {
			const result = groupBy((x: number) => "single")([42])
			expect(result).toEqual({ single: [42] })
		})

		it("groups all into single key", () => {
			const result = groupBy(() => "all")([1, 2, 3, 4])
			expect(result).toEqual({ all: [1, 2, 3, 4] })
		})
	})

	describe("complex scenarios", () => {
		it("groups by first letter", () => {
			const words = ["apple", "apricot", "banana", "cherry", "cantaloupe"]
			const result = groupBy((s: string) => s[0].toUpperCase())(words)
			expect(result).toEqual({
				A: ["apple", "apricot"],
				B: ["banana"],
				C: ["cherry", "cantaloupe"]
			})
		})

		it("groups dates by year", () => {
			const dates = [
				new Date("2023-01-15"),
				new Date("2024-06-20"),
				new Date("2023-12-25"),
				new Date("2024-03-10")
			]
			const result = groupBy((d: Date) => d.getFullYear())(dates)
			expect(Object.keys(result)).toContain("2023")
			expect(Object.keys(result)).toContain("2024")
			expect(result["2023"]).toHaveLength(2)
			expect(result["2024"]).toHaveLength(2)
		})
	})

	describe("partial application", () => {
		it("allows reusable groupers", () => {
			const groupByType = groupBy((item: { type: string }) => item.type)
			
			const result1 = groupByType([
				{ type: "A", value: 1 },
				{ type: "B", value: 2 },
				{ type: "A", value: 3 }
			])
			expect(result1.A).toHaveLength(2)
			expect(result1.B).toHaveLength(1)
			
			const result2 = groupByType([
				{ type: "X", data: "foo" },
				{ type: "Y", data: "bar" }
			])
			expect(result2.X).toHaveLength(1)
			expect(result2.Y).toHaveLength(1)
		})
	})

	describe("property-based tests", () => {
		it("all elements appear in exactly one group", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const result = groupBy((x: number) => x % 3)(arr)
						const grouped = Object.values(result).flat()
						expect(grouped.length).toBe(arr.length)
						
						// Check each element appears exactly once
						for (const elem of arr) {
							const count = grouped.filter(x => x === elem).length
							expect(count).toBe(1)
						}
					}
				)
			)
		})

		it("groups are non-empty", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 })),
					(arr) => {
						if (arr.length === 0) return true
						
						const result = groupBy((x: number) => x)(arr)
						for (const group of Object.values(result)) {
							expect(group.length).toBeGreaterThan(0)
						}
					}
				)
			)
		})

		it("preserves element values", () => {
			fc.assert(
				fc.property(
					fc.array(fc.object()),
					(arr) => {
						const result = groupBy(() => "all")(arr)
						if (arr.length > 0) {
							expect(result.all).toEqual(arr)
						}
					}
				)
			)
		})
	})
})