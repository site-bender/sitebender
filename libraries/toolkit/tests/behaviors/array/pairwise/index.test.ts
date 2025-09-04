import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import pairwise from "../../../../src/simple/array/pairwise/index.ts"

describe("pairwise", () => {
	describe("basic functionality", () => {
		it("should create pairs of adjacent elements", () => {
			assertEquals(pairwise([1, 2, 3, 4, 5]), [[1, 2], [2, 3], [3, 4], [4, 5]])
			assertEquals(pairwise(["a", "b", "c", "d"]), [["a", "b"], ["b", "c"], [
				"c",
				"d",
			]])
			assertEquals(pairwise([true, false, true]), [[true, false], [
				false,
				true,
			]])
		})

		it("should handle two element arrays", () => {
			assertEquals(pairwise([1, 2]), [[1, 2]])
			assertEquals(pairwise(["first", "second"]), [["first", "second"]])
		})

		it("should work with different types", () => {
			// Objects
			const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
			assertEquals(pairwise(objects), [
				[{ id: 1 }, { id: 2 }],
				[{ id: 2 }, { id: 3 }],
			])

			// Arrays
			const arrays = [[1], [2], [3]]
			assertEquals(pairwise(arrays), [
				[[1], [2]],
				[[2], [3]],
			])

			// Mixed types (with any type array)
			const mixed = [1, "two", { three: 3 }] as const
			const result = pairwise(mixed)
			assertEquals(result.length, 2)
			assertEquals(result[0], [1, "two"])
			assertEquals(result[1], ["two", { three: 3 }])
		})
	})

	describe("edge cases", () => {
		it("should return empty array for arrays with less than 2 elements", () => {
			assertEquals(pairwise([]), [])
			assertEquals(pairwise([1]), [])
			assertEquals(pairwise(["single"]), [])
		})

		it("should handle null and undefined", () => {
			assertEquals(pairwise(null), [])
			assertEquals(pairwise(undefined), [])
		})

		it("should handle large arrays", () => {
			const large = Array.from({ length: 1000 }, (_, i) => i)
			const pairs = pairwise(large)
			assertEquals(pairs.length, 999)
			assertEquals(pairs[0], [0, 1])
			assertEquals(pairs[998], [998, 999])
		})
	})

	describe("practical use cases", () => {
		it("should calculate differences between adjacent elements", () => {
			const numbers = [10, 15, 12, 20, 18]
			const differences = pairwise(numbers).map(([a, b]) => b - a)
			assertEquals(differences, [5, -3, 8, -2])
		})

		it("should detect state transitions", () => {
			const states = ["idle", "idle", "active", "active", "idle"]
			const transitions = pairwise(states).map(([prev, curr]) =>
				prev !== curr ? `${prev}->${curr}` : "no change"
			)
			assertEquals(transitions, [
				"no change",
				"idle->active",
				"no change",
				"active->idle",
			])
		})

		it("should check for sorted order", () => {
			const ascending = [1, 2, 3, 4, 5]
			const isAscending = pairwise(ascending).every(([a, b]) => a <= b)
			assertEquals(isAscending, true)

			const notSorted = [1, 3, 2, 4, 5]
			const isNotSorted = pairwise(notSorted).every(([a, b]) => a <= b)
			assertEquals(isNotSorted, false)
		})

		it("should find local maxima and minima", () => {
			const values = [1, 3, 2, 5, 4, 6, 3]
			const slopes = pairwise(values).map(([a, b]) => {
				if (b > a) return "up"
				if (b < a) return "down"
				return "flat"
			})
			assertEquals(slopes, ["up", "down", "up", "down", "up", "down"])
		})
	})

	describe("type preservation", () => {
		it("should preserve tuple types", () => {
			const numbers: Array<number> = [1, 2, 3, 4]
			const pairs: Array<[number, number]> = pairwise(numbers)
			assertEquals(pairs, [[1, 2], [2, 3], [3, 4]])

			const strings: Array<string> = ["a", "b", "c"]
			const stringPairs: Array<[string, string]> = pairwise(strings)
			assertEquals(stringPairs, [["a", "b"], ["b", "c"]])
		})

		it("should work with readonly arrays", () => {
			const readonly: ReadonlyArray<number> = [1, 2, 3] as const
			const pairs = pairwise(readonly)
			assertEquals(pairs, [[1, 2], [2, 3]])
		})
	})

	describe("property-based tests", () => {
		it("should always return array with length = input.length - 1 for arrays with 2+ elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 2 }),
					(array) => {
						const result = pairwise(array)
						return result.length === array.length - 1
					},
				),
			)
		})

		it("should have each pair consist of consecutive elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 2 }),
					(array) => {
						const pairs = pairwise(array)
						return pairs.every(([first, second], index) =>
							first === array[index] && second === array[index + 1]
						)
					},
				),
			)
		})

		it("should return empty array for arrays with less than 2 elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { maxLength: 1 }),
					(array) => {
						const result = pairwise(array)
						return result.length === 0
					},
				),
			)
		})

		it("should preserve element order in pairs", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 2 }),
					(array) => {
						const pairs = pairwise(array)
						// Check that first elements form a subsequence
						const firstElements = pairs.map(([first]) => first)
						const expectedFirst = array.slice(0, -1)
						// Check that second elements form a subsequence
						const secondElements = pairs.map(([, second]) => second)
						const expectedSecond = array.slice(1)

						return JSON.stringify(firstElements) ===
								JSON.stringify(expectedFirst) &&
							JSON.stringify(secondElements) === JSON.stringify(expectedSecond)
					},
				),
			)
		})

		it("should handle null and undefined consistently", () => {
			fc.assert(
				fc.property(
					fc.constantFrom(null, undefined),
					(value) => {
						const result = pairwise(value)
						return Array.isArray(result) && result.length === 0
					},
				),
			)
		})

		it("should create overlapping pairs", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 3 }),
					(array) => {
						const pairs = pairwise(array)
						// Each element (except first and last) should appear in exactly
						// as many pairs as it has neighbors
						// First element appears once (as first of pair)
						// Last element appears once (as second of pair)
						// Middle elements appear twice (once as first, once as second)

						// Check that pairs overlap correctly by verifying indices
						for (let i = 0; i < pairs.length; i++) {
							const [first, second] = pairs[i]
							if (first !== array[i] || second !== array[i + 1]) {
								return false
							}
						}
						return true
					},
				),
			)
		})
	})
})
