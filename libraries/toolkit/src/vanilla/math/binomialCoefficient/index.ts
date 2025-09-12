import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the binomial coefficient (n choose k)
 *
 * Computes C(n,k) = n!/(k!(n-k)!), representing the number of ways to choose
 * k items from n items without regard to order. Also known as Pascal's triangle
 * values. Uses an optimized algorithm to avoid large factorial calculations
 * when possible. Returns NaN for invalid inputs (negative values, k > n,
 * non-integers).
 *
 * @curried (n) => (k) => number
 * @param n - Total number of items (non-negative integer)
 * @param k - Number of items to choose (non-negative integer, k ≤ n)
 * @returns Binomial coefficient C(n,k), or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage - n choose k
 * binomialCoefficient(4)(2)   // 6
 * binomialCoefficient(5)(3)   // 10
 * binomialCoefficient(10)(5)  // 252
 *
 * // Edge cases
 * binomialCoefficient(5)(0)   // 1 (choose nothing)
 * binomialCoefficient(5)(5)   // 1 (choose everything)
 * binomialCoefficient(3)(5)   // NaN (k > n)
 *
 * // Pascal's triangle row
 * const row5 = [0, 1, 2, 3, 4, 5].map(binomialCoefficient(5))
 * // [1, 5, 10, 10, 5, 1]
 *
 * // Partial application
 * const choose6 = binomialCoefficient(6)
 * choose6(2)  // 15
 * choose6(3)  // 20
 * ```
 * @pure
 * @curried
 */
const binomialCoefficient = (
	n: number | null | undefined,
) =>
(
	k: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	if (isNullish(k) || typeof k !== "number") {
		return NaN
	}

	// Check for non-integers
	if (!Number.isInteger(n) || !Number.isInteger(k)) {
		return NaN
	}

	// Check for negative values
	if (n < 0 || k < 0) {
		return NaN
	}

	// Check if k > n
	if (k > n) {
		return NaN
	}

	// Optimize for edge cases
	if (k === 0 || k === n) {
		return 1
	}

	// Optimize by using C(n,k) = C(n,n-k) when k > n/2
	const kOptimized = k > n - k ? n - k : k

	// Calculate using multiplicative formula to avoid large factorials
	// C(n,k) = n * (n-1) * ... * (n-k+1) / (k * (k-1) * ... * 1)
	const calculate = (acc: number, i: number): number => {
		if (i > kOptimized) return acc
		return calculate(acc * (n - kOptimized + i) / i, i + 1)
	}
	const result = calculate(1, 1)

	// Round to handle floating point errors
	return Math.round(result)
}

export default binomialCoefficient
