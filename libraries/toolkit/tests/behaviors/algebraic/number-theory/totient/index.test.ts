import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.218.0/testing/bdd.ts"
import * as fc from "npm:fast-check@3.x.x"

import divisors from "../../../../../src/simple/math/divisors/index.ts"
import gcd from "../../../../../src/simple/math/gcd/index.ts"
import primeFactorization from "../../../../../src/simple/math/primeFactorization/index.ts"
import totient from "../../../../../src/simple/math/totient/index.ts"

describe("totient", () => {
	describe("JSDoc examples", () => {
		it("should calculate totient for prime numbers", () => {
			assertEquals(totient(7), 6)
			assertEquals(totient(11), 10)
			assertEquals(totient(13), 12)
		})

		it("should calculate totient for composite numbers", () => {
			assertEquals(totient(9), 6)
			assertEquals(totient(10), 4)
			assertEquals(totient(12), 4)
		})

		it("should calculate totient for powers of primes", () => {
			assertEquals(totient(8), 4) // 2^3: φ(8) = 8 - 4 = 4
			assertEquals(totient(25), 20) // 5^2: φ(25) = 25 - 5 = 20
		})

		it("should handle special cases", () => {
			assertEquals(totient(1), 1)
			assertEquals(totient(2), 1)
		})

		it("should handle invalid inputs", () => {
			assertEquals(Number.isNaN(totient(0)), true)
			assertEquals(Number.isNaN(totient(-5)), true)
			assertEquals(Number.isNaN(totient(3.5)), true)
			assertEquals(Number.isNaN(totient(null)), true)
		})

		it("should work for RSA cryptography", () => {
			const p = 11, q = 13
			const n = p * q // 143
			const phiN = totient(n)
			assertEquals(phiN, 120) // (11-1) * (13-1)
		})

		it("should count reduced fractions", () => {
			const n = 6
			const phi = totient(n)
			assertEquals(phi, 2) // 1/6 and 5/6 are in lowest terms
		})

		it("should satisfy sum property for divisors", () => {
			const divisorsOf12 = [1, 2, 3, 4, 6, 12]
			const sum = divisorsOf12.map(totient).reduce((a, b) => a + b, 0)
			assertEquals(sum, 12)
		})
	})

	describe("mathematical properties", () => {
		it("should equal n-1 for prime numbers", () => {
			const isPrime = (n: number): boolean => {
				if (n < 2) return false
				for (let i = 2; i * i <= n; i++) {
					if (n % i === 0) return false
				}
				return true
			}

			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 1000 }),
					(n) => {
						if (!isPrime(n)) return true // Skip non-primes
						return totient(n) === n - 1
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should correctly count coprime numbers", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					(n) => {
						const phi = totient(n)
						let count = 0
						for (let i = 1; i <= n; i++) {
							if (gcd(i)(n) === 1) {
								count++
							}
						}
						return phi === count
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should be multiplicative for coprime numbers", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					fc.integer({ min: 1, max: 100 }),
					(a, b) => {
						// Only test coprime pairs
						if (gcd(a)(b) !== 1) return true

						const phiA = totient(a)
						const phiB = totient(b)
						const phiAB = totient(a * b)

						return phiAB === phiA * phiB
					},
				),
				{ numRuns: 500 },
			)
		})

		it("should satisfy the sum of divisors property", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					(n) => {
						const divs = divisors(n)
						const sum = divs.map((d) => totient(d)).reduce((a, b) => a + b, 0)
						return sum === n
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should follow the formula for prime powers", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 20 }),
					fc.integer({ min: 1, max: 5 }),
					(p, k) => {
						// Check if p is prime
						let isPrime = true
						for (let i = 2; i * i <= p; i++) {
							if (p % i === 0) {
								isPrime = false
								break
							}
						}
						if (!isPrime) return true // Skip non-primes

						const n = Math.pow(p, k)
						if (n > Number.MAX_SAFE_INTEGER) return true // Skip overflow

						const phi = totient(n)
						const expected = Math.pow(p, k) - Math.pow(p, k - 1)

						return phi === expected
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should satisfy totient chain properties", () => {
			// φ(φ(n)) eventually reaches 1
			const totientChain = (n: number): number => {
				let current = n
				let steps = 0
				const maxSteps = 100

				while (current > 1 && steps < maxSteps) {
					current = totient(current)
					steps++
				}

				return current
			}

			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 1000 }),
					(n) => {
						return totientChain(n) === 1
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should be less than or equal to n-1", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 10000 }),
					(n) => {
						const phi = totient(n)
						return phi <= n - 1
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should be even for n > 2", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 3, max: 10000 }),
					(n) => {
						const phi = totient(n)
						return phi % 2 === 0
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	describe("edge cases", () => {
		it("should handle small numbers", () => {
			assertEquals(totient(1), 1)
			assertEquals(totient(2), 1)
			assertEquals(totient(3), 2)
			assertEquals(totient(4), 2)
			assertEquals(totient(5), 4)
			assertEquals(totient(6), 2)
		})

		it("should handle powers of 2", () => {
			assertEquals(totient(2), 1) // 2^1
			assertEquals(totient(4), 2) // 2^2
			assertEquals(totient(8), 4) // 2^3
			assertEquals(totient(16), 8) // 2^4
			assertEquals(totient(32), 16) // 2^5
			assertEquals(totient(64), 32) // 2^6
		})

		it("should handle perfect squares", () => {
			assertEquals(totient(4), 2) // 2^2
			assertEquals(totient(9), 6) // 3^2
			assertEquals(totient(25), 20) // 5^2
			assertEquals(totient(49), 42) // 7^2
			assertEquals(totient(121), 110) // 11^2
		})

		it("should handle highly composite numbers", () => {
			assertEquals(totient(24), 8) // 2^3 * 3
			assertEquals(totient(60), 16) // 2^2 * 3 * 5
			assertEquals(totient(120), 32) // 2^3 * 3 * 5
			assertEquals(totient(360), 96) // 2^3 * 3^2 * 5
		})

		it("should handle products of two primes", () => {
			assertEquals(totient(6), 2) // 2 * 3: (2-1)(3-1) = 2
			assertEquals(totient(15), 8) // 3 * 5: (3-1)(5-1) = 8
			assertEquals(totient(21), 12) // 3 * 7: (3-1)(7-1) = 12
			assertEquals(totient(35), 24) // 5 * 7: (5-1)(7-1) = 24
		})

		it("should handle large primes", () => {
			assertEquals(totient(97), 96)
			assertEquals(totient(101), 100)
			assertEquals(totient(997), 996)
		})

		it("should handle special numeric values", () => {
			assertEquals(Number.isNaN(totient(NaN)), true)
			assertEquals(Number.isNaN(totient(Infinity)), true)
			assertEquals(Number.isNaN(totient(-Infinity)), true)
		})
	})

	describe("error handling", () => {
		it("should return NaN for zero", () => {
			assertEquals(Number.isNaN(totient(0)), true)
			assertEquals(Number.isNaN(totient(-0)), true)
		})

		it("should return NaN for negative numbers", () => {
			fc.assert(
				fc.property(
					fc.integer({ max: -1 }),
					(n) => {
						return Number.isNaN(totient(n))
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should return NaN for non-integers", () => {
			fc.assert(
				fc.property(
					fc.float({
						min: Math.fround(0.1),
						max: Math.fround(100),
						noNaN: true,
					})
						.filter((x) => !Number.isInteger(x)),
					(n) => {
						return Number.isNaN(totient(n))
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should return NaN for null and undefined", () => {
			assertEquals(Number.isNaN(totient(null)), true)
			assertEquals(Number.isNaN(totient(undefined)), true)
		})

		it("should return NaN for non-numeric inputs", () => {
			// @ts-ignore - Testing runtime behavior
			assertEquals(Number.isNaN(totient("12")), true)
			// @ts-ignore - Testing runtime behavior
			assertEquals(Number.isNaN(totient({})), true)
			// @ts-ignore - Testing runtime behavior
			assertEquals(Number.isNaN(totient([])), true)
			// @ts-ignore - Testing runtime behavior
			assertEquals(Number.isNaN(totient(true)), true)
		})
	})

	describe("performance characteristics", () => {
		it("should efficiently handle large numbers", () => {
			const start = performance.now()
			const result = totient(1000000)
			const end = performance.now()

			// Should complete quickly (under 5ms)
			assertEquals(end - start < 5, true)

			// Verify result using prime factorization method
			// 1000000 = 2^6 * 5^6
			// φ(1000000) = 1000000 * (1 - 1/2) * (1 - 1/5) = 1000000 * 1/2 * 4/5 = 400000
			assertEquals(result, 400000)
		})

		it("should handle consecutive calculations efficiently", () => {
			const start = performance.now()
			for (let i = 1; i <= 100; i++) {
				totient(i)
			}
			const end = performance.now()

			// Should complete all 100 calculations quickly
			assertEquals(end - start < 10, true)
		})
	})

	describe("applications", () => {
		it("should work for RSA key generation", () => {
			// Small RSA example
			const p = 61
			const q = 53
			const n = p * q // 3233
			const phiN = totient(n)
			const expected = (p - 1) * (q - 1) // 3120
			assertEquals(phiN, expected)
		})

		it("should identify numbers with high totient ratio", () => {
			// Numbers where φ(n)/n is close to 1 are mostly prime
			const totientRatio = (n: number): number => totient(n) / n

			// Primes have ratio (p-1)/p
			assertEquals(totientRatio(97) > 0.98, true)

			// Highly composite numbers have lower ratios
			assertEquals(totientRatio(30) < 0.3, true) // φ(30) = 8, ratio = 8/30 ≈ 0.267
		})

		it("should help count irreducible fractions", () => {
			// Count fractions in (0,1) with denominator n in lowest terms
			const countIrreducibleFractions = (n: number): number => {
				// These are k/n where gcd(k,n) = 1 and 0 < k < n
				// This equals φ(n)
				return totient(n)
			}

			assertEquals(countIrreducibleFractions(6), 2) // 1/6, 5/6
			assertEquals(countIrreducibleFractions(8), 4) // 1/8, 3/8, 5/8, 7/8
		})

		it("should verify Euler's theorem for small values", () => {
			// If gcd(a,n) = 1, then a^φ(n) ≡ 1 (mod n)
			const verifyEulerTheorem = (a: number, n: number): boolean => {
				if (gcd(a)(n) !== 1) return true // Skip non-coprime pairs

				const phi = totient(n)
				// Calculate a^phi mod n
				let result = 1
				let base = a % n
				let exp = phi

				while (exp > 0) {
					if (exp % 2 === 1) {
						result = (result * base) % n
					}
					base = (base * base) % n
					exp = Math.floor(exp / 2)
				}

				return result === 1
			}

			// Test small values
			assertEquals(verifyEulerTheorem(3, 7), true)
			assertEquals(verifyEulerTheorem(5, 12), true)
			assertEquals(verifyEulerTheorem(7, 10), true)
		})
	})

	describe("consistency with prime factorization", () => {
		it("should match calculation from prime factorization", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 1000 }),
					(n) => {
						const phi1 = totient(n)

						// Calculate using prime factorization
						const factors = primeFactorization(n)
						let phi2 = n
						for (const prime of factors.keys()) {
							phi2 = phi2 * (prime - 1) / prime
						}
						phi2 = Math.floor(phi2)

						return phi1 === phi2
					},
				),
				{ numRuns: 500 },
			)
		})
	})
})
