import mean from "../../math/mean/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import standardDeviation from "../standardDeviation/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function zScore(
	value: number | null | undefined,
) {
	return function calculateZScoreForData(
		data: number[] | null | undefined,
	) {
		return function calculateZScoreWithSampleFlag(
			sample: boolean = false,
		): number {
			if (isNullish(value) || typeof value !== "number") {
				return NaN
			}

			if (isNullish(data) || !Array.isArray(data)) {
				return NaN
			}

			if (data.length === 0) {
				return NaN
			}

			// Check for non-numeric values in data
			if (
				data.some(function isInvalidValue(d) {
					return isNullish(d) || typeof d !== "number"
				})
			) {
				return NaN
			}

			const dataMean = mean(data)
			const dataStdDev = standardDeviation(sample)(data)

			// Can't calculate z-score if standard deviation is 0
			if (dataStdDev === 0) {
				// Special case: if value equals the mean (all values are the same), return 0
				if (value === dataMean) {
					return 0
				}
				return NaN
			}

			return (value - dataMean) / dataStdDev
		}
	}
}
