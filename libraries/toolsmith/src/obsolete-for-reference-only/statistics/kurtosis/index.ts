import mean from "../../math/mean/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import standardDeviation from "../standardDeviation/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function kurtosis(
	data: number[] | null | undefined,
): number {
	if (isNullish(data) || !Array.isArray(data)) {
		return NaN
	}

	const n = data.length

	// Need at least 4 values for kurtosis
	if (n < 4) {
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
		// Kurtosis is undefined but we return NaN for uniform values
		return NaN
	}

	// Calculate the fourth standardized moment
	const sumQuad = data.reduce(function calculateFourthMoment(sum, value) {
		const z = (value - dataMean) / std
		return sum + z * z * z * z
	}, 0)

	// Calculate raw kurtosis (fourth moment)
	const m4 = sumQuad / n

	// Apply adjustment for sample kurtosis and convert to excess kurtosis
	// This is the adjusted excess kurtosis (G2)
	const numerator = n * (n + 1) * m4 - 3 * (n - 1) * (n - 1)
	const denominator = (n - 1) * (n - 2) * (n - 3)

	const g2 = numerator / denominator

	return g2
}
