import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import splitEvery from "../../../../src/simple/array/splitEvery/index.ts"

Deno.test("splitEvery: basic functionality", async (t) => {
	await t.step("should split array into chunks of specified size", () => {
		const result = splitEvery(2)([1, 2, 3, 4, 5])
		assertEquals(result, [[1, 2], [3, 4], [5]])
	})

	await t.step("should handle exact divisions", () => {
		const result = splitEvery(3)([1, 2, 3, 4, 5, 6])
		assertEquals(result, [[1, 2, 3], [4, 5, 6]])
	})

	await t.step("should handle single-element chunks", () => {
		const result = splitEvery(1)([1, 2, 3])
		assertEquals(result, [[1], [2], [3]])
	})

	await t.step("should handle chunk size larger than array", () => {
		const result = splitEvery(10)([1, 2, 3])
		assertEquals(result, [[1, 2, 3]])
	})

	await t.step("should handle chunk size equal to array length", () => {
		const result = splitEvery(5)([1, 2, 3, 4, 5])
		assertEquals(result, [[1, 2, 3, 4, 5]])
	})

	await t.step("should work with strings", () => {
		const result = splitEvery(3)(["a", "b", "c", "d", "e"])
		assertEquals(result, [["a", "b", "c"], ["d", "e"]])
	})

	await t.step("should work with objects", () => {
		const data = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5 },
		]
		const result = splitEvery(2)(data)
		assertEquals(result, [
			[{ id: 1 }, { id: 2 }],
			[{ id: 3 }, { id: 4 }],
			[{ id: 5 }],
		])
	})
})

Deno.test("splitEvery: edge cases", async (t) => {
	await t.step("should return empty array for empty input", () => {
		const result = splitEvery(3)([])
		assertEquals(result, [])
	})

	await t.step("should return empty array for chunk size 0", () => {
		const result = splitEvery(0)([1, 2, 3])
		assertEquals(result, [])
	})

	await t.step("should return empty array for negative chunk size", () => {
		const result = splitEvery(-1)([1, 2, 3])
		assertEquals(result, [])
	})

	await t.step("should handle NaN chunk size as 0", () => {
		const result = splitEvery(NaN)([1, 2, 3])
		assertEquals(result, [])
	})

	await t.step("should handle Infinity chunk size", () => {
		const result = splitEvery(Infinity)([1, 2, 3])
		assertEquals(result, [[1, 2, 3]])
	})

	await t.step("should handle fractional chunk sizes", () => {
		// Fractional sizes are truncated by slice
		const result = splitEvery(2.5)([1, 2, 3, 4, 5])
		assertEquals(result, [[1, 2], [3, 4], [5]])
	})

	await t.step("should handle single element array", () => {
		const result = splitEvery(2)([42])
		assertEquals(result, [[42]])
	})

	await t.step("should handle arrays with undefined values", () => {
		const result = splitEvery(2)([1, undefined, 3, undefined])
		assertEquals(result, [[1, undefined], [3, undefined]])
	})

	await t.step("should handle arrays with null values", () => {
		const result = splitEvery(2)([1, null, 3, null])
		assertEquals(result, [[1, null], [3, null]])
	})
})

Deno.test("splitEvery: type safety", async (t) => {
	await t.step("should maintain type information", () => {
		const result = splitEvery(2)([1, 2, 3, 4])
		assertType<IsExact<typeof result, number[][]>>(true)
		assertEquals(result, [[1, 2], [3, 4]])
	})

	await t.step("should work with mixed types", () => {
		const mixed = [1, "two", true, null] as const
		const result = splitEvery(2)(mixed as unknown as Array<unknown>)
		assertType<IsExact<typeof result, unknown[][]>>(true)
		assertEquals(result, [[1, "two"], [true, null]])
	})

	await t.step("should work with complex types", () => {
		interface User {
			id: number
			name: string
		}
		const users: User[] = [
			{ id: 1, name: "Alice" },
			{ id: 2, name: "Bob" },
			{ id: 3, name: "Charlie" },
		]
		const result = splitEvery(2)(users)
		assertType<IsExact<typeof result, User[][]>>(true)
		assertEquals(result, [
			[{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
			[{ id: 3, name: "Charlie" }],
		])
	})
})

Deno.test("splitEvery: currying", async (t) => {
	await t.step("should be properly curried", () => {
		const splitByTwo = splitEvery(2)
		assertEquals(splitByTwo([1, 2, 3]), [[1, 2], [3]])
		assertEquals(splitByTwo([4, 5, 6, 7]), [[4, 5], [6, 7]])
	})

	await t.step(
		"should allow partial application with different chunk sizes",
		() => {
			const arr = [1, 2, 3, 4, 5, 6]
			const splitBy2 = splitEvery(2)
			const splitBy3 = splitEvery(3)

			assertEquals(splitBy2(arr), [[1, 2], [3, 4], [5, 6]])
			assertEquals(splitBy3(arr), [[1, 2, 3], [4, 5, 6]])
		},
	)
})

Deno.test("splitEvery: immutability", async (t) => {
	await t.step("should not modify the original array", () => {
		const original = [1, 2, 3, 4, 5]
		const copy = [...original]

		splitEvery(2)(original)
		assertEquals(original, copy)
	})

	await t.step("should not share references with original array", () => {
		const original = [{ val: 1 }, { val: 2 }, { val: 3 }]
		const result = splitEvery(2)(original)

		// Modifying result shouldn't affect original
		result[0][0] = { val: 99 }
		assertEquals(original[0], { val: 1 })
	})

	await t.step("chunks should be independent", () => {
		const result = splitEvery(2)([1, 2, 3, 4])
		result[0].push(99)

		// Other chunks shouldn't be affected
		assertEquals(result[1], [3, 4])
	})
})

Deno.test("splitEvery: practical examples", async (t) => {
	await t.step("should paginate data", () => {
		const items = Array.from({ length: 10 }, (_, i) => i + 1)
		const pageSize = 3
		const pages = splitEvery(pageSize)(items)

		assertEquals(pages, [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[10],
		])
	})

	await t.step("should batch process items", () => {
		const tasks = ["task1", "task2", "task3", "task4", "task5"]
		const batchSize = 2
		const batches = splitEvery(batchSize)(tasks)

		assertEquals(batches, [
			["task1", "task2"],
			["task3", "task4"],
			["task5"],
		])
	})

	await t.step("should create rows for grid layout", () => {
		const items = ["A", "B", "C", "D", "E", "F", "G"]
		const columns = 3
		const rows = splitEvery(columns)(items)

		assertEquals(rows, [
			["A", "B", "C"],
			["D", "E", "F"],
			["G"],
		])
	})

	await t.step("should split text into lines", () => {
		const words = "The quick brown fox jumps over the lazy dog".split(" ")
		const wordsPerLine = 4
		const lines = splitEvery(wordsPerLine)(words)

		assertEquals(lines, [
			["The", "quick", "brown", "fox"],
			["jumps", "over", "the", "lazy"],
			["dog"],
		])
	})
})

Deno.test("splitEvery: property-based tests", async (t) => {
	await t.step("should preserve all elements", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer({ min: 1, max: 100 }),
				(arr, chunkSize) => {
					const chunks = splitEvery(chunkSize)(arr)
					const flattened = chunks.flat()
					return JSON.stringify(flattened) === JSON.stringify(arr)
				},
			),
		)
	})

	await t.step("should create chunks no larger than specified size", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer({ min: 1, max: 100 }),
				(arr, chunkSize) => {
					if (arr.length === 0) return true
					const chunks = splitEvery(chunkSize)(arr)
					// All chunks except possibly the last should have exactly chunkSize elements
					for (let i = 0; i < chunks.length - 1; i++) {
						if (chunks[i].length !== chunkSize) return false
					}
					// Last chunk should have at most chunkSize elements
					const lastChunk = chunks[chunks.length - 1]
					return lastChunk.length > 0 && lastChunk.length <= chunkSize
				},
			),
		)
	})

	await t.step("should create correct number of chunks", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer(), { minLength: 1 }),
				fc.integer({ min: 1, max: 100 }),
				(arr, chunkSize) => {
					const chunks = splitEvery(chunkSize)(arr)
					const expectedChunks = Math.ceil(arr.length / chunkSize)
					return chunks.length === expectedChunks
				},
			),
		)
	})

	await t.step("should handle zero or negative chunk sizes", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer({ max: 0 }),
				(arr, chunkSize) => {
					const result = splitEvery(chunkSize)(arr)
					return result.length === 0
				},
			),
		)
	})

	await t.step("should be idempotent with chunk size 1 then flatten", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					const chunked = splitEvery(1)(arr)
					const flattened = chunked.flat()
					return JSON.stringify(flattened) === JSON.stringify(arr)
				},
			),
		)
	})

	await t.step("should handle very large chunk sizes", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					if (arr.length === 0) {
						const result = splitEvery(Number.MAX_SAFE_INTEGER)(arr)
						return result.length === 0
					} else {
						const result = splitEvery(Number.MAX_SAFE_INTEGER)(arr)
						return result.length === 1 &&
							JSON.stringify(result[0]) === JSON.stringify(arr)
					}
				},
			),
		)
	})
})

Deno.test("splitEvery: recursive implementation behavior", async (t) => {
	await t.step("should handle large arrays without stack overflow", () => {
		// Test with moderately large array
		const largeArray = Array.from({ length: 1000 }, (_, i) => i)
		const result = splitEvery(100)(largeArray)
		assertEquals(result.length, 10)
		assertEquals(result[0].length, 100)
		assertEquals(result[9].length, 100)
	})

	await t.step("should work correctly with recursive calls", () => {
		// The implementation uses recursion, verify it works correctly
		const arr = [1, 2, 3, 4, 5, 6, 7]
		const result = splitEvery(3)(arr)
		assertEquals(result, [[1, 2, 3], [4, 5, 6], [7]])

		// Verify each chunk is independent
		assertEquals(result[0], [1, 2, 3])
		assertEquals(result[1], [4, 5, 6])
		assertEquals(result[2], [7])
	})
})

Deno.test("splitEvery: specific test cases from examples", async (t) => {
	await t.step("should split [1,2,3,4,5] by 2", () => {
		assertEquals(splitEvery(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
	})

	await t.step("should split [a,b,c,d] by 3", () => {
		assertEquals(splitEvery(3)(["a", "b", "c", "d"]), [["a", "b", "c"], [
			"d",
		]])
	})

	await t.step("should split [1,2,3] by 1", () => {
		assertEquals(splitEvery(1)([1, 2, 3]), [[1], [2], [3]])
	})

	await t.step("should return empty for chunk size 0", () => {
		assertEquals(splitEvery(0)([1, 2, 3]), [])
	})

	await t.step("should handle chunk size larger than array", () => {
		assertEquals(splitEvery(10)([1, 2, 3]), [[1, 2, 3]])
	})
})
