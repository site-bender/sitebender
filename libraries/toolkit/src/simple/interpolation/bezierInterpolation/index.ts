import type { Pair } from "../../../types/tuple/index.ts"

/**
 * Performs Bezier curve interpolation at a given parameter t
 * 
 * Computes a point on a Bezier curve defined by control points using
 * De Casteljau's algorithm. The curve starts at the first control point
 * (t=0) and ends at the last control point (t=1). Works with 2D points
 * represented as [x, y] pairs. Supports any number of control points:
 * 2 points create a linear interpolation, 3 points create a quadratic
 * Bezier, 4 points create a cubic Bezier, and so on.
 * 
 * @curried (controlPoints) => (t) => Pair<number, number>
 * @param controlPoints - Array of [x, y] control points defining the curve
 * @param t - Parameter value between 0 and 1 (0=start, 1=end)
 * @returns Interpolated [x, y] point on the curve, or [NaN, NaN] if invalid
 * @example
 * ```typescript
 * // Linear Bezier (2 control points)
 * const linear = [[0, 0], [10, 10]]
 * bezierInterpolation(linear)(0.5)
 * // [5, 5]
 * 
 * // Quadratic Bezier (3 control points)
 * const quadratic = [[0, 0], [5, 10], [10, 0]]
 * bezierInterpolation(quadratic)(0.5)
 * // [5, 5] (apex of parabola)
 * 
 * // Cubic Bezier (4 control points)
 * const cubic = [[0, 0], [0, 10], [10, 10], [10, 0]]
 * bezierInterpolation(cubic)(0.5)
 * // [5, 7.5]
 * 
 * // At t=0, returns first control point
 * bezierInterpolation([[1, 2], [3, 4], [5, 6]])(0)
 * // [1, 2]
 * 
 * // At t=1, returns last control point
 * bezierInterpolation([[1, 2], [3, 4], [5, 6]])(1)
 * // [5, 6]
 * 
 * // CSS cubic-bezier equivalent
 * // cubic-bezier(0.42, 0, 0.58, 1) for ease-in-out
 * const easeInOut = [[0, 0], [0.42, 0], [0.58, 1], [1, 1]]
 * bezierInterpolation(easeInOut)(0.5)
 * // [0.5, 0.5]
 * 
 * // Heart shape segment
 * const heart = [[0, 1], [1, 2], [2, 1], [1, 0]]
 * bezierInterpolation(heart)(0.25)
 * // [0.421875, 1.265625]
 * 
 * // Invalid inputs return [NaN, NaN]
 * bezierInterpolation(null)(0.5)
 * // [NaN, NaN]
 * 
 * bezierInterpolation([[1, 2]])(0.5)
 * // [NaN, NaN] (need at least 2 points)
 * 
 * bezierInterpolation([[1, 2], [3, "4"]])(0.5)
 * // [NaN, NaN] (invalid point)
 * 
 * // Practical animation example
 * const bounce = [[0, 0], [0.2, 1.4], [0.8, 0.8], [1, 1]]
 * const animatePosition = bezierInterpolation(bounce)
 * animatePosition(0.1)  // [0.074, 0.406]
 * animatePosition(0.5)  // [0.5, 1.025]
 * animatePosition(0.9)  // [0.926, 0.956]
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for animation curves
 * @property Safe - Returns [NaN, NaN] for invalid inputs
 */
const bezierInterpolation = (
	controlPoints: Array<Array<number>> | null | undefined
) => (
	t: number | null | undefined
): Pair<number, number> => {
	if (controlPoints == null || !Array.isArray(controlPoints)) {
		return [NaN, NaN]
	}
	
	if (t == null || typeof t !== 'number') {
		return [NaN, NaN]
	}
	
	// Need at least 2 control points
	if (controlPoints.length < 2) {
		return [NaN, NaN]
	}
	
	// Validate all control points are 2D numeric arrays
	for (const point of controlPoints) {
		if (!Array.isArray(point) || point.length !== 2) {
			return [NaN, NaN]
		}
		if (typeof point[0] !== 'number' || typeof point[1] !== 'number') {
			return [NaN, NaN]
		}
	}
	
	// Clamp t to [0, 1]
	const clampedT = Math.max(0, Math.min(1, t))
	
	// De Casteljau's algorithm
	// Start with a copy of control points
	let points = controlPoints.map(p => [...p])
	
	// Recursively interpolate between points
	while (points.length > 1) {
		const newPoints = []
		for (let i = 0; i < points.length - 1; i++) {
			const x = points[i][0] * (1 - clampedT) + points[i + 1][0] * clampedT
			const y = points[i][1] * (1 - clampedT) + points[i + 1][1] * clampedT
			newPoints.push([x, y])
		}
		points = newPoints
	}
	
	return [points[0][0], points[0][1]]
}

export default bezierInterpolation