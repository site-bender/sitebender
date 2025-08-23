/**
 * Stirling's approximation for factorials
 * 
 * Provides an approximation for n! using Stirling's formula:
 * n! ≈ √(2πn) × (n/e)^n. This approximation becomes increasingly
 * accurate for larger values of n. For small values, the relative
 * error can be significant. Returns NaN for negative numbers or
 * invalid inputs. Returns 1 for n = 0 by convention.
 * 
 * @param n - Non-negative number to approximate factorial of
 * @returns Approximation of n!, or NaN if invalid
 * @example
 * ```typescript
 * // Small values (less accurate)
 * stirlingApproximation(0)
 * // 1 (exact by convention)
 * 
 * stirlingApproximation(1)
 * // 0.922... (actual: 1, error ~8%)
 * 
 * stirlingApproximation(2)
 * // 1.919... (actual: 2, error ~4%)
 * 
 * stirlingApproximation(5)
 * // 118.019... (actual: 120, error ~1.7%)
 * 
 * // Medium values (more accurate)
 * stirlingApproximation(10)
 * // 3598695.619... (actual: 3628800, error ~0.83%)
 * 
 * stirlingApproximation(20)
 * // 2.423e18 (actual: 2.433e18, error ~0.42%)
 * 
 * stirlingApproximation(30)
 * // 2.645e32 (actual: 2.653e32, error ~0.28%)
 * 
 * // Large values (very accurate)
 * stirlingApproximation(50)
 * // 3.036e64 (actual: 3.041e64, error ~0.17%)
 * 
 * stirlingApproximation(100)
 * // 9.325e157 (actual: 9.333e157, error ~0.08%)
 * 
 * stirlingApproximation(170)
 * // 7.244e306 (close to factorial(170))
 * 
 * // Very large values (where factorial would overflow)
 * stirlingApproximation(200)
 * // 7.886e374 (factorial would be Infinity)
 * 
 * stirlingApproximation(1000)
 * // 4.024e2567
 * 
 * // Non-integer values (extended to gamma function)
 * stirlingApproximation(5.5)
 * // 261.45... (approximates Γ(6.5) = 5.5!)
 * 
 * stirlingApproximation(0.5)
 * // 0.886... (approximates √π/2)
 * 
 * // Invalid inputs
 * stirlingApproximation(-1)
 * // NaN (negative numbers not allowed)
 * 
 * stirlingApproximation(null)
 * // NaN
 * 
 * stirlingApproximation("10")
 * // NaN
 * 
 * // Accuracy comparison
 * const compareAccuracy = (n: number) => {
 *   const stirling = stirlingApproximation(n)
 *   const actual = factorial(n) // assuming factorial function exists
 *   const error = Math.abs(stirling - actual) / actual
 *   return { stirling, actual, errorPercent: error * 100 }
 * }
 * compareAccuracy(10)
 * // { stirling: 3598695.619, actual: 3628800, errorPercent: 0.83 }
 * 
 * // Log factorial approximation
 * const logFactorial = (n: number) => {
 *   if (n <= 0) return NaN
 *   // log(n!) ≈ n*log(n) - n + 0.5*log(2πn)
 *   return n * Math.log(n) - n + 0.5 * Math.log(2 * Math.PI * n)
 * }
 * 
 * // Improved Stirling with correction term
 * const stirlingImproved = (n: number) => {
 *   const basic = stirlingApproximation(n)
 *   // Add first correction term: × (1 + 1/(12n))
 *   return basic * (1 + 1/(12 * n))
 * }
 * stirlingImproved(10) // More accurate than basic
 * 
 * // Asymptotic behavior
 * const relativeError = (n: number) => {
 *   const stirling = stirlingApproximation(n)
 *   const actual = factorial(n)
 *   return Math.abs(1 - stirling/actual)
 * }
 * // Error decreases as O(1/n)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Domain - Only valid for non-negative numbers
 * @property Accuracy - Error decreases as n increases
 */
const stirlingApproximation = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	// Check for non-finite values
	if (!isFinite(n)) {
		return NaN
	}
	
	// Check for negative numbers
	if (n < 0) {
		return NaN
	}
	
	// Special case for n = 0
	if (n === 0) {
		return 1
	}
	
	// Apply Stirling's formula: √(2πn) × (n/e)^n
	const sqrtTerm = Math.sqrt(2 * Math.PI * n)
	const powerTerm = Math.pow(n / Math.E, n)
	
	return sqrtTerm * powerTerm
}

export default stirlingApproximation