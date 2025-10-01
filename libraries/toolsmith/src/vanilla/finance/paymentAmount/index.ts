import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const paymentAmount = (
	principal: number | null | undefined,
) =>
(
	rate: number | null | undefined,
) =>
(
	periods: number | null | undefined,
): number => {
	if (isNullish(principal) || typeof principal !== "number") {
		return NaN
	}

	if (isNullish(rate) || typeof rate !== "number") {
		return NaN
	}

	if (isNullish(periods) || typeof periods !== "number") {
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
