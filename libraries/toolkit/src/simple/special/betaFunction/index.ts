import gammaFunction from "../gammaFunction/index.ts"

/**
 * Calculates the beta function B(x, y)
 * 
 * Computes the beta function using the relationship B(x,y) = Γ(x)Γ(y)/Γ(x+y)
 * where Γ is the gamma function. The beta function is used in probability
 * distributions (Beta, F, Student's t), combinatorics, and special integrals.
 * Returns NaN for invalid inputs or non-positive values.
 * 
 * @curried (x) => (y) => beta value
 * @param x - First parameter (must be positive)
 * @param y - Second parameter (must be positive)
 * @returns Beta function value, or NaN if invalid
 * @example
 * ```typescript
 * // Integer values (related to binomial coefficients)
 * betaFunction(1)(1)
 * // 1 (B(1,1) = 1)
 * 
 * betaFunction(2)(2)
 * // 0.1666... (1/6)
 * 
 * betaFunction(3)(3)
 * // 0.0333... (1/30)
 * 
 * betaFunction(2)(3)
 * // 0.0833... (1/12)
 * 
 * // Symmetric property: B(x,y) = B(y,x)
 * betaFunction(3)(5)
 * // 0.00952... (1/105)
 * 
 * betaFunction(5)(3)
 * // 0.00952... (same as B(3,5))
 * 
 * // Half-integer values
 * betaFunction(0.5)(0.5)
 * // 3.1415... (π)
 * 
 * betaFunction(1.5)(1.5)
 * // 0.5235... (π/6)
 * 
 * betaFunction(0.5)(1)
 * // 2
 * 
 * // Relationship to binomial coefficient
 * // B(n,m) = 1/((n+m-1) * C(n+m-2, n-1))
 * betaFunction(4)(3)
 * // 0.00476... (1/210)
 * 
 * // Small values
 * betaFunction(0.1)(0.1)
 * // 19.714...
 * 
 * betaFunction(0.2)(0.3)
 * // 8.335...
 * 
 * // Large values (becomes very small)
 * betaFunction(10)(10)
 * // 5.639e-7
 * 
 * betaFunction(20)(20)
 * // 3.644e-13
 * 
 * // Invalid inputs return NaN
 * betaFunction(0)(1)
 * // NaN (x must be positive)
 * 
 * betaFunction(1)(-1)
 * // NaN (y must be positive)
 * 
 * betaFunction(null)(1)
 * // NaN
 * 
 * // Practical examples
 * 
 * // Beta distribution normalization constant
 * function betaPDF(x: number, alpha: number, beta: number): number {
 *   if (x < 0 || x > 1) return 0
 *   const B = betaFunction(alpha)(beta)
 *   return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / B
 * }
 * betaPDF(0.5, 2, 2)  // 1.5 (symmetric bell curve)
 * betaPDF(0.7, 2, 5)  // 1.512 (skewed distribution)
 * 
 * // Incomplete beta function approximation
 * function regularizedBeta(x: number, a: number, b: number): number {
 *   // Approximation for x near 0
 *   if (x < 0.5) {
 *     const B = betaFunction(a)(b)
 *     return Math.pow(x, a) / (a * B)  // First term of series
 *   }
 *   // Use symmetry for x near 1
 *   return 1 - regularizedBeta(1 - x, b, a)
 * }
 * 
 * // Binomial probability via beta
 * function binomialProb(n: number, k: number, p: number): number {
 *   const B = betaFunction(k + 1)(n - k + 1)
 *   return Math.pow(p, k) * Math.pow(1 - p, n - k) / B
 * }
 * 
 * // F-distribution relationship
 * function fDistributionPDF(x: number, d1: number, d2: number): number {
 *   if (x < 0) return 0
 *   const B = betaFunction(d1 / 2)(d2 / 2)
 *   const numerator = Math.pow(d1 / d2, d1 / 2) * Math.pow(x, d1 / 2 - 1)
 *   const denominator = B * Math.pow(1 + d1 * x / d2, (d1 + d2) / 2)
 *   return numerator / denominator
 * }
 * 
 * // Student's t-distribution relationship
 * function tDistributionConstant(df: number): number {
 *   const B = betaFunction(0.5)(df / 2)
 *   return 1 / (Math.sqrt(df) * B)
 * }
 * 
 * // Partial application for fixed alpha
 * const betaAlpha2 = betaFunction(2)
 * betaAlpha2(1)  // 0.5
 * betaAlpha2(2)  // 0.1666...
 * betaAlpha2(3)  // 0.0833...
 * betaAlpha2(4)  // 0.05
 * 
 * // Integral evaluation
 * // ∫₀¹ x^(a-1)(1-x)^(b-1) dx = B(a,b)
 * const integral = betaFunction(3)(4)
 * // 0.00476... (exact value of integral)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Symmetric - B(x,y) = B(y,x)
 */
const betaFunction = (
	x: number | null | undefined
) => (
	y: number | null | undefined
): number => {
	if (x == null || typeof x !== 'number') {
		return NaN
	}
	
	if (y == null || typeof y !== 'number') {
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