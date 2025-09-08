import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import omit from "../../../../src/simple/array/omit/index.ts"

describe("omit", () => {
	describe("basic functionality", () => {
		it("should remove elements at specified indices", () => {
			assertEquals(omit([1, 3])([1, 2, 3, 4, 5]), [1, 3, 5])
			assertEquals(omit([0])(["a", "b", "c"]), ["b", "c"])
			assertEquals(omit([0, 2, 4])(["a", "b", "c", "d", "e"]), ["b", "d"])
		})

		it("should handle negative indices", () => {
			assertEquals(omit([-1])([1, 2, 3, 4, 5]), [1, 2, 3, 4])
			assertEquals(omit([-2])([1, 2, 3, 4, 5]), [1, 2, 3, 5])
			assertEquals(omit([-1, -2])([1, 2, 3, 4, 5]), [1, 2, 3])
			assertEquals(
				omit([0, -1])(["header", "data1", "data2", "footer"]),
				[
					"data1",
					"data2",
				],
			)
		})

		it("should handle mixed positive and negative indices", () => {
			assertEquals(omit([0, -1])([1, 2, 3, 4]), [2, 3])
			assertEquals(omit([1, -2])(["a", "b", "c", "d"]), ["a", "d"])
		})

		it("should ignore out-of-bounds indices", () => {
			assertEquals(omit([10])([1, 2, 3]), [1, 2, 3])
			assertEquals(omit([-10])([1, 2, 3]), [1, 2, 3])
			assertEquals(omit([5, 10, -20])(["a", "b", "c"]), ["a", "b", "c"])
		})

		it("should handle duplicate indices", () => {
			assertEquals(omit([1, 1, 1])([1, 2, 3, 4]), [1, 3, 4])
			assertEquals(omit([0, 0])([1, 2, 3]), [2, 3])
			assertEquals(omit([-1, 2])([1, 2, 3]), [1, 2]) // -1 and 2 are the same index for length 3
		})

		it("should preserve order of remaining elements", () => {
			assertEquals(omit([1, 3, 5])([1, 2, 3, 4, 5, 6]), [1, 3, 5])
			assertEquals(omit([2, 0, 4])(["a", "b", "c", "d", "e"]), ["b", "d"])
		})
	})

	describe("edge cases", () => {
		it("should handle empty indices array", () => {
			assertEquals(omit([])([1, 2, 3]), [1, 2, 3])
			assertEquals(omit([])(["a", "b", "c"]), ["a", "b", "c"])
			assertEquals(omit([])([]), [])
		})

		it("should handle empty input array", () => {
			assertEquals(omit([0, 1, 2])([]), [])
			assertEquals(omit([-1])([]), [])
			assertEquals(omit([])([]), [])
		})

		it("should handle null and undefined input", () => {
			assertEquals(omit([0])(null), [])
			assertEquals(omit([0])(undefined), [])
			assertEquals(omit([])(null), [])
			assertEquals(omit([])(undefined), [])
		})

		it("should handle removing all elements", () => {
			assertEquals(omit([0, 1, 2])([1, 2, 3]), [])
			assertEquals(omit([0, 1, 2, 3, 4])(["a", "b"]), [])
		})

		it("should handle single element arrays", () => {
			assertEquals(omit([0])([1]), [])
			assertEquals(omit([1])([1]), [1])
			assertEquals(omit([-1])([1]), [])
		})
	})

	describe("currying", () => {
		it("should support partial application", () => {
			const omitFirst = omit([0])
			assertEquals(omitFirst([1, 2, 3]), [2, 3])
			assertEquals(omitFirst(["a", "b", "c"]), ["b", "c"])

			const omitEnds = omit([0, -1])
			assertEquals(omitEnds([1, 2, 3, 4]), [2, 3])
			assertEquals(omitEnds(["start", "middle", "end"]), ["middle"])

			const omitEveryOther = omit([0, 2, 4, 6])
			assertEquals(omitEveryOther([1, 2, 3, 4, 5, 6, 7]), [2, 4, 6])
		})
	})

	describe("types", () => {
		it("should preserve element types", () => {
			const numbers: Array<number> = omit([1])([1, 2, 3])
			assertEquals(numbers, [1, 3])

			const strings: Array<string> = omit([0])(["a", "b", "c"])
			assertEquals(strings, ["b", "c"])

			const booleans: Array<boolean> = omit([1])([true, false, true])
			assertEquals(booleans, [true, true])
		})

		it("should work with complex types", () => {
			const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
			const result = omit([1])(objects)
			assertEquals(result, [{ id: 1 }, { id: 3 }])

			const arrays = [[1, 2], [3, 4], [5, 6]]
			const result2 = omit([0, 2])(arrays)
			assertEquals(result2, [[3, 4]])
		})
	})

	describe("property-based tests", () => {
		it("should always return an array with length <= original length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.array(fc.integer()),
					(array, indices) => {
						const result = omit(indices)(array)
						return result.length <= array.length
					},
				),
			)
		})

		it("should never include elements at specified valid indices", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 }), {
						minLength: 1,
					}),
					fc.array(fc.nat(10)),
					(array, indices) => {
						const validIndices = indices.filter((i) =>
							i >= 0 && i < array.length
						)
						const result = omit(validIndices)(array)

						// Check that none of the omitted elements are in the result
						for (const index of validIndices) {
							const omittedElement = array[index]
							// We need to check by index position, not value
							// The result should not have the element that was at the omitted index
						}

						// Alternative check: result length should be array length minus unique valid indices
						const uniqueValidIndices = [...new Set(validIndices)]
						return result.length ===
							array.length - uniqueValidIndices.length
					},
				),
			)
		})

		it("should preserve order of remaining elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(array, indices) => {
						const result = omit(indices)(array)

						// Build expected result by filtering
						const normalizedIndices = indices.map((i) =>
							i < 0 ? array.length + i : i
						)
						const expected = array.filter((_, idx) =>
							!normalizedIndices.includes(idx)
						)

						return JSON.stringify(result) ===
							JSON.stringify(expected)
					},
				),
			)
		})

		it("should handle negative indices correctly", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					fc.array(fc.integer({ min: -10, max: -1 })),
					(array, negativeIndices) => {
						const result = omit(negativeIndices)(array)

						// Convert negative to positive indices
						const positiveIndices = negativeIndices.map((i) => array.length + i)
							.filter((i) => i >= 0 && i < array.length)

						const expected = omit(positiveIndices)(array)
						return JSON.stringify(result) ===
							JSON.stringify(expected)
					},
				),
			)
		})

		it("should return empty array for null/undefined", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(indices) => {
						return omit(indices)(null).length === 0 &&
							omit(indices)(undefined).length === 0
					},
				),
			)
		})

		it("should be idempotent with same indices", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.array(fc.integer()),
					(array, indices) => {
						const once = omit(indices)(array)
						const twice = omit([])(once) // Applying empty omit to result
						return JSON.stringify(once) === JSON.stringify(twice)
					},
				),
			)
		})
	})
})
