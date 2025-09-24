import isNullish from "../../validation/isNullish/index.ts"

/**
 * Performs smooth Hermite interpolation between two values
 *
 * Implements the smoothstep function, which produces a smooth S-curve
 * interpolation with zero derivatives at the endpoints. Returns 0 when
 * x <= edge0, 1 when x >= edge1, and smoothly interpolates in between
 * using the formula: 3t² - 2t³ where t is the clamped linear interpolation.
 * Returns NaN for invalid inputs or if edge0 >= edge1.
 *
 * @curried
 * @param edge0 - Lower edge of the interpolation range
 * @param edge1 - Upper edge of the interpolation range
 * @param x - Value to interpolate
 * @returns Smoothly interpolated value between 0 and 1, or NaN if invalid
 * @example
 * ```typescript
 * // Basic smoothstep interpolation
 * smoothstep(0)(1)(0.5) // 0.5
 * smoothstep(0)(1)(0.25) // 0.15625 (slow start)
 * smoothstep(0)(1)(0.75) // 0.84375 (slow end)
 *
 * // Edge cases
 * smoothstep(0)(1)(0) // 0 (at edge0)
 * smoothstep(0)(1)(1) // 1 (at edge1)
 * smoothstep(0)(1)(-0.5) // 0 (clamped)
 * smoothstep(0)(1)(1.5) // 1 (clamped)
 * smoothstep(10)(5)(7) // NaN (edge0 > edge1)
 * smoothstep(null)(1)(0.5) // NaN
 *
 * // Partial application
 * const fade = smoothstep(0)(1)
 * fade(0.3) // 0.216
 * fade(0.7) // 0.784
 * ```
 * @pure
 * @curried
 * @safe
 */
const smoothstep = (
	edge0: number | null | undefined,
) =>
(
	edge1: number | null | undefined,
) =>
(
	x: number | null | undefined,
): number => {
	if (isNullish(edge0) || typeof edge0 !== "number") {
		return NaN
	}

	if (isNullish(edge1) || typeof edge1 !== "number") {
		return NaN
	}

	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Edges must be in correct order
	if (edge0 >= edge1) {
		return NaN
	}

	// Clamp x to [0, 1] range
	if (x <= edge0) {
		return 0
	}
	if (x >= edge1) {
		return 1
	}

	// Scale and bias x to [0, 1]
	const t = (x - edge0) / (edge1 - edge0)

	// Apply smoothstep formula: 3t² - 2t³
	return t * t * (3 - 2 * t)
}

export default smoothstep
