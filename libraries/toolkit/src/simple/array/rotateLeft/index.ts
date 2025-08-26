/**
 * Rotates array elements to the left by n positions
 *
 * Moves elements from the beginning of the array to the end, rotating
 * the array leftward. Elements that fall off the left side wrap around
 * to the right. Negative rotations rotate right. Rotations larger than
 * array length wrap around. Useful for circular buffers, carousels,
 * scheduling, or cyclic operations.
 *
 * @curried (n) => (array) => result
 * @param n - Number of positions to rotate left (negative rotates right)
 * @param array - Array to rotate
 * @returns New array with elements rotated left by n positions
 * @example
 * ```typescript
 * // Basic left rotation
 * rotateLeft(2)([1, 2, 3, 4, 5])  // [3, 4, 5, 1, 2]
 * rotateLeft(1)([1, 2, 3, 4, 5])  // [2, 3, 4, 5, 1]
 *
 * // Negative rotation (rotates right)
 * rotateLeft(-2)([1, 2, 3, 4, 5])  // [4, 5, 1, 2, 3]
 *
 * // Wraps around for large rotations
 * rotateLeft(7)([1, 2, 3, 4, 5])  // [3, 4, 5, 1, 2]
 *
 * // Carousel navigation
 * const slides = ["slide1", "slide2", "slide3"]
 * rotateLeft(1)(slides)   // ["slide2", "slide3", "slide1"]
 * rotateLeft(-1)(slides)  // ["slide3", "slide1", "slide2"]
 *
 * // Edge cases
 * rotateLeft(0)([1, 2, 3])  // [1, 2, 3]
 * rotateLeft(5)([42])       // [42]
 * rotateLeft(3)([])         // []
 * rotateLeft(2)(null)       // []
 * ```
 */
const rotateLeft = <T>(
	n: number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Normalize rotation amount to be within array bounds
	// Handles negative rotations and rotations larger than array length
	const len = array.length
	const normalizedN = ((n % len) + len) % len

	if (normalizedN === 0) {
		return [...array]
	}

	// Rotate by slicing and concatenating
	return [...array.slice(normalizedN), ...array.slice(0, normalizedN)]
}

export default rotateLeft
