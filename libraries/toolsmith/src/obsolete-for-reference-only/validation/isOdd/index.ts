//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isOdd = (value: unknown): boolean => {
	// Check if it's a number and an integer
	if (typeof value !== "number" || !Number.isInteger(value)) {
		return false
	}

	// Check if it's finite (not NaN or Infinity)
	if (!Number.isFinite(value)) {
		return false
	}

	// Check if not divisible by 2 (remainder is 1 or -1)
	return value % 2 !== 0
}

export default isOdd
