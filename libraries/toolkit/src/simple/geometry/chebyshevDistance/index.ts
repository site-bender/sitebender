/**
 * Calculates the Chebyshev distance between two points
 *
 * Computes the L∞ (infinity norm) distance, which is the maximum absolute
 * difference between coordinates. Also known as chessboard distance or
 * king move distance, as it represents the minimum number of moves for
 * a chess king. Returns NaN for invalid inputs or mismatched dimensions.
 *
 * @curried (point1) => (point2) => distance
 * @param point1 - First point as array of coordinates
 * @param point2 - Second point as array of coordinates
 * @returns Chebyshev distance between points, or NaN if invalid
 * @example
 * ```typescript
 * // 2D points
 * chebyshevDistance([0, 0])([3, 4])
 * // 4 (max of |3-0|=3 and |4-0|=4)
 *
 * chebyshevDistance([1, 1])([4, 5])
 * // 4 (max of |4-1|=3 and |5-1|=4)
 *
 * chebyshevDistance([2, 3])([5, 7])
 * // 4 (max of |5-2|=3 and |7-3|=4)
 *
 * // 3D points
 * chebyshevDistance([0, 0, 0])([2, 3, 1])
 * // 3 (max of 2, 3, 1)
 *
 * chebyshevDistance([1, 2, 3])([4, 6, 5])
 * // 4 (max of |4-1|=3, |6-2|=4, |5-3|=2)
 *
 * // 1D (absolute difference)
 * chebyshevDistance([5])([8])
 * // 3
 *
 * chebyshevDistance([-3])([4])
 * // 7
 *
 * // Same points
 * chebyshevDistance([1, 2, 3])([1, 2, 3])
 * // 0
 *
 * // Negative coordinates
 * chebyshevDistance([-1, -2])([3, 4])
 * // 6 (max of |3-(-1)|=4 and |4-(-2)|=6)
 *
 * // Higher dimensions
 * chebyshevDistance([1, 2, 3, 4])([5, 6, 7, 8])
 * // 4 (all differences are 4)
 *
 * // Mismatched dimensions
 * chebyshevDistance([1, 2])([1, 2, 3])
 * // NaN
 *
 * // Invalid inputs
 * chebyshevDistance(null)([1, 2])
 * // NaN
 *
 * chebyshevDistance([1, "2"])([3, 4])
 * // NaN
 *
 * // Practical examples
 *
 * // Chess king movement
 * const kingPos = [4, 4]  // e4 in chess notation
 * const targetPos = [7, 6]  // h6
 * const movesRequired = chebyshevDistance(kingPos)(targetPos)
 * // 3 (king needs 3 moves minimum)
 *
 * // Grid-based pathfinding (8-directional)
 * const start = [0, 0]
 * const end = [5, 3]
 * const minSteps = chebyshevDistance(start)(end)
 * // 5 (can move diagonally)
 *
 * // Image processing - pixel neighborhoods
 * function isInNeighborhood(
 *   center: number[],
 *   pixel: number[],
 *   radius: number
 * ): boolean {
 *   return chebyshevDistance(center)(pixel) <= radius
 * }
 * isInNeighborhood([50, 50], [52, 53], 3)
 * // true (within 3-pixel Chebyshev radius)
 *
 * // Color space distance (max channel difference)
 * const color1 = [128, 200, 64]  // RGB
 * const color2 = [140, 180, 70]
 * const colorDiff = chebyshevDistance(color1)(color2)
 * // 20 (max channel difference)
 *
 * // Game collision detection (AABB)
 * const box1Center = [10, 10]
 * const box2Center = [15, 12]
 * const halfSize = 3
 * const centersDistance = chebyshevDistance(box1Center)(box2Center)
 * const collision = centersDistance <= 2 * halfSize
 * // true if boxes overlap
 *
 * // Partial application for fixed reference
 * const fromOrigin = chebyshevDistance([0, 0, 0])
 * fromOrigin([1, 2, 3])  // 3
 * fromOrigin([4, 5, 6])  // 6
 * fromOrigin([-2, 3, -1])  // 3
 *
 * // Compare with other metrics
 * const p1 = [0, 0], p2 = [3, 4]
 * const chebyshev = chebyshevDistance(p1)(p2)  // 4
 * const euclidean = euclideanDistance(p1)(p2)  // 5
 * const manhattan = manhattanDistance(p1)(p2)  // 7
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Metric - Satisfies metric space properties
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

	let maxDistance = 0

	for (let i = 0; i < point1.length; i++) {
		const coord1 = point1[i]
		const coord2 = point2[i]

		// Check for non-numeric values
		if (coord1 == null || typeof coord1 !== "number") {
			return NaN
		}
		if (coord2 == null || typeof coord2 !== "number") {
			return NaN
		}

		const distance = Math.abs(coord1 - coord2)
		if (distance > maxDistance) {
			maxDistance = distance
		}
	}

	return maxDistance
}

export default chebyshevDistance
