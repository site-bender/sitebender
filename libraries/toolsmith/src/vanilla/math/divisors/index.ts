import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const divisors = (
	n: number | null | undefined,
): Array<number> => {
	if (isNullish(n) || typeof n !== "number") {
		return []
	}

	// Check for non-integer
	if (!Number.isInteger(n)) {
		return []
	}

	// Check for non-positive
	if (n <= 0) {
		return []
	}

	const result: Array<number> = []
	const sqrtN = Math.sqrt(n)

	// Find divisors up to √n
	for (let i = 1; i <= sqrtN; i++) {
		if (n % i === 0) {
			result.push(i)

			// Add the complementary divisor if it's different
			if (i !== n / i) {
				result.push(n / i)
			}
		}
	}

	// Sort the divisors in ascending order
	return result.sort((a, b) => a - b)
}

export default divisors
