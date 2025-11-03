import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function randomInteger(
	min: number | null | undefined,
) {
	return function generateRandomUpTo(
		max: number | null | undefined,
	): number {
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

		// Check if bounds are integers
		if (!Number.isInteger(min) || !Number.isInteger(max)) {
			return NaN
		}

		// Validate range
		if (min >= max) {
			return NaN
		}

		// Generate random integer in range [min, max)
		return Math.floor(Math.random() * (max - min)) + min
	}
}
