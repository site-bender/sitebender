/**
 * Finds the minimum of two values
 *
 * Returns the smaller of two numbers using mathematical comparison.
 * Handles special values according to JavaScript's Math.min behavior.
 * Returns NaN if either input is NaN or not a valid number.
 *
 * @curried (a) => (b) => minimum
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns The smaller value, or NaN if invalid input
 * @example
 * ```typescript
 * min(5)(3)
 * // 3
 *
 * min(-5)(3)
 * // -5
 *
 * min(1.5)(2.3)
 * // 1.5
 *
 * min(0)(5)
 * // 0
 *
 * min(Infinity)(100)
 * // 100
 *
 * min(5)(NaN)
 * // NaN
 *
 * // Partial application
 * const atMost10 = min(10)
 * atMost10(15)
 * // 10
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs
 * @commutative min(a)(b) === min(b)(a)
 * @associative min(min(a)(b))(c) === min(a)(min(b)(c))
 * @idempotent min(a)(a) === a
 */
const min = (
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

	// Handle NaN cases explicitly
	if (isNaN(a) || isNaN(b)) {
		return NaN
	}

	return Math.min(a, b)
}

export default min
