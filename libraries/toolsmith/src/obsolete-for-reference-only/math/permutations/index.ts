import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const permutations = (
	n: number | null | undefined,
) =>
(
	r: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	if (isNullish(r) || typeof r !== "number") {
		return NaN
	}

	// Check for non-integers
	if (!Number.isInteger(n) || !Number.isInteger(r)) {
		return NaN
	}

	// Check for negative values
	if (n < 0 || r < 0) {
		return NaN
	}

	// Check if r > n
	if (r > n) {
		return NaN
	}

	// Edge case optimizations
	if (r === 0) {
		return 1
	}

	if (r === 1) {
		return n
	}

	// For small values, use direct calculation to avoid factorial overflow
	// P(n,r) = n × (n-1) × (n-2) × ... × (n-r+1)
	return Array.from({ length: r }, (_, i) => n - i)
		.reduce((acc, val) => acc * val, 1)
}

export default permutations
