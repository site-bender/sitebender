import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.218.0/testing/bdd.ts"
import * as fc from "npm:fast-check@3.x.x"

import primeFactorization from "../../../../../src/simple/math/primeFactorization/index.ts"

describe("primeFactorization", () => {
	describe("JSDoc examples", () => {
		it("should factorize simple numbers", () => {
			assertEquals(primeFactorization(12), new Map([[2, 2], [3, 1]]))
			assertEquals(primeFactorization(15), new Map([[3, 1], [5, 1]]))
			assertEquals(primeFactorization(24), new Map([[2, 3], [3, 1]]))
		})

		it("should factorize prime numbers", () => {
			assertEquals(primeFactorization(7), new Map([[7, 1]]))
			assertEquals(primeFactorization(13), new Map([[13, 1]]))
			assertEquals(primeFactorization(17), new Map([[17, 1]]))
		})

		it("should factorize perfect powers", () => {
			assertEquals(primeFactorization(8), new Map([[2, 3]]))
			assertEquals(primeFactorization(27), new Map([[3, 3]]))
			assertEquals(primeFactorization(81), new Map([[3, 4]]))
		})

		it("should factorize larger numbers", () => {
			assertEquals(primeFactorization(60), new Map([[2, 2], [3, 1], [5, 1]]))
			assertEquals(primeFactorization(100), new Map([[2, 2], [5, 2]]))
			assertEquals(primeFactorization(360), new Map([[2, 3], [3, 2], [5, 1]]))
		})

		it("should handle edge cases", () => {
			assertEquals(primeFactorization(1), new Map())
			assertEquals(primeFactorization(2), new Map([[2, 1]]))
		})

		it("should handle invalid inputs", () => {
			assertEquals(primeFactorization(0), new Map())
			assertEquals(primeFactorization(-12), new Map())
			assertEquals(primeFactorization(3.5), new Map())
			assertEquals(primeFactorization(null), new Map())
		})

		it("should allow reconstruction of number from factorization", () => {
			const reconstruct = (factors: Map<number, number>): number => {
				let result = 1
				for (const [prime, power] of factors) {
					result *= Math.pow(prime, power)
				}
				return result
			}
			const factors = primeFactorization(60)
			assertEquals(reconstruct(factors), 60)
		})

		it("should count divisors using factorization", () => {
			const countDivisors = (n: number): number => {
				const factors = primeFactorization(n)
				let count = 1
				for (const power of factors.values()) {
					count *= power + 1
				}
				return count
			}
			assertEquals(countDivisors(12), 6)
			assertEquals(countDivisors(24), 8)
		})

		it("should check for perfect squares", () => {
			const isPerfectSquare = (n: number): boolean => {
				const factors = primeFactorization(n)
				for (const power of factors.values()) {
					if (power % 2 !== 0) return false
				}
				return n > 1 // 1 is a perfect square but has no factors
			}
			assertEquals(isPerfectSquare(36), true)
			assertEquals(isPerfectSquare(48), false)
			assertEquals(isPerfectSquare(1), false) // Edge case in example
		})

		it("should compute GCD via factorization", () => {
			const gcdFactors = (a: number, b: number): number => {
				const factorsA = primeFactorization(a)
				const factorsB = primeFactorization(b)
				let result = 1
				for (const [prime, powerA] of factorsA) {
					const powerB = factorsB.get(prime) || 0
					result *= Math.pow(prime, Math.min(powerA, powerB))
				}
				return result
			}
			assertEquals(gcdFactors(12, 18), 6)
		})
	})

	describe("mathematical properties", () => {
		it("should reconstruct the original number from factors", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 10000 }),
					(n) => {
						const factors = primeFactorization(n)
						let reconstructed = 1
						for (const [prime, power] of factors) {
							reconstructed *= Math.pow(prime, power)
						}
						return reconstructed === n
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should return only prime factors", () => {
			const isPrime = (n: number): boolean => {
				if (n < 2) return false
				for (let i = 2; i * i <= n; i++) {
					if (n % i === 0) return false
				}
				return true
			}

			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 10000 }),
					(n) => {
						const factors = primeFactorization(n)
						for (const prime of factors.keys()) {
							if (!isPrime(prime)) {
								return false
							}
						}
						return true
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should have all powers be positive integers", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 10000 }),
					(n) => {
						const factors = primeFactorization(n)
						for (const power of factors.values()) {
							if (!Number.isInteger(power) || power < 1) {
								return false
							}
						}
						return true
					},
				),
				{ numRuns: 1000 },
			)
		})

		it("should produce unique prime factorization (fundamental theorem of arithmetic)", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 1000 }),
					(n) => {
						// Run factorization multiple times
						const factors1 = primeFactorization(n)
						const factors2 = primeFactorization(n)

						// Should produce identical results
						if (factors1.size !== factors2.size) return false

						for (const [prime, power] of factors1) {
							if (factors2.get(prime) !== power) return false
						}
						return true
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should satisfy multiplicative property", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 100 }),
					fc.integer({ min: 2, max: 100 }),
					(a, b) => {
						const factorsA = primeFactorization(a)
						const factorsB = primeFactorization(b)
						const factorsAB = primeFactorization(a * b)

						// Combine factors of a and b
						const combined = new Map<number, number>()
						for (const [prime, power] of factorsA) {
							combined.set(prime, power)
						}
						for (const [prime, power] of factorsB) {
							combined.set(prime, (combined.get(prime) || 0) + power)
						}

						// Should match factorization of a * b
						if (combined.size !== factorsAB.size) return false

						for (const [prime, power] of combined) {
							if (factorsAB.get(prime) !== power) return false
						}
						return true
					},
				),
				{ numRuns: 500 },
			)
		})

		it("should handle prime numbers correctly", () => {
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
				53,
				59,
				61,
				67,
				71,
				73,
				79,
				83,
				89,
				97,
			]
			for (const p of primes) {
				const factors = primeFactorization(p)
				assertEquals(factors.size, 1)
				assertEquals(factors.get(p), 1)
			}
		})

		it("should handle powers of primes correctly", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 2, max: 20 }),
					fc.integer({ min: 1, max: 10 }),
					(prime, exp) => {
						// Check if prime is actually prime
						let isPrime = true
						for (let i = 2; i * i <= prime; i++) {
							if (prime % i === 0) {
								isPrime = false
								break
							}
						}
						if (!isPrime) return true // Skip non-primes

						const n = Math.pow(prime, exp)
						if (n > Number.MAX_SAFE_INTEGER) return true // Skip overflow

						const factors = primeFactorization(n)
						return factors.size === 1 && factors.get(prime) === exp
					},
				),
				{ numRuns: 100 },
			)
		})
	})

	describe("edge cases", () => {
		it("should handle 2 (smallest prime)", () => {
			assertEquals(primeFactorization(2), new Map([[2, 1]]))
		})

		it("should handle 4 (smallest composite)", () => {
			assertEquals(primeFactorization(4), new Map([[2, 2]]))
		})

		it("should handle perfect squares", () => {
			assertEquals(primeFactorization(4), new Map([[2, 2]]))
			assertEquals(primeFactorization(9), new Map([[3, 2]]))
			assertEquals(primeFactorization(16), new Map([[2, 4]]))
			assertEquals(primeFactorization(25), new Map([[5, 2]]))
			assertEquals(primeFactorization(36), new Map([[2, 2], [3, 2]]))
			assertEquals(primeFactorization(49), new Map([[7, 2]]))
		})

		it("should handle highly composite numbers", () => {
			assertEquals(primeFactorization(120), new Map([[2, 3], [3, 1], [5, 1]]))
			assertEquals(primeFactorization(720), new Map([[2, 4], [3, 2], [5, 1]]))
			assertEquals(
				primeFactorization(5040),
				new Map([[2, 4], [3, 2], [5, 1], [7, 1]]),
			)
		})

		it("should handle large primes", () => {
			assertEquals(primeFactorization(997), new Map([[997, 1]]))
			assertEquals(primeFactorization(1009), new Map([[1009, 1]]))
			assertEquals(primeFactorization(7919), new Map([[7919, 1]]))
		})

		it("should handle products of two large primes", () => {
			// RSA-like numbers
			const n = 91 // 7 * 13
			assertEquals(primeFactorization(n), new Map([[7, 1], [13, 1]]))

			const n2 = 403 // 13 * 31
			assertEquals(primeFactorization(n2), new Map([[13, 1], [31, 1]]))
		})

		it("should handle special numeric values", () => {
			assertEquals(primeFactorization(NaN), new Map())
			assertEquals(primeFactorization(Infinity), new Map())
			assertEquals(primeFactorization(-Infinity), new Map())
		})
	})

	describe("error handling", () => {
		it("should return empty Map for 0 and 1", () => {
			assertEquals(primeFactorization(0), new Map())
			assertEquals(primeFactorization(1), new Map())
			assertEquals(primeFactorization(-0), new Map())
		})

		it("should return empty Map for negative numbers", () => {
			fc.assert(
				fc.property(
					fc.integer({ max: -1 }),
					(n) => {
						const factors = primeFactorization(n)
						return factors.size === 0
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should return empty Map for non-integers", () => {
			fc.assert(
				fc.property(
					fc.float({
						min: Math.fround(0.1),
						max: Math.fround(100),
						noNaN: true,
					})
						.filter((x) => !Number.isInteger(x)),
					(n) => {
						const factors = primeFactorization(n)
						return factors.size === 0
					},
				),
				{ numRuns: 100 },
			)
		})

		it("should return empty Map for null and undefined", () => {
			assertEquals(primeFactorization(null), new Map())
			assertEquals(primeFactorization(undefined), new Map())
		})

		it("should return empty Map for non-numeric inputs", () => {
			// @ts-ignore - Testing runtime behavior
			assertEquals(primeFactorization("12"), new Map())
			// @ts-ignore - Testing runtime behavior
			assertEquals(primeFactorization({}), new Map())
			// @ts-ignore - Testing runtime behavior
			assertEquals(primeFactorization([]), new Map())
			// @ts-ignore - Testing runtime behavior
			assertEquals(primeFactorization(true), new Map())
		})
	})

	describe("performance characteristics", () => {
		it("should efficiently handle large numbers", () => {
			const start = performance.now()
			const result = primeFactorization(1000000)
			const end = performance.now()

			// Should complete quickly (under 5ms)
			assertEquals(end - start < 5, true)

			// Verify result: 1000000 = 2^6 * 5^6
			assertEquals(result, new Map([[2, 6], [5, 6]]))
		})

		it("should handle consecutive factorizations efficiently", () => {
			const start = performance.now()
			for (let i = 2; i <= 100; i++) {
				primeFactorization(i)
			}
			const end = performance.now()

			// Should complete all 99 factorizations quickly
			assertEquals(end - start < 10, true)
		})
	})

	describe("applications", () => {
		it("should correctly compute Euler's totient function", () => {
			const totient = (n: number): number => {
				const factors = primeFactorization(n)
				let result = n
				for (const prime of factors.keys()) {
					result = result * (prime - 1) / prime
				}
				return Math.floor(result)
			}

			assertEquals(totient(12), 4) // φ(12) = 4 (1, 5, 7, 11)
			assertEquals(totient(20), 8) // φ(20) = 8
			assertEquals(totient(30), 8) // φ(30) = 8
		})

		it("should correctly compute LCM using factorization", () => {
			const lcmFactors = (a: number, b: number): number => {
				const factorsA = primeFactorization(a)
				const factorsB = primeFactorization(b)
				let result = 1

				// Collect all primes
				const allPrimes = new Set([...factorsA.keys(), ...factorsB.keys()])

				for (const prime of allPrimes) {
					const powerA = factorsA.get(prime) || 0
					const powerB = factorsB.get(prime) || 0
					result *= Math.pow(prime, Math.max(powerA, powerB))
				}
				return result
			}

			assertEquals(lcmFactors(12, 18), 36)
			assertEquals(lcmFactors(15, 20), 60)
		})

		it("should identify square-free numbers", () => {
			const isSquareFree = (n: number): boolean => {
				const factors = primeFactorization(n)
				for (const power of factors.values()) {
					if (power > 1) return false
				}
				return n > 1
			}

			assertEquals(isSquareFree(15), true) // 3 × 5
			assertEquals(isSquareFree(12), false) // 2² × 3
			assertEquals(isSquareFree(30), true) // 2 × 3 × 5
		})
	})
})
