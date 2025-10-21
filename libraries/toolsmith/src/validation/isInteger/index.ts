import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a number is a safe integer within JavaScript safe integer range
export default function isInteger(n: number): n is Integer {
	/*++
	 + [EXCEPTION] Number.isSafeInteger is permitted here as this function is a wrapper for it
	 + This is the ONLY place Number.isSafeInteger should be called directly
	 + Everywhere else, use this `isInteger` function instead
	 */
	return Number.isSafeInteger(n)
}
