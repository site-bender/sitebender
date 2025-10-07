import type { RealNumber } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a number is finite (excludes Infinity, -Infinity, and NaN)
export default function _isRealNumber(
	n: number,
): n is RealNumber {
	return Number.isFinite(n)
}
