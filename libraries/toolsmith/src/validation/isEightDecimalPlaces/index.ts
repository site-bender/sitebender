import type { EightDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a number can be exactly represented with 8 decimal places
export default function isEightDecimalPlaces(
	n: number,
): n is EightDecimalPlaces {
	if (!Number.isFinite(n)) {
		return false
	}

	const SCALE_FACTOR = 100000000
	const scaled = Math.round(n * SCALE_FACTOR)
	const reconstructed = scaled / SCALE_FACTOR

	return Math.abs(n - reconstructed) <= Number.EPSILON
}
