import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function combinations(
	n: number | null | undefined,
) {
	return function chooseItems(
		r: number | null | undefined,
	): number {
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

		// Optimize for edge cases
		if (r === 0 || r === n) {
			return 1
		}

		// Optimize by using the smaller of r or n-r
		// C(n,r) = C(n,n-r), so use the smaller value for efficiency
		const k = r > n - r ? n - r : r

		// Calculate using optimized formula to avoid large factorials
		// This is more efficient than n! / (r! * (n-r)!)
		function calculateCombination(acc: number, i: number): number {
			if (i >= k) return acc
			return calculateCombination(acc * (n - i) / (i + 1), i + 1)
		}

		return Math.round(calculateCombination(1, 0)) // Round to handle floating point errors
	}
}
