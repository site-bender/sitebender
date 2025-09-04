import * as fc from "fast-check"
import { expect } from "jsr:@std/expect"
import { describe, it } from "jsr:@std/testing/bdd"

import sliding from "../../../../src/simple/array/sliding/index.ts"

describe("sliding", () => {
	describe("behavioral tests", () => {
		describe("basic functionality", () => {
			it("should create sliding windows of specified size", () => {
				const result = sliding(3)(1)([1, 2, 3, 4, 5])
				expect(result).toEqual([[1, 2, 3], [2, 3, 4], [3, 4, 5]])
			})

			it("should use custom step size", () => {
				const result = sliding(3)(2)([1, 2, 3, 4, 5, 6, 7])
				expect(result).toEqual([[1, 2, 3], [3, 4, 5], [5, 6, 7]])
			})

			it("should handle step equal to window size (non-overlapping)", () => {
				const result = sliding(2)(2)([1, 2, 3, 4, 5, 6])
				expect(result).toEqual([[1, 2], [3, 4], [5, 6]])
			})

			it("should handle step greater than window size", () => {
				const result = sliding(2)(3)([1, 2, 3, 4, 5, 6, 7])
				expect(result).toEqual([[1, 2], [4, 5]])
				// Start at 0: [1,2], next at 3: [4,5], next at 6: would need [7,8] but only 7 exists
			})

			it("should create pairwise windows", () => {
				const pairwise = sliding(2)(1)
				const result = pairwise([1, 2, 3, 4])
				expect(result).toEqual([[1, 2], [2, 3], [3, 4]])
			})

			it("should handle window size of 1", () => {
				const result = sliding(1)(1)([1, 2, 3])
				expect(result).toEqual([[1], [2], [3]])
			})
		})

		describe("edge cases", () => {
			it("should return empty array for null", () => {
				const result = sliding(2)(1)(null)
				expect(result).toEqual([])
			})

			it("should return empty array for undefined", () => {
				const result = sliding(2)(1)(undefined)
				expect(result).toEqual([])
			})

			it("should return empty array for empty array", () => {
				const result = sliding(2)(1)([])
				expect(result).toEqual([])
			})

			it("should return empty array when window size > array length", () => {
				const result = sliding(5)(1)([1, 2, 3])
				expect(result).toEqual([])
			})

			it("should return empty array for zero window size", () => {
				const result = sliding(0)(1)([1, 2, 3])
				expect(result).toEqual([])
			})

			it("should return empty array for negative window size", () => {
				const result = sliding(-2)(1)([1, 2, 3])
				expect(result).toEqual([])
			})

			it("should return empty array for zero step", () => {
				const result = sliding(2)(0)([1, 2, 3])
				expect(result).toEqual([])
			})

			it("should return empty array for negative step", () => {
				const result = sliding(2)(-1)([1, 2, 3])
				expect(result).toEqual([])
			})

			it("should return empty array for non-integer window size", () => {
				const result = sliding(2.5)(1)([1, 2, 3, 4])
				expect(result).toEqual([])
			})

			it("should return empty array for non-integer step", () => {
				const result = sliding(2)(1.5)([1, 2, 3, 4])
				expect(result).toEqual([])
			})

			it("should handle window size equal to array length", () => {
				const result = sliding(3)(1)([1, 2, 3])
				expect(result).toEqual([[1, 2, 3]])
			})

			it("should handle single element array", () => {
				const result = sliding(1)(1)([42])
				expect(result).toEqual([[42]])
			})
		})

		describe("type handling", () => {
			it("should work with strings", () => {
				const result = sliding(2)(1)(["a", "b", "c", "d"])
				expect(result).toEqual([["a", "b"], ["b", "c"], ["c", "d"]])
			})

			it("should work with objects", () => {
				const obj1 = { id: 1 }
				const obj2 = { id: 2 }
				const obj3 = { id: 3 }
				const result = sliding(2)(1)([obj1, obj2, obj3])
				expect(result).toEqual([[obj1, obj2], [obj2, obj3]])
			})

			it("should work with mixed types", () => {
				const result = sliding(3)(1)([1, "a", true, null, { x: 1 }])
				expect(result).toEqual([
					[1, "a", true],
					["a", true, null],
					[true, null, { x: 1 }]
				])
			})

			it("should preserve object references", () => {
				const obj = { value: 42 }
				const result = sliding(2)(1)([obj, { other: 1 }, obj])
				expect(result[0][0]).toBe(obj)
				expect(result[1][1]).toBe(obj)
			})
		})

		describe("currying", () => {
			it("should support partial application of size", () => {
				const window3 = sliding(3)
				expect(window3(1)([1, 2, 3, 4])).toEqual([[1, 2, 3], [2, 3, 4]])
				expect(window3(2)([1, 2, 3, 4, 5])).toEqual([[1, 2, 3], [3, 4, 5]])
			})

			it("should support partial application of size and step", () => {
				const window2step1 = sliding(2)(1)
				expect(window2step1([1, 2, 3])).toEqual([[1, 2], [2, 3]])
				expect(window2step1(["a", "b", "c"])).toEqual([["a", "b"], ["b", "c"]])
			})

			it("should use default step of 1 with explicit undefined", () => {
				// Step parameter has a default of 1 when undefined
				const result = sliding(2)(undefined)([1, 2, 3, 4])
				expect(result).toEqual([[1, 2], [2, 3], [3, 4]])
			})
		})

		describe("special numeric values", () => {
			it("should handle NaN as window size", () => {
				const result = sliding(NaN)(1)([1, 2, 3])
				expect(result).toEqual([])
			})

			it("should handle Infinity as window size", () => {
				const result = sliding(Infinity)(1)([1, 2, 3])
				expect(result).toEqual([])
			})

			it("should handle NaN as step", () => {
				const result = sliding(2)(NaN)([1, 2, 3])
				expect(result).toEqual([])
			})

			it("should handle Infinity as step", () => {
				const result = sliding(2)(Infinity)([1, 2, 3])
				expect(result).toEqual([])
			})
		})

		describe("practical use cases", () => {
			it("should calculate moving averages", () => {
				const windows = sliding(3)(1)([1, 2, 3, 4, 5])
				const movingAverages = windows.map(w => 
					w.reduce((sum, n) => sum + n, 0) / w.length
				)
				expect(movingAverages).toEqual([2, 3, 4])
			})

			it("should detect patterns in sequences", () => {
				const sequence = [1, 2, 1, 2, 1, 2]
				const windows = sliding(2)(1)(sequence)
				const patterns = windows.map(([a, b]) => 
					a === 1 && b === 2 ? "pattern" : "no pattern"
				)
				expect(patterns).toEqual(["pattern", "no pattern", "pattern", "no pattern", "pattern"])
			})

			it("should work for n-gram analysis", () => {
				const text = ["the", "quick", "brown", "fox"]
				const bigrams = sliding(2)(1)(text)
				expect(bigrams).toEqual([
					["the", "quick"],
					["quick", "brown"],
					["brown", "fox"]
				])
			})
		})

		describe("large step values", () => {
			it("should handle step much larger than array", () => {
				const result = sliding(2)(100)([1, 2, 3, 4, 5])
				expect(result).toEqual([[1, 2]])
			})

			it("should stop when next window would be incomplete", () => {
				const result = sliding(3)(2)([1, 2, 3, 4, 5, 6])
				expect(result).toEqual([[1, 2, 3], [3, 4, 5]])
				// Start at 0: [1,2,3], next at 2: [3,4,5], next at 4: would need [5,6,7] but only [5,6] available
			})
		})
	})

	describe("property-based tests", () => {
		it("should always return windows of the specified size", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 5 }),
					(array, size, step) => {
						const result = sliding(size)(step)(array)
						return result.every(window => window.length === size)
					},
				),
			)
		})

		it("should preserve element order within windows", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 5 }),
					(array, size, step) => {
						const result = sliding(size)(step)(array)
						return result.every((window, i) => {
							const startIdx = i * step
							return window.every((elem, j) => 
								elem === array[startIdx + j]
							)
						})
					},
				),
			)
		})

		it("should return correct number of windows", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1, maxLength: 20 }),
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 5 }),
					(array, size, step) => {
						const result = sliding(size)(step)(array)
						if (array.length < size) {
							return result.length === 0
						}
						const expectedCount = Math.floor((array.length - size) / step) + 1
						return result.length === expectedCount
					},
				),
			)
		})

		it("should handle null and undefined consistently", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 5 }),
					(size, step) => {
						const nullResult = sliding(size)(step)(null)
						const undefinedResult = sliding(size)(step)(undefined)
						return nullResult.length === 0 && undefinedResult.length === 0
					},
				),
			)
		})

		it("should return empty for invalid parameters", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.oneof(
						fc.constant(0),
						fc.constant(-1),
						fc.constant(NaN),
						fc.constant(1.5)
					),
					fc.integer({ min: 1, max: 5 }),
					(array, invalidSize, step) => {
						const result = sliding(invalidSize)(step)(array)
						return result.length === 0
					},
				),
			)
		})

		it("should handle consecutive windows correctly with step 1", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 2, maxLength: 20 }),
					fc.integer({ min: 2, max: 5 }),
					(array, size) => {
						const result = sliding(size)(1)(array)
						// Each consecutive window should share size-1 elements
						for (let i = 0; i < result.length - 1; i++) {
							const shared = result[i].slice(1)
							const nextShared = result[i + 1].slice(0, -1)
							if (JSON.stringify(shared) !== JSON.stringify(nextShared)) {
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