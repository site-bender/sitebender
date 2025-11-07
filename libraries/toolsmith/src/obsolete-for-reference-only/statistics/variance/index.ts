import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function variance(
	isSample: boolean = false,
) {
	return function calculateVarianceForValues(
		values: Array<number> | null | undefined,
	): number {
		if (isNullish(values) || !Array.isArray(values)) {
			return NaN
		}

		const n = values.length

		if (n === 0) {
			return NaN
		}

		// Sample variance undefined for n = 1
		if (isSample && n === 1) {
			return NaN
		}

		// Calculate mean
		if (
			values.some(function isNotNumber(v) {
				return typeof v !== "number"
			})
		) {
			return NaN
		}
		const mean = values.reduce(function sumValues(sum, value) {
			return sum + value
		}, 0) / n

		// Calculate sum of squared differences
		const sumSquaredDiff = values.reduce(
			function sumSquaredDifferences(sum, value) {
				const diff = value - mean
				return sum + diff * diff
			},
			0,
		)

		// Divide by n for population, n-1 for sample (Bessel's correction)
		const divisor = isSample ? n - 1 : n

		return sumSquaredDiff / divisor
	}
}
