import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.218.0/testing/bdd.ts"
import * as fc from "npm:fast-check@3.x.x"

import divisors from "../../../../../src/simple/math/divisors/index.ts"

describe("divisors", () => {
	describe("JSDoc examples", () => {
		it("should find divisors of small numbers", () => {
			assertEquals(divisors(1), [1])
			assertEquals(divisors(6), [1, 2, 3, 6])
			assertEquals(divisors(12), [1, 2, 3, 4, 6, 12])
			assertEquals(divisors(15), [1, 3, 5, 15])
		})

		it("should find divisors of prime numbers", () => {
			assertEquals(divisors(7), [1, 7])
			assertEquals(divisors(13), [1, 13])
			assertEquals(divisors(17), [1, 17])
		})

		it("should find divisors of perfect squares", () => {
			assertEquals(divisors(9), [1, 3, 9])
			assertEquals(divisors(16), [1, 2, 4, 8, 16])
			assertEquals(divisors(25), [1, 5, 25])
		})

		it("should find divisors of highly composite numbers", () => {
			assertEquals(divisors(24), [1, 2, 3, 4, 6, 8, 12, 24])
			assertEquals(divisors(36), [1, 2, 3, 4, 6, 9, 12, 18, 36])
			assertEquals(divisors(60), [
				1,
				2,
				3,
				4,
				5,
				6,
				10,
				12,
				15,
				20,
				30,
				60,
			])
		})

		it("should handle invalid inputs", () => {
			assertEquals(divisors(0), [])
			assertEquals(divisors(-6), [])
			assertEquals(divisors(3.5), [])
			assertEquals(divisors(null), [])
		})

		it("should work for perfect number check", () => {
			const isPerfect = (n: number): boolean => {
				const divs = divisors(n)
				const properDivisors = divs.slice(0, -1)
				const sum = properDivisors.reduce((a, b) => a + b, 0)
				return sum === n
			}
			assertEquals(isPerfect(6), true)
			assertEquals(isPerfect(28), true)
			assertEquals(isPerfect(12), false)
		})

		it("should work for tau function (divisor count)", () => {
			const tau = (n: number): number => divisors(n).length
			assertEquals(tau(12), 6)
			assertEquals(tau(24), 8)
		})

		it("should work for sigma function (divisor sum)", () => {
			const sigma = (n: number): number =>
				divisors(n).reduce((a, b) => a + b, 0)
			assertEquals(sigma(12), 28)
		})

		it("should work for abundant number check", () => {
			const isAbundant = (n: number): boolean => {
				const divs = divisors(n)
				const properSum = divs.slice(0, -1).reduce((a, b) => a + b, 0)
				return properSum > n
			}
			assertEquals(isAbundant(12), true)
			assertEquals(isAbundant(10), false)
		})
	})

	describe("mathematical properties", () => {
		it("should always include 1 and n for positive integers", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10000 }),
					(n) => {
						const divs = divisors(n)
						return divs.includes(1) && divs.includes(n)
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should return sorted divisors in ascending order", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10000 }),
					(n) => {
						const divs = divisors(n)
						for (let i = 1; i < divs.length; i++) {
							if (divs[i] <= divs[i - 1]) {
								return false
							}
						}
						return true
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should verify all returned values are actual divisors", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10000 }),
					(n) => {
						const divs = divisors(n)
						return divs.every((d) => n % d === 0)
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should find all divisors (no missing divisors)", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 1000 }),
					(n) => {
						const divs = divisors(n)
						// Check that no divisor is missing
						for (let i = 1; i <= n; i++) {
							if (n % i === 0 && !divs.includes(i)) {
								return false
							}
						}
						return true
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should have exactly 2 divisors for prime numbers", () => {
			const primes = [
				2,
				3,
				5,
				7,
				11,
				13,
				17,
				19,
				23,
				29,
				31,
				37,
				41,
				43,
				47,
			]
			for (const p of primes) {
				const divs = divisors(p)
				assertEquals(divs.length, 2)
				assertEquals(divs, [1, p])
			}
		})

		it("should have odd number of divisors for perfect squares", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					(n) => {
						const square = n * n
						const divs = divisors(square)
						return divs.length % 2 === 1
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should satisfy multiplicative property for coprime numbers", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					fc.integer({ min: 1, max: 100 }),
					(a, b) => {
						// GCD function to check coprimality
						const gcd = (x: number, y: number): number => {
							while (y !== 0) {
								const temp = y
								y = x % y
								x = temp
							}
							return x
						}

						// Only test coprime pairs
						if (gcd(a, b) !== 1) return true

						const divsA = divisors(a)
						const divsB = divisors(b)
						const divsAB = divisors(a * b)

						// Number of divisors should multiply for coprime numbers
						return divsAB.length === divsA.length * divsB.length
					},
				),
				{ numRuns: 500 },
			)
		})

		it("should have power of 2 divisors for powers of 2", () => {
			for (let exp = 0; exp <= 10; exp++) {
				const n = Math.pow(2, exp)
				const divs = divisors(n)
				// Powers of 2 have divisors: 1, 2, 4, 8, ..., 2^exp
				assertEquals(divs.length, exp + 1)
				for (let i = 0; i <= exp; i++) {
					assertEquals(divs[i], Math.pow(2, i))
				}
			}
		})
	})

	describe("edge cases", () => {
		it("should handle 1 correctly", () => {
			assertEquals(divisors(1), [1])
		})

		it("should handle 2 (smallest prime)", () => {
			assertEquals(divisors(2), [1, 2])
		})

		it("should handle large numbers", () => {
			assertEquals(divisors(100), [1, 2, 4, 5, 10, 20, 25, 50, 100])
			assertEquals(divisors(1000), [
				1,
				2,
				4,
				5,
				8,
				10,
				20,
				25,
				40,
				50,
				100,
				125,
				200,
				250,
				500,
				1000,
			])
		})

		it("should handle perfect numbers", () => {
			assertEquals(divisors(6), [1, 2, 3, 6])
			assertEquals(divisors(28), [1, 2, 4, 7, 14, 28])
			assertEquals(divisors(496), [1, 2, 4, 8, 16, 31, 62, 124, 248, 496])
		})

		it("should handle factorial numbers (many divisors)", () => {
			// 6! = 720
			const divs720 = divisors(720)
			assertEquals(divs720.length, 30)
			assertEquals(divs720[0], 1)
			assertEquals(divs720[divs720.length - 1], 720)
		})

		it("should handle special numeric values", () => {
			assertEquals(divisors(NaN), [])
			assertEquals(divisors(Infinity), [])
			assertEquals(divisors(-Infinity), [])
		})
	})

	describe("error handling", () => {
		it("should return empty array for zero", () => {
			assertEquals(divisors(0), [])
			assertEquals(divisors(-0), [])
		})

		it("should return empty array for negative numbers", () => {
			fc.assert(
				fc.property(
					fc.integer({ max: -1 }),
					(n) => {
						return divisors(n).length === 0
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should return empty array for non-integers", () => {
			fc.assert(
				fc.property(
					fc.float({
						min: Math.fround(0.1),
						max: Math.fround(100),
						noNaN: true,
					})
						.filter((x) => !Number.isInteger(x)),
					(n) => {
						return divisors(n).length === 0
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should return empty array for null and undefined", () => {
			assertEquals(divisors(null), [])
			assertEquals(divisors(undefined), [])
		})

		it("should return empty array for non-numeric inputs", () => {
			// @ts-ignore - Testing runtime behavior
			assertEquals(divisors("12"), [])
			// @ts-ignore - Testing runtime behavior
			assertEquals(divisors({}), [])
			// @ts-ignore - Testing runtime behavior
			assertEquals(divisors([]), [])
			// @ts-ignore - Testing runtime behavior
			assertEquals(divisors(true), [])
		})
	})

	describe("performance characteristics", () => {
		it("should efficiently handle large numbers", () => {
			// Test that algorithm is efficient (O(√n))
			const start = performance.now()
			const result = divisors(1000000)
			const end = performance.now()

			// Should complete quickly (under 10ms for 1 million)
			assertEquals(end - start < 10, true)

			// Verify result is correct
			assertEquals(result.length, 49)
			assertEquals(result[0], 1)
			assertEquals(result[result.length - 1], 1000000)
		})

		it("should handle perfect squares efficiently", () => {
			// Perfect squares are a special case in the algorithm
			const squares = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144]
			for (const sq of squares) {
				const divs = divisors(sq)
				const sqrt = Math.sqrt(sq)
				// Should include sqrt exactly once
				const sqrtCount = divs.filter((d) => d === sqrt).length
				assertEquals(sqrtCount, 1)
			}
		})
	})

	describe("divisor patterns", () => {
		it("should correctly identify highly composite numbers", () => {
			// First few highly composite numbers and their divisor counts
			const highlyComposite = [
				{ n: 1, count: 1 },
				{ n: 2, count: 2 },
				{ n: 4, count: 3 },
				{ n: 6, count: 4 },
				{ n: 12, count: 6 },
				{ n: 24, count: 8 },
				{ n: 36, count: 9 },
				{ n: 48, count: 10 },
				{ n: 60, count: 12 },
				{ n: 120, count: 16 },
			]

			for (const { n, count } of highlyComposite) {
				assertEquals(divisors(n).length, count)
			}
		})

		it("should satisfy sum of divisors formula for prime powers", () => {
			// For p^k, sigma(p^k) = (p^(k+1) - 1) / (p - 1)
			const checkPrimePower = (p: number, k: number) => {
				const n = Math.pow(p, k)
				const divs = divisors(n)
				const actualSum = divs.reduce((a, b) => a + b, 0)
				const expectedSum = (Math.pow(p, k + 1) - 1) / (p - 1)
				return Math.abs(actualSum - expectedSum) < 0.001
			}

			assertEquals(checkPrimePower(2, 3), true) // 8
			assertEquals(checkPrimePower(3, 2), true) // 9
			assertEquals(checkPrimePower(5, 2), true) // 25
			assertEquals(checkPrimePower(7, 1), true) // 7
		})
	})
})
