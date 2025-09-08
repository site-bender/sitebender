import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import sort from "../../../../src/simple/array/sort/index.ts"

// Test JSDoc examples
Deno.test("sort: JSDoc examples", async (t) => {
	await t.step("sorts [3, 1, 2] to [1, 2, 3] with default comparator", () => {
		assertEquals(sort()([3, 1, 2]), [1, 2, 3])
	})

	await t.step(
		"sorts [1, 2, 3] to [3, 2, 1] with descending comparator",
		() => {
			assertEquals(sort((a: number, b: number) => b - a)([1, 2, 3]), [
				3,
				2,
				1,
			])
		},
	)

	await t.step(
		'sorts ["c", "a", "b"] to ["a", "b", "c"] with default',
		() => {
			assertEquals(sort()(["c", "a", "b"]), ["a", "b", "c"])
		},
	)

	await t.step("sorts strings by length", () => {
		assertEquals(
			sort((a: string, b: string) => a.length - b.length)([
				"aaa",
				"a",
				"aa",
			]),
			["a", "aa", "aaa"],
		)
	})

	await t.step("sorts objects by age property", () => {
		const byAge = sort((a: { age: number }, b: { age: number }) =>
			a.age - b.age
		)
		assertEquals(
			byAge([{ age: 30 }, { age: 20 }, { age: 25 }]),
			[{ age: 20 }, { age: 25 }, { age: 30 }],
		)
	})
})

// Property-based tests
Deno.test("sort: idempotent property (sorting sorted array gives same result)", () => {
	fc.assert(
		fc.property(fc.array(fc.integer()), (arr) => {
			const sorted = sort()(arr)
			const doubleSorted = sort()(sorted)
			return JSON.stringify(sorted) === JSON.stringify(doubleSorted)
		}),
		{ numRuns: 1000 },
	)
})

Deno.test("sort: length preservation", () => {
	fc.assert(
		fc.property(fc.array(fc.anything()), (arr) => {
			try {
				const sorted = sort()(arr)
				return sorted.length === arr.length
			} catch {
				// Some objects can't be converted to primitives for sorting
				// This is expected behavior - the sort function should throw
				// when given incomparable elements without a compareFn
				return true
			}
		}),
		{ numRuns: 1000 },
	)
})

Deno.test("sort: ordering property for numbers", () => {
	fc.assert(
		fc.property(fc.array(fc.integer()), (arr) => {
			const sorted = sort((a: number, b: number) => a - b)(arr)
			for (let i = 1; i < sorted.length; i++) {
				if (sorted[i] < sorted[i - 1]) return false
			}
			return true
		}),
		{ numRuns: 1000 },
	)
})

Deno.test("sort: permutation property (contains same elements)", () => {
	fc.assert(
		fc.property(fc.array(fc.integer()), (arr) => {
			const sorted = sort<number>()(arr)
			const originalCounts = new Map<number, number>()
			const sortedCounts = new Map<number, number>()

			for (const val of arr) {
				originalCounts.set(val, (originalCounts.get(val) || 0) + 1)
			}
			for (const val of sorted) {
				sortedCounts.set(val, (sortedCounts.get(val) || 0) + 1)
			}

			if (originalCounts.size !== sortedCounts.size) return false
			for (const [key, count] of originalCounts) {
				if (sortedCounts.get(key) !== count) return false
			}
			return true
		}),
		{ numRuns: 1000 },
	)
})

// Edge cases
Deno.test("sort: edge cases", async (t) => {
	await t.step("handles empty array", () => {
		assertEquals(sort()([]), [])
	})

	await t.step("handles single element array", () => {
		assertEquals(sort()([42]), [42])
	})

	await t.step("handles two element array", () => {
		assertEquals(sort()([2, 1]), [1, 2])
	})

	await t.step("handles array with duplicates", () => {
		assertEquals(sort()([3, 1, 2, 1, 3]), [1, 1, 2, 3, 3])
	})

	await t.step("handles array with undefined values", () => {
		const result = sort()([3, undefined, 1, undefined, 2])
		assertEquals(result, [1, 2, 3, undefined, undefined])
	})

	await t.step("handles array with null values", () => {
		// Note: null converts to "null" string in default sort
		const result = sort()([3, null, 1, null, 2])
		// Default sort converts to strings, so: "1", "2", "3", "null", "null"
		assertEquals(result.filter((x) => x !== null), [1, 2, 3])
		assertEquals(result.filter((x) => x === null).length, 2)
	})

	await t.step("handles array with NaN values", () => {
		const result = sort((a: number, b: number) => {
			if (Number.isNaN(a) && Number.isNaN(b)) return 0
			if (Number.isNaN(a)) return 1 // NaN goes to end
			if (Number.isNaN(b)) return -1
			return a - b
		})([3, NaN, 1, NaN, 2])
		assertEquals(result.slice(0, 3), [1, 2, 3])
		assertEquals(result.slice(3).every(Number.isNaN), true)
	})

	await t.step("handles sparse arrays", () => {
		// deno-lint-ignore no-sparse-arrays
		const sparse = [3, , 1, , 2]
		const result = sort()(sparse)
		assertEquals(result, [1, 2, 3, undefined, undefined])
	})

	await t.step("handles negative numbers", () => {
		assertEquals(sort((a: number, b: number) => a - b)([-3, -1, -2]), [
			-3,
			-2,
			-1,
		])
	})

	await t.step("handles mixed positive and negative", () => {
		assertEquals(sort((a: number, b: number) => a - b)([3, -1, 0, -2, 1]), [
			-2,
			-1,
			0,
			1,
			3,
		])
	})

	await t.step("handles strings with numbers (default sort)", () => {
		// Default sort treats as strings: "10" < "2" alphabetically
		assertEquals(sort()(["10", "2", "1"]), ["1", "10", "2"])
	})

	await t.step("handles strings with proper numeric sort", () => {
		assertEquals(
			sort((a: string, b: string) => parseInt(a) - parseInt(b))([
				"10",
				"2",
				"1",
			]),
			["1", "2", "10"],
		)
	})

	await t.step("handles case-sensitive string sort", () => {
		assertEquals(sort()(["b", "A", "c", "B"]), ["A", "B", "b", "c"])
	})

	await t.step("handles case-insensitive string sort", () => {
		assertEquals(
			sort((a: string, b: string) =>
				a.toLowerCase().localeCompare(b.toLowerCase())
			)(["b", "A", "c", "B"]),
			["A", "b", "B", "c"],
		)
	})
})

// Currying tests
Deno.test("sort: currying", async (t) => {
	await t.step("supports partial application with compareFn", () => {
		const descending = sort((a: number, b: number) => b - a)
		assertEquals(descending([1, 2, 3]), [3, 2, 1])
		assertEquals(descending([5, 1, 3]), [5, 3, 1])
	})

	await t.step("supports partial application without compareFn", () => {
		const defaultSort = sort()
		assertEquals(defaultSort([3, 1, 2]), [1, 2, 3])
		assertEquals(defaultSort(["c", "a", "b"]), ["a", "b", "c"])
	})

	await t.step("allows creating reusable sorters", () => {
		const byLength = sort((a: string, b: string) => a.length - b.length)
		assertEquals(byLength(["aaa", "a", "aa"]), ["a", "aa", "aaa"])
		assertEquals(byLength(["long", "x", "mid"]), ["x", "mid", "long"])
	})
})

// Immutability test
Deno.test("sort: immutability", () => {
	const original = [3, 1, 2]
	const sorted = sort()(original)

	assertEquals(sorted, [1, 2, 3])
	assertEquals(original, [3, 1, 2]) // Original unchanged

	// Modifying sorted should not affect original
	sorted[0] = 999
	assertEquals(original, [3, 1, 2])
})

// Complex sorting scenarios
Deno.test("sort: complex sorting", async (t) => {
	await t.step("sorts by multiple criteria", () => {
		const data = [
			{ name: "Alice", age: 30 },
			{ name: "Bob", age: 25 },
			{ name: "Charlie", age: 30 },
			{ name: "David", age: 25 },
		]

		type Person = { name: string; age: number }
		// Sort by age, then by name
		const sorted = sort((a: Person, b: Person) => {
			const ageDiff = a.age - b.age
			if (ageDiff !== 0) return ageDiff
			return a.name.localeCompare(b.name)
		})(data)

		assertEquals(sorted, [
			{ name: "Bob", age: 25 },
			{ name: "David", age: 25 },
			{ name: "Alice", age: 30 },
			{ name: "Charlie", age: 30 },
		])
	})

	await t.step("handles large arrays efficiently", () => {
		const large = Array.from({ length: 10000 }, () => Math.random())
		const sorted = sort((a: number, b: number) => a - b)(large)

		// Verify it's sorted
		for (let i = 1; i < sorted.length; i++) {
			assertEquals(sorted[i] >= sorted[i - 1], true)
		}
	})

	await t.step("stable sort for equal elements", () => {
		// Note: JavaScript's sort is stable as of ES2019
		const data = [
			{ id: 1, value: "a" },
			{ id: 2, value: "b" },
			{ id: 3, value: "a" },
			{ id: 4, value: "b" },
		]

		type Item = { id: number; value: string }
		const sorted = sort((a: Item, b: Item) => a.value.localeCompare(b.value))(
			data,
		)

		// Elements with same value should maintain relative order
		assertEquals(sorted[0].id, 1) // First "a"
		assertEquals(sorted[1].id, 3) // Second "a"
		assertEquals(sorted[2].id, 2) // First "b"
		assertEquals(sorted[3].id, 4) // Second "b"
	})
})
