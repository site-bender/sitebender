import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the present value of an annuity
 *
 * Computes the present value of a series of equal periodic payments using
 * the formula: PV = PMT * [(1 - (1 + r)^(-n)) / r]. This represents the
 * lump sum amount that equals the value of all future payments when
 * discounted at the given interest rate. For r = 0 (no interest), the
 * present value is simply PMT * n.
 *
 * @param payment - Payment amount per period
 * @param rate - Interest rate per period (as decimal, e.g., 0.05 for 5%)
 * @param periods - Number of payment periods
 * @returns Present value of the annuity, or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * annuity(1000)(0.005)(60)  // 51725.56 (monthly payments)
 * annuity(5000)(0.08)(10)   // 33550.41 (annual payments)
 *
 * // Edge cases
 * annuity(1000)(0)(12)      // 12000 (no interest)
 * annuity(1000)(0.05)(1)    // 952.38 (single payment)
 * annuity(1000)(-0.02)(5)   // 5203.04 (negative rate)
 *
 * // Partial application
 * const retirementValue = annuity(3000)(0.06/12)
 * retirementValue(240)  // 20 years: 419924.89
 * retirementValue(360)  // 30 years: 500930.86
 *
 * // Invalid inputs
 * annuity(null)(0.05)(10)  // NaN
 * annuity(1000)(0.05)(-1)  // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs
 */
const annuity = (
	payment: number | null | undefined,
) =>
(
	rate: number | null | undefined,
) =>
(
	periods: number | null | undefined,
): number => {
	if (isNullish(payment) || typeof payment !== "number") {
		return NaN
	}

	if (isNullish(rate) || typeof rate !== "number") {
		return NaN
	}

	if (isNullish(periods) || typeof periods !== "number") {
		return NaN
	}

	// Periods must be positive
	if (periods <= 0) {
		return NaN
	}

	// Special case: no interest
	if (rate === 0) {
		return payment * periods
	}

	// Standard annuity formula
	const factor = (1 - Math.pow(1 + rate, -periods)) / rate
	return payment * factor
}

export default annuity
