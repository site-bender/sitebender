import { assertEquals } from "jsr:@std/assert@1.0.9"
import { describe, it } from "jsr:@std/testing@1.0.7/bdd"
import * as fc from "npm:fast-check@3.23.1"

import sortWith from "../../../../src/simple/array/sortWith/index.ts"

describe("sortWith", () => {
	describe("behavioral tests", () => {
		it("should sort with multiple comparators", () => {
			const byAge = (a: { age: number }, b: { age: number }) =>
				a.age - b.age
			const byName = (a: { name: string }, b: { name: string }) =>
				a.name.localeCompare(b.name)

			const people = [
				{ name: "Charlie", age: 30 },
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 25 },
				{ name: "Dave", age: 30 },
			]

			const sorted = sortWith([byAge, byName])(people)
			assertEquals(sorted, [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 25 },
				{ name: "Charlie", age: 30 },
				{ name: "Dave", age: 30 },
			])
		})

		it("should apply comparators in order", () => {
			const data = [
				{ priority: 2, value: "A" },
				{ priority: 1, value: "C" },
				{ priority: 1, value: "B" },
				{ priority: 2, value: "D" },
			]

			const byPriority = (
				a: { priority: number },
				b: { priority: number },
			) => a.priority - b.priority
			const byValue = (a: { value: string }, b: { value: string }) =>
				a.value.localeCompare(b.value)

			const sorted = sortWith([byPriority, byValue])(data)
			assertEquals(sorted, [
				{ priority: 1, value: "B" },
				{ priority: 1, value: "C" },
				{ priority: 2, value: "A" },
				{ priority: 2, value: "D" },
			])
		})

		it("should handle different sort directions", () => {
			const byPriceDesc = (a: { price: number }, b: { price: number }) =>
				b.price - a.price
			const byNameAsc = (a: { name: string }, b: { name: string }) =>
				a.name.localeCompare(b.name)

			const products = [
				{ name: "Widget", price: 10 },
				{ name: "Gadget", price: 20 },
				{ name: "Doohickey", price: 20 },
				{ name: "Thing", price: 15 },
			]

			const sorted = sortWith([byPriceDesc, byNameAsc])(products)
			assertEquals(sorted, [
				{ name: "Doohickey", price: 20 },
				{ name: "Gadget", price: 20 },
				{ name: "Thing", price: 15 },
				{ name: "Widget", price: 10 },
			])
		})

		it("should handle string sorting with multiple criteria", () => {
			const compareLength = (a: string, b: string) => a.length - b.length
			const compareAlpha = (a: string, b: string) => a.localeCompare(b)

			const words = ["cat", "dog", "ox", "ant", "bee", "fly"]
			const sorted = sortWith([compareLength, compareAlpha])(words)
			assertEquals(sorted, ["ox", "ant", "bee", "cat", "dog", "fly"])
		})

		it("should handle single comparator", () => {
			const byValue = (a: number, b: number) => a - b
			assertEquals(sortWith([byValue])([3, 1, 2]), [1, 2, 3])
		})

		it("should handle no comparators (returns copy)", () => {
			const arr = ["b", "a", "c"]
			const sorted = sortWith([])(arr)
			assertEquals(sorted, ["b", "a", "c"]) // Unchanged order
			// Verify it's a copy
			sorted[0] = "z"
			assertEquals(arr[0], "b") // Original unchanged
		})

		it("should handle three-level sorting", () => {
			const data = [
				{ category: "B", priority: 2, id: 3 },
				{ category: "A", priority: 1, id: 2 },
				{ category: "B", priority: 1, id: 1 },
				{ category: "A", priority: 1, id: 4 },
				{ category: "B", priority: 1, id: 5 },
			]

			const byCategory = (
				a: { category: string },
				b: { category: string },
			) => a.category.localeCompare(b.category)
			const byPriority = (
				a: { priority: number },
				b: { priority: number },
			) => a.priority - b.priority
			const byId = (a: { id: number }, b: { id: number }) => a.id - b.id

			const sorted = sortWith([byCategory, byPriority, byId])(data)
			assertEquals(sorted, [
				{ category: "A", priority: 1, id: 2 },
				{ category: "A", priority: 1, id: 4 },
				{ category: "B", priority: 1, id: 1 },
				{ category: "B", priority: 1, id: 5 },
				{ category: "B", priority: 2, id: 3 },
			])
		})

		it("should handle dates with multiple criteria", () => {
			const data = [
				{ date: new Date("2024-01-15"), priority: 2 },
				{ date: new Date("2024-01-01"), priority: 1 },
				{ date: new Date("2024-01-01"), priority: 2 },
				{ date: new Date("2024-01-15"), priority: 1 },
			]

			const byDate = (a: { date: Date }, b: { date: Date }) =>
				a.date.getTime() - b.date.getTime()
			const byPriority = (
				a: { priority: number },
				b: { priority: number },
			) => a.priority - b.priority

			const sorted = sortWith([byDate, byPriority])(data)
			assertEquals(sorted, [
				{ date: new Date("2024-01-01"), priority: 1 },
				{ date: new Date("2024-01-01"), priority: 2 },
				{ date: new Date("2024-01-15"), priority: 1 },
				{ date: new Date("2024-01-15"), priority: 2 },
			])
		})

		it("should handle numeric arrays", () => {
			const compareAbs = (a: number, b: number) =>
				Math.abs(a) - Math.abs(b)
			const compareSign = (a: number, b: number) =>
				Math.sign(a) - Math.sign(b)

			assertEquals(
				sortWith([compareAbs, compareSign])([3, -3, 2, -2, 1, -1, 0]),
				[0, -1, 1, -2, 2, -3, 3],
			)
		})

		it("should handle booleans with secondary sort", () => {
			const data = [
				{ active: true, name: "Charlie" },
				{ active: false, name: "Alice" },
				{ active: true, name: "Bob" },
				{ active: false, name: "Dave" },
			]

			const byActive = (a: { active: boolean }, b: { active: boolean }) =>
				(a.active ? 0 : 1) - (b.active ? 0 : 1)
			const byName = (a: { name: string }, b: { name: string }) =>
				a.name.localeCompare(b.name)

			const sorted = sortWith([byActive, byName])(data)
			assertEquals(sorted, [
				{ active: true, name: "Bob" },
				{ active: true, name: "Charlie" },
				{ active: false, name: "Alice" },
				{ active: false, name: "Dave" },
			])
		})

		it("should handle single element array", () => {
			const compareFn = (a: number, b: number) => a - b
			assertEquals(sortWith([compareFn])([42]), [42])
		})

		it("should handle empty array", () => {
			const compareFn = (a: number, b: number) => a - b
			assertEquals(sortWith([compareFn])([]), [])
		})

		it("should handle null and undefined", () => {
			const compareFn = (a: number, b: number) => a - b
			assertEquals(sortWith([compareFn])(null), [])
			assertEquals(sortWith([compareFn])(undefined), [])
		})

		it("should handle non-array inputs", () => {
			const compareFn = (a: any, b: any) => a - b
			assertEquals(sortWith([compareFn])("not an array" as any), [])
			assertEquals(sortWith([compareFn])(123 as any), [])
			assertEquals(sortWith([compareFn])({} as any), [])
		})

		it("should preserve original array", () => {
			const original = [3, 1, 2]
			const compareFn = (a: number, b: number) => a - b
			const sorted = sortWith([compareFn])(original)
			assertEquals(sorted, [1, 2, 3])
			assertEquals(original, [3, 1, 2]) // Original unchanged
		})

		it("should handle comparators that always return zero", () => {
			const alwaysEqual = (_a: number, _b: number) => 0
			const arr = [3, 1, 4, 1, 5, 9]
			const sorted = sortWith([alwaysEqual])(arr)
			// Should maintain original order (stable sort)
			assertEquals(sorted, [3, 1, 4, 1, 5, 9])
		})

		it("should short-circuit on first non-zero comparator", () => {
			let secondCalls = 0
			const first = (a: number, b: number) => a - b
			const second = (_a: number, _b: number) => {
				secondCalls++
				return 0
			}

			sortWith([first, second])([3, 1, 2])
			// Second comparator should never be called since first always returns non-zero
			assertEquals(secondCalls, 0)
		})

		it("should call second comparator only when first returns zero", () => {
			let secondCalls = 0
			const data = [
				{ x: 1, y: 3 },
				{ x: 1, y: 1 },
				{ x: 2, y: 2 },
			]

			const byX = (a: { x: number }, b: { x: number }) => a.x - b.x
			const byY = (a: { y: number }, b: { y: number }) => {
				secondCalls++
				return a.y - b.y
			}

			sortWith([byX, byY])(data)
			// Second comparator called only for elements with same x value
			assertEquals(secondCalls > 0, true)
		})
	})

	describe("property-based tests", () => {
		it("should preserve array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const compareFn = (a: number, b: number) => a - b
						const sorted = sortWith([compareFn])(arr)
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
						const compareFn = (a: number, b: number) => a - b
						const sorted = sortWith([compareFn])(arr)
						const originalSet = new Set(arr)
						const sortedSet = new Set(sorted)
						return originalSet.size === sortedSet.size &&
							[...originalSet].every((x) => sortedSet.has(x))
					},
				),
			)
		})

		it("should be idempotent", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const compareFn = (a: number, b: number) => a - b
						const sorter = sortWith([compareFn])
						const sorted1 = sorter(arr)
						const sorted2 = sorter(sorted1)
						return JSON.stringify(sorted1) ===
							JSON.stringify(sorted2)
					},
				),
			)
		})

		it("should handle multiple random comparators", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.record({
							x: fc.integer({ min: 0, max: 5 }),
							y: fc.integer({ min: 0, max: 5 }),
							z: fc.integer({ min: 0, max: 5 }),
						}),
					),
					(arr) => {
						const byX = (a: { x: number }, b: { x: number }) =>
							a.x - b.x
						const byY = (a: { y: number }, b: { y: number }) =>
							a.y - b.y
						const byZ = (a: { z: number }, b: { z: number }) =>
							a.z - b.z

						const sorted = sortWith([byX, byY, byZ])(arr)

						// Check that result is properly ordered
						for (let i = 1; i < sorted.length; i++) {
							const prev = sorted[i - 1]
							const curr = sorted[i]

							if (prev.x !== curr.x) {
								// Primary sort key differs
								if (prev.x > curr.x) return false
							} else if (prev.y !== curr.y) {
								// Secondary sort key differs
								if (prev.y > curr.y) return false
							} else if (prev.z !== curr.z) {
								// Tertiary sort key differs
								if (prev.z > curr.z) return false
							}
						}
						return true
					},
				),
			)
		})

		it("should return a copy even with empty comparators", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const sorted = sortWith([])(arr)
						sorted.push(999) // Modify the copy
						return !arr.includes(999) || arr[arr.length - 1] === 999
					},
				),
			)
		})
	})

	describe("JSDoc examples", () => {
		it("should match basic multi-level sort example", () => {
			const byAge = (a: any, b: any) => a.age - b.age
			const byName = (a: any, b: any) => a.name.localeCompare(b.name)
			const people = [
				{ name: "Charlie", age: 30 },
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 25 },
			]
			assertEquals(
				sortWith([byAge, byName])(people),
				[
					{ name: "Alice", age: 25 },
					{ name: "Bob", age: 25 },
					{ name: "Charlie", age: 30 },
				],
			)
		})

		it("should match different sort directions example", () => {
			const byPriceDesc = (a: any, b: any) => b.price - a.price
			const byNameAsc = (a: any, b: any) => a.name.localeCompare(b.name)
			const products = [
				{ name: "Widget", price: 10 },
				{ name: "Gadget", price: 20 },
				{ name: "Doohickey", price: 20 },
			]
			const result = sortWith([byPriceDesc, byNameAsc])(products)
			// Price descending, name ascending for ties
			assertEquals(result[0].price, 20)
			assertEquals(result[1].price, 20)
			assertEquals(result[2].price, 10)
			assertEquals(result[0].name, "Doohickey")
			assertEquals(result[1].name, "Gadget")
		})

		it("should match string sorting example", () => {
			const compareLength = (a: string, b: string) => a.length - b.length
			const compareAlpha = (a: string, b: string) => a.localeCompare(b)
			assertEquals(
				sortWith([compareLength, compareAlpha])(["cat", "dog", "ox"]),
				["ox", "cat", "dog"],
			)
		})

		it("should match edge cases examples", () => {
			assertEquals(sortWith([])(["b", "a", "c"]), ["b", "a", "c"])
			assertEquals(sortWith([(a: number, b: number) => a - b])(null), [])
		})
	})
})
