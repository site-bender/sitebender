import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const binomialCoefficient = (
	n: number | null | undefined,
) =>
(
	k: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	if (isNullish(k) || typeof k !== "number") {
		return NaN
	}

	// Check for non-integers
	if (!Number.isInteger(n) || !Number.isInteger(k)) {
		return NaN
	}

	// Check for negative values
	if (n < 0 || k < 0) {
		return NaN
	}

	// Check if k > n
	if (k > n) {
		return NaN
	}

	// Optimize for edge cases
	if (k === 0 || k === n) {
		return 1
	}

	// Optimize by using C(n,k) = C(n,n-k) when k > n/2
	const kOptimized = k > n - k ? n - k : k

	// Calculate using multiplicative formula to avoid large factorials
	// C(n,k) = n * (n-1) * ... * (n-k+1) / (k * (k-1) * ... * 1)
	const calculate = (acc: number, i: number): number => {
		if (i > kOptimized) return acc
		return calculate(acc * (n - kOptimized + i) / i, i + 1)
	}
	const result = calculate(1, 1)

	// Round to handle floating point errors
	return Math.round(result)
}

export default binomialCoefficient
