import type { Pair } from "../../../types/tuple/index.ts"

import pair from "../../tuple/pair/index.ts"

/**
 * Converts Cartesian coordinates to polar coordinates
 *
 * Transforms a point specified in Cartesian coordinates (x, y) to polar
 * coordinates (r, θ). Returns [r, θ] as a Pair tuple where r is the
 * distance from the origin and θ is the angle in radians (range -π to π).
 * Uses Math.atan2 for correct quadrant determination. Returns [NaN, NaN]
 * for invalid inputs.
 *
 * @curried
 * @param x - X-coordinate in Cartesian system
 * @param y - Y-coordinate in Cartesian system
 * @returns Pair tuple [r, theta] in polar coordinates, or [NaN, NaN] if invalid
 * @pure
 * @curried
 * @safe
 * @example
 * ```typescript
 * // Cardinal directions
 * cartesianToPolar(1)(0)  // [1, 0]
 * cartesianToPolar(0)(1)  // [1, π/2]
 * cartesianToPolar(-1)(0) // [1, π]
 * cartesianToPolar(0)(-1) // [1, -π/2]
 *
 * // 45-degree angles
 * cartesianToPolar(1)(1)  // [√2, π/4]
 * cartesianToPolar(3)(4)  // [5, 0.927...]
 *
 * // Edge cases
 * cartesianToPolar(0)(0)    // [0, 0]
 * cartesianToPolar(null)(1) // [NaN, NaN]
 *
 * // Vector magnitude and direction
 * const vectorPolar = (vx: number, vy: number) => {
 *   const [r, theta] = cartesianToPolar(vx)(vy)
 *   return { magnitude: r, angle: theta }
 * }
 * ```
 */
const cartesianToPolar = (
	x: number | null | undefined,
) =>
(
	y: number | null | undefined,
): Pair<number, number> => {
	if (x == null || typeof x !== "number") {
		return pair(NaN)(NaN)
	}

	if (y == null || typeof y !== "number") {
		return pair(NaN)(NaN)
	}

	// Check for non-finite values
	if (!isFinite(x) || !isFinite(y)) {
		return pair(NaN)(NaN)
	}

	// Calculate polar coordinates
	const r = Math.sqrt(x * x + y * y)
	const theta = Math.atan2(y, x) // atan2 handles quadrant correctly

	return pair(r)(theta)
}

export default cartesianToPolar
