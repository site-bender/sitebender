import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a number is a safe integer within JavaScript safe integer range
export default function _isInteger(n: number): n is Integer {
	return Number.isSafeInteger(n)
}
