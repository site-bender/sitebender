import and from "../../logic/and/index.ts"
import isEqual from "../isEqual/index.ts"
/**
 * Checks if a value is zero
 *
 * Determines whether a value is exactly zero (0), including positive zero (+0)
 * and negative zero (-0). Uses strict equality checking without type coercion.
 * Returns false for non-numeric values, even those that might coerce to zero
 * like false, "", or null. This is useful for mathematical operations, boundary
 * conditions, and division safety checks.
 *
 * Zero detection:
 * - Positive zero: 0 or +0
 * - Negative zero: -0 (treated as equal to 0)
 * - Not zero: false, null, "", "0", [], etc.
 * - Type-safe: only returns true for number type
 * - No coercion: strict type and value checking
 *
 * @param value - The value to check for zero
 * @returns True if the value is exactly 0, false otherwise
 * @example
 * ```typescript
 * // Zero values
 * isZero(0)       // true
 * isZero(+0)      // true
 * isZero(-0)      // true
 * isZero(0.0)     // true
 *
 * // Non-zero numbers
 * isZero(1)       // false
 * isZero(0.0001)  // false
 * isZero(NaN)     // false
 *
 * // No type coercion
 * isZero("0")     // false
 * isZero(false)   // false
 * isZero(null)    // false
 *
 * // Division safety
 * const safeDivide = (a: number, b: unknown) =>
 *   isZero(b) ? null : typeof b === "number" ? a / b : null
 *
 * safeDivide(10, 2)   // 5
 * safeDivide(10, 0)   // null
 * ```
 * @pure
 * @predicate
 */
import isNumber from "../isNumber/index.ts"

export default function isZero(value: unknown): value is number {
	return and(isNumber(value))(isEqual(0)(value))
}
