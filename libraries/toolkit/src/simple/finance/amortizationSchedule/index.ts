/**
 * Generates a loan amortization schedule
 *
 * Creates a detailed payment schedule showing how each payment is split
 * between principal and interest over the life of a loan. Each entry
 * includes the payment number, payment amount, interest portion, principal
 * portion, and remaining balance. The schedule demonstrates how early
 * payments are mostly interest while later payments are mostly principal.
 *
 * @param principal - Initial loan amount
 * @param rate - Interest rate per period (as decimal)
 * @param periods - Number of payment periods
 * @returns Array of amortization entries, or empty array if invalid
 * @example
 * ```typescript
 * // Simple loan: $1000 at 1% monthly for 3 months
 * amortizationSchedule(1000)(0.01)(3)
 * // Returns 3 payment entries with decreasing interest
 *
 * // No interest loan
 * amortizationSchedule(1200)(0)(4)
 * // 4 equal payments of $300 principal
 *
 * // View total interest paid
 * const schedule = amortizationSchedule(50000)(0.06/12)(60)
 * const totalInterest = schedule.reduce(
 *   (sum, entry) => sum + entry.interest, 0
 * )
 *
 * // Partial application
 * const fiveYearLoan = (amount: number) =>
 *   amortizationSchedule(amount)(0.07/12)(60)
 * fiveYearLoan(10000)  // Small loan
 * fiveYearLoan(50000)  // Large loan
 *
 * // Invalid inputs
 * amortizationSchedule(null)(0.05)(12)  // []
 * amortizationSchedule(10000)(0.05)(0)  // []
 * ```
 * @pure
 * @curried
 * @safe - Returns empty array for invalid inputs
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

	const balance = principal

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

	// Generate schedule using recursion
	const generateSchedule = (
		period: number,
		remainingBalance: number,
		accumulator: Array<AmortizationEntry>,
	): Array<AmortizationEntry> => {
		if (period > periods || remainingBalance <= 0.01) {
			return accumulator
		}

		const interestPayment = remainingBalance * rate
		const principalPayment = period === periods
			? remainingBalance
			: payment - interestPayment
		const actualPayment = period === periods
			? principalPayment + interestPayment
			: payment
		const newBalance = remainingBalance - principalPayment

		const entry: AmortizationEntry = {
			period,
			payment: Math.round(actualPayment * 100) / 100,
			interest: Math.round(interestPayment * 100) / 100,
			principal: Math.round(principalPayment * 100) / 100,
			balance: Math.round(Math.max(0, newBalance) * 100) / 100,
		}

		return generateSchedule(
			period + 1,
			newBalance,
			[...accumulator, entry],
		)
	}

	return generateSchedule(1, balance, [])

	return schedule
}

export default amortizationSchedule
