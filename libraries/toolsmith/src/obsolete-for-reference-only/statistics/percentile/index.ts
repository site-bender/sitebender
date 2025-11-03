import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function percentile(
	p: number | null | undefined,
) {
	return function calculatePercentileForData(
		data: number[] | null | undefined,
	): number {
		if (isNullish(p) || typeof p !== "number") {
			return NaN
		}

		if (p < 0 || p > 100) {
			return NaN
		}

		if (isNullish(data) || !Array.isArray(data)) {
			return NaN
		}

		if (data.length === 0) {
			return NaN
		}

		// Check for non-numeric values
		const hasInvalidValues = data.some(function checkInvalidValue(value) {
			return isNullish(value) || typeof value !== "number"
		})

		if (hasInvalidValues) {
			return NaN
		}

		// Sort the data
		const sorted = [...data].sort(function sortNumbers(a, b) {
			return a - b
		})

		// Handle edge cases
		if (p === 0) {
			return sorted[0]
		}
		if (p === 100) {
			return sorted[sorted.length - 1]
		}

		// Calculate the position
		const index = (p / 100) * (sorted.length - 1)
		const lower = Math.floor(index)
		const upper = Math.ceil(index)
		const weight = index - lower

		// Interpolate if necessary
		if (lower === upper) {
			return sorted[lower]
		}

		return sorted[lower] * (1 - weight) + sorted[upper] * weight
	}
}
