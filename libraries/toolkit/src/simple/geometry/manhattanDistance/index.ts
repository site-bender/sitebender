/**
 * Calculates the Manhattan distance between two points
 * 
 * Computes the L1 distance (taxicab metric), which is the sum of absolute
 * differences along each dimension. Represents the distance traveled on a
 * grid where only orthogonal moves are allowed (like Manhattan streets).
 * Points must have the same dimensionality. Returns NaN for invalid inputs.
 * 
 * @curried (point1) => (point2) => number
 * @param point1 - First point as array of coordinates
 * @param point2 - Second point as array of coordinates
 * @returns Manhattan distance (non-negative), or NaN if invalid
 * @example
 * ```typescript
 * // 2D points
 * manhattanDistance([0, 0])([3, 4])
 * // 7 (|3-0| + |4-0| = 3 + 4)
 * 
 * manhattanDistance([1, 1])([4, 5])
 * // 7 (|4-1| + |5-1| = 3 + 4)
 * 
 * manhattanDistance([2, 3])([5, 1])
 * // 5 (|5-2| + |1-3| = 3 + 2)
 * 
 * // Same point
 * manhattanDistance([5, 5])([5, 5])
 * // 0
 * 
 * // Negative coordinates
 * manhattanDistance([-2, -3])([1, 1])
 * // 7 (|1-(-2)| + |1-(-3)| = 3 + 4)
 * 
 * manhattanDistance([-1, 2])([3, -4])
 * // 10 (|3-(-1)| + |-4-2| = 4 + 6)
 * 
 * // 3D points
 * manhattanDistance([0, 0, 0])([1, 2, 3])
 * // 6 (1 + 2 + 3)
 * 
 * manhattanDistance([1, 2, 3])([4, 6, 8])
 * // 12 (3 + 4 + 5)
 * 
 * // Higher dimensions
 * manhattanDistance([1, 2, 3, 4])([5, 6, 7, 8])
 * // 16 (4 + 4 + 4 + 4)
 * 
 * // 1D (absolute difference)
 * manhattanDistance([5])([8])
 * // 3
 * 
 * manhattanDistance([-3])([2])
 * // 5
 * 
 * // Different dimensions return NaN
 * manhattanDistance([1, 2])([3, 4, 5])
 * // NaN
 * 
 * // Empty arrays return NaN
 * manhattanDistance([])([])
 * // NaN
 * 
 * // Invalid inputs
 * manhattanDistance(null)([1, 2])
 * // NaN
 * 
 * manhattanDistance([1, "2"])([3, 4])
 * // NaN
 * 
 * // Practical examples
 * 
 * // City block distance
 * const blockDistance = (start: number[], end: number[]) =>
 *   manhattanDistance(start)(end)
 * blockDistance([0, 0], [3, 4])  // 7 blocks
 * blockDistance([2, 5], [8, 1])  // 10 blocks
 * 
 * // Grid pathfinding heuristic
 * const gridHeuristic = (current: number[], goal: number[]) =>
 *   manhattanDistance(current)(goal)
 * gridHeuristic([0, 0], [5, 5])  // 10 (minimum moves)
 * 
 * // Warehouse robot movement
 * const moveDistance = (position: number[], destination: number[]) => {
 *   // Robot can only move along aisles (orthogonal)
 *   return manhattanDistance(position)(destination)
 * }
 * moveDistance([10, 5], [3, 12])  // 14 units
 * 
 * // Pixel difference (for image processing)
 * const pixelDistance = (rgb1: number[], rgb2: number[]) =>
 *   manhattanDistance(rgb1)(rgb2)
 * pixelDistance([255, 0, 0], [255, 255, 0])  // 255 (red to yellow)
 * pixelDistance([128, 128, 128], [64, 192, 96])  // 160
 * 
 * // Chess king moves (on grid)
 * const kingMoves = (from: number[], to: number[]) => {
 *   const manhattan = manhattanDistance(from)(to)
 *   const chebyshev = Math.max(
 *     Math.abs(to[0] - from[0]),
 *     Math.abs(to[1] - from[1])
 *   )
 *   return { manhattan, kingMoves: chebyshev }
 * }
 * kingMoves([0, 0], [3, 4])  // { manhattan: 7, kingMoves: 4 }
 * 
 * // Partial application for fixed origin
 * const distanceFromOrigin = manhattanDistance([0, 0, 0])
 * distanceFromOrigin([1, 2, 3])  // 6
 * distanceFromOrigin([4, 4, 4])  // 12
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Non-negative - Distance is always >= 0
 * @property Metric - Satisfies triangle inequality
 */
const manhattanDistance = (
	point1: number[] | null | undefined
) => (
	point2: number[] | null | undefined
): number => {
	if (point1 == null || !Array.isArray(point1)) {
		return NaN
	}
	
	if (point2 == null || !Array.isArray(point2)) {
		return NaN
	}
	
	if (point1.length !== point2.length) {
		return NaN
	}
	
	if (point1.length === 0) {
		return NaN
	}
	
	let distance = 0
	
	for (let i = 0; i < point1.length; i++) {
		if (point1[i] == null || typeof point1[i] !== 'number') {
			return NaN
		}
		if (point2[i] == null || typeof point2[i] !== 'number') {
			return NaN
		}
		
		distance += Math.abs(point2[i] - point1[i])
	}
	
	return distance
}

export default manhattanDistance