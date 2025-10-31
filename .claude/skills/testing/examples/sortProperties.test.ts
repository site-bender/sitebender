//++ Example: Property-based testing for collection invariants
//++ Demonstrates testing array sorting properties

import { assertEquals } from "@std/assert"
import * as fc from "npm:fast-check"

//++ Function under test: sorts array in ascending order
function sort(array: ReadonlyArray<number>): ReadonlyArray<number> {
	return [...array].sort(function compareNumbers(a: number, b: number): number {
		return a - b
	})
}

//++ Property-based tests for sort
Deno.test("sort properties", async (t) => {
	await t.step("property: idempotent (sorting twice equals sorting once)", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const sorted = sort(arr)
				const doubleSorted = sort(sorted)
				return JSON.stringify(sorted) === JSON.stringify(doubleSorted)
			}),
		)
	})

	await t.step("property: preserves length", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const sorted = sort(arr)
				return sorted.length === arr.length
			}),
		)
	})

	await t.step("property: output is ordered", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const sorted = sort(arr)
				//++ Check all adjacent pairs are in order
				const pairs = sorted.slice(0, -1).map(function createPair(value: number, index: number) {
					return [value, sorted[index + 1]] as const
				})
				return pairs.every(function isOrdered([a, b]: readonly [number, number]): boolean {
					return a <= b
				})
			}),
		)
	})

	await t.step("property: contains same elements (permutation)", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const sorted = sort(arr)

				//++ Count occurrences in original array
				const originalCounts = arr.reduce(
					function countOccurrences(counts: ReadonlyMap<number, number>, item: number) {
						return new Map([...counts, [item, (counts.get(item) || 0) + 1]])
					},
					new Map<number, number>()
				)

				//++ Count occurrences in sorted array
				const sortedCounts = sorted.reduce(
					function countOccurrences(counts: ReadonlyMap<number, number>, item: number) {
						return new Map([...counts, [item, (counts.get(item) || 0) + 1]])
					},
					new Map<number, number>()
				)

				//++ Compare counts - sizes must match
				if (originalCounts.size !== sortedCounts.size) return false

				//++ All entries must have same counts
				return Array.from(originalCounts.entries()).every(
					function countsMatch([key, count]: readonly [number, number]): boolean {
						return sortedCounts.get(key) === count
					}
				)
			}),
		)
	})

	await t.step("property: minimum element first", () => {
		fc.assert(
			fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
				const sorted = sort(arr)
				const minimum = Math.min(...arr)
				return sorted[0] === minimum
			}),
		)
	})

	await t.step("property: maximum element last", () => {
		fc.assert(
			fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
				const sorted = sort(arr)
				const maximum = Math.max(...arr)
				return sorted[sorted.length - 1] === maximum
			}),
		)
	})

	await t.step("property: empty array returns empty array", () => {
		const result = sort([])
		assertEquals(result, [])
	})

	await t.step("property: single element array unchanged", () => {
		fc.assert(
			fc.property(fc.integer(), (n) => {
				const result = sort([n])
				return result.length === 1 && result[0] === n
			}),
		)
	})

	await t.step("property: already sorted array unchanged", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const sorted = sort(arr)
				const doubleSorted = sort(sorted)
				return JSON.stringify(sorted) === JSON.stringify(doubleSorted)
			}),
		)
	})
})
