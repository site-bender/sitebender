import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const inverseLinearInterpolation = (
	start: number | null | undefined,
) =>
(
	end: number | null | undefined,
) =>
(
	value: number | null | undefined,
): number => {
	if (isNullish(start) || typeof start !== "number") {
		return NaN
	}

	if (isNullish(end) || typeof end !== "number") {
		return NaN
	}

	if (isNullish(value) || typeof value !== "number") {
		return NaN
	}

	// Check for non-finite values
	if (!isFinite(start) || !isFinite(end) || !isFinite(value)) {
		return NaN
	}

	// Cannot invert when start equals end (zero range)
	const range = end - start
	if (range === 0) {
		return NaN
	}

	// Calculate t parameter
	return (value - start) / range
}

export default inverseLinearInterpolation
