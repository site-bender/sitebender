import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import product from "../../../../../src/simple/math/product/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("product", async (t) => {
	await t.step("aggregation properties", async (t) => {
		await t.step("should calculate the product of all elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -100, max: 100 }), {
						minLength: 0,
						maxLength: 20,
					}),
					(numbers) => {
						const result = product(numbers)

						if (numbers.length === 0) {
							return result === 1
						}

						// Check for zero (annihilator)
						if (numbers.includes(0)) {
							return result === 0
						}

						// Manual calculation for verification
						let expected = 1
						for (const num of numbers) {
							expected *= num
						}

						// Check for special cases
						if (numbers.includes(Infinity)) {
							if (numbers.includes(0)) return result === 0
							const hasNegative = numbers.filter((n) =>
										n < 0 && n !== -Infinity
									).length % 2 === 1
							const hasNegInfinity = numbers.filter((n) =>
										n === -Infinity
									).length % 2 === 1
							if (hasNegative || hasNegInfinity) {
								return result === -Infinity ||
									Number.isNaN(result)
							}
							return result === Infinity || Number.isNaN(result)
						}
						if (numbers.includes(-Infinity)) {
							if (numbers.includes(0)) return result === 0
							const negativeCount = numbers.filter((n) => n < 0).length
							return negativeCount % 2 === 1
								? result === -Infinity
								: result === Infinity
						}

						// Use relative epsilon for floating point comparison
						if (expected === 0) {
							return result === 0
						}
						return approximately(
							result,
							expected,
							Math.abs(expected) * 1e-10 + 1e-10,
						)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step(
			"should return multiplicative identity (1) for empty array",
			() => {
				assertEquals(product([]), 1)
			},
		)

		await t.step("should return the value for single element array", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(value) => {
						return product([value]) === value
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should handle zero (annihilator property)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true }), {
						minLength: 1,
						maxLength: 20,
					}),
					(numbers) => {
						const withZero = [...numbers, 0]
						const result = product(withZero)
						// Special case: Infinity * 0 = NaN in JavaScript
						if (
							numbers.includes(Infinity) ||
							numbers.includes(-Infinity)
						) {
							return Number.isNaN(result)
						}
						return result === 0
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
					fc.array(fc.float({ noNaN: true, min: -10, max: 10 }), {
						minLength: 2,
						maxLength: 10,
					}),
					(numbers) => {
						const original = product(numbers)
						const shuffled = [...numbers].sort(() => Math.random() - 0.5)
						const reordered = product(shuffled)

						// Handle special cases
						if (Number.isNaN(original)) {
							return Number.isNaN(reordered)
						}
						if (!isFinite(original)) return original === reordered
						if (original === 0) return reordered === 0

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
					fc.array(fc.float({ noNaN: true, min: -5, max: 5 }), {
						minLength: 3,
						maxLength: 8,
					}),
					(numbers) => {
						if (numbers.length < 3) return true

						// Split array and multiply in groups
						const mid1 = Math.floor(numbers.length / 3)
						const mid2 = Math.floor(2 * numbers.length / 3)

						const group1 = product(numbers.slice(0, mid1))
						const group2 = product(numbers.slice(mid1, mid2))
						const group3 = product(numbers.slice(mid2))
						const groupedProduct = product([group1, group2, group3])

						const directProduct = product(numbers)

						// Handle special cases
						if (Number.isNaN(directProduct)) {
							return Number.isNaN(groupedProduct)
						}
						if (!isFinite(directProduct)) {
							return directProduct === groupedProduct
						}
						if (directProduct === 0) return groupedProduct === 0

						return approximately(
							groupedProduct,
							directProduct,
							Math.abs(directProduct) * 1e-10 + 1e-10,
						)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should have identity element (1)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.float({ noNaN: true, min: -100, max: 100 })),
					(numbers) => {
						const withOne = [...numbers, 1]
						const withoutOne = numbers

						const prodWithOne = product(withOne)
						const prodWithoutOne = product(withoutOne)

						if (Number.isNaN(prodWithoutOne)) {
							return Number.isNaN(prodWithOne)
						}

						if (!isFinite(prodWithoutOne)) {
							return prodWithOne === prodWithoutOne
						}

						return approximately(
							prodWithOne,
							prodWithoutOne,
							Math.abs(prodWithoutOne) * 1e-10 + 1e-10,
						)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should distribute with exponentiation", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.float({
							noNaN: true,
							min: Math.fround(0.1),
							max: 10,
						}),
						{
							minLength: 1,
							maxLength: 5,
						},
					),
					fc.integer({ min: -3, max: 3 }),
					(numbers, exponent) => {
						// product(numbers)^exponent === product(numbers.map(n => n^exponent))
						const leftSide = Math.pow(product(numbers), exponent)
						const rightSide = product(
							numbers.map((n) => Math.pow(n, exponent)),
						)

						if (Number.isNaN(leftSide) || Number.isNaN(rightSide)) {
							return Number.isNaN(leftSide) &&
								Number.isNaN(rightSide)
						}

						if (!isFinite(leftSide) || !isFinite(rightSide)) {
							// Both should be infinity with the same sign, or both should be 0
							if (leftSide === 0 || rightSide === 0) {
								return Math.abs(leftSide) ===
									Math.abs(rightSide)
							}
							return leftSide === rightSide
						}

						// Use more lenient epsilon for exponentiation due to accumulated error
						return approximately(
							leftSide,
							rightSide,
							Math.abs(leftSide) * 1e-7 + 1e-10,
						)
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("special values", async (t) => {
		await t.step("should handle positive numbers", () => {
			assertEquals(product([2, 3, 4]), 24)
			assertEquals(product([1, 2, 3, 4, 5]), 120)
			assertEquals(product([10, 10]), 100)
		})

		await t.step("should handle negative numbers", () => {
			assertEquals(product([-2, 3, 4]), -24)
			assertEquals(product([-2, -3, 4]), 24)
			assertEquals(product([-1, -1, -1]), -1)
			assertEquals(product([-2, -2, -2, -2]), 16)
		})

		await t.step("should handle decimal numbers", () => {
			assertEquals(product([0.5, 2, 4]), 4)
			assertEquals(
				approximately(product([0.1, 0.2, 0.3]), 0.006, 1e-10),
				true,
			)
			assertEquals(product([1.5, 2.5, 3.5]), 13.125)
		})

		await t.step("should handle mixed positive and negative", () => {
			assertEquals(product([2, -3, 4, -5]), 120)
			assertEquals(product([-1, 2, -3, 4]), 24)
		})

		await t.step("should handle ones (identity elements)", () => {
			assertEquals(product([1, 1, 1, 5]), 5)
			assertEquals(product([2, 1, 3, 1, 4]), 24)
		})

		await t.step("should handle zero (annihilator)", () => {
			assertEquals(product([1, 2, 0, 3, 4]), 0)
			assertEquals(product([0, 100, 200]), 0)
			assertEquals(product([0]), 0)
		})

		await t.step("should handle large numbers", () => {
			assertEquals(product([100, 200, 300]), 6000000)
			assertEquals(product([1000, 1000]), 1000000)
		})

		await t.step("should handle small numbers", () => {
			assertEquals(product([0.001, 0.001, 0.001]), 1e-9)
			assertEquals(product([0.01, 0.1, 10, 100]), 1)
		})

		await t.step("should handle special floating point values", () => {
			assertEquals(product([Infinity, 2]), Infinity)
			assertEquals(product([-Infinity, 2]), -Infinity)
			assertEquals(product([-Infinity, -2]), Infinity)
			assertEquals(Number.isNaN(product([Infinity, 0])), true)
			assertEquals(Number.isNaN(product([1, 2, NaN])), true)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for null", () => {
			assertEquals(Number.isNaN(product(null as any)), true)
		})

		await t.step("should return NaN for undefined", () => {
			assertEquals(Number.isNaN(product(undefined as any)), true)
		})

		await t.step("should return NaN for non-array inputs", () => {
			assertEquals(Number.isNaN(product("not an array" as any)), true)
			assertEquals(Number.isNaN(product(123 as any)), true)
			assertEquals(Number.isNaN(product({} as any)), true)
			assertEquals(Number.isNaN(product(true as any)), true)
		})

		await t.step(
			"should return NaN for arrays with non-numeric values",
			() => {
				assertEquals(Number.isNaN(product([1, "2", 3] as any)), true)
				assertEquals(Number.isNaN(product([1, null, 3] as any)), true)
				assertEquals(
					Number.isNaN(product([1, undefined, 3] as any)),
					true,
				)
				assertEquals(Number.isNaN(product([1, {}, 3] as any)), true)
				assertEquals(Number.isNaN(product([1, [], 3] as any)), true)
			},
		)

		await t.step("should return NaN for arrays containing NaN", () => {
			assertEquals(Number.isNaN(product([1, 2, NaN, 3, 4])), true)
			assertEquals(Number.isNaN(product([NaN, NaN, NaN])), true)
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("basic multiplication", () => {
			assertEquals(product([2, 3, 4]), 24)
			assertEquals(product([1, 2, 3, 4, 5]), 120)
			assertEquals(product([10, 10]), 100)
		})

		await t.step("single element", () => {
			assertEquals(product([7]), 7)
			assertEquals(product([0]), 0)
			assertEquals(product([-5]), -5)
		})

		await t.step("empty array", () => {
			assertEquals(product([]), 1)
		})

		await t.step("with zero", () => {
			assertEquals(product([1, 2, 0, 3, 4]), 0)
			assertEquals(product([0, 100, 200]), 0)
		})

		await t.step("negative numbers", () => {
			assertEquals(product([-2, 3, 4]), -24)
			assertEquals(product([-2, -3, 4]), 24)
			assertEquals(product([-1, -1, -1]), -1)
			assertEquals(product([-2, -2, -2, -2]), 16)
		})

		await t.step("decimal numbers", () => {
			assertEquals(product([0.5, 2, 4]), 4)
			assertEquals(
				approximately(product([0.1, 0.2, 0.3]), 0.006, 1e-10),
				true,
			)
			assertEquals(product([1.5, 2.5, 3.5]), 13.125)
		})

		await t.step("mixed positive and negative", () => {
			assertEquals(product([2, -3, 4, -5]), 120)
			assertEquals(product([-1, 2, -3, 4]), 24)
		})

		await t.step("with ones", () => {
			assertEquals(product([1, 1, 1, 5]), 5)
			assertEquals(product([2, 1, 3, 1, 4]), 24)
		})

		await t.step("large numbers", () => {
			assertEquals(product([100, 200, 300]), 6000000)
			assertEquals(product([1000, 1000]), 1000000)
		})

		await t.step("small numbers", () => {
			assertEquals(product([0.001, 0.001, 0.001]), 1e-9)
			assertEquals(product([0.01, 0.1, 10, 100]), 1)
		})

		await t.step("special values", () => {
			assertEquals(product([Infinity, 2]), Infinity)
			assertEquals(product([-Infinity, 2]), -Infinity)
			assertEquals(product([-Infinity, -2]), Infinity)
			assertEquals(Number.isNaN(product([Infinity, 0])), true)
			assertEquals(Number.isNaN(product([1, 2, NaN])), true)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(product(null as any)), true)
			assertEquals(Number.isNaN(product(undefined as any)), true)
			assertEquals(Number.isNaN(product("not an array" as any)), true)
		})

		await t.step("factorial calculation", () => {
			const factorial = (n: number): number => {
				const nums = Array.from({ length: n }, (_, i) => i + 1)
				return product(nums)
			}
			assertEquals(factorial(5), 120)
			assertEquals(factorial(0), 1)
			assertEquals(factorial(1), 1)
		})

		await t.step("probability calculations", () => {
			const probabilities = [0.5, 0.8, 0.9]
			const combinedProbability = product(probabilities)
			assertEquals(approximately(combinedProbability, 0.36, 1e-10), true)
		})

		await t.step("compound growth factors", () => {
			const growthRates = [1.05, 1.08, 1.03, 1.07]
			const totalGrowth = product(growthRates)
			assertEquals(approximately(totalGrowth, 1.2497814, 1e-6), true)
		})

		await t.step("volume calculation", () => {
			const dimensions = [10, 20, 30]
			const volume = product(dimensions)
			assertEquals(volume, 6000)
		})

		await t.step("matrix determinant helper", () => {
			const det2x2 = (a: number, b: number, c: number, d: number) =>
				product([a, d]) - product([b, c])
			assertEquals(det2x2(1, 2, 3, 4), -2)
		})

		await t.step("powers of a number", () => {
			const powersOf2 = [2, 2, 2, 2, 2]
			assertEquals(product(powersOf2), 32)
		})

		await t.step("scale factors", () => {
			const scales = [2, 0.5, 4, 0.25]
			const totalScale = product(scales)
			assertEquals(totalScale, 1)
		})

		await t.step("currency conversion chain", () => {
			const conversionRates = [1.18, 0.85, 1.32]
			const finalRate = product(conversionRates)
			assertEquals(approximately(finalRate, 1.32396, 1e-5), true)
		})

		await t.step("discount factors", () => {
			const discounts = [0.9, 0.8, 0.95]
			const finalPriceRatio = product(discounts)
			assertEquals(finalPriceRatio, 0.684)
		})

		await t.step("gear ratios", () => {
			const gearRatios = [3, 2, 4]
			const totalRatio = product(gearRatios)
			assertEquals(totalRatio, 24)
		})

		await t.step("combinatorial calculations", () => {
			const choices = [3, 4, 2]
			const totalCombinations = product(choices)
			assertEquals(totalCombinations, 24)
		})

		await t.step("scientific notation mantissas", () => {
			const mantissas = [3.0, 2.0, 5.0]
			const combinedMantissa = product(mantissas)
			assertEquals(combinedMantissa, 30)
		})

		await t.step("risk factors", () => {
			const survivalRates = [0.99, 0.98, 0.97, 0.96]
			const overallSurvival = product(survivalRates)
			assertEquals(approximately(overallSurvival, 0.90345024, 1e-7), true)
		})

		await t.step("aspect ratio chain", () => {
			const aspectRatios = [16 / 9, 3 / 4, 4 / 3]
			const finalAspect = product(aspectRatios)
			assertEquals(
				approximately(finalAspect, 1.7777777777777777, 1e-10),
				true,
			)
		})

		await t.step("quality degradation", () => {
			const qualityFactors = [0.95, 0.98, 0.97, 0.99]
			const finalQuality = product(qualityFactors)
			assertEquals(approximately(finalQuality, 0.8940393, 1e-6), true)
		})

		await t.step("pipeline with validation", () => {
			const numbers = [2, 3, 4]
			const doubled = numbers.map((n) => n * 2)
			const result = product(doubled)
			assertEquals(result, 192)
		})

		await t.step("safe product with validation", () => {
			const safeProduct = (values: unknown): number | null => {
				if (!Array.isArray(values)) return null
				const result = product(values)
				return isNaN(result) ? null : result
			}
			assertEquals(safeProduct([1, 2, 3]), 6)
			assertEquals(safeProduct("invalid"), null)
			assertEquals(safeProduct([1, "2", 3]), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify the original array", () => {
			const original = [1, 2, 3, 4, 5]
			const copy = [...original]
			product(original)
			assertEquals(original, copy)
		})
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should handle moderately large arrays", () => {
			const array = Array.from({ length: 100 }, () => 1.01)
			const result = product(array)
			// (1.01)^100 ≈ 2.7048
			assertEquals(
				approximately(result, Math.pow(1.01, 100), 1e-10),
				true,
			)
		})

		await t.step("should be consistent for repeated calls", () => {
			const data = [2, 3, 4]
			const result1 = product(data)
			const result2 = product(data)
			const result3 = product(data)

			assertEquals(result1, 24)
			assertEquals(result2, 24)
			assertEquals(result3, 24)
		})

		await t.step("should handle edge case of many small numbers", () => {
			const small = Array(10).fill(0.1)
			const result = product(small)
			assertEquals(approximately(result, 1e-10, 1e-15), true)
		})
	})
})
