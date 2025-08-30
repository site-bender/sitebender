import type { Pair } from "../../../types/tuple/index.ts"

import isNullish from "../../validation/isNullish/index.ts"
import pair from "../../tuple/pair/index.ts"

/**
 * Converts polar coordinates to Cartesian coordinates
 *
 * Transforms a point specified in polar coordinates (r, θ) to Cartesian
 * coordinates (x, y). The angle θ is expected in radians. Returns [x, y]
 * as a Pair tuple where x = r × cos(θ) and y = r × sin(θ). Returns
 * [NaN, NaN] for invalid inputs.
 *
 * @param r - Radius (distance from origin)
 * @param theta - Angle in radians (measured counterclockwise from positive x-axis)
 * @returns Pair tuple [x, y] in Cartesian coordinates, or [NaN, NaN] if invalid
 * @example
 * ```typescript
 * // Unit circle points
 * polarToCartesian(1)(0) // [1, 0]
 * polarToCartesian(1)(Math.PI / 2) // [0, 1]
 * polarToCartesian(1)(Math.PI) // [-1, 0]
 *
 * // Different radii
 * polarToCartesian(2)(Math.PI / 4) // [1.414..., 1.414...]
 * polarToCartesian(0)(Math.PI / 4) // [0, 0]
 *
 * // Invalid inputs
 * polarToCartesian(null)(Math.PI) // [NaN, NaN]
 *
 * // Drawing a circle
 * const circlePoints = (radius: number, numPoints: number) =>
 *   Array.from({length: numPoints}, (_, i) =>
 *     polarToCartesian(radius)((2 * Math.PI * i) / numPoints)
 *   )
 * circlePoints(10, 4) // [[10, 0], [0, 10], [-10, 0], [0, -10]]
 *
 * // Partial application
 * const unitCircle = polarToCartesian(1)
 * unitCircle(Math.PI) // [-1, 0]
 * ```
 * @pure
 * @curried
 * @safe
 */
const polarToCartesian = (
	r: number | null | undefined,
) =>
(
	theta: number | null | undefined,
): Pair<number, number> => {
	if (isNullish(r) || typeof r !== "number") {
		return pair(NaN)(NaN)
	}

	if (isNullish(theta) || typeof theta !== "number") {
		return pair(NaN)(NaN)
	}

	// Check for non-finite values
	if (!isFinite(r) || !isFinite(theta)) {
		return pair(NaN)(NaN)
	}

	// Calculate Cartesian coordinates
	const x = r * Math.cos(theta)
	const y = r * Math.sin(theta)

	return pair(x)(y)
}

export default polarToCartesian
