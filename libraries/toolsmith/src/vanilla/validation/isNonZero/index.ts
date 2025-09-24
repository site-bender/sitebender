/**
 * Checks if a value is non-zero
 *
 * Determines whether a value is a number that is not zero. This includes both
 * positive and negative numbers, but excludes zero, positive zero (+0), and
 * negative zero (-0). Returns false for non-numeric values, NaN, and any form
 * of zero. This is useful for mathematical operations, division safety checks,
 * and boolean coercion of numeric values.
 *
 * Non-zero detection:
 * - Positive numbers: 1, 2.5, Infinity
 * - Negative numbers: -1, -2.5, -Infinity
 * - Zero values: 0, +0, -0 (all return false)
 * - Non-numbers: false, null, "", "1", [] (all return false)
 * - Type-safe: only returns true for non-zero number type
 * - No coercion: strict type and value checking
 *
 * @param value - The value to check for non-zero
 * @returns True if the value is a number and not zero, false otherwise
 * @example
 * ```typescript
 * // Non-zero numbers
 * isNonZero(1)        // true
 * isNonZero(-1)       // true
 * isNonZero(0.0001)   // true
 * isNonZero(Infinity) // true
 * isNonZero(-Infinity)// true
 *
 * // Zero values
 * isNonZero(0)        // false
 * isNonZero(+0)       // false
 * isNonZero(-0)       // false
 *
 * // Non-numbers and special values
 * isNonZero(NaN)      // false
 * isNonZero("1")      // false
 * isNonZero(true)     // false
 * isNonZero(null)     // false
 *
 * // Boolean coercion for numbers
 * const toBooleanNumber = (n: unknown) =>
 *   typeof n === "number" && isFinite(n) && isNonZero(n)
 *
 * toBooleanNumber(5)   // true
 * toBooleanNumber(0)   // false
 * toBooleanNumber(NaN) // false
 * ```
 * @pure
 * @predicate
 */
import isNumber from "../isNumber/index.ts"
import and from "../../logic/and/index.ts"
import isUnequal from "../isUnequal/index.ts"

export default function isNonZero(value: unknown): value is number {
	return and(isNumber(value))(isUnequal(0)(value))
}
