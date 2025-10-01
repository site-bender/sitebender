import mean from "../../math/mean/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import standardDeviation from "../standardDeviation/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function skewness(
	data: number[] | null | undefined,
): number {
	if (isNullish(data) || !Array.isArray(data)) {
		return NaN
	}

	const n = data.length

	// Need at least 3 values for skewness
	if (n < 3) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalidValues = data.some(function checkInvalidValue(value) {
		return isNullish(value) || typeof value !== "number"
	})

	if (hasInvalidValues) {
		return NaN
	}

	// Calculate mean
	const dataMean = mean(data)
	if (isNaN(dataMean)) {
		return NaN
	}

	// Calculate standard deviation (population)
	const std = standardDeviation(false)(data)
	if (isNaN(std) || std === 0) {
		// If standard deviation is 0, all values are the same
		// Skewness is undefined but we return 0 for uniform distribution
		return 0
	}

	// Calculate the third standardized moment
	const sumCubed = data.reduce(function calculateCubedSum(sum, value) {
		const z = (value - dataMean) / std
		return sum + z * z * z
	}, 0)

	// Apply adjustment factor for sample skewness (G1)
	// This is the adjusted Fisher-Pearson standardized moment coefficient
	const g1 = (n / ((n - 1) * (n - 2))) * sumCubed

	return g1
}
