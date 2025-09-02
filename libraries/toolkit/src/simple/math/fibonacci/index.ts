import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns the nth Fibonacci number
 *
 * Calculates the nth number in the Fibonacci sequence, where each number
 * is the sum of the two preceding ones. The sequence starts with 0 and 1.
 * Uses an iterative approach for efficiency. Returns NaN for negative
 * indices, non-integers, or invalid inputs. Limited to n ≤ 78 to avoid
 * exceeding JavaScript's MAX_SAFE_INTEGER.
 *
 * @param n - Zero-based index of the Fibonacci number to calculate
 * @returns The nth Fibonacci number, or NaN if invalid
 * @example
 * ```typescript
 * fibonacci(0)
 * // 0
 *
 * fibonacci(1)
 * // 1
 *
 * fibonacci(5)
 * // 5
 *
 * fibonacci(10)
 * // 55
 *
 * fibonacci(20)
 * // 6765
 *
 * fibonacci(78)
 * // 8944394323791464
 *
 * fibonacci(79)
 * // NaN
 *
 * fibonacci(null)
 * // NaN
 * ```
 * @pure - Always returns same result for same input
 * @safe - Returns NaN for invalid inputs
 */
const fibonacci = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	// Check for non-integer
	if (!Number.isInteger(n)) {
		return NaN
	}

	// Check for negative
	if (n < 0) {
		return NaN
	}

	// Check for values that would exceed MAX_SAFE_INTEGER
	// fibonacci(78) = 8944394323791464 < MAX_SAFE_INTEGER
	// fibonacci(79) = 14472334024676221 > MAX_SAFE_INTEGER
	if (n > 78) {
		return NaN
	}

	// Base cases
	if (n === 0) return 0
	if (n === 1) return 1

	// Iterative calculation (efficient)
	let prev = 0
	let curr = 1

	for (let i = 2; i <= n; i++) {
		const next = prev + curr
		prev = curr
		curr = next
	}

	return curr
}

export default fibonacci
