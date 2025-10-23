import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a number can be exactly represented as a percent
//++ Validates number is finite, in range 0-1, and has at most 4 decimal places
export default function isPercent(n: number): n is Percent {
	if (!Number.isFinite(n)) {
		return false
	}

	if (n < 0 || n > 1) {
		return false
	}

	const SCALE_FACTOR = 10000
	const scaled = Math.round(n * SCALE_FACTOR)
	const reconstructed = scaled / SCALE_FACTOR

	return Math.abs(n - reconstructed) <= Number.EPSILON
}
