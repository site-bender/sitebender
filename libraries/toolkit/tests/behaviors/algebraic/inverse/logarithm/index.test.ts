import { assertEquals, assertAlmostEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import logarithm from "../../../../../src/simple/math/logarithm/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("logarithm: JSDoc examples", async (t) => {
	await t.step("natural logarithm (base e)", () => {
		assertAlmostEquals(logarithm(Math.E)(Math.E), 1, 1e-10)
		assertEquals(logarithm(Math.E)(1), 0)
		assertAlmostEquals(logarithm(Math.E)(2.718281828), 1, 1e-6)
	})

	await t.step("common logarithm (base 10)", () => {
		assertAlmostEquals(logarithm(10)(100), 2, 1e-10)
		assertAlmostEquals(logarithm(10)(1000), 3, 1e-10)
		assertAlmostEquals(logarithm(10)(0.01), -2, 1e-10)
	})

	await t.step("binary logarithm (base 2)", () => {
		assertAlmostEquals(logarithm(2)(8), 3, 1e-10)
		assertAlmostEquals(logarithm(2)(256), 8, 1e-10)
		assertAlmostEquals(logarithm(2)(0.5), -1, 1e-10)
	})

	await t.step("arbitrary bases", () => {
		assertAlmostEquals(logarithm(3)(27), 3, 1e-10)
		assertAlmostEquals(logarithm(5)(125), 3, 1e-10)
	})

	await t.step("identity log_b(b) = 1", () => {
		assertAlmostEquals(logarithm(7)(7), 1, 1e-10)
	})

	await t.step("zero log_b(1) = 0", () => {
		assertEquals(logarithm(100)(1), 0)
	})

	await t.step("invalid inputs return NaN", () => {
		assertEquals(Number.isNaN(logarithm(1)(10)), true)
		assertEquals(Number.isNaN(logarithm(10)(-5)), true)
		assertEquals(Number.isNaN(logarithm(0)(10)), true)
		assertEquals(logarithm(10)(0), -Infinity)
		assertEquals(Number.isNaN(logarithm(null)(10)), true)
		assertEquals(Number.isNaN(logarithm(10)(null)), true)
		assertEquals(Number.isNaN(logarithm(undefined)(10)), true)
		assertEquals(Number.isNaN(logarithm(10)(undefined)), true)
		assertEquals(Number.isNaN(logarithm("2" as any)(10)), true)
		assertEquals(Number.isNaN(logarithm(10)("100" as any)), true)
	})

	await t.step("pH calculation", () => {
		const pH = (hConcentration: number) => -logarithm(10)(hConcentration)
		assertAlmostEquals(pH(1e-7), 7, 1e-10)
	})

	await t.step("information entropy", () => {
		const bitsRequired = logarithm(2)
		assertAlmostEquals(bitsRequired(256), 8, 1e-10)
	})

	await t.step("partial application for specific bases", () => {
		const log2 = logarithm(2)
		const log10 = logarithm(10)
		const ln = logarithm(Math.E)
		
		assertAlmostEquals(log2(16), 4, 1e-10)
		assertAlmostEquals(log10(100), 2, 1e-10)
		assertAlmostEquals(ln(Math.E), 1, 1e-10)
	})
})

// Property-based tests as separate Deno.test calls
Deno.test("logarithm: inverse relationship with power", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.float({ noNaN: true, min: Math.fround(1.1), max: Math.fround(100) }),
				fc.float({ noNaN: true, min: Math.fround(-10), max: Math.fround(10) })
			),
			([base, exponent]) => {
				// base^log_base(x) = x where x = base^exponent
				const value = Math.pow(base, exponent)
				const log = logarithm(base)(value)
				
				if (!Number.isFinite(value) || !Number.isFinite(log)) {
					return true // Skip overflow cases
				}
				
				return approximately(log, exponent, Math.max(1e-10, Math.abs(exponent) * 1e-12))
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("logarithm: product equals sum property", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.float({ noNaN: true, min: Math.fround(2), max: Math.fround(10) }),
				fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(1000) }),
				fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(1000) })
			),
			([base, a, b]) => {
				// log_b(a*b) = log_b(a) + log_b(b)
				const logProduct = logarithm(base)(a * b)
				const sumLogs = logarithm(base)(a) + logarithm(base)(b)
				
				if (!Number.isFinite(logProduct) || !Number.isFinite(sumLogs)) {
					return true // Skip overflow cases
				}
				
				const epsilon = Math.max(1e-10, Math.abs(logProduct) * 1e-12)
				return approximately(logProduct, sumLogs, epsilon)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("logarithm: quotient equals difference property", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.float({ noNaN: true, min: Math.fround(2), max: Math.fround(10) }),
				fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(1000) }),
				fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(1000) })
			),
			([base, a, b]) => {
				// log_b(a/b) = log_b(a) - log_b(b)
				const logQuotient = logarithm(base)(a / b)
				const diffLogs = logarithm(base)(a) - logarithm(base)(b)
				
				if (!Number.isFinite(logQuotient) || !Number.isFinite(diffLogs)) {
					return true // Skip overflow cases
				}
				
				const epsilon = Math.max(1e-10, Math.abs(logQuotient) * 1e-12)
				return approximately(logQuotient, diffLogs, epsilon)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("logarithm: power equals product property", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.float({ noNaN: true, min: Math.fround(2), max: Math.fround(10) }),
				fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(100) }),
				fc.float({ noNaN: true, min: Math.fround(-5), max: Math.fround(5) })
			),
			([base, value, power]) => {
				// log_b(x^p) = p * log_b(x)
				const powered = Math.pow(value, power)
				if (!Number.isFinite(powered) || powered <= 0) {
					return true // Skip invalid cases
				}
				
				const logPower = logarithm(base)(powered)
				const productLog = power * logarithm(base)(value)
				
				if (!Number.isFinite(logPower) || !Number.isFinite(productLog)) {
					return true // Skip overflow cases
				}
				
				const epsilon = Math.max(1e-10, Math.abs(logPower) * 1e-12)
				return approximately(logPower, productLog, epsilon)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("logarithm: change of base formula", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.float({ noNaN: true, min: Math.fround(2), max: Math.fround(10) }),
				fc.float({ noNaN: true, min: Math.fround(2), max: Math.fround(10) }),
				fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(1000) })
			),
			([base1, base2, value]) => {
				// log_b1(x) = log_b2(x) / log_b2(b1)
				const logBase1 = logarithm(base1)(value)
				const logBase2 = logarithm(base2)(value) / logarithm(base2)(base1)
				
				if (!Number.isFinite(logBase1) || !Number.isFinite(logBase2)) {
					return true // Skip overflow cases
				}
				
				const epsilon = Math.max(1e-10, Math.abs(logBase1) * 1e-12)
				return approximately(logBase1, logBase2, epsilon)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("logarithm: monotonic for positive values", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.float({ noNaN: true, min: Math.fround(2), max: Math.fround(10) }),
				fc.float({ noNaN: true, min: Math.fround(0.01), max: Math.fround(1000) }),
				fc.float({ noNaN: true, min: Math.fround(0.01), max: Math.fround(1000) })
			),
			([base, a, b]) => {
				const logA = logarithm(base)(a)
				const logB = logarithm(base)(b)
				
				if (base > 1) {
					// For base > 1, log is increasing
					if (a < b) return logA <= logB
					if (a > b) return logA >= logB
				} else if (base < 1 && base > 0) {
					// For 0 < base < 1, log is decreasing
					if (a < b) return logA >= logB
					if (a > b) return logA <= logB
				}
				
				return approximately(logA, logB, 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("logarithm: currying and partial application", async (t) => {
	await t.step("partial application preserves behavior", () => {
		const log2 = logarithm(2)
		const log10 = logarithm(10)
		const ln = logarithm(Math.E)
		
		// Test multiple values with same base
		assertAlmostEquals(log2(2), 1, 1e-10)
		assertAlmostEquals(log2(4), 2, 1e-10)
		assertAlmostEquals(log2(8), 3, 1e-10)
		
		assertAlmostEquals(log10(10), 1, 1e-10)
		assertAlmostEquals(log10(100), 2, 1e-10)
		assertAlmostEquals(log10(1000), 3, 1e-10)
		
		assertAlmostEquals(ln(Math.E), 1, 1e-10)
		assertAlmostEquals(ln(Math.E ** 2), 2, 1e-10)
		assertAlmostEquals(ln(Math.E ** 3), 3, 1e-10)
	})

	await t.step("curried function can be reused", () => {
		const log5 = logarithm(5)
		const values = [1, 5, 25, 125, 625]
		const expected = [0, 1, 2, 3, 4]
		
		for (let i = 0; i < values.length; i++) {
			assertAlmostEquals(log5(values[i]), expected[i], 1e-10)
		}
	})
})

Deno.test("logarithm: edge cases", async (t) => {
	await t.step("handles base 1 correctly", () => {
		assertEquals(Number.isNaN(logarithm(1)(10)), true)
		assertEquals(Number.isNaN(logarithm(1)(1)), true)
	})

	await t.step("handles negative base", () => {
		assertEquals(Number.isNaN(logarithm(-2)(10)), true)
		assertEquals(Number.isNaN(logarithm(-10)(100)), true)
	})

	await t.step("handles zero base", () => {
		assertEquals(Number.isNaN(logarithm(0)(10)), true)
	})

	await t.step("handles negative values", () => {
		assertEquals(Number.isNaN(logarithm(10)(-1)), true)
		assertEquals(Number.isNaN(logarithm(2)(-100)), true)
	})

	await t.step("handles zero value", () => {
		assertEquals(logarithm(10)(0), -Infinity)
		assertEquals(logarithm(2)(0), -Infinity)
		assertEquals(logarithm(Math.E)(0), -Infinity)
	})

	await t.step("handles infinity", () => {
		assertEquals(logarithm(10)(Infinity), Infinity)
		assertEquals(logarithm(2)(Infinity), Infinity)
		assertEquals(logarithm(Infinity)(10), 0)
		assertEquals(Number.isNaN(logarithm(Infinity)(Infinity)), true)
	})

	await t.step("handles NaN", () => {
		assertEquals(Number.isNaN(logarithm(NaN)(10)), true)
		assertEquals(Number.isNaN(logarithm(10)(NaN)), true)
		assertEquals(Number.isNaN(logarithm(NaN)(NaN)), true)
	})

	await t.step("handles very small positive values", () => {
		const tiny = Number.MIN_VALUE
		const result = logarithm(10)(tiny)
		assertEquals(Number.isFinite(result), true)
		assertEquals(result < 0, true)
	})

	await t.step("handles subnormal numbers", () => {
		const subnormal = 2.2250738585072014e-308 / 2
		const result = logarithm(2)(subnormal)
		assertEquals(Number.isFinite(result), true)
		assertEquals(result < 0, true)
	})
})

Deno.test("logarithm: numerical accuracy", async (t) => {
	await t.step("maintains precision for powers of base", () => {
		// Powers of 2
		for (let i = 0; i <= 10; i++) {
			assertAlmostEquals(logarithm(2)(2 ** i), i, 1e-10)
		}
		
		// Powers of 10
		for (let i = -3; i <= 3; i++) {
			assertAlmostEquals(logarithm(10)(10 ** i), i, 1e-10)
		}
		
		// Powers of e
		for (let i = -3; i <= 3; i++) {
			assertAlmostEquals(logarithm(Math.E)(Math.E ** i), i, 1e-10)
		}
	})

	await t.step("special mathematical constants", () => {
		// ln(e) = 1
		assertAlmostEquals(logarithm(Math.E)(Math.E), 1, 1e-10)
		
		// log10(10) = 1
		assertAlmostEquals(logarithm(10)(10), 1, 1e-10)
		
		// log2(2) = 1
		assertAlmostEquals(logarithm(2)(2), 1, 1e-10)
		
		// Any base: log_b(1) = 0
		assertAlmostEquals(logarithm(Math.PI)(1), 0, 1e-10)
		assertAlmostEquals(logarithm(Math.SQRT2)(1), 0, 1e-10)
	})
})