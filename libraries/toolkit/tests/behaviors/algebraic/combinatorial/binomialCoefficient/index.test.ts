import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import binomialCoefficient from "../../../../../src/simple/math/binomialCoefficient/index.ts"

Deno.test("binomialCoefficient: basic functionality", async (t) => {
	await t.step("small values", () => {
		assertEquals(binomialCoefficient(4)(2), 6)
		assertEquals(binomialCoefficient(5)(3), 10)
		assertEquals(binomialCoefficient(6)(2), 15)
		assertEquals(binomialCoefficient(7)(3), 35)
		assertEquals(binomialCoefficient(10)(5), 252)
	})
	
	await t.step("edge cases with k=0", () => {
		assertEquals(binomialCoefficient(0)(0), 1)
		assertEquals(binomialCoefficient(1)(0), 1)
		assertEquals(binomialCoefficient(5)(0), 1)
		assertEquals(binomialCoefficient(100)(0), 1)
	})
	
	await t.step("edge cases with k=n", () => {
		assertEquals(binomialCoefficient(1)(1), 1)
		assertEquals(binomialCoefficient(5)(5), 1)
		assertEquals(binomialCoefficient(10)(10), 1)
		assertEquals(binomialCoefficient(100)(100), 1)
	})
	
	await t.step("pascal's triangle values", () => {
		// Row 0: 1
		assertEquals(binomialCoefficient(0)(0), 1)
		
		// Row 1: 1 1
		assertEquals(binomialCoefficient(1)(0), 1)
		assertEquals(binomialCoefficient(1)(1), 1)
		
		// Row 2: 1 2 1
		assertEquals(binomialCoefficient(2)(0), 1)
		assertEquals(binomialCoefficient(2)(1), 2)
		assertEquals(binomialCoefficient(2)(2), 1)
		
		// Row 3: 1 3 3 1
		assertEquals(binomialCoefficient(3)(0), 1)
		assertEquals(binomialCoefficient(3)(1), 3)
		assertEquals(binomialCoefficient(3)(2), 3)
		assertEquals(binomialCoefficient(3)(3), 1)
		
		// Row 4: 1 4 6 4 1
		assertEquals(binomialCoefficient(4)(0), 1)
		assertEquals(binomialCoefficient(4)(1), 4)
		assertEquals(binomialCoefficient(4)(2), 6)
		assertEquals(binomialCoefficient(4)(3), 4)
		assertEquals(binomialCoefficient(4)(4), 1)
		
		// Row 5: 1 5 10 10 5 1
		assertEquals(binomialCoefficient(5)(0), 1)
		assertEquals(binomialCoefficient(5)(1), 5)
		assertEquals(binomialCoefficient(5)(2), 10)
		assertEquals(binomialCoefficient(5)(3), 10)
		assertEquals(binomialCoefficient(5)(4), 5)
		assertEquals(binomialCoefficient(5)(5), 1)
	})
	
	await t.step("larger values", () => {
		assertEquals(binomialCoefficient(20)(10), 184756)
		assertEquals(binomialCoefficient(30)(15), 155117520)
		assertEquals(binomialCoefficient(49)(6), 13983816) // Lottery
		assertEquals(binomialCoefficient(52)(5), 2598960) // Poker hands
	})
})

Deno.test("binomialCoefficient: mathematical properties", () => {
	// Symmetry property: C(n,k) = C(n,n-k)
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 30 }),
			fc.integer({ min: 0, max: 30 }),
			(n, k) => {
				if (k > n) return true // Skip invalid cases
				const left = binomialCoefficient(n)(k)
				const right = binomialCoefficient(n)(n - k)
				return left === right
			}
		),
		{ numRuns: 500 }
	)
	
	// Pascal's triangle recurrence: C(n,k) = C(n-1,k-1) + C(n-1,k)
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 20 }),
			fc.integer({ min: 1, max: 20 }),
			(n, k) => {
				if (k > n) return true // Skip invalid cases
				const current = binomialCoefficient(n)(k)
				const left = binomialCoefficient(n - 1)(k - 1)
				const right = binomialCoefficient(n - 1)(k)
				
				// Handle edge case where k = n
				if (k === n) {
					return current === binomialCoefficient(n - 1)(k - 1)
				}
				
				return current === left + right
			}
		),
		{ numRuns: 500 }
	)
	
	// Sum of row n equals 2^n
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 20 }),
			(n) => {
				let sum = 0
				for (let k = 0; k <= n; k++) {
					sum += binomialCoefficient(n)(k)
				}
				return sum === Math.pow(2, n)
			}
		),
		{ numRuns: 100 }
	)
	
	// C(n,k) * k! * (n-k)! = n!
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 12 }), // Limited due to factorial size
			fc.integer({ min: 0, max: 12 }),
			(n, k) => {
				if (k > n) return true // Skip invalid cases
				
				const coefficient = binomialCoefficient(n)(k)
				
				// Calculate factorials
				const factorial = (x: number): number => {
					if (x <= 1) return 1
					let result = 1
					for (let i = 2; i <= x; i++) {
						result *= i
					}
					return result
				}
				
				const nFact = factorial(n)
				const kFact = factorial(k)
				const nMinusKFact = factorial(n - k)
				
				// Due to floating point precision, use approximate comparison
				const calculated = coefficient * kFact * nMinusKFact
				return Math.abs(calculated - nFact) < 0.0001 * nFact
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("binomialCoefficient: error handling", () => {
	// Invalid k > n
	assertEquals(Number.isNaN(binomialCoefficient(3)(5)), true)
	assertEquals(Number.isNaN(binomialCoefficient(10)(15)), true)
	assertEquals(Number.isNaN(binomialCoefficient(0)(1)), true)
	
	// Negative values
	assertEquals(Number.isNaN(binomialCoefficient(-1)(0)), true)
	assertEquals(Number.isNaN(binomialCoefficient(5)(-1)), true)
	assertEquals(Number.isNaN(binomialCoefficient(-5)(-3)), true)
	
	// Non-integer values
	assertEquals(Number.isNaN(binomialCoefficient(5.5)(2)), true)
	assertEquals(Number.isNaN(binomialCoefficient(5)(2.5)), true)
	assertEquals(Number.isNaN(binomialCoefficient(5.5)(2.5)), true)
	assertEquals(Number.isNaN(binomialCoefficient(Math.PI)(2)), true)
	
	// Special values
	assertEquals(Number.isNaN(binomialCoefficient(Infinity)(5)), true)
	assertEquals(Number.isNaN(binomialCoefficient(5)(Infinity)), true)
	assertEquals(Number.isNaN(binomialCoefficient(NaN)(5)), true)
	assertEquals(Number.isNaN(binomialCoefficient(5)(NaN)), true)
	
	// Invalid types
	assertEquals(Number.isNaN(binomialCoefficient(null)(5)), true)
	assertEquals(Number.isNaN(binomialCoefficient(5)(undefined)), true)
	assertEquals(Number.isNaN(binomialCoefficient("5" as any)(2)), true)
	assertEquals(Number.isNaN(binomialCoefficient(5)("2" as any)), true)
})

Deno.test("binomialCoefficient: JSDoc examples", async (t) => {
	await t.step("pascal's triangle values", () => {
		assertEquals(binomialCoefficient(4)(2), 6)
		assertEquals(binomialCoefficient(5)(3), 10)
		assertEquals(binomialCoefficient(10)(5), 252)
	})
	
	await t.step("edge cases", () => {
		assertEquals(binomialCoefficient(5)(0), 1)
		assertEquals(binomialCoefficient(5)(5), 1)
		assertEquals(binomialCoefficient(0)(0), 1)
	})
	
	await t.step("invalid cases", () => {
		assertEquals(Number.isNaN(binomialCoefficient(3)(5)), true)
		assertEquals(Number.isNaN(binomialCoefficient(-2)(1)), true)
		assertEquals(Number.isNaN(binomialCoefficient(5)(-1)), true)
		assertEquals(Number.isNaN(binomialCoefficient(5.5)(2)), true)
	})
	
	await t.step("probability calculations", () => {
		const ways = binomialCoefficient(5)(3)
		assertEquals(ways, 10)
		const probability = ways / Math.pow(2, 5)
		assertEquals(probability, 0.3125)
	})
	
	await t.step("lottery combinations", () => {
		assertEquals(binomialCoefficient(49)(6), 13983816)
	})
	
	await t.step("pascal's triangle row", () => {
		const row5 = [0, 1, 2, 3, 4, 5].map(k => binomialCoefficient(5)(k))
		assertEquals(row5, [1, 5, 10, 10, 5, 1])
	})
	
	await t.step("binomial expansion coefficients", () => {
		const coefficients = [0, 1, 2, 3, 4].map(k => binomialCoefficient(4)(k))
		assertEquals(coefficients, [1, 4, 6, 4, 1])
	})
	
	await t.step("partial application", () => {
		const choose5 = binomialCoefficient(5)
		assertEquals(choose5(0), 1)
		assertEquals(choose5(1), 5)
		assertEquals(choose5(2), 10)
		assertEquals(choose5(3), 10)
	})
})

Deno.test("binomialCoefficient: property-based testing", () => {
	// Result is always a positive integer for valid inputs
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 50 }),
			fc.integer({ min: 0, max: 50 }),
			(n, k) => {
				if (k > n) return true // Skip invalid cases
				const result = binomialCoefficient(n)(k)
				return Number.isInteger(result) && result > 0
			}
		),
		{ numRuns: 1000 }
	)
	
	// C(n,k) <= C(n, floor(n/2)) (maximum is at middle)
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 30 }),
			fc.integer({ min: 0, max: 30 }),
			(n, k) => {
				if (k > n) return true // Skip invalid cases
				const result = binomialCoefficient(n)(k)
				const middle = binomialCoefficient(n)(Math.floor(n / 2))
				return result <= middle
			}
		),
		{ numRuns: 500 }
	)
	
	// Monotonicity: C(n,k) increases then decreases as k goes from 0 to n
	fc.assert(
		fc.property(
			fc.integer({ min: 2, max: 20 }),
			(n) => {
				const values = []
				for (let k = 0; k <= n; k++) {
					values.push(binomialCoefficient(n)(k))
				}
				
				// Find the peak
				let peakIndex = 0
				for (let i = 1; i < values.length; i++) {
					if (values[i] > values[peakIndex]) {
						peakIndex = i
					}
				}
				
				// Check monotone increasing before peak
				for (let i = 1; i <= peakIndex; i++) {
					if (values[i] < values[i - 1]) return false
				}
				
				// Check monotone decreasing after peak
				for (let i = peakIndex + 1; i < values.length; i++) {
					if (values[i] > values[i - 1]) return false
				}
				
				return true
			}
		),
		{ numRuns: 100 }
	)
	
	// Consistency: same input always produces same output
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 100 }),
			fc.integer({ min: 0, max: 100 }),
			(n, k) => {
				const result1 = binomialCoefficient(n)(k)
				const result2 = binomialCoefficient(n)(k)
				return Object.is(result1, result2)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("binomialCoefficient: currying and partial application", () => {
	// Create partially applied functions
	const choose10 = binomialCoefficient(10)
	assertEquals(choose10(0), 1)
	assertEquals(choose10(1), 10)
	assertEquals(choose10(2), 45)
	assertEquals(choose10(3), 120)
	assertEquals(choose10(4), 210)
	assertEquals(choose10(5), 252)
	
	// Use with array methods
	const n = 7
	const coefficients = Array.from({ length: n + 1 }, (_, k) => k)
		.map(binomialCoefficient(n))
	assertEquals(coefficients, [1, 7, 21, 35, 35, 21, 7, 1])
	
	// Compose with other functions
	const probabilityOfKHeads = (n: number) => (k: number): number => {
		return binomialCoefficient(n)(k) / Math.pow(2, n)
	}
	
	const prob5Flips = probabilityOfKHeads(5)
	assertEquals(prob5Flips(0), 0.03125) // P(0 heads)
	assertEquals(prob5Flips(1), 0.15625) // P(1 head)
	assertEquals(prob5Flips(2), 0.3125)  // P(2 heads)
	assertEquals(prob5Flips(3), 0.3125)  // P(3 heads)
})

Deno.test("binomialCoefficient: performance and precision", () => {
	// Test that large values are calculated correctly
	assertEquals(binomialCoefficient(40)(20), 137846528820)
	
	// Test precision for values that could cause overflow with naive factorial
	assertEquals(binomialCoefficient(50)(25), 126410606437752)
	
	// Test that optimization works (C(n,k) = C(n,n-k))
	const n = 100
	const k = 95
	const start1 = performance.now()
	const result1 = binomialCoefficient(n)(k)
	const time1 = performance.now() - start1
	
	const start2 = performance.now()
	const result2 = binomialCoefficient(n)(n - k) // Should use k=5 internally
	const time2 = performance.now() - start2
	
	assertEquals(result1, result2)
	// The optimized version should be roughly as fast or faster
	assertEquals(time2 <= time1 * 2, true, `Optimization failed: ${time2}ms vs ${time1}ms`)
})

Deno.test("binomialCoefficient: boundary values", () => {
	// Test with n=0
	assertEquals(binomialCoefficient(0)(0), 1)
	
	// Test with large n, small k
	assertEquals(binomialCoefficient(1000)(1), 1000)
	assertEquals(binomialCoefficient(1000)(2), 499500)
	
	// Test with large n, k close to n
	assertEquals(binomialCoefficient(1000)(999), 1000)
	assertEquals(binomialCoefficient(1000)(998), 499500)
	
	// Test maximum safe integer handling
	// C(100, 50) is very large but should still be calculable
	const large = binomialCoefficient(100)(50)
	assertEquals(Number.isFinite(large), true)
	assertEquals(large > 0, true)
})