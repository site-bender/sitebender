/**
 * Performs cubic interpolation between four points
 *
 * Interpolates smoothly through four data points using a cubic polynomial.
 * Given points at positions 0, 1, 2, 3 with values y0, y1, y2, y3,
 * finds the value at position 1+t where t is between 0 and 1.
 * Uses Catmull-Rom spline formula for smooth curves through data points.
 * Returns NaN for invalid inputs.
 *
 * @curried
 * @param y0 - Value at position 0 (before interval)
 * @param y1 - Value at position 1 (start of interval)
 * @param y2 - Value at position 2 (end of interval)
 * @param y3 - Value at position 3 (after interval)
 * @param t - Interpolation parameter (0 to 1, where 0=y1, 1=y2)
 * @returns Interpolated value between y1 and y2, or NaN if invalid
 * @example
 * ```typescript
 * // Basic interpolation
 * cubicInterpolation(0)(1)(2)(3)(0.5) // 1.5
 * cubicInterpolation(1)(4)(9)(16)(0.5) // 6.5
 *
 * // Edge cases
 * cubicInterpolation(0)(1)(2)(3)(0) // 1 (returns y1)
 * cubicInterpolation(0)(1)(2)(3)(1) // 2 (returns y2)
 * cubicInterpolation(null)(1)(2)(3)(0.5) // NaN
 *
 * // Partial application
 * const interpolate = cubicInterpolation(0)(10)(10)(0)
 * interpolate(0.5) // 11.25 (overshoots due to cubic nature)
 * ```
 * @pure
 * @curried
 * @safe
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
