//++ Example: Property-based testing for collection invariants
//++ Demonstrates testing array sorting properties

import { assertEquals } from "@std/assert"
import * as fc from "npm:fast-check"

//++ Function under test: sorts array in ascending order
function sort(array: ReadonlyArray<number>): ReadonlyArray<number> {
	return [...array].sort((a, b) => a - b)
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
				for (let i = 0; i < sorted.length - 1; i++) {
					if (sorted[i] > sorted[i + 1]) {
						return false
					}
				}
				return true
			}),
		)
	})

	await t.step("property: contains same elements (permutation)", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const sorted = sort(arr)

				// Check each element in original appears in sorted
				const originalCounts = new Map<number, number>()
				for (const item of arr) {
					originalCounts.set(item, (originalCounts.get(item) || 0) + 1)
				}

				const sortedCounts = new Map<number, number>()
				for (const item of sorted) {
					sortedCounts.set(item, (sortedCounts.get(item) || 0) + 1)
				}

				// Compare counts
				if (originalCounts.size !== sortedCounts.size) return false
				for (const [key, count] of originalCounts) {
					if (sortedCounts.get(key) !== count) return false
				}
				return true
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
