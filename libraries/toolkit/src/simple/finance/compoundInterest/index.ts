import { isNullish } from "../../validation/isNullish/index.ts"

/**
 * Calculates compound interest on a principal amount
 *
 * Computes the future value using the compound interest formula:
 * A = P(1 + r/n)^(nt), where P is principal, r is annual rate,
 * n is compounds per year, and t is time in years. Returns the
 * total amount (principal + interest). Returns NaN for invalid inputs.
 *
 * @param principal - Initial amount (must be non-negative)
 * @param rate - Annual interest rate as decimal (0.05 for 5%)
 * @param compounds - Number of times interest compounds per year
 * @param time - Time period in years
 * @returns Future value (principal + interest), or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * compoundInterest(1000)(0.05)(1)(1)    // 1050 (annual)
 * compoundInterest(1000)(0.05)(12)(1)   // 1051.16 (monthly)
 * compoundInterest(1000)(0.05)(365)(1)  // 1051.27 (daily)
 *
 * // Different periods
 * compoundInterest(1000)(0.05)(1)(5)   // 1276.28 (5 years)
 * compoundInterest(1000)(0.05)(1)(10)  // 1628.89 (10 years)
 *
 * // Edge cases
 * compoundInterest(1000)(0)(12)(5)    // 1000 (no interest)
 * compoundInterest(-1000)(0.05)(12)(1) // NaN (negative principal)
 *
 * // Partial application
 * const savings = compoundInterest(10000)(0.03)(12)
 * savings(1)   // 10304.16 (1 year)
 * savings(5)   // 11616.17 (5 years)
 * savings(10)  // 13493.54 (10 years)
 *
 * // Invalid inputs
 * compoundInterest(null)(0.05)(12)(1)  // NaN
 * compoundInterest(1000)(0.05)(0)(1)   // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs
 */
const compoundInterest = (
	principal: number | null | undefined,
) =>
(
	rate: number | null | undefined,
) =>
(
	compounds: number | null | undefined,
) =>
(
	time: number | null | undefined,
): number => {
	if (isNullish(principal) || typeof principal !== "number") {
		return NaN
	}

	if (principal < 0) {
		return NaN
	}

	if (isNullish(rate) || typeof rate !== "number") {
		return NaN
	}

	// Rate can be negative but not below -100%
	if (rate < -1) {
		return NaN
	}

	if (isNullish(compounds) || typeof compounds !== "number") {
		return NaN
	}

	if (compounds <= 0) {
		return NaN
	}

	if (isNullish(time) || typeof time !== "number") {
		return NaN
	}

	if (time < 0) {
		return NaN
	}

	// Special case: zero time returns principal
	if (time === 0) {
		return principal
	}

	// Special case: zero rate returns principal
	if (rate === 0) {
		return principal
	}

	// Calculate compound interest: P(1 + r/n)^(nt)
	const base = 1 + rate / compounds
	const exponent = compounds * time

	return principal * Math.pow(base, exponent)
}

export default compoundInterest
