import factorial from "../factorial/index.ts"

/**
 * Calculates the number of permutations (nPr)
 * 
 * Computes the number of ways to arrange r items from n items where
 * order matters, using the formula: P(n,r) = n! / (n-r)!. Also known
 * as partial permutations or r-permutations of n. Returns NaN for
 * invalid inputs, negative numbers, or when r > n.
 * 
 * @curried (n) => (r) => number
 * @param n - Total number of items
 * @param r - Number of items to arrange
 * @returns Number of permutations, or NaN if invalid
 * @example
 * ```typescript
 * // Basic permutations
 * permutations(5)(3)
 * // 60 (ways to arrange 3 from 5)
 * 
 * permutations(4)(2)
 * // 12 (ways to arrange 2 from 4)
 * 
 * permutations(10)(4)
 * // 5040 (ways to arrange 4 from 10)
 * 
 * // Edge cases
 * permutations(5)(0)
 * // 1 (one way to arrange nothing)
 * 
 * permutations(5)(5)
 * // 120 (5! ways to arrange all)
 * 
 * permutations(0)(0)
 * // 1 (by definition)
 * 
 * // Compare with combinations
 * permutations(5)(3) // 60 (order matters)
 * // vs combinations(5)(3) = 10 (order doesn't matter)
 * // P(n,r) = C(n,r) × r!
 * 
 * // Invalid cases
 * permutations(3)(5)
 * // NaN (can't arrange 5 from 3)
 * 
 * permutations(-1)(2)
 * // NaN (negative n)
 * 
 * permutations(5)(-2)
 * // NaN (negative r)
 * 
 * permutations(5.5)(2)
 * // NaN (non-integer)
 * 
 * // Race finishing positions
 * permutations(8)(3)
 * // 336 (ways to fill gold, silver, bronze from 8)
 * 
 * // Password from character set
 * permutations(26)(4)
 * // 358800 (4-letter arrangements from alphabet)
 * 
 * // Seating arrangements
 * permutations(10)(5)
 * // 30240 (ways to seat 5 people in 10 chairs)
 * 
 * // License plates (letters)
 * permutations(26)(3)
 * // 15600 (3-letter sequences, no repeats)
 * 
 * // Tournament brackets
 * permutations(16)(4)
 * // 43680 (ways to arrange top 4 from 16 teams)
 * 
 * // Partial application
 * const arrangeFrom10 = permutations(10)
 * arrangeFrom10(1) // 10
 * arrangeFrom10(2) // 90
 * arrangeFrom10(3) // 720
 * arrangeFrom10(4) // 5040
 * arrangeFrom10(5) // 30240
 * 
 * // Compare permutations vs combinations
 * const n = 6, r = 3
 * const perms = permutations(n)(r) // 120
 * const combs = combinations(n)(r) // 20
 * const ratio = perms / combs // 6 (which is 3!)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Mathematical - Order matters (unlike combinations)
 */
const permutations = (
	n: number | null | undefined
) => (
	r: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	if (r == null || typeof r !== 'number') {
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
	
	// Edge case optimizations
	if (r === 0) {
		return 1
	}
	
	if (r === 1) {
		return n
	}
	
	// For small values, use direct calculation to avoid factorial overflow
	// P(n,r) = n × (n-1) × (n-2) × ... × (n-r+1)
	let result = 1
	for (let i = 0; i < r; i++) {
		result *= (n - i)
	}
	
	return result
}

export default permutations