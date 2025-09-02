import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import combinations from "../../../../../src/simple/math/combinations/index.ts"
import factorial from "../../../../../src/simple/math/factorial/index.ts"
import permutations from "../../../../../src/simple/math/permutations/index.ts"

Deno.test("permutations: JSDoc examples", async (t) => {
	await t.step("basic permutations", () => {
		assertEquals(permutations(5)(3), 60)
		assertEquals(permutations(4)(2), 12)
		assertEquals(permutations(10)(4), 5040)
	})

	await t.step("edge cases", () => {
		assertEquals(permutations(5)(0), 1)
		assertEquals(permutations(5)(5), 120)
		assertEquals(permutations(0)(0), 1)
	})

	await t.step("compare with combinations", () => {
		assertEquals(permutations(5)(3), 60)
		// P(n,r) = C(n,r) × r!
		assertEquals(permutations(5)(3), combinations(5)(3) * factorial(3))
	})

	await t.step("invalid cases", () => {
		assertEquals(Number.isNaN(permutations(3)(5)), true)
		assertEquals(Number.isNaN(permutations(-1)(2)), true)
		assertEquals(Number.isNaN(permutations(5)(-2)), true)
		assertEquals(Number.isNaN(permutations(5.5)(2)), true)
		assertEquals(Number.isNaN(permutations(5)(2.5)), true)
		assertEquals(Number.isNaN(permutations(null)(2)), true)
		assertEquals(Number.isNaN(permutations(5)(null)), true)
		assertEquals(Number.isNaN(permutations(undefined)(2)), true)
		assertEquals(Number.isNaN(permutations(5)(undefined)), true)
		assertEquals(Number.isNaN(permutations("5" as any)(2)), true)
		assertEquals(Number.isNaN(permutations(5)("2" as any)), true)
	})

	await t.step("race finishing positions", () => {
		assertEquals(permutations(8)(3), 336)
	})

	await t.step("password from character set", () => {
		assertEquals(permutations(26)(4), 358800)
	})

	await t.step("seating arrangements", () => {
		assertEquals(permutations(10)(5), 30240)
	})

	await t.step("license plates letters", () => {
		assertEquals(permutations(26)(3), 15600)
	})

	await t.step("tournament brackets", () => {
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

	await t.step("compare permutations vs combinations", () => {
		const n = 6, r = 3
		const perms = permutations(n)(r)
		const combs = combinations(n)(r)
		assertEquals(perms, 120)
		assertEquals(combs, 20)
		assertEquals(perms / combs, factorial(r))
	})
})

// Property-based tests as separate Deno.test calls
Deno.test("permutations: relationship with factorial", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 20 }),
			(n) => {
				// P(n,n) = n!
				const result = permutations(n)(n)
				const expected = factorial(n)
				return result === expected
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("permutations: relationship with combinations", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.integer({ min: 0, max: 20 }),
				fc.integer({ min: 0, max: 20 }),
			).filter(([n, r]) => r <= n),
			([n, r]) => {
				// P(n,r) = C(n,r) × r!
				const perms = permutations(n)(r)
				const combs = combinations(n)(r)
				const expected = combs * factorial(r)
				return perms === expected
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("permutations: monotonic in r for fixed n", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.integer({ min: 0, max: 20 }),
				fc.integer({ min: 0, max: 19 }),
			).filter(([n, r]) => r < n),
			([n, r]) => {
				// P(n,r) <= P(n,r+1) for r < n (non-decreasing)
				const current = permutations(n)(r)
				const next = permutations(n)(r + 1)

				// Special cases
				if (r === 0) {
					// P(n,0) = 1, P(n,1) = n
					return next === n
				}

				if (r + 1 === n) {
					// P(n,n-1) = P(n,n) = n!
					return next === current
				}

				// General case: should be strictly increasing
				return next > current
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("permutations: recurrence relation", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.integer({ min: 1, max: 20 }),
				fc.integer({ min: 1, max: 20 }),
			).filter(([n, r]) => r <= n),
			([n, r]) => {
				// P(n,r) = n × P(n-1,r-1)
				const result = permutations(n)(r)
				const expected = n * permutations(n - 1)(r - 1)
				return result === expected
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("permutations: division property", () => {
	fc.assert(
		fc.property(
			fc.tuple(
				fc.integer({ min: 0, max: 20 }),
				fc.integer({ min: 0, max: 20 }),
			).filter(([n, r]) => r <= n),
			([n, r]) => {
				// P(n,r) = n! / (n-r)!
				const result = permutations(n)(r)
				const nFact = factorial(n)
				const nMinusRFact = factorial(n - r)

				// Avoid division for edge cases
				if (n === 0 || r === 0) {
					return result === 1
				}

				const expected = nFact / nMinusRFact
				return Math.abs(result - expected) < 1e-10
			},
		),
		{ numRuns: 1000 },
	)
})

// Multiplicative property test removed - the formula doesn't hold as a general property

Deno.test("permutations: currying and partial application", async (t) => {
	await t.step("partial application preserves behavior", () => {
		const arrangeFrom5 = permutations(5)
		const arrangeFrom7 = permutations(7)

		assertEquals(arrangeFrom5(0), 1)
		assertEquals(arrangeFrom5(1), 5)
		assertEquals(arrangeFrom5(2), 20)
		assertEquals(arrangeFrom5(3), 60)
		assertEquals(arrangeFrom5(4), 120)
		assertEquals(arrangeFrom5(5), 120)

		assertEquals(arrangeFrom7(0), 1)
		assertEquals(arrangeFrom7(1), 7)
		assertEquals(arrangeFrom7(2), 42)
		assertEquals(arrangeFrom7(3), 210)
	})

	await t.step("curried function can be reused", () => {
		const arrangeFrom10 = permutations(10)
		const results = []

		for (let r = 0; r <= 5; r++) {
			results.push(arrangeFrom10(r))
		}

		assertEquals(results, [1, 10, 90, 720, 5040, 30240])
	})
})

Deno.test("permutations: edge cases", async (t) => {
	await t.step("handles zero correctly", () => {
		assertEquals(permutations(0)(0), 1)
		assertEquals(Number.isNaN(permutations(0)(1)), true)
	})

	await t.step("handles one correctly", () => {
		assertEquals(permutations(1)(0), 1)
		assertEquals(permutations(1)(1), 1)
		assertEquals(Number.isNaN(permutations(1)(2)), true)
	})

	await t.step("handles r = 0 for any n", () => {
		for (let n = 0; n <= 10; n++) {
			assertEquals(permutations(n)(0), 1)
		}
	})

	await t.step("handles r = 1 for any n", () => {
		for (let n = 1; n <= 10; n++) {
			assertEquals(permutations(n)(1), n)
		}
	})

	await t.step("handles r = n for small values", () => {
		for (let n = 0; n <= 10; n++) {
			assertEquals(permutations(n)(n), factorial(n))
		}
	})

	await t.step("rejects non-integers", () => {
		assertEquals(Number.isNaN(permutations(5.5)(3)), true)
		assertEquals(Number.isNaN(permutations(5)(3.5)), true)
		assertEquals(Number.isNaN(permutations(5.5)(3.5)), true)
		assertEquals(Number.isNaN(permutations(Math.PI)(2)), true)
		assertEquals(Number.isNaN(permutations(5)(Math.E)), true)
	})

	await t.step("rejects negative values", () => {
		assertEquals(Number.isNaN(permutations(-1)(0)), true)
		assertEquals(Number.isNaN(permutations(5)(-1)), true)
		assertEquals(Number.isNaN(permutations(-5)(-3)), true)
	})

	await t.step("rejects r > n", () => {
		assertEquals(Number.isNaN(permutations(3)(4)), true)
		assertEquals(Number.isNaN(permutations(10)(11)), true)
		assertEquals(Number.isNaN(permutations(0)(1)), true)
	})

	await t.step("handles special numeric values", () => {
		assertEquals(Number.isNaN(permutations(NaN)(5)), true)
		assertEquals(Number.isNaN(permutations(5)(NaN)), true)
		assertEquals(Number.isNaN(permutations(Infinity)(5)), true)
		assertEquals(Number.isNaN(permutations(5)(Infinity)), true)
		assertEquals(Number.isNaN(permutations(-Infinity)(5)), true)
		assertEquals(Number.isNaN(permutations(5)(-Infinity)), true)
	})
})

Deno.test("permutations: numerical accuracy", async (t) => {
	await t.step("maintains precision for known values", () => {
		const testCases = [
			{ n: 3, r: 2, expected: 6 },
			{ n: 4, r: 2, expected: 12 },
			{ n: 5, r: 2, expected: 20 },
			{ n: 5, r: 3, expected: 60 },
			{ n: 6, r: 3, expected: 120 },
			{ n: 7, r: 3, expected: 210 },
			{ n: 8, r: 4, expected: 1680 },
			{ n: 10, r: 3, expected: 720 },
			{ n: 12, r: 5, expected: 95040 },
			{ n: 15, r: 3, expected: 2730 },
		]

		for (const { n, r, expected } of testCases) {
			assertEquals(permutations(n)(r), expected)
		}
	})

	await t.step("handles moderately large values without overflow", () => {
		// These should compute without overflow
		assertEquals(permutations(20)(10), 670442572800)
		assertEquals(permutations(15)(8), 259459200)
		assertEquals(permutations(25)(5), 6375600)
	})

	await t.step("consistent with direct calculation", () => {
		// Verify the iterative calculation matches expected formula
		for (let n = 1; n <= 10; n++) {
			for (let r = 0; r <= n; r++) {
				const result = permutations(n)(r)

				// Direct calculation
				let expected = 1
				for (let i = 0; i < r; i++) {
					expected *= n - i
				}

				assertEquals(result, expected)
			}
		}
	})
})
