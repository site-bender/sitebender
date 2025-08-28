/**
 * Calculates the Euclidean distance between two points in n-dimensional space
 *
 * Computes the straight-line distance between two points using the formula:
 * d = √((x₁-y₁)² + (x₂-y₂)² + ... + (xₙ-yₙ)²). Works for any number of
 * dimensions as long as both points have the same dimensionality. Returns
 * NaN for invalid inputs or mismatched dimensions.
 *
 * @param point1 - First point as array of coordinates
 * @param point2 - Second point as array of coordinates
 * @returns Distance between the two points, or NaN if invalid
 * @pure
 * @curried
 * @safe
 * @immutable
 * @example
 * ```typescript
 * // 2D distance (Pythagorean theorem)
 * euclideanDistance([0, 0])([3, 4])  // 5 (3-4-5 triangle)
 * euclideanDistance([1, 1])([4, 5])  // 5
 *
 * // 3D distance
 * euclideanDistance([0, 0, 0])([2, 3, 6])  // 7
 * euclideanDistance([1, 2, 3])([4, 6, 8])  // 7.071... (√50)
 *
 * // Same point returns 0
 * euclideanDistance([1, 2, 3])([1, 2, 3])  // 0
 *
 * // Empty arrays return 0
 * euclideanDistance([])([])  // 0
 *
 * // Invalid inputs return NaN
 * euclideanDistance([1, 2])([3, 4, 5])  // NaN (dimension mismatch)
 * euclideanDistance(null)([1, 2])  // NaN
 *
 * // Partial application
 * const distanceFromOrigin = euclideanDistance([0, 0, 0])
 * distanceFromOrigin([3, 4, 0])  // 5
 * ```
 */
const euclideanDistance = (
	point1: Array<number> | null | undefined,
) =>
(
	point2: Array<number> | null | undefined,
): number => {
	if (point1 == null || !Array.isArray(point1)) {
		return NaN
	}

	if (point2 == null || !Array.isArray(point2)) {
		return NaN
	}

	// Points must have same dimensions
	if (point1.length !== point2.length) {
		return NaN
	}

	// Handle empty arrays (distance is 0)
	if (point1.length === 0) {
		return 0
	}

	// Calculate sum of squared differences
	const sumSquaredDiff = point1.reduce((sum, coord1, i) => {
		const coord2 = point2[i]
		if (typeof coord1 !== "number" || typeof coord2 !== "number") {
			return NaN
		}
		const diff = coord1 - coord2
		return sum + diff * diff
	}, 0)

	return Math.sqrt(sumSquaredDiff)
}

export default euclideanDistance
