import isNullish from "../../validation/isNullish/index.ts"

/**
 * Performs bilinear interpolation on a 2D grid
 *
 * Interpolates a value at point (x, y) using the four corner values of the
 * surrounding unit square. Assumes corners are at (0,0), (1,0), (0,1), and
 * (1,1) with values q00, q10, q01, q11 respectively. x and y must be in [0,1].
 * First interpolates in x-direction, then in y-direction. Returns NaN for
 * invalid inputs or coordinates outside [0,1].
 *
 * @param q00 - Value at (0, 0) - bottom-left
 * @param q10 - Value at (1, 0) - bottom-right
 * @param q01 - Value at (0, 1) - top-left
 * @param q11 - Value at (1, 1) - top-right
 * @param x - X-coordinate in [0, 1]
 * @param y - Y-coordinate in [0, 1]
 * @returns Interpolated value at (x, y), or NaN if invalid
 * @curried
 * @pure
 * @safe
 * @example
 * ```typescript
 * // Simple unit square
 * bilinearInterpolation(0)(1)(2)(3)(0.5)(0.5)  // 1.5 (center)
 * bilinearInterpolation(0)(10)(20)(30)(0.5)(0.5)  // 15 (center)
 *
 * // Corner values (no interpolation needed)
 * bilinearInterpolation(5)(10)(15)(20)(0)(0)  // 5 (q00)
 * bilinearInterpolation(5)(10)(15)(20)(1)(1)  // 20 (q11)
 *
 * // Edge interpolation
 * bilinearInterpolation(0)(4)(8)(12)(0.5)(0)  // 2 (bottom edge)
 * bilinearInterpolation(0)(4)(8)(12)(0)(0.5)  // 4 (left edge)
 *
 * // Height map interpolation
 * const terrain = bilinearInterpolation(100)(120)(110)(130)
 * terrain(0.3, 0.7)  // 113 meters
 *
 * // Image pixel smoothing
 * const pixel = bilinearInterpolation(50)(75)(100)(150)
 * pixel(0.5, 0.5)  // 93.75 (smoothed value)
 *
 * // Edge cases
 * bilinearInterpolation(0)(1)(2)(3)(1.5)(0.5)  // NaN (x > 1)
 * bilinearInterpolation(null)(1)(2)(3)(0.5)(0.5)  // NaN
 * ```
 */
const bilinearInterpolation = (
	q00: number | null | undefined,
) =>
(
	q10: number | null | undefined,
) =>
(
	q01: number | null | undefined,
) =>
(
	q11: number | null | undefined,
) =>
(
	x: number | null | undefined,
) =>
(
	y: number | null | undefined,
): number => {
	// Validate corner values
	if (isNullish(q00) || typeof q00 !== "number") {
		return NaN
	}

	if (isNullish(q10) || typeof q10 !== "number") {
		return NaN
	}

	if (isNullish(q01) || typeof q01 !== "number") {
		return NaN
	}

	if (isNullish(q11) || typeof q11 !== "number") {
		return NaN
	}

	// Validate coordinates
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	if (isNullish(y) || typeof y !== "number") {
		return NaN
	}

	// Check bounds [0, 1]
	if (x < 0 || x > 1) {
		return NaN
	}

	if (y < 0 || y > 1) {
		return NaN
	}

	// Bilinear interpolation formula:
	// f(x,y) = (1-x)(1-y)q00 + x(1-y)q10 + (1-x)y*q01 + xy*q11

	// First interpolate in x-direction
	const fx0 = q00 * (1 - x) + q10 * x // Bottom edge
	const fx1 = q01 * (1 - x) + q11 * x // Top edge

	// Then interpolate in y-direction
	return fx0 * (1 - y) + fx1 * y
}

export default bilinearInterpolation
