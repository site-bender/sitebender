import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import * as fc from "npm:fast-check@3"

import average from "../../../../../src/simple/math/average/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("average", async (t) => {
	Deno.test("statistical properties", async (t) => {
		await t.step("should calculate arithmetic mean correctly", async (t) => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -1e6, max: 1e6 }), { minLength: 1, maxLength: 100 }),
					(numbers) => {
						const result = average(numbers)
						const expectedSum = numbers.reduce((a, b) => a + b, 0)
						const expectedAvg = expectedSum / numbers.length
						
						expect(approximately(result, expectedAvg, Math.abs(expectedAvg) * 1e-10)).toBe(true)
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should satisfy mean inequality (min <= mean <= max)", async (t) => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true }), { minLength: 1 }),
					(numbers) => {
						const result = average(numbers)
						const min = Math.min(...numbers)
						const max = Math.max(...numbers)
						
						assertEquals(result >= min, true)
						assertEquals(result <= max, true)
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
						expect(average([value])).toBe(value)
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
						expect(average(arr)).toBe(value)
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	Deno.test("linearity property", async (t) => {
		await t.step("should be linear (average(ax + b) = a*average(x) + b)", async (t) => {
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
						
						expect(approximately(avgTransformed, expected, Math.abs(expected) * 1e-10 + 1e-10)).toBe(true)
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should be additive (average(x + y) = average(x) + average(y))", async (t) => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -1000, max: 1000 }), { minLength: 1, maxLength: 50 }),
					fc.array(fc.float({ noNaN: true, min: -1000, max: 1000 })),
					(arr1, arr2) => {
						// Make arrays same length
						const len = arr1.length
						const arr2Same = arr2.length >= len ? arr2.slice(0, len) : 
							[...arr2, ...Array(len - arr2.length).fill(0)]
						
						const sumArray = arr1.map((x, i) => x + arr2Same[i])
						const avgSum = average(sumArray)
						const expected = average(arr1) + average(arr2Same)
						
						expect(approximately(avgSum, expected, Math.abs(expected) * 1e-10 + 1e-10)).toBe(true)
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	Deno.test("special values", async (t) => {
		await t.step("should handle Infinity correctly", async (t) => {
			expect(average([Infinity, 1, 2])).toBe(Infinity)
			expect(average([-Infinity, 1, 2])).toBe(-Infinity)
			expect(average([Infinity, -Infinity])).toBeNaN()
			expect(average([Infinity, Infinity])).toBe(Infinity)
			expect(average([-Infinity, -Infinity])).toBe(-Infinity)
		})

		await t.step("should handle zero correctly", async (t) => {
			expect(average([0])).toBe(0)
			expect(average([0, 0, 0])).toBe(0)
			expect(average([-0, 0, +0])).toBe(0)
		})

		await t.step("should handle negative numbers", async (t) => {
			expect(average([-10, -20, -30])).toBe(-20)
			expect(average([-5, 0, 5])).toBe(0)
			expect(average([1, -1, 2, -2])).toBe(0)
		})

		await t.step("should handle decimal numbers", async (t) => {
			expect(average([1.5, 2.5, 3.5])).toBe(2.5)
			expect(approximately(average([0.1, 0.2, 0.3]), 0.2, 1e-10)).toBe(true)
		})

		await t.step("should handle large numbers", async (t) => {
			expect(average([1000000, 2000000, 3000000])).toBe(2000000)
			expect(average([1e10, 2e10, 3e10])).toBe(2e10)
		})

		await t.step("should handle small numbers", async (t) => {
			expect(average([0.001, 0.002, 0.003])).toBe(0.002)
			expect(average([1e-10, 2e-10, 3e-10])).toBe(2e-10)
		})
	})

	Deno.test("error handling", async (t) => {
		await t.step("should return NaN for empty arrays", async (t) => {
			expect(average([])).toBeNaN()
		})

		await t.step("should return NaN for null or undefined", async (t) => {
			expect(average(null as any)).toBeNaN()
			expect(average(undefined as any)).toBeNaN()
		})

		await t.step("should return NaN for non-array inputs", async (t) => {
			expect(average("not an array" as any)).toBeNaN()
			expect(average(123 as any)).toBeNaN()
			expect(average({} as any)).toBeNaN()
		})

		await t.step("should return NaN for arrays with non-numeric values", async (t) => {
			expect(average([1, 2, "3", 4] as any)).toBeNaN()
			expect(average([1, 2, null, 4] as any)).toBeNaN()
			expect(average([1, 2, undefined, 4] as any)).toBeNaN()
			expect(average([1, 2, NaN, 4])).toBeNaN()
			expect(average([1, {}, 3] as any)).toBeNaN()
			expect(average([1, [], 3] as any)).toBeNaN()
		})
	})

	Deno.test("JSDoc examples", async (t) => {
		await t.step("should handle basic average", async (t) => {
			expect(average([1, 2, 3, 4, 5])).toBe(3)
			expect(average([10, 20, 30])).toBe(20)
			expect(average([5, 5, 5, 5])).toBe(5)
		})

		await t.step("should handle decimal numbers", async (t) => {
			expect(average([1.5, 2.5, 3.5])).toBe(2.5)
			expect(approximately(average([0.1, 0.2, 0.3]), 0.2, 1e-10)).toBe(true)
		})

		await t.step("should handle negative numbers", async (t) => {
			expect(average([-10, -20, -30])).toBe(-20)
			expect(average([-5, 0, 5])).toBe(0)
			expect(average([1, -1, 2, -2])).toBe(0)
		})

		await t.step("should handle mixed positive and negative", async (t) => {
			expect(average([10, -5, 20, -10, 15])).toBe(6)
		})

		await t.step("should handle single element", async (t) => {
			expect(average([42])).toBe(42)
			expect(average([0])).toBe(0)
		})

		await t.step("should handle large numbers", async (t) => {
			expect(average([1000000, 2000000, 3000000])).toBe(2000000)
		})

		await t.step("should handle small numbers", async (t) => {
			expect(average([0.001, 0.002, 0.003])).toBe(0.002)
		})

		await t.step("should handle empty array", async (t) => {
			expect(average([])).toBeNaN()
		})

		await t.step("should handle invalid inputs", async (t) => {
			expect(average(null as any)).toBeNaN()
			expect(average(undefined as any)).toBeNaN()
			expect(average("not an array" as any)).toBeNaN()
		})

		await t.step("should handle arrays with non-numeric values", async (t) => {
			expect(average([1, 2, "3", 4] as any)).toBeNaN()
			expect(average([1, 2, null, 4] as any)).toBeNaN()
			expect(average([1, 2, undefined, 4] as any)).toBeNaN()
			expect(average([1, 2, NaN, 4])).toBeNaN()
		})

		await t.step("should handle special numeric values", async (t) => {
			expect(average([Infinity, 1, 2])).toBe(Infinity)
			expect(average([-Infinity, 1, 2])).toBe(-Infinity)
			expect(average([Infinity, -Infinity])).toBeNaN()
		})

		await t.step("should work for test scores", async (t) => {
			const scores = [85, 92, 78, 95, 88]
			expect(approximately(average(scores), 87.6, 1e-10)).toBe(true)
		})

		await t.step("should work for temperature readings", async (t) => {
			const temperatures = [72.5, 75.0, 73.2, 74.8, 71.9]
			expect(approximately(average(temperatures), 73.48, 1e-10)).toBe(true)
		})

		await t.step("should work for sales data", async (t) => {
			const dailySales = [1250, 1875, 2100, 1650, 1925]
			expect(average(dailySales)).toBe(1760)
		})

		await t.step("should work for response times", async (t) => {
			const responseTimes = [120, 95, 150, 88, 110]
			expect(approximately(average(responseTimes), 112.6, 1e-10)).toBe(true)
		})

		await t.step("should work for grade calculation", async (t) => {
			function calculateGrade(assignments: Array<number>): string {
				const avg = average(assignments)
				if (avg >= 90) return 'A'
				if (avg >= 80) return 'B'
				if (avg >= 70) return 'C'
				if (avg >= 60) return 'D'
				return 'F'
			}
			expect(calculateGrade([92, 88, 95, 90])).toBe('A')
			expect(calculateGrade([82, 78, 85, 80])).toBe('B')
		})

		await t.step("should work for moving average", async (t) => {
			function movingAverage(data: Array<number>, window: number): Array<number> {
				const result: Array<number> = []
				for (let i = window - 1; i < data.length; i++) {
					const subset = data.slice(i - window + 1, i + 1)
					const avg = average(subset)
					if (!isNaN(avg)) result.push(avg)
				}
				return result
			}
			expect(movingAverage([1, 2, 3, 4, 5, 6], 3)).toEqual([2, 3, 4, 5])
		})

		await t.step("should work for portfolio returns", async (t) => {
			const returns = [0.05, -0.02, 0.08, 0.03, -0.01]
			const avgReturn = average(returns)
			expect(approximately(avgReturn, 0.026, 1e-10)).toBe(true)
		})

		await t.step("should work for data validation", async (t) => {
			function isValidDataset(data: Array<unknown>): boolean {
				const nums = data.filter(x => typeof x === 'number') as Array<number>
				return !isNaN(average(nums)) && nums.length === data.length
			}
			expect(isValidDataset([1, 2, 3])).toBe(true)
			expect(isValidDataset([1, "2", 3])).toBe(false)
		})

		await t.step("should work for outlier detection", async (t) => {
			function detectOutliers(readings: Array<number>): Array<number> {
				const avg = average(readings)
				const threshold = avg * 0.5
				return readings.filter(r => Math.abs(r - avg) > threshold)
			}
			expect(detectOutliers([10, 12, 11, 50, 9, 11])).toEqual([50])
		})

		await t.step("should work for performance metrics", async (t) => {
			const cpuUsage = [45, 52, 48, 55, 51, 49, 53]
			const avgCpu = average(cpuUsage)
			expect(approximately(avgCpu, 50.42857142857143, 1e-10)).toBe(true)
		})

		await t.step("should work for weighted average", async (t) => {
			function weightedAverage(values: Array<number>, weights: Array<number>): number {
				const weighted = values.map((v, i) => v * (weights[i] ?? 1))
				const totalWeight = weights.reduce((sum, w) => sum + w, 0)
				return average(weighted) * (values.length / totalWeight)
			}
			expect(weightedAverage([80, 90, 70], [0.3, 0.5, 0.2])).toBe(82)
		})
	})

	Deno.test("stability", async (t) => {
		await t.step("should handle arrays with very different magnitudes", async (t) => {
			const result = average([1e-10, 1e10, 1e-10])
			expect(approximately(result, 1e10/3, 1e10/3 * 1e-10)).toBe(true)
		})

		await t.step("should be stable for repeated values", async (t) => {
			const values = [Math.PI, Math.PI, Math.PI, Math.PI]
			expect(average(values)).toBe(Math.PI)
		})
	})
})