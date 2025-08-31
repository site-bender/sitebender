import isNullish from "../../validation/isNullish/index.ts"

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
 * permutations(5)(3)
 * // 60 (ways to arrange 3 from 5)
 *
 * permutations(5)(0)
 * // 1 (one way to arrange nothing)
 *
 * permutations(5)(5)
 * // 120 (5! ways to arrange all)
 *
 * permutations(0)(0)
 * // 1 (by definition)
 *
 * permutations(3)(5)
 * // NaN (can't arrange 5 from 3)
 *
 * // Race finishing positions
 * permutations(8)(3)
 * // 336 (ways to fill gold, silver, bronze)
 *
 * // Partial application
 * const arrangeFrom10 = permutations(10)
 * arrangeFrom10(3)
 * // 720
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application
 * @safe Returns NaN for invalid inputs
 * @mathematical Order matters (unlike combinations)
 */
const permutations = (
	n: number | null | undefined,
) =>
(
	r: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	if (isNullish(r) || typeof r !== "number") {
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
	return Array.from({ length: r }, (_, i) => n - i)
		.reduce((acc, val) => acc * val, 1)
}

export default permutations
