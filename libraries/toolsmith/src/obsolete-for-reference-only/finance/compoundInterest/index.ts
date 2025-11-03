import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const compoundInterest = (
	principal: number | null | undefined,
) =>
(
	rate: number | null | undefined,
) =>
(
	compounds: number | null | undefined,
) =>
(
	time: number | null | undefined,
): number => {
	if (isNullish(principal) || typeof principal !== "number") {
		return NaN
	}

	if (principal < 0) {
		return NaN
	}

	if (isNullish(rate) || typeof rate !== "number") {
		return NaN
	}

	// Rate can be negative but not below -100%
	if (rate < -1) {
		return NaN
	}

	if (isNullish(compounds) || typeof compounds !== "number") {
		return NaN
	}

	if (compounds <= 0) {
		return NaN
	}

	if (isNullish(time) || typeof time !== "number") {
		return NaN
	}

	if (time < 0) {
		return NaN
	}

	// Special case: zero time returns principal
	if (time === 0) {
		return principal
	}

	// Special case: zero rate returns principal
	if (rate === 0) {
		return principal
	}

	// Calculate compound interest: P(1 + r/n)^(nt)
	const base = 1 + rate / compounds
	const exponent = compounds * time

	return principal * Math.pow(base, exponent)
}

export default compoundInterest
