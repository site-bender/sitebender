import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import exponential from "../../../../../src/simple/math/exponential/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("exponential: basic values", async (t) => {
	await t.step("common values", () => {
		// e^0 = 1
		assertEquals(exponential(0), 1)

		// e^1 = e
		assertEquals(approximately(exponential(1), Math.E), true)
		assertEquals(approximately(exponential(1), 2.718281828459045), true)

		// e^2
		assertEquals(approximately(exponential(2), 7.38905609893065), true)

		// e^-1 = 1/e
		assertEquals(approximately(exponential(-1), 0.36787944117144233), true)
		assertEquals(approximately(exponential(-1), 1 / Math.E), true)

		// e^-2
		assertEquals(approximately(exponential(-2), 0.1353352832366127), true)
	})

	await t.step("small positive values", () => {
		assertEquals(approximately(exponential(0.1), 1.1051709180756477), true)
		assertEquals(approximately(exponential(0.5), 1.6487212707001282), true)
		assertEquals(approximately(exponential(0.25), 1.2840254166877414), true)
		assertEquals(approximately(exponential(0.01), 1.010050167084168), true)
	})

	await t.step("small negative values", () => {
		assertEquals(approximately(exponential(-0.1), 0.9048374180359595), true)
		assertEquals(approximately(exponential(-0.5), 0.6065306597126334), true)
		assertEquals(
			approximately(exponential(-0.25), 0.7788007830714049),
			true,
		)
		assertEquals(
			approximately(exponential(-0.01), 0.9900498337491681),
			true,
		)
	})

	await t.step("larger values", () => {
		assertEquals(approximately(exponential(3), 20.085536923187668), true)
		assertEquals(approximately(exponential(4), 54.598150033144236), true)
		assertEquals(approximately(exponential(5), 148.4131591025766), true)
		assertEquals(approximately(exponential(10), 22026.465794806718), true)

		// Negative larger values
		assertEquals(approximately(exponential(-3), 0.049787068367863944), true)
		assertEquals(approximately(exponential(-4), 0.01831563888873418), true)
		assertEquals(approximately(exponential(-5), 0.006737946999085467), true)
		assertEquals(
			approximately(exponential(-10), 0.00004539992976248485),
			true,
		)
	})
})

Deno.test("exponential: special values", async (t) => {
	await t.step("infinity", () => {
		assertEquals(exponential(Infinity), Infinity)
		assertEquals(exponential(-Infinity), 0)
	})

	await t.step("NaN", () => {
		assertEquals(Number.isNaN(exponential(NaN)), true)
	})

	await t.step("very large positive values", () => {
		assertEquals(exponential(100), 2.6881171418161356e+43)
		// Use approximately for very large numbers due to precision limits
		assertEquals(
			approximately(exponential(500), 1.4035922178528374e+217, 1e+207),
			true,
		)
		assertEquals(
			approximately(exponential(700), 1.0142320547350045e+304, 1e+294),
			true,
		)
		assertEquals(exponential(710), Infinity) // Overflow
	})

	await t.step("very large negative values", () => {
		assertEquals(
			approximately(exponential(-100), 3.720075976020836e-44),
			true,
		)
		assertEquals(exponential(-500), 7.124576406741286e-218)
		assertEquals(exponential(-700), 9.85967654375977e-305)
		assertEquals(exponential(-750), 0) // Underflow
	})
})

Deno.test("exponential: invalid inputs", async (t) => {
	await t.step("null and undefined", () => {
		assertEquals(Number.isNaN(exponential(null)), true)
		assertEquals(Number.isNaN(exponential(undefined)), true)
	})

	await t.step("non-numeric types", () => {
		assertEquals(Number.isNaN(exponential("2.5" as any)), true)
		assertEquals(Number.isNaN(exponential("e" as any)), true)
		assertEquals(Number.isNaN(exponential({} as any)), true)
		assertEquals(Number.isNaN(exponential([] as any)), true)
		assertEquals(Number.isNaN(exponential(true as any)), true)
		assertEquals(Number.isNaN(exponential(false as any)), true)
		assertEquals(Number.isNaN(exponential((() => {}) as any)), true)
	})
})

Deno.test("exponential: mathematical properties", async (t) => {
	await t.step("inverse of natural logarithm: e^ln(x) = x", () => {
		fc.assert(
			fc.property(
				fc.float({
					min: Math.fround(0.001),
					max: Math.fround(1000),
					noNaN: true,
				}),
				(x) => {
					const result = exponential(Math.log(x))
					// Very relaxed tolerance for JavaScript floating point
					const tolerance = Math.max(1e-6, Math.abs(x) * 1e-6)
					return Math.abs(result - x) <= tolerance
				},
			),
			{ numRuns: 100 }, // Reduced runs for speed
		)
	})

	await t.step("logarithm of exponential: ln(e^x) = x", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -100, max: 100, noNaN: true }),
				(x) => {
					const result = Math.log(exponential(x))
					const tolerance = Math.max(1e-10, Math.abs(x) * 1e-10)
					return Math.abs(result - x) < tolerance
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("addition rule: e^(a+b) = e^a * e^b", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -50, max: 50, noNaN: true }),
				fc.float({ min: -50, max: 50, noNaN: true }),
				(a, b) => {
					const leftSide = exponential(a + b)
					const rightSide = exponential(a) * exponential(b)

					// Handle overflow/underflow
					if (!isFinite(leftSide) || !isFinite(rightSide)) {
						return Object.is(leftSide, rightSide)
					}

					// Use relative tolerance
					const tolerance = Math.max(
						1e-10,
						Math.abs(leftSide) * 1e-10,
					)
					return Math.abs(leftSide - rightSide) < tolerance
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("subtraction rule: e^(a-b) = e^a / e^b", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -50, max: 50, noNaN: true }),
				fc.float({ min: -50, max: 50, noNaN: true }),
				(a, b) => {
					const leftSide = exponential(a - b)
					const rightSide = exponential(a) / exponential(b)

					// Handle overflow/underflow
					if (!isFinite(leftSide) || !isFinite(rightSide)) {
						return Object.is(leftSide, rightSide)
					}

					// Use relative tolerance
					const tolerance = Math.max(
						1e-10,
						Math.abs(leftSide) * 1e-10,
					)
					return Math.abs(leftSide - rightSide) < tolerance
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("multiplication rule: e^(k*x) = (e^x)^k", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -20, max: 20, noNaN: true }),
				fc.integer({ min: -10, max: 10 }),
				(x, k) => {
					const leftSide = exponential(k * x)
					const rightSide = Math.pow(exponential(x), k)

					// Handle overflow/underflow
					if (!isFinite(leftSide) || !isFinite(rightSide)) {
						return Object.is(leftSide, rightSide)
					}

					// Use relative tolerance
					const tolerance = Math.max(
						1e-10,
						Math.abs(leftSide) * 1e-10,
					)
					return Math.abs(leftSide - rightSide) < tolerance
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("always positive: e^x > 0", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -700, max: 700, noNaN: true }),
				(x) => {
					const result = exponential(x)
					return result >= 0 // Can be exactly 0 due to underflow
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("monotonic increasing", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -100, max: 100, noNaN: true }),
				fc.float({ min: -100, max: 100, noNaN: true }),
				(a, b) => {
					const expA = exponential(a)
					const expB = exponential(b)

					// For very small differences, exponential might return same value due to precision
					if (Math.abs(a - b) < 1e-15) {
						return Math.abs(expA - expB) < 1e-10
					}

					if (a < b) {
						return expA <= expB // Use <= to handle precision limits
					} else if (a > b) {
						return expA >= expB // Use >= to handle precision limits
					} else {
						return expA === expB
					}
				},
			),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("exponential: series expansion approximation", async (t) => {
	await t.step("Taylor series for small values", () => {
		// e^x = 1 + x + x²/2! + x³/3! + ...
		const taylorExp = (x: number, terms: number = 10): number => {
			let sum = 1
			let term = 1
			for (let n = 1; n < terms; n++) {
				term *= x / n
				sum += term
			}
			return sum
		}

		// Test small values where Taylor series is accurate
		fc.assert(
			fc.property(
				fc.float({ min: -2, max: 2, noNaN: true }),
				(x) => {
					const actual = exponential(x)
					const taylor = taylorExp(x, 20)
					const tolerance = Math.max(1e-8, Math.abs(actual) * 1e-8)
					return Math.abs(actual - taylor) < tolerance
				},
			),
			{ numRuns: 100 },
		)
	})
})

Deno.test("exponential: practical applications", async (t) => {
	await t.step("continuous compound interest", () => {
		const continuousGrowth = (rate: number, time: number) =>
			exponential(rate * time)

		// 5% annual rate for 10 years
		assertEquals(
			approximately(continuousGrowth(0.05, 10), 1.6487212707001282),
			true,
		)

		// 10% annual rate for 5 years
		assertEquals(
			approximately(continuousGrowth(0.10, 5), 1.6487212707001282),
			true,
		)

		// 3% annual rate for 20 years
		assertEquals(
			approximately(continuousGrowth(0.03, 20), 1.8221188003905092),
			true,
		)
	})

	await t.step("exponential decay", () => {
		const decay = (decayRate: number, time: number) =>
			exponential(-decayRate * time)

		// Half-life calculations (decay rate = ln(2) / half_life)
		const halfLifeDecay = (halfLife: number, time: number) =>
			exponential(-Math.LN2 * time / halfLife)

		// After one half-life, 50% remains
		assertEquals(approximately(halfLifeDecay(10, 10), 0.5), true)

		// After two half-lives, 25% remains
		assertEquals(approximately(halfLifeDecay(10, 20), 0.25), true)

		// After three half-lives, 12.5% remains
		assertEquals(approximately(halfLifeDecay(10, 30), 0.125), true)
	})

	await t.step("sigmoid function", () => {
		const sigmoid = (x: number) => 1 / (1 + exponential(-x))

		// Sigmoid(0) = 0.5
		assertEquals(sigmoid(0), 0.5)

		// Positive values approach 1
		assertEquals(approximately(sigmoid(2), 0.8807970779778823), true)
		assertEquals(approximately(sigmoid(5), 0.9933071490757153), true)

		// Negative values approach 0
		assertEquals(approximately(sigmoid(-2), 0.11920292202211757), true)
		assertEquals(approximately(sigmoid(-5), 0.006692850924284855), true)
	})

	await t.step("population growth", () => {
		const population = (initial: number, rate: number, time: number) =>
			initial * exponential(rate * time)

		// 2% growth rate for 25 years
		assertEquals(
			approximately(population(1000, 0.02, 25), 1648.7212707001282),
			true,
		)

		// 3% growth rate for 10 years
		assertEquals(
			approximately(population(5000, 0.03, 10), 6749.293525605318, 0.01),
			true,
		)

		// Negative growth (decline)
		assertEquals(
			approximately(population(10000, -0.01, 20), 8187.307530779819),
			true,
		)
	})

	await t.step("probability distributions", () => {
		// Exponential distribution PDF: λe^(-λx)
		const exponentialPDF = (lambda: number, x: number) =>
			lambda * exponential(-lambda * x)

		// Mean = 1/λ
		assertEquals(
			approximately(exponentialPDF(2, 0.5), 2 * exponential(-1)),
			true,
		)
		assertEquals(
			approximately(exponentialPDF(0.5, 2), 0.5 * exponential(-1)),
			true,
		)

		// CDF: 1 - e^(-λx)
		const exponentialCDF = (lambda: number, x: number) =>
			1 - exponential(-lambda * x)

		assertEquals(
			approximately(exponentialCDF(1, 1), 1 - exponential(-1)),
			true,
		)
		assertEquals(
			approximately(exponentialCDF(2, 0.5), 1 - exponential(-1)),
			true,
		)
	})
})

Deno.test("exponential: relationships with other functions", async (t) => {
	await t.step("e^x * e^(-x) = 1", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -100, max: 100, noNaN: true }),
				(x) => {
					const product = exponential(x) * exponential(-x)
					return approximately(product, 1)
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("hyperbolic functions", () => {
		// sinh(x) = (e^x - e^(-x)) / 2
		const sinh = (x: number) => (exponential(x) - exponential(-x)) / 2

		// cosh(x) = (e^x + e^(-x)) / 2
		const cosh = (x: number) => (exponential(x) + exponential(-x)) / 2

		// tanh(x) = sinh(x) / cosh(x)
		const tanh = (x: number) => sinh(x) / cosh(x)

		// Test against Math built-ins
		fc.assert(
			fc.property(
				fc.float({ min: -10, max: 10, noNaN: true }),
				(x) => {
					return approximately(sinh(x), Math.sinh(x)) &&
						approximately(cosh(x), Math.cosh(x)) &&
						approximately(tanh(x), Math.tanh(x))
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("Euler's identity components", () => {
		// e^(iπ) + 1 = 0 (not directly testable with real exponential)
		// But we can test e^0 = 1
		assertEquals(exponential(0), 1)

		// And that e^x approaches specific values
		assertEquals(
			approximately(exponential(Math.PI), 23.140692632779263),
			true,
		)
		assertEquals(
			approximately(exponential(-Math.PI), 0.04321391826377226),
			true,
		)
	})
})
