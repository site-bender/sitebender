import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"
import fc from "npm:fast-check"

import range from "../../../../src/simple/array/range/index.ts"

describe("range", () => {
	describe("basic functionality", () => {
		it("should generate range from 0 to n", () => {
			assertEquals(range(0)(5), [0, 1, 2, 3, 4])
			assertEquals(range(0)(1), [0])
			assertEquals(range(0)(10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
		})

		it("should generate range from positive start", () => {
			assertEquals(range(1)(6), [1, 2, 3, 4, 5])
			assertEquals(range(5)(10), [5, 6, 7, 8, 9])
			assertEquals(range(100)(105), [100, 101, 102, 103, 104])
		})

		it("should generate range with negative numbers", () => {
			assertEquals(range(-5)(0), [-5, -4, -3, -2, -1])
			assertEquals(range(-2)(3), [-2, -1, 0, 1, 2])
			assertEquals(range(-10)(-5), [-10, -9, -8, -7, -6])
		})

		it("should handle single element ranges", () => {
			assertEquals(range(0)(1), [0])
			assertEquals(range(5)(6), [5])
			assertEquals(range(-1)(0), [-1])
		})

		it("should handle fractional numbers", () => {
			assertEquals(range(0.5)(3.5), [0.5, 1.5, 2.5])
			assertEquals(range(1.1)(4.9), [1.1, 2.1, 3.1])
			assertEquals(range(-1.5)(1.5), [-1.5, -0.5, 0.5])
		})
	})

	describe("edge cases", () => {
		it("should return empty array when start equals end", () => {
			assertEquals(range(0)(0), [])
			assertEquals(range(5)(5), [])
			assertEquals(range(-10)(-10), [])
		})

		it("should return empty array when start is greater than end", () => {
			assertEquals(range(5)(3), [])
			assertEquals(range(10)(0), [])
			assertEquals(range(0)(-5), [])
		})

		it("should handle very large ranges", () => {
			const bigRange = range(0)(1000)
			assertEquals(bigRange.length, 1000)
			assertEquals(bigRange[0], 0)
			assertEquals(bigRange[999], 999)
		})

		it("should handle Infinity", () => {
			assertEquals(range(0)(Infinity), [])
			assertEquals(range(-Infinity)(0), [])
			assertEquals(range(-Infinity)(Infinity), [])
			assertEquals(range(Infinity)(Infinity), [])
		})

		it("should handle NaN", () => {
			assertEquals(range(NaN)(10), [])
			assertEquals(range(0)(NaN), [])
			assertEquals(range(NaN)(NaN), [])
		})

		it("should handle special float values", () => {
			assertEquals(
				range(Number.MIN_SAFE_INTEGER)(
					Number.MIN_SAFE_INTEGER + 3,
				),
				[
					Number.MIN_SAFE_INTEGER,
					Number.MIN_SAFE_INTEGER + 1,
					Number.MIN_SAFE_INTEGER + 2,
				],
			)
		})
	})

	describe("currying", () => {
		it("should support partial application", () => {
			const fromZero = range(0)
			assertEquals(fromZero(3), [0, 1, 2])
			assertEquals(fromZero(5), [0, 1, 2, 3, 4])

			const fromTen = range(10)
			assertEquals(fromTen(13), [10, 11, 12])
			assertEquals(fromTen(15), [10, 11, 12, 13, 14])
		})

		it("should create reusable range generators", () => {
			const indexRange = range(0)
			const array1 = ["a", "b", "c"]
			const array2 = ["x", "y", "z", "w"]

			assertEquals(indexRange(array1.length), [0, 1, 2])
			assertEquals(indexRange(array2.length), [0, 1, 2, 3])
		})

		it("should work with different start points", () => {
			const fromNegativeFive = range(-5)
			assertEquals(fromNegativeFive(0), [-5, -4, -3, -2, -1])
			assertEquals(fromNegativeFive(-2), [-5, -4, -3])
		})
	})

	describe("practical use cases", () => {
		it("should generate array indices", () => {
			const items = ["apple", "banana", "cherry"]
			const indices = range(0)(items.length)
			assertEquals(indices, [0, 1, 2])
		})

		it("should create sequences for iteration", () => {
			const sequence = range(1)(11)
			assertEquals(sequence, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
		})

		it("should generate page numbers", () => {
			const totalPages = 5
			const pageNumbers = range(1)(totalPages + 1)
			assertEquals(pageNumbers, [1, 2, 3, 4, 5])
		})

		it("should work with map for transformations", () => {
			const squares = range(1)(6).map((n) => n * n)
			assertEquals(squares, [1, 4, 9, 16, 25])
		})

		it("should generate time slots", () => {
			const hours = range(9)(17) // 9 AM to 5 PM
			assertEquals(hours, [9, 10, 11, 12, 13, 14, 15, 16])
		})
	})

	describe("property-based tests", () => {
		it("should always have correct length", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000, max: 1000 }),
					fc.integer({ min: -1000, max: 1000 }),
					(start, end) => {
						const result = range(start)(end)
						const expectedLength = Math.max(0, end - start)
						return result.length === expectedLength
					},
				),
			)
		})

		it("should always start with start value when non-empty", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000, max: 1000 }),
					fc.integer({ min: 1, max: 100 }),
					(start, length) => {
						const end = start + length
						const result = range(start)(end)
						return result.length > 0 && result[0] === start
					},
				),
			)
		})

		it("should always end with end-1 when non-empty", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000, max: 1000 }),
					fc.integer({ min: 1, max: 100 }),
					(start, length) => {
						const end = start + length
						const result = range(start)(end)
						return result.length > 0 &&
							result[result.length - 1] === end - 1
					},
				),
			)
		})

		it("should have consecutive differences of 1", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: 0, max: 50 }),
					(start, length) => {
						const end = start + length
						const result = range(start)(end)
						if (result.length <= 1) return true
						return result.every((val, i) =>
							i === 0 || val === result[i - 1] + 1
						)
					},
				),
			)
		})

		it("should be empty when start >= end", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000, max: 1000 }),
					fc.integer({ min: -1000, max: 1000 }),
					(a, b) => {
						const start = Math.max(a, b)
						const end = Math.min(a, b)
						const result = range(start)(end)
						return result.length === 0
					},
				),
			)
		})

		it("should contain all integers in [start, end)", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: 0, max: 20 }),
					(start, length) => {
						const end = start + length
						const result = range(start)(end)
						const expected = []
						for (let i = start; i < end; i++) {
							expected.push(i)
						}
						return (
							result.length === expected.length &&
							result.every((val, i) => val === expected[i])
						)
					},
				),
			)
		})
	})
})
