/**
 * Returns the cube root of a number
 *
 * Calculates the cube root (∛x), which is the value that when cubed
 * (raised to the power of 3) gives the original number. Unlike square
 * root, cube root is defined for negative numbers. Returns NaN for
 * non-numeric inputs to support safe error handling.
 *
 * @param n - Number to find the cube root of
 * @returns Cube root of the number, or NaN if invalid
 * @example
 * ```typescript
 * // Perfect cubes
 * cubeRoot(8)
 * // 2
 *
 * cubeRoot(27)
 * // 3
 *
 * cubeRoot(125)
 * // 5
 *
 * // Negative numbers
 * cubeRoot(-8)
 * // -2
 *
 * cubeRoot(-27)
 * // -3
 *
 * // Zero and one
 * cubeRoot(0)
 * // 0
 *
 * cubeRoot(1)
 * // 1
 *
 * // Decimal numbers
 * cubeRoot(0.125)
 * // 0.5
 *
 * // Special values
 * cubeRoot(Infinity)
 * // Infinity
 *
 * // Invalid inputs return NaN
 * cubeRoot(null)
 * // NaN
 *
 * // Volume to side length
 * cubeRoot(1000)
 * // 10
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 */
const cubeRoot = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	return Math.cbrt(n)
}

export default cubeRoot
