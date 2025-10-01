//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const isOdd = (
	n: number | null | undefined,
): boolean => {
	if (isNullish(n) || typeof n !== "number") {
		return false
	}

	// Check for special values
	if (!isFinite(n) || isNaN(n)) {
		return false
	}

	// Check for integer
	if (!Number.isInteger(n)) {
		return false
	}

	// Check if not divisible by 2
	return n % 2 !== 0
}

export default isOdd
