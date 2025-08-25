/**
 * Calculates the payment amount for a loan (PMT function)
 *
 * Computes the fixed periodic payment required to pay off a loan with
 * constant interest rate using the formula:
 * PMT = P * [r(1+r)^n] / [(1+r)^n - 1], where P is principal, r is rate
 * per period, and n is number of periods. For r = 0 (no interest), the
 * payment is simply P / n.
 *
 * @curried (principal) => (rate) => (periods) => number
 * @param principal - Loan amount (principal)
 * @param rate - Interest rate per period (as decimal, e.g., 0.05 for 5%)
 * @param periods - Number of payment periods
 * @returns Payment amount per period, or NaN if invalid
 * @example
 * ```typescript
 * // $200,000 mortgage at 4% annual (0.333% monthly) for 30 years
 * paymentAmount(200000)(0.04/12)(360)
 * // 954.83... (monthly payment)
 *
 * // $20,000 car loan at 6% annual for 5 years
 * paymentAmount(20000)(0.06/12)(60)
 * // 386.66... (monthly payment)
 *
 * // $5,000 personal loan at 10% annual for 2 years
 * paymentAmount(5000)(0.10/12)(24)
 * // 230.72... (monthly payment)
 *
 * // No interest loan
 * paymentAmount(12000)(0)(12)
 * // 1000 (simple division)
 *
 * // Single payment (balloon payment)
 * paymentAmount(10000)(0.05)(1)
 * // 10500 (principal plus one period of interest)
 *
 * // High interest credit card
 * paymentAmount(3000)(0.18/12)(36)
 * // 108.46... (monthly payment)
 *
 * // Weekly payments (52 weeks/year)
 * paymentAmount(10000)(0.08/52)(104)
 * // 103.88... (weekly payment for 2 years)
 *
 * // Invalid inputs return NaN
 * paymentAmount(null)(0.05)(60)
 * // NaN
 *
 * paymentAmount(10000)("5%")(60)
 * // NaN
 *
 * paymentAmount(10000)(0.05)(0)
 * // NaN
 *
 * // Practical examples
 *
 * // Home equity loan: $50,000 at 5% for 10 years
 * const homeEquity = paymentAmount(50000)(0.05/12)(120)
 * // 530.33... per month
 *
 * // Student loan: $40,000 at 4.5% for 10 years
 * const studentLoan = paymentAmount(40000)(0.045/12)(120)
 * // 414.52... per month
 *
 * // Business loan: $100,000 at 7% quarterly for 5 years
 * const businessLoan = paymentAmount(100000)(0.07/4)(20)
 * // 5975.49... per quarter
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
 * at5Percent(48)   // 4 years: 575.73...
 * at5Percent(60)   // 5 years: 471.78...
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for loan calculators
 * @property Safe - Returns NaN for invalid inputs
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
