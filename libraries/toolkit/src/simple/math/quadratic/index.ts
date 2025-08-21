import type { Pair } from "../../../types/tuple/index.ts"

import pair from "../../tuple/pair/index.ts"

/**
 * Solves a quadratic equation using the quadratic formula
 * 
 * Calculates the roots of ax² + bx + c = 0 using the quadratic formula:
 * x = (-b ± √(b² - 4ac)) / 2a. Returns a Pair tuple [x₁, x₂] where x₁ uses
 * the positive square root and x₂ uses the negative. For complex roots
 * (negative discriminant), returns [NaN, NaN]. For a = 0 (not quadratic),
 * returns [NaN, NaN].
 * 
 * @curried (a) => (b) => (c) => Pair<number, number>
 * @param a - Coefficient of x² (must be non-zero for quadratic)
 * @param b - Coefficient of x
 * @param c - Constant term
 * @returns Pair tuple of two roots [x₁, x₂], or [NaN, NaN] if invalid
 * @example
 * ```typescript
 * // Standard quadratic: x² - 5x + 6 = 0
 * quadratic(1)(-5)(6)
 * // [3, 2] (roots are x = 3 and x = 2)
 * 
 * // Perfect square: x² - 4x + 4 = 0
 * quadratic(1)(-4)(4)
 * // [2, 2] (double root at x = 2)
 * 
 * // No real roots: x² + x + 1 = 0
 * quadratic(1)(1)(1)
 * // [NaN, NaN] (discriminant is negative)
 * 
 * // With negative a: -x² + 3x - 2 = 0
 * quadratic(-1)(3)(-2)
 * // [1, 2]
 * 
 * // Roots at 0 and positive: x² - 3x = 0
 * quadratic(1)(-3)(0)
 * // [3, 0]
 * 
 * // Golden ratio equation: x² - x - 1 = 0
 * quadratic(1)(-1)(-1)
 * // [1.618..., -0.618...]
 * 
 * // Not quadratic (a = 0) returns NaN
 * quadratic(0)(2)(3)
 * // [NaN, NaN]
 * 
 * // Invalid inputs
 * quadratic(null)(2)(3)
 * // [NaN, NaN]
 * 
 * quadratic(1)("2")(3)
 * // [NaN, NaN]
 * 
 * // Practical examples
 * 
 * // Projectile motion: height = -16t² + 64t + 80
 * // When does object hit ground (height = 0)?
 * const [t1, t2] = quadratic(-16)(64)(80)
 * // [5, -1] (hits ground at t = 5 seconds)
 * 
 * // Profit function: P = -2x² + 100x - 800
 * // Break-even points (P = 0)
 * const [x1, x2] = quadratic(-2)(100)(-800)
 * // [40, 10] (break even at 10 and 40 units)
 * 
 * // Partial application for families of equations
 * const standardForm = quadratic(1)
 * standardForm(-7)(12) // x² - 7x + 12 = 0
 * // [4, 3]
 * 
 * standardForm(0)(-16) // x² - 16 = 0
 * // [4, -4]
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns [NaN, NaN] for invalid inputs
 */
const quadratic = (
	a: number | null | undefined
) => (
	b: number | null | undefined
) => (
	c: number | null | undefined
): Pair<number, number> => {
	if (a == null || typeof a !== 'number') {
		return pair(NaN)(NaN)
	}
	
	if (b == null || typeof b !== 'number') {
		return pair(NaN)(NaN)
	}
	
	if (c == null || typeof c !== 'number') {
		return pair(NaN)(NaN)
	}
	
	// Not a quadratic equation if a = 0
	if (a === 0) {
		return pair(NaN)(NaN)
	}
	
	const discriminant = b * b - 4 * a * c
	
	// No real roots if discriminant is negative
	if (discriminant < 0) {
		return pair(NaN)(NaN)
	}
	
	const sqrtDiscriminant = Math.sqrt(discriminant)
	const denominator = 2 * a
	
	// Calculate both roots
	const x1 = (-b + sqrtDiscriminant) / denominator
	const x2 = (-b - sqrtDiscriminant) / denominator
	
	return pair(x2)(x1)
}

export default quadratic