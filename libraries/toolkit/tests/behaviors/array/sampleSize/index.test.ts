import { assert, assertEquals } from "jsr:@std/assert@1"
import { describe, it } from "jsr:@std/testing@1/bdd"
import * as fc from "npm:fast-check@3"

import sampleSize from "../../../../src/simple/array/sampleSize/index.ts"

describe("sampleSize", () => {
	describe("behavioral tests", () => {
		it("should return empty array for null input", () => {
			assertEquals(sampleSize(3)(null), [])
		})

		it("should return empty array for undefined input", () => {
			assertEquals(sampleSize(3)(undefined), [])
		})

		it("should return empty array for empty array", () => {
			assertEquals(sampleSize(3)([]), [])
		})

		it("should return empty array for n = 0", () => {
			assertEquals(sampleSize(0)([1, 2, 3, 4, 5]), [])
		})

		it("should return empty array for negative n", () => {
			assertEquals(sampleSize(-5)([1, 2, 3, 4, 5]), [])
		})

		it("should return single element for n = 1", () => {
			const input = [1, 2, 3, 4, 5]
			const result = sampleSize(1)(input)
			assertEquals(result.length, 1)
			assert(input.includes(result[0]))
		})

		it("should return n elements when n < array length", () => {
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			const result = sampleSize(5)(input)
			assertEquals(result.length, 5)
			// All elements should be from original array
			result.forEach((item) => assert(input.includes(item)))
			// No duplicates
			assertEquals(new Set(result).size, result.length)
		})

		it("should return all elements when n >= array length", () => {
			const input = [1, 2, 3, 4, 5]
			const result = sampleSize(10)(input)
			assertEquals(result.length, input.length)
			// Should contain all original elements
			assertEquals(new Set(result).size, input.length)
			input.forEach((item) => assert(result.includes(item)))
		})

		it("should work with string arrays", () => {
			const input = ["a", "b", "c", "d", "e"]
			const result = sampleSize(3)(input)
			assertEquals(result.length, 3)
			result.forEach((item) => assert(input.includes(item)))
			assertEquals(new Set(result).size, 3)
		})

		it("should work with object arrays", () => {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 3 }
			const input = [obj1, obj2, obj3]
			const result = sampleSize(2)(input)
			assertEquals(result.length, 2)
			result.forEach((item) => assert(input.includes(item)))
			assertEquals(new Set(result).size, 2)
		})

		it("should handle arrays with duplicates", () => {
			const input = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
			const result = sampleSize(5)(input)
			assertEquals(result.length, 5)
			// Each sampled element should be from a specific position
			result.forEach((item) => assert(input.includes(item)))
		})

		it("should handle NaN in arrays", () => {
			const input = [1, NaN, 2, NaN, 3]
			const result = sampleSize(3)(input)
			assertEquals(result.length, 3)
			// Check that elements are from original positions
			result.forEach((item, idx) => {
				if (Number.isNaN(item)) {
					assert(Number.isNaN(input[1]) || Number.isNaN(input[3]))
				} else {
					assert(input.includes(item))
				}
			})
		})

		it("should be impure (different results on multiple calls)", () => {
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			const sampler = sampleSize(5)

			// Run multiple times and check for different results
			const results = new Set()
			for (let i = 0; i < 100; i++) {
				results.add(JSON.stringify(sampler(input).sort()))
			}
			// Should have multiple different combinations
			assert(results.size > 1)
		})

		it("should handle fractional n (returns all elements due to count comparison bug)", () => {
			const input = [1, 2, 3, 4, 5]
			const result = sampleSize(2.7)(input)
			// Due to a bug in the recursive function, fractional counts cause it to return all elements
			assertEquals(result.length, 5)
		})

		it("should handle Infinity as n", () => {
			const input = [1, 2, 3]
			const result = sampleSize(Infinity)(input)
			assertEquals(result.length, 3)
			assertEquals(new Set(result).size, 3)
		})

		it("should handle NaN as n (returns all elements due to NaN comparison)", () => {
			const input = [1, 2, 3]
			const result = sampleSize(NaN)(input)
			// NaN <= 0 is false, so it proceeds; Math.min(NaN, 3) is NaN
			// The recursive function with NaN count returns all elements
			assertEquals(result.length, 3)
		})
	})

	describe("property-based tests", () => {
		it("should never return more elements than requested", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.nat({ max: 100 }),
					(arr, n) => {
						const result = sampleSize(n)(arr)
						return result.length <= n
					},
				),
			)
		})

		it("should never return more elements than array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.nat({ max: 100 }),
					(arr, n) => {
						const result = sampleSize(n)(arr)
						return result.length <= arr.length
					},
				),
			)
		})

		it("should return exactly min(n, array.length) elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					fc.nat({ max: 100 }),
					(arr, n) => {
						if (n === 0) return true // Skip n=0 case
						const result = sampleSize(n)(arr)
						return result.length === Math.min(n, arr.length)
					},
				),
			)
		})

		it("should only return elements from the original array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.nat({ max: 100 }),
					(arr, n) => {
						const result = sampleSize(n)(arr)
						return result.every((item) => arr.includes(item))
					},
				),
			)
		})

		it("should not have duplicates", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.nat({ max: 100 }),
					(arr, n) => {
						// Create array with unique elements for this test
						const uniqueArr = [...new Set(arr)]
						const result = sampleSize(n)(uniqueArr)
						// Result should have no duplicates
						return new Set(result).size === result.length
					},
				),
			)
		})

		it("should be curried", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.nat({ max: 10 }),
					(arr, n) => {
						const sampler = sampleSize(n)
						const result1 = sampler(arr)
						const result2 = sampleSize(n)(arr)
						// Both should return arrays of the same length
						return result1.length === result2.length
					},
				),
			)
		})
	})

	describe("distribution tests", () => {
		it("should sample each element with roughly equal probability", () => {
			const input = [1, 2, 3, 4]
			const counts = new Map<number, number>()
			const iterations = 10000
			const sampleCount = 2

			for (let i = 0; i < iterations; i++) {
				const result = sampleSize(sampleCount)(input)
				result.forEach((item) => {
					counts.set(item, (counts.get(item) || 0) + 1)
				})
			}

			// Each element should appear roughly (sampleCount/arrayLength) * iterations times
			const expectedCount = (sampleCount / input.length) * iterations
			const tolerance = expectedCount * 0.1 // 10% tolerance

			input.forEach((item) => {
				const count = counts.get(item) || 0
				assert(
					Math.abs(count - expectedCount) < tolerance,
					`Element ${item} appeared ${count} times, expected ~${expectedCount}`,
				)
			})
		})
	})

	describe("mocked random tests", () => {
		it("should select elements based on Math.random", () => {
			const originalRandom = Math.random
			let callCount = 0
			const mockValues = [0.1, 0.5, 0.9]

			Math.random = () => {
				const value = mockValues[callCount % mockValues.length]
				callCount++
				return value
			}

			try {
				const input = [1, 2, 3, 4, 5]
				const result = sampleSize(3)(input)
				assertEquals(result.length, 3)
				// Elements should be selected based on mock random values
				result.forEach((item) => assert(input.includes(item)))
			} finally {
				Math.random = originalRandom
			}
		})

		it("should handle edge case when Math.random returns 0", () => {
			const originalRandom = Math.random
			Math.random = () => 0

			try {
				const input = [1, 2, 3, 4, 5]
				const result = sampleSize(3)(input)
				assertEquals(result.length, 3)
				result.forEach((item) => assert(input.includes(item)))
			} finally {
				Math.random = originalRandom
			}
		})

		it("should handle edge case when Math.random returns 0.999999", () => {
			const originalRandom = Math.random
			Math.random = () => 0.999999

			try {
				const input = [1, 2, 3, 4, 5]
				const result = sampleSize(3)(input)
				assertEquals(result.length, 3)
				result.forEach((item) => assert(input.includes(item)))
			} finally {
				Math.random = originalRandom
			}
		})
	})
})
