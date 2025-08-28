import gammaFunction from "../gammaFunction/index.ts"

/**
 * Calculates the beta function B(x, y)
 *
 * Computes the beta function using the relationship B(x,y) = Γ(x)Γ(y)/Γ(x+y)
 * where Γ is the gamma function. The beta function is used in probability
 * distributions (Beta, F, Student's t), combinatorics, and special integrals.
 * Returns NaN for invalid inputs or non-positive values.
 *
 * @param x - First parameter (must be positive)
 * @param y - Second parameter (must be positive)
 * @returns Beta function value, or NaN if invalid
 * @example
 * ```typescript
 * // Integer values
 * betaFunction(1)(1) // 1 (B(1,1) = 1)
 * betaFunction(2)(2) // 0.1666... (1/6)
 * betaFunction(3)(5) // 0.00952... (1/105)
 * 
 * // Half-integer values
 * betaFunction(0.5)(0.5) // 3.1415... (π)
 * betaFunction(1.5)(1.5) // 0.5235... (π/6)
 * 
 * // Beta distribution normalization
 * const betaPDF = (x: number, alpha: number, beta: number): number => {
 *   if (x < 0 || x > 1) return 0
 *   const B = betaFunction(alpha)(beta)
 *   return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / B
 * }
 * 
 * // Edge cases
 * betaFunction(0)(1) // NaN (x must be positive)
 * betaFunction(1)(-1) // NaN (y must be positive)
 * betaFunction(10)(10) // 5.639e-7 (very small for large values)
 * ```
 * @pure
 * @curried
 * @safe
 * @commutative
 */
const betaFunction = (
	x: number | null | undefined,
) =>
(
	y: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
		return NaN
	}

	if (y == null || typeof y !== "number") {
		return NaN
	}

	// Beta function is only defined for positive x and y
	if (x <= 0 || y <= 0) {
		return NaN
	}

	// B(x,y) = Γ(x)Γ(y)/Γ(x+y)
	const gammaX = gammaFunction(x)
	const gammaY = gammaFunction(y)
	const gammaXY = gammaFunction(x + y)

	// Check for invalid gamma values
	if (isNaN(gammaX) || isNaN(gammaY) || isNaN(gammaXY)) {
		return NaN
	}

	// Handle potential infinity/overflow
	if (!isFinite(gammaX) || !isFinite(gammaY)) {
		// Use logarithms for large values to avoid overflow
		const lnBeta = Math.log(gammaX) + Math.log(gammaY) - Math.log(gammaXY)
		return Math.exp(lnBeta)
	}

	return (gammaX * gammaY) / gammaXY
}

export default betaFunction
