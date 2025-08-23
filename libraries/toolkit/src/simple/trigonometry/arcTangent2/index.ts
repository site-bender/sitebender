/**
 * Calculates the angle from positive x-axis to point (x, y)
 * 
 * Computes the arctangent of y/x, handling all four quadrants correctly.
 * Unlike arcTangent(y/x), this function uses the signs of both arguments
 * to determine the correct quadrant. Returns angle in radians from -π to π.
 * Use radiansToDegrees to convert to degrees. Returns NaN for invalid inputs.
 * 
 * @curried (y) => (x) => number
 * @param y - Y-coordinate (vertical component)
 * @param x - X-coordinate (horizontal component)
 * @returns Angle in radians (-π to π), or NaN if invalid
 * @example
 * ```typescript
 * // Cardinal directions
 * arcTangent2(0)(1)
 * // 0 (positive x-axis, East)
 * 
 * arcTangent2(1)(0)
 * // 1.5707... (π/2, positive y-axis, North)
 * 
 * arcTangent2(0)(-1)
 * // 3.1415... (π, negative x-axis, West)
 * 
 * arcTangent2(-1)(0)
 * // -1.5707... (-π/2, negative y-axis, South)
 * 
 * // Diagonal directions
 * arcTangent2(1)(1)
 * // 0.7853... (π/4, Northeast, 45°)
 * 
 * arcTangent2(1)(-1)
 * // 2.356... (3π/4, Northwest, 135°)
 * 
 * arcTangent2(-1)(-1)
 * // -2.356... (-3π/4, Southwest, -135°)
 * 
 * arcTangent2(-1)(1)
 * // -0.7853... (-π/4, Southeast, -45°)
 * 
 * // Origin returns 0
 * arcTangent2(0)(0)
 * // 0
 * 
 * // Different from arcTangent(y/x)
 * arcTangent2(1)(-1)
 * // 2.356... (correct quadrant II)
 * // vs arcTangent(1/-1) = arcTangent(-1) = -0.785... (wrong quadrant)
 * 
 * // Common angles
 * arcTangent2(Math.sqrt(3))(1)
 * // 1.047... (π/3, 60°)
 * 
 * arcTangent2(1)(Math.sqrt(3))
 * // 0.5235... (π/6, 30°)
 * 
 * // Invalid inputs return NaN
 * arcTangent2(null)(1)
 * // NaN
 * 
 * arcTangent2(1)(undefined)
 * // NaN
 * 
 * arcTangent2("1")(2)
 * // NaN
 * 
 * // Practical examples
 * 
 * // Vector direction
 * const vectorAngle = (vx: number, vy: number) =>
 *   arcTangent2(vy)(vx)
 * vectorAngle(3, 4)    // 0.927... rad (53.1°)
 * vectorAngle(-5, 5)   // 2.356... rad (135°)
 * 
 * // Convert to degrees
 * import radiansToDegrees from "../radiansToDegrees/index.ts"
 * const angleDegrees = (y: number, x: number) =>
 *   radiansToDegrees(arcTangent2(y)(x))
 * angleDegrees(1, 1)    // 45°
 * angleDegrees(-1, 0)   // -90°
 * 
 * // Angle between two points
 * const angleBetweenPoints = (
 *   x1: number, y1: number,
 *   x2: number, y2: number
 * ) => arcTangent2(y2 - y1)(x2 - x1)
 * angleBetweenPoints(0, 0, 1, 1)   // 0.785... (45°)
 * angleBetweenPoints(2, 2, 0, 4)   // 2.356... (135°)
 * 
 * // Polar to Cartesian conversion check
 * const checkAngle = (r: number, theta: number) => {
 *   const x = r * Math.cos(theta)
 *   const y = r * Math.sin(theta)
 *   return arcTangent2(y)(x)  // Should return theta
 * }
 * checkAngle(5, Math.PI / 3)  // 1.047... (π/3)
 * 
 * // Joystick input angle
 * const joystickAngle = (x: number, y: number) => {
 *   const angle = arcTangent2(y)(x)
 *   // Convert to 0-2π range if needed
 *   return angle < 0 ? angle + 2 * Math.PI : angle
 * }
 * joystickAngle(0.7, 0.7)   // 0.785... (45°)
 * joystickAngle(-0.5, 0.5)  // 2.356... (135°)
 * 
 * // Wind direction (meteorological, from North)
 * const windDirection = (u: number, v: number) => {
 *   // u: east-west, v: north-south wind components
 *   const angleRad = arcTangent2(u)(-v)  // Note: swapped and negated
 *   const angleDeg = radiansToDegrees(angleRad)
 *   return angleDeg < 0 ? angleDeg + 360 : angleDeg
 * }
 * windDirection(1, 1)   // 45° (from Northeast)
 * windDirection(-1, 1)  // 315° (from Northwest)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Full-range - Output between -π and π
 * @property Quadrant-aware - Correctly handles all four quadrants
 */
const arcTangent2 = (
	y: number | null | undefined
) => (
	x: number | null | undefined
): number => {
	if (y == null || typeof y !== 'number') {
		return NaN
	}
	
	if (x == null || typeof x !== 'number') {
		return NaN
	}
	
	return Math.atan2(y, x)
}

export default arcTangent2