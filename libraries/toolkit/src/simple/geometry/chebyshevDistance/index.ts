/**
 * Calculates the Chebyshev distance between two points
 *
 * Computes the L∞ (infinity norm) distance, which is the maximum absolute
 * difference between coordinates. Also known as chessboard distance or
 * king move distance, as it represents the minimum number of moves for
 * a chess king. Returns NaN for invalid inputs or mismatched dimensions.
 *
 * @param point1 - First point as array of coordinates
 * @param point2 - Second point as array of coordinates
 * @returns Chebyshev distance between points, or NaN if invalid
 * @pure
 * @curried
 * @safe
 * @immutable
 * @example
 * ```typescript
 * // 2D points - max absolute difference
 * chebyshevDistance([0, 0])([3, 4])  // 4 (max of 3, 4)
 * chebyshevDistance([1, 1])([4, 5])  // 4 (max of 3, 4)
 *
 * // 3D points
 * chebyshevDistance([0, 0, 0])([2, 3, 1])  // 3 (max of 2, 3, 1)
 * chebyshevDistance([1, 2, 3])([4, 6, 5])  // 4 (max of 3, 4, 2)
 *
 * // Same points return 0
 * chebyshevDistance([1, 2, 3])([1, 2, 3])  // 0
 *
 * // Chess king movement (minimum moves)
 * const kingPos = [4, 4]
 * const targetPos = [7, 6]
 * chebyshevDistance(kingPos)(targetPos)  // 3 moves
 *
 * // Invalid inputs return NaN
 * chebyshevDistance([1, 2])([1, 2, 3])  // NaN (dimension mismatch)
 * chebyshevDistance(null)([1, 2])  // NaN
 * ```
 */
const chebyshevDistance = (
	point1: number[] | null | undefined,
) =>
(
	point2: number[] | null | undefined,
): number => {
	if (point1 == null || !Array.isArray(point1)) {
		return NaN
	}

	if (point2 == null || !Array.isArray(point2)) {
		return NaN
	}

	// Check dimension match
	if (point1.length !== point2.length) {
		return NaN
	}

	// Handle empty arrays
	if (point1.length === 0) {
		return 0
	}

	return point1.reduce((maxDist, coord1, i) => {
		const coord2 = point2[i]
		
		// Check for non-numeric values
		if (coord1 == null || typeof coord1 !== "number") {
			return NaN
		}
		if (coord2 == null || typeof coord2 !== "number") {
			return NaN
		}
		
		const distance = Math.abs(coord1 - coord2)
		return Math.max(maxDist, distance)
	}, 0)
}

export default chebyshevDistance
