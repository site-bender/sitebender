import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const totient = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	// Check for non-integer
	if (!Number.isInteger(n)) {
		return NaN
	}

	// Check for non-positive
	if (n <= 0) {
		return NaN
	}

	// Special case for n = 1
	if (n === 1) {
		return 1
	}

	// Use the formula: φ(n) = n * Π(1 - 1/p) for all prime factors p
	// We'll implement this by factorizing and applying the formula
	let result = n
	let temp = n

	// Check for factor of 2
	if (temp % 2 === 0) {
		result = result / 2
		while (temp % 2 === 0) {
			temp = temp / 2
		}
	}

	// Check for odd factors
	for (let i = 3; i * i <= temp; i += 2) {
		if (temp % i === 0) {
			result = result - result / i
			while (temp % i === 0) {
				temp = temp / i
			}
		}
	}

	// If temp > 1, then it's a prime factor
	if (temp > 1) {
		result = result - result / temp
	}

	return Math.floor(result)
}

export default totient
