import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.218.0/testing/bdd.ts"
import * as fc from "npm:fast-check@3.x.x"

import logarithmBase10 from "../../../../../src/simple/math/logarithmBase10/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

describe("logarithmBase10", () => {
	describe("JSDoc examples", () => {
		it("should compute log10 of powers of 10", () => {
			assertEquals(logarithmBase10(1), 0)
			assertEquals(logarithmBase10(10), 1)
			assertEquals(logarithmBase10(100), 2)
			assertEquals(logarithmBase10(1000), 3)
			assertEquals(logarithmBase10(0.1), -1)
			assertAlmostEquals(logarithmBase10(0.01), -2, 1e-10)
			assertEquals(logarithmBase10(1000000), 6)
			assertEquals(logarithmBase10(0.000001), -6)
		})

		it("should compute log10 of common values", () => {
			assertAlmostEquals(logarithmBase10(2), 0.3010299956639812, 1e-10)
			assertAlmostEquals(logarithmBase10(5), 0.6989700043360189, 1e-10)
			assertAlmostEquals(logarithmBase10(50), 1.6989700043360187, 1e-10)
		})

		it("should handle scientific notation inputs", () => {
			assertAlmostEquals(logarithmBase10(6.022e23), 23.77974075117674, 1e-10)
			assertAlmostEquals(logarithmBase10(1.6e-19), -18.79588001734408, 1e-10)
		})

		it("should return NaN for invalid inputs", () => {
			assertEquals(Number.isNaN(logarithmBase10(0)), true)
			assertEquals(Number.isNaN(logarithmBase10(-10)), true)
			assertEquals(Number.isNaN(logarithmBase10(null)), true)
			assertEquals(Number.isNaN(logarithmBase10(undefined)), true)
			// @ts-ignore - Testing runtime behavior
			assertEquals(Number.isNaN(logarithmBase10("100")), true)
		})

		it("should work in pH calculation", () => {
			const pH = (hydrogenConcentration: number) =>
				-logarithmBase10(hydrogenConcentration)
			assertAlmostEquals(pH(1e-7), 7, 1e-10) // neutral
			assertAlmostEquals(pH(1e-3), 3, 1e-10) // acidic
			assertAlmostEquals(pH(1e-11), 11, 1e-10) // basic
		})

		it("should work in decibel calculation", () => {
			const decibels = (power: number, reference: number) =>
				10 * logarithmBase10(power / reference)
			assertAlmostEquals(decibels(1, 0.001), 30, 1e-10)
			assertAlmostEquals(decibels(100, 1), 20, 1e-10)
		})

		it("should work for order of magnitude", () => {
			const orderOfMagnitude = (n: number) =>
				Math.floor(logarithmBase10(Math.abs(n)))
			assertEquals(orderOfMagnitude(350), 2) // hundreds
			assertEquals(orderOfMagnitude(0.005), -3) // thousandths
			assertEquals(orderOfMagnitude(7.5e9), 9) // billions
		})

		it("should work for Richter scale", () => {
			const richterMagnitude = (amplitude: number, reference = 1) =>
				logarithmBase10(amplitude / reference)
			assertAlmostEquals(richterMagnitude(1000), 3.0, 1e-10)
			assertAlmostEquals(richterMagnitude(100000), 5.0, 1e-10)
		})

		it("should work for digit counting", () => {
			const digitCount = (n: number) =>
				Math.floor(logarithmBase10(Math.abs(n))) + 1
			assertEquals(digitCount(42), 2)
			assertEquals(digitCount(1000), 4)
			assertEquals(digitCount(9999999), 7)
		})

		it("should work for scientific notation exponent", () => {
			const scientificExponent = (n: number) =>
				Math.floor(logarithmBase10(Math.abs(n)))
			assertEquals(scientificExponent(3.5e8), 8)
			assertEquals(scientificExponent(0.00042), -4)
		})
	})

	describe("mathematical properties", () => {
		it("should be the inverse of power of 10", () => {
			fc.assert(
				fc.property(
					fc.float({ min: -100, max: 100, noNaN: true }),
					(exponent) => {
						const power = Math.pow(10, exponent)
						const result = logarithmBase10(power)
						return approximately(
							result,
							exponent,
							Math.max(1e-10, Math.abs(exponent) * 1e-14),
						)
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should satisfy logarithm product rule: log(ab) = log(a) + log(b)", () => {
			fc.assert(
				fc.property(
					fc.float({
						min: Math.fround(1e-50),
						max: Math.fround(1e50),
						noNaN: true,
					}),
					fc.float({
						min: Math.fround(1e-50),
						max: Math.fround(1e50),
						noNaN: true,
					}),
					(a, b) => {
						const product = a * b
						// Avoid overflow/underflow
						if (!Number.isFinite(product) || product <= 0) return true

						const logProduct = logarithmBase10(product)
						const sumOfLogs = logarithmBase10(a) + logarithmBase10(b)

						return approximately(
							logProduct,
							sumOfLogs,
							Math.max(1e-10, Math.abs(sumOfLogs) * 1e-13),
						)
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should satisfy logarithm quotient rule: log(a/b) = log(a) - log(b)", () => {
			fc.assert(
				fc.property(
					fc.float({
						min: Math.fround(1e-50),
						max: Math.fround(1e50),
						noNaN: true,
					}),
					fc.float({
						min: Math.fround(1e-50),
						max: Math.fround(1e50),
						noNaN: true,
					}),
					(a, b) => {
						const quotient = a / b
						// Avoid overflow/underflow
						if (!Number.isFinite(quotient) || quotient <= 0) return true

						const logQuotient = logarithmBase10(quotient)
						const diffOfLogs = logarithmBase10(a) - logarithmBase10(b)

						return approximately(
							logQuotient,
							diffOfLogs,
							Math.max(1e-10, Math.abs(diffOfLogs) * 1e-13),
						)
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should satisfy logarithm power rule: log(a^b) = b * log(a)", () => {
			// Test with specific values instead of property test due to floating point precision
			const testCases = [
				{ base: 10, exponent: 2 },
				{ base: 2, exponent: 3 },
				{ base: 5, exponent: 2 },
				{ base: 3, exponent: 4 },
			]

			for (const { base, exponent } of testCases) {
				const power = Math.pow(base, exponent)
				const logPower = logarithmBase10(power)
				const productLog = exponent * logarithmBase10(base)

				assertAlmostEquals(logPower, productLog, 1e-10)
			}
		})

		it("should be strictly monotonic increasing", () => {
			// Test with carefully selected values to avoid precision issues
			const values = [0.001, 0.01, 0.1, 1, 10, 100, 1000]
			for (let i = 0; i < values.length - 1; i++) {
				const a = values[i]
				const b = values[i + 1]
				const logA = logarithmBase10(a)
				const logB = logarithmBase10(b)
				assertEquals(logA < logB, true)
			}
		})

		it("should return 0 for input of 1", () => {
			assertEquals(logarithmBase10(1), 0)
		})

		it("should return 1 for input of 10", () => {
			assertEquals(logarithmBase10(10), 1)
		})
	})

	describe("edge cases", () => {
		it("should handle extremely small positive numbers", () => {
			assertAlmostEquals(
				logarithmBase10(Number.MIN_VALUE),
				-323.3062153431158,
				1e-10,
			)
			assertAlmostEquals(logarithmBase10(1e-300), -300, 1e-10)
			assertAlmostEquals(logarithmBase10(1e-200), -200, 1e-10)
		})

		it("should handle large positive numbers", () => {
			assertAlmostEquals(
				logarithmBase10(Number.MAX_VALUE),
				308.2547155599167,
				1e-10,
			)
			assertAlmostEquals(logarithmBase10(1e300), 300, 1e-10)
			assertAlmostEquals(logarithmBase10(1e200), 200, 1e-10)
		})

		it("should handle extremely small positive numbers approaching 0", () => {
			// 5e-324 is the smallest positive number in JavaScript
			assertAlmostEquals(logarithmBase10(5e-324), -323.3062153431158, 1e-10)
			// Only actual 0 returns NaN (not -Infinity)
			assertEquals(Number.isNaN(logarithmBase10(0)), true)
		})

		it("should handle special numeric values", () => {
			assertEquals(Number.isNaN(logarithmBase10(NaN)), true)
			assertEquals(logarithmBase10(Infinity), Infinity)
			assertEquals(Number.isNaN(logarithmBase10(-Infinity)), true)
		})
	})

	describe("error handling", () => {
		it("should return NaN for negative numbers", () => {
			fc.assert(
				fc.property(
					fc.float({ max: Math.fround(-Number.MIN_VALUE), noNaN: true }),
					(x) => {
						return Number.isNaN(logarithmBase10(x))
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should return NaN for zero", () => {
			assertEquals(Number.isNaN(logarithmBase10(0)), true)
			assertEquals(Number.isNaN(logarithmBase10(-0)), true)
		})

		it("should return NaN for null and undefined", () => {
			assertEquals(Number.isNaN(logarithmBase10(null)), true)
			assertEquals(Number.isNaN(logarithmBase10(undefined)), true)
		})

		it("should return NaN for non-numeric inputs", () => {
			// @ts-ignore - Testing runtime behavior
			assertEquals(Number.isNaN(logarithmBase10("10")), true)
			// @ts-ignore - Testing runtime behavior
			assertEquals(Number.isNaN(logarithmBase10({})), true)
			// @ts-ignore - Testing runtime behavior
			assertEquals(Number.isNaN(logarithmBase10([])), true)
			// @ts-ignore - Testing runtime behavior
			assertEquals(Number.isNaN(logarithmBase10(true)), true)
		})
	})

	describe("precision and accuracy", () => {
		it("should accurately compute for fractional powers of 10", () => {
			assertAlmostEquals(logarithmBase10(Math.sqrt(10)), 0.5, 1e-10)
			assertAlmostEquals(logarithmBase10(Math.cbrt(10)), 1 / 3, 1e-10)
			assertAlmostEquals(logarithmBase10(Math.pow(10, 0.25)), 0.25, 1e-10)
			assertAlmostEquals(logarithmBase10(Math.pow(10, 0.75)), 0.75, 1e-10)
		})

		it("should maintain precision for numbers close to 1", () => {
			assertAlmostEquals(logarithmBase10(1.0001), 0.00004342727686266485, 1e-9)
			assertAlmostEquals(logarithmBase10(0.9999), -0.00004343117585519684, 1e-9)
			assertAlmostEquals(logarithmBase10(1.01), 0.004321373782642576, 1e-9)
			assertAlmostEquals(logarithmBase10(0.99), -0.004364805402450088, 1e-9)
		})
	})
})
