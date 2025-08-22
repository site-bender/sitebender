import type { Pair } from "../../../types/tuple/index.ts"

import pair from "../../tuple/pair/index.ts"

/**
 * Converts polar coordinates to Cartesian coordinates
 * 
 * Transforms a point specified in polar coordinates (r, θ) to Cartesian
 * coordinates (x, y). The angle θ is expected in radians. Returns [x, y]
 * as a Pair tuple where x = r × cos(θ) and y = r × sin(θ). Returns
 * [NaN, NaN] for invalid inputs.
 * 
 * @curried (r) => (theta) => Pair<number, number>
 * @param r - Radius (distance from origin)
 * @param theta - Angle in radians (measured counterclockwise from positive x-axis)
 * @returns Pair tuple [x, y] in Cartesian coordinates, or [NaN, NaN] if invalid
 * @example
 * ```typescript
 * // Unit circle points
 * polarToCartesian(1)(0)
 * // [1, 0] (0 radians = positive x-axis)
 * 
 * polarToCartesian(1)(Math.PI / 2)
 * // [0, 1] (π/2 radians = positive y-axis)
 * 
 * polarToCartesian(1)(Math.PI)
 * // [-1, 0] (π radians = negative x-axis)
 * 
 * polarToCartesian(1)(3 * Math.PI / 2)
 * // [0, -1] (3π/2 radians = negative y-axis)
 * 
 * // 45-degree angle
 * polarToCartesian(1)(Math.PI / 4)
 * // [0.707..., 0.707...] (√2/2, √2/2)
 * 
 * // Different radii
 * polarToCartesian(2)(Math.PI / 4)
 * // [1.414..., 1.414...] (√2, √2)
 * 
 * polarToCartesian(5)(Math.PI / 6)
 * // [4.330..., 2.5] (5√3/2, 5/2)
 * 
 * // Negative radius (valid in mathematics)
 * polarToCartesian(-2)(0)
 * // [-2, 0] (points in opposite direction)
 * 
 * // Zero radius
 * polarToCartesian(0)(Math.PI / 4)
 * // [0, 0] (origin regardless of angle)
 * 
 * // Complete rotation
 * polarToCartesian(3)(2 * Math.PI)
 * // [3, 0] (full circle returns to start)
 * 
 * // Invalid inputs
 * polarToCartesian(null)(Math.PI)
 * // [NaN, NaN]
 * 
 * polarToCartesian(2)(null)
 * // [NaN, NaN]
 * 
 * polarToCartesian("5")(Math.PI)
 * // [NaN, NaN]
 * 
 * // Practical examples
 * 
 * // Drawing a circle
 * const circlePoints = (radius: number, numPoints: number) => {
 *   const angleStep = (2 * Math.PI) / numPoints
 *   return Array.from({length: numPoints}, (_, i) =>
 *     polarToCartesian(radius)(i * angleStep)
 *   )
 * }
 * circlePoints(10, 4)
 * // [[10, 0], [0, 10], [-10, 0], [0, -10]]
 * 
 * // Spiral path
 * const spiralPoint = (t: number) => {
 *   const r = t // radius grows with angle
 *   return polarToCartesian(r)(t)
 * }
 * spiralPoint(Math.PI) // [-3.14..., 0]
 * 
 * // Radar/sonar positioning
 * const targetPosition = (distance: number, bearing: number) => {
 *   // Convert bearing from degrees to radians
 *   const radians = bearing * Math.PI / 180
 *   return polarToCartesian(distance)(radians)
 * }
 * targetPosition(100, 45) // [70.7..., 70.7...]
 * 
 * // Partial application for fixed radius
 * const unitCircle = polarToCartesian(1)
 * unitCircle(0) // [1, 0]
 * unitCircle(Math.PI / 2) // [0, 1]
 * unitCircle(Math.PI) // [-1, 0]
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns [NaN, NaN] for invalid inputs
 */
const polarToCartesian = (
	r: number | null | undefined
) => (
	theta: number | null | undefined
): Pair<number, number> => {
	if (r == null || typeof r !== 'number') {
		return pair(NaN)(NaN)
	}
	
	if (theta == null || typeof theta !== 'number') {
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