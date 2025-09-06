import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import geometricMean from "../../../../src/simple/math/geometricMean/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

// Test JSDoc examples
Deno.test("geometricMean - JSDoc examples", async (t) => {
	await t.step("Basic geometric mean - sqrt(2 × 8)", () => {
		const result = geometricMean([2, 8])
		assertEquals(result, 4)
	})

	await t.step("Cube root example", () => {
		const result = geometricMean([1, 3, 9])
		assertEquals(result, 3)
	})

	await t.step("Three values example", () => {
		const result = geometricMean([4, 16, 64])
		assertAlmostEquals(result, 16, 1e-10)
	})

	await t.step("Equal values", () => {
		const result = geometricMean([5, 5, 5, 5])
		assertEquals(result, 5)
	})

	await t.step("Single value", () => {
		const result = geometricMean([10])
		assertAlmostEquals(result, 10, 1e-10)
	})

	await t.step("Small numbers", () => {
		const result = geometricMean([0.1, 0.2, 0.4])
		assertAlmostEquals(result, 0.2, 1e-10)
	})

	await t.step("Large product handled correctly", () => {
		const result = geometricMean([100, 200, 300])
		assertAlmostEquals(result, 181.71205928321397, 1e-10)
	})

	await t.step("Zero not allowed", () => {
		const result = geometricMean([1, 0, 3])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Negative values not allowed", () => {
		const result = geometricMean([1, -2, 3])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Empty array returns NaN", () => {
		const result = geometricMean([])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Invalid inputs return NaN - null", () => {
		const result = geometricMean(null)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Invalid inputs return NaN - mixed types", () => {
		const result = geometricMean([1, "2", 3] as any)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Average growth rate", () => {
		const growthFactors = [1.10, 1.20, 0.95]
		const avgGrowth = geometricMean(growthFactors)
		assertAlmostEquals(avgGrowth, 1.078365153390936, 1e-10)
	})

	await t.step("Investment returns", () => {
		const returns = [1.50, 0.80, 1.30]
		const result = geometricMean(returns)
		assertAlmostEquals(result, 1.1597779995297994, 1e-10)
	})

	await t.step("Aspect ratio averaging", () => {
		const aspectRatios = [16 / 9, 4 / 3, 21 / 9]
		const result = geometricMean(aspectRatios)
		assertAlmostEquals(result, 1.768469870176174, 1e-10)
	})

	await t.step("Population growth", () => {
		const populationMultipliers = [1.02, 1.025, 1.018, 1.022]
		const avgGrowthRate = geometricMean(populationMultipliers)
		assertAlmostEquals(avgGrowthRate, 1.0212467271614791, 1e-10)
	})
})

// Edge cases
Deno.test("geometricMean - edge cases", async (t) => {
	await t.step("Undefined input", () => {
		const result = geometricMean(undefined)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Non-array input", () => {
		const result = geometricMean("not an array" as any)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with NaN", () => {
		const result = geometricMean([1, 2, NaN, 4])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with Infinity", () => {
		const result = geometricMean([1, 2, Infinity])
		assertEquals(result, Infinity)
	})

	await t.step("Array with zero", () => {
		const result = geometricMean([1, 2, 0, 4])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with negative values", () => {
		const result = geometricMean([1, -2, 3])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Very small positive numbers", () => {
		const result = geometricMean([1e-100, 1e-100, 1e-100])
		assertAlmostEquals(result, 1e-100, 1e-110)
	})

	await t.step("Very large numbers", () => {
		const result = geometricMean([1e100, 1e100, 1e100])
		assertAlmostEquals(result, 1e100, 1e90)
	})

	await t.step("Mix of small and large numbers", () => {
		const result = geometricMean([1e-50, 1e50])
		assertEquals(result, 1)
	})

	await t.step("Powers of 2", () => {
		const result = geometricMean([2, 4, 8, 16])
		assertAlmostEquals(result, 5.65685424949238, 1e-10)
	})
})

// Property-based tests
Deno.test("geometricMean - always positive for positive inputs", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(0.001),
					max: Math.fround(1000),
				}),
				{ minLength: 1, maxLength: 100 },
			),
			(values) => {
				const result = geometricMean(values)
				return result > 0 && !Number.isNaN(result)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("geometricMean - equals value for single element", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(0.001),
				max: Math.fround(1000),
			}),
			(value) => {
				const result = geometricMean([value])
				return approximately(result, value, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("geometricMean - equals value for identical elements", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(0.001),
				max: Math.fround(1000),
			}),
			fc.integer({ min: 1, max: 100 }),
			(value, count) => {
				const values = Array(count).fill(value)
				const result = geometricMean(values)
				return approximately(result, value, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("geometricMean - AM-GM inequality", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(0.001),
					max: Math.fround(100),
				}),
				{ minLength: 1, maxLength: 50 },
			),
			(values) => {
				const gm = geometricMean(values)
				const am = values.reduce((a, b) => a + b, 0) / values.length
				// Geometric mean should be less than or equal to arithmetic mean
				// with equality only when all values are the same
				return gm <= am + 1e-10
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("geometricMean - multiplicative property", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(0.1),
					max: Math.fround(10),
				}),
				{ minLength: 1, maxLength: 20 },
			),
			fc.float({
				noNaN: true,
				min: Math.fround(0.1),
				max: Math.fround(10),
			}),
			(values, scale) => {
				const originalGM = geometricMean(values)
				const scaledValues = values.map((v) => v * scale)
				const scaledGM = geometricMean(scaledValues)
				// Geometric mean scales linearly with the scaling factor
				const expectedGM = originalGM * scale
				return approximately(scaledGM, expectedGM, 1e-6)
			},
		),
		{ numRuns: 500 },
	)
})

Deno.test("geometricMean - product property", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(0.1),
					max: Math.fround(10),
				}),
				{ minLength: 2, maxLength: 10 },
			),
			(values) => {
				const gm = geometricMean(values)
				const n = values.length
				// GM^n should equal the product of all values
				const gmPower = Math.pow(gm, n)
				const product = values.reduce((a, b) => a * b, 1)
				return approximately(gmPower, product, 1e-6)
			},
		),
		{ numRuns: 500 },
	)
})

// Behavioral tests
Deno.test("geometricMean - handles logarithm overflow prevention", () => {
	// Test that the implementation uses logarithms to prevent overflow
	const largeValues = [1e50, 1e50, 1e50, 1e50]
	const result = geometricMean(largeValues)
	assertAlmostEquals(result, 1e50, 1e40)
})

Deno.test("geometricMean - precision for reciprocal pairs", () => {
	// Geometric mean of a number and its reciprocal should be 1
	const pairs = [
		[2, 0.5],
		[10, 0.1],
		[100, 0.01],
		[0.25, 4],
	]

	for (const pair of pairs) {
		const result = geometricMean(pair)
		assertAlmostEquals(result, 1, 1e-10)
	}
})

Deno.test("geometricMean - growth rate calculation", () => {
	// Test realistic growth rate scenario
	// Starting value: 100
	// Year 1: +10% → 110
	// Year 2: +20% → 132
	// Year 3: -5% → 125.4
	// Average growth factor
	const growthFactors = [1.10, 1.20, 0.95]
	const gm = geometricMean(growthFactors)

	// Verify compound growth
	const startValue = 100
	const endValue = startValue * 1.10 * 1.20 * 0.95
	const avgGrowthRate = Math.pow(endValue / startValue, 1 / 3)

	assertAlmostEquals(gm, avgGrowthRate, 1e-10)
})

Deno.test("geometricMean - relationship with harmonic mean", () => {
	// For two positive numbers, GM^2 = AM × HM
	const values = [4, 16]
	const gm = geometricMean(values)
	const am = (values[0] + values[1]) / 2
	const hm = 2 / (1 / values[0] + 1 / values[1])

	assertAlmostEquals(gm * gm, am * hm, 1e-10)
	assertAlmostEquals(gm, 8, 1e-10)
})
