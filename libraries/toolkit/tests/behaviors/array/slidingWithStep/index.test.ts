import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, Has } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import slidingWithStep from "../../../../src/simple/array/slidingWithStep/index.ts"

Deno.test("slidingWithStep: basic overlapping windows", () => {
	// Step of 1 (maximally overlapping)
	assertEquals(
		slidingWithStep(3, 1)([1, 2, 3, 4, 5]),
		[[1, 2, 3], [2, 3, 4], [3, 4, 5]],
		"should create overlapping windows with step 1",
	)

	// Step of 2 (partial overlap)
	assertEquals(
		slidingWithStep(3, 2)([1, 2, 3, 4, 5, 6, 7]),
		[[1, 2, 3], [3, 4, 5], [5, 6, 7]],
		"should create windows with step 2",
	)

	assertEquals(
		slidingWithStep(4, 2)([1, 2, 3, 4, 5, 6, 7, 8]),
		[[1, 2, 3, 4], [3, 4, 5, 6], [5, 6, 7, 8]],
		"should create size 4 windows with step 2",
	)
})

Deno.test("slidingWithStep: non-overlapping windows", () => {
	// Step equals window size
	assertEquals(
		slidingWithStep(3, 3)([1, 2, 3, 4, 5, 6, 7, 8, 9]),
		[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
		"should create non-overlapping windows",
	)

	assertEquals(
		slidingWithStep(2, 2)([1, 2, 3, 4, 5, 6]),
		[[1, 2], [3, 4], [5, 6]],
		"should create pairs without overlap",
	)

	// Incomplete last window is excluded
	assertEquals(
		slidingWithStep(3, 3)([1, 2, 3, 4, 5, 6, 7]),
		[[1, 2, 3], [4, 5, 6]],
		"should exclude incomplete last window",
	)
})

Deno.test("slidingWithStep: step greater than window size", () => {
	// Skip elements between windows
	assertEquals(
		slidingWithStep(2, 3)([1, 2, 3, 4, 5, 6, 7, 8]),
		[[1, 2], [4, 5], [7, 8]],
		"should skip elements when step > size",
	)

	assertEquals(
		slidingWithStep(2, 4)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
		[[1, 2], [5, 6], [9, 10]],
		"should skip more elements with larger step",
	)

	assertEquals(
		slidingWithStep(1, 5)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
		[[1], [6]],
		"should take single elements with large gaps",
	)
})

Deno.test("slidingWithStep: edge cases", () => {
	// Window size larger than array
	assertEquals(
		slidingWithStep(5, 1)([1, 2, 3]),
		[],
		"should return empty when window size > array length",
	)

	// Empty array
	assertEquals(
		slidingWithStep(3, 1)([]),
		[],
		"should return empty for empty array",
	)

	// Exact window size
	assertEquals(
		slidingWithStep(3, 1)([1, 2, 3]),
		[[1, 2, 3]],
		"should return single window when array length equals window size",
	)

	// Single element array
	assertEquals(
		slidingWithStep(1, 1)([42]),
		[[42]],
		"should handle single element",
	)
})

Deno.test("slidingWithStep: invalid parameters", () => {
	// Zero or negative size
	assertEquals(
		slidingWithStep(0, 1)([1, 2, 3]),
		[],
		"should return empty for zero size",
	)

	assertEquals(
		slidingWithStep(-1, 1)([1, 2, 3]),
		[],
		"should return empty for negative size",
	)

	// Zero or negative step
	assertEquals(
		slidingWithStep(2, 0)([1, 2, 3]),
		[],
		"should return empty for zero step",
	)

	assertEquals(
		slidingWithStep(2, -1)([1, 2, 3]),
		[],
		"should return empty for negative step",
	)

	// NaN and Infinity
	assertEquals(
		slidingWithStep(NaN, 1)([1, 2, 3]),
		[],
		"should return empty for NaN size",
	)

	assertEquals(
		slidingWithStep(Infinity, 1)([1, 2, 3]),
		[],
		"should return empty for Infinity size",
	)

	assertEquals(
		slidingWithStep(2, Infinity)([1, 2, 3]),
		[[1, 2]],
		"should handle Infinity step (takes only first window)",
	)

	assertEquals(
		slidingWithStep(5, Infinity)([1, 2, 3]),
		[],
		"should return empty for Infinity step when array too small",
	)
})

Deno.test("slidingWithStep: null and undefined handling", () => {
	const windowFn = slidingWithStep(3, 1)

	assertEquals(
		windowFn(null),
		[],
		"should return empty for null",
	)

	assertEquals(
		windowFn(undefined),
		[],
		"should return empty for undefined",
	)
})

Deno.test("slidingWithStep: string arrays", () => {
	assertEquals(
		slidingWithStep(2, 1)(["a", "b", "c", "d"]),
		[["a", "b"], ["b", "c"], ["c", "d"]],
		"should work with strings",
	)

	const words = ["the", "quick", "brown", "fox", "jumps"]
	assertEquals(
		slidingWithStep(3, 2)(words),
		[["the", "quick", "brown"], ["brown", "fox", "jumps"]],
		"should create word windows",
	)
})

Deno.test("slidingWithStep: object arrays", () => {
	const data = [
		{ id: 1, value: 10 },
		{ id: 2, value: 20 },
		{ id: 3, value: 30 },
		{ id: 4, value: 40 },
		{ id: 5, value: 50 },
	]

	assertEquals(
		slidingWithStep(2, 2)(data),
		[
			[{ id: 1, value: 10 }, { id: 2, value: 20 }],
			[{ id: 3, value: 30 }, { id: 4, value: 40 }],
		],
		"should window objects",
	)
})

Deno.test("slidingWithStep: moving average example", () => {
	const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	const windows = slidingWithStep(3, 1)(data)

	assertEquals(
		windows,
		[[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [
			7,
			8,
			9,
		], [8, 9, 10]],
		"should create overlapping windows for moving average",
	)

	// Calculate moving averages
	const averages = windows.map((w) => w.reduce((a, b) => a + b, 0) / w.length)
	assertEquals(
		averages,
		[2, 3, 4, 5, 6, 7, 8, 9],
		"should enable moving average calculation",
	)
})

Deno.test("slidingWithStep: currying", () => {
	const window3Step1 = slidingWithStep(3, 1)
	const window2Step2 = slidingWithStep(2, 2)

	assertEquals(
		window3Step1([1, 2, 3, 4, 5]),
		[[1, 2, 3], [2, 3, 4], [3, 4, 5]],
		"should work with partial application",
	)

	assertEquals(
		window2Step2([1, 2, 3, 4, 5, 6]),
		[[1, 2], [3, 4], [5, 6]],
		"should work with different configuration",
	)

	// Map over multiple arrays
	const arrays = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
	assertEquals(
		arrays.map(window3Step1),
		[
			[[1, 2, 3], [2, 3, 4]],
			[[5, 6, 7], [6, 7, 8]],
			[[9, 10, 11], [10, 11, 12]],
		],
		"should work with map",
	)
})

Deno.test("slidingWithStep: immutability", () => {
	const original = [1, 2, 3, 4, 5]
	const windows = slidingWithStep(2, 1)(original)

	// Modify windows
	windows[0][0] = 99

	// Original should be unchanged
	assertEquals(
		original,
		[1, 2, 3, 4, 5],
		"original array should not be modified",
	)

	// Windows should be independent
	assertEquals(windows[1][0], 2, "other windows should not be affected")
})

Deno.test("slidingWithStep: type inference", () => {
	const numbers = slidingWithStep(2, 1)([1, 2, 3])
	assertType<Has<typeof numbers, Array<Array<number>>>>(true)

	const strings = slidingWithStep(3, 2)(["a", "b", "c", "d", "e"])
	assertType<Has<typeof strings, Array<Array<string>>>>(true)

	type Data = { x: number; y: number }
	const objects = slidingWithStep(2, 1)([
		{ x: 1, y: 2 },
		{ x: 3, y: 4 },
		{ x: 5, y: 6 },
	])
	assertType<Has<typeof objects, Array<Array<Data>>>>(true)
})

Deno.test("slidingWithStep: property-based tests", () => {
	// Property: Number of windows calculation
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 1, max: 10 }),
			fc.integer({ min: 1, max: 10 }),
			(arr, size, step) => {
				const windows = slidingWithStep(size, step)(arr)
				if (arr.length < size) {
					assertEquals(
						windows.length,
						0,
						"should be empty when array too small",
					)
				} else {
					const expectedCount =
						Math.floor((arr.length - size) / step) + 1
					assertEquals(
						windows.length,
						expectedCount,
						"should have correct number of windows",
					)
				}
			},
		),
		{ numRuns: 100 },
	)

	// Property: All windows have correct size
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 100 }),
			fc.integer({ min: 1, max: 10 }),
			fc.integer({ min: 1, max: 10 }),
			(arr, size, step) => {
				const windows = slidingWithStep(size, step)(arr)
				windows.forEach((window) => {
					assertEquals(
						window.length,
						size,
						"every window should have the specified size",
					)
				})
			},
		),
		{ numRuns: 100 },
	)

	// Property: Windows preserve order
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.integer({ min: 1, max: 5 }),
			fc.integer({ min: 1, max: 5 }),
			(arr, size, step) => {
				const windows = slidingWithStep(size, step)(arr)
				windows.forEach((window, i) => {
					const startIdx = i * step
					window.forEach((elem, j) => {
						assertEquals(
							elem,
							arr[startIdx + j],
							"elements should match original array",
						)
					})
				})
			},
		),
		{ numRuns: 100 },
	)

	// Property: Non-overlapping when step >= size
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.integer({ min: 1, max: 10 }),
			(arr, size) => {
				const step = size +
					fc.sample(fc.integer({ min: 0, max: 5 }), 1)[0]
				const windows = slidingWithStep(size, step)(arr)

				// Check no element appears in multiple windows
				const elementIndices = new Map<number, Array<number>>()
				windows.forEach((window, winIdx) => {
					window.forEach((elem) => {
						const indices = elementIndices.get(elem) || []
						indices.push(winIdx)
						elementIndices.set(elem, indices)
					})
				})

				// With step >= size, elements should appear in at most one window
				// (unless the element value is duplicated in the original array)
				const allDisjoint = windows.every((_, i) =>
					windows.every((_, j) => {
						if (i >= j) return true
						const startI = i * step
						const endI = startI + size
						const startJ = j * step
						return endI <= startJ // No overlap
					})
				)
				assertEquals(
					allDisjoint,
					true,
					"windows should not overlap when step >= size",
				)
			},
		),
		{ numRuns: 50 },
	)
})

Deno.test("slidingWithStep: performance considerations", () => {
	// Test with moderately large array (limited due to recursive implementation)
	const largeArray = Array.from({ length: 1000 }, (_, i) => i)

	const windows1 = slidingWithStep(10, 10)(largeArray)
	assertEquals(
		windows1.length,
		100,
		"should handle non-overlapping windows on large array",
	)

	const windows2 = slidingWithStep(5, 100)(largeArray)
	assertEquals(windows2.length, 10, "should handle large steps efficiently")

	// Verify first and last windows
	assertEquals(
		windows1[0],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		"first window should be correct",
	)
	assertEquals(
		windows1[99],
		[990, 991, 992, 993, 994, 995, 996, 997, 998, 999],
		"last window should be correct",
	)
})

Deno.test("slidingWithStep: real-world scenarios", () => {
	// Time series analysis - hourly data with 3-hour windows, 1-hour step
	const hourlyData = [10, 12, 15, 14, 16, 18, 20, 22, 21, 19, 17, 15]
	const threeHourWindows = slidingWithStep(3, 1)(hourlyData)

	assertEquals(
		threeHourWindows.length,
		10,
		"should create hourly sliding windows",
	)
	assertEquals(threeHourWindows[0], [10, 12, 15], "first 3-hour window")
	assertEquals(threeHourWindows[9], [19, 17, 15], "last 3-hour window")

	// Batch processing - process items in batches of 4
	const items = [
		"task1",
		"task2",
		"task3",
		"task4",
		"task5",
		"task6",
		"task7",
		"task8",
	]
	const batches = slidingWithStep(4, 4)(items)

	assertEquals(
		batches,
		[["task1", "task2", "task3", "task4"], [
			"task5",
			"task6",
			"task7",
			"task8",
		]],
		"should create non-overlapping batches",
	)

	// Signal processing - overlapping frames
	const signal = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	const frames = slidingWithStep(4, 2)(signal)

	assertEquals(frames.length, 4, "should create overlapping signal frames")
	assertEquals(frames[0], [0.1, 0.2, 0.3, 0.4], "first frame")
	assertEquals(frames[1], [0.3, 0.4, 0.5, 0.6], "second frame overlaps first")

	// Text n-grams
	const text = "hello world".split("")
	const trigrams = slidingWithStep(3, 1)(text)
	const trigramStrings = trigrams.map((chars) => chars.join(""))

	assertEquals(
		trigramStrings,
		["hel", "ell", "llo", "lo ", "o w", " wo", "wor", "orl", "rld"],
		"should create character trigrams",
	)
})
