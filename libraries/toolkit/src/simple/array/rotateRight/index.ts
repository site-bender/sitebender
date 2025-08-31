import isNullish from "../../validation/isNullish/index.ts"

/**
 * Rotates array elements to the right by n positions
 *
 * Moves elements from the end of the array to the beginning, rotating
 * the array rightward. Elements that fall off the right side wrap around
 * to the left. Negative rotations rotate left. Rotations larger than
 * array length wrap around.
 *
 * @param n - Number of positions to rotate right (negative rotates left)
 * @param array - Array to rotate
 * @returns New array with elements rotated right by n positions
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic right rotation
 * rotateRight(2)([1, 2, 3, 4, 5])  // [4, 5, 1, 2, 3]
 * rotateRight(1)([1, 2, 3, 4, 5])  // [5, 1, 2, 3, 4]
 *
 * // Negative rotation (rotates left)
 * rotateRight(-2)([1, 2, 3, 4, 5])  // [3, 4, 5, 1, 2]
 *
 * // Wraps around for large rotations
 * rotateRight(7)([1, 2, 3, 4, 5])  // [4, 5, 1, 2, 3]
 *
 * // Carousel navigation
 * const slides = ["slide1", "slide2", "slide3"]
 * rotateRight(1)(slides)   // ["slide3", "slide1", "slide2"]
 * rotateRight(-1)(slides)  // ["slide2", "slide3", "slide1"]
 *
 * // Edge cases
 * rotateRight(0)([1, 2, 3])  // [1, 2, 3]
 * rotateRight(5)([42])       // [42]
 * rotateRight(3)([])         // []
 * rotateRight(2)(null)       // []
 * ```
 */
const rotateRight = <T>(
	n: number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Normalize rotation amount to be within array bounds
	// Handles negative rotations and rotations larger than array length
	const len = array.length
	const normalizedN = ((n % len) + len) % len

	if (normalizedN === 0) {
		return [...array]
	}

	// Rotate right by slicing from the end and concatenating
	return [...array.slice(-normalizedN), ...array.slice(0, -normalizedN)]
}

export default rotateRight
