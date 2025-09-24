import isNullish from "../../validation/isNullish/index.ts"

//++ Returns the non-negative square root; returns NaN on invalid input
/**
 * Returns the square root of a number
 *
 * Calculates the non-negative square root of a non-negative number.
 * Returns NaN for negative numbers (no real square root) or invalid
 * inputs. Uses Math.sqrt internally for accurate computation.
 *
 * @param n - The number to find the square root of
 * @returns The square root, or NaN if negative or invalid
 * @example
 * ```typescript
 * // Perfect squares
 * squareRoot(4)
 * // 2
 *
 * squareRoot(9)
 * // 3
 *
 * squareRoot(25)
 * // 5
 *
 * // Non-perfect squares
 * squareRoot(2)
 * // 1.4142135623730951
 *
 * // Decimal numbers
 * squareRoot(0.25)
 * // 0.5
 *
 * // Negative numbers return NaN
 * squareRoot(-4)
 * // NaN
 *
 * // Pythagorean theorem
 * const hypotenuse = (a: number, b: number) =>
 *   squareRoot(a * a + b * b)
 * hypotenuse(3, 4)
 * // 5
 *
 * // Distance formula
 * const distance = (x1: number, y1: number, x2: number, y2: number) => {
 *   const dx = x2 - x1
 *   const dy = y2 - y1
 *   return squareRoot(dx * dx + dy * dy)
 * }
 * distance(0, 0, 3, 4)
 * // 5
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid or negative inputs
 */
const squareRoot = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return Math.sqrt(n)
}

export default squareRoot

//?? [EXAMPLE] squareRoot(9) // 3
//?? [EXAMPLE] squareRoot(-4) // NaN
