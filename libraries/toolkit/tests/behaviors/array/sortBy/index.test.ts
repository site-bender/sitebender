import { assertEquals } from "jsr:@std/assert@1.0.9"
import { describe, it } from "jsr:@std/testing@1.0.7/bdd"
import * as fc from "npm:fast-check@3.23.1"

import sortBy from "../../../../src/simple/array/sortBy/index.ts"

describe("sortBy", () => {
	describe("behavioral tests", () => {
		it("should sort by numeric values", () => {
			const byAbs = sortBy(Math.abs)
			assertEquals(byAbs([-5, 3, -1, 4, -2]), [-1, -2, 3, 4, -5])
			assertEquals(byAbs([5, -3, 0, -1, 2]), [0, -1, 2, -3, 5])
		})

		it("should sort objects by property", () => {
			const users = [
				{ name: "Charlie", age: 30 },
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 35 },
			]
			const byAge = sortBy((u: { age: number }) => u.age)
			assertEquals(byAge(users), [
				{ name: "Alice", age: 25 },
				{ name: "Charlie", age: 30 },
				{ name: "Bob", age: 35 },
			])
		})

		it("should sort strings by length", () => {
			const byLength = sortBy((s: string) => s.length)
			assertEquals(
				byLength(["cat", "elephant", "dog", "a", "bird"]),
				["a", "cat", "dog", "bird", "elephant"],
			)
		})

		it("should sort by computed values", () => {
			const items = [
				{ price: 10, quantity: 5 }, // total: 50
				{ price: 20, quantity: 2 }, // total: 40
				{ price: 5, quantity: 12 }, // total: 60
			]
			const byTotal = sortBy((item: { price: number; quantity: number }) =>
				item.price * item.quantity
			)
			assertEquals(byTotal(items), [
				{ price: 20, quantity: 2 },
				{ price: 10, quantity: 5 },
				{ price: 5, quantity: 12 },
			])
		})

		it("should handle dates", () => {
			const events = [
				{ name: "Event C", date: new Date("2024-03-15") },
				{ name: "Event A", date: new Date("2024-01-01") },
				{ name: "Event B", date: new Date("2024-02-10") },
			]
			const byDate = sortBy((e: { date: Date }) => e.date.getTime())
			assertEquals(byDate(events), [
				{ name: "Event A", date: new Date("2024-01-01") },
				{ name: "Event B", date: new Date("2024-02-10") },
				{ name: "Event C", date: new Date("2024-03-15") },
			])
		})

		it("should handle strings alphabetically", () => {
			const byName = sortBy((s: string) => s)
			assertEquals(
				byName(["zebra", "apple", "mango", "banana"]),
				["apple", "banana", "mango", "zebra"],
			)
		})

		it("should maintain stability for equal keys", () => {
			const data = [
				{ id: 1, value: 10 },
				{ id: 2, value: 5 },
				{ id: 3, value: 10 },
				{ id: 4, value: 5 },
				{ id: 5, value: 10 },
			]
			const byValue = sortBy((x: { value: number }) => x.value)
			const result = byValue(data)

			// Check that items with the same value maintain their relative order
			assertEquals(result[0].id, 2) // First 5
			assertEquals(result[1].id, 4) // Second 5
			assertEquals(result[2].id, 1) // First 10
			assertEquals(result[3].id, 3) // Second 10
			assertEquals(result[4].id, 5) // Third 10
		})

		it("should handle negative numbers", () => {
			const byValue = sortBy((x: number) => x)
			assertEquals(byValue([3, -1, 4, -5, 2, 0]), [-5, -1, 0, 2, 3, 4])
		})

		it("should handle mixed numeric types", () => {
			const byValue = sortBy((x: number) => x)
			assertEquals(
				byValue([Infinity, 5, -Infinity, 0, -0, NaN, 2]),
				[-Infinity, 0, -0, 2, 5, Infinity, NaN],
			)
		})

		it("should handle booleans", () => {
			const items = [
				{ name: "A", active: true },
				{ name: "B", active: false },
				{ name: "C", active: true },
				{ name: "D", active: false },
			]
			const byActive = sortBy((x: { active: boolean }) => x.active)
			const result = byActive(items)
			// false < true in JS comparisons
			assertEquals(result[0].active, false)
			assertEquals(result[1].active, false)
			assertEquals(result[2].active, true)
			assertEquals(result[3].active, true)
		})

		it("should handle single element array", () => {
			const byValue = sortBy((x: number) => x)
			assertEquals(byValue([42]), [42])
		})

		it("should handle empty array", () => {
			const byValue = sortBy((x: number) => x)
			assertEquals(byValue([]), [])
		})

		it("should handle null and undefined", () => {
			const byValue = sortBy((x: number) => x)
			assertEquals(byValue(null), [])
			assertEquals(byValue(undefined), [])
		})

		it("should handle non-array inputs", () => {
			const byValue = sortBy((x: any) => x)
			assertEquals(byValue("not an array" as any), [])
			assertEquals(byValue(123 as any), [])
			assertEquals(byValue({} as any), [])
		})

		it("should preserve original array", () => {
			const original = [3, 1, 2]
			const byValue = sortBy((x: number) => x)
			const sorted = byValue(original)
			assertEquals(sorted, [1, 2, 3])
			assertEquals(original, [3, 1, 2]) // Original unchanged
		})

		it("should handle descending order via negation", () => {
			const descending = sortBy((x: number) => -x)
			assertEquals(descending([1, 3, 2, 5, 4]), [5, 4, 3, 2, 1])
		})

		it("should handle descending string length", () => {
			const byReverseLength = sortBy((s: string) => -s.length)
			assertEquals(
				byReverseLength(["a", "bb", "ccc", "dddd"]),
				["dddd", "ccc", "bb", "a"],
			)
		})

		it("should cache mapping function results", () => {
			let callCount = 0
			const mapper = (x: number) => {
				callCount++
				return x * x
			}
			const bySquare = sortBy(mapper)
			const result = bySquare([3, 1, 4, 2, 5])

			// Each element should be mapped exactly once
			assertEquals(callCount, 5)
			assertEquals(result, [1, 2, 3, 4, 5])
		})

		it("should handle complex nested sorting", () => {
			const data = [
				{ category: "B", priority: 2 },
				{ category: "A", priority: 1 },
				{ category: "B", priority: 1 },
				{ category: "A", priority: 2 },
			]
			// Sort by category, then by priority
			const byCategoryAndPriority = sortBy((x: { category: string; priority: number }) =>
				`${x.category}${x.priority}`
			)
			assertEquals(byCategoryAndPriority(data), [
				{ category: "A", priority: 1 },
				{ category: "A", priority: 2 },
				{ category: "B", priority: 1 },
				{ category: "B", priority: 2 },
			])
		})
	})

	describe("property-based tests", () => {
		it("should preserve array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const sorted = sortBy((x: number) => x)(arr)
						return sorted.length === arr.length
					},
				),
			)
		})

		it("should contain same elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const sorted = sortBy((x: number) => x)(arr)
						const originalSet = new Set(arr)
						const sortedSet = new Set(sorted)
						return originalSet.size === sortedSet.size &&
							[...originalSet].every((x) => sortedSet.has(x))
					},
				),
			)
		})

		it("should be in ascending order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const sorted = sortBy((x: number) => x)(arr)
						for (let i = 1; i < sorted.length; i++) {
							if (sorted[i] < sorted[i - 1]) {
								return false
							}
						}
						return true
					},
				),
			)
		})

		it("should be stable", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.record({
							id: fc.integer(),
							value: fc.integer({ min: 0, max: 5 }),
						}),
					),
					(arr) => {
						const sorted = sortBy((x: { value: number }) => x.value)(arr)
						// Check that items with equal values maintain relative order
						for (let i = 0; i < sorted.length - 1; i++) {
							for (let j = i + 1; j < sorted.length; j++) {
								if (sorted[i].value === sorted[j].value) {
									// Find original indices
									const origI = arr.indexOf(sorted[i])
									const origJ = arr.indexOf(sorted[j])
									if (origI > origJ) {
										return false // Order was reversed
									}
								}
							}
						}
						return true
					},
				),
			)
		})

		it("should be idempotent", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const sorter = sortBy((x: number) => x)
						const sorted1 = sorter(arr)
						const sorted2 = sorter(sorted1)
						return JSON.stringify(sorted1) === JSON.stringify(sorted2)
					},
				),
			)
		})
	})

	describe("JSDoc examples", () => {
		it("should match basic usage example", () => {
			assertEquals(
				sortBy(Math.abs)([-5, 3, -1, 4, -2]),
				[-1, -2, 3, 4, -5],
			)
		})

		it("should match sort objects by property example", () => {
			const users = [
				{ name: "Charlie", age: 30 },
				{ name: "Alice", age: 25 },
			]
			assertEquals(
				sortBy((u: { age: number }) => u.age)(users),
				[{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }],
			)
		})

		it("should match sort by string length example", () => {
			assertEquals(
				sortBy((s: string) => s.length)(["cat", "elephant", "dog"]),
				["cat", "dog", "elephant"],
			)
		})

		it("should match sort by computed value example", () => {
			const items = [
				{ price: 10, quantity: 5 },
				{ price: 20, quantity: 2 },
			]
			assertEquals(
				sortBy((item: { price: number; quantity: number }) =>
					item.price * item.quantity
				)(items),
				[{ price: 20, quantity: 2 }, { price: 10, quantity: 5 }],
			)
		})

		it("should match edge cases examples", () => {
			assertEquals(sortBy((x: number) => x)([]), [])
			assertEquals(sortBy((x: any) => x)(null), [])
		})
	})
})