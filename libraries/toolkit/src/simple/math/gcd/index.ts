import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the greatest common divisor of two integers
 *
 * Finds the largest positive integer that divides both numbers without
 * remainder. Uses the Euclidean algorithm for efficiency. Works with
 * negative numbers by using their absolute values. Returns NaN for
 * non-integers, invalid inputs, or when both numbers are zero.
 *
 * @param a - First integer
 * @param b - Second integer
 * @returns Greatest common divisor, or NaN if invalid
 * @example
 * ```typescript
 * gcd(12)(8)
 * // 4
 *
 * gcd(7)(5)
 * // 1
 *
 * gcd(10)(10)
 * // 10
 *
 * gcd(5)(0)
 * // 5
 *
 * gcd(0)(0)
 * // NaN
 *
 * gcd(-12)(8)
 * // 4
 *
 * gcd(1071)(462)
 * // 21
 *
 * gcd(null)(8)
 * // NaN
 * ```
 * @curried - (a) => (b) => gcd
 * @pure - Always returns same result for same inputs
 * @safe - Returns NaN for invalid inputs
 * @commutative - gcd(a)(b) === gcd(b)(a)
 * @associative - gcd(gcd(a)(b))(c) === gcd(a)(gcd(b)(c))
 */
const gcd = (
	a: number | null | undefined,
) =>
(
	b: number | null | undefined,
): number => {
	if (isNullish(a) || typeof a !== "number") {
		return NaN
	}

	if (isNullish(b) || typeof b !== "number") {
		return NaN
	}

	// Check for non-integers
	if (!Number.isInteger(a) || !Number.isInteger(b)) {
		return NaN
	}

	// Use absolute values
	let x = Math.abs(a)
	let y = Math.abs(b)

	// GCD(0, 0) is undefined
	if (x === 0 && y === 0) {
		return NaN
	}

	// Euclidean algorithm
	while (y !== 0) {
		const temp = y
		y = x % y
		x = temp
	}

	return x
}

export default gcd
