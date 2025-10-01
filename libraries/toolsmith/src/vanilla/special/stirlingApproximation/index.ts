import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const stirlingApproximation = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	// Check for non-finite values
	if (!isFinite(n)) {
		return NaN
	}

	// Check for negative numbers
	if (n < 0) {
		return NaN
	}

	// Special case for n = 0
	if (n === 0) {
		return 1
	}

	// Apply Stirling's formula: √(2πn) × (n/e)^n
	const sqrtTerm = Math.sqrt(2 * Math.PI * n)
	const powerTerm = Math.pow(n / Math.E, n)

	return sqrtTerm * powerTerm
}

export default stirlingApproximation
