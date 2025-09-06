import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import chunk from "../../../../../src/simple/array/chunk/index.ts"

Deno.test("chunk - JSDoc examples", async (t) => {
	await t.step("split into pairs with remainder", () => {
		const result = chunk(2)([1, 2, 3, 4, 5])
		assertEquals(result, [[1, 2], [3, 4], [5]])
	})

	await t.step("split into groups of 3", () => {
		const result = chunk(3)([1, 2, 3, 4, 5, 6, 7, 8])
		assertEquals(result, [[1, 2, 3], [4, 5, 6], [7, 8]])
	})

	await t.step("chunk size larger than array", () => {
		const result = chunk(10)([1, 2, 3])
		assertEquals(result, [[1, 2, 3]])
	})

	await t.step("single element chunks", () => {
		const result = chunk(1)([1, 2, 3])
		assertEquals(result, [[1], [2], [3]])
	})

	await t.step("process strings as character arrays", () => {
		const result = chunk(3)(["a", "b", "c", "d", "e", "f", "g"])
		assertEquals(result, [["a", "b", "c"], ["d", "e", "f"], ["g"]])
	})

	await t.step("batch processing example", () => {
		const users = [
			{ id: 1, name: "Alice" },
			{ id: 2, name: "Bob" },
			{ id: 3, name: "Charlie" },
			{ id: 4, name: "Dave" },
			{ id: 5, name: "Eve" },
		]
		const result = chunk(2)(users)
		assertEquals(result, [
			[{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
			[{ id: 3, name: "Charlie" }, { id: 4, name: "Dave" }],
			[{ id: 5, name: "Eve" }],
		])
	})

	await t.step("matrix creation", () => {
		const result = chunk(4)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
		assertEquals(result, [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
	})

	await t.step("partial application for reusable chunkers", () => {
		const pairwise = chunk(2)
		assertEquals(pairwise([1, 2, 3, 4]), [[1, 2], [3, 4]])
		assertEquals(pairwise(["a", "b", "c"]), [["a", "b"], ["c"]])

		const batchBy3 = chunk(3)
		assertEquals(batchBy3([1, 2, 3, 4, 5, 6, 7]), [[1, 2, 3], [4, 5, 6], [
			7,
		]])
	})

	await t.step("edge cases", () => {
		assertEquals(chunk(3)([]), [])
		assertEquals(chunk(0)([1, 2, 3]), [])
		assertEquals(chunk(-1)([1, 2, 3]), [])
	})

	await t.step("handle null/undefined gracefully", () => {
		assertEquals(chunk(2)(null), [])
		assertEquals(chunk(2)(undefined), [])
	})
})

Deno.test("chunk - property: preserves all elements", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 100 }),
			fc.array(fc.anything(), { minLength: 0, maxLength: 100 }),
			(size, array) => {
				const chunked = chunk(size)(array)
				const flattened = chunked.flat()

				// All elements should be preserved
				return flattened.length === array.length &&
					flattened.every((elem, i) => Object.is(elem, array[i]))
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("chunk - property: chunk sizes are correct", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 100 }),
			fc.array(fc.anything(), { minLength: 1, maxLength: 100 }),
			(size, array) => {
				const chunked = chunk(size)(array)

				if (chunked.length === 0) return array.length === 0

				// All chunks except possibly the last should have the specified size
				for (let i = 0; i < chunked.length - 1; i++) {
					if (chunked[i].length !== size) return false
				}

				// Last chunk should have size between 1 and size
				const lastChunk = chunked[chunked.length - 1]
				return lastChunk.length > 0 && lastChunk.length <= size
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("chunk - property: order is preserved", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 50 }),
			fc.array(fc.integer(), { minLength: 0, maxLength: 100 }),
			(size, array) => {
				const chunked = chunk(size)(array)
				let index = 0

				for (const chunkArray of chunked) {
					for (const elem of chunkArray) {
						if (elem !== array[index]) return false
						index++
					}
				}

				return index === array.length
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("chunk - property: number of chunks is correct", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 100 }),
			fc.array(fc.anything(), { minLength: 0, maxLength: 100 }),
			(size, array) => {
				const chunked = chunk(size)(array)
				const expectedChunks = Math.ceil(array.length / size)

				return chunked.length === expectedChunks ||
					(array.length === 0 && chunked.length === 0)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("chunk - immutability", () => {
	const original = [1, 2, 3, 4, 5]
	const originalCopy = [...original]

	const result = chunk(2)(original)

	// Original array should not be modified
	assertEquals(original, originalCopy)

	// Result should be a new array (different reference)
	assert(result !== (original as unknown))
})

Deno.test("chunk - handles various input types", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 10 }),
			fc.oneof(
				fc.array(fc.string()),
				fc.array(fc.integer()),
				fc.array(fc.boolean()),
				fc.array(fc.object()),
			),
			(size, array) => {
				const result = chunk(size)(array)

				// Should handle any array type
				return Array.isArray(result) &&
					result.every((c) => Array.isArray(c))
			},
		),
		{ numRuns: 500 },
	)
})

Deno.test("chunk - invalid size handling", () => {
	const testArray = [1, 2, 3, 4, 5]

	// Invalid sizes should return empty array
	assertEquals(chunk(0)(testArray), [])
	assertEquals(chunk(-1)(testArray), [])
	assertEquals(chunk(-100)(testArray), [])
	assertEquals(chunk(NaN)(testArray), [])
	assertEquals(chunk(Infinity)(testArray), [])
	assertEquals(chunk(0.5)(testArray), [])
	assertEquals(chunk(null as any)(testArray), [])
	assertEquals(chunk(undefined as any)(testArray), [])
})

Deno.test("chunk - currying behavior", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 20 }),
			fc.array(fc.integer(), { minLength: 0, maxLength: 50 }),
			(size, array) => {
				// Create a curried function
				const chunker = chunk(size)

				// Apply it multiple times - should give same result
				const result1 = chunker(array)
				const result2 = chunker(array)

				return JSON.stringify(result1) === JSON.stringify(result2)
			},
		),
		{ numRuns: 500 },
	)
})

Deno.test("chunk - empty array handling", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 100 }),
			(size) => {
				const result = chunk(size)([])
				return Array.isArray(result) && result.length === 0
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("chunk - single element array", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 100 }),
			fc.anything(),
			(size, element) => {
				const result = chunk(size)([element])

				return result.length === 1 &&
					result[0].length === 1 &&
					(Object.is(result[0][0], element) ||
						(Number.isNaN(result[0][0]) && Number.isNaN(element)))
			},
		),
		{ numRuns: 500 },
	)
})
