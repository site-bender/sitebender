import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
	if (isNullish(principal) || typeof principal !== "number") {
		return []
	}

	if (isNullish(rate) || typeof rate !== "number") {
		return []
	}

	if (isNullish(periods) || typeof periods !== "number") {
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
}

export default amortizationSchedule
