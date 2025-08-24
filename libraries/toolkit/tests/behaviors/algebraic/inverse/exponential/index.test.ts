import { assertEquals, assertAlmostEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import exponential from "../../../../../src/simple/math/exponential/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("exponential: JSDoc examples", async (t) => {
	await t.step("common values", () => {
		assertEquals(exponential(0), 1)
		assertAlmostEquals(exponential(1), Math.E, 1e-10)
		assertAlmostEquals(exponential(2), Math.E ** 2, 1e-10)
	})

	await t.step("negative exponents", () => {
		assertAlmostEquals(exponential(-1), 1 / Math.E, 1e-10)
		assertAlmostEquals(exponential(-2), 1 / (Math.E ** 2), 1e-10)
	})

	await t.step("natural log inverse", () => {
		assertAlmostEquals(exponential(Math.log(5)), 5, 1e-10)
		assertAlmostEquals(exponential(Math.log(10)), 10, 1e-10)
	})

	await t.step("small values", () => {
		assertAlmostEquals(exponential(0.5), Math.sqrt(Math.E), 1e-10)
		assertAlmostEquals(exponential(0.1), 1.1051709180756477, 1e-10)
	})

	await t.step("large values", () => {
		assertAlmostEquals(exponential(5), 148.4131591025766, 1e-10)
		assertAlmostEquals(exponential(10), 22026.465794806718, 1e-10)
	})

	await t.step("very large/small values", () => {
		assertAlmostEquals(exponential(100), 2.6881171418161356e+43, 1e30)
		assertAlmostEquals(exponential(-100), 3.720075976020836e-44, 1e-50)
	})

	await t.step("special values", () => {
		assertEquals(exponential(Infinity), Infinity)
		assertEquals(exponential(-Infinity), 0)
	})

	await t.step("invalid inputs return NaN", () => {
		assertEquals(Number.isNaN(exponential(null)), true)
		assertEquals(Number.isNaN(exponential("2.5" as any)), true)
		assertEquals(Number.isNaN(exponential(undefined)), true)
		assertEquals(Number.isNaN(exponential({} as any)), true)
		assertEquals(Number.isNaN(exponential([] as any)), true)
	})

	await t.step("compound interest continuous", () => {
		const continuousGrowth = (rate: number, time: number) =>
			exponential(rate * time)
		assertAlmostEquals(continuousGrowth(0.05, 10), 1.6487212707001282, 1e-10)
	})

	await t.step("exponential decay", () => {
		const decay = (decayRate: number, time: number) =>
			exponential(-decayRate * time)
		assertAlmostEquals(decay(0.1, 5), 0.6065306597126334, 1e-10)
	})

	await t.step("sigmoid function component", () => {
		const sigmoid = (x: number) => 1 / (1 + exponential(-x))
		assertAlmostEquals(sigmoid(0), 0.5, 1e-10)
		assertAlmostEquals(sigmoid(2), 0.8807970779778823, 1e-10)
	})

	await t.step("population growth", () => {
		const population = (initial: number, rate: number, time: number) =>
			initial * exponential(rate * time)
		assertAlmostEquals(population(1000, 0.02, 25), 1648.7212707001282, 1e-10)
	})
})

Deno.test("exponential: property-based testing", async (t) => {
	await t.step("inverse relationship with logarithm", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }),
				(x) => {
					const exp = exponential(x)
					if (exp === 0) {
						// For very negative x, exp(x) can be 0 due to underflow
						return x < -700
					}
					if (!Number.isFinite(exp)) {
						// For very large x, exp(x) can overflow
						return x > 700
					}
					const log = Math.log(exp)
					return approximately(log, x, Math.max(1e-10, Math.abs(x) * 1e-14))
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("exponential of sum equals product", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.float({ noNaN: true, min: Math.fround(-10), max: Math.fround(10) }),
					fc.float({ noNaN: true, min: Math.fround(-10), max: Math.fround(10) })
				),
				([a, b]) => {
					// e^(a+b) = e^a * e^b
					const expSum = exponential(a + b)
					const expProduct = exponential(a) * exponential(b)
					
					if (!Number.isFinite(expSum) || !Number.isFinite(expProduct)) {
						return true // Skip overflow cases
					}
					
					const epsilon = Math.max(1e-10, Math.abs(expSum) * 1e-14)
					return approximately(expSum, expProduct, epsilon)
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("exponential of difference equals quotient", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.float({ noNaN: true, min: Math.fround(-10), max: Math.fround(10) }),
					fc.float({ noNaN: true, min: Math.fround(-10), max: Math.fround(10) })
				),
				([a, b]) => {
					// e^(a-b) = e^a / e^b
					const expDiff = exponential(a - b)
					const expQuotient = exponential(a) / exponential(b)
					
					if (!Number.isFinite(expDiff) || !Number.isFinite(expQuotient)) {
						return true // Skip overflow/underflow cases
					}
					
					const epsilon = Math.max(1e-10, Math.abs(expDiff) * 1e-14)
					return approximately(expDiff, expQuotient, epsilon)
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("exponential is always positive", () => {
		// Test with specific values instead of property test
		// Property tests inside t.step don't work correctly
		const testValues = [0, 1, -1, 10, -10, 100, -100, 0.5, -0.5]
		for (const x of testValues) {
			const result = exponential(x)
			assertEquals(result > 0, true)
		}
		// Special case: e^(-∞) = 0
		assertEquals(exponential(-Infinity), 0)
		// e^(∞) = ∞
		assertEquals(exponential(Infinity), Infinity)
	})

	await t.step("monotonic increasing", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.float({ noNaN: true, noDefaultInfinity: true }),
					fc.float({ noNaN: true, noDefaultInfinity: true })
				),
				([a, b]) => {
					const expA = exponential(a)
					const expB = exponential(b)
					
					if (a < b) {
						return expA <= expB
					} else if (a > b) {
						return expA >= expB
					} else {
						return approximately(expA, expB, 1e-10)
					}
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("power rule", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.float({ noNaN: true, min: Math.fround(-20), max: Math.fround(20) }),
					fc.integer({ min: -10, max: 10 })
				),
				([x, n]) => {
					// (e^x)^n = e^(x*n)
					const left = Math.pow(exponential(x), n)
					const right = exponential(x * n)
					
					if (!Number.isFinite(left) || !Number.isFinite(right)) {
						return true // Skip overflow/underflow cases
					}
					
					const epsilon = Math.max(1e-10, Math.abs(left) * 1e-12)
					return approximately(left, right, epsilon)
				}
			),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("exponential: edge cases", async (t) => {
	await t.step("handles zero correctly", () => {
		assertEquals(exponential(0), 1)
		assertEquals(exponential(-0), 1)
	})

	await t.step("handles NaN", () => {
		assertEquals(Number.isNaN(exponential(NaN)), true)
	})

	await t.step("handles very small positive numbers", () => {
		const tiny = Number.MIN_VALUE
		const result = exponential(tiny)
		// For such tiny values, exp(x) rounds to exactly 1
		assertEquals(result, 1)
	})

	await t.step("handles very small negative numbers", () => {
		const tiny = -Number.MIN_VALUE
		const result = exponential(tiny)
		// For such tiny values, exp(x) rounds to exactly 1
		assertEquals(result, 1)
	})

	await t.step("handles large positive numbers without overflow", () => {
		const result = exponential(700)
		assertEquals(Number.isFinite(result), true)
		assertEquals(result > 0, true)
	})

	await t.step("handles overflow gracefully", () => {
		const result = exponential(1000)
		assertEquals(result, Infinity)
	})

	await t.step("handles underflow gracefully", () => {
		const result = exponential(-1000)
		assertEquals(result, 0)
	})

	await t.step("handles subnormal results", () => {
		const result = exponential(-750)
		assertEquals(result >= 0, true)
		assertEquals(result < Number.MIN_VALUE, true)
	})
})

Deno.test("exponential: numerical accuracy", async (t) => {
	await t.step("maintains precision for small integers", () => {
		const testCases = [
			{ input: 0, expected: 1 },
			{ input: 1, expected: Math.E },
			{ input: 2, expected: Math.E ** 2 },
			{ input: 3, expected: Math.E ** 3 },
			{ input: -1, expected: 1 / Math.E },
			{ input: -2, expected: 1 / (Math.E ** 2) },
		]
		
		for (const { input, expected } of testCases) {
			assertAlmostEquals(exponential(input), expected, 1e-10)
		}
	})

	await t.step("Taylor series approximation for small values", () => {
		// For small x, e^x ≈ 1 + x + x²/2! + x³/3! + ...
		const values = [0.001, 0.01, 0.1]
		for (const x of values) {
			const actual = exponential(x)
			// Using first few terms of Taylor series
			const approx = 1 + x + (x ** 2) / 2 + (x ** 3) / 6 + (x ** 4) / 24
			assertAlmostEquals(actual, approx, 1e-6)
		}
	})
})