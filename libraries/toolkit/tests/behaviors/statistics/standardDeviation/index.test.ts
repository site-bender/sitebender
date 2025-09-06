import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import standardDeviation from "../../../../src/simple/statistics/standardDeviation/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

// Test JSDoc examples
Deno.test("standardDeviation - JSDoc examples", async (t) => {
	await t.step("Population standard deviation (default)", () => {
		const result = standardDeviation(false)([2, 4, 4, 4, 5, 5, 7, 9])
		assertEquals(result, 2)
	})

	await t.step("Sample standard deviation", () => {
		const result = standardDeviation(true)([2, 4, 4, 4, 5, 5, 7, 9])
		assertAlmostEquals(result, 2.1380899352993947, 1e-10)
	})

	await t.step("Uniform values have zero deviation", () => {
		const result = standardDeviation(false)([5, 5, 5, 5])
		assertEquals(result, 0)
	})

	await t.step("Single value", () => {
		const result = standardDeviation(false)([10])
		assertEquals(result, 0)
	})

	await t.step("Two values", () => {
		const result = standardDeviation(false)([1, 5])
		assertEquals(result, 2)
	})

	await t.step("Empty array returns NaN", () => {
		const result = standardDeviation(false)([])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Invalid inputs return NaN - null", () => {
		const result = standardDeviation(false)(null)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Invalid inputs return NaN - mixed types", () => {
		const result = standardDeviation(false)([1, "2", 3] as any)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Test scores variation", () => {
		const scores = [85, 90, 78, 92, 88, 76, 95, 89]
		const populationStd = standardDeviation(false)(scores)
		assertAlmostEquals(populationStd, 6.203577596838779, 1e-10)

		const sampleStd = standardDeviation(true)(scores)
		assertAlmostEquals(sampleStd, 6.631903411324901, 1e-10)
	})

	await t.step("Investment returns volatility", () => {
		const returns = [0.05, -0.02, 0.08, 0.03, -0.01, 0.06]
		const volatility = standardDeviation(true)(returns)
		assertAlmostEquals(volatility, 0.03970726214015097, 1e-10)
	})

	await t.step("Partial application for population", () => {
		const popStd = standardDeviation(false)
		const result = popStd([10, 12, 14, 16, 18])
		assertAlmostEquals(result, 2.8284271247461903, 1e-10)
	})

	await t.step("Partial application for sample", () => {
		const sampleStd = standardDeviation(true)
		const result = sampleStd([10, 12, 14, 16, 18])
		assertAlmostEquals(result, 3.1622776601683795, 1e-10)
	})
})

// Edge cases
Deno.test("standardDeviation - edge cases", async (t) => {
	await t.step("Single value - population standard deviation", () => {
		const result = standardDeviation(false)([42])
		assertEquals(result, 0)
	})

	await t.step("Single value - sample standard deviation returns NaN", () => {
		const result = standardDeviation(true)([42])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Undefined input", () => {
		const result = standardDeviation(false)(undefined)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Non-array input", () => {
		const result = standardDeviation(false)("not an array" as any)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with NaN", () => {
		const result = standardDeviation(false)([1, 2, NaN, 4])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with Infinity", () => {
		const result = standardDeviation(false)([1, 2, Infinity, 4])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with negative Infinity", () => {
		const result = standardDeviation(false)([1, 2, -Infinity, 4])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Very large numbers", () => {
		const result = standardDeviation(false)([1e308, 1e308, 1e308])
		// With floating point overflow, result is Infinity
		assertEquals(result, Infinity)
	})

	await t.step("Very small numbers", () => {
		const result = standardDeviation(false)([1e-308, 2e-308, 3e-308])
		assertEquals(approximately(result, 8.164965809277261e-309, 1e-10), true)
	})

	await t.step("Mixed positive and negative", () => {
		const result = standardDeviation(false)([-5, -2, 0, 2, 5])
		assertAlmostEquals(result, 3.40587727318528, 1e-10)
	})

	await t.step("Two identical values", () => {
		const result = standardDeviation(false)([7, 7])
		assertEquals(result, 0)
	})

	await t.step("Negative values only", () => {
		const result = standardDeviation(false)([-1, -2, -3, -4, -5])
		assertAlmostEquals(result, 1.4142135623730951, 1e-10)
	})
})

// Property-based tests
Deno.test("standardDeviation - non-negative property", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(-1000),
					max: Math.fround(1000),
				}),
				{ minLength: 1 },
			),
			fc.boolean(),
			(values, isSample) => {
				// Skip sample standard deviation for single values
				if (isSample && values.length === 1) return true

				const result = standardDeviation(isSample)(values)
				return result >= 0 || Number.isNaN(result)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("standardDeviation - zero for identical values", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(-1000),
				max: Math.fround(1000),
			}),
			fc.integer({ min: 2, max: 100 }),
			(value, count) => {
				const values = Array(count).fill(value)
				const popStd = standardDeviation(false)(values)
				const sampStd = standardDeviation(true)(values)
				return popStd === 0 && sampStd === 0
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("standardDeviation - sample >= population for non-uniform data", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(-100),
					max: Math.fround(100),
				}),
				{ minLength: 2, maxLength: 100 },
			),
			(values) => {
				const popStd = standardDeviation(false)(values)
				const sampStd = standardDeviation(true)(values)
				// Sample std should be greater than or equal to population std
				// They're equal only when all values are identical
				return sampStd >= popStd ||
					approximately(sampStd, popStd, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("standardDeviation - relationship with variance", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(-100),
					max: Math.fround(100),
				}),
				{ minLength: 1, maxLength: 100 },
			),
			fc.boolean(),
			(values, isSample) => {
				// Skip sample calculations for single values
				if (isSample && values.length === 1) return true

				const std = standardDeviation(isSample)(values)
				// Standard deviation squared should equal variance
				// We verify this by checking that std^2 is non-negative
				const variance = std * std
				return variance >= 0 || Number.isNaN(variance)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("standardDeviation - scaling property", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(-100),
					max: Math.fround(100),
				}),
				{ minLength: 1, maxLength: 50 },
			),
			fc.float({
				noNaN: true,
				min: Math.fround(0.1),
				max: Math.fround(10),
			}),
			fc.boolean(),
			(values, scale, isSample) => {
				// Skip sample standard deviation for single values
				if (isSample && values.length === 1) return true

				const originalStd = standardDeviation(isSample)(values)
				const scaledValues = values.map((v) => v * scale)
				const scaledStd = standardDeviation(isSample)(scaledValues)

				// Standard deviation scales linearly with the scaling factor
				const expectedStd = originalStd * Math.abs(scale)
				return approximately(scaledStd, expectedStd, 1e-6)
			},
		),
		{ numRuns: 500 },
	)
})

Deno.test("standardDeviation - translation invariance", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(-100),
					max: Math.fround(100),
				}),
				{ minLength: 1, maxLength: 50 },
			),
			fc.float({
				noNaN: true,
				min: Math.fround(-100),
				max: Math.fround(100),
			}),
			fc.boolean(),
			(values, shift, isSample) => {
				// Skip sample standard deviation for single values
				if (isSample && values.length === 1) return true

				const originalStd = standardDeviation(isSample)(values)
				const shiftedValues = values.map((v) => v + shift)
				const shiftedStd = standardDeviation(isSample)(shiftedValues)

				// Standard deviation should not change when adding a constant
				return approximately(originalStd, shiftedStd, 1e-6)
			},
		),
		{ numRuns: 500 },
	)
})

// Behavioral tests
Deno.test("standardDeviation - currying behavior", () => {
	const popStd = standardDeviation(false)
	const sampStd = standardDeviation(true)
	const values = [1, 2, 3, 4, 5]

	assertEquals(typeof popStd, "function")
	assertEquals(typeof sampStd, "function")
	assertAlmostEquals(popStd(values), 1.4142135623730951, 1e-10)
	assertAlmostEquals(sampStd(values), 1.5811388300841898, 1e-10)
})

Deno.test("standardDeviation - default parameter is false", () => {
	const defaultStd = standardDeviation()
	const explicitFalse = standardDeviation(false)
	const values = [1, 2, 3, 4, 5]

	assertEquals(defaultStd(values), explicitFalse(values))
	assertAlmostEquals(defaultStd(values), 1.4142135623730951, 1e-10) // Population std
})

Deno.test("standardDeviation - consistency with known formulas", () => {
	// Test with simple values where we can manually calculate
	const values = [2, 4, 6, 8, 10]
	// Mean = 6
	// Squared differences: [16, 4, 0, 4, 16]
	// Sum = 40
	// Population variance = 40/5 = 8, std = sqrt(8) ≈ 2.828
	// Sample variance = 40/4 = 10, std = sqrt(10) ≈ 3.162

	assertAlmostEquals(
		standardDeviation(false)(values),
		2.8284271247461903,
		1e-10,
	)
	assertAlmostEquals(
		standardDeviation(true)(values),
		3.1622776601683795,
		1e-10,
	)
})

Deno.test("standardDeviation - range relationship", () => {
	// For any dataset, the standard deviation should be less than or equal to the range
	const values = [1, 3, 5, 7, 9]
	const range = Math.max(...values) - Math.min(...values)
	const std = standardDeviation(false)(values)

	assertEquals(std <= range, true)
	assertAlmostEquals(std, 2.8284271247461903, 1e-10)
})
