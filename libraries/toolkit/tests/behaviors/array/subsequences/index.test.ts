import { describe, it } from "jsr:@std/testing/bdd"
import { expect } from "jsr:@std/expect"
import * as fc from "fast-check"

import subsequences from "../../../../src/simple/array/subsequences/index.ts"

describe("subsequences", () => {
	describe("behavioral tests", () => {
		it("generates all subsequences for small arrays", () => {
			const result = subsequences([1, 2])
			// Order matters - subsequences maintains element order
			expect(result).toEqual([
				[],
				[1],
				[2],
				[1, 2],
			])
		})

		it("generates power set for three elements", () => {
			const result = subsequences([1, 2, 3])
			expect(result).toEqual([
				[],
				[1],
				[2],
				[1, 2],
				[3],
				[1, 3],
				[2, 3],
				[1, 2, 3],
			])
		})

		it("handles single element arrays", () => {
			const result = subsequences([42])
			expect(result).toEqual([[], [42]])
		})

		it("handles empty arrays", () => {
			const result = subsequences([])
			expect(result).toEqual([[]])
		})

		it("handles null and undefined", () => {
			expect(subsequences(null)).toEqual([[]])
			expect(subsequences(undefined)).toEqual([[]])
		})

		it("maintains element order in subsequences", () => {
			const result = subsequences(["a", "b", "c"])
			// All non-empty subsequences should maintain original order
			const nonEmpty = result.filter(sub => sub.length > 0)
			
			for (const sub of nonEmpty) {
				// Check that elements appear in the same order as original
				const indices = sub.map(el => ["a", "b", "c"].indexOf(el))
				for (let i = 1; i < indices.length; i++) {
					expect(indices[i]).toBeGreaterThan(indices[i - 1])
				}
			}
		})

		it("generates correct number of subsequences", () => {
			// 2^n subsequences for n elements
			expect(subsequences([]).length).toBe(1)         // 2^0 = 1
			expect(subsequences([1]).length).toBe(2)        // 2^1 = 2
			expect(subsequences([1, 2]).length).toBe(4)     // 2^2 = 4
			expect(subsequences([1, 2, 3]).length).toBe(8)  // 2^3 = 8
			expect(subsequences([1, 2, 3, 4]).length).toBe(16) // 2^4 = 16
		})

		it("includes empty array as first subsequence", () => {
			const arrays = [
				[1],
				[1, 2],
				[1, 2, 3],
				["a", "b"],
			]
			
			for (const arr of arrays) {
				const result = subsequences(arr)
				expect(result[0]).toEqual([])
			}
		})

		it("includes full array as last subsequence", () => {
			const arrays = [
				[1],
				[1, 2],
				[1, 2, 3],
				["a", "b", "c"],
			]
			
			for (const arr of arrays) {
				const result = subsequences(arr)
				expect(result[result.length - 1]).toEqual(arr)
			}
		})

		it("handles arrays with duplicate values", () => {
			const result = subsequences([1, 1, 2])
			expect(result).toEqual([
				[],
				[1],
				[1],      // Second 1
				[1, 1],   // Both 1s
				[2],
				[1, 2],   // First 1 with 2
				[1, 2],   // Second 1 with 2
				[1, 1, 2], // All elements
			])
		})

		it("handles arrays with different types", () => {
			const mixed = [1, "two", true, null]
			const result = subsequences(mixed)
			expect(result.length).toBe(16) // 2^4
			// Check empty array exists
			expect(result.some(sub => sub.length === 0)).toBe(true)
			// Check full array exists
			expect(result.some(sub => 
				sub.length === 4 && 
				sub[0] === 1 && 
				sub[1] === "two" && 
				sub[2] === true && 
				sub[3] === null
			)).toBe(true)
		})

		it("handles arrays with undefined values", () => {
			const result = subsequences([1, undefined, 2])
			expect(result).toEqual([
				[],
				[1],
				[undefined],
				[1, undefined],
				[2],
				[1, 2],
				[undefined, 2],
				[1, undefined, 2],
			])
		})

		it("preserves object references", () => {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const result = subsequences([obj1, obj2])
			
			expect(result).toEqual([
				[],
				[obj1],
				[obj2],
				[obj1, obj2],
			])
			
			// Check same references
			expect(result[1][0]).toBe(obj1)
			expect(result[2][0]).toBe(obj2)
			expect(result[3][0]).toBe(obj1)
			expect(result[3][1]).toBe(obj2)
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3]
			const copy = [...original]
			
			subsequences(original)
			
			expect(original).toEqual(copy)
		})

		it("can be used for combinations", () => {
			const result = subsequences([1, 2, 3, 4])
			// Get all 2-element combinations
			const pairs = result.filter(sub => sub.length === 2)
			expect(pairs).toEqual([
				[1, 2],
				[1, 3],
				[2, 3],
				[1, 4],
				[2, 4],
				[3, 4],
			])
		})

		it("can be used for feature flag combinations", () => {
			const features = ["dark-mode", "notifications", "analytics"]
			const result = subsequences(features)
			
			// All possible feature combinations
			expect(result.length).toBe(8)
			// Check empty array exists (no features)
			expect(result.some(sub => sub.length === 0)).toBe(true)
			// Check full array exists (all features)
			expect(result.some(sub => 
				sub.length === 3 && 
				sub[0] === "dark-mode" && 
				sub[1] === "notifications" && 
				sub[2] === "analytics"
			)).toBe(true)
			// Check specific combinations
			expect(result.some(sub => 
				sub.length === 1 && sub[0] === "dark-mode"
			)).toBe(true)
			expect(result.some(sub => 
				sub.length === 2 && 
				sub[0] === "dark-mode" && 
				sub[1] === "notifications"
			)).toBe(true)
		})
	})

	describe("property-based tests", () => {
		it("always generates 2^n subsequences", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { maxLength: 10 }), // Limit size for performance
					(array) => {
						const result = subsequences(array)
						return result.length === Math.pow(2, array.length)
					},
				),
			)
		})

		it("always includes empty array and full array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(array) => {
						const result = subsequences(array)
						
						// Check empty array is present
						const hasEmpty = result.some(sub => sub.length === 0)
						
						// Check full array is present
						const hasFull = result.some(sub => 
							sub.length === array.length &&
							sub.every((val, idx) => val === array[idx])
						)
						
						return hasEmpty && (array.length === 0 || hasFull)
					},
				),
			)
		})

		it("all subsequences maintain original order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 }), { maxLength: 8 }),
					(array) => {
						const result = subsequences(array)
						
						return result.every(sub => {
							// For each subsequence, check that elements appear in same order
							for (let i = 0; i < sub.length; i++) {
								const origIndex = array.indexOf(sub[i])
								for (let j = i + 1; j < sub.length; j++) {
									const nextOrigIndex = array.indexOf(sub[j], origIndex + 1)
									if (nextOrigIndex <= origIndex) {
										return false
									}
								}
							}
							return true
						})
					},
				),
			)
		})

		it("no duplicate subsequences for arrays with unique values", () => {
			fc.assert(
				fc.property(
					fc.uniqueArray(fc.integer(), { maxLength: 8 }),
					(array) => {
						const result = subsequences(array)
						
						// Convert subsequences to strings for comparison
						const stringified = result.map(sub => JSON.stringify(sub))
						const unique = new Set(stringified)
						
						// For unique input values, subsequences should also be unique
						return unique.size === result.length
					},
				),
			)
		})

		it("each unique element appears in exactly 2^(n-1) subsequences", () => {
			fc.assert(
				fc.property(
					fc.uniqueArray(fc.integer({ min: 1, max: 100 }), { minLength: 1, maxLength: 8 }),
					(array) => {
						if (array.length === 0) return true
						
						const result = subsequences(array)
						const firstElement = array[0]
						
						// Count how many subsequences contain the first element
						// Since we're using unique arrays, we can use includes
						const count = result.filter(sub => sub.includes(firstElement)).length
						const expected = Math.pow(2, array.length - 1)
						
						return count === expected
					},
				),
			)
		})

		it("handles arrays with various types", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.oneof(
							fc.integer(),
							fc.string(),
							fc.boolean(),
							fc.constant(null),
							fc.constant(undefined),
						),
						{ maxLength: 6 },
					),
					(array) => {
						const result = subsequences(array)
						return result.length === Math.pow(2, array.length)
					},
				),
			)
		})
	})
})