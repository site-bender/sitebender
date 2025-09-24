import isNullish from "../../validation/isNullish/index.ts"

/**
 * Negates a number (changes its sign)
 *
 * Returns the additive inverse of a number by multiplying it by -1.
 * Positive numbers become negative, negative numbers become positive,
 * and zero remains zero. Returns NaN for invalid inputs.
 *
 * @param n - The number to negate
 * @returns The negated value, or NaN if invalid input
 * @example
 * ```typescript
 * negate(5)
 * // -5
 *
 * negate(-42)
 * // 42
 *
 * negate(0)
 * // -0
 *
 * negate(Infinity)
 * // -Infinity
 *
 * // Double negation (identity)
 * negate(negate(5))
 * // 5
 *
 * // Array operations
 * const numbers = [1, -2, 3]
 * numbers.map(negate)
 * // [-1, 2, -3]
 *
 * // Coordinate reflection
 * const reflectX = (point: { x: number; y: number }) => ({
 *   x: negate(point.x),
 *   y: point.y
 * })
 * reflectX({ x: 5, y: 3 })
 * // { x: -5, y: 3 }
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 * @involutive negate(negate(n)) === n
 * @selfInverse Function is its own inverse
 */
const negate = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return -n
}

export default negate
