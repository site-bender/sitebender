import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import * as fc from "npm:fast-check@3"

import average from "../../../../src/simple/math/average/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

Deno.test("average", async (t) => {
	await t.step("statistical properties", async (t) => {
		await t.step("should calculate arithmetic mean correctly", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -1e6, max: 1e6 }), { minLength: 1, maxLength: 100 }),
					(numbers) => {
						const result = average(numbers)
						const expectedSum = numbers.reduce((a, b) => a + b, 0)
						const expectedAvg = expectedSum / numbers.length
						
						// Use a minimum epsilon to handle zero average case
						const epsilon = Math.max(Math.abs(expectedAvg) * 1e-10, 1e-10)
						return approximately(result, expectedAvg, epsilon)
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should satisfy mean inequality (min <= mean <= max)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true }), { minLength: 1 }),
					(numbers) => {
						const result = average(numbers)
						const min = Math.min(...numbers)
						const max = Math.max(...numbers)
						
						return result >= min && result <= max
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should return the value for single element arrays", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(value) => {
						return average([value]) === value
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should return same value for arrays of identical elements", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					fc.integer({ min: 1, max: 100 }),
					(value, count) => {
						const arr = Array(count).fill(value)
						return average(arr) === value
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	await t.step("linearity property", async (t) => {
		await t.step("should be linear (average(ax + b) = a*average(x) + b)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -1000, max: 1000 }), { minLength: 1, maxLength: 50 }),
					fc.float({ noNaN: true, min: -10, max: 10 }),
					fc.float({ noNaN: true, min: -10, max: 10 }),
					(numbers, a, b) => {
						const avgOriginal = average(numbers)
						const transformed = numbers.map(x => a * x + b)
						const avgTransformed = average(transformed)
						const expected = a * avgOriginal + b
						
						return approximately(avgTransformed, expected, Math.abs(expected) * 1e-10 + 1e-10)
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should be additive (average(x + y) = average(x) + average(y))", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -1000, max: 1000 }), { minLength: 1, maxLength: 50 }),
					fc.array(fc.float({ noNaN: true, min: -1000, max: 1000 })),
					(arr1, arr2) => {
						// Make arrays same length
						const len = arr1.length
						const arr2Same = arr2.length >= len ? arr2.slice(0, len) : 
							[...arr2, ...Array(len - arr2.length).fill(0)]
						
						const sumArr = arr1.map((v, i) => v + arr2Same[i])
						const avgSum = average(sumArr)
						const expected = average(arr1) + average(arr2Same)
						
						return approximately(avgSum, expected, Math.abs(expected) * 1e-10 + 1e-10)
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	await t.step("special values", async (t) => {
		await t.step("should handle Infinity correctly", () => {
			assertEquals(average([Infinity, 1, 2, 3]), Infinity)
			assertEquals(average([-Infinity, 1, 2, 3]), -Infinity)
			assertEquals(Number.isNaN(average([Infinity, -Infinity])), true)
			assertEquals(average([Infinity, Infinity]), Infinity)
		})

		await t.step("should handle zero correctly", () => {
			assertEquals(average([0]), 0)
			assertEquals(average([0, 0, 0]), 0)
			assertEquals(average([-1, 0, 1]), 0)
			assertEquals(average([0, 1, 2, 3]), 1.5)
		})

		await t.step("should handle negative numbers", () => {
			assertEquals(average([-1, -2, -3]), -2)
			assertEquals(average([-10, -20, -30]), -20)
			assertEquals(average([-5, -10, -15, -20]), -12.5)
		})

		await t.step("should handle mixed positive and negative", () => {
			assertEquals(average([-2, -1, 0, 1, 2]), 0)
			assertEquals(average([-10, -5, 5, 10]), 0)
			assertEquals(average([-3, -1, 1, 3]), 0)
		})

		await t.step("should handle decimal numbers", () => {
			assertEquals(average([1.5, 2.5, 3.5]), 2.5)
			assertEquals(approximately(average([0.1, 0.2, 0.3]), 0.2, 1e-10), true)
			assertEquals(average([1.1, 2.2, 3.3, 4.4]), 2.75)
		})

		await t.step("should handle large numbers", () => {
			assertEquals(average([1000000, 2000000, 3000000]), 2000000)
			assertEquals(average([1e10, 2e10, 3e10]), 2e10)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for empty array", () => {
			assertEquals(Number.isNaN(average([])), true)
		})

		await t.step("should return NaN for null or undefined", () => {
			assertEquals(Number.isNaN(average(null as any)), true)
			assertEquals(Number.isNaN(average(undefined as any)), true)
		})

		await t.step("should return NaN for non-array inputs", () => {
			assertEquals(Number.isNaN(average("not an array" as any)), true)
			assertEquals(Number.isNaN(average(123 as any)), true)
			assertEquals(Number.isNaN(average({} as any)), true)
		})

		await t.step("should return NaN for arrays with non-numeric values", () => {
			assertEquals(Number.isNaN(average([1, "2", 3] as any)), true)
			assertEquals(Number.isNaN(average([1, null, 3] as any)), true)
			assertEquals(Number.isNaN(average([1, undefined, 3] as any)), true)
			assertEquals(Number.isNaN(average([1, {}, 3] as any)), true)
		})

		await t.step("should return NaN for arrays containing NaN", () => {
			assertEquals(Number.isNaN(average([1, 2, NaN, 3, 4])), true)
			assertEquals(Number.isNaN(average([NaN, NaN, NaN])), true)
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("basic examples", () => {
			assertEquals(average([1, 2, 3, 4, 5]), 3)
			assertEquals(average([10, 20, 30]), 20)
			assertEquals(average([5]), 5)
		})

		await t.step("decimal numbers", () => {
			assertEquals(average([1.5, 2.5, 3.5]), 2.5)
			assertEquals(approximately(average([0.1, 0.2, 0.3]), 0.2, 1e-10), true)
		})

		await t.step("negative numbers", () => {
			assertEquals(average([-1, -2, -3]), -2)
			assertEquals(average([-10, 0, 10]), 0)
		})

		await t.step("large numbers", () => {
			assertEquals(average([1000000, 2000000, 3000000]), 2000000)
			assertEquals(average([1e10, 2e10, 3e10]), 2e10)
		})

		await t.step("edge cases", () => {
			assertEquals(average([0, 0, 0]), 0)
			assertEquals(Number.isNaN(average([])), true)
			assertEquals(Number.isNaN(average([1, NaN, 3])), true)
		})

		await t.step("special values", () => {
			assertEquals(average([Infinity, 1, 2]), Infinity)
			assertEquals(average([-Infinity, 1, 2]), -Infinity)
			assertEquals(Number.isNaN(average([Infinity, -Infinity])), true)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(average(null as any)), true)
			assertEquals(Number.isNaN(average(undefined as any)), true)
			assertEquals(Number.isNaN(average("not an array" as any)), true)
		})

		await t.step("practical examples", () => {
			// Test scores
			const testScores = [85, 92, 78, 95, 88]
			assertEquals(average(testScores), 87.6)

			// Temperatures
			const temperatures = [68, 72, 75, 71, 69]
			assertEquals(average(temperatures), 71)

			// Sales data
			const dailySales = [1200, 1500, 1800, 1100, 1400]
			assertEquals(average(dailySales), 1400)

			// Response times
			const responseTimes = [120, 145, 98, 132, 105]
			assertEquals(average(responseTimes), 120)

			// Stock prices
			const stockPrices = [150.25, 152.50, 148.75, 153.00, 151.50]
			assertEquals(average(stockPrices), 151.2)
		})

		await t.step("statistical analysis", () => {
			// Dataset with outlier
			const withOutlier = [10, 12, 11, 50, 9, 11]
			assertEquals(average(withOutlier), 17.166666666666668)

			// Uniform distribution
			const uniform = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			assertEquals(average(uniform), 5.5)

			// Skewed distribution
			const skewed = [1, 1, 1, 2, 2, 3, 10]
			assertEquals(average(skewed), 2.857142857142857)
		})

		await t.step("financial calculations", () => {
			// Portfolio returns
			const returns = [0.05, -0.02, 0.08, 0.03, -0.01]
			const avgReturn = average(returns)
			assertEquals(approximately(avgReturn, 0.026, 1e-10), true)

			// Monthly expenses
			const expenses = [2500, 2800, 2300, 2600, 2400]
			assertEquals(average(expenses), 2520)
		})

		await t.step("data validation", () => {
			const isValidDataset = (data: unknown): boolean => {
				if (!Array.isArray(data)) return false
				const avg = average(data)
				return !Number.isNaN(avg)
			}
			
			assertEquals(isValidDataset([1, 2, 3]), true)
			assertEquals(isValidDataset([1, "2", 3]), false)
		})

		await t.step("moving average", () => {
			const movingAverage = (data: Array<number>, window: number): Array<number> => {
				const result: Array<number> = []
				for (let i = 0; i <= data.length - window; i++) {
					result.push(average(data.slice(i, i + window)))
				}
				return result
			}
			
			assertEquals(movingAverage([1, 2, 3, 4, 5, 6], 3), [2, 3, 4, 5])
		})

		await t.step("outlier detection", () => {
			const detectOutliers = (data: Array<number>): Array<number> => {
				const avg = average(data)
				const deviation = Math.sqrt(data.reduce((sum, x) => sum + Math.pow(x - avg, 2), 0) / data.length)
				const threshold = 2 * deviation // 2 standard deviations
				return data.filter(x => Math.abs(x - avg) > threshold)
			}
			
			assertEquals(detectOutliers([10, 12, 11, 50, 9, 11]), [50])
		})

		await t.step("performance monitoring", () => {
			const cpuUsage = [45.2, 52.1, 48.5, 51.3, 49.8, 53.2, 47.9]
			const avgCpu = average(cpuUsage)
			assertEquals(approximately(avgCpu, 49.714285714285715, 1e-10), true)
		})

		await t.step("weighted average comparison", () => {
			const weightedAverage = (values: Array<number>, weights: Array<number>): number => {
				const weightedSum = values.reduce((sum, val, i) => sum + val * weights[i], 0)
				const totalWeight = weights.reduce((sum, w) => sum + w, 0)
				return weightedSum / totalWeight
			}
			
			assertEquals(approximately(weightedAverage([80, 90, 70], [0.3, 0.5, 0.2]), 83, 1e-10), true)
		})

		await t.step("precision handling", () => {
			const veryLarge = [1e10, 1e10, 1e10]
			const result = average(veryLarge)
			assertEquals(approximately(result, 1e10, 1e10 * 1e-10), true)

			const verySmall = [1e-10, 2e-10, 3e-10]
			assertEquals(average(verySmall), 2e-10)
		})

		await t.step("immutability check", () => {
			const original = [1, 2, 3, 4, 5]
			const copy = [...original]
			average(original)
			assertEquals(original, copy)
		})

		await t.step("pipeline processing", () => {
			const pipeline = [1, 2, 3, 4, 5]
				.map(x => x * 2)
				.filter(x => x > 4)
			const result = average(pipeline)
			assertEquals(result, 8)
		})

		await t.step("batch processing", () => {
			const batches = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
			const batchAverages = batches.map(average)
			assertEquals(batchAverages, [2, 5, 8])
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify the original array", () => {
			const original = [1, 2, 3, 4, 5]
			const copy = [...original]
			average(original)
			assertEquals(original, copy)
		})
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should handle large arrays efficiently", () => {
			const largeArray = Array.from({ length: 10000 }, (_, i) => i)
			const result = average(largeArray)
			assertEquals(result, 4999.5)
		})

		await t.step("should be consistent for repeated calls", () => {
			const data = [1, 2, 3, 4, 5]
			const result1 = average(data)
			const result2 = average(data)
			const result3 = average(data)
			
			assertEquals(result1, result2)
			assertEquals(result2, result3)
		})
	})
})