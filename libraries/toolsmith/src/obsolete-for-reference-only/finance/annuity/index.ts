import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
