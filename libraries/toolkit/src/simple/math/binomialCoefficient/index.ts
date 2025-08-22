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
 * // Pascal's triangle values
 * binomialCoefficient(4)(2)
 * // 6 (4 choose 2 = 6 ways)
 * 
 * binomialCoefficient(5)(3)
 * // 10 (5 choose 3 = 10 ways)
 * 
 * binomialCoefficient(10)(5)
 * // 252
 * 
 * // Edge cases
 * binomialCoefficient(5)(0)
 * // 1 (only one way to choose nothing)
 * 
 * binomialCoefficient(5)(5)
 * // 1 (only one way to choose everything)
 * 
 * binomialCoefficient(0)(0)
 * // 1 (by definition)
 * 
 * // Invalid cases
 * binomialCoefficient(3)(5)
 * // NaN (can't choose 5 from 3)
 * 
 * binomialCoefficient(-2)(1)
 * // NaN (negative n)
 * 
 * binomialCoefficient(5)(-1)
 * // NaN (negative k)
 * 
 * binomialCoefficient(5.5)(2)
 * // NaN (non-integer)
 * 
 * // Probability calculations
 * // Coin flips: probability of exactly 3 heads in 5 flips
 * const ways = binomialCoefficient(5)(3) // 10
 * const probability = ways / Math.pow(2, 5) // 0.3125
 * 
 * // Lottery combinations
 * binomialCoefficient(49)(6)
 * // 13983816 (number of lottery combinations)
 * 
 * // Pascal's triangle row
 * const row5 = [0, 1, 2, 3, 4, 5].map(k => binomialCoefficient(5)(k))
 * // [1, 5, 10, 10, 5, 1]
 * 
 * // Binomial expansion coefficients
 * // (x + y)^4 = Σ C(4,k) * x^(4-k) * y^k
 * const coefficients = [0, 1, 2, 3, 4].map(k => binomialCoefficient(4)(k))
 * // [1, 4, 6, 4, 1]
 * 
 * // Partial application for fixed n
 * const choose5 = binomialCoefficient(5)
 * choose5(0) // 1
 * choose5(1) // 5
 * choose5(2) // 10
 * choose5(3) // 10
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Optimized - Uses efficient algorithm to avoid overflow
 */
const binomialCoefficient = (
	n: number | null | undefined
) => (
	k: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	if (k == null || typeof k !== 'number') {
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
	let result = 1
	for (let i = 1; i <= kOptimized; i++) {
		result = result * (n - kOptimized + i) / i
	}
	
	// Round to handle floating point errors
	return Math.round(result)
}

export default binomialCoefficient