import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const velocity = (
	distance: number | null | undefined,
) =>
(
	time: number | null | undefined,
): number => {
	if (isNullish(distance) || typeof distance !== "number") {
		return NaN
	}

	if (isNullish(time) || typeof time !== "number") {
		return NaN
	}

	// Check for non-finite values
	if (!isFinite(distance) || !isFinite(time)) {
		return NaN
	}

	// Time must be positive (cannot be zero or negative)
	if (time <= 0) {
		return NaN
	}

	// Calculate velocity
	return distance / time
}

export default velocity
