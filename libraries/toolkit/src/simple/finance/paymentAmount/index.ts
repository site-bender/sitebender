/**
 * Calculates the payment amount for a loan (PMT function)
 *
 * Computes the fixed periodic payment required to pay off a loan with
 * constant interest rate using the formula:
 * PMT = P * [r(1+r)^n] / [(1+r)^n - 1], where P is principal, r is rate
 * per period, and n is number of periods. For r = 0 (no interest), the
 * payment is simply P / n.
 *
 * @param principal - Loan amount (principal)
 * @param rate - Interest rate per period (as decimal, e.g., 0.05 for 5%)
 * @param periods - Number of payment periods
 * @returns Payment amount per period, or NaN if invalid
 * @example
 * ```typescript
 * // $200,000 mortgage at 4% annual (0.333% monthly) for 30 years
 * paymentAmount(200000)(0.04/12)(360) // 954.83... (monthly payment)
 *
 * // $20,000 car loan at 6% annual for 5 years
 * paymentAmount(20000)(0.06/12)(60) // 386.66... (monthly payment)
 *
 * // No interest loan
 * paymentAmount(12000)(0)(12) // 1000 (simple division)
 *
 * // Partial application for mortgage calculator
 * const thirtyYearMortgage = paymentAmount(300000)(0.035/12)
 * thirtyYearMortgage(360)  // 30 years: 1347.13...
 * thirtyYearMortgage(180)  // 15 years: 2144.65...
 *
 * // Compare different loan terms
 * const loanCalculator = paymentAmount(25000)
 * const at5Percent = loanCalculator(0.05/12)
 * at5Percent(36)   // 3 years: 749.27...
 * at5Percent(60)   // 5 years: 471.78...
 *
 * // Edge cases
 * paymentAmount(10000)(0.05)(0) // NaN (invalid periods)
 * paymentAmount(null)(0.05)(60) // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const paymentAmount = (
	principal: number | null | undefined,
) =>
(
	rate: number | null | undefined,
) =>
(
	periods: number | null | undefined,
): number => {
	if (principal == null || typeof principal !== "number") {
		return NaN
	}

	if (rate == null || typeof rate !== "number") {
		return NaN
	}

	if (periods == null || typeof periods !== "number") {
		return NaN
	}

	// Principal and periods must be positive
	if (principal <= 0 || periods <= 0) {
		return NaN
	}

	// Special case: no interest
	if (rate === 0) {
		return principal / periods
	}

	// Standard loan payment formula
	const factor = Math.pow(1 + rate, periods)
	const payment = principal * (rate * factor) / (factor - 1)

	return payment
}

export default paymentAmount
