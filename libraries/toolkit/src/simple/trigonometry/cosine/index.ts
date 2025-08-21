/**
 * Calculates the cosine of an angle in radians
 * 
 * Computes the trigonometric cosine function, which represents the
 * x-coordinate of a point on the unit circle. Input must be in
 * radians; use degreesToRadians for degree inputs. Returns NaN
 * for invalid inputs.
 * 
 * @param radians - Angle in radians
 * @returns Cosine of the angle (-1 to 1), or NaN if invalid
 * @example
 * ```typescript
 * // Common angles
 * cosine(0)
 * // 1
 * 
 * cosine(Math.PI / 2)
 * // 0 (90 degrees, approximately)
 * 
 * cosine(Math.PI)
 * // -1 (180 degrees)
 * 
 * cosine(3 * Math.PI / 2)
 * // 0 (270 degrees, approximately)
 * 
 * cosine(2 * Math.PI)
 * // 1 (360 degrees)
 * 
 * // 45 degrees (π/4)
 * cosine(Math.PI / 4)
 * // 0.7071... (√2/2)
 * 
 * // 30 degrees (π/6)
 * cosine(Math.PI / 6)
 * // 0.8660... (√3/2)
 * 
 * // 60 degrees (π/3)
 * cosine(Math.PI / 3)
 * // 0.5
 * 
 * // Negative angles (cosine is even function)
 * cosine(-Math.PI / 2)
 * // 0 (same as positive)
 * 
 * cosine(-Math.PI / 3)
 * // 0.5
 * 
 * // Large angles (periodic)
 * cosine(4 * Math.PI)
 * // 1
 * 
 * // Invalid inputs return NaN
 * cosine(null)
 * // NaN
 * 
 * cosine("0")
 * // NaN
 * 
 * // Practical examples
 * 
 * // Wave generation (phase shifted)
 * const waveValue = (time: number, frequency: number) =>
 *   cosine(2 * Math.PI * frequency * time)
 * waveValue(0, 1)     // 1 (starts at peak)
 * waveValue(0.25, 1)  // 0 (quarter period)
 * 
 * // Circular motion
 * const xPosition = (angle: number, radius: number) =>
 *   radius * cosine(angle)
 * xPosition(0, 10)         // 10 (right of circle)
 * xPosition(Math.PI, 10)   // -10 (left of circle)
 * 
 * // With degree conversion
 * import degreesToRadians from "../degreesToRadians/index.ts"
 * const cosDegrees = (degrees: number) => 
 *   cosine(degreesToRadians(degrees))
 * cosDegrees(0)   // 1
 * cosDegrees(60)  // 0.5
 * cosDegrees(90)  // 0
 * 
 * // Direction vector
 * const directionX = (angle: number) => cosine(angle)
 * const directionY = (angle: number) => sine(angle)
 * // Unit vector at 45°: [0.707..., 0.707...]
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Periodic - Repeats every 2π radians
 * @property Range - Output always between -1 and 1
 * @property Even - cos(-x) = cos(x)
 */
const cosine = (
	radians: number | null | undefined
): number => {
	if (radians == null || typeof radians !== 'number') {
		return NaN
	}
	
	return Math.cos(radians)
}

export default cosine