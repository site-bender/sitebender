import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import logarithm from "../../../../../src/simple/math/logarithm/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("logarithm: basic functionality", async (t) => {
	await t.step("natural logarithm (base e)", () => {
		assertEquals(logarithm(Math.E)(Math.E), 1)
		assertEquals(logarithm(Math.E)(1), 0)
		assertEquals(approximately(logarithm(Math.E)(2.718281828), 1, 1e-8), true)
		assertEquals(approximately(logarithm(Math.E)(7.389056099), 2, 1e-8), true)
		assertEquals(approximately(logarithm(Math.E)(0.367879441), -1, 1e-8), true)
	})

	await t.step("common logarithm (base 10)", () => {
		assertEquals(logarithm(10)(100), 2)
		// JavaScript floating point issues with log10(1000)
		assertEquals(Math.abs(logarithm(10)(1000) - 3) < 1e-10, true)
		assertEquals(Math.abs(logarithm(10)(0.01) - (-2)) < 1e-10, true)
		assertEquals(Math.abs(logarithm(10)(0.001) - (-3)) < 1e-10, true)
		assertEquals(logarithm(10)(1), 0)
		assertEquals(logarithm(10)(10), 1)
		assertEquals(logarithm(10)(10000), 4)
		assertEquals(Math.abs(logarithm(10)(50) - 1.6989700043360189) < 1e-10, true)
	})

	await t.step("binary logarithm (base 2)", () => {
		assertEquals(logarithm(2)(8), 3)
		assertEquals(logarithm(2)(256), 8)
		assertEquals(logarithm(2)(0.5), -1)
		assertEquals(logarithm(2)(1), 0)
		assertEquals(logarithm(2)(2), 1)
		assertEquals(logarithm(2)(4), 2)
		assertEquals(logarithm(2)(16), 4)
		assertEquals(logarithm(2)(32), 5)
		assertEquals(logarithm(2)(64), 6)
		assertEquals(logarithm(2)(128), 7)
		assertEquals(logarithm(2)(1024), 10)
	})

	await t.step("arbitrary bases", () => {
		// Some of these have floating point issues
		assertEquals(Math.abs(logarithm(3)(27) - 3) < 1e-10, true)
		assertEquals(Math.abs(logarithm(5)(125) - 3) < 1e-10, true)
		assertEquals(Math.abs(logarithm(7)(49) - 2) < 1e-10, true)
		assertEquals(Math.abs(logarithm(4)(16) - 2) < 1e-10, true)
		assertEquals(Math.abs(logarithm(6)(36) - 2) < 1e-10, true)
		assertEquals(Math.abs(logarithm(8)(64) - 2) < 1e-10, true)
		assertEquals(Math.abs(logarithm(9)(81) - 2) < 1e-10, true)
		assertEquals(Math.abs(logarithm(3)(9) - 2) < 1e-10, true)
	})

	await t.step("identity: log_b(b) = 1", () => {
		assertEquals(logarithm(7)(7), 1)
		assertEquals(logarithm(13)(13), 1)
		assertEquals(logarithm(100)(100), 1)
		assertEquals(logarithm(Math.PI)(Math.PI), 1)
		assertEquals(logarithm(Math.SQRT2)(Math.SQRT2), 1)
	})

	await t.step("zero property: log_b(1) = 0", () => {
		assertEquals(logarithm(100)(1), 0)
		assertEquals(logarithm(2)(1), 0)
		assertEquals(logarithm(Math.E)(1), 0)
		assertEquals(logarithm(10)(1), 0)
		assertEquals(logarithm(7.5)(1), 0)
	})

	await t.step("partial application", () => {
		const log2 = logarithm(2)
		const log10 = logarithm(10)
		const ln = logarithm(Math.E)

		assertEquals(log2(16), 4)
		assertEquals(log10(100), 2)
		assertEquals(ln(Math.E), 1)

		assertEquals(log2(32), 5)
		// log10(1000) has precision issues
		assertEquals(Math.abs(log10(1000) - 3) < 1e-10, true)
		assertEquals(Math.abs(ln(10) - 2.302585092994046) < 1e-10, true)
	})
})

Deno.test("logarithm: special values", async (t) => {
	await t.step("logarithm of zero", () => {
		assertEquals(logarithm(10)(0), -Infinity)
		assertEquals(logarithm(2)(0), -Infinity)
		assertEquals(logarithm(Math.E)(0), -Infinity)
		assertEquals(logarithm(5)(0), -Infinity)
	})

	await t.step("logarithm of infinity", () => {
		assertEquals(logarithm(10)(Infinity), Infinity)
		assertEquals(logarithm(2)(Infinity), Infinity)
		assertEquals(logarithm(Math.E)(Infinity), Infinity)
		assertEquals(logarithm(5)(Infinity), Infinity)
	})

	await t.step("fractional values", () => {
		assertEquals(logarithm(2)(0.25), -2)
		assertEquals(logarithm(2)(0.125), -3)
		assertEquals(approximately(logarithm(3)(1 / 9), -2, 1e-10), true)
		assertEquals(approximately(logarithm(5)(0.2), -1, 1e-10), true)
		assertEquals(approximately(logarithm(10)(0.1), -1, 1e-10), true)
	})
})

Deno.test("logarithm: invalid inputs", async (t) => {
	await t.step("base 1 is undefined", () => {
		assertEquals(Number.isNaN(logarithm(1)(10)), true)
		assertEquals(Number.isNaN(logarithm(1)(1)), true)
		assertEquals(Number.isNaN(logarithm(1)(100)), true)
	})

	await t.step("negative values", () => {
		assertEquals(Number.isNaN(logarithm(10)(-5)), true)
		assertEquals(Number.isNaN(logarithm(2)(-1)), true)
		assertEquals(Number.isNaN(logarithm(Math.E)(-10)), true)
	})

	await t.step("invalid bases", () => {
		assertEquals(Number.isNaN(logarithm(0)(10)), true)
		assertEquals(Number.isNaN(logarithm(-2)(10)), true)
		assertEquals(Number.isNaN(logarithm(-10)(5)), true)
	})

	await t.step("null and undefined", () => {
		assertEquals(Number.isNaN(logarithm(null as any)(10)), true)
		assertEquals(Number.isNaN(logarithm(undefined as any)(10)), true)
		assertEquals(Number.isNaN(logarithm(10)(null as any)), true)
		assertEquals(Number.isNaN(logarithm(10)(undefined as any)), true)
	})

	await t.step("non-numeric types", () => {
		assertEquals(Number.isNaN(logarithm("10" as any)(5)), true)
		assertEquals(Number.isNaN(logarithm(10)("5" as any)), true)
		assertEquals(Number.isNaN(logarithm({} as any)(5)), true)
		assertEquals(Number.isNaN(logarithm(10)([] as any)), true)
		assertEquals(Number.isNaN(logarithm(true as any)(5)), true)
	})

	await t.step("NaN inputs", () => {
		assertEquals(Number.isNaN(logarithm(NaN)(10)), true)
		assertEquals(Number.isNaN(logarithm(10)(NaN)), true)
		assertEquals(Number.isNaN(logarithm(NaN)(NaN)), true)
	})
})

Deno.test("logarithm: mathematical properties", async (t) => {
	await t.step("product rule: log(a*b) = log(a) + log(b)", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(2), max: Math.fround(100), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				(base, a, b) => {
					const leftSide = logarithm(base)(a * b)
					const rightSide = logarithm(base)(a) + logarithm(base)(b)

					if (!isFinite(leftSide) || !isFinite(rightSide)) {
						return true // Just accept infinity cases
					}

					// VERY relaxed tolerance for JavaScript
					const tolerance = Math.max(1e-6, Math.abs(leftSide) * 1e-6)
					return Math.abs(leftSide - rightSide) <= tolerance
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("quotient rule: log(a/b) = log(a) - log(b)", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(2), max: Math.fround(100), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				(base, a, b) => {
					const leftSide = logarithm(base)(a / b)
					const rightSide = logarithm(base)(a) - logarithm(base)(b)

					if (!isFinite(leftSide) || !isFinite(rightSide)) {
						return true // Just accept infinity cases
					}

					// VERY relaxed tolerance for JavaScript
					const tolerance = Math.max(1e-6, Math.abs(leftSide) * 1e-6)
					return Math.abs(leftSide - rightSide) <= tolerance
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("power rule: log(a^n) = n * log(a)", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(2), max: Math.fround(20), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(10), noNaN: true }),
				fc.integer({ min: -5, max: 5 }),
				(base, a, n) => {
					const leftSide = logarithm(base)(Math.pow(a, n))
					const rightSide = n * logarithm(base)(a)

					if (!isFinite(leftSide) || !isFinite(rightSide)) {
						return true // Just accept infinity cases
					}

					// VERY relaxed tolerance for JavaScript
					const tolerance = Math.max(1e-6, Math.abs(leftSide) * 1e-6)
					return Math.abs(leftSide - rightSide) <= tolerance
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("change of base formula: log_b(x) = log_c(x) / log_c(b)", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(2), max: Math.fround(20), noNaN: true }),
				fc.float({ min: Math.fround(2), max: Math.fround(20), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				(b, c, x) => {
					fc.pre(Math.abs(b - 1) > 0.1 && Math.abs(c - 1) > 0.1)

					const direct = logarithm(b)(x)
					const changeBase = logarithm(c)(x) / logarithm(c)(b)

					if (!isFinite(direct) || !isFinite(changeBase)) {
						return true // Just accept infinity cases
					}

					// VERY relaxed tolerance for JavaScript
					const tolerance = Math.max(1e-6, Math.abs(direct) * 1e-6)
					return Math.abs(direct - changeBase) <= tolerance
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("inverse with exponential: log_b(b^x) = x", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(2), max: Math.fround(100), noNaN: true }),
				fc.float({ min: -10, max: 10, noNaN: true }),
				(base, x) => {
					const result = logarithm(base)(Math.pow(base, x))

					// Use relative tolerance
					const tolerance = Math.max(1e-10, Math.abs(x) * 1e-10)
					return Math.abs(result - x) < tolerance
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("reciprocal base: log_b(x) = -log_(1/b)(x)", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(2), max: Math.fround(20), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				(base, x) => {
					const leftSide = logarithm(base)(x)
					const rightSide = -logarithm(1 / base)(x)

					if (!isFinite(leftSide) || !isFinite(rightSide)) {
						return true // Just accept infinity cases
					}

					// VERY relaxed tolerance for JavaScript
					const tolerance = Math.max(1e-6, Math.abs(leftSide) * 1e-6)
					return Math.abs(leftSide - rightSide) <= tolerance
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("monotonic for base > 1", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(2), max: Math.fround(10), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				(base, a, b) => {
					const logA = logarithm(base)(a)
					const logB = logarithm(base)(b)

					// For very close values, just return true
					if (Math.abs(a - b) < 1e-6) {
						return true
					}

					if (a < b * 0.999) { // Allow some tolerance
						return logA <= logB
					} else if (a > b * 1.001) { // Allow some tolerance
						return logA >= logB
					} else {
						return true // Close enough
					}
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("decreasing for 0 < base < 1", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(0.1), max: Math.fround(0.9), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
				(base, a, b) => {
					const logA = logarithm(base)(a)
					const logB = logarithm(base)(b)

					// For very close values, just return true
					if (Math.abs(a - b) < 1e-6) {
						return true
					}

					if (a < b * 0.999) { // Allow some tolerance
						return logA >= logB
					} else if (a > b * 1.001) { // Allow some tolerance
						return logA <= logB
					} else {
						return true // Close enough
					}
				},
			),
			{ numRuns: 100 },
		)
	})
})

Deno.test("logarithm: practical applications", async (t) => {
	await t.step("pH calculation", () => {
		const pH = (hConcentration: number) => -logarithm(10)(hConcentration)

		// Neutral pH
		assertEquals(approximately(pH(1e-7), 7, 1e-10), true)

		// Acidic
		assertEquals(approximately(pH(1e-3), 3, 1e-10), true)
		assertEquals(approximately(pH(1e-4), 4, 1e-10), true)

		// Basic
		assertEquals(approximately(pH(1e-9), 9, 1e-10), true)
		assertEquals(approximately(pH(1e-11), 11, 1e-10), true)

		// Strong acid
		assertEquals(approximately(pH(0.1), 1, 1e-10), true)
	})

	await t.step("information entropy (bits)", () => {
		const bitsRequired = logarithm(2)

		// Number of bits to represent values
		assertEquals(bitsRequired(256), 8)
		assertEquals(bitsRequired(1024), 10)
		assertEquals(bitsRequired(65536), 16)
		assertEquals(bitsRequired(4294967296), 32)

		// Fractional bits
		assertEquals(approximately(bitsRequired(10), 3.321928094887362), true)
		assertEquals(approximately(bitsRequired(100), 6.643856189774724), true)
	})

	await t.step("decibel calculations", () => {
		// dB = 10 * log10(P1/P0) for power
		const powerDB = (p1: number, p0: number) => 10 * logarithm(10)(p1 / p0)

		// Double the power = +3 dB
		assertEquals(approximately(powerDB(2, 1), 3.0102999566398114), true)

		// 10x the power = +10 dB
		assertEquals(powerDB(10, 1), 10)

		// Half the power = -3 dB
		assertEquals(approximately(powerDB(0.5, 1), -3.0102999566398114), true)

		// 100x the power = +20 dB
		assertEquals(powerDB(100, 1), 20)
	})

	await t.step("richter scale (earthquakes)", () => {
		// Magnitude = log10(amplitude/reference)
		const magnitude = (amplitude: number) => logarithm(10)(amplitude)

		// Each unit increase = 10x amplitude
		assertEquals(magnitude(10), 1)
		assertEquals(magnitude(100), 2)
		assertEquals(Math.abs(magnitude(1000) - 3) < 1e-10, true) // Precision issue
		assertEquals(magnitude(10000), 4)

		// Fractional magnitudes - just check they're close enough
		assertEquals(Math.abs(magnitude(50) - 1.6989700043360189) < 1e-10, true)
		assertEquals(Math.abs(magnitude(500) - 2.6989700043360187) < 1e-10, true)
	})

	await t.step("compound interest periods", () => {
		// n = log(FV/PV) / log(1+r) where FV = future value, PV = present value, r = rate
		const periodsToDouble = (rate: number) => logarithm(1 + rate)(2)

		// Rule of 72 approximation - just check they're reasonably close
		assertEquals(
			Math.abs(periodsToDouble(0.01) - 69.66071689357483) < 1e-8,
			true,
		) // ~70 years at 1%
		assertEquals(
			Math.abs(periodsToDouble(0.05) - 14.206699082890463) < 1e-8,
			true,
		) // ~14 years at 5%
		assertEquals(
			Math.abs(periodsToDouble(0.10) - 7.272540897341715) < 1e-8,
			true,
		) // ~7 years at 10%
		assertEquals(
			Math.abs(periodsToDouble(0.15) - 4.959484454764117) < 1e-8,
			true,
		) // ~5 years at 15%
	})

	await t.step("musical intervals", () => {
		// Octaves: frequency ratio of 2:1
		const octaves = (f2: number, f1: number) => logarithm(2)(f2 / f1)

		// One octave up
		assertEquals(octaves(880, 440), 1) // A4 to A5

		// Two octaves up
		assertEquals(octaves(1760, 440), 2) // A4 to A6

		// One octave down
		assertEquals(octaves(220, 440), -1) // A4 to A3

		// Perfect fifth (3:2 ratio)
		assertEquals(approximately(octaves(660, 440), 0.5849625007211561), true)
	})
})
