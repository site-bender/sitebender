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
 * // Small numbers
 * divisors(1)
 * // [1]
 *
 * divisors(6)
 * // [1, 2, 3, 6]
 *
 * divisors(12)
 * // [1, 2, 3, 4, 6, 12]
 *
 * divisors(15)
 * // [1, 3, 5, 15]
 *
 * // Prime numbers have only two divisors
 * divisors(7)
 * // [1, 7]
 *
 * divisors(13)
 * // [1, 13]
 *
 * divisors(17)
 * // [1, 17]
 *
 * // Perfect squares have odd number of divisors
 * divisors(9)
 * // [1, 3, 9]
 *
 * divisors(16)
 * // [1, 2, 4, 8, 16]
 *
 * divisors(25)
 * // [1, 5, 25]
 *
 * // Highly composite numbers
 * divisors(24)
 * // [1, 2, 3, 4, 6, 8, 12, 24]
 *
 * divisors(36)
 * // [1, 2, 3, 4, 6, 9, 12, 18, 36]
 *
 * divisors(60)
 * // [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60]
 *
 * // Invalid inputs
 * divisors(0)
 * // [] (zero has infinitely many divisors)
 *
 * divisors(-6)
 * // [] (negative numbers not supported)
 *
 * divisors(3.5)
 * // [] (non-integer)
 *
 * divisors(null)
 * // []
 *
 * // Perfect number check (sum of proper divisors equals n)
 * const isPerfect = (n: number): boolean => {
 *   const divs = divisors(n)
 *   const properDivisors = divs.slice(0, -1) // exclude n itself
 *   const sum = properDivisors.reduce((a, b) => a + b, 0)
 *   return sum === n
 * }
 * isPerfect(6) // true (1+2+3 = 6)
 * isPerfect(28) // true (1+2+4+7+14 = 28)
 *
 * // Count divisors (tau function)
 * const tau = (n: number): number => divisors(n).length
 * tau(12) // 6
 * tau(24) // 8
 *
 * // Sum of divisors (sigma function)
 * const sigma = (n: number): number =>
 *   divisors(n).reduce((a, b) => a + b, 0)
 * sigma(12) // 28 (1+2+3+4+6+12)
 *
 * // Check if abundant (sum of proper divisors > n)
 * const isAbundant = (n: number): boolean => {
 *   const divs = divisors(n)
 *   const properSum = divs.slice(0, -1).reduce((a, b) => a + b, 0)
 *   return properSum > n
 * }
 * isAbundant(12) // true (1+2+3+4+6 = 16 > 12)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns empty array for invalid inputs
 * @property Efficient - O(√n) time complexity
 */
const divisors = (
	n: number | null | undefined,
): Array<number> => {
	if (n == null || typeof n !== "number") {
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
