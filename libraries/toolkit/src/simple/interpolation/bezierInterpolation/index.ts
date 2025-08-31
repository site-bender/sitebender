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
 * @param controlPoints - Array of [x, y] control points defining the curve
 * @param t - Parameter value between 0 and 1 (0=start, 1=end)
 * @returns Interpolated [x, y] point on the curve, or [NaN, NaN] if invalid
 * @curried
 * @pure
 * @safe
 * @example
 * ```typescript
 * // Linear Bezier (2 control points)
 * bezierInterpolation([[0, 0], [10, 10]])(0.5)  // [5, 5]
 *
 * // Quadratic Bezier (3 control points)
 * bezierInterpolation([[0, 0], [5, 10], [10, 0]])(0.5)  // [5, 5]
 *
 * // Cubic Bezier (4 control points)
 * bezierInterpolation([[0, 0], [0, 10], [10, 10], [10, 0]])(0.5)  // [5, 7.5]
 *
 * // CSS cubic-bezier for ease-in-out
 * const easeInOut = [[0, 0], [0.42, 0], [0.58, 1], [1, 1]]
 * bezierInterpolation(easeInOut)(0.5)  // [0.5, 0.5]
 *
 * // At boundaries
 * bezierInterpolation([[1, 2], [5, 6]])(0)  // [1, 2] (first point)
 * bezierInterpolation([[1, 2], [5, 6]])(1)  // [5, 6] (last point)
 *
 * // Edge cases
 * bezierInterpolation(null)(0.5)  // [NaN, NaN]
 * bezierInterpolation([[1, 2]])(0.5)  // [NaN, NaN] (need >=2 points)
 * ```
 */
const bezierInterpolation = (
	controlPoints: Array<Array<number>> | null | undefined,
) =>
(
	t: number | null | undefined,
): Pair<number, number> => {
	if (controlPoints == null || !Array.isArray(controlPoints)) {
		return [NaN, NaN]
	}

	if (t == null || typeof t !== "number") {
		return [NaN, NaN]
	}

	// Need at least 2 control points
	if (controlPoints.length < 2) {
		return [NaN, NaN]
	}

	// Validate all control points are 2D numeric arrays
	const isValid = controlPoints.every((point) =>
		Array.isArray(point) &&
		point.length === 2 &&
		typeof point[0] === "number" &&
		typeof point[1] === "number"
	)

	if (!isValid) {
		return [NaN, NaN]
	}

	// Clamp t to [0, 1]
	const clampedT = Math.max(0, Math.min(1, t))

	// De Casteljau's algorithm - recursive implementation
	const deCasteljau = (points: Array<Array<number>>): Array<number> => {
		if (points.length === 1) {
			return points[0]
		}

		const interpolated = points.slice(0, -1).map((point, i) => [
			point[0] * (1 - clampedT) + points[i + 1][0] * clampedT,
			point[1] * (1 - clampedT) + points[i + 1][1] * clampedT,
		])

		return deCasteljau(interpolated)
	}

	const result = deCasteljau(controlPoints)

	return [result[0], result[1]]
}

export default bezierInterpolation
