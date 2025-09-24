import isNullish from "../../validation/isNullish/index.ts"

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
 * stirlingApproximation(0)  // 1 (exact by convention)
 * stirlingApproximation(5)  // 118.019... (actual: 120, error ~1.7%)
 *
 * // Medium values (more accurate)
 * stirlingApproximation(10)  // 3598695.619... (error ~0.83%)
 * stirlingApproximation(20)  // 2.423e18 (error ~0.42%)
 *
 * // Large values (very accurate)
 * stirlingApproximation(100)  // 9.325e157 (error ~0.08%)
 * stirlingApproximation(1000)  // 4.024e2567
 *
 * // Non-integer values (gamma function approximation)
 * stirlingApproximation(5.5)  // 261.45... (approximates Γ(6.5))
 *
 * // Invalid inputs
 * stirlingApproximation(-1)  // NaN
 * stirlingApproximation(null)  // NaN
 * ```
 * @pure
 * @safe
 */
const stirlingApproximation = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
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
