import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import permutations from "../../../../../src/simple/math/permutations/index.ts"

Deno.test("permutations: basic functionality", async (t) => {
	await t.step("basic permutations", () => {
		assertEquals(permutations(5)(3), 60)
		assertEquals(permutations(4)(2), 12)
		assertEquals(permutations(10)(4), 5040)
		assertEquals(permutations(6)(3), 120)
		assertEquals(permutations(7)(2), 42)
	})
	
	await t.step("edge cases with r=0", () => {
		assertEquals(permutations(5)(0), 1)
		assertEquals(permutations(0)(0), 1)
		assertEquals(permutations(100)(0), 1)
		assertEquals(permutations(1)(0), 1)
	})
	
	await t.step("edge cases with r=1", () => {
		assertEquals(permutations(5)(1), 5)
		assertEquals(permutations(10)(1), 10)
		assertEquals(permutations(100)(1), 100)
		assertEquals(permutations(1)(1), 1)
	})
	
	await t.step("edge cases with r=n (full permutation)", () => {
		assertEquals(permutations(5)(5), 120) // 5!
		assertEquals(permutations(4)(4), 24)  // 4!
		assertEquals(permutations(3)(3), 6)   // 3!
		assertEquals(permutations(6)(6), 720) // 6!
		assertEquals(permutations(1)(1), 1)   // 1!
	})
	
	await t.step("practical examples", () => {
		// Race positions: gold, silver, bronze from 8 runners
		assertEquals(permutations(8)(3), 336)
		
		// 4-letter arrangements from alphabet (no repeats)
		assertEquals(permutations(26)(4), 358800)
		
		// Seating: 5 people in 10 chairs
		assertEquals(permutations(10)(5), 30240)
		
		// 3-letter license plates (no repeats)
		assertEquals(permutations(26)(3), 15600)
		
		// Tournament top 4 from 16 teams
		assertEquals(permutations(16)(4), 43680)
	})
	
	await t.step("partial application", () => {
		const arrangeFrom10 = permutations(10)
		assertEquals(arrangeFrom10(1), 10)
		assertEquals(arrangeFrom10(2), 90)
		assertEquals(arrangeFrom10(3), 720)
		assertEquals(arrangeFrom10(4), 5040)
		assertEquals(arrangeFrom10(5), 30240)
	})
	
	await t.step("sequential values", () => {
		// P(5,0) through P(5,5)
		assertEquals(permutations(5)(0), 1)
		assertEquals(permutations(5)(1), 5)
		assertEquals(permutations(5)(2), 20)
		assertEquals(permutations(5)(3), 60)
		assertEquals(permutations(5)(4), 120)
		assertEquals(permutations(5)(5), 120)
	})
})

Deno.test("permutations: invalid inputs", async (t) => {
	await t.step("r greater than n", () => {
		assertEquals(Number.isNaN(permutations(3)(5)), true)
		assertEquals(Number.isNaN(permutations(10)(11)), true)
		assertEquals(Number.isNaN(permutations(0)(1)), true)
	})
	
	await t.step("negative values", () => {
		assertEquals(Number.isNaN(permutations(-1)(2)), true)
		assertEquals(Number.isNaN(permutations(5)(-2)), true)
		assertEquals(Number.isNaN(permutations(-5)(-2)), true)
	})
	
	await t.step("non-integer values", () => {
		assertEquals(Number.isNaN(permutations(5.5)(2)), true)
		assertEquals(Number.isNaN(permutations(5)(2.5)), true)
		assertEquals(Number.isNaN(permutations(5.5)(2.5)), true)
		assertEquals(Number.isNaN(permutations(Math.PI)(2)), true)
		assertEquals(Number.isNaN(permutations(5)(Math.E)), true)
	})
	
	await t.step("null and undefined", () => {
		assertEquals(Number.isNaN(permutations(null as any)(2)), true)
		assertEquals(Number.isNaN(permutations(undefined as any)(2)), true)
		assertEquals(Number.isNaN(permutations(5)(null as any)), true)
		assertEquals(Number.isNaN(permutations(5)(undefined as any)), true)
	})
	
	await t.step("non-number types", () => {
		assertEquals(Number.isNaN(permutations("5" as any)(2)), true)
		assertEquals(Number.isNaN(permutations(5)("2" as any)), true)
		assertEquals(Number.isNaN(permutations({} as any)(2)), true)
		assertEquals(Number.isNaN(permutations(5)([] as any)), true)
		assertEquals(Number.isNaN(permutations(true as any)(2)), true)
	})
	
	await t.step("special numeric values", () => {
		assertEquals(Number.isNaN(permutations(Infinity)(5)), true)
		assertEquals(Number.isNaN(permutations(5)(Infinity)), true)
		assertEquals(Number.isNaN(permutations(NaN)(5)), true)
		assertEquals(Number.isNaN(permutations(5)(NaN)), true)
		assertEquals(Number.isNaN(permutations(-Infinity)(5)), true)
	})
})

Deno.test("permutations: mathematical properties", async (t) => {
	await t.step("P(n,r) = n! / (n-r)! for small values", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 12 }),
				fc.integer({ min: 0, max: 12 }),
				(n, r) => {
					fc.pre(r <= n)
					
					const result = permutations(n)(r)
					
					// Calculate using factorial formula
					const factorial = (x: number): number => {
						if (x <= 1) return 1
						let result = 1
						for (let i = 2; i <= x; i++) {
							result *= i
						}
						return result
					}
					
					const expected = factorial(n) / factorial(n - r)
					
					return result === expected
				}
			),
			{ numRuns: 500 }
		)
	})
	
	await t.step("P(n,0) = 1 for all valid n", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 1000 }),
				(n) => {
					return permutations(n)(0) === 1
				}
			),
			{ numRuns: 1000 }
		)
	})
	
	await t.step("P(n,1) = n for all valid n", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 1000 }), // Start from 1, not 0
				(n) => {
					return permutations(n)(1) === n
				}
			),
			{ numRuns: 1000 }
		)
	})
	
	await t.step("P(n,n) = n! (full permutation)", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 12 }), // Limited to avoid overflow
				(n) => {
					const result = permutations(n)(n)
					
					// Calculate n!
					let factorial = 1
					for (let i = 2; i <= n; i++) {
						factorial *= i
					}
					
					return result === factorial
				}
			),
			{ numRuns: 100 }
		)
	})
	
	await t.step("P(n,r) = P(n-1,r-1) × n", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 20 }), // Reduced range to avoid precision issues
				fc.integer({ min: 1, max: 20 }),
				(n, r) => {
					fc.pre(r <= n && r <= n - 1) // Ensure r-1 is valid for n-1
					
					const current = permutations(n)(r)
					const previous = permutations(n - 1)(r - 1)
					const expected = previous * n
					
					// Allow small relative error for large numbers
					const tolerance = Math.max(1, Math.abs(current) * 1e-10)
					return Math.abs(current - expected) <= tolerance
				}
			),
			{ numRuns: 1000 }
		)
	})
	
	await t.step("P(n,r) / P(n,r-1) = n - r + 1", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 20 }), // Reduced range
				fc.integer({ min: 1, max: 20 }),
				(n, r) => {
					fc.pre(r <= n && r >= 1) // Ensure r-1 >= 0
					
					const current = permutations(n)(r)
					const previous = permutations(n)(r - 1)
					const ratio = current / previous
					const expected = n - r + 1
					
					// Allow small relative error
					return Math.abs(ratio - expected) < 1e-10
				}
			),
			{ numRuns: 1000 }
		)
	})
	
	await t.step("P(n,r) >= P(n,r-1) for r > 0 and n > 0", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 100 }),
				fc.integer({ min: 1, max: 100 }),
				(n, r) => {
					fc.pre(r <= n && n > 0) // Ensure n > 0 for meaningful comparison
					
					const current = permutations(n)(r)
					const previous = permutations(n)(r - 1)
					
					// When r = n, P(n,n) = P(n,n-1) = n!, so use >= instead of >
					return current >= previous
				}
			),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("permutations: relationship with combinations", async (t) => {
	await t.step("P(n,r) = C(n,r) × r!", async () => {
		// We'll need combinations for this test
		const combinations = (n: number) => (r: number): number => {
			if (r > n || r < 0 || n < 0) return NaN
			if (r === 0 || r === n) return 1
			
			const k = r > n - r ? n - r : r
			let result = 1
			for (let i = 0; i < k; i++) {
				result = result * (n - i) / (i + 1)
			}
			return Math.round(result)
		}
		
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 12 }),
				fc.integer({ min: 0, max: 12 }),
				(n, r) => {
					fc.pre(r <= n)
					
					const perm = permutations(n)(r)
					const comb = combinations(n)(r)
					
					// Calculate r!
					let rFactorial = 1
					for (let i = 2; i <= r; i++) {
						rFactorial *= i
					}
					
					return perm === comb * rFactorial
				}
			),
			{ numRuns: 500 }
		)
	})
	
	await t.step("specific examples of P vs C relationship", () => {
		// Helper to calculate combinations
		const C = (n: number, r: number): number => {
			if (r > n) return NaN
			if (r === 0 || r === n) return 1
			const k = r > n - r ? n - r : r
			let result = 1
			for (let i = 0; i < k; i++) {
				result = result * (n - i) / (i + 1)
			}
			return Math.round(result)
		}
		
		// P(6,3) vs C(6,3)
		const p63 = permutations(6)(3) // 120
		const c63 = C(6, 3) // 20
		assertEquals(p63 / c63, 6) // 3! = 6
		
		// P(5,2) vs C(5,2)
		const p52 = permutations(5)(2) // 20
		const c52 = C(5, 2) // 10
		assertEquals(p52 / c52, 2) // 2! = 2
		
		// P(10,4) vs C(10,4)
		const p104 = permutations(10)(4) // 5040
		const c104 = C(10, 4) // 210
		assertEquals(p104 / c104, 24) // 4! = 24
	})
})

Deno.test("permutations: large values", async (t) => {
	await t.step("handles moderately large values", () => {
		assertEquals(permutations(20)(5), 1860480)
		assertEquals(permutations(25)(3), 13800)
		assertEquals(permutations(30)(4), 657720)
		assertEquals(permutations(50)(2), 2450)
		assertEquals(permutations(100)(3), 970200)
	})
	
	await t.step("handles edge of safe integer range", () => {
		// These should work as they stay within safe integer range
		assertEquals(permutations(20)(10), 670442572800)
		assertEquals(permutations(15)(12), 217945728000)
		
		// P(n,1) always equals n, even for large n
		assertEquals(permutations(10000)(1), 10000)
		assertEquals(permutations(1000000)(1), 1000000)
	})
})

Deno.test("permutations: incremental calculation", async (t) => {
	await t.step("builds up permutations incrementally", () => {
		const n = 10
		let prev = 1 // P(10,0) = 1
		
		for (let r = 1; r <= n; r++) {
			const current = permutations(n)(r)
			const multiplier = n - r + 1
			assertEquals(current, prev * multiplier)
			prev = current
		}
	})
	
	await t.step("decremental divisor pattern", () => {
		const n = 8
		
		// P(8,r) = 8 × 7 × 6 × ... × (8-r+1)
		assertEquals(permutations(8)(1), 8)
		assertEquals(permutations(8)(2), 8 * 7)
		assertEquals(permutations(8)(3), 8 * 7 * 6)
		assertEquals(permutations(8)(4), 8 * 7 * 6 * 5)
		assertEquals(permutations(8)(5), 8 * 7 * 6 * 5 * 4)
		assertEquals(permutations(8)(6), 8 * 7 * 6 * 5 * 4 * 3)
		assertEquals(permutations(8)(7), 8 * 7 * 6 * 5 * 4 * 3 * 2)
		assertEquals(permutations(8)(8), 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
	})
})