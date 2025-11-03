import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const futureValue = (
	rate: number | null | undefined,
) =>
(
	periods: number | null | undefined,
) =>
(
	payment: number | null | undefined,
) =>
(
	presentValue: number | null | undefined,
) =>
(
	type: number = 0,
): number => {
	if (isNullish(rate) || typeof rate !== "number") {
		return NaN
	}

	if (isNullish(periods) || typeof periods !== "number") {
		return NaN
	}

	if (isNullish(payment) || typeof payment !== "number") {
		return NaN
	}

	if (isNullish(presentValue) || typeof presentValue !== "number") {
		return NaN
	}

	if (isNullish(type) || typeof type !== "number") {
		return NaN
	}

	// Validate inputs
	if (periods < 0 || !Number.isFinite(periods)) {
		return NaN
	}

	if (type !== 0 && type !== 1) {
		return NaN
	}

	// Handle zero periods
	if (periods === 0) {
		return -presentValue
	}

	// Calculate compound factor
	const compoundFactor = Math.pow(1 + rate, periods)

	// Calculate future value of present value
	const fvOfPv = -presentValue * compoundFactor

	// Calculate future value of payments
	let fvOfPayments = 0
	if (payment !== 0) {
		if (rate === 0) {
			// Simple case: no interest
			fvOfPayments = -payment * periods
		} else {
			// Annuity formula
			fvOfPayments = -payment * ((compoundFactor - 1) / rate)

			// Adjust for payment timing
			if (type === 1) {
				// Payments at beginning of period
				fvOfPayments *= 1 + rate
			}
		}
	}

	return fvOfPv + fvOfPayments
}

export default futureValue
