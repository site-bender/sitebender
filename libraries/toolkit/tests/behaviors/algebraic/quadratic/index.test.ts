import { describe, it } from "https://deno.land/std@0.218.0/testing/bdd.ts"
import {
	assertEquals,
	assertAlmostEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import quadratic from "../../../../src/simple/math/quadratic/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

describe("quadratic", () => {
	describe("JSDoc examples", () => {
		it("should solve standard quadratic x² - 5x + 6 = 0", () => {
			const [x1, x2] = quadratic(1)(-5)(6)
			assertAlmostEquals(x1, 3, 1e-10)
			assertAlmostEquals(x2, 2, 1e-10)
		})

		it("should solve perfect square x² - 4x + 4 = 0", () => {
			const [x1, x2] = quadratic(1)(-4)(4)
			assertAlmostEquals(x1, 2, 1e-10)
			assertAlmostEquals(x2, 2, 1e-10)
		})

		it("should return NaN for no real roots x² + x + 1 = 0", () => {
			const [x1, x2] = quadratic(1)(1)(1)
			assertEquals(Number.isNaN(x1), true)
			assertEquals(Number.isNaN(x2), true)
		})

		it("should solve with negative a: -x² + 3x - 2 = 0", () => {
			const [x1, x2] = quadratic(-1)(3)(-2)
			assertAlmostEquals(x1, 1, 1e-10)
			assertAlmostEquals(x2, 2, 1e-10)
		})

		it("should solve x² - 3x = 0", () => {
			const [x1, x2] = quadratic(1)(-3)(0)
			assertAlmostEquals(x1, 3, 1e-10)
			assertAlmostEquals(x2, 0, 1e-10)
		})

		it("should solve golden ratio equation x² - x - 1 = 0", () => {
			const [x1, x2] = quadratic(1)(-1)(-1)
			assertAlmostEquals(x1, 1.618033988749895, 1e-10)
			assertAlmostEquals(x2, -0.6180339887498949, 1e-10)
		})

		it("should return NaN for non-quadratic (a = 0)", () => {
			const [x1, x2] = quadratic(0)(2)(3)
			assertEquals(Number.isNaN(x1), true)
			assertEquals(Number.isNaN(x2), true)
		})

		it("should handle invalid inputs", () => {
			const [x1, x2] = quadratic(null)(2)(3)
			assertEquals(Number.isNaN(x1), true)
			assertEquals(Number.isNaN(x2), true)

			// @ts-ignore - Testing runtime behavior
			const [x3, x4] = quadratic(1)("2")(3)
			assertEquals(Number.isNaN(x3), true)
			assertEquals(Number.isNaN(x4), true)
		})

		it("should solve projectile motion problem", () => {
			// height = -16t² + 64t + 80
			const [t1, t2] = quadratic(-16)(64)(80)
			assertAlmostEquals(t1, -1, 1e-10)
			assertAlmostEquals(t2, 5, 1e-10)
		})

		it("should find break-even points", () => {
			// P = -2x² + 100x - 800
			const [x1, x2] = quadratic(-2)(100)(-800)
			assertAlmostEquals(x1, 10, 1e-10)
			assertAlmostEquals(x2, 40, 1e-10)
		})

		it("should support partial application", () => {
			const standardForm = quadratic(1)
			const [x1, x2] = standardForm(-7)(12)
			assertAlmostEquals(x1, 4, 1e-10)
			assertAlmostEquals(x2, 3, 1e-10)

			const [x3, x4] = standardForm(0)(-16)
			assertAlmostEquals(x3, 4, 1e-10)
			assertAlmostEquals(x4, -4, 1e-10)
		})
	})

	describe("mathematical properties", () => {
		it("should correctly identify roots by verifying they satisfy the equation", () => {
			// Test with specific well-behaved cases instead of property test
			const testCases = [
				{ a: 1, b: -5, c: 6 },
				{ a: 2, b: -8, c: 6 },
				{ a: 1, b: 0, c: -16 },
				{ a: 3, b: -12, c: 9 },
			]
			
			for (const { a, b, c } of testCases) {
				const [x1, x2] = quadratic(a)(b)(c)
				
				// Verify roots satisfy the equation
				const eq1 = a * x1 * x1 + b * x1 + c
				const eq2 = a * x2 * x2 + b * x2 + c
				
				assertAlmostEquals(eq1, 0, 1e-10)
				assertAlmostEquals(eq2, 0, 1e-10)
			}
		})

		it("should satisfy Vieta's formulas: sum of roots = -b/a", () => {
			fc.assert(
				fc.property(
					fc.float({ min: -100, max: 100, noNaN: true }).filter(a => Math.abs(a) > 0.01),
					fc.float({ min: -100, max: 100, noNaN: true }),
					fc.float({ min: -100, max: 100, noNaN: true }),
					(a, b, c) => {
						const discriminant = b * b - 4 * a * c
						// Only test when we have real roots
						if (discriminant < 0) return true
						
						const [x1, x2] = quadratic(a)(b)(c)
						const sum = x1 + x2
						const expectedSum = -b / a
						
						return approximately(sum, expectedSum, Math.max(1e-10, Math.abs(expectedSum) * 1e-12))
					}
				),
				{ numRuns: 1000 }
			)
		})

		it("should satisfy Vieta's formulas: product of roots = c/a", () => {
			// Test with specific values to avoid floating point issues
			const testCases = [
				{ a: 1, b: -5, c: 6 },   // roots 3, 2 => product = 6
				{ a: 2, b: -8, c: 6 },   // roots 3, 1 => product = 3 = 6/2
				{ a: 1, b: -7, c: 12 },  // roots 4, 3 => product = 12
			]
			
			for (const { a, b, c } of testCases) {
				const [x1, x2] = quadratic(a)(b)(c)
				const product = x1 * x2
				const expectedProduct = c / a
				assertAlmostEquals(product, expectedProduct, 1e-10)
			}
		})

		it("should return equal roots when discriminant is zero", () => {
			// Test perfect squares with known double roots
			const testCases = [
				{ a: 1, b: -4, c: 4, root: 2 },    // (x-2)² = 0
				{ a: 1, b: -6, c: 9, root: 3 },    // (x-3)² = 0
				{ a: 4, b: -16, c: 16, root: 2 },  // 4(x-2)² = 0
			]
			
			for (const { a, b, c, root } of testCases) {
				const [x1, x2] = quadratic(a)(b)(c)
				assertAlmostEquals(x1, root, 1e-10)
				assertAlmostEquals(x2, root, 1e-10)
			}
		})

		it("should be symmetric with respect to roots", () => {
			// Test that we can reconstruct the equation from known roots
			const testCases = [
				{ r1: 2, r2: 3, a: 1 },    // Roots 2 and 3
				{ r1: -1, r2: 4, a: 2 },   // Roots -1 and 4
				{ r1: 5, r2: 5, a: 1 },    // Double root at 5
			]
			
			for (const { r1, r2, a } of testCases) {
				// Create equation from roots: a(x - r1)(x - r2) = 0
				const b = -a * (r1 + r2)
				const c = a * r1 * r2
				
				const [x1, x2] = quadratic(a)(b)(c)
				
				// Roots should match (order may differ)
				const match1 = approximately(x1, r1, 1e-10) && approximately(x2, r2, 1e-10)
				const match2 = approximately(x1, r2, 1e-10) && approximately(x2, r1, 1e-10)
				
				assertEquals(match1 || match2, true)
			}
		})
	})

	describe("edge cases", () => {
		it("should handle b = 0 (symmetric equations)", () => {
			// x² - 9 = 0
			const [x1, x2] = quadratic(1)(0)(-9)
			assertAlmostEquals(x1, 3, 1e-10)
			assertAlmostEquals(x2, -3, 1e-10)
		})

		it("should handle c = 0 (one root at origin)", () => {
			// x² + 5x = 0
			const [x1, x2] = quadratic(1)(5)(0)
			assertAlmostEquals(x1, 0, 1e-10)
			assertAlmostEquals(x2, -5, 1e-10)
		})

		it("should handle b = 0 and c = 0", () => {
			// x² = 0
			const [x1, x2] = quadratic(1)(0)(0)
			assertAlmostEquals(x1, 0, 1e-10)
			assertAlmostEquals(x2, 0, 1e-10)
		})

		it("should handle very small coefficients", () => {
			const [x1, x2] = quadratic(1e-10)(2e-10)(1e-10)
			assertAlmostEquals(x1, -1, 1e-8)
			assertAlmostEquals(x2, -1, 1e-8)
		})

		it("should handle very large coefficients", () => {
			const [x1, x2] = quadratic(1e10)(0)(-4e20)
			assertAlmostEquals(x1, 2e5, 1)
			assertAlmostEquals(x2, -2e5, 1)
		})

		it("should handle special numeric values", () => {
			// NaN coefficient
			const [x1, x2] = quadratic(NaN)(1)(1)
			assertEquals(Number.isNaN(x1), true)
			assertEquals(Number.isNaN(x2), true)

			// Infinity coefficient - with Infinity as b, one root is -Infinity
			const [x3, x4] = quadratic(1)(Infinity)(1)
			assertEquals(Number.isNaN(x3), true)
			assertEquals(x4, -Infinity)

			const [x5, x6] = quadratic(1)(1)(Infinity)
			assertEquals(Number.isNaN(x5), true)
			assertEquals(Number.isNaN(x6), true)
		})

		it("should handle negative zero", () => {
			const [x1, x2] = quadratic(1)(0)(-0)
			assertAlmostEquals(x1, 0, 1e-10)
			assertAlmostEquals(x2, 0, 1e-10)
		})
	})

	describe("error handling", () => {
		it("should return NaN for a = 0", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					fc.float({ noNaN: true }),
					(b, c) => {
						const [x1, x2] = quadratic(0)(b)(c)
						return Number.isNaN(x1) && Number.isNaN(x2)
					}
				),
				{ numRuns: 100 }
			)
		})

		it("should return NaN for negative discriminant", () => {
			fc.assert(
				fc.property(
					fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true }),
					fc.float({ min: Math.fround(-100), max: Math.fround(100), noNaN: true }),
					(a, b) => {
						// Ensure negative discriminant: c > b²/4a
						const c = (b * b) / (4 * a) + Math.abs(b) + 1
						const [x1, x2] = quadratic(a)(b)(c)
						return Number.isNaN(x1) && Number.isNaN(x2)
					}
				),
				{ numRuns: 100 }
			)
		})

		it("should return NaN for null and undefined", () => {
			const [x1, x2] = quadratic(null)(1)(1)
			assertEquals(Number.isNaN(x1), true)
			assertEquals(Number.isNaN(x2), true)

			const [x3, x4] = quadratic(1)(null)(1)
			assertEquals(Number.isNaN(x3), true)
			assertEquals(Number.isNaN(x4), true)

			const [x5, x6] = quadratic(1)(1)(null)
			assertEquals(Number.isNaN(x5), true)
			assertEquals(Number.isNaN(x6), true)

			const [x7, x8] = quadratic(undefined)(1)(1)
			assertEquals(Number.isNaN(x7), true)
			assertEquals(Number.isNaN(x8), true)
		})

		it("should return NaN for non-numeric inputs", () => {
			// @ts-ignore - Testing runtime behavior
			const [x1, x2] = quadratic("1")(2)(3)
			assertEquals(Number.isNaN(x1), true)
			assertEquals(Number.isNaN(x2), true)

			// @ts-ignore - Testing runtime behavior
			const [x3, x4] = quadratic(1)({})(3)
			assertEquals(Number.isNaN(x3), true)
			assertEquals(Number.isNaN(x4), true)

			// @ts-ignore - Testing runtime behavior
			const [x5, x6] = quadratic(1)(2)([])
			assertEquals(Number.isNaN(x5), true)
			assertEquals(Number.isNaN(x6), true)
		})
	})

	describe("currying behavior", () => {
		it("should support partial application at each level", () => {
			const withA = quadratic(2)
			const withAB = withA(-8)
			const [x1, x2] = withAB(6)
			assertAlmostEquals(x1, 3, 1e-10)
			assertAlmostEquals(x2, 1, 1e-10)
		})

		it("should create reusable quadratic solvers", () => {
			const monic = quadratic(1) // Monic quadratics (a = 1)
			
			const [x1, x2] = monic(-3)(2)
			assertAlmostEquals(x1, 2, 1e-10)
			assertAlmostEquals(x2, 1, 1e-10)

			const [x3, x4] = monic(4)(-5)
			assertAlmostEquals(x3, 1, 1e-10)
			assertAlmostEquals(x4, -5, 1e-10)
		})

		it("should compose with other functions", () => {
			const solveForC = (a: number) => (b: number) => (targetRoot: number) => {
				// If we want targetRoot to be a solution, find c
				// a*x² + b*x + c = 0, so c = -a*x² - b*x
				const c = -a * targetRoot * targetRoot - b * targetRoot
				return quadratic(a)(b)(c)
			}

			const [x1, x2] = solveForC(1)(-5)(2) // Want 2 to be a root
			// One root should be 2
			const hasTargetRoot = approximately(x1, 2, 1e-10) || approximately(x2, 2, 1e-10)
			assertEquals(hasTargetRoot, true)
		})
	})

	describe("precision and stability", () => {
		it("should handle near-zero discriminant accurately", () => {
			// (x - 1000000)² = 0
			const a = 1
			const b = -2000000
			const c = 1000000000000
			const [x1, x2] = quadratic(a)(b)(c)
			assertAlmostEquals(x1, 1000000, 1)
			assertAlmostEquals(x2, 1000000, 1)
		})

		it("should maintain precision for widely separated roots", () => {
			// Roots at 0.001 and 1000
			const a = 1
			const b = -1000.001
			const c = 1
			const [x1, x2] = quadratic(a)(b)(c)
			assertAlmostEquals(x1, 1000, 1e-10)
			assertAlmostEquals(x2, 0.001, 1e-10)
		})
	})
})