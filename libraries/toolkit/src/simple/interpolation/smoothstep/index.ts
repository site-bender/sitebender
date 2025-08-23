/**
 * Performs smooth Hermite interpolation between two values
 * 
 * Implements the smoothstep function, which produces a smooth S-curve
 * interpolation with zero derivatives at the endpoints. Returns 0 when
 * x <= edge0, 1 when x >= edge1, and smoothly interpolates in between
 * using the formula: 3t² - 2t³ where t is the clamped linear interpolation.
 * Returns NaN for invalid inputs or if edge0 >= edge1.
 * 
 * @curried (edge0) => (edge1) => (x) => number
 * @param edge0 - Lower edge of the interpolation range
 * @param edge1 - Upper edge of the interpolation range
 * @param x - Value to interpolate
 * @returns Smoothly interpolated value between 0 and 1, or NaN if invalid
 * @example
 * ```typescript
 * // Basic smoothstep interpolation
 * smoothstep(0)(1)(0.5)
 * // 0.5 (midpoint)
 * 
 * smoothstep(0)(1)(0)
 * // 0 (at lower edge)
 * 
 * smoothstep(0)(1)(1)
 * // 1 (at upper edge)
 * 
 * smoothstep(0)(1)(0.25)
 * // 0.15625 (slow start)
 * 
 * smoothstep(0)(1)(0.75)
 * // 0.84375 (slow end)
 * 
 * // Different ranges
 * smoothstep(10)(20)(15)
 * // 0.5 (midpoint of 10-20)
 * 
 * smoothstep(10)(20)(12)
 * // 0.104 (20% through range)
 * 
 * smoothstep(-1)(1)(0)
 * // 0.5 (center of -1 to 1)
 * 
 * // Clamping behavior
 * smoothstep(0)(1)(-0.5)
 * // 0 (below range)
 * 
 * smoothstep(0)(1)(1.5)
 * // 1 (above range)
 * 
 * smoothstep(5)(10)(3)
 * // 0 (below edge0)
 * 
 * smoothstep(5)(10)(12)
 * // 1 (above edge1)
 * 
 * // Reverse edges return NaN
 * smoothstep(10)(5)(7)
 * // NaN (edge0 > edge1)
 * 
 * // Equal edges return NaN
 * smoothstep(5)(5)(5)
 * // NaN (no range)
 * 
 * // Invalid inputs return NaN
 * smoothstep(0)(1)(null)
 * // NaN
 * 
 * smoothstep(null)(1)(0.5)
 * // NaN
 * 
 * // Practical examples
 * 
 * // Fade transition
 * const fade = smoothstep(0)(1)
 * fade(0.1)  // 0.028 (slow start)
 * fade(0.5)  // 0.5 (midpoint)
 * fade(0.9)  // 0.972 (slow end)
 * 
 * // Distance-based fog
 * const fogDensity = (distance: number) =>
 *   smoothstep(50)(200)(distance)
 * fogDensity(50)   // 0 (no fog)
 * fogDensity(125)  // 0.5 (half fog)
 * fogDensity(200)  // 1 (full fog)
 * 
 * // Animation easing
 * const ease = (start: number, end: number, t: number) => {
 *   const factor = smoothstep(0)(1)(t)
 *   return start + (end - start) * factor
 * }
 * ease(100, 200, 0.3)  // 121.6 (smooth acceleration)
 * 
 * // Color gradient
 * const gradient = smoothstep(0)(100)
 * const redChannel = (x: number) => 255 * gradient(x)
 * redChannel(25)  // 39.8 (dark red)
 * redChannel(50)  // 127.5 (medium red)
 * redChannel(75)  // 215.2 (bright red)
 * 
 * // Edge softening
 * const softEdge = (value: number, threshold: number, softness: number) =>
 *   smoothstep(threshold - softness)(threshold + softness)(value)
 * softEdge(0.5, 0.5, 0.1)  // 0.5 (at threshold)
 * softEdge(0.45, 0.5, 0.1) // 0.156 (soft falloff)
 * 
 * // Terrain blending
 * const blendTerrain = smoothstep(100)(150)  // Blend heights 100-150m
 * blendTerrain(110)  // 0.104 (mostly terrain A)
 * blendTerrain(125)  // 0.5 (equal blend)
 * blendTerrain(140)  // 0.896 (mostly terrain B)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Clamped - Output always between 0 and 1
 * @property Smooth - C¹ continuous (smooth first derivative)
 */
const smoothstep = (
	edge0: number | null | undefined
) => (
	edge1: number | null | undefined
) => (
	x: number | null | undefined
): number => {
	if (edge0 == null || typeof edge0 !== 'number') {
		return NaN
	}
	
	if (edge1 == null || typeof edge1 !== 'number') {
		return NaN
	}
	
	if (x == null || typeof x !== 'number') {
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