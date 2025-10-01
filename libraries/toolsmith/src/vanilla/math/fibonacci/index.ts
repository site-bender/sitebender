import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const fibonacci = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	// Check for non-integer
	if (!Number.isInteger(n)) {
		return NaN
	}

	// Check for negative
	if (n < 0) {
		return NaN
	}

	// Check for values that would exceed MAX_SAFE_INTEGER
	// fibonacci(78) = 8944394323791464 < MAX_SAFE_INTEGER
	// fibonacci(79) = 14472334024676221 > MAX_SAFE_INTEGER
	if (n > 78) {
		return NaN
	}

	// Base cases
	if (n === 0) return 0
	if (n === 1) return 1

	// Iterative calculation (efficient)
	let prev = 0
	let curr = 1

	for (let i = 2; i <= n; i++) {
		const next = prev + curr
		prev = curr
		curr = next
	}

	return curr
}

export default fibonacci
