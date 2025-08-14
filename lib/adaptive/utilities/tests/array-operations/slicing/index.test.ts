import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import slice from "../../../array/slice/index.ts"
import sliceFrom from "../../../array/sliceFrom/index.ts"
import take from "../../../array/take/index.ts"
import takeLast from "../../../array/takeLast/index.ts"
import drop from "../../../array/drop/index.ts"
import dropLast from "../../../array/dropLast/index.ts"
import splitEvery from "../../../array/splitEvery/index.ts"

describe("Array Slicing Behaviors", () => {
	describe("when slicing arrays", () => {
		it("extracts portion from start to end index", () => {
			const result = slice(1, 4)([0, 1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 3])
		})

		it("handles negative start index", () => {
			const result = slice(-3, 5)([0, 1, 2, 3, 4, 5])
			expect(result).toEqual([3, 4])
		})

		it("handles negative end index", () => {
			const result = slice(1, -1)([0, 1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("handles both negative indices", () => {
			const result = slice(-4, -1)([0, 1, 2, 3, 4, 5])
			expect(result).toEqual([2, 3, 4])
		})

		it("returns empty when start >= end", () => {
			const result = slice(3, 2)([0, 1, 2, 3, 4])
			expect(result).toEqual([])
		})

		it("handles out of bounds indices", () => {
			const arr = [1, 2, 3]
			expect(slice(0, 10)(arr)).toEqual([1, 2, 3])
			expect(slice(-10, 2)(arr)).toEqual([1, 2])
			expect(slice(10, 20)(arr)).toEqual([])
		})

		it("returns copy when indices cover entire array", () => {
			const original = [1, 2, 3]
			const result = slice(0, 3)(original)
			expect(result).toEqual(original)
			expect(result).not.toBe(original)
		})

		it("handles empty arrays", () => {
			const result = slice(0, 2)([])
			expect(result).toEqual([])
		})
	})

	describe("when slicing from index", () => {
		it("returns elements from start index to end", () => {
			const result = sliceFrom(2)([0, 1, 2, 3, 4])
			expect(result).toEqual([2, 3, 4])
		})

		it("handles negative indices", () => {
			const result = sliceFrom(-2)([0, 1, 2, 3, 4])
			expect(result).toEqual([3, 4])
		})

		it("returns empty for out of bounds positive index", () => {
			const result = sliceFrom(10)([1, 2, 3])
			expect(result).toEqual([])
		})

		it("returns full array for large negative index", () => {
			const result = sliceFrom(-10)([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("handles zero index", () => {
			const result = sliceFrom(0)([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("handles empty arrays", () => {
			const result = sliceFrom(2)([])
			expect(result).toEqual([])
		})
	})

	describe("when taking elements from start", () => {
		it("takes specified number of elements", () => {
			const result = take(3)([1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 3])
		})

		it("returns all elements when n exceeds length", () => {
			const result = take(10)([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("returns empty array for n <= 0", () => {
			expect(take(0)([1, 2, 3])).toEqual([])
			expect(take(-1)([1, 2, 3])).toEqual([])
		})

		it("handles single element", () => {
			const result = take(1)([1, 2, 3])
			expect(result).toEqual([1])
		})

		it("handles empty arrays", () => {
			const result = take(3)([])
			expect(result).toEqual([])
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3, 4, 5]
			const result = take(3)(original)
			expect(original).toEqual([1, 2, 3, 4, 5])
			expect(result).not.toBe(original)
		})
	})

	describe("when taking elements from end", () => {
		it("takes specified number from end", () => {
			const result = takeLast(3)([1, 2, 3, 4, 5])
			expect(result).toEqual([3, 4, 5])
		})

		it("returns all elements when n exceeds length", () => {
			const result = takeLast(10)([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("returns empty array for n <= 0", () => {
			expect(takeLast(0)([1, 2, 3])).toEqual([])
			expect(takeLast(-1)([1, 2, 3])).toEqual([])
		})

		it("handles single element", () => {
			const result = takeLast(1)([1, 2, 3])
			expect(result).toEqual([3])
		})

		it("handles empty arrays", () => {
			const result = takeLast(3)([])
			expect(result).toEqual([])
		})

		it("maintains order", () => {
			const result = takeLast(2)([1, 2, 3, 4])
			expect(result).toEqual([3, 4])
		})
	})

	describe("when dropping elements from start", () => {
		it("drops specified number of elements", () => {
			const result = drop(2)([1, 2, 3, 4, 5])
			expect(result).toEqual([3, 4, 5])
		})

		it("returns empty when n >= length", () => {
			const result = drop(5)([1, 2, 3])
			expect(result).toEqual([])
		})

		it("returns all elements for n <= 0", () => {
			expect(drop(0)([1, 2, 3])).toEqual([1, 2, 3])
			expect(drop(-1)([1, 2, 3])).toEqual([1, 2, 3])
		})

		it("drops all but last element", () => {
			const result = drop(2)([1, 2, 3])
			expect(result).toEqual([3])
		})

		it("handles empty arrays", () => {
			const result = drop(2)([])
			expect(result).toEqual([])
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3, 4, 5]
			const result = drop(2)(original)
			expect(original).toEqual([1, 2, 3, 4, 5])
			expect(result).not.toBe(original)
		})
	})

	describe("when dropping elements from end", () => {
		it("drops specified number from end", () => {
			const result = dropLast(2)([1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 3])
		})

		it("returns empty when n >= length", () => {
			const result = dropLast(5)([1, 2, 3])
			expect(result).toEqual([])
		})

		it("returns all elements for n <= 0", () => {
			expect(dropLast(0)([1, 2, 3])).toEqual([1, 2, 3])
			expect(dropLast(-1)([1, 2, 3])).toEqual([1, 2, 3])
		})

		it("drops all but first element", () => {
			const result = dropLast(2)([1, 2, 3])
			expect(result).toEqual([1])
		})

		it("handles empty arrays", () => {
			const result = dropLast(2)([])
			expect(result).toEqual([])
		})

		it("maintains order", () => {
			const result = dropLast(1)([1, 2, 3, 4])
			expect(result).toEqual([1, 2, 3])
		})
	})

	describe("when splitting array into chunks", () => {
		it("splits into chunks of specified size", () => {
			const result = splitEvery(2)([1, 2, 3, 4, 5, 6])
			expect(result).toEqual([[1, 2], [3, 4], [5, 6]])
		})

		it("handles remainder in last chunk", () => {
			const result = splitEvery(3)([1, 2, 3, 4, 5])
			expect(result).toEqual([[1, 2, 3], [4, 5]])
		})

		it("returns single chunk when n >= length", () => {
			const result = splitEvery(10)([1, 2, 3])
			expect(result).toEqual([[1, 2, 3]])
		})

		it("handles n = 1", () => {
			const result = splitEvery(1)([1, 2, 3])
			expect(result).toEqual([[1], [2], [3]])
		})

		it("returns empty array for empty input", () => {
			const result = splitEvery(2)([])
			expect(result).toEqual([])
		})

		it("handles n <= 0 by returning empty array", () => {
			expect(splitEvery(0)([1, 2, 3])).toEqual([])
			expect(splitEvery(-1)([1, 2, 3])).toEqual([])
		})

		it("works with different types", () => {
			const result = splitEvery(2)(["a", "b", "c", "d"])
			expect(result).toEqual([["a", "b"], ["c", "d"]])
		})

		it("preserves element order within chunks", () => {
			const result = splitEvery(3)([1, 2, 3, 4, 5, 6, 7])
			expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]])
		})
	})

	describe("property-based tests", () => {
		it("take and drop partition the array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.nat(),
					(arr, n) => {
						const taken = take(n)(arr)
						const dropped = drop(n)(arr)
						expect(taken.length + dropped.length).toBe(arr.length)
						expect([...taken, ...dropped]).toEqual(arr)
					},
				),
			)
		})

		it("take never exceeds requested or array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.nat(),
					(arr, n) => {
						const taken = take(n)(arr)
						expect(taken.length).toBeLessThanOrEqual(n)
						expect(taken.length).toBeLessThanOrEqual(arr.length)
					},
				),
			)
		})

		it("takeLast returns last n elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const n = Math.floor(Math.random() * arr.length) + 1
						const taken = takeLast(n)(arr)
						expect(taken).toEqual(arr.slice(-n))
					},
				),
			)
		})

		it("drop reduces length correctly", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.nat(),
					(arr, n) => {
						const dropped = drop(n)(arr)
						const expectedLength = Math.max(0, arr.length - n)
						expect(dropped.length).toBe(expectedLength)
					},
				),
			)
		})

		it("dropLast reduces length correctly", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.nat(),
					(arr, n) => {
						const dropped = dropLast(n)(arr)
						const expectedLength = Math.max(0, arr.length - n)
						expect(dropped.length).toBe(expectedLength)
					},
				),
			)
		})

		it("take(0) returns empty array", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					expect(take(0)(arr)).toEqual([])
				}),
			)
		})

		it("drop(0) returns original array", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					expect(drop(0)(arr)).toEqual(arr)
				}),
			)
		})

		it("take with large n returns whole array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer({ min: 1000, max: 10000 }),
					(arr, n) => {
						expect(take(n)(arr)).toEqual(arr)
					},
				),
			)
		})

		it("drop with large n returns empty array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer({ min: 1000, max: 10000 }),
					(arr, n) => {
						expect(drop(n)(arr)).toEqual([])
					},
				),
			)
		})

		it("splitEvery chunks sum to original length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer({ min: 1, max: 100 }),
					(arr, n) => {
						const chunks = splitEvery(n)(arr)
						const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
						expect(totalLength).toBe(arr.length)
					},
				),
			)
		})

		it("splitEvery chunks are at most n elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer({ min: 1, max: 100 }),
					(arr, n) => {
						const chunks = splitEvery(n)(arr)
						chunks.forEach((chunk, i) => {
							if (i < chunks.length - 1) {
								expect(chunk.length).toBe(n)
							} else {
								expect(chunk.length).toBeLessThanOrEqual(n)
								expect(chunk.length).toBeGreaterThan(0)
							}
						})
					},
				),
			)
		})

		it("splitEvery preserves order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ min: 1, max: 100 }),
					(arr, n) => {
						const chunks = splitEvery(n)(arr)
						const flattened = chunks.flat()
						expect(flattened).toEqual(arr)
					},
				),
			)
		})

		it("sliceFrom to end equals drop", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.nat(),
					(arr, n) => {
						const sliced = sliceFrom(n)(arr)
						const dropped = drop(n)(arr)
						expect(sliced).toEqual(dropped)
					},
				),
			)
		})

		it("take and takeLast with same n on reversed array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.nat(),
					(arr, n) => {
						const taken = take(n)(arr)
						const reversed = [...arr].reverse()
						const takenLast = takeLast(n)(reversed)
						expect(taken.length).toBe(takenLast.length)
					},
				),
			)
		})
	})
})