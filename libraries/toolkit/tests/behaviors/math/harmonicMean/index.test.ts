import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import harmonicMean from "../../../../src/simple/math/harmonicMean/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

// Test JSDoc examples
Deno.test("harmonicMean - JSDoc examples", async (t) => {
	await t.step("Basic harmonic mean", () => {
		const result = harmonicMean([1, 2, 3])
		assertAlmostEquals(result, 1.6363636363636365, 1e-10)
	})

	await t.step("Example with 2, 4, 8", () => {
		const result = harmonicMean([2, 4, 8])
		assertAlmostEquals(result, 3.4285714285714284, 1e-10)
	})

	await t.step("Equal values", () => {
		const result = harmonicMean([5, 5, 5, 5])
		assertEquals(result, 5)
	})

	await t.step("Two values - speed example", () => {
		const result = harmonicMean([40, 60])
		assertAlmostEquals(result, 48, 1e-10)
	})

	await t.step("Single value", () => {
		const result = harmonicMean([10])
		assertEquals(result, 10)
	})

	await t.step("Small numbers", () => {
		const result = harmonicMean([0.1, 0.2, 0.3])
		assertAlmostEquals(result, 0.16363636363636364, 1e-10)
	})

	await t.step("Zero causes division by zero", () => {
		const result = harmonicMean([1, 0, 3])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Negative values not allowed", () => {
		const result = harmonicMean([1, -2, 3])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Empty array returns NaN", () => {
		const result = harmonicMean([])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Invalid inputs return NaN - null", () => {
		const result = harmonicMean(null)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Invalid inputs return NaN - mixed types", () => {
		const result = harmonicMean([1, "2", 3] as any)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Average speed for round trip", () => {
		const speeds = [60, 40]
		const result = harmonicMean(speeds)
		assertAlmostEquals(result, 48, 1e-10)
	})

	await t.step("Average rate of work", () => {
		const rates = [1 / 3, 1 / 6]
		const avgRate = harmonicMean(rates)
		assertAlmostEquals(avgRate, 0.2222222222222222, 1e-10)
	})

	await t.step("P/E ratio averaging", () => {
		const peRatios = [15, 20, 25]
		const result = harmonicMean(peRatios)
		assertAlmostEquals(result, 19.148936170212764, 1e-10)
	})

	await t.step("Resistance in parallel circuits", () => {
		const resistances = [10, 20, 30]
		const hm = harmonicMean(resistances)
		// Note: The JSDoc example shows a complex formula but we just test the harmonic mean
		assertAlmostEquals(hm, 16.363636363636363, 1e-10)
	})
})

// Edge cases
Deno.test("harmonicMean - edge cases", async (t) => {
	await t.step("Undefined input", () => {
		const result = harmonicMean(undefined)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Non-array input", () => {
		const result = harmonicMean("not an array" as any)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with NaN", () => {
		const result = harmonicMean([1, 2, NaN, 4])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with Infinity", () => {
		const result = harmonicMean([1, 2, Infinity])
		// When one value is Infinity, 1/Infinity = 0, so the harmonic mean is non-zero
		assertAlmostEquals(result, 2, 1e-10)
	})

	await t.step("Array with very small positive number", () => {
		const result = harmonicMean([1, Number.MIN_VALUE])
		assertAlmostEquals(result, Number.MIN_VALUE * 2, 1e-323)
	})

	await t.step("Very small positive numbers", () => {
		const result = harmonicMean([1e-100, 1e-100, 1e-100])
		assertAlmostEquals(result, 1e-100, 1e-110)
	})

	await t.step("Very large numbers", () => {
		const result = harmonicMean([1e100, 1e100, 1e100])
		assertEquals(result, 1e100)
	})

	await t.step("Mix of small and large numbers", () => {
		const result = harmonicMean([1e-50, 1e50])
		assertAlmostEquals(result, 2e-50, 1e-60)
	})

	await t.step("Reciprocal pairs", () => {
		const result = harmonicMean([2, 0.5])
		assertEquals(result, 0.8)
	})

	await t.step("Powers of 2", () => {
		const result = harmonicMean([1, 2, 4, 8])
		assertAlmostEquals(result, 2.1333333333333333, 1e-10)
	})
})

// Property-based tests
Deno.test("harmonicMean - always positive for positive inputs", () => {
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
				const result = harmonicMean(values)
				return result > 0 && !Number.isNaN(result)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("harmonicMean - equals value for single element", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(0.001),
				max: Math.fround(1000),
			}),
			(value) => {
				const result = harmonicMean([value])
				return approximately(result, value, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("harmonicMean - equals value for identical elements", () => {
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
				const result = harmonicMean(values)
				return approximately(result, value, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("harmonicMean - HM <= GM <= AM inequality", () => {
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
				const hm = harmonicMean(values)
				const am = values.reduce((a, b) => a + b, 0) / values.length
				// Calculate geometric mean
				const sumOfLogs = values.reduce((sum, v) => sum + Math.log(v), 0)
				const gm = Math.exp(sumOfLogs / values.length)

				// Harmonic mean should be less than or equal to geometric mean
				// which should be less than or equal to arithmetic mean
				return hm <= gm + 1e-10 && gm <= am + 1e-10
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("harmonicMean - reciprocal property", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(10) }),
				{ minLength: 1, maxLength: 20 },
			),
			(values) => {
				const hm = harmonicMean(values)
				// Harmonic mean of reciprocals equals reciprocal of arithmetic mean
				const reciprocals = values.map((v) => 1 / v)
				const arithmeticMeanOfReciprocals =
					reciprocals.reduce((a, b) => a + b, 0) / reciprocals.length
				const expectedHM = 1 / arithmeticMeanOfReciprocals
				return approximately(hm, expectedHM, 1e-6)
			},
		),
		{ numRuns: 500 },
	)
})

Deno.test("harmonicMean - scaling property", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(10) }),
				{ minLength: 1, maxLength: 20 },
			),
			fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(10) }),
			(values, scale) => {
				const originalHM = harmonicMean(values)
				const scaledValues = values.map((v) => v * scale)
				const scaledHM = harmonicMean(scaledValues)
				// Harmonic mean scales linearly with the scaling factor
				const expectedHM = originalHM * scale
				return approximately(scaledHM, expectedHM, 1e-6)
			},
		),
		{ numRuns: 500 },
	)
})

// Behavioral tests
Deno.test("harmonicMean - speed averaging scenario", () => {
	// Classic example: traveling same distance at different speeds
	// Half the journey at 30 mph, half at 60 mph
	// Average speed is not (30+60)/2 = 45
	// It's the harmonic mean: 2/(1/30 + 1/60) = 40
	const speeds = [30, 60]
	const avgSpeed = harmonicMean(speeds)
	assertEquals(avgSpeed, 40)
})

Deno.test("harmonicMean - rate averaging", () => {
	// If one machine processes at 2 items/hour and another at 3 items/hour
	// The average rate when working together
	const rates = [2, 3]
	const hm = harmonicMean(rates)
	assertAlmostEquals(hm, 2.4, 1e-10)
})

Deno.test("harmonicMean - dominated by smallest value", () => {
	// Harmonic mean is heavily influenced by small values
	const values1 = [1, 100]
	const values2 = [1, 1000]
	const values3 = [1, 10000]

	const hm1 = harmonicMean(values1)
	const hm2 = harmonicMean(values2)
	const hm3 = harmonicMean(values3)

	// Despite large differences in the second value,
	// harmonic means are all close to 2
	assertAlmostEquals(hm1, 1.9801980198019802, 1e-10)
	assertAlmostEquals(hm2, 1.998001998001998, 1e-10)
	assertAlmostEquals(hm3, 1.9998000199980003, 1e-10)
})

Deno.test("harmonicMean - relationship with other means", () => {
	// For two positive numbers a and b:
	// HM × AM = GM²
	const values = [4, 16]
	const hm = harmonicMean(values)
	const am = (values[0] + values[1]) / 2
	const gm = Math.sqrt(values[0] * values[1])

	assertAlmostEquals(hm * am, gm * gm, 1e-10)
	assertAlmostEquals(hm, 6.4, 1e-10)
})

Deno.test("harmonicMean - parallel resistance calculation", () => {
	// For resistors in parallel, total resistance uses harmonic mean
	// R_total = 1 / (1/R1 + 1/R2 + ... + 1/Rn)
	// Which is HM(R1, R2, ..., Rn) / n
	const resistances = [6, 12, 18]
	const hm = harmonicMean(resistances)
	const n = resistances.length
	const totalResistance = hm / n

	// Verify with direct calculation
	const directCalc = 1 / (1 / 6 + 1 / 12 + 1 / 18)
	assertAlmostEquals(totalResistance, directCalc, 1e-10)
})
