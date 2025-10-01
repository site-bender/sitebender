import mean from "../../math/mean/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function correlation(
	x: number[] | null | undefined,
) {
	return function correlateWithFirstDataset(
		y: number[] | null | undefined,
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

		if (x.length === 0) {
			return NaN
		}

		// Need at least 2 points for correlation
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

		// Calculate covariance and standard deviations
		const stats = x.reduce(function calculateStats(acc, xi, i) {
			const dx = xi - meanX
			const dy = y[i] - meanY
			return {
				covariance: acc.covariance + dx * dy,
				varianceX: acc.varianceX + dx * dx,
				varianceY: acc.varianceY + dy * dy,
			}
		}, { covariance: 0, varianceX: 0, varianceY: 0 })

		const { covariance, varianceX, varianceY } = stats

		// Check for zero variance (constant values)
		if (varianceX === 0 || varianceY === 0) {
			return 0
		}

		// Calculate correlation coefficient
		const stdDevX = Math.sqrt(varianceX)
		const stdDevY = Math.sqrt(varianceY)

		return covariance / (stdDevX * stdDevY)
	}
}
