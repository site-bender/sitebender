import mean from "../../math/mean/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function covariance(
	x: number[] | null | undefined,
) {
	return function covarianceWithFirstDataset(
		y: number[] | null | undefined,
	) {
		return function calculateCovarianceWithSampleFlag(
			sample: boolean = false,
		): number {
			if (isNullish(x) || !Array.isArray(x)) {
				return NaN
			}

			if (isNullish(y) || !Array.isArray(y)) {
				return NaN
			}

			if (x.length !== y.length) {
				return NaN
			}

			// Need at least 2 points for covariance
			if (x.length < 2) {
				return NaN
			}

			// Check for non-numeric values
			const hasInvalidValues = x.some(function checkInvalidValues(val, i) {
				return isNullish(val) || typeof val !== "number" ||
					isNullish(y[i]) || typeof y[i] !== "number"
			})

			if (hasInvalidValues) {
				return NaN
			}

			// Calculate means
			const meanX = mean(x)
			const meanY = mean(y)

			// Calculate covariance
			const sum = x.reduce(function calculateCovarianceSum(acc, xi, i) {
				return acc + (xi - meanX) * (y[i] - meanY)
			}, 0)

			// Divide by n for population, n-1 for sample
			const divisor = sample ? x.length - 1 : x.length

			return sum / divisor
		}
	}
}
