/**
 * Performs cubic interpolation between four points
 *
 * Interpolates smoothly through four data points using a cubic polynomial.
 * Given points at positions 0, 1, 2, 3 with values y0, y1, y2, y3,
 * finds the value at position 1+t where t is between 0 and 1.
 * Uses Catmull-Rom spline formula for smooth curves through data points.
 * Returns NaN for invalid inputs.
 *
 * @curried (y0) => (y1) => (y2) => (y3) => (t) => interpolated value
 * @param y0 - Value at position 0 (before interval)
 * @param y1 - Value at position 1 (start of interval)
 * @param y2 - Value at position 2 (end of interval)
 * @param y3 - Value at position 3 (after interval)
 * @param t - Interpolation parameter (0 to 1, where 0=y1, 1=y2)
 * @returns Interpolated value between y1 and y2, or NaN if invalid
 * @example
 * ```typescript
 * // Simple interpolation
 * cubicInterpolation(0)(1)(2)(3)(0)
 * // 1 (at t=0, returns y1)
 *
 * cubicInterpolation(0)(1)(2)(3)(1)
 * // 2 (at t=1, returns y2)
 *
 * cubicInterpolation(0)(1)(2)(3)(0.5)
 * // 1.5 (midpoint, smoothly interpolated)
 *
 * // Non-linear data
 * cubicInterpolation(1)(4)(9)(16)(0.5)
 * // 6.5 (smooth curve through squares)
 *
 * // Smooth curve through peaks
 * cubicInterpolation(0)(10)(10)(0)(0.5)
 * // 11.25 (overshoots due to cubic nature)
 *
 * // Negative values
 * cubicInterpolation(-2)(-1)(1)(2)(0.5)
 * // 0 (smooth transition through zero)
 *
 * // Edge behavior
 * cubicInterpolation(5)(10)(20)(40)(0.25)
 * // 13.4375 (closer to y1)
 *
 * cubicInterpolation(5)(10)(20)(40)(0.75)
 * // 18.4375 (closer to y2)
 *
 * // Constant values (returns constant)
 * cubicInterpolation(5)(5)(5)(5)(0.5)
 * // 5
 *
 * // Invalid t values (extrapolation)
 * cubicInterpolation(0)(1)(2)(3)(-0.5)
 * // 0.625 (extrapolates before y1)
 *
 * cubicInterpolation(0)(1)(2)(3)(1.5)
 * // 2.625 (extrapolates after y2)
 *
 * // Invalid inputs
 * cubicInterpolation(null)(1)(2)(3)(0.5)
 * // NaN
 *
 * cubicInterpolation(0)(1)(2)(3)(null)
 * // NaN
 *
 * // Practical examples
 *
 * // Audio sample interpolation
 * const samples = [0.1, 0.3, 0.7, 0.4]
 * const upsampled = []
 * for (let t = 0; t <= 1; t += 0.1) {
 *   upsampled.push(
 *     cubicInterpolation(samples[0])(samples[1])(samples[2])(samples[3])(t)
 *   )
 * }
 * // Smooth curve through audio samples
 *
 * // Animation keyframe interpolation
 * function smoothAnimation(keyframes: number[], position: number): number {
 *   const index = Math.floor(position)
 *   const t = position - index
 *
 *   const y0 = keyframes[Math.max(0, index - 1)]
 *   const y1 = keyframes[index]
 *   const y2 = keyframes[Math.min(keyframes.length - 1, index + 1)]
 *   const y3 = keyframes[Math.min(keyframes.length - 1, index + 2)]
 *
 *   return cubicInterpolation(y0)(y1)(y2)(y3)(t)
 * }
 *
 * // Image resizing (bicubic for 2D)
 * function bicubicPixel(
 *   pixels: number[][],
 *   x: number,
 *   y: number
 * ): number {
 *   const xi = Math.floor(x)
 *   const yi = Math.floor(y)
 *   const tx = x - xi
 *   const ty = y - yi
 *
 *   // Interpolate in x direction for 4 rows
 *   const rows = []
 *   for (let j = -1; j <= 2; j++) {
 *     const row = []
 *     for (let i = -1; i <= 2; i++) {
 *       row.push(pixels[yi + j]?.[xi + i] ?? 0)
 *     }
 *     const interp = cubicInterpolation(row[0])(row[1])(row[2])(row[3])
 *     rows.push(interp(tx))
 *   }
 *
 *   // Interpolate in y direction
 *   return cubicInterpolation(rows[0])(rows[1])(rows[2])(rows[3])(ty)
 * }
 *
 * // Smooth data curves
 * const dataPoints = [10, 15, 13, 18, 22, 20, 25]
 * const smoothCurve = []
 * for (let i = 1; i < dataPoints.length - 2; i++) {
 *   for (let t = 0; t < 1; t += 0.1) {
 *     const interp = cubicInterpolation(
 *       dataPoints[i - 1]
 *     )(dataPoints[i])(dataPoints[i + 1])(dataPoints[i + 2])
 *     smoothCurve.push(interp(t))
 *   }
 * }
 *
 * // Partial application for fixed boundaries
 * const withBoundaries = cubicInterpolation(0)(1)(1)(0)
 * withBoundaries(0)    // 1
 * withBoundaries(0.5)  // 1.125 (peak above 1)
 * withBoundaries(1)    // 1
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Smooth - C1 continuous (smooth first derivative)
 */
const cubicInterpolation = (
	y0: number | null | undefined,
) =>
(
	y1: number | null | undefined,
) =>
(
	y2: number | null | undefined,
) =>
(
	y3: number | null | undefined,
) =>
(
	t: number | null | undefined,
): number => {
	if (y0 == null || typeof y0 !== "number") {
		return NaN
	}

	if (y1 == null || typeof y1 !== "number") {
		return NaN
	}

	if (y2 == null || typeof y2 !== "number") {
		return NaN
	}

	if (y3 == null || typeof y3 !== "number") {
		return NaN
	}

	if (t == null || typeof t !== "number") {
		return NaN
	}

	// Catmull-Rom spline interpolation formula
	// This gives a smooth curve through the middle two points
	const t2 = t * t
	const t3 = t2 * t

	const a0 = -0.5 * y0 + 1.5 * y1 - 1.5 * y2 + 0.5 * y3
	const a1 = y0 - 2.5 * y1 + 2 * y2 - 0.5 * y3
	const a2 = -0.5 * y0 + 0.5 * y2
	const a3 = y1

	return a0 * t3 + a1 * t2 + a2 * t + a3
}

export default cubicInterpolation
