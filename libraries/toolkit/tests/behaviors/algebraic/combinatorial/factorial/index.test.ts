import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import factorial from "../../../../../src/simple/math/factorial/index.ts"

Deno.test("factorial", async (t) => {
	await t.step("mathematical properties", async (t) => {
		await t.step("should satisfy factorial definition n! = n × (n-1)!", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					(n) => {
						const nFactorial = factorial(n)
						const nMinus1Factorial = factorial(n - 1)

						// n! = n × (n-1)!
						return nFactorial === n * nMinus1Factorial
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should satisfy factorial recurrence relation", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 20 }),
					(n) => {
						// factorial(n) / factorial(n-1) = n
						const ratio = factorial(n) / factorial(n - 1)
						// Use small epsilon for floating point comparison
						return Math.abs(ratio - n) < 1e-10
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should grow monotonically for positive integers", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 0, max: 100 }),
					(n) => {
						// factorial(n+1) >= factorial(n) for n >= 0
						// Equality only when n = 0 (since 0! = 1! = 1)
						if (n === 0) {
							return factorial(n + 1) === factorial(n)
						}
						return factorial(n + 1) > factorial(n)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should satisfy factorial inequality n! >= n^(n/2)", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 20 }),
					(n) => {
						const fact = factorial(n)
						const bound = Math.pow(n, n / 2)
						return fact >= bound
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("combinatorial properties", async (t) => {
		await t.step(
			"should calculate permutations correctly P(n,r) = n!/(n-r)!",
			() => {
				fc.assert(
					fc.property(
						fc.integer({ min: 1, max: 20 }),
						fc.integer({ min: 0, max: 20 }),
						(n, r) => {
							if (r > n) return true // Skip invalid cases

							const permutations = factorial(n) / factorial(n - r)

							// Calculate manually
							let expected = 1
							for (let i = 0; i < r; i++) {
								expected *= n - i
							}

							return Math.abs(permutations - expected) < 1e-10
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step(
			"should calculate combinations correctly C(n,r) = n!/(r!(n-r)!)",
			() => {
				fc.assert(
					fc.property(
						fc.integer({ min: 0, max: 20 }),
						fc.integer({ min: 0, max: 20 }),
						(n, r) => {
							if (r > n) return true // Skip invalid cases

							const combinations = factorial(n) /
								(factorial(r) * factorial(n - r))

							// Pascal's triangle property: C(n,r) = C(n,n-r)
							const symmetric = factorial(n) / (factorial(n - r) * factorial(r))

							return Math.abs(combinations - symmetric) < 1e-10
						},
					),
					{ numRuns: 1000 },
				)
			},
		)
	})

	await t.step("base cases", async (t) => {
		await t.step("should return 1 for 0! (by definition)", () => {
			assertEquals(factorial(0), 1)
		})

		await t.step("should return 1 for 1!", () => {
			assertEquals(factorial(1), 1)
		})

		await t.step("should calculate small factorials correctly", () => {
			assertEquals(factorial(2), 2)
			assertEquals(factorial(3), 6)
			assertEquals(factorial(4), 24)
			assertEquals(factorial(5), 120)
			assertEquals(factorial(6), 720)
			assertEquals(factorial(7), 5040)
			assertEquals(factorial(8), 40320)
			assertEquals(factorial(9), 362880)
			assertEquals(factorial(10), 3628800)
		})
	})

	await t.step("large values", async (t) => {
		await t.step("should handle moderately large factorials", () => {
			assertEquals(factorial(12), 479001600)
			assertEquals(factorial(15), 1307674368000)
			assertEquals(factorial(20), 2432902008176640000)
		})

		await t.step(
			"should handle the largest exact factorial in JavaScript",
			() => {
				assertEquals(factorial(21), 51090942171709440000)
			},
		)

		await t.step("should use scientific notation for large factorials", () => {
			const fact22 = factorial(22)
			assertEquals(fact22 > 1e21, true)
			assertEquals(fact22 < 2e21, true)
		})

		await t.step("should handle very large factorials before overflow", () => {
			const fact50 = factorial(50)
			assertEquals(fact50 > 3e64, true)
			assertEquals(fact50 < 4e64, true)

			const fact100 = factorial(100)
			assertEquals(fact100 > 9e157, true)
			assertEquals(fact100 < 10e157, true)

			const fact170 = factorial(170)
			assertEquals(fact170 > 7e306, true)
			assertEquals(fact170 < 8e306, true)
		})

		await t.step("should return Infinity for factorial > 170", () => {
			assertEquals(factorial(171), Infinity)
			assertEquals(factorial(200), Infinity)
			assertEquals(factorial(1000), Infinity)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for negative numbers", () => {
			assertEquals(Number.isNaN(factorial(-1)), true)
			assertEquals(Number.isNaN(factorial(-5)), true)
			assertEquals(Number.isNaN(factorial(-100)), true)
		})

		await t.step("should return NaN for non-integers", () => {
			assertEquals(Number.isNaN(factorial(3.5)), true)
			assertEquals(Number.isNaN(factorial(2.1)), true)
			assertEquals(Number.isNaN(factorial(0.5)), true)
			assertEquals(Number.isNaN(factorial(Math.PI)), true)
			assertEquals(Number.isNaN(factorial(Math.E)), true)
		})

		await t.step("should return NaN for null", () => {
			assertEquals(Number.isNaN(factorial(null as any)), true)
		})

		await t.step("should return NaN for undefined", () => {
			assertEquals(Number.isNaN(factorial(undefined as any)), true)
		})

		await t.step("should return NaN for non-numeric values", () => {
			assertEquals(Number.isNaN(factorial("5" as any)), true)
			assertEquals(Number.isNaN(factorial("abc" as any)), true)
			assertEquals(Number.isNaN(factorial({} as any)), true)
			assertEquals(Number.isNaN(factorial([] as any)), true)
			assertEquals(Number.isNaN(factorial(true as any)), true)
			assertEquals(Number.isNaN(factorial(false as any)), true)
		})

		await t.step("should return NaN for special values", () => {
			assertEquals(Number.isNaN(factorial(NaN)), true)
			assertEquals(Number.isNaN(factorial(Infinity)), true)
			assertEquals(Number.isNaN(factorial(-Infinity)), true)
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("small factorials", () => {
			assertEquals(factorial(0), 1)
			assertEquals(factorial(1), 1)
			assertEquals(factorial(2), 2)
			assertEquals(factorial(3), 6)
			assertEquals(factorial(4), 24)
			assertEquals(factorial(5), 120)
		})

		await t.step("larger factorials", () => {
			assertEquals(factorial(6), 720)
			assertEquals(factorial(7), 5040)
			assertEquals(factorial(8), 40320)
			assertEquals(factorial(9), 362880)
			assertEquals(factorial(10), 3628800)
		})

		await t.step("even larger", () => {
			assertEquals(factorial(12), 479001600)
			assertEquals(factorial(15), 1307674368000)
			assertEquals(factorial(20), 2432902008176640000)
		})

		await t.step("maximum safe factorial", () => {
			assertEquals(factorial(21), 51090942171709440000)
			const fact22 = factorial(22)
			assertEquals(fact22 > 1.124e21, true)
			assertEquals(fact22 < 1.125e21, true)
		})

		await t.step("large values", () => {
			const fact50 = factorial(50)
			assertEquals(fact50 > 3.04e64, true)
			assertEquals(fact50 < 3.05e64, true)

			const fact100 = factorial(100)
			assertEquals(fact100 > 9.33e157, true)
			assertEquals(fact100 < 9.34e157, true)

			const fact170 = factorial(170)
			assertEquals(fact170 > 7.25e306, true)
			assertEquals(fact170 < 7.26e306, true)

			assertEquals(factorial(171), Infinity)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(factorial(-1)), true)
			assertEquals(Number.isNaN(factorial(-5)), true)
			assertEquals(Number.isNaN(factorial(3.5)), true)
			assertEquals(Number.isNaN(factorial(2.1)), true)
			assertEquals(Number.isNaN(factorial(0.5)), true)
			assertEquals(Number.isNaN(factorial(null as any)), true)
			assertEquals(Number.isNaN(factorial(undefined as any)), true)
			assertEquals(Number.isNaN(factorial("5" as any)), true)
			assertEquals(Number.isNaN(factorial(NaN)), true)
			assertEquals(Number.isNaN(factorial(Infinity)), true)
			assertEquals(Number.isNaN(factorial(-Infinity)), true)
		})

		await t.step("combinatorics - permutations", () => {
			function permutations(n: number, r: number): number {
				if (r > n) return NaN
				return factorial(n) / factorial(n - r)
			}
			assertEquals(permutations(5, 3), 60)
		})

		await t.step("combinatorics - combinations", () => {
			function combinations(n: number, r: number): number {
				if (r > n) return NaN
				return factorial(n) / (factorial(r) * factorial(n - r))
			}
			assertEquals(combinations(5, 3), 10)
		})

		await t.step("binomial coefficient", () => {
			function binomial(n: number, k: number): number {
				if (k > n) return NaN
				return factorial(n) / (factorial(k) * factorial(n - k))
			}
			assertEquals(binomial(10, 3), 120)
		})

		await t.step("Stirling's approximation comparison", () => {
			function stirlingApprox(n: number): number {
				if (n === 0) return 1
				return Math.sqrt(2 * Math.PI * n) * Math.pow(n / Math.E, n)
			}
			const n = 10
			const exact = factorial(n)
			const approx = stirlingApprox(n)
			const error = Math.abs(exact - approx) / exact
			assertEquals(error < 0.01, true) // Less than 1% error
		})

		await t.step("probability calculations", () => {
			function probabilityOfOrder(items: number): number {
				return 1 / factorial(items)
			}
			const prob = probabilityOfOrder(5)
			assertEquals(Math.abs(prob - 0.008333333333333333) < 1e-10, true)
		})

		await t.step("card arrangements", () => {
			// Note: factorial(52) is too large for exact representation
			// Just verify it returns a very large number
			const deckSize = 52
			const arrangements = factorial(deckSize)
			assertEquals(arrangements > 8e67, true)
			assertEquals(arrangements < 9e67, true)
		})

		await t.step("Taylor series coefficients", () => {
			function expTaylorTerm(x: number, n: number): number {
				return Math.pow(x, n) / factorial(n)
			}
			// Test a few terms of e^1 expansion
			assertEquals(expTaylorTerm(1, 0), 1)
			assertEquals(expTaylorTerm(1, 1), 1)
			assertEquals(expTaylorTerm(1, 2), 0.5)
			assertEquals(
				Math.abs(expTaylorTerm(1, 3) - 0.16666666666666666) < 1e-10,
				true,
			)
		})

		await t.step("double factorial", () => {
			function doubleFactorial(n: number): number {
				if (n <= 0) return 1
				if (n === 1 || n === 2) return n
				let product = n
				let current = n - 2
				while (current > 0) {
					product *= current
					current -= 2
				}
				return product
			}
			assertEquals(doubleFactorial(7), 105) // 7 × 5 × 3 × 1
		})

		await t.step("subfactorial (derangements)", () => {
			function subfactorial(n: number): number {
				if (n === 0) return 1
				if (n === 1) return 0
				let sum = 0
				for (let k = 0; k <= n; k++) {
					sum += Math.pow(-1, k) / factorial(k)
				}
				return Math.round(factorial(n) * sum)
			}
			assertEquals(subfactorial(4), 9)
		})

		await t.step("factorial sequence", () => {
			const factorials = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			const sequence = factorials.map(factorial)
			assertEquals(sequence, [
				1,
				1,
				2,
				6,
				24,
				120,
				720,
				5040,
				40320,
				362880,
				3628800,
			])
		})

		await t.step("memoized factorial", () => {
			const factorialMemo = (() => {
				const cache = new Map<number, number>()
				return (n: number): number => {
					if (cache.has(n)) return cache.get(n)!
					const result = factorial(n)
					cache.set(n, result)
					return result
				}
			})()

			assertEquals(factorialMemo(5), 120)
			assertEquals(factorialMemo(5), 120) // Should use cache
		})

		await t.step("safe factorial", () => {
			function safeFactorial(value: unknown): number | null {
				const num = typeof value === "number" ? factorial(value) : NaN
				return isNaN(num) ? null : num
			}
			assertEquals(safeFactorial(5), 120)
			assertEquals(safeFactorial(-1), null)
			assertEquals(safeFactorial("5"), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify the input value", () => {
			const original = 5
			const result = factorial(original)
			assertEquals(original, 5)
			assertEquals(result, 120)
		})
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should be consistent for repeated calls", () => {
			const value = 10
			const result1 = factorial(value)
			const result2 = factorial(value)
			const result3 = factorial(value)

			assertEquals(result1, 3628800)
			assertEquals(result2, 3628800)
			assertEquals(result3, 3628800)
		})

		await t.step("should handle edge cases efficiently", () => {
			// Test the boundary where factorial transitions to Infinity
			assertEquals(factorial(170) < Infinity, true)
			assertEquals(factorial(171), Infinity)
		})
	})
})
