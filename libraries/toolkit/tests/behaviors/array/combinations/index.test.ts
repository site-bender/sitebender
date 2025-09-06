import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import combinations from "../../../../src/simple/array/combinations/index.ts"

// Helper function to calculate binomial coefficient
const binomialCoefficient = (n: number, k: number): number => {
	if (k > n || k < 0) return 0
	if (k === 0 || k === n) return 1
	let result = 1
	for (let i = 0; i < k; i++) {
		result = result * (n - i) / (i + 1)
	}
	return Math.round(result)
}

// JSDoc examples - basic functionality
Deno.test("combinations - choose 2 from 4", () => {
	assertEquals(combinations(2)([1, 2, 3, 4]), [
		[1, 2],
		[1, 3],
		[1, 4],
		[2, 3],
		[2, 4],
		[3, 4],
	])
})

Deno.test("combinations - choose 3 from 5", () => {
	assertEquals(combinations(3)(["a", "b", "c", "d", "e"]), [
		["a", "b", "c"],
		["a", "b", "d"],
		["a", "b", "e"],
		["a", "c", "d"],
		["a", "c", "e"],
		["a", "d", "e"],
		["b", "c", "d"],
		["b", "c", "e"],
		["b", "d", "e"],
		["c", "d", "e"],
	])
})

Deno.test("combinations - choose 1 (all individual elements)", () => {
	assertEquals(combinations(1)([1, 2, 3]), [[1], [2], [3]])
})

Deno.test("combinations - choose all (only one way)", () => {
	assertEquals(combinations(3)([1, 2, 3]), [[1, 2, 3]])
})

Deno.test("combinations - choose 0 (empty selection)", () => {
	assertEquals(combinations(0)([1, 2, 3]), [[]])
})

Deno.test("combinations - choose more than available", () => {
	assertEquals(combinations(5)([1, 2, 3]), [])
})

// JSDoc practical examples
Deno.test("combinations - team selection", () => {
	const players = ["Alice", "Bob", "Charlie", "Dave", "Eve"]
	const teams = combinations(3)(players)
	assertEquals(teams.length, 10) // C(5,3) = 10
	assertEquals(teams[0], ["Alice", "Bob", "Charlie"])
})

Deno.test("combinations - menu combinations", () => {
	const dishes = ["salad", "soup", "pasta", "pizza", "dessert"]
	const combos = combinations(2)(dishes)
	assertEquals(combos.length, 10) // C(5,2) = 10
})

Deno.test("combinations - lottery numbers", () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	const picks = combinations(6)(numbers)
	assertEquals(picks.length, 210) // C(10,6) = 210
})

Deno.test("combinations - feature flags", () => {
	const features = ["A", "B", "C", "D"]
	const result = combinations(2)(features)
	assertEquals(result, [
		["A", "B"],
		["A", "C"],
		["A", "D"],
		["B", "C"],
		["B", "D"],
		["C", "D"],
	])
})

// Partial application from JSDoc
Deno.test("combinations - partial application pickTwo", () => {
	const pickTwo = combinations(2)
	assertEquals(pickTwo([1, 2, 3]), [[1, 2], [1, 3], [2, 3]])
	assertEquals(pickTwo(["x", "y", "z"]), [["x", "y"], ["x", "z"], ["y", "z"]])
})

Deno.test("combinations - partial application pickThree", () => {
	const pickThree = combinations(3)
	assertEquals(pickThree([1, 2, 3, 4]), [
		[1, 2, 3],
		[1, 2, 4],
		[1, 3, 4],
		[2, 3, 4],
	])
})

// Edge cases from JSDoc
Deno.test("combinations - not enough elements", () => {
	assertEquals(combinations(2)([1]), [])
})

Deno.test("combinations - empty array", () => {
	assertEquals(combinations(2)([]), [])
})

Deno.test("combinations - invalid k (negative)", () => {
	assertEquals(combinations(-1)([1, 2]), [])
})

Deno.test("combinations - null input", () => {
	assertEquals(combinations(2)(null), [])
})

Deno.test("combinations - undefined input", () => {
	assertEquals(combinations(2)(undefined), [])
})

// Binomial coefficient verification from JSDoc
Deno.test("combinations - C(5,2) = 10", () => {
	assertEquals(combinations(2)([1, 2, 3, 4, 5]).length, 10)
})

Deno.test("combinations - C(6,3) = 20", () => {
	assertEquals(combinations(3)([1, 2, 3, 4, 5, 6]).length, 20)
})

// Additional edge cases
Deno.test("combinations - non-integer k", () => {
	assertEquals(combinations(2.5)([1, 2, 3]), [])
	assertEquals(combinations(2.9)([1, 2, 3]), [])
})

Deno.test("combinations - k equals 0 with empty array", () => {
	assertEquals(combinations(0)([]), [[]])
})

Deno.test("combinations - handles duplicate values correctly", () => {
	// Combinations work on positions, not values
	const result = combinations(2)([1, 1, 2])
	assertEquals(result, [[1, 1], [1, 2], [1, 2]])
	// Note: both [1,2] combinations are different positions
})

// Property-based tests
Deno.test("combinations property - correct count C(n,k)", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 10 }),
			fc.integer({ min: 0, max: 10 }),
			(n, k) => {
				const arr = Array.from({ length: n }, (_, i) => i)
				const result = combinations(k)(arr)
				const expected = binomialCoefficient(n, k)
				return result.length === expected
			},
		),
	)
})

Deno.test("combinations property - each combination has size k", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 0, maxLength: 10 }),
			fc.integer({ min: 0, max: 10 }),
			(arr, k) => {
				const result = combinations(k)(arr)
				if (k < 0 || !Number.isInteger(k) || k > arr.length) {
					return result.length === 0 ||
						(k === 0 && result.length === 1)
				}
				return result.every((combo) => combo.length === k)
			},
		),
	)
})

Deno.test("combinations property - combinations are unique (on distinct inputs)", () => {
	fc.assert(
		fc.property(
			fc.uniqueArray(fc.integer(), { minLength: 0, maxLength: 10 }),
			fc.integer({ min: 0, max: 10 }),
			(arr, k) => {
				const result = combinations(k)(arr)
				const stringified = result.map((combo) => JSON.stringify(combo))
				const unique = new Set(stringified)
				return unique.size === result.length
			},
		),
	)
})

Deno.test("combinations property - maintains element order (on distinct inputs)", () => {
	fc.assert(
		fc.property(
			fc.uniqueArray(fc.integer(), { minLength: 0, maxLength: 10 }),
			fc.integer({ min: 1, max: 10 }),
			(arr, k) => {
				const result = combinations(k)(arr)
				// Each combination should maintain the relative order from original array
				return result.every((combo) => {
					for (let i = 0; i < combo.length - 1; i++) {
						const idx1 = arr.indexOf(combo[i] as number)
						const idx2 = arr.indexOf(combo[i + 1] as number)
						if (idx1 >= idx2) return false
					}
					return true
				})
			},
		),
	)
})

Deno.test("combinations property - C(n,k) = C(n,n-k) symmetry", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 10 }),
			fc.integer({ min: 0, max: 10 }),
			(n, k) => {
				const arr = Array.from({ length: n }, (_, i) => i)
				const resultK = combinations(k)(arr)
				const resultNK = combinations(n - k)(arr)
				return resultK.length === resultNK.length
			},
		),
	)
})

Deno.test("combinations property - empty array behavior", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: -5, max: 10 }),
			(k) => {
				const result = combinations(k)([])
				if (k === 0) {
					return result.length === 1 && result[0].length === 0
				} else {
					return result.length === 0
				}
			},
		),
	)
})

// Type safety
Deno.test("combinations - maintains type safety", () => {
	const strings: ReadonlyArray<string> = ["a", "b", "c"]
	const result = combinations(2)(strings)
	assertEquals(result, [["a", "b"], ["a", "c"], ["b", "c"]])
})

// Immutability
Deno.test("combinations - doesn't modify original array", () => {
	const original = [1, 2, 3, 4]
	const result = combinations(2)(original)
	assertEquals(original, [1, 2, 3, 4])
	assertEquals(result.length, 6)
})

// Special values
Deno.test("combinations - handles arrays with NaN", () => {
	const result = combinations(2)([1, NaN, 3])
	assertEquals(result.length, 3)
	assertEquals(result[0][0], 1)
	assertEquals(Number.isNaN(result[0][1]), true)
	assertEquals(result[1], [1, 3])
	assertEquals(Number.isNaN(result[2][0]), true)
	assertEquals(result[2][1], 3)
})

Deno.test("combinations - handles arrays with Infinity", () => {
	assertEquals(combinations(2)([1, Infinity, -Infinity]), [
		[1, Infinity],
		[1, -Infinity],
		[Infinity, -Infinity],
	])
})

// Object combinations
Deno.test("combinations - handles objects", () => {
	const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
	const result = combinations(2)(items)
	assertEquals(result, [
		[{ id: 1 }, { id: 2 }],
		[{ id: 1 }, { id: 3 }],
		[{ id: 2 }, { id: 3 }],
	])
})

// Performance consideration
Deno.test("combinations - handles larger arrays efficiently", () => {
	const arr = Array.from({ length: 20 }, (_, i) => i)
	const result = combinations(2)(arr)
	assertEquals(result.length, 190) // C(20,2) = 190
	assertEquals(result[0], [0, 1])
	assertEquals(result[189], [18, 19])
})
