import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "fast-check"

import difference from "../../../../src/simple/array/difference/index.ts"

Deno.test("difference", async (t) => {
	await t.step("basic functionality", async (t) => {
		await t.step("returns elements in first array not in second", () => {
			const result = difference([2, 3])([1, 2, 3, 4, 5])
			assertEquals(result, [1, 4, 5])
		})

		await t.step("works with strings", () => {
			const result = difference(["b", "c"])(["a", "b", "c", "d"])
			assertEquals(result, ["a", "d"])
		})

		await t.step("removes all common elements", () => {
			const result = difference([1, 2, 3])([1, 2, 3])
			assertEquals(result, [])
		})

		await t.step("preserves order from first array", () => {
			const result = difference([2, 4])([5, 4, 3, 2, 1])
			assertEquals(result, [5, 3, 1])
		})

		await t.step("handles duplicate values in first array", () => {
			const result = difference([2])([1, 1, 2, 3, 3])
			assertEquals(result, [1, 1, 3, 3])  // Preserves duplicates
		})

		await t.step("handles duplicate values in second array", () => {
			const result = difference([2, 2, 3, 3])([1, 2, 3, 4])
			assertEquals(result, [1, 4])
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("returns copy of first array when second is empty", () => {
			const input = [1, 2, 3]
			const result = difference<number>([])(input)
			assertEquals(result, [1, 2, 3])
			// Ensure it's a new array
			assertEquals(result === input, false)
		})

		await t.step("returns empty array when first is empty", () => {
			const result = difference([1, 2])([])
			assertEquals(result, [])
		})

		await t.step("returns empty array when both are empty", () => {
			const result = difference([])([])
			assertEquals(result, [])
		})

		await t.step("returns copy when subtrahend is null", () => {
			const input = [1, 2, 3]
			const result = difference(null)(input)
			assertEquals(result, [1, 2, 3])
			assertEquals(result === input, false)
		})

		await t.step("returns copy when subtrahend is undefined", () => {
			const input = [1, 2, 3]
			const result = difference(undefined)(input)
			assertEquals(result, [1, 2, 3])
			assertEquals(result === input, false)
		})

		await t.step("returns empty array when minuend is null", () => {
			const result = difference([1, 2])(null)
			assertEquals(result, [])
		})

		await t.step("returns empty array when minuend is undefined", () => {
			const result = difference([1, 2])(undefined)
			assertEquals(result, [])
		})

		await t.step("handles both null", () => {
			const result = difference(null)(null)
			assertEquals(result, [])
		})

		await t.step("handles both undefined", () => {
			const result = difference(undefined)(undefined)
			assertEquals(result, [])
		})
	})

	await t.step("object references", async (t) => {
		await t.step("uses reference equality for objects", () => {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 3 }
			const result = difference([obj2])([obj1, obj2, obj3])
			assertEquals(result, [obj1, obj3])
		})

		await t.step("does not match similar objects", () => {
			const result = difference([{ id: 2 }])([{ id: 1 }, { id: 2 }, { id: 3 }])
			assertEquals(result, [{ id: 1 }, { id: 2 }, { id: 3 }])
		})
	})

	await t.step("various types", async (t) => {
		await t.step("works with numbers", () => {
			const result = difference([2, 3, 4])([1, 2, 3, 4, 5])
			assertEquals(result, [1, 5])
		})

		await t.step("works with boolean values", () => {
			const result = difference([true])([true, false, true])
			assertEquals(result, [false])
		})

		await t.step("works with mixed types", () => {
			const result = difference([2, "b", true])([1, 2, "a", "b", true, false])
			assertEquals(result, [1, "a", false])
		})

		await t.step("handles NaN correctly", () => {
			const result = difference([NaN])([1, NaN, 2])
			// NaN !== NaN, so NaN is never removed by Set.has
			assertEquals(result.length, 2)
			assertEquals(result[0], 1)
			assertEquals(result[1], 2)
		})

		await t.step("handles null in arrays", () => {
			const result = difference<number | null>([null])([1, null, 2])
			assertEquals(result, [1, 2])
		})

		await t.step("handles undefined in arrays", () => {
			const result = difference<number | undefined>([undefined])([1, undefined, 2])
			assertEquals(result, [1, 2])
		})
	})

	await t.step("currying", async (t) => {
		await t.step("supports partial application", () => {
			const removeStopWords = difference(["the", "a", "an", "and"])
			const result = removeStopWords(["the", "quick", "brown", "fox", "and", "lazy"])
			assertEquals(result, ["quick", "brown", "fox", "lazy"])
		})

		await t.step("can be reused with same subtrahend", () => {
			const removeEvens = difference([2, 4, 6, 8])
			assertEquals(removeEvens([1, 2, 3, 4, 5]), [1, 3, 5])
			assertEquals(removeEvens([6, 7, 8, 9, 10]), [7, 9, 10])
			assertEquals(removeEvens([2, 4, 6, 8]), [])
		})
	})


	await t.step("property-based tests", async (t) => {
		await t.step("difference with empty array returns original", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const result = difference<unknown>([])(arr)
					assertEquals(result, arr)
				}),
				{ numRuns: 100 }
			)
		})

		await t.step("difference with self returns empty array", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const result = difference(arr)(arr)
					assertEquals(result, [])
				}),
				{ numRuns: 100 }
			)
		})

		await t.step("result is subset of original array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const result = difference(arr2)(arr1)
						// Every element in result must be in arr1
						assertEquals(
							result.every(elem => arr1.includes(elem)),
							true
						)
					}
				),
				{ numRuns: 100 }
			)
		})

		await t.step("no element from result is in subtrahend", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const result = difference(arr2)(arr1)
						// No element in result should be in arr2
						assertEquals(
							result.every(elem => !arr2.includes(elem)),
							true
						)
					}
				),
				{ numRuns: 100 }
			)
		})

		await t.step("preserves element order from original array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const result = difference(arr2)(arr1)
						// The result should be exactly what we get from filtering arr1
						// This checks both that elements are preserved and order is maintained
						const expected = arr1.filter(x => !arr2.includes(x))
						assertEquals(result, expected)
					}
				),
				{ numRuns: 100 }
			)
		})

		await t.step("difference is commutative with respect to empty result", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					// If A - B is empty, then A is subset of B
					const result1 = difference(arr)(arr)
					assertEquals(result1, [])
				}),
				{ numRuns: 100 }
			)
		})

		await t.step("handles null and undefined consistently", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const resultNull = difference(null)(arr)
					const resultUndefined = difference(undefined)(arr)
					assertEquals(resultNull, arr)
					assertEquals(resultUndefined, arr)
				}),
				{ numRuns: 50 }
			)
		})
	})
})