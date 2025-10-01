import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const clampDate = <
	T extends {
		compare(other: T): number
	},
>(min: T | null | undefined) =>
(max: T | null | undefined) =>
(date: T | null | undefined): T | null => {
	if (isNullish(min) || isNullish(max) || isNullish(date)) {
		return null
	}

	// Ensure all parameters have a compare method
	if (
		typeof min.compare !== "function" ||
		typeof max.compare !== "function" ||
		typeof date.compare !== "function"
	) {
		return null
	}

	try {
		// Compare with minimum
		if (date.compare(min) < 0) {
			return min
		}

		// Compare with maximum
		if (date.compare(max) > 0) {
			return max
		}

		// Within bounds
		return date
	} catch {
		return null
	}
}

export default clampDate
