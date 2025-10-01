import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const errorFunction = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Use Abramowitz and Stegun approximation
	// Maximum error: 5×10^-4
	const sign = x >= 0 ? 1 : -1
	x = Math.abs(x)

	const a1 = 0.254829592
	const a2 = -0.284496736
	const a3 = 1.421413741
	const a4 = -1.453152027
	const a5 = 1.061405429
	const p = 0.3275911

	// A&S formula 7.1.26
	const t = 1.0 / (1.0 + p * x)
	const t2 = t * t
	const t3 = t2 * t
	const t4 = t3 * t
	const t5 = t4 * t

	const y = 1.0 -
		(((((a5 * t5 + a4 * t4) + a3 * t3) + a2 * t2) + a1 * t) *
			Math.exp(-x * x))

	return sign * y
}

export default errorFunction
