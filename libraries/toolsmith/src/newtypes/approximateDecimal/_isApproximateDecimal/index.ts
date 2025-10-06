import type { ApproximateDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a number is finite (excludes Infinity, -Infinity, and NaN)
export default function _isApproximateDecimal(
	n: number,
): n is ApproximateDecimal {
	return Number.isFinite(n)
}
