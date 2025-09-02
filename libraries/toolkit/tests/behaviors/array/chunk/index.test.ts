import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import chunk from "../../../../src/simple/array/chunk/index.ts"

describe("chunk", () => {
	it("splits array into chunks of specified size", () => {
		assertEquals(chunk(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
		assertEquals(chunk(3)([1, 2, 3, 4, 5, 6, 7, 8]), [[1, 2, 3], [4, 5, 6], [
			7,
			8,
		]])
	})

	it("returns single chunk when size is larger than array", () => {
		assertEquals(chunk(10)([1, 2, 3]), [[1, 2, 3]])
	})

	it("returns array of single-element arrays when size is 1", () => {
		assertEquals(chunk(1)([1, 2, 3]), [[1], [2], [3]])
	})

	it("returns empty array when size is 0", () => {
		assertEquals(chunk(0)([1, 2, 3]), [])
	})

	it("returns empty array when size is negative", () => {
		assertEquals(chunk(-1)([1, 2, 3]), [])
		assertEquals(chunk(-10)([1, 2, 3]), [])
	})

	it("returns empty array when size is not an integer", () => {
		assertEquals(chunk(2.5)([1, 2, 3, 4]), [])
		assertEquals(chunk(NaN)([1, 2, 3]), [])
		assertEquals(chunk(Infinity)([1, 2, 3]), [])
	})

	it("returns empty array for empty input", () => {
		assertEquals(chunk(3)([]), [])
	})

	it("returns empty array for null input", () => {
		assertEquals(chunk(3)(null), [])
	})

	it("returns empty array for undefined input", () => {
		assertEquals(chunk(3)(undefined), [])
	})

	it("handles arrays with exactly divisible length", () => {
		assertEquals(chunk(2)([1, 2, 3, 4]), [[1, 2], [3, 4]])
		assertEquals(chunk(3)([1, 2, 3, 4, 5, 6]), [[1, 2, 3], [4, 5, 6]])
	})

	it("handles arrays with non-divisible length", () => {
		assertEquals(chunk(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
		assertEquals(chunk(3)([1, 2, 3, 4, 5, 6, 7]), [[1, 2, 3], [4, 5, 6], [7]])
	})

	it("works with string arrays", () => {
		assertEquals(chunk(2)(["a", "b", "c", "d", "e"]), [["a", "b"], ["c", "d"], [
			"e",
		]])
	})

	it("works with object arrays", () => {
		const objects = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
		assertEquals(chunk(2)(objects), [[{ id: 1 }, { id: 2 }], [{ id: 3 }, {
			id: 4,
		}]])
	})

	it("works with mixed type arrays", () => {
		const mixed = [1, "a", true, null, undefined]
		assertEquals(chunk(2)(mixed), [[1, "a"], [true, null], [undefined]])
	})

	it("preserves element order", () => {
		const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
		const chunks = chunk(3)(arr)
		const flattened = chunks.flat()
		assertEquals(flattened, arr)
	})

	it("is curried", () => {
		const pairwise = chunk(2)
		assertEquals(typeof pairwise, "function")
		assertEquals(pairwise([1, 2, 3, 4]), [[1, 2], [3, 4]])
		assertEquals(pairwise(["a", "b", "c"]), [["a", "b"], ["c"]])
	})

	it("handles large arrays efficiently", () => {
		const largeArray = Array.from({ length: 10000 }, (_, i) => i)
		const chunks = chunk(100)(largeArray)
		assertEquals(chunks.length, 100)
		assertEquals(chunks[0].length, 100)
		assertEquals(chunks[99].length, 100)
	})

	it("handles single element array", () => {
		assertEquals(chunk(1)([42]), [[42]])
		assertEquals(chunk(2)([42]), [[42]])
		assertEquals(chunk(10)([42]), [[42]])
	})

	it("handles batch processing use case", () => {
		const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		const batches = chunk(3)(ids)
		assertEquals(batches, [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]])
	})

	it("creates immutable chunks (no reference to original)", () => {
		const original = [1, 2, 3, 4]
		const chunks = chunk(2)(original)
		chunks[0][0] = 99
		assertEquals(original[0], 1) // Original unchanged
	})

	it("handles arrays with undefined values", () => {
		const arr = [1, undefined, 3, undefined, 5]
		assertEquals(chunk(2)(arr), [[1, undefined], [3, undefined], [5]])
	})

	it("handles arrays with null values", () => {
		const arr = [1, null, 3, null, 5]
		assertEquals(chunk(2)(arr), [[1, null], [3, null], [5]])
	})

	it("handles arrays with NaN values", () => {
		const arr = [1, NaN, 3, NaN, 5]
		const result = chunk(2)(arr)
		assertEquals(result.length, 3)
		assertEquals(result[0][0], 1)
		assertEquals(Number.isNaN(result[0][1]), true)
	})

	// Property-based tests
	describe("property tests", () => {
		it("all elements are preserved", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer({ min: 1, max: 100 }),
					(arr, size) => {
						const chunks = chunk(size)(arr)
						const flattened = chunks.flat()
						assertEquals(flattened, arr)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("no chunk exceeds the specified size", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer({ min: 1, max: 100 }),
					(arr, size) => {
						const chunks = chunk(size)(arr)
						chunks.forEach((ch, index) => {
							// Last chunk can be smaller
							if (index < chunks.length - 1) {
								assertEquals(ch.length, size)
							} else {
								assertEquals(ch.length <= size, true)
								assertEquals(ch.length > 0, true)
							}
						})
					},
				),
				{ numRuns: 100 },
			)
		})

		it("number of chunks is correct", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					fc.integer({ min: 1, max: 100 }),
					(arr, size) => {
						const chunks = chunk(size)(arr)
						const expectedChunks = Math.ceil(arr.length / size)
						assertEquals(chunks.length, expectedChunks)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("chunking is deterministic", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ min: 1, max: 50 }),
					(arr, size) => {
						const result1 = chunk(size)(arr)
						const result2 = chunk(size)(arr)
						assertEquals(result1, result2)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("empty array always produces empty result", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -100, max: 100 }),
					(size) => {
						const result = chunk(size)([])
						assertEquals(result, [])
					},
				),
				{ numRuns: 50 },
			)
		})

		it("size of 1 produces array of single-element arrays", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const chunks = chunk(1)(arr)
						assertEquals(chunks.length, arr.length)
						chunks.forEach((ch, i) => {
							assertEquals(ch.length, 1)
							assertEquals(ch[0], arr[i])
						})
					},
				),
				{ numRuns: 100 },
			)
		})

		it("chunking preserves types", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ min: 1, max: 20 }),
					(arr, size) => {
						const chunks = chunk(size)(arr)
						chunks.forEach((ch) => {
							ch.forEach((item) => {
								assertEquals(typeof item, "number")
							})
						})
					},
				),
				{ numRuns: 100 },
			)
		})
	})
})
