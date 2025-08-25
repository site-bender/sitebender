import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import aperture from "../../../../src/simple/array/aperture/index.ts"

// JSDoc examples - basic functionality
Deno.test("aperture - sliding window of size 2 (pairs)", () => {
	assertEquals(aperture(2)([1, 2, 3, 4, 5]), [[1, 2], [2, 3], [3, 4], [4, 5]])
})

Deno.test("aperture - sliding window of size 3 (triples)", () => {
	assertEquals(aperture(3)([1, 2, 3, 4, 5]), [[1, 2, 3], [2, 3, 4], [3, 4, 5]])
})

Deno.test("aperture - window size 1 (wraps each element)", () => {
	assertEquals(aperture(1)([1, 2, 3]), [[1], [2], [3]])
})

Deno.test("aperture - window larger than array returns empty", () => {
	assertEquals(aperture(5)([1, 2, 3]), [])
})

Deno.test("aperture - window equals array length returns single tuple", () => {
	assertEquals(aperture(3)([1, 2, 3]), [[1, 2, 3]])
})

Deno.test("aperture - string array", () => {
	assertEquals(aperture(2)(["a", "b", "c", "d"]), [["a", "b"], ["b", "c"], [
		"c",
		"d",
	]])
})

// JSDoc examples - practical use cases
Deno.test("aperture - moving averages calculation", () => {
	const numbers = [10, 20, 30, 40, 50, 60]
	const windows = aperture(3)(numbers)
	assertEquals(windows, [[10, 20, 30], [20, 30, 40], [30, 40, 50], [
		40,
		50,
		60,
	]])
	const movingAverages = windows.map((w) =>
		(w as number[]).reduce((a, b) => a + b, 0) / w.length
	)
	assertEquals(movingAverages, [20, 30, 40, 50])
})

Deno.test("aperture - text analysis bigrams", () => {
	const words = ["the", "quick", "brown", "fox", "jumps"]
	assertEquals(aperture(2)(words), [
		["the", "quick"],
		["quick", "brown"],
		["brown", "fox"],
		["fox", "jumps"],
	])
})

Deno.test("aperture - text analysis trigrams", () => {
	const words = ["the", "quick", "brown", "fox", "jumps"]
	assertEquals(aperture(3)(words), [
		["the", "quick", "brown"],
		["quick", "brown", "fox"],
		["brown", "fox", "jumps"],
	])
})

Deno.test("aperture - pattern detection", () => {
	const data = [1, 2, 3, 2, 1, 2, 3]
	assertEquals(aperture(3)(data), [
		[1, 2, 3],
		[2, 3, 2],
		[3, 2, 1],
		[2, 1, 2],
		[1, 2, 3],
	])
})

Deno.test("aperture - time series analysis", () => {
	const temperatures = [20, 22, 25, 24, 23, 26, 28]
	const changes = aperture(2)(temperatures).map((pair) => {
		const [prev, curr] = pair as [number, number]
		return curr - prev
	})
	assertEquals(changes, [2, 3, -1, -1, 3, 2])
})

Deno.test("aperture - overlapping date ranges", () => {
	const dates = ["2024-01", "2024-02", "2024-03", "2024-04"]
	const ranges = aperture(2)(dates).map(([start, end]) => `${start} to ${end}`)
	assertEquals(ranges, [
		"2024-01 to 2024-02",
		"2024-02 to 2024-03",
		"2024-03 to 2024-04",
	])
})

// Edge cases from JSDoc
Deno.test("aperture - empty array", () => {
	assertEquals(aperture(2)([]), [])
})

Deno.test("aperture - single element with window size 2", () => {
	assertEquals(aperture(2)([1]), [])
})

Deno.test("aperture - zero window size returns empty", () => {
	assertEquals(aperture(0)([1, 2, 3]), [])
})

Deno.test("aperture - negative window size returns empty", () => {
	assertEquals(aperture(-1)([1, 2, 3]), [])
})

// Partial application examples from JSDoc
Deno.test("aperture - partial application for pairwise", () => {
	const pairwise = aperture(2)
	assertEquals(pairwise([1, 2, 3, 4]), [[1, 2], [2, 3], [3, 4]])
})

Deno.test("aperture - partial application for triplewise", () => {
	const triplewise = aperture(3)
	assertEquals(triplewise(["a", "b", "c", "d", "e"]), [
		["a", "b", "c"],
		["b", "c", "d"],
		["c", "d", "e"],
	])
})

// Sequence detection from JSDoc
Deno.test("aperture - detect increasing sequences", () => {
	const isIncreasing = ([a, b]: [number, number]) => b > a
	const sequence = [1, 2, 3, 2, 3, 4, 5]
	const result = aperture(2)(sequence).map((pair) =>
		isIncreasing(pair as [number, number])
	)
	assertEquals(result, [true, true, false, true, true, true])
})

Deno.test("aperture - find local minima/maxima", () => {
	const values = [3, 1, 4, 1, 5, 9, 2]
	const result = aperture(3)(values).map((triple) => {
		const [a, b, c] = triple as [number, number, number]
		return b < a && b < c ? "min" : b > a && b > c ? "max" : "neither"
	})
	assertEquals(result, ["min", "max", "min", "neither", "max"])
})

// Null/undefined handling from JSDoc
Deno.test("aperture - handles null input", () => {
	assertEquals(aperture(2)(null), [])
})

Deno.test("aperture - handles undefined input", () => {
	assertEquals(aperture(2)(undefined), [])
})

// Mixed types from JSDoc
Deno.test("aperture - handles mixed types", () => {
	assertEquals(aperture(2)([1, "two", 3, "four"]), [
		[1, "two"],
		["two", 3],
		[3, "four"],
	])
})

// Objects in tuples from JSDoc
Deno.test("aperture - handles objects in tuples", () => {
	const items = [
		{ id: 1, value: "a" },
		{ id: 2, value: "b" },
		{ id: 3, value: "c" },
	]
	assertEquals(aperture(2)(items), [
		[{ id: 1, value: "a" }, { id: 2, value: "b" }],
		[{ id: 2, value: "b" }, { id: 3, value: "c" }],
	])
})

// Context-aware transformations from JSDoc
Deno.test("aperture - build context-aware transformations", () => {
	const context = aperture(3)(["start", "middle", "end", "extra"])
	assertEquals(context, [["start", "middle", "end"], [
		"middle",
		"end",
		"extra",
	]])
	const transformed = context.map(([prev, curr, next]) => ({
		previous: prev,
		current: curr,
		next: next,
	}))
	assertEquals(transformed, [
		{ previous: "start", current: "middle", next: "end" },
		{ previous: "middle", current: "end", next: "extra" },
	])
})

// Additional edge cases
Deno.test("aperture - window size equals input length", () => {
	assertEquals(aperture(5)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
})

Deno.test("aperture - window size one less than input", () => {
	assertEquals(aperture(4)([1, 2, 3, 4, 5]), [[1, 2, 3, 4], [2, 3, 4, 5]])
})

Deno.test("aperture - handles non-integer window size", () => {
	// Non-integer window sizes are truncated to 2
	assertEquals(aperture(2.5)([1, 2, 3, 4]), [[1, 2], [2, 3]])
	assertEquals(aperture(2.9)([1, 2, 3, 4]), [[1, 2], [2, 3]])
})

// Property-based tests
Deno.test("aperture property - result length formula", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 0, maxLength: 20 }),
			fc.integer({ min: 1, max: 25 }),
			(arr, n) => {
				const result = aperture(n)(arr)
				const expectedLength = Math.max(0, arr.length - n + 1)
				return n > arr.length
					? result.length === 0
					: result.length === expectedLength
			},
		),
	)
})

Deno.test("aperture property - each window has correct size", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			fc.integer({ min: 1, max: 10 }),
			(arr, n) => {
				const result = aperture(n)(arr)
				if (n > arr.length) return result.length === 0
				return result.every((window) => window.length === n)
			},
		),
	)
})

Deno.test("aperture property - consecutive windows overlap correctly", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 2, maxLength: 20 }),
			fc.integer({ min: 2, max: 10 }),
			(arr, n) => {
				const result = aperture(n)(arr)
				if (result.length < 2) return true

				for (let i = 0; i < result.length - 1; i++) {
					const current = result[i]
					const next = result[i + 1]
					// Check that n-1 elements overlap
					for (let j = 1; j < n; j++) {
						if (current[j] !== next[j - 1]) return false
					}
				}
				return true
			},
		),
	)
})

Deno.test("aperture property - preserves element order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			fc.integer({ min: 1, max: 10 }),
			(arr, n) => {
				const result = aperture(n)(arr)
				return result.every((window, i) =>
					window.every((elem, j) => elem === arr[i + j])
				)
			},
		),
	)
})

Deno.test("aperture property - window of size 1 equals map identity", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const result = aperture(1)(arr)
				return result.length === arr.length &&
					result.every((window, i) =>
						window.length === 1 && window[0] === arr[i]
					)
			},
		),
	)
})

// Type safety
Deno.test("aperture - maintains type safety", () => {
	const numbers: ReadonlyArray<number> = [1, 2, 3, 4]
	const result = aperture(2)(numbers)
	assertEquals(result, [[1, 2], [2, 3], [3, 4]])
})

// Immutability
Deno.test("aperture - doesn't modify original array", () => {
	const original = [1, 2, 3, 4, 5]
	const result = aperture(3)(original)
	assertEquals(result, [[1, 2, 3], [2, 3, 4], [3, 4, 5]])
	assertEquals(original, [1, 2, 3, 4, 5])
})

// Special values
Deno.test("aperture - handles arrays with NaN", () => {
	const result = aperture(2)([1, NaN, 3])
	assertEquals(result.length, 2)
	assertEquals(result[0][0], 1)
	assertEquals(Number.isNaN(result[0][1]), true)
	assertEquals(Number.isNaN(result[1][0]), true)
	assertEquals(result[1][1], 3)
})

Deno.test("aperture - handles arrays with Infinity", () => {
	assertEquals(aperture(2)([1, Infinity, -Infinity, 2]), [
		[1, Infinity],
		[Infinity, -Infinity],
		[-Infinity, 2],
	])
})
