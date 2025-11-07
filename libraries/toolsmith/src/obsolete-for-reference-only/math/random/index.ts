import isNullish from "../../validation/isNullish/index.ts"

//++ Generates a random float in [min, max); returns NaN on invalid range
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const random = (
	min: number | null | undefined,
) =>
(
	max: number | null | undefined,
): number => {
	if (isNullish(min) || typeof min !== "number") {
		return NaN
	}

	if (isNullish(max) || typeof max !== "number") {
		return NaN
	}

	// Check for NaN inputs
	if (isNaN(min) || isNaN(max)) {
		return NaN
	}

	// Validate range
	if (min >= max) {
		return NaN
	}

	// Generate random number in range [min, max)
	return Math.random() * (max - min) + min
}

export default random
