import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import median from "../../../../src/simple/math/median/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

Deno.test("median", async (t) => {
	await t.step("statistical properties", async (t) => {
		await t.step(
			"should return middle value for odd-length sorted arrays",
			() => {
				fc.assert(
					fc.property(
						fc.array(fc.integer({ min: -1000, max: 1000 }), {
							minLength: 1,
							maxLength: 99,
						})
							.filter((arr) => arr.length % 2 === 1),
						(numbers) => {
							const sorted = [...numbers].sort((a, b) => a - b)
							const middleIndex = Math.floor(sorted.length / 2)
							const expected = sorted[middleIndex]

							assertEquals(median(numbers), expected)
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step(
			"should return average of middle two for even-length sorted arrays",
			() => {
				fc.assert(
					fc.property(
						fc.array(fc.integer({ min: -1000, max: 1000 }), {
							minLength: 2,
							maxLength: 100,
						})
							.filter((arr) => arr.length % 2 === 0),
						(numbers) => {
							const sorted = [...numbers].sort((a, b) => a - b)
							const middleIndex = sorted.length / 2
							const expected = (sorted[middleIndex - 1] +
								sorted[middleIndex]) /
								2

							assertEquals(median(numbers), expected)
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step("should be order-independent", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -1000, max: 1000 }), {
						minLength: 1,
						maxLength: 50,
					}),
					(numbers) => {
						const shuffled = [...numbers].sort(() =>
							Math.random() - 0.5
						)
						const result1 = median(numbers)
						const result2 = median(shuffled)

						// Use approximate equality for floating-point comparison
						return approximately(result1, result2)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should be bounded by min and max", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true }), {
						minLength: 1,
						maxLength: 100,
					}),
					(numbers) => {
						const result = median(numbers)
						const min = Math.min(...numbers)
						const max = Math.max(...numbers)

						return result >= min && result <= max
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should equal the value for single-element arrays", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(value) => {
						assertEquals(median([value]), value)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should handle duplicate values correctly", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					fc.integer({ min: 1, max: 20 }),
					(value, count) => {
						const array = Array(count).fill(value)
						assertEquals(median(array), value)
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("robustness to outliers", async (t) => {
		await t.step("should be less affected by outliers than mean", () => {
			const withoutOutlier = [1, 2, 3, 4, 5]
			const withOutlier = [1, 2, 3, 4, 100]

			// Median should be the same or similar
			assertEquals(median(withoutOutlier), 3)
			assertEquals(median(withOutlier), 3)

			// But mean would be very different
			const mean = (arr: Array<number>) =>
				arr.reduce((a, b) => a + b, 0) / arr.length
			assertEquals(mean(withoutOutlier), 3)
			assertEquals(mean(withOutlier), 22)
		})

		await t.step("should handle extreme outliers", () => {
			const dataset = [1, 2, 3, 4, 5, Number.MAX_SAFE_INTEGER]
			assertEquals(median(dataset), 3.5)

			const dataset2 = [Number.MIN_SAFE_INTEGER, 1, 2, 3, 4, 5]
			assertEquals(median(dataset2), 2.5)
		})
	})

	await t.step("special values", async (t) => {
		await t.step("should handle Infinity correctly", () => {
			assertEquals(median([1, 2, 3, Infinity]), 2.5)
			assertEquals(median([-Infinity, 0, Infinity]), 0)
			assertEquals(median([Infinity, Infinity, Infinity]), Infinity)
			assertEquals(median([-Infinity, -Infinity, -Infinity]), -Infinity)
		})

		await t.step("should handle zero correctly", () => {
			assertEquals(median([0]), 0)
			assertEquals(median([0, 0, 0]), 0)
			assertEquals(median([-1, 0, 1]), 0)
			assertEquals(median([0, 1, 2, 3]), 1.5)
		})

		await t.step("should handle negative numbers", () => {
			assertEquals(median([-5, -3, -1]), -3)
			assertEquals(median([-10, -8, -6, -4]), -7)
			assertEquals(median([-100, -50, -25, -10, -5]), -25)
		})

		await t.step("should handle mixed positive and negative", () => {
			assertEquals(median([-2, -1, 0, 1, 2]), 0)
			assertEquals(median([-10, -5, 5, 10]), 0)
			assertEquals(median([-3, -1, 1, 3]), 0)
		})

		await t.step("should handle decimal numbers", () => {
			assertAlmostEquals(median([1.5, 2.5, 3.5]), 2.5)
			assertAlmostEquals(median([0.1, 0.2, 0.3, 0.4]), 0.25)
			assertAlmostEquals(median([1.1, 2.2, 3.3, 4.4, 5.5]), 3.3)
		})

		await t.step("should handle large numbers", () => {
			assertEquals(median([1000000, 2000000, 3000000]), 2000000)
			assertEquals(median([1e10, 2e10, 3e10, 4e10]), 2.5e10)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for empty array", () => {
			assertEquals(Number.isNaN(median([])), true)
		})

		await t.step("should return NaN for null or undefined", () => {
			assertEquals(Number.isNaN(median(null as any)), true)
			assertEquals(Number.isNaN(median(undefined as any)), true)
		})

		await t.step("should return NaN for non-array inputs", () => {
			assertEquals(Number.isNaN(median("not an array" as any)), true)
			assertEquals(Number.isNaN(median(123 as any)), true)
			assertEquals(Number.isNaN(median({} as any)), true)
		})

		await t.step(
			"should return NaN for arrays with non-numeric values",
			() => {
				assertEquals(Number.isNaN(median([1, "2", 3] as any)), true)
				assertEquals(Number.isNaN(median([1, null, 3] as any)), true)
				assertEquals(
					Number.isNaN(median([1, undefined, 3] as any)),
					true,
				)
				assertEquals(Number.isNaN(median([1, {}, 3] as any)), true)
			},
		)

		await t.step("should return NaN for arrays containing NaN", () => {
			assertEquals(Number.isNaN(median([1, 2, NaN, 3, 4])), true)
			assertEquals(Number.isNaN(median([NaN, NaN, NaN])), true)
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("odd number of elements", () => {
			assertEquals(median([3, 1, 2]), 2)
			assertEquals(median([5, 2, 8, 1, 9]), 5)
			assertEquals(median([7]), 7)
		})

		await t.step("even number of elements", () => {
			assertEquals(median([1, 2, 3, 4]), 2.5)
			assertEquals(median([10, 20]), 15)
			assertEquals(median([1, 3, 5, 7, 9, 11]), 6)
		})

		await t.step("already sorted arrays", () => {
			assertEquals(median([1, 2, 3, 4, 5]), 3)
			assertEquals(median([10, 20, 30, 40]), 25)
		})

		await t.step("unsorted arrays", () => {
			assertEquals(median([9, 3, 5, 7, 1]), 5)
			assertEquals(median([100, 10, 50, 20, 80]), 50)
		})

		await t.step("negative numbers", () => {
			assertEquals(median([-5, -2, -8, -1, -3]), -3)
			assertEquals(median([-10, 0, 10]), 0)
			assertEquals(median([-5, -10, -15, -20]), -12.5)
		})

		await t.step("mixed positive and negative", () => {
			assertEquals(median([-2, -1, 0, 1, 2]), 0)
			assertEquals(median([-10, -5, 5, 10]), 0)
		})

		await t.step("decimal numbers", () => {
			assertAlmostEquals(median([1.5, 2.5, 3.5]), 2.5)
			assertAlmostEquals(median([0.1, 0.2, 0.3, 0.4]), 0.25)
			assertAlmostEquals(median([1.1, 2.2, 3.3, 4.4, 5.5]), 3.3)
		})

		await t.step("duplicate values", () => {
			assertEquals(median([5, 5, 5, 5, 5]), 5)
			assertEquals(median([1, 2, 2, 3, 3, 3]), 2.5)
			assertEquals(median([10, 10, 20, 20, 30]), 20)
		})

		await t.step("large numbers", () => {
			assertEquals(median([1000000, 2000000, 3000000]), 2000000)
			assertEquals(median([Number.MAX_SAFE_INTEGER, 0, 1000]), 1000)
		})

		await t.step("special numeric values", () => {
			assertEquals(median([1, 2, 3, Infinity]), 2.5)
			assertEquals(median([-Infinity, 0, Infinity]), 0)
			assertEquals(Number.isNaN(median([1, 2, NaN, 3, 4])), true)
		})

		await t.step("empty array", () => {
			assertEquals(Number.isNaN(median([])), true)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(median(null as any)), true)
			assertEquals(Number.isNaN(median(undefined as any)), true)
			assertEquals(Number.isNaN(median("not an array" as any)), true)
		})

		await t.step("arrays with non-numeric values", () => {
			assertEquals(Number.isNaN(median([1, "2", 3] as any)), true)
			assertEquals(Number.isNaN(median([1, null, 3] as any)), true)
			assertEquals(Number.isNaN(median([1, undefined, 3] as any)), true)
		})

		await t.step("statistical examples", () => {
			const testScores = [85, 92, 78, 95, 88, 73, 98]
			assertEquals(median(testScores), 88)

			const salaries = [45000, 50000, 55000, 60000, 65000, 70000, 120000]
			assertEquals(median(salaries), 60000)

			const ages = [22, 25, 27, 29, 31, 33, 35, 38, 42]
			assertEquals(median(ages), 31)
		})

		await t.step("temperature readings", () => {
			const temperatures = [68.5, 70.2, 71.8, 69.3, 72.1]
			assertAlmostEquals(median(temperatures), 70.2)
		})

		await t.step("response times", () => {
			const responseTimes = [120, 145, 98, 210, 165, 133, 177]
			assertEquals(median(responseTimes), 145)
		})

		await t.step("product ratings", () => {
			const ratings = [4.5, 3.8, 4.2, 4.9, 3.5, 4.7, 4.1]
			assertAlmostEquals(median(ratings), 4.2)
		})

		await t.step("house prices (outlier resistant)", () => {
			const housePrices = [250000, 280000, 310000, 295000, 1200000]
			assertEquals(median(housePrices), 295000)
		})

		await t.step("class sizes", () => {
			const classSizes = [18, 22, 25, 20, 24, 19, 23]
			assertEquals(median(classSizes), 22)
		})

		await t.step("daily steps", () => {
			const dailySteps = [8500, 10200, 7800, 9500, 11000, 6500, 9000]
			assertEquals(median(dailySteps), 9000)
		})

		await t.step("investment returns", () => {
			const returns = [-2.5, 3.2, 5.8, -1.3, 4.5, 6.2, 2.1]
			assertAlmostEquals(median(returns), 3.2)
		})

		await t.step("comparing with mean", () => {
			const dataset = [1, 2, 3, 4, 100]
			assertEquals(median(dataset), 3)
			// mean would be 22 (affected by outlier)
		})

		await t.step("finding middle performance", () => {
			const lapTimes = [65.2, 63.8, 64.5, 66.1, 63.5, 64.2, 65.8]
			assertAlmostEquals(median(lapTimes), 64.5)
		})

		await t.step("percentile calculation helper", () => {
			function getPercentile(
				data: Array<number>,
				percentile: number,
			): number {
				if (percentile === 50) return median(data)
				// ... other percentile logic
				return NaN
			}
			assertEquals(getPercentile([1, 2, 3, 4, 5], 50), 3)
		})

		await t.step("quartile analysis", () => {
			const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
			const q2 = median(data)
			assertEquals(q2, 5)
		})

		await t.step("pipeline with validation", () => {
			const safeMedian = (values: unknown): number | null => {
				if (!Array.isArray(values)) return null
				const result = median(values)
				return isNaN(result) ? null : result
			}
			assertEquals(safeMedian([1, 2, 3, 4, 5]), 3)
			assertEquals(safeMedian("invalid"), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify the original array", () => {
			const original = [5, 2, 8, 1, 9]
			const copy = [...original]
			median(original)
			assertEquals(original, copy)
		})

		await t.step(
			"should not affect the order of the original array",
			() => {
				const original = [9, 1, 7, 3, 5]
				const copy = [...original]
				const result = median(original)
				assertEquals(result, 5)
				assertEquals(original, copy)
				// Original array should still be in the same order
				assertEquals(original[0], 9)
				assertEquals(original[1], 1)
				assertEquals(original[2], 7)
				assertEquals(original[3], 3)
				assertEquals(original[4], 5)
			},
		)
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should handle large arrays efficiently", () => {
			const largeArray = Array.from({ length: 10000 }, (_, i) => i)
			const result = median(largeArray)
			assertEquals(result, 4999.5)
		})

		await t.step("should be consistent for repeated calls", () => {
			const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
			const result1 = median(data)
			const result2 = median(data)
			const result3 = median(data)

			assertEquals(result1, result2)
			assertEquals(result2, result3)
		})
	})
})
