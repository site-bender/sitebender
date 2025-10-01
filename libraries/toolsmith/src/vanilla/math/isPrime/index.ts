import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isPrime = (
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

	// Numbers less than 2 are not prime
	if (n < 2) {
		return false
	}

	// 2 is the only even prime
	if (n === 2) {
		return true
	}

	// Even numbers greater than 2 are not prime
	if (n % 2 === 0) {
		return false
	}

	// Check odd divisors up to sqrt(n)
	const limit = Math.sqrt(n)
	for (let i = 3; i <= limit; i += 2) {
		if (n % i === 0) {
			return false
		}
	}

	return true
}

export default isPrime
