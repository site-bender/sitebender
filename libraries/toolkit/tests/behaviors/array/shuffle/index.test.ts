import { assert, assertEquals } from "jsr:@std/assert@1"
import { describe, it } from "jsr:@std/testing@1/bdd"
import * as fc from "npm:fast-check@3"

import shuffle from "../../../../src/simple/array/shuffle/index.ts"

describe("shuffle", () => {
	describe("behavioral tests", () => {
		it("should return empty array for null input", () => {
			assertEquals(shuffle(null), [])
		})

		it("should return empty array for undefined input", () => {
			assertEquals(shuffle(undefined), [])
		})

		it("should return empty array for empty array", () => {
			assertEquals(shuffle([]), [])
		})

		it("should return single element array unchanged", () => {
			assertEquals(shuffle([42]), [42])
		})

		it("should return array with same length", () => {
			const input = [1, 2, 3, 4, 5]
			const result = shuffle(input)
			assertEquals(result.length, input.length)
		})

		it("should contain all original elements", () => {
			const input = [1, 2, 3, 4, 5]
			const result = shuffle(input)
			assertEquals(new Set(result), new Set(input))
			// All elements present
			input.forEach((item) => assert(result.includes(item)))
		})

		it("should work with string arrays", () => {
			const input = ["a", "b", "c", "d", "e"]
			const result = shuffle(input)
			assertEquals(result.length, input.length)
			assertEquals(new Set(result), new Set(input))
		})

		it("should work with object arrays", () => {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 3 }
			const input = [obj1, obj2, obj3]
			const result = shuffle(input)

			assertEquals(result.length, 3)
			assert(result.includes(obj1))
			assert(result.includes(obj2))
			assert(result.includes(obj3))
		})

		it("should handle arrays with duplicates", () => {
			const input = [1, 2, 2, 3, 3, 3]
			const result = shuffle(input)
			assertEquals(result.length, input.length)
			// Count occurrences
			const countOccurrences = (arr: number[], val: number) =>
				arr.filter((x) => x === val).length
			assertEquals(countOccurrences(result, 1), 1)
			assertEquals(countOccurrences(result, 2), 2)
			assertEquals(countOccurrences(result, 3), 3)
		})

		it("should handle arrays with NaN", () => {
			const input = [1, NaN, 2, NaN, 3]
			const result = shuffle(input)
			assertEquals(result.length, 5)
			// Count NaN occurrences
			const nanCount = result.filter((x) => Number.isNaN(x)).length
			assertEquals(nanCount, 2)
			// Count number occurrences
			const numCount = result.filter((x) => !Number.isNaN(x)).length
			assertEquals(numCount, 3)
		})

		it("should handle arrays with undefined and null", () => {
			const input = [1, undefined, null, 2]
			const result = shuffle(input)
			assertEquals(result.length, 4)
			assert(result.includes(1))
			assert(result.includes(2))
			assert(result.includes(undefined))
			assert(result.includes(null))
		})

		it("should not modify original array", () => {
			const input = [1, 2, 3, 4, 5]
			const inputCopy = [...input]
			shuffle(input)
			assertEquals(input, inputCopy)
		})

		it("should be impure (produce different results)", () => {
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			const results = new Set()

			// Run multiple times
			for (let i = 0; i < 100; i++) {
				results.add(JSON.stringify(shuffle(input)))
			}

			// Should produce multiple different orderings
			assert(results.size > 1)
		})

		it("should handle two-element array", () => {
			const input = [1, 2]
			const counts = { "[1,2]": 0, "[2,1]": 0 }

			// Run many times to check both orderings occur
			for (let i = 0; i < 100; i++) {
				const result = JSON.stringify(shuffle(input))
				if (result in counts) {
					counts[result as keyof typeof counts]++
				}
			}

			// Both orderings should occur at least once
			assert(counts["[1,2]"] > 0)
			assert(counts["[2,1]"] > 0)
		})

		it("should handle arrays with mixed types", () => {
			const input: any[] = [1, "a", true, null, { x: 1 }, [1, 2]]
			const result = shuffle(input)
			assertEquals(result.length, 6)
			assert(result.includes(1))
			assert(result.includes("a"))
			assert(result.includes(true))
			assert(result.includes(null))
			assert(result.some((item: any) => item?.x === 1))
			assert(
				result.some((item: any) => Array.isArray(item) && item.length === 2),
			)
		})

		it("should handle array with symbols", () => {
			const sym1 = Symbol("a")
			const sym2 = Symbol("b")
			const input = [sym1, sym2, "test"]
			const result = shuffle(input)

			assertEquals(result.length, 3)
			assert(result.includes(sym1))
			assert(result.includes(sym2))
			assert(result.includes("test"))
		})

		it("should handle large arrays", () => {
			const input = Array.from({ length: 1000 }, (_, i) => i)
			const result = shuffle(input)

			assertEquals(result.length, 1000)
			assertEquals(new Set(result).size, 1000)
			// Check it's actually shuffled (not in original order)
			const isInOriginalOrder = result.every((val, idx) => val === idx)
			assertEquals(isInOriginalOrder, false)
		})
	})

	describe("property-based tests", () => {
		it("should preserve array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(arr) => {
						const result = shuffle(arr)
						return result.length === arr.length
					},
				),
			)
		})

		it("should contain exactly the same elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const result = shuffle(arr)
						const inputSorted = [...arr].sort((a, b) => a - b)
						const resultSorted = [...result].sort((a, b) => a - b)
						return JSON.stringify(inputSorted) === JSON.stringify(resultSorted)
					},
				),
			)
		})

		it("should not add or remove elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.string()),
					(arr) => {
						const result = shuffle(arr)
						// Every element in result should be in original
						const allInOriginal = result.every((item) => arr.includes(item))
						// Every element in original should be in result
						const allInResult = arr.every((item) => result.includes(item))
						return allInOriginal && allInResult
					},
				),
			)
		})

		it("should preserve element counts for arrays with duplicates", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 1, max: 10 })),
					(arr) => {
						const result = shuffle(arr)
						const countMap = new Map<number, number>()
						const resultCountMap = new Map<number, number>()

						arr.forEach((n) => countMap.set(n, (countMap.get(n) || 0) + 1))
						result.forEach((n) =>
							resultCountMap.set(n, (resultCountMap.get(n) || 0) + 1)
						)

						// Check all counts match
						for (const [key, count] of countMap) {
							if (resultCountMap.get(key) !== count) return false
						}
						return true
					},
				),
			)
		})

		it("should handle edge cases consistently", () => {
			fc.assert(
				fc.property(
					fc.oneof(fc.constant(null), fc.constant(undefined), fc.constant([])),
					(input) => {
						const result = shuffle(input as any)
						return Array.isArray(result) && result.length === 0
					},
				),
			)
		})
	})

	describe("distribution tests", () => {
		it("should produce roughly uniform distribution for small arrays", () => {
			const input = [1, 2, 3]
			const permutations = new Map<string, number>()
			const iterations = 6000

			for (let i = 0; i < iterations; i++) {
				const result = JSON.stringify(shuffle(input))
				permutations.set(result, (permutations.get(result) || 0) + 1)
			}

			// There are 3! = 6 possible permutations
			// Each should occur roughly 1/6 of the time
			const expectedCount = iterations / 6
			const tolerance = expectedCount * 0.2 // 20% tolerance

			// Should have all 6 permutations
			assertEquals(permutations.size, 6)

			// Each should occur roughly equally
			for (const count of permutations.values()) {
				assert(
					Math.abs(count - expectedCount) < tolerance,
					`Permutation count ${count} is outside tolerance of ${expectedCount} ± ${tolerance}`,
				)
			}
		})

		it("should have each position equally likely for each element", () => {
			const input = [1, 2, 3, 4]
			const positionCounts = new Map<string, number>()
			const iterations = 4000

			for (let i = 0; i < iterations; i++) {
				const result = shuffle(input)
				result.forEach((value, index) => {
					const key = `${value}-at-${index}`
					positionCounts.set(key, (positionCounts.get(key) || 0) + 1)
				})
			}

			// Each element should appear at each position roughly 1/4 of the time
			const expectedCount = iterations / 4
			const tolerance = expectedCount * 0.15 // 15% tolerance

			input.forEach((value) => {
				for (let pos = 0; pos < input.length; pos++) {
					const count = positionCounts.get(`${value}-at-${pos}`) || 0
					assert(
						Math.abs(count - expectedCount) < tolerance,
						`Element ${value} at position ${pos}: ${count} times, expected ~${expectedCount}`,
					)
				}
			})
		})
	})

	describe("mocked random tests", () => {
		it("should use Math.random for shuffling", () => {
			const originalRandom = Math.random
			let callCount = 0

			Math.random = () => {
				callCount++
				return 0.5
			}

			try {
				const input = [1, 2, 3, 4, 5]
				shuffle(input)
				// Should call Math.random multiple times for Fisher-Yates
				assert(callCount > 0)
			} finally {
				Math.random = originalRandom
			}
		})

		it("should handle Math.random returning 0", () => {
			const originalRandom = Math.random
			Math.random = () => 0

			try {
				const input = [1, 2, 3, 4, 5]
				const result = shuffle(input)
				assertEquals(result.length, 5)
				assertEquals(new Set(result).size, 5)
			} finally {
				Math.random = originalRandom
			}
		})

		it("should handle Math.random returning 0.999999", () => {
			const originalRandom = Math.random
			Math.random = () => 0.999999

			try {
				const input = [1, 2, 3, 4, 5]
				const result = shuffle(input)
				assertEquals(result.length, 5)
				assertEquals(new Set(result).size, 5)
			} finally {
				Math.random = originalRandom
			}
		})

		it("should produce deterministic results with fixed random", () => {
			const originalRandom = Math.random
			let seed = 0.42

			// Simple deterministic "random" generator
			Math.random = () => {
				seed = (seed * 9 + 0.1) % 1
				return seed
			}

			try {
				const input = [1, 2, 3, 4, 5]
				seed = 0.42 // Reset seed
				const result1 = shuffle(input)
				seed = 0.42 // Reset seed again
				const result2 = shuffle(input)
				// With same seed, should get same shuffle
				assertEquals(result1, result2)
			} finally {
				Math.random = originalRandom
			}
		})
	})
})
