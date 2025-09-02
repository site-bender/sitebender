import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import sum from "../../../../../src/simple/math/sum/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("sum", async (t) => {
	await t.step("aggregation properties", async (t) => {
		await t.step("should calculate the sum of all elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -1e6, max: 1e6 }), {
						minLength: 0,
						maxLength: 100,
					}),
					(numbers) => {
						const result = sum(numbers)

						if (numbers.length === 0) {
							return result === 0
						}

						// Manual calculation for verification
						let expected = 0
						for (const num of numbers) {
							expected += num
						}

						// Check for special cases
						if (numbers.includes(Infinity) && numbers.includes(-Infinity)) {
							return Number.isNaN(result)
						}
						if (numbers.includes(Infinity)) {
							return result === Infinity
						}
						if (numbers.includes(-Infinity)) {
							return result === -Infinity
						}

						// Use relative epsilon for floating point comparison
						if (expected === 0) {
							return Math.abs(result) < 1e-10
						}
						return approximately(result, expected, Math.abs(expected) * 1e-10)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should return additive identity (0) for empty array", () => {
			assertEquals(sum([]), 0)
		})

		await t.step("should return the value for single element array", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(value) => {
						return sum([value]) === value
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("algebraic properties", async (t) => {
		await t.step("should be commutative (order doesn't matter)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -1000, max: 1000 }), {
						minLength: 2,
						maxLength: 20,
					}),
					(numbers) => {
						const original = sum(numbers)
						const shuffled = [...numbers].sort(() => Math.random() - 0.5)
						const reordered = sum(shuffled)

						// Account for floating point accumulation differences
						return approximately(
							original,
							reordered,
							Math.abs(original) * 1e-10 + 1e-10,
						)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should be associative (grouping doesn't matter)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -100, max: 100 }), {
						minLength: 3,
						maxLength: 10,
					}),
					(numbers) => {
						if (numbers.length < 3) return true

						// Split array and sum in groups
						const mid1 = Math.floor(numbers.length / 3)
						const mid2 = Math.floor(2 * numbers.length / 3)

						const group1 = sum(numbers.slice(0, mid1))
						const group2 = sum(numbers.slice(mid1, mid2))
						const group3 = sum(numbers.slice(mid2))
						const groupedSum = sum([group1, group2, group3])

						const directSum = sum(numbers)

						return approximately(
							groupedSum,
							directSum,
							Math.abs(directSum) * 1e-10 + 1e-10,
						)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should have identity element (0)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -1000, max: 1000 })),
					(numbers) => {
						const withZero = [...numbers, 0]
						const withoutZero = numbers

						const sumWithZero = sum(withZero)
						const sumWithoutZero = sum(withoutZero)

						if (Number.isNaN(sumWithoutZero)) {
							return Number.isNaN(sumWithZero)
						}

						return approximately(
							sumWithZero,
							sumWithoutZero,
							Math.abs(sumWithoutZero) * 1e-10 + 1e-10,
						)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should be distributive with scalar multiplication", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -100, max: 100 }), {
						minLength: 1,
						maxLength: 20,
					}),
					fc.float({ noNaN: true, min: -10, max: 10 }),
					(numbers, scalar) => {
						// scalar * sum(numbers) === sum(numbers.map(n => scalar * n))
						const leftSide = scalar * sum(numbers)
						const rightSide = sum(numbers.map((n) => scalar * n))

						if (Number.isNaN(leftSide) || Number.isNaN(rightSide)) {
							return Number.isNaN(leftSide) && Number.isNaN(rightSide)
						}

						return approximately(
							leftSide,
							rightSide,
							Math.abs(leftSide) * 1e-10 + 1e-10,
						)
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("special values", async (t) => {
		await t.step("should handle positive numbers", () => {
			assertEquals(sum([1, 2, 3, 4, 5]), 15)
			assertEquals(sum([10, 20, 30]), 60)
			assertEquals(sum([100, 200, 300, 400]), 1000)
		})

		await t.step("should handle negative numbers", () => {
			assertEquals(sum([-1, -2, -3]), -6)
			assertEquals(sum([-10, -20, -30]), -60)
			assertEquals(sum([-100, -200, -300]), -600)
		})

		await t.step("should handle mixed positive and negative", () => {
			assertEquals(sum([10, -5, 3, -2]), 6)
			assertEquals(sum([100, -50, 25, -75]), 0)
			assertEquals(sum([-10, 20, -30, 40]), 20)
		})

		await t.step("should handle decimal numbers", () => {
			assertEquals(sum([1.5, 2.5, 3.5]), 7.5)
			assertEquals(approximately(sum([0.1, 0.2, 0.3]), 0.6, 1e-10), true)
			assertEquals(sum([99.99, 0.01]), 100)
		})

		await t.step("should handle zero values", () => {
			assertEquals(sum([0, 0, 0, 0]), 0)
			assertEquals(sum([5, 0, 3, 0, 2]), 10)
			assertEquals(sum([0]), 0)
		})

		await t.step("should handle large numbers", () => {
			assertEquals(sum([1000000, 2000000, 3000000]), 6000000)
			assertEquals(sum([Number.MAX_SAFE_INTEGER, 0]), Number.MAX_SAFE_INTEGER)
			assertEquals(sum([1e10, 2e10, 3e10]), 6e10)
		})

		await t.step("should handle small numbers", () => {
			assertEquals(sum([0.001, 0.002, 0.003]), 0.006)
			assertEquals(sum([1e-10, 2e-10, 3e-10]), 6e-10)
		})

		await t.step("should handle special floating point values", () => {
			assertEquals(sum([Infinity, 1]), Infinity)
			assertEquals(sum([-Infinity, 100]), -Infinity)
			assertEquals(Number.isNaN(sum([Infinity, -Infinity])), true)
			assertEquals(Number.isNaN(sum([1, 2, NaN])), true)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for null", () => {
			assertEquals(Number.isNaN(sum(null as any)), true)
		})

		await t.step("should return NaN for undefined", () => {
			assertEquals(Number.isNaN(sum(undefined as any)), true)
		})

		await t.step("should return NaN for non-array inputs", () => {
			assertEquals(Number.isNaN(sum("not an array" as any)), true)
			assertEquals(Number.isNaN(sum(123 as any)), true)
			assertEquals(Number.isNaN(sum({} as any)), true)
			assertEquals(Number.isNaN(sum(true as any)), true)
		})

		await t.step("should return NaN for arrays with non-numeric values", () => {
			assertEquals(Number.isNaN(sum([1, "2", 3] as any)), true)
			assertEquals(Number.isNaN(sum([1, null, 3] as any)), true)
			assertEquals(Number.isNaN(sum([1, undefined, 3] as any)), true)
			assertEquals(Number.isNaN(sum([1, {}, 3] as any)), true)
			assertEquals(Number.isNaN(sum([1, [], 3] as any)), true)
		})

		await t.step("should return NaN for arrays containing NaN", () => {
			assertEquals(Number.isNaN(sum([1, 2, NaN, 3, 4])), true)
			assertEquals(Number.isNaN(sum([NaN, NaN, NaN])), true)
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("basic addition", () => {
			assertEquals(sum([1, 2, 3, 4, 5]), 15)
			assertEquals(sum([10, 20, 30]), 60)
			assertEquals(sum([100, 200, 300, 400]), 1000)
		})

		await t.step("single element", () => {
			assertEquals(sum([42]), 42)
			assertEquals(sum([0]), 0)
			assertEquals(sum([-5]), -5)
		})

		await t.step("empty array", () => {
			assertEquals(sum([]), 0)
		})

		await t.step("negative numbers", () => {
			assertEquals(sum([-1, -2, -3]), -6)
			assertEquals(sum([-10, -20, -30]), -60)
		})

		await t.step("mixed positive and negative", () => {
			assertEquals(sum([10, -5, 3, -2]), 6)
			assertEquals(sum([100, -50, 25, -75]), 0)
			assertEquals(sum([-10, 20, -30, 40]), 20)
		})

		await t.step("decimal numbers", () => {
			assertEquals(sum([1.5, 2.5, 3.5]), 7.5)
			assertEquals(approximately(sum([0.1, 0.2, 0.3]), 0.6, 1e-10), true)
			assertEquals(sum([99.99, 0.01]), 100)
		})

		await t.step("zero values", () => {
			assertEquals(sum([0, 0, 0, 0]), 0)
			assertEquals(sum([5, 0, 3, 0, 2]), 10)
		})

		await t.step("large numbers", () => {
			assertEquals(sum([1000000, 2000000, 3000000]), 6000000)
			assertEquals(sum([Number.MAX_SAFE_INTEGER, 0]), Number.MAX_SAFE_INTEGER)
		})

		await t.step("small numbers", () => {
			assertEquals(sum([0.001, 0.002, 0.003]), 0.006)
			assertEquals(sum([1e-10, 2e-10, 3e-10]), 6e-10)
		})

		await t.step("special values", () => {
			assertEquals(sum([Infinity, 1]), Infinity)
			assertEquals(sum([-Infinity, 100]), -Infinity)
			assertEquals(Number.isNaN(sum([Infinity, -Infinity])), true)
			assertEquals(Number.isNaN(sum([1, 2, NaN])), true)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(sum(null as any)), true)
			assertEquals(Number.isNaN(sum(undefined as any)), true)
			assertEquals(Number.isNaN(sum("not an array" as any)), true)
		})

		await t.step("financial calculations", () => {
			const expenses = [150.50, 45.25, 89.99, 235.75]
			const totalExpenses = sum(expenses)
			assertEquals(totalExpenses, 521.49)

			const revenues = [1250, 1890, 2100, 1765]
			const totalRevenue = sum(revenues)
			assertEquals(totalRevenue, 7005)

			const profits = [1000, -200, 500, -100, 800]
			const netProfit = sum(profits)
			assertEquals(netProfit, 2000)
		})

		await t.step("statistical calculations", () => {
			const dataset = [10, 20, 30, 40, 50]
			const total = sum(dataset)
			assertEquals(total, 150)

			const scores = [85, 92, 78, 95, 88]
			const totalScore = sum(scores)
			assertEquals(totalScore, 438)
		})

		await t.step("energy consumption", () => {
			const dailyUsage = [24.5, 26.3, 25.1, 27.8, 23.9, 24.6, 25.2]
			const weeklyTotal = sum(dailyUsage)
			assertEquals(approximately(weeklyTotal, 177.4, 1e-10), true)
		})

		await t.step("vote counting", () => {
			const candidateVotes = [15234, 18956, 12789, 9876]
			const totalVotes = sum(candidateVotes)
			assertEquals(totalVotes, 56855)
		})

		await t.step("array method chaining", () => {
			const data = [1, 2, 3, 4, 5]
			const doubledSum = sum(data.map((x) => x * 2))
			assertEquals(doubledSum, 30)
		})

		await t.step("filtering before sum", () => {
			const allNumbers = [10, -5, 20, -15, 30]
			const positiveSum = sum(allNumbers.filter((n) => n > 0))
			assertEquals(positiveSum, 60)
		})

		await t.step("range sum", () => {
			const range = Array.from({ length: 100 }, (_, i) => i + 1)
			assertEquals(sum(range), 5050)
		})

		await t.step("geometric series", () => {
			const powers = [1, 2, 4, 8, 16, 32]
			assertEquals(sum(powers), 63)
		})

		await t.step("running total helper", () => {
			const runningTotal = (values: Array<number>) => {
				const totals: Array<number> = []
				values.forEach((_, i) => {
					totals.push(sum(values.slice(0, i + 1)))
				})
				return totals
			}
			assertEquals(runningTotal([1, 2, 3, 4, 5]), [1, 3, 6, 10, 15])
		})

		await t.step("matrix row sums", () => {
			const matrix = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]
			const rowSums = matrix.map(sum)
			assertEquals(rowSums, [6, 15, 24])
		})

		await t.step("weighted sum helper", () => {
			const weightedSum = (values: Array<number>, weights: Array<number>) => {
				const products = values.map((v, i) => v * (weights[i] || 0))
				return sum(products)
			}
			assertEquals(weightedSum([80, 90, 85], [0.3, 0.4, 0.3]), 85.5)
		})

		await t.step("checksum calculation", () => {
			const digits = [4, 5, 6, 7, 8, 9, 0, 1, 2, 3]
			const checksum = sum(digits) % 10
			assertEquals(checksum, 5)
		})

		await t.step("probability", () => {
			const probabilities = [0.2, 0.3, 0.15, 0.35]
			assertEquals(sum(probabilities), 1)
		})

		await t.step("partition sum", () => {
			const partition1 = [10, 20, 30]
			const partition2 = [15, 25, 35]
			const combinedSum = sum([...partition1, ...partition2])
			assertEquals(combinedSum, 135)
		})

		await t.step("safe sum with validation", () => {
			const safeSum = (values: unknown): number | null => {
				if (!Array.isArray(values)) return null
				const result = sum(values)
				return isNaN(result) ? null : result
			}
			assertEquals(safeSum([1, 2, 3, 4, 5]), 15)
			assertEquals(safeSum("invalid"), null)
			assertEquals(safeSum([1, "2", 3]), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify the original array", () => {
			const original = [1, 2, 3, 4, 5]
			const copy = [...original]
			sum(original)
			assertEquals(original, copy)
		})
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should handle large arrays efficiently", () => {
			const largeArray = Array.from({ length: 10000 }, (_, i) => i)
			const result = sum(largeArray)
			assertEquals(result, 49995000)
		})

		await t.step("should be consistent for repeated calls", () => {
			const data = [1, 2, 3, 4, 5]
			const result1 = sum(data)
			const result2 = sum(data)
			const result3 = sum(data)

			assertEquals(result1, 15)
			assertEquals(result2, 15)
			assertEquals(result3, 15)
		})
	})
})
