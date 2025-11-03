import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const presentValue = (
	futureValue: number | null | undefined,
) =>
(
	rate: number | null | undefined,
) =>
(
	periods: number | null | undefined,
): number => {
	if (isNullish(futureValue) || typeof futureValue !== "number") {
		return NaN
	}

	if (isNullish(rate) || typeof rate !== "number") {
		return NaN
	}

	// Rate must be greater than -1 (can't lose more than 100%)
	if (rate <= -1) {
		return NaN
	}

	if (isNullish(periods) || typeof periods !== "number") {
		return NaN
	}

	if (periods < 0) {
		return NaN
	}

	// Special case: zero periods means no discounting
	if (periods === 0) {
		return futureValue
	}

	// Special case: zero rate means no discounting
	if (rate === 0) {
		return futureValue
	}

	// PV = FV / (1 + r)^n
	return futureValue / Math.pow(1 + rate, periods)
}

export default presentValue
