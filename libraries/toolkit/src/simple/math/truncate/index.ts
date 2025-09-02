import isNullish from "../../validation/isNullish/index.ts"

/**
 * Removes the decimal part of a number (truncation)
 *
 * Truncates a number by removing its fractional part, returning
 * the integer part only. Unlike floor or ceil, truncation always
 * moves toward zero. Returns NaN for invalid inputs.
 *
 * @param n - The number to truncate
 * @returns The integer part of the number, or NaN if invalid
 * @example
 * ```typescript
 * // Positive numbers
 * truncate(3.7)
 * // 3
 *
 * truncate(3.2)
 * // 3
 *
 * // Negative numbers (toward zero)
 * truncate(-3.7)
 * // -3
 *
 * truncate(-3.2)
 * // -3
 *
 * // Comparison with floor and ceil
 * const n2 = -3.7
 * Math.floor(n2)  // -4 (floor goes down)
 * truncate(n2)    // -3 (trunc goes toward zero)
 * Math.ceil(n2)   // -3
 *
 * // Array operations
 * const decimals = [1.2, 2.7, -3.4, -4.9, 5.5]
 * decimals.map(truncate)
 * // [1, 2, -3, -4, 5]
 *
 * // Integer division implementation
 * const intDiv = (dividend: number, divisor: number) =>
 *   truncate(dividend / divisor)
 * intDiv(20, 6)
 * // 3
 *
 * // Grid positioning
 * const gridSize = 32
 * const worldX = 150.7
 * const gridX = truncate(worldX / gridSize)
 * // 4
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 */
const truncate = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return Math.trunc(n)
}

export default truncate
