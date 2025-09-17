import isNullish from "../../validation/isNullish/index.ts"

//++ Rounds to nearest integer; away-from-zero at .5; returns NaN on invalid input
/**
 * Rounds a number to the nearest integer
 *
 * Rounds to the nearest integer using standard mathematical rounding
 * rules. Values exactly halfway between integers round away from zero
 * (0.5 rounds to 1, -0.5 rounds to -1). Returns NaN for invalid inputs.
 *
 * @param n - The number to round
 * @returns The rounded integer value, or NaN if invalid input
 * @example
 * ```typescript
 * // Basic rounding
 * round(3.2)
 * // 3
 *
 * round(3.7)
 * // 4
 *
 * round(3.5)
 * // 4 (rounds away from zero)
 *
 * // Negative numbers
 * round(-3.5)
 * // -3 (rounds away from zero)
 *
 * // Already integers
 * round(5)
 * // 5
 *
 * // Array operations
 * const decimals = [1.2, 2.5, 3.7, 4.4, 5.9]
 * decimals.map(round)
 * // [1, 3, 4, 4, 6]
 *
 * // Pixel positioning
 * const pixel = { x: round(150.7), y: round(200.3) }
 * // { x: 151, y: 200 }
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 */
const round = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return Math.round(n)
}

export default round

//?? [EXAMPLE] round(3.5) // 4
//?? [EXAMPLE] round(-3.5) // -3
