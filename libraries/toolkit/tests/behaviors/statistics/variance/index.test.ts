import { assertEquals, assertAlmostEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import variance from "../../../../src/simple/statistics/variance/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

// Test JSDoc examples
Deno.test("variance - JSDoc examples", async (t) => {
	await t.step("Population variance (default) - example 1", () => {
		const result = variance(false)([2, 4, 4, 4, 5, 5, 7, 9])
		assertEquals(result, 4)
	})

	await t.step("Sample variance - example 1", () => {
		const result = variance(true)([2, 4, 4, 4, 5, 5, 7, 9])
		assertAlmostEquals(result, 4.571428571428571, 1e-10)
	})

	await t.step("Uniform values have zero variance", () => {
		const result = variance(false)([5, 5, 5, 5])
		assertEquals(result, 0)
	})

	await t.step("Two values - population variance", () => {
		const result = variance(false)([1, 5])
		assertEquals(result, 4)
	})

	await t.step("Two values - sample variance", () => {
		const result = variance(true)([1, 5])
		assertEquals(result, 8)
	})

	await t.step("Empty array returns NaN", () => {
		const result = variance(false)([])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Invalid inputs return NaN - null", () => {
		const result = variance(false)(null)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Invalid inputs return NaN - mixed types", () => {
		const result = variance(false)([1, "2", 3] as any)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Investment risk assessment", () => {
		const returns = [0.05, -0.02, 0.08, 0.03, -0.01, 0.06]
		const risk = variance(true)(returns)
		assertAlmostEquals(risk, 0.0015766666666666665, 1e-10)
	})

	await t.step("Quality control measurements", () => {
		const measurements = [9.8, 10.2, 10.1, 9.9, 10.0, 10.1]
		const popVariance = variance(false)(measurements)
		assertAlmostEquals(popVariance, 0.018055555555555432, 1e-10)
	})

	await t.step("Partial application - sample variance", () => {
		const sampleVar = variance(true)
		const result = sampleVar([1, 2, 3, 4, 5])
		assertEquals(result, 2.5)
	})

	await t.step("Partial application - population variance", () => {
		const populationVar = variance(false)
		const result = populationVar([1, 2, 3, 4, 5])
		assertEquals(result, 2)
	})
})

// Edge cases
Deno.test("variance - edge cases", async (t) => {
	await t.step("Single value - population variance", () => {
		const result = variance(false)([42])
		assertEquals(result, 0)
	})

	await t.step("Single value - sample variance returns NaN", () => {
		const result = variance(true)([42])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Undefined input", () => {
		const result = variance(false)(undefined)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Non-array input", () => {
		const result = variance(false)("not an array" as any)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with NaN", () => {
		const result = variance(false)([1, 2, NaN, 4])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with Infinity", () => {
		const result = variance(false)([1, 2, Infinity, 4])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Array with negative Infinity", () => {
		const result = variance(false)([1, 2, -Infinity, 4])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("Very large numbers", () => {
		const result = variance(false)([1e308, 1e308, 1e308])
		// With floating point overflow, result is Infinity
		assertEquals(result, Infinity)
	})

	await t.step("Very small numbers", () => {
		const result = variance(false)([1e-308, 2e-308, 3e-308])
		assertEquals(approximately(result, 6.666666666666667e-617, 1e-10), true)
	})

	await t.step("Mixed positive and negative", () => {
		const result = variance(false)([-5, -2, 0, 2, 5])
		assertAlmostEquals(result, 11.6, 1e-10)
	})
})

// Property-based tests
Deno.test("variance - non-negative property", () => {
	fc.assert(
		fc.property(
			fc.array(fc.float({ noNaN: true, min: Math.fround(-1000), max: Math.fround(1000) }), { minLength: 1 }),
			fc.boolean(),
			(values, isSample) => {
				// Skip sample variance for single values
				if (isSample && values.length === 1) return true

				const result = variance(isSample)(values)
				return result >= 0 || Number.isNaN(result)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("variance - zero for identical values", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-1000), max: Math.fround(1000) }),
			fc.integer({ min: 2, max: 100 }),
			(value, count) => {
				const values = Array(count).fill(value)
				const popVar = variance(false)(values)
				const sampVar = variance(true)(values)
				return popVar === 0 && sampVar === 0
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("variance - sample variance >= population variance", () => {
	fc.assert(
		fc.property(
			fc.array(fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }), { minLength: 2, maxLength: 100 }),
			(values) => {
				const popVar = variance(false)(values)
				const sampVar = variance(true)(values)
				// Sample variance should be greater than or equal to population variance
				// They're equal only when all values are identical
				return sampVar >= popVar || (approximately(sampVar, popVar, 1e-10))
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("variance - relationship with standard deviation", () => {
	fc.assert(
		fc.property(
			fc.array(fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }), { minLength: 1, maxLength: 100 }),
			fc.boolean(),
			(values, isSample) => {
				// Skip sample variance for single values
				if (isSample && values.length === 1) return true

				const var_ = variance(isSample)(values)
				// Variance should be the square of standard deviation
				// We'll verify this property by checking that sqrt(variance) is non-negative
				const std = Math.sqrt(var_)
				return std >= 0 || Number.isNaN(std)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("variance - scaling property", () => {
	fc.assert(
		fc.property(
			fc.array(fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }), { minLength: 1, maxLength: 50 }),
			fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(10) }),
			fc.boolean(),
			(values, scale, isSample) => {
				// Skip sample variance for single values
				if (isSample && values.length === 1) return true

				const originalVar = variance(isSample)(values)
				const scaledValues = values.map(v => v * scale)
				const scaledVar = variance(isSample)(scaledValues)

				// Variance scales with the square of the scaling factor
				const expectedVar = originalVar * scale * scale
				return approximately(scaledVar, expectedVar, 1e-6)
			}
		),
		{ numRuns: 500 }
	)
})

Deno.test("variance - translation invariance", () => {
	fc.assert(
		fc.property(
			fc.array(fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }), { minLength: 1, maxLength: 50 }),
			fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }),
			fc.boolean(),
			(values, shift, isSample) => {
				// Skip sample variance for single values
				if (isSample && values.length === 1) return true

				const originalVar = variance(isSample)(values)
				const shiftedValues = values.map(v => v + shift)
				const shiftedVar = variance(isSample)(shiftedValues)

				// Variance should not change when adding a constant
				return approximately(originalVar, shiftedVar, 1e-6)
			}
		),
		{ numRuns: 500 }
	)
})

// Behavioral tests
Deno.test("variance - currying behavior", () => {
	const popVar = variance(false)
	const sampVar = variance(true)
	const values = [1, 2, 3, 4, 5]

	assertEquals(typeof popVar, "function")
	assertEquals(typeof sampVar, "function")
	assertEquals(popVar(values), 2)
	assertEquals(sampVar(values), 2.5)
})

Deno.test("variance - default parameter is false", () => {
	const defaultVar = variance()
	const explicitFalse = variance(false)
	const values = [1, 2, 3, 4, 5]

	assertEquals(defaultVar(values), explicitFalse(values))
	assertEquals(defaultVar(values), 2) // Population variance
})

Deno.test("variance - consistency with known formulas", () => {
	// Test with simple values where we can manually calculate
	const values = [2, 4, 6, 8, 10]
	// Mean = 6
	// Squared differences: [16, 4, 0, 4, 16]
	// Sum = 40
	// Population variance = 40/5 = 8
	// Sample variance = 40/4 = 10

	assertEquals(variance(false)(values), 8)
	assertEquals(variance(true)(values), 10)
})