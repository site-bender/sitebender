/**
 * Performs bilinear interpolation on a 2D grid
 * 
 * Interpolates a value at point (x, y) using the four corner values of the
 * surrounding unit square. Assumes corners are at (0,0), (1,0), (0,1), and
 * (1,1) with values q00, q10, q01, q11 respectively. x and y must be in [0,1].
 * First interpolates in x-direction, then in y-direction. Returns NaN for
 * invalid inputs or coordinates outside [0,1].
 * 
 * @curried (q00) => (q10) => (q01) => (q11) => (x) => (y) => number
 * @param q00 - Value at (0, 0) - bottom-left
 * @param q10 - Value at (1, 0) - bottom-right
 * @param q01 - Value at (0, 1) - top-left
 * @param q11 - Value at (1, 1) - top-right
 * @param x - X-coordinate in [0, 1]
 * @param y - Y-coordinate in [0, 1]
 * @returns Interpolated value at (x, y), or NaN if invalid
 * @example
 * ```typescript
 * // Simple unit square
 * bilinearInterpolation(0)(1)(2)(3)(0.5)(0.5)
 * // 1.5 (center average of 0,1,2,3)
 * 
 * bilinearInterpolation(0)(10)(20)(30)(0.5)(0.5)
 * // 15 (center average)
 * 
 * // Corner values (no interpolation needed)
 * bilinearInterpolation(5)(10)(15)(20)(0)(0)
 * // 5 (q00)
 * 
 * bilinearInterpolation(5)(10)(15)(20)(1)(0)
 * // 10 (q10)
 * 
 * bilinearInterpolation(5)(10)(15)(20)(0)(1)
 * // 15 (q01)
 * 
 * bilinearInterpolation(5)(10)(15)(20)(1)(1)
 * // 20 (q11)
 * 
 * // Edge interpolation
 * bilinearInterpolation(0)(4)(8)(12)(0.5)(0)
 * // 2 (halfway between 0 and 4)
 * 
 * bilinearInterpolation(0)(4)(8)(12)(0)(0.5)
 * // 4 (halfway between 0 and 8)
 * 
 * bilinearInterpolation(0)(4)(8)(12)(1)(0.5)
 * // 8 (halfway between 4 and 12)
 * 
 * // Quarter points
 * bilinearInterpolation(0)(10)(20)(30)(0.25)(0.25)
 * // 7.5
 * 
 * bilinearInterpolation(0)(10)(20)(30)(0.75)(0.75)
 * // 22.5
 * 
 * // Uniform grid (all same value)
 * bilinearInterpolation(5)(5)(5)(5)(0.3)(0.7)
 * // 5 (constant everywhere)
 * 
 * // Out of bounds returns NaN
 * bilinearInterpolation(0)(1)(2)(3)(1.5)(0.5)
 * // NaN (x > 1)
 * 
 * bilinearInterpolation(0)(1)(2)(3)(0.5)(-0.1)
 * // NaN (y < 0)
 * 
 * // Invalid inputs
 * bilinearInterpolation(null)(1)(2)(3)(0.5)(0.5)
 * // NaN
 * 
 * bilinearInterpolation(0)(1)(2)(3)("0.5")(0.5)
 * // NaN
 * 
 * // Practical examples
 * 
 * // Image pixel interpolation
 * const pixelValue = (tl: number, tr: number, bl: number, br: number) =>
 *   (fx: number, fy: number) =>
 *     bilinearInterpolation(bl)(br)(tl)(tr)(fx)(fy)
 * const pixel = pixelValue(100, 150, 50, 75)
 * pixel(0.5, 0.5)  // 93.75 (smoothed pixel value)
 * 
 * // Height map interpolation
 * const terrain = bilinearInterpolation(100)(120)(110)(130)
 * terrain(0.3, 0.7)  // 113 meters (interpolated elevation)
 * terrain(0.8, 0.2)  // 118 meters
 * 
 * // Temperature field
 * const tempGrid = bilinearInterpolation(20)(22)(24)(26)
 * const getTemp = (x: number, y: number) => tempGrid(x)(y)
 * getTemp(0.5, 0.5)  // 23°C (center)
 * getTemp(0.2, 0.8)  // 22.8°C
 * 
 * // Texture mapping
 * const texel = (u: number, v: number) => {
 *   // Four corner colors (grayscale)
 *   const colors = bilinearInterpolation(0)(255)(128)(192)
 *   return Math.round(colors(u)(v))
 * }
 * texel(0.5, 0.5)  // 144 (blended color)
 * 
 * // Vector field interpolation (do for each component)
 * const vx = bilinearInterpolation(1)(2)(-1)(0)
 * const vy = bilinearInterpolation(0)(1)(2)(3)
 * const vector = (x: number, y: number) => ({
 *   x: vx(x)(y),
 *   y: vy(x)(y)
 * })
 * vector(0.5, 0.5)  // { x: 0.5, y: 1.5 }
 * 
 * // Partial application for fixed corners
 * const corners = bilinearInterpolation(0)(100)(100)(200)
 * const atPoint = corners(0.3)
 * atPoint(0.3)  // 69 (30% along both axes)
 * atPoint(0.7)  // 109 (30% x, 70% y)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Bounded - Coordinates must be in [0, 1]
 * @property Linear - Linear in each direction independently
 */
const bilinearInterpolation = (
	q00: number | null | undefined
) => (
	q10: number | null | undefined
) => (
	q01: number | null | undefined
) => (
	q11: number | null | undefined
) => (
	x: number | null | undefined
) => (
	y: number | null | undefined
): number => {
	// Validate corner values
	if (q00 == null || typeof q00 !== 'number') {
		return NaN
	}
	
	if (q10 == null || typeof q10 !== 'number') {
		return NaN
	}
	
	if (q01 == null || typeof q01 !== 'number') {
		return NaN
	}
	
	if (q11 == null || typeof q11 !== 'number') {
		return NaN
	}
	
	// Validate coordinates
	if (x == null || typeof x !== 'number') {
		return NaN
	}
	
	if (y == null || typeof y !== 'number') {
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
	const fx0 = q00 * (1 - x) + q10 * x  // Bottom edge
	const fx1 = q01 * (1 - x) + q11 * x  // Top edge
	
	// Then interpolate in y-direction
	return fx0 * (1 - y) + fx1 * y
}

export default bilinearInterpolation