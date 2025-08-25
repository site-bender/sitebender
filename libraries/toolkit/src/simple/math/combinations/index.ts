import factorial from "../factorial/index.ts"

/**
 * Calculates the number of combinations (nCr)
 *
 * Computes the number of ways to choose r items from n items without
 * regard to order, using the formula: C(n,r) = n! / (r! × (n-r)!).
 * Also known as "n choose r" or the binomial coefficient. Returns NaN
 * for invalid inputs, negative numbers, or when r > n.
 *
 * @curried (n) => (r) => number
 * @param n - Total number of items
 * @param r - Number of items to choose
 * @returns Number of combinations, or NaN if invalid
 * @example
 * ```typescript
 * // Basic combinations
 * combinations(5)(3)
 * // 10 (ways to choose 3 from 5)
 *
 * combinations(4)(2)
 * // 6 (ways to choose 2 from 4)
 *
 * combinations(10)(5)
 * // 252 (ways to choose 5 from 10)
 *
 * // Edge cases
 * combinations(5)(0)
 * // 1 (one way to choose nothing)
 *
 * combinations(5)(5)
 * // 1 (one way to choose all)
 *
 * combinations(0)(0)
 * // 1 (by definition)
 *
 * // Pascal's triangle values
 * combinations(4)(0) // 1
 * combinations(4)(1) // 4
 * combinations(4)(2) // 6
 * combinations(4)(3) // 4
 * combinations(4)(4) // 1
 * // Row 4: [1, 4, 6, 4, 1]
 *
 * // Invalid cases
 * combinations(3)(5)
 * // NaN (can't choose 5 from 3)
 *
 * combinations(-1)(2)
 * // NaN (negative n)
 *
 * combinations(5)(-2)
 * // NaN (negative r)
 *
 * combinations(5.5)(2)
 * // NaN (non-integer)
 *
 * // Lottery calculations
 * combinations(49)(6)
 * // 13983816 (ways to choose 6 from 49)
 *
 * // Poker hands
 * combinations(52)(5)
 * // 2598960 (5-card hands from 52 cards)
 *
 * // Team selection
 * combinations(15)(11)
 * // 1365 (ways to choose starting 11 from 15 players)
 *
 * // Committee formation
 * combinations(20)(4)
 * // 4845 (ways to form 4-person committee from 20)
 *
 * // Binary coefficients
 * combinations(8)(3)
 * // 56 (coefficient in (x+y)^8 expansion)
 *
 * // Partial application
 * const choose5 = combinations(10)
 * choose5(0) // 1
 * choose5(1) // 10
 * choose5(2) // 45
 * choose5(3) // 120
 * choose5(4) // 210
 * choose5(5) // 252
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Mathematical - Implements binomial coefficient
 */
const combinations = (
	n: number | null | undefined,
) =>
(
	r: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	if (r == null || typeof r !== "number") {
		return NaN
	}

	// Check for non-integers
	if (!Number.isInteger(n) || !Number.isInteger(r)) {
		return NaN
	}

	// Check for negative values
	if (n < 0 || r < 0) {
		return NaN
	}

	// Check if r > n
	if (r > n) {
		return NaN
	}

	// Optimize for edge cases
	if (r === 0 || r === n) {
		return 1
	}

	// Optimize by using the smaller of r or n-r
	// C(n,r) = C(n,n-r), so use the smaller value for efficiency
	const k = r > n - r ? n - r : r

	// Calculate using optimized formula to avoid large factorials
	// This is more efficient than n! / (r! * (n-r)!)
	let result = 1
	for (let i = 0; i < k; i++) {
		result = result * (n - i) / (i + 1)
	}

	return Math.round(result) // Round to handle floating point errors
}

export default combinations
