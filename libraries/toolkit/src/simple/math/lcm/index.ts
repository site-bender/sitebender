import gcd from "../gcd/index.ts"

/**
 * Calculates the least common multiple of two integers
 *
 * Finds the smallest positive integer that is divisible by both numbers.
 * Uses the formula LCM(a,b) = |a × b| / GCD(a,b) for efficiency. Works
 * with negative numbers by using their absolute values. Returns NaN for
 * non-integers, invalid inputs, or when either number is zero.
 *
 * @param a - First integer
 * @param b - Second integer
 * @returns Least common multiple, or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * lcm(4)(6)
 * // 12
 *
 * lcm(12)(18)
 * // 36
 *
 * lcm(3)(5)
 * // 15
 *
 * // Same number
 * lcm(10)(10)
 * // 10
 *
 * // One divides the other
 * lcm(5)(20)
 * // 20
 *
 * // Negative numbers
 * lcm(-4)(6)
 * // 12
 *
 * // Invalid inputs
 * lcm(0)(5)
 * // NaN
 *
 * lcm(12.5)(8)
 * // NaN
 *
 * // Partial application
 * const lcmWith12 = lcm(12)
 * lcmWith12(8)
 * // 24
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs or zero
 */
const lcm = (
	a: number | null | undefined,
) =>
(
	b: number | null | undefined,
): number => {
	if (a == null || typeof a !== "number") {
		return NaN
	}

	if (b == null || typeof b !== "number") {
		return NaN
	}

	// Check for non-integers
	if (!Number.isInteger(a) || !Number.isInteger(b)) {
		return NaN
	}

	// LCM is undefined for zero
	if (a === 0 || b === 0) {
		return NaN
	}

	// Calculate LCM using GCD
	const divisor = gcd(a)(b)
	// deno-coverage-ignore-start - Defensive check: gcd handles all edge cases, won't return NaN or 0 for valid integer inputs
	if (isNaN(divisor) || divisor === 0) {
		return NaN
	}
	// deno-coverage-ignore-stop

	// LCM(a,b) = |a × b| / GCD(a,b)
	return Math.abs(a * b) / divisor
}

export default lcm
