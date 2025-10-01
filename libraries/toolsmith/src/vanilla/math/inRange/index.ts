//++ Checks if a number is within a [start, end) range; returns false on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const inRange = (
	start: number | null | undefined,
) =>
(
	end: number | null | undefined,
) =>
(
	value: number | null | undefined,
): boolean => {
	if (isNullish(start) || typeof start !== "number") {
		return false
	}

	if (isNullish(end) || typeof end !== "number") {
		return false
	}

	if (isNullish(value) || typeof value !== "number") {
		return false
	}

	// Handle NaN
	if (isNaN(start) || isNaN(end) || isNaN(value)) {
		return false
	}

	// Auto-swap if start > end
	const min = Math.min(start, end)
	const max = Math.max(start, end)

	// Check range [min, max)
	return value >= min && value < max
}

export default inRange
