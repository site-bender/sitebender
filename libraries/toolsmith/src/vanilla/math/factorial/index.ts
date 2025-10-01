import isNullish from "../../validation/isNullish/index.ts"

//++ Calculates n! for non-negative integers; returns Infinity for n>170 and NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const factorial = (
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

	// Check for values that would overflow
	if (n > 170) {
		return Infinity
	}

	// Base cases
	if (n === 0 || n === 1) {
		return 1
	}

	// Calculate factorial iteratively (more efficient than recursion)
	let result = 1
	for (let i = 2; i <= n; i++) {
		result *= i
	}

	return result
}

export default factorial

//?? [EXAMPLE] factorial(0) // 1
//?? [EXAMPLE] factorial(5) // 120
//?? [EXAMPLE] factorial(-1) // NaN
