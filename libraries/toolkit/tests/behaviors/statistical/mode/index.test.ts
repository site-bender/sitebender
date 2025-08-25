import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import mode from "../../../../src/simple/math/mode/index.ts"

Deno.test("mode", async (t) => {
	await t.step("statistical properties", async (t) => {
		await t.step("should return most frequent value(s)", async (t) => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 }), {
						minLength: 1,
						maxLength: 100,
					}),
					(numbers) => {
						const result = mode(numbers)

						// Count frequencies
						const frequency = new Map<number, number>()
						for (const num of numbers) {
							frequency.set(num, (frequency.get(num) || 0) + 1)
						}

						// Find max frequency
						const maxFreq = Math.max(...frequency.values())

						// Get all values with max frequency
						const expected = Array.from(frequency.entries())
							.filter(([_, count]) => count === maxFreq)
							.map(([value, _]) => value)
							.sort((a, b) => a - b)

						assertEquals(result, expected)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step(
			"should return all values for uniform distribution",
			async (t) => {
				fc.assert(
					fc.property(
						fc.array(fc.float({ noNaN: true }), {
							minLength: 1,
							maxLength: 20,
						}),
						(numbers) => {
							// Create unique array
							const unique = [...new Set(numbers)]
							const result = mode(unique)

							// Should return all unique values sorted
							assertEquals(result, unique.sort((a, b) => a - b))
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step(
			"should return single value for arrays with one dominant mode",
			async (t) => {
				fc.assert(
					fc.property(
						fc.float({ noNaN: true }),
						fc.array(fc.float({ noNaN: true }), {
							minLength: 1,
							maxLength: 10,
						}),
						(dominant, others) => {
							// Create array with clear dominant value
							const arr = [...others, dominant, dominant, dominant]
							const result = mode(arr)

							assertEquals(result.includes(dominant), true)
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step("should return values in ascending order", async (t) => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true }), { minLength: 1 }),
					(numbers) => {
						const result = mode(numbers)

						// Check that result is sorted
						for (let i = 1; i < result.length; i++) {
							assertEquals(result[i] >= result[i - 1], true)
						}
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("deterministic behavior", async (t) => {
		await t.step(
			"should always return same result for same input",
			async (t) => {
				fc.assert(
					fc.property(
						fc.array(fc.float({ noNaN: true }), { minLength: 1 }),
						(numbers) => {
							const result1 = mode(numbers)
							const result2 = mode(numbers)
							const result3 = mode([...numbers])

							assertEquals(result1, result2)
							assertEquals(result1, result3)
						},
					),
					{ numRuns: 1000 },
				)
			},
		)
	})

	await t.step("single vs multiple modes", async (t) => {
		await t.step("should handle single mode", async (t) => {
			assertEquals(mode([1, 2, 2, 3, 4]), [2])
			assertEquals(mode([5, 5, 5, 1, 2, 3]), [5])
			assertEquals(mode([7, 7, 7, 7, 7]), [7])
		})

		await t.step(
			"should handle multiple modes (bimodal/multimodal)",
			async (t) => {
				assertEquals(mode([1, 1, 2, 2, 3]), [1, 2])
				assertEquals(mode([4, 4, 4, 6, 6, 6, 2]), [4, 6])
				assertEquals(mode([1, 2, 3, 1, 2, 3]), [1, 2, 3])
			},
		)

		await t.step("should handle no repeating values", async (t) => {
			assertEquals(mode([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
			assertEquals(mode([10]), [10])
		})
	})

	await t.step("special values", async (t) => {
		await t.step("should handle Infinity correctly", async (t) => {
			assertEquals(mode([Infinity, Infinity, 1, 2]), [Infinity])
			assertEquals(mode([-Infinity, -Infinity, 0]), [-Infinity])
			assertEquals(mode([Infinity, -Infinity, Infinity]), [Infinity])
		})

		await t.step("should handle zero correctly", async (t) => {
			assertEquals(mode([0, 0, 0, 1, 2]), [0])
			assertEquals(mode([0, 1, 0, 1, 0]), [0])
			assertEquals(mode([0, 0, 1, 1]), [0, 1])
		})

		await t.step("should handle negative numbers", async (t) => {
			assertEquals(mode([-1, -1, -2, -2, -3]), [-2, -1])
			assertEquals(mode([-5, -5, -5, 0, 1]), [-5])
		})

		await t.step("should handle mixed positive and negative", async (t) => {
			assertEquals(mode([-2, -1, 0, 0, 1, 2]), [0])
			assertEquals(mode([-3, -3, 3, 3]), [-3, 3])
		})

		await t.step("should handle decimal numbers", async (t) => {
			assertEquals(mode([1.5, 2.5, 1.5, 3.5]), [1.5])
			assertEquals(mode([0.1, 0.2, 0.1, 0.2]), [0.1, 0.2])
			assertEquals(mode([3.14, 3.14, 2.71, 2.71]), [2.71, 3.14])
		})

		await t.step("should handle large numbers", async (t) => {
			assertEquals(mode([1000000, 1000000, 2000000]), [1000000])
			assertEquals(
				mode([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0]),
				[Number.MAX_SAFE_INTEGER],
			)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return empty array for empty input", async (t) => {
			assertEquals(mode([]), [])
		})

		await t.step(
			"should return empty array for null or undefined",
			async (t) => {
				assertEquals(mode(null as any), [])
				assertEquals(mode(undefined as any), [])
			},
		)

		await t.step(
			"should return empty array for non-array inputs",
			async (t) => {
				assertEquals(mode("not an array" as any), [])
				assertEquals(mode(123 as any), [])
				assertEquals(mode({} as any), [])
			},
		)

		await t.step(
			"should return empty array for arrays with non-numeric values",
			async (t) => {
				assertEquals(mode([1, "2", 3] as any), [])
				assertEquals(mode([1, null, 3] as any), [])
				assertEquals(mode([1, undefined, 3] as any), [])
				assertEquals(mode([1, 2, NaN, 3]), [])
				assertEquals(mode([1, {}, 3] as any), [])
				assertEquals(mode([1, [], 3] as any), [])
			},
		)
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("should handle single mode", async (t) => {
			assertEquals(mode([1, 2, 2, 3, 4]), [2])
			assertEquals(mode([5, 5, 5, 1, 2, 3]), [5])
			assertEquals(mode([7, 7, 7, 7, 7]), [7])
		})

		await t.step("should handle multiple modes", async (t) => {
			assertEquals(mode([1, 1, 2, 2, 3]), [1, 2])
			assertEquals(mode([4, 4, 4, 6, 6, 6, 2]), [4, 6])
			assertEquals(mode([1, 2, 3, 1, 2, 3]), [1, 2, 3])
		})

		await t.step("should handle no repeating values", async (t) => {
			assertEquals(mode([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
			assertEquals(mode([10]), [10])
		})

		await t.step("should handle negative numbers", async (t) => {
			assertEquals(mode([-1, -1, -2, -2, -3]), [-2, -1])
			assertEquals(mode([-5, -5, -5, 0, 1]), [-5])
		})

		await t.step("should handle mixed positive and negative", async (t) => {
			assertEquals(mode([-2, -1, 0, 0, 1, 2]), [0])
			assertEquals(mode([-3, -3, 3, 3]), [-3, 3])
		})

		await t.step("should handle decimal numbers", async (t) => {
			assertEquals(mode([1.5, 2.5, 1.5, 3.5]), [1.5])
			assertEquals(mode([0.1, 0.2, 0.1, 0.2]), [0.1, 0.2])
			assertEquals(mode([3.14, 3.14, 2.71, 2.71]), [2.71, 3.14])
		})

		await t.step("should handle large frequency differences", async (t) => {
			assertEquals(mode([1, 1, 1, 1, 1, 2, 3]), [1])
			assertEquals(mode([9, 9, 9, 9, 8, 8, 7]), [9])
		})

		await t.step("should handle sorted vs unsorted input", async (t) => {
			assertEquals(mode([3, 1, 2, 1, 3, 2, 1]), [1])
			assertEquals(mode([1, 1, 1, 2, 2, 3, 3]), [1])
		})

		await t.step("should handle zero", async (t) => {
			assertEquals(mode([0, 0, 0, 1, 2]), [0])
			assertEquals(mode([0, 1, 0, 1, 0]), [0])
		})

		await t.step("should handle large numbers", async (t) => {
			assertEquals(mode([1000000, 1000000, 2000000]), [1000000])
			assertEquals(
				mode([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0]),
				[Number.MAX_SAFE_INTEGER],
			)
		})

		await t.step("should handle special numeric values", async (t) => {
			assertEquals(mode([Infinity, Infinity, 1, 2]), [Infinity])
			assertEquals(mode([-Infinity, -Infinity, 0]), [-Infinity])
			assertEquals(mode([1, 2, NaN, 3]), [])
		})

		await t.step("should handle empty array", async (t) => {
			assertEquals(mode([]), [])
		})

		await t.step("should handle invalid inputs", async (t) => {
			assertEquals(mode(null as any), [])
			assertEquals(mode(undefined as any), [])
			assertEquals(mode("not an array" as any), [])
		})

		await t.step("should handle arrays with non-numeric values", async (t) => {
			assertEquals(mode([1, "2", 3] as any), [])
			assertEquals(mode([1, null, 3] as any), [])
			assertEquals(mode([1, undefined, 3] as any), [])
		})

		await t.step("should work for test scores", async (t) => {
			const testScores = [85, 90, 85, 92, 85, 88, 90]
			assertEquals(mode(testScores), [85])
		})

		await t.step("should work for dice rolls", async (t) => {
			const dicRolls = [1, 3, 6, 3, 4, 2, 6, 3, 6, 5]
			assertEquals(mode(dicRolls), [3, 6])
		})

		await t.step("should work for shoe sizes", async (t) => {
			const shoeSizes = [9, 10, 9, 10.5, 9, 11, 9, 10]
			assertEquals(mode(shoeSizes), [9])
		})

		await t.step("should work for survey responses", async (t) => {
			const ratings = [4, 5, 3, 5, 4, 5, 2, 5, 4, 3]
			assertEquals(mode(ratings), [5])
		})

		await t.step("should work for temperature readings", async (t) => {
			const temps = [72, 73, 72, 71, 72, 74, 72]
			assertEquals(mode(temps), [72])
		})

		await t.step("should work for class attendance", async (t) => {
			const attendance = [28, 30, 29, 30, 28, 30, 29]
			assertEquals(mode(attendance), [30])
		})

		await t.step("should work for product defects", async (t) => {
			const defects = [0, 1, 0, 2, 0, 1, 0, 3]
			assertEquals(mode(defects), [0])
		})

		await t.step("should work for network latency", async (t) => {
			const latencies = [45, 52, 45, 48, 45, 52, 50]
			assertEquals(mode(latencies), [45])
		})

		await t.step("should work for categorical data", async (t) => {
			const categories = [1, 2, 1, 3, 1, 2, 1, 4]
			assertEquals(mode(categories), [1])
		})

		await t.step("should work for lottery numbers", async (t) => {
			const lotteryDraws = [7, 13, 7, 22, 7, 13, 35]
			assertEquals(mode(lotteryDraws), [7])
		})

		await t.step("should work for finding consensus", async (t) => {
			const votes = [1, 2, 1, 1, 3, 2, 1]
			assertEquals(mode(votes), [1])
		})

		await t.step("should work for bimodal distribution", async (t) => {
			const bimodal = [20, 21, 20, 21, 20, 21, 25]
			assertEquals(mode(bimodal), [20, 21])
		})

		await t.step("should work for uniform distribution", async (t) => {
			const uniform = [1, 2, 3, 4, 5, 6]
			assertEquals(mode(uniform), [1, 2, 3, 4, 5, 6])
		})

		await t.step("should work for peak detection", async (t) => {
			const histogram = [5, 5, 10, 10, 10, 8, 8, 3]
			assertEquals(mode(histogram), [10])
		})

		await t.step("should work for customer purchase quantities", async (t) => {
			const quantities = [1, 2, 1, 3, 1, 2, 1, 4, 1]
			assertEquals(mode(quantities), [1])
		})

		await t.step("should work for error codes", async (t) => {
			const errorCodes = [404, 500, 404, 403, 404, 500]
			assertEquals(mode(errorCodes), [404])
		})

		await t.step("should work with filtering pipeline", async (t) => {
			const getMostCommon = (
				data: Array<number>,
				threshold: number,
			): Array<number> => {
				const filtered = data.filter((x) => x >= threshold)
				return mode(filtered)
			}
			assertEquals(getMostCommon([1, 2, 2, 3, 3, 3], 2), [3])
		})

		await t.step("should work for analyzing patterns", async (t) => {
			const pattern = [1, 2, 1, 2, 1, 2, 3]
			const mostFrequent = mode(pattern)
			assertEquals(mostFrequent, [1, 2])
		})

		await t.step("should work with safe wrapper", async (t) => {
			const safeMode = (values: unknown): Array<number> | null => {
				if (!Array.isArray(values)) return null
				const result = mode(values)
				return result.length > 0 ? result : null
			}
			assertEquals(safeMode([1, 1, 2, 3]), [1])
			assertEquals(safeMode("invalid"), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify the original array", async (t) => {
			const original = [3, 1, 2, 1, 3, 2, 1]
			const copy = [...original]
			mode(original)
			assertEquals(original, copy)
		})
	})
})
