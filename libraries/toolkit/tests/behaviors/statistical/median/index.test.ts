import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import * as fc from "npm:fast-check@3"

import median from "../../../../../src/simple/math/median/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("median", async (t) => {
	Deno.test("statistical properties", async (t) => {
		await t.step("should find the middle value when sorted", async (t) => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true }), { minLength: 1, maxLength: 100 }),
					(numbers) => {
						const result = median(numbers)
						const sorted = [...numbers].sort((a, b) => a - b)
						
						if (sorted.length % 2 === 1) {
							// Odd length: middle element
							const middle = Math.floor(sorted.length / 2)
							assertEquals(result, sorted[middle])
						} else {
							// Even length: average of two middle elements
							const middle = sorted.length / 2
							const expected = (sorted[middle - 1] + sorted[middle]) / 2
							expect(approximately(result, expected, Math.abs(expected) * 1e-10 + 1e-10)).toBe(true)
						}
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should be robust to outliers", async (t) => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -100, max: 100 }), { minLength: 3, maxLength: 20 }),
					fc.float({ noNaN: true, min: 1000, max: 10000 }),
					(numbers, outlier) => {
						const withoutOutlier = median(numbers)
						const withOutlier = median([...numbers, outlier])
						
						// The median should not change drastically with one outlier
						// For odd-length arrays becoming even, median might shift slightly
						const sorted = [...numbers].sort((a, b) => a - b)
						const min = Math.min(...sorted)
						const max = Math.max(...sorted)
						
						// Median with outlier should still be within or near original range
						assertEquals(withOutlier >= min - Math.abs(max - min, true))
						assertEquals(withOutlier <= max + Math.abs(max - min, true))
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should return the value for single element arrays", async (t) => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(value) => {
						expect(median([value])).toBe(value)
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should return same value for arrays of identical elements", async (t) => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					fc.integer({ min: 1, max: 100 }),
					(value, count) => {
						const arr = Array(count).fill(value)
						expect(median(arr)).toBe(value)
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should satisfy ordering property (min <= median <= max)", async (t) => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true }), { minLength: 1 }),
					(numbers) => {
						const result = median(numbers)
						const min = Math.min(...numbers)
						const max = Math.max(...numbers)
						
						assertEquals(result >= min, true)
						assertEquals(result <= max, true)
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	Deno.test("immutability", async (t) => {
		await t.step("should not modify the original array", async (t) => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true }), { minLength: 1 }),
					(numbers) => {
						const original = [...numbers]
						median(numbers)
						assertEquals(numbers, original)
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	Deno.test("odd vs even length arrays", async (t) => {
		await t.step("should return middle element for odd-length arrays", async (t) => {
			expect(median([3, 1, 2])).toBe(2)
			expect(median([5, 2, 8, 1, 9])).toBe(5)
			expect(median([7])).toBe(7)
			expect(median([1, 2, 3, 4, 5])).toBe(3)
			expect(median([9, 3, 5, 7, 1])).toBe(5)
		})

		await t.step("should return average of middle two for even-length arrays", async (t) => {
			expect(median([1, 2, 3, 4])).toBe(2.5)
			expect(median([10, 20])).toBe(15)
			expect(median([1, 3, 5, 7, 9, 11])).toBe(6)
			expect(median([10, 20, 30, 40])).toBe(25)
			expect(median([-5, -10, -15, -20])).toBe(-12.5)
		})
	})

	Deno.test("special values", async (t) => {
		await t.step("should handle Infinity correctly", async (t) => {
			expect(median([1, 2, 3, Infinity])).toBe(2.5)
			expect(median([-Infinity, 0, Infinity])).toBe(0)
			expect(median([Infinity, Infinity, Infinity])).toBe(Infinity)
			expect(median([-Infinity, -Infinity, -Infinity])).toBe(-Infinity)
		})

		await t.step("should handle zero correctly", async (t) => {
			expect(median([0])).toBe(0)
			expect(median([0, 0, 0])).toBe(0)
			expect(median([-0, 0, +0])).toBe(0)
			expect(median([-1, 0, 1])).toBe(0)
		})

		await t.step("should handle negative numbers", async (t) => {
			expect(median([-5, -2, -8, -1, -3])).toBe(-3)
			expect(median([-10, 0, 10])).toBe(0)
			expect(median([-5, -10, -15, -20])).toBe(-12.5)
		})

		await t.step("should handle decimal numbers", async (t) => {
			expect(median([1.5, 2.5, 3.5])).toBe(2.5)
			expect(median([0.1, 0.2, 0.3, 0.4])).toBe(0.25)
			expect(median([1.1, 2.2, 3.3, 4.4, 5.5])).toBe(3.3)
		})

		await t.step("should handle duplicate values", async (t) => {
			expect(median([5, 5, 5, 5, 5])).toBe(5)
			expect(median([1, 2, 2, 3, 3, 3])).toBe(2.5)
			expect(median([10, 10, 20, 20, 30])).toBe(20)
		})

		await t.step("should handle large numbers", async (t) => {
			expect(median([1000000, 2000000, 3000000])).toBe(2000000)
			expect(median([Number.MAX_SAFE_INTEGER, 0, 1000])).toBe(1000)
		})
	})

	Deno.test("error handling", async (t) => {
		await t.step("should return NaN for empty arrays", async (t) => {
			expect(median([])).toBeNaN()
		})

		await t.step("should return NaN for null or undefined", async (t) => {
			expect(median(null as any)).toBeNaN()
			expect(median(undefined as any)).toBeNaN()
		})

		await t.step("should return NaN for non-array inputs", async (t) => {
			expect(median("not an array" as any)).toBeNaN()
			expect(median(123 as any)).toBeNaN()
			expect(median({} as any)).toBeNaN()
		})

		await t.step("should return NaN for arrays with non-numeric values", async (t) => {
			expect(median([1, "2", 3] as any)).toBeNaN()
			expect(median([1, null, 3] as any)).toBeNaN()
			expect(median([1, undefined, 3] as any)).toBeNaN()
			expect(median([1, 2, NaN, 3, 4])).toBeNaN()
			expect(median([1, {}, 3] as any)).toBeNaN()
			expect(median([1, [], 3] as any)).toBeNaN()
		})
	})

	Deno.test("JSDoc examples", async (t) => {
		await t.step("should handle odd number of elements", async (t) => {
			expect(median([3, 1, 2])).toBe(2)
			expect(median([5, 2, 8, 1, 9])).toBe(5)
			expect(median([7])).toBe(7)
		})

		await t.step("should handle even number of elements", async (t) => {
			expect(median([1, 2, 3, 4])).toBe(2.5)
			expect(median([10, 20])).toBe(15)
			expect(median([1, 3, 5, 7, 9, 11])).toBe(6)
		})

		await t.step("should handle already sorted arrays", async (t) => {
			expect(median([1, 2, 3, 4, 5])).toBe(3)
			expect(median([10, 20, 30, 40])).toBe(25)
		})

		await t.step("should handle unsorted arrays", async (t) => {
			expect(median([9, 3, 5, 7, 1])).toBe(5)
			expect(median([100, 10, 50, 20, 80])).toBe(50)
		})

		await t.step("should handle negative numbers", async (t) => {
			expect(median([-5, -2, -8, -1, -3])).toBe(-3)
			expect(median([-10, 0, 10])).toBe(0)
			expect(median([-5, -10, -15, -20])).toBe(-12.5)
		})

		await t.step("should handle mixed positive and negative", async (t) => {
			expect(median([-2, -1, 0, 1, 2])).toBe(0)
			expect(median([-10, -5, 5, 10])).toBe(0)
		})

		await t.step("should handle decimal numbers", async (t) => {
			expect(median([1.5, 2.5, 3.5])).toBe(2.5)
			expect(median([0.1, 0.2, 0.3, 0.4])).toBe(0.25)
			expect(median([1.1, 2.2, 3.3, 4.4, 5.5])).toBe(3.3)
		})

		await t.step("should handle duplicate values", async (t) => {
			expect(median([5, 5, 5, 5, 5])).toBe(5)
			expect(median([1, 2, 2, 3, 3, 3])).toBe(2.5)
			expect(median([10, 10, 20, 20, 30])).toBe(20)
		})

		await t.step("should handle large numbers", async (t) => {
			expect(median([1000000, 2000000, 3000000])).toBe(2000000)
			expect(median([Number.MAX_SAFE_INTEGER, 0, 1000])).toBe(1000)
		})

		await t.step("should handle special numeric values", async (t) => {
			expect(median([1, 2, 3, Infinity])).toBe(2.5)
			expect(median([-Infinity, 0, Infinity])).toBe(0)
			expect(median([1, 2, NaN, 3, 4])).toBeNaN()
		})

		await t.step("should handle empty array", async (t) => {
			expect(median([])).toBeNaN()
		})

		await t.step("should handle invalid inputs", async (t) => {
			expect(median(null as any)).toBeNaN()
			expect(median(undefined as any)).toBeNaN()
			expect(median("not an array" as any)).toBeNaN()
		})

		await t.step("should handle arrays with non-numeric values", async (t) => {
			expect(median([1, "2", 3] as any)).toBeNaN()
			expect(median([1, null, 3] as any)).toBeNaN()
			expect(median([1, undefined, 3] as any)).toBeNaN()
		})

		await t.step("should work for test scores", async (t) => {
			const testScores = [85, 92, 78, 95, 88, 73, 98]
			expect(median(testScores)).toBe(88)
		})

		await t.step("should work for salaries", async (t) => {
			const salaries = [45000, 50000, 55000, 60000, 65000, 70000, 120000]
			expect(median(salaries)).toBe(60000)
		})

		await t.step("should work for ages", async (t) => {
			const ages = [22, 25, 27, 29, 31, 33, 35, 38, 42]
			expect(median(ages)).toBe(31)
		})

		await t.step("should work for temperature readings", async (t) => {
			const temperatures = [68.5, 70.2, 71.8, 69.3, 72.1]
			expect(median(temperatures)).toBe(70.2)
		})

		await t.step("should work for response times", async (t) => {
			const responseTimes = [120, 145, 98, 210, 165, 133, 177]
			expect(median(responseTimes)).toBe(145)
		})

		await t.step("should work for product ratings", async (t) => {
			const ratings = [4.5, 3.8, 4.2, 4.9, 3.5, 4.7, 4.1]
			expect(median(ratings)).toBe(4.2)
		})

		await t.step("should work for house prices (outlier resistant)", async (t) => {
			const housePrices = [250000, 280000, 310000, 295000, 1200000]
			expect(median(housePrices)).toBe(295000)
		})

		await t.step("should work for class sizes", async (t) => {
			const classSizes = [18, 22, 25, 20, 24, 19, 23]
			expect(median(classSizes)).toBe(22)
		})

		await t.step("should work for daily steps", async (t) => {
			const dailySteps = [8500, 10200, 7800, 9500, 11000, 6500, 9000]
			expect(median(dailySteps)).toBe(9000)
		})

		await t.step("should work for investment returns", async (t) => {
			const returns = [-2.5, 3.2, 5.8, -1.3, 4.5, 6.2, 2.1]
			expect(median(returns)).toBe(3.2)
		})

		await t.step("should be robust to outliers compared to mean", async (t) => {
			const dataset = [1, 2, 3, 4, 100]
			expect(median(dataset)).toBe(3)
		})

		await t.step("should work for lap times", async (t) => {
			const lapTimes = [65.2, 63.8, 64.5, 66.1, 63.5, 64.2, 65.8]
			expect(median(lapTimes)).toBe(64.5)
		})

		await t.step("should work as percentile helper", async (t) => {
			function getPercentile(data: Array<number>, percentile: number): number {
				if (percentile === 50) return median(data)
				return NaN
			}
			expect(getPercentile([1, 2, 3, 4, 5], 50)).toBe(3)
		})

		await t.step("should work for quartile analysis", async (t) => {
			const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
			const q2 = median(data)
			assertEquals(q2, 5)
		})

		await t.step("should work with safe wrapper", async (t) => {
			const safeMedian = (values: unknown): number | null => {
				if (!Array.isArray(values)) return null
				const result = median(values)
				return isNaN(result) ? null : result
			}
			expect(safeMedian([1, 2, 3, 4, 5])).toBe(3)
			expect(safeMedian("invalid")).toBe(null)
		})
	})

	Deno.test("comparison with average", async (t) => {
		await t.step("should be less affected by outliers than average", async (t) => {
			const normal = [1, 2, 3, 4, 5]
			const withOutlier = [1, 2, 3, 4, 100]
			
			expect(median(normal)).toBe(3)
			expect(median(withOutlier)).toBe(3)
		})
	})
})