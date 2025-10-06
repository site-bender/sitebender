import type { Float } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a number is finite (excludes Infinity, -Infinity, and NaN)
export default function _isFloat(n: number): n is Float {
	return Number.isFinite(n)
}
