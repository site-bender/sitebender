import isNullish from "../../validation/isNullish/index.ts"

/**
 * Finds all divisors of a positive integer
 *
 * Returns an array of all positive integers that divide n without remainder,
 * sorted in ascending order. Includes 1 and n itself. Uses an efficient
 * algorithm that only checks up to √n. Returns empty array for invalid
 * inputs (non-positive integers).
 *
 * @param n - Positive integer to find divisors of
 * @returns Array of divisors sorted ascending, or empty array if invalid
 * @example
 * ```typescript
 * divisors(1)
 * // [1]
 *
 * divisors(12)
 * // [1, 2, 3, 4, 6, 12]
 *
 * divisors(7)
 * // [1, 7]
 *
 * divisors(16)
 * // [1, 2, 4, 8, 16]
 *
 * divisors(24)
 * // [1, 2, 3, 4, 6, 8, 12, 24]
 *
 * divisors(0)
 * // []
 *
 * divisors(-6)
 * // []
 *
 * divisors(null)
 * // []
 * ```
 * @pure - Always returns same result for same input
 * @safe - Returns empty array for invalid inputs
 */
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
