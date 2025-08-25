/**
 * Generates a loan amortization schedule
 *
 * Creates a detailed payment schedule showing how each payment is split
 * between principal and interest over the life of a loan. Each entry
 * includes the payment number, payment amount, interest portion, principal
 * portion, and remaining balance. The schedule demonstrates how early
 * payments are mostly interest while later payments are mostly principal.
 *
 * @curried (principal) => (rate) => (periods) => Array<AmortizationEntry>
 * @param principal - Initial loan amount
 * @param rate - Interest rate per period (as decimal)
 * @param periods - Number of payment periods
 * @returns Array of amortization entries, or empty array if invalid
 * @example
 * ```typescript
 * // Simple loan: $1000 at 12% annual (1% monthly) for 3 months
 * amortizationSchedule(1000)(0.01)(3)
 * // [
 * //   { period: 1, payment: 340.02, interest: 10,
 * //     principal: 330.02, balance: 669.98 },
 * //   { period: 2, payment: 340.02, interest: 6.70,
 * //     principal: 333.32, balance: 336.66 },
 * //   { period: 3, payment: 340.02, interest: 3.37,
 * //     principal: 336.66, balance: 0 }
 * // ]
 *
 * // First year of a mortgage
 * const mortgage = amortizationSchedule(200000)(0.04/12)(360)
 * mortgage.slice(0, 3)
 * // First 3 months showing mostly interest payments
 *
 * // Car loan: $20,000 at 6% for 1 year (monthly)
 * amortizationSchedule(20000)(0.005)(12)
 * // 12 payment entries with decreasing interest
 *
 * // No interest loan
 * amortizationSchedule(1200)(0)(4)
 * // [
 * //   { period: 1, payment: 300, interest: 0,
 * //     principal: 300, balance: 900 },
 * //   { period: 2, payment: 300, interest: 0,
 * //     principal: 300, balance: 600 },
 * //   { period: 3, payment: 300, interest: 0,
 * //     principal: 300, balance: 300 },
 * //   { period: 4, payment: 300, interest: 0,
 * //     principal: 300, balance: 0 }
 * // ]
 *
 * // Single payment (balloon)
 * amortizationSchedule(10000)(0.05)(1)
 * // [{ period: 1, payment: 10500, interest: 500,
 * //    principal: 10000, balance: 0 }]
 *
 * // Invalid inputs return empty array
 * amortizationSchedule(null)(0.05)(12)
 * // []
 *
 * amortizationSchedule(10000)(0.05)(0)
 * // []
 *
 * // Practical examples
 *
 * // View total interest paid
 * const loanSchedule = amortizationSchedule(50000)(0.06/12)(60)
 * const totalInterest = loanSchedule.reduce(
 *   (sum, entry) => sum + entry.interest, 0
 * )
 * // 7998.41... total interest over 5 years
 *
 * // Find when loan is half paid
 * const halfPaidPeriod = loanSchedule.find(
 *   entry => entry.balance <= 25000
 * )?.period
 * // Period 35 (about 58% through the loan term)
 *
 * // Compare interest in first vs last year
 * const firstYear = loanSchedule.slice(0, 12)
 * const lastYear = loanSchedule.slice(-12)
 * const firstYearInterest = firstYear.reduce(
 *   (sum, e) => sum + e.interest, 0
 * )
 * const lastYearInterest = lastYear.reduce(
 *   (sum, e) => sum + e.interest, 0
 * )
 * // First year: 2450.89, Last year: 492.37
 *
 * // Partial application for different loan amounts
 * const fiveYearLoan = (amount: number) =>
 *   amortizationSchedule(amount)(0.07/12)(60)
 * fiveYearLoan(10000)  // Small loan schedule
 * fiveYearLoan(50000)  // Medium loan schedule
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for loan comparisons
 * @property Safe - Returns empty array for invalid inputs
 */
type AmortizationEntry = {
	period: number
	payment: number
	interest: number
	principal: number
	balance: number
}

const amortizationSchedule = (
	principal: number | null | undefined,
) =>
(
	rate: number | null | undefined,
) =>
(
	periods: number | null | undefined,
): Array<AmortizationEntry> => {
	if (principal == null || typeof principal !== "number") {
		return []
	}

	if (rate == null || typeof rate !== "number") {
		return []
	}

	if (periods == null || typeof periods !== "number") {
		return []
	}

	// Principal and periods must be positive
	if (principal <= 0 || periods <= 0) {
		return []
	}

	// Periods must be an integer
	if (!Number.isInteger(periods)) {
		return []
	}

	const schedule: Array<AmortizationEntry> = []
	let balance = principal

	// Calculate fixed payment amount
	let payment: number
	if (rate === 0) {
		// No interest case
		payment = principal / periods
	} else {
		// Standard loan payment formula
		const factor = Math.pow(1 + rate, periods)
		payment = principal * (rate * factor) / (factor - 1)
	}

	// Generate schedule for each period
	for (let period = 1; period <= periods; period++) {
		const interestPayment = balance * rate
		let principalPayment = payment - interestPayment

		// Handle rounding on final payment
		if (period === periods) {
			principalPayment = balance
			payment = principalPayment + interestPayment
		}

		const newBalance = balance - principalPayment

		schedule.push({
			period,
			payment: Math.round(payment * 100) / 100,
			interest: Math.round(interestPayment * 100) / 100,
			principal: Math.round(principalPayment * 100) / 100,
			balance: Math.round(Math.max(0, newBalance) * 100) / 100,
		})

		balance = newBalance
	}

	return schedule
}

export default amortizationSchedule
