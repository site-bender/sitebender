import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import combinations from "../../../../../src/simple/math/combinations/index.ts"

Deno.test("combinations: basic functionality", async (t) => {
	await t.step("basic combinations", () => {
		assertEquals(combinations(5)(3), 10)
		assertEquals(combinations(4)(2), 6)
		assertEquals(combinations(10)(5), 252)
		assertEquals(combinations(6)(3), 20)
		assertEquals(combinations(7)(4), 35)
	})

	await t.step("edge cases with r=0", () => {
		assertEquals(combinations(5)(0), 1)
		assertEquals(combinations(0)(0), 1)
		assertEquals(combinations(100)(0), 1)
		assertEquals(combinations(1)(0), 1)
	})

	await t.step("edge cases with r=n", () => {
		assertEquals(combinations(5)(5), 1)
		assertEquals(combinations(1)(1), 1)
		assertEquals(combinations(10)(10), 1)
		assertEquals(combinations(100)(100), 1)
	})

	await t.step("Pascal's triangle values", () => {
		// Row 4: [1, 4, 6, 4, 1]
		assertEquals(combinations(4)(0), 1)
		assertEquals(combinations(4)(1), 4)
		assertEquals(combinations(4)(2), 6)
		assertEquals(combinations(4)(3), 4)
		assertEquals(combinations(4)(4), 1)

		// Row 5: [1, 5, 10, 10, 5, 1]
		assertEquals(combinations(5)(0), 1)
		assertEquals(combinations(5)(1), 5)
		assertEquals(combinations(5)(2), 10)
		assertEquals(combinations(5)(3), 10)
		assertEquals(combinations(5)(4), 5)
		assertEquals(combinations(5)(5), 1)

		// Row 6: [1, 6, 15, 20, 15, 6, 1]
		assertEquals(combinations(6)(0), 1)
		assertEquals(combinations(6)(1), 6)
		assertEquals(combinations(6)(2), 15)
		assertEquals(combinations(6)(3), 20)
		assertEquals(combinations(6)(4), 15)
		assertEquals(combinations(6)(5), 6)
		assertEquals(combinations(6)(6), 1)
	})

	await t.step("practical examples", () => {
		// Lottery: 6 from 49
		assertEquals(combinations(49)(6), 13983816)

		// Poker: 5 cards from 52
		assertEquals(combinations(52)(5), 2598960)

		// Team selection: 11 from 15
		assertEquals(combinations(15)(11), 1365)

		// Committee: 4 from 20
		assertEquals(combinations(20)(4), 4845)

		// Binary coefficients
		assertEquals(combinations(8)(3), 56)
	})

	await t.step("partial application", () => {
		const choose5 = combinations(10)
		assertEquals(choose5(0), 1)
		assertEquals(choose5(1), 10)
		assertEquals(choose5(2), 45)
		assertEquals(choose5(3), 120)
		assertEquals(choose5(4), 210)
		assertEquals(choose5(5), 252)
	})
})

Deno.test("combinations: invalid inputs", async (t) => {
	await t.step("r greater than n", () => {
		assertEquals(Number.isNaN(combinations(3)(5)), true)
		assertEquals(Number.isNaN(combinations(10)(11)), true)
		assertEquals(Number.isNaN(combinations(0)(1)), true)
	})

	await t.step("negative values", () => {
		assertEquals(Number.isNaN(combinations(-1)(2)), true)
		assertEquals(Number.isNaN(combinations(5)(-2)), true)
		assertEquals(Number.isNaN(combinations(-5)(-2)), true)
	})

	await t.step("non-integer values", () => {
		assertEquals(Number.isNaN(combinations(5.5)(2)), true)
		assertEquals(Number.isNaN(combinations(5)(2.5)), true)
		assertEquals(Number.isNaN(combinations(5.5)(2.5)), true)
		assertEquals(Number.isNaN(combinations(Math.PI)(2)), true)
	})

	await t.step("null and undefined", () => {
		assertEquals(Number.isNaN(combinations(null as any)(2)), true)
		assertEquals(Number.isNaN(combinations(undefined as any)(2)), true)
		assertEquals(Number.isNaN(combinations(5)(null as any)), true)
		assertEquals(Number.isNaN(combinations(5)(undefined as any)), true)
	})

	await t.step("non-number types", () => {
		assertEquals(Number.isNaN(combinations("5" as any)(2)), true)
		assertEquals(Number.isNaN(combinations(5)("2" as any)), true)
		assertEquals(Number.isNaN(combinations({} as any)(2)), true)
		assertEquals(Number.isNaN(combinations(5)([] as any)), true)
	})

	await t.step("special numeric values", () => {
		assertEquals(Number.isNaN(combinations(Infinity)(5)), true)
		assertEquals(Number.isNaN(combinations(5)(Infinity)), true)
		assertEquals(Number.isNaN(combinations(NaN)(5)), true)
		assertEquals(Number.isNaN(combinations(5)(NaN)), true)
		assertEquals(Number.isNaN(combinations(-Infinity)(5)), true)
	})
})

Deno.test("combinations: mathematical properties", async (t) => {
	await t.step("symmetry property: C(n,r) = C(n,n-r)", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 100 }),
				fc.integer({ min: 0, max: 100 }),
				(n, r) => {
					fc.pre(r <= n)
					const left = combinations(n)(r)
					const right = combinations(n)(n - r)
					return left === right
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("Pascal's identity: C(n,r) = C(n-1,r-1) + C(n-1,r)", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 50 }), // Reduced to avoid precision issues
				fc.integer({ min: 1, max: 50 }),
				(n, r) => {
					fc.pre(r <= n && r <= n - 1) // Ensure both C(n-1,r) and C(n-1,r-1) are valid
					const current = combinations(n)(r)
					const diagonal = combinations(n - 1)(r - 1)
					const above = combinations(n - 1)(r)
					// Use tolerance for floating point comparison
					const sum = diagonal + above
					return Math.abs(current - sum) <= 1 // Allow for rounding errors
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("boundary values: C(n,0) = C(n,n) = 1", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 1000 }),
				(n) => {
					return combinations(n)(0) === 1 && combinations(n)(n) === 1
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("single choice: C(n,1) = n", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 1000 }),
				(n) => {
					return combinations(n)(1) === n
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("complement: C(n,n-1) = n", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 1000 }),
				(n) => {
					return combinations(n)(n - 1) === n
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("sum of row: sum of C(n,r) for r=0..n equals 2^n", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 20 }), // Limited due to exponential growth
				(n) => {
					let sum = 0
					for (let r = 0; r <= n; r++) {
						sum += combinations(n)(r)
					}
					return sum === Math.pow(2, n)
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("alternating sum equals 0 for n > 0", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 20 }),
				(n) => {
					let sum = 0
					for (let r = 0; r <= n; r++) {
						sum += (r % 2 === 0 ? 1 : -1) * combinations(n)(r)
					}
					return sum === 0
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("monotonicity: increases then decreases", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 4, max: 100 }),
				(n) => {
					// Find the maximum value position
					const middle = Math.floor(n / 2)

					// Check increasing up to middle
					for (let r = 0; r < middle; r++) {
						const current = combinations(n)(r)
						const next = combinations(n)(r + 1)
						if (current >= next) return false
					}

					// Check decreasing after middle (accounting for even/odd n)
					const startDecreasing = n % 2 === 0 ? middle : middle + 1
					for (let r = startDecreasing; r < n; r++) {
						const current = combinations(n)(r)
						const next = combinations(n)(r + 1)
						if (current <= next) return false
					}

					return true
				},
			),
			{ numRuns: 100 },
		)
	})
})

Deno.test("combinations: relationship with binomial theorem", async (t) => {
	await t.step("expansion of (1+1)^n", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 20 }),
				(n) => {
					let sum = 0
					for (let r = 0; r <= n; r++) {
						sum += combinations(n)(r)
					}
					return sum === Math.pow(2, n)
				},
			),
			{ numRuns: 100 },
		)
	})

	await t.step("expansion of (1+x)^n coefficient", () => {
		// For (1+x)^n, the coefficient of x^r is C(n,r)
		// We'll verify a few specific cases

		// (1+x)^3 = 1 + 3x + 3x^2 + x^3
		assertEquals(combinations(3)(0), 1) // constant term
		assertEquals(combinations(3)(1), 3) // x coefficient
		assertEquals(combinations(3)(2), 3) // x^2 coefficient
		assertEquals(combinations(3)(3), 1) // x^3 coefficient

		// (1+x)^5 = 1 + 5x + 10x^2 + 10x^3 + 5x^4 + x^5
		assertEquals(combinations(5)(0), 1)
		assertEquals(combinations(5)(1), 5)
		assertEquals(combinations(5)(2), 10)
		assertEquals(combinations(5)(3), 10)
		assertEquals(combinations(5)(4), 5)
		assertEquals(combinations(5)(5), 1)
	})
})

Deno.test("combinations: large values", async (t) => {
	await t.step("handles moderately large values", () => {
		assertEquals(combinations(30)(15), 155117520)
		assertEquals(combinations(35)(17), 4537567650)
		assertEquals(combinations(40)(20), 137846528820)

		// These are within JavaScript's safe integer range
		assertEquals(combinations(50)(10), 10272278170)
		assertEquals(combinations(60)(5), 5461512)
		assertEquals(combinations(100)(3), 161700)
	})

	await t.step("optimization uses smaller of r and n-r", () => {
		// These should compute efficiently even with large n
		assertEquals(combinations(1000)(2), 499500)
		assertEquals(combinations(1000)(998), 499500) // Same as C(1000,2)
		assertEquals(combinations(5000)(1), 5000)
		assertEquals(combinations(5000)(4999), 5000) // Same as C(5000,1)
	})
})

Deno.test("combinations: comparison with factorial formula", async (t) => {
	await t.step("matches factorial formula for small values", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 12 }), // Limited to avoid factorial overflow
				fc.integer({ min: 0, max: 12 }),
				(n, r) => {
					fc.pre(r <= n)

					const result = combinations(n)(r)

					// Calculate using factorial formula: n! / (r! * (n-r)!)
					const factorial = (x: number): number => {
						if (x <= 1) return 1
						let result = 1
						for (let i = 2; i <= x; i++) {
							result *= i
						}
						return result
					}

					const expected = factorial(n) /
						(factorial(r) * factorial(n - r))

					// Use relative comparison for floating point
					return Math.abs(result - expected) < 1e-10
				},
			),
			{ numRuns: 500 },
		)
	})
})
