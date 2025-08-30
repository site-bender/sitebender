import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the angle from positive x-axis to point (x, y)
 *
 * Computes the arctangent of y/x, handling all four quadrants correctly.
 * Unlike arcTangent(y/x), this function uses the signs of both arguments
 * to determine the correct quadrant. Returns angle in radians from -π to π.
 * Use radiansToDegrees to convert to degrees. Returns NaN for invalid inputs.
 *
 * @curried
 * @param y - Y-coordinate (vertical component)
 * @param x - X-coordinate (horizontal component)
 * @returns Angle in radians (-π to π), or NaN if invalid
 * @pure
 * @curried
 * @safe
 * @example
 * ```typescript
 * // Cardinal directions
 * arcTangent2(0)(1)   // 0 (East)
 * arcTangent2(1)(0)   // π/2 (North)
 * arcTangent2(0)(-1)  // π (West)
 * arcTangent2(-1)(0)  // -π/2 (South)
 *
 * // Diagonal directions
 * arcTangent2(1)(1)   // π/4 (Northeast)
 * arcTangent2(1)(-1)  // 3π/4 (Northwest)
 *
 * // Different from arcTangent(y/x)
 * arcTangent2(1)(-1)  // 2.356... (correct quadrant)
 *
 * // Edge cases
 * arcTangent2(0)(0)   // 0
 * arcTangent2(null)(1) // NaN
 *
 * // Angle between two points
 * const angleBetween = (p1: [number, number], p2: [number, number]) =>
 *   arcTangent2(p2[1] - p1[1])(p2[0] - p1[0])
 * ```
 */
const arcTangent2 = (
	y: number | null | undefined,
) =>
(
	x: number | null | undefined,
): number => {
	if (isNullish(y) || typeof y !== "number") {
		return NaN
	}

	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	return Math.atan2(y, x)
}

export default arcTangent2
