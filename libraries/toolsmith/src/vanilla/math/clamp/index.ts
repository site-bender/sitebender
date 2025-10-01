import isNullish from "../../validation/isNullish/index.ts"

//++ Constrains a number between min and max; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const clamp = (
	min: number | null | undefined,
) =>
(
	max: number | null | undefined,
) =>
(
	value: number | null | undefined,
): number => {
	if (isNullish(min) || typeof min !== "number") {
		return NaN
	}

	if (isNullish(max) || typeof max !== "number") {
		return NaN
	}

	if (isNullish(value) || typeof value !== "number") {
		return NaN
	}

	// Check for invalid range
	if (min > max) {
		return NaN
	}

	if (value < min) {
		return min
	}

	if (value > max) {
		return max
	}

	return value
}

export default clamp
