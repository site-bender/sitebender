//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const digitSum = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	if (!isFinite(n)) {
		return NaN
	}

	// Get absolute value and truncate to integer
	const absInt = Math.abs(Math.trunc(n))

	// Convert to string and sum digits
	const digits = absInt.toString()
	let sum = 0

	for (const digit of digits) {
		sum += parseInt(digit, 10)
	}

	return sum
}

export default digitSum
