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
 * @curried (x) => (y) => Pair<number, number>
 * @param x - X-coordinate in Cartesian system
 * @param y - Y-coordinate in Cartesian system
 * @returns Pair tuple [r, theta] in polar coordinates, or [NaN, NaN] if invalid
 * @example
 * ```typescript
 * // Cardinal directions
 * cartesianToPolar(1)(0)
 * // [1, 0] (positive x-axis: r=1, θ=0)
 * 
 * cartesianToPolar(0)(1)
 * // [1, π/2] (positive y-axis: r=1, θ=π/2)
 * 
 * cartesianToPolar(-1)(0)
 * // [1, π] (negative x-axis: r=1, θ=π)
 * 
 * cartesianToPolar(0)(-1)
 * // [1, -π/2] (negative y-axis: r=1, θ=-π/2)
 * 
 * // 45-degree angles
 * cartesianToPolar(1)(1)
 * // [1.414..., 0.785...] (√2, π/4)
 * 
 * cartesianToPolar(-1)(1)
 * // [1.414..., 2.356...] (√2, 3π/4)
 * 
 * // Different distances
 * cartesianToPolar(3)(4)
 * // [5, 0.927...] (3-4-5 triangle)
 * 
 * cartesianToPolar(-3)(-4)
 * // [5, -2.214...] (third quadrant)
 * 
 * // Origin
 * cartesianToPolar(0)(0)
 * // [0, 0] (origin has r=0, θ=0 by convention)
 * 
 * // Very small values (precision)
 * cartesianToPolar(0.001)(0.001)
 * // [0.00141..., 0.785...] (tiny radius, 45°)
 * 
 * // Invalid inputs
 * cartesianToPolar(null)(1)
 * // [NaN, NaN]
 * 
 * cartesianToPolar(1)(null)
 * // [NaN, NaN]
 * 
 * cartesianToPolar("2")(3)
 * // [NaN, NaN]
 * 
 * // Practical examples
 * 
 * // Convert mouse position to polar
 * const mouseToPolar = (mouseX: number, mouseY: number, centerX: number, centerY: number) => {
 *   const relX = mouseX - centerX
 *   const relY = mouseY - centerY
 *   return cartesianToPolar(relX)(relY)
 * }
 * 
 * // Vector magnitude and direction
 * const vectorAnalysis = (vx: number, vy: number) => {
 *   const [magnitude, direction] = cartesianToPolar(vx)(vy)
 *   return { magnitude, directionRadians: direction }
 * }
 * vectorAnalysis(3, 4) // { magnitude: 5, directionRadians: 0.927... }
 * 
 * // Round trip conversion
 * const roundTrip = (x: number, y: number) => {
 *   const [r, theta] = cartesianToPolar(x)(y)
 *   // Would use polarToCartesian(r)(theta) to convert back
 *   return [r, theta]
 * }
 * 
 * // Partial application for analyzing points
 * const fromOrigin = cartesianToPolar
 * fromOrigin(1)(0) // [1, 0]
 * fromOrigin(0)(1) // [1, π/2]
 * fromOrigin(-1)(0) // [1, π]
 * 
 * // Convert array of points
 * const points = [[1, 0], [0, 1], [-1, 0], [0, -1]]
 * const polarPoints = points.map(([x, y]) => cartesianToPolar(x)(y))
 * // [[1, 0], [1, π/2], [1, π], [1, -π/2]]
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns [NaN, NaN] for invalid inputs
 * @property Range - Angle θ is in range [-π, π]
 */
const cartesianToPolar = (
	x: number | null | undefined
) => (
	y: number | null | undefined
): Pair<number, number> => {
	if (x == null || typeof x !== 'number') {
		return pair(NaN)(NaN)
	}
	
	if (y == null || typeof y !== 'number') {
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