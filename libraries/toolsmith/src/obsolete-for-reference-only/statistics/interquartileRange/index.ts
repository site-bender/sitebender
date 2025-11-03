import isNullish from "../../validation/isNullish/index.ts"
import percentile from "../percentile/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const interquartileRange = (
	data: number[] | null | undefined,
): number => {
	if (isNullish(data) || !Array.isArray(data)) {
		return NaN
	}

	if (data.length === 0) {
		return NaN
	}

	// Calculate Q1 (25th percentile) and Q3 (75th percentile)
	const q1 = percentile(25)(data)
	const q3 = percentile(75)(data)

	// If either percentile is NaN, return NaN
	if (isNaN(q1) || isNaN(q3)) {
		return NaN
	}

	// IQR is the difference between Q3 and Q1
	return q3 - q1
}

export default interquartileRange
