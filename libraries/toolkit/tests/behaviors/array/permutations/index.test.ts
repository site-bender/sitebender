import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import permutations from "../../../../src/simple/array/permutations/index.ts"

describe("permutations", () => {
	describe("basic functionality", () => {
		it("should generate all permutations of 3 elements", () => {
			const result = permutations([1, 2, 3])
			const expected = [
				[1, 2, 3],
				[1, 3, 2],
				[2, 1, 3],
				[2, 3, 1],
				[3, 1, 2],
				[3, 2, 1],
			]
			assertEquals(result.length, 6) // 3! = 6
			// Sort both arrays for comparison since order may vary
			const sortedResult = result.map((p) => p.join(",")).sort()
			const sortedExpected = expected.map((p) => p.join(",")).sort()
			assertEquals(sortedResult, sortedExpected)
		})

		it("should generate permutations of 2 elements", () => {
			assertEquals(permutations([1, 2]), [[1, 2], [2, 1]])
		})

		it("should handle strings", () => {
			const result = permutations(["a", "b", "c"])
			assertEquals(result.length, 6)
			const hasPermutation = (perm: Array<string>) =>
				result.some((r) => JSON.stringify(r) === JSON.stringify(perm))
			assertEquals(hasPermutation(["a", "b", "c"]), true)
			assertEquals(hasPermutation(["b", "c", "a"]), true)
			assertEquals(hasPermutation(["c", "a", "b"]), true)
		})

		it("should handle objects", () => {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const result = permutations([obj1, obj2])
			assertEquals(result.length, 2)
			assertEquals(result[0], [obj1, obj2])
			assertEquals(result[1], [obj2, obj1])
		})

		it("should generate correct number of permutations", () => {
			// n! permutations for n elements
			assertEquals(permutations([1]).length, 1) // 1! = 1
			assertEquals(permutations([1, 2]).length, 2) // 2! = 2
			assertEquals(permutations([1, 2, 3]).length, 6) // 3! = 6
			assertEquals(permutations([1, 2, 3, 4]).length, 24) // 4! = 24
		})
	})

	describe("edge cases", () => {
		it("should handle empty array", () => {
			assertEquals(permutations([]), [[]])
		})

		it("should handle single element", () => {
			assertEquals(permutations([1]), [[1]])
			assertEquals(permutations(["a"]), [["a"]])
		})

		it("should handle null and undefined", () => {
			assertEquals(permutations(null), [[]])
			assertEquals(permutations(undefined), [[]])
		})

		it("should handle duplicate elements", () => {
			const result = permutations([1, 1, 2])
			assertEquals(result.length, 6) // Still generates all positional permutations
			// Will include duplicates like [1,1,2] and [1,1,2] at different positions
		})

		it("should handle different types", () => {
			const mixed = [1, "a", true, null] as const
			const result = permutations(mixed)
			assertEquals(result.length, 24) // 4! = 24
			// Check that each permutation contains all elements
			for (const perm of result) {
				assertEquals(perm.length, 4)
				assertEquals(perm.includes(1), true)
				assertEquals(perm.includes("a"), true)
				assertEquals(perm.includes(true), true)
				assertEquals(perm.includes(null), true)
			}
		})
	})

	describe("mathematical properties", () => {
		it("should generate n! permutations for n distinct elements", () => {
			const factorial = (n: number): number =>
				n <= 1 ? 1 : n * factorial(n - 1)

			for (let n = 0; n <= 5; n++) {
				const array = Array.from({ length: n }, (_, i) => i)
				const perms = permutations(array)
				assertEquals(perms.length, factorial(n))
			}
		})

		it("should have each element appear in each position equally often", () => {
			const array = [1, 2, 3]
			const perms = permutations(array)

			// Count how often each element appears in each position
			for (let element of array) {
				for (let position = 0; position < array.length; position++) {
					const count = perms.filter((p) =>
						p[position] === element
					).length
					// Each element should appear in each position exactly (n-1)! times
					assertEquals(count, 2) // (3-1)! = 2
				}
			}
		})

		it("should contain all original elements in each permutation", () => {
			const array = [1, 2, 3, 4]
			const perms = permutations(array)

			for (const perm of perms) {
				assertEquals(perm.length, array.length)
				// Check all elements are present
				for (const element of array) {
					assertEquals(perm.includes(element), true)
				}
			}
		})

		it("should generate unique permutations (no duplicates for distinct elements)", () => {
			const array = [1, 2, 3]
			const perms = permutations(array)
			const stringified = perms.map((p) => JSON.stringify(p))
			const unique = [...new Set(stringified)]
			assertEquals(stringified.length, unique.length)
		})
	})

	describe("practical use cases", () => {
		it("should generate all possible orderings for sorting", () => {
			const items = ["small", "medium", "large"]
			const allOrderings = permutations(items)
			assertEquals(allOrderings.length, 6)

			// Find alphabetical ordering
			const alphabetical = allOrderings.find((p) =>
				JSON.stringify(p) ===
					JSON.stringify(["large", "medium", "small"])
			)
			assertEquals(alphabetical !== undefined, true)
		})

		it("should generate seating arrangements", () => {
			const guests = ["Alice", "Bob", "Charlie"]
			const arrangements = permutations(guests)
			assertEquals(arrangements.length, 6)

			// Check specific arrangement exists
			const hasArrangement = arrangements.some((a) =>
				a[0] === "Bob" && a[1] === "Alice" && a[2] === "Charlie"
			)
			assertEquals(hasArrangement, true)
		})

		it("should work for generating test cases", () => {
			const operations = ["add", "multiply", "subtract"]
			const sequences = permutations(operations)
			assertEquals(sequences.length, 6)

			// Each sequence is a different order of operations
			for (const sequence of sequences) {
				assertEquals(sequence.length, 3)
				assertEquals(sequence.includes("add"), true)
				assertEquals(sequence.includes("multiply"), true)
				assertEquals(sequence.includes("subtract"), true)
			}
		})
	})

	describe("performance considerations", () => {
		it("should handle reasonable sizes efficiently", () => {
			// Test up to 8 elements (8! = 40320 permutations)
			const array = [1, 2, 3, 4, 5, 6, 7, 8]
			const result = permutations(array)
			assertEquals(result.length, 40320)
		})

		it("should work with 0 elements", () => {
			assertEquals(permutations([]), [[]])
		})
	})

	describe("property-based tests", () => {
		it("should always generate factorial(n) permutations", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 0, maxLength: 6 }),
					(array) => {
						const factorial = (n: number): number =>
							n <= 1 ? 1 : n * factorial(n - 1)
						const perms = permutations(array)
						return perms.length === factorial(array.length)
					},
				),
			)
		})

		it("should preserve all elements in each permutation", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 0, maxLength: 5 }),
					(array) => {
						const perms = permutations(array)

						// Every permutation should have same length as original
						const allSameLength = perms.every((p) =>
							p.length === array.length
						)
						if (!allSameLength) return false

						// Every element from original should appear in each permutation
						for (const perm of perms) {
							const sortedPerm = [...perm].sort()
							const sortedOrig = [...array].sort()
							if (
								JSON.stringify(sortedPerm) !==
									JSON.stringify(sortedOrig)
							) {
								return false
							}
						}
						return true
					},
				),
			)
		})

		it("should handle null and undefined consistently", () => {
			fc.assert(
				fc.property(
					fc.constantFrom(null, undefined),
					(value) => {
						const result = permutations(value)
						return Array.isArray(result) &&
							result.length === 1 &&
							Array.isArray(result[0]) &&
							result[0].length === 0
					},
				),
			)
		})

		it("should generate permutations where each position gets each element", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 }), {
						minLength: 1,
						maxLength: 5,
					}),
					(array) => {
						if (array.length === 0) return true

						const perms = permutations(array)

						// For arrays with unique elements, each element should appear
						// in each position the same number of times
						const uniqueArray = [...new Set(array)]
						if (uniqueArray.length === array.length) {
							// All elements are unique
							const firstElements = perms.map((p) => p[0])
							for (const element of array) {
								const count = firstElements.filter((e) =>
									e === element
								).length
								const expectedCount = perms.length /
									array.length
								if (count !== expectedCount) return false
							}
						}

						// For all arrays, the total number of permutations should be n!
						const factorial = (n: number): number =>
							n <= 1 ? 1 : n * factorial(n - 1)
						return perms.length === factorial(array.length)
					},
				),
			)
		})
	})
})
