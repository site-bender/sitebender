/**
 * Calculates the sine of an angle in radians
 *
 * Computes the trigonometric sine function, which represents the
 * y-coordinate of a point on the unit circle. Input must be in
 * radians; use degreesToRadians for degree inputs. Returns NaN
 * for invalid inputs.
 *
 * @param radians - Angle in radians
 * @returns Sine of the angle (-1 to 1), or NaN if invalid
 * @example
 * ```typescript
 * // Common angles
 * sine(0)
 * // 0
 *
 * sine(Math.PI / 2)
 * // 1 (90 degrees)
 *
 * sine(Math.PI)
 * // 0 (180 degrees, approximately)
 *
 * sine(3 * Math.PI / 2)
 * // -1 (270 degrees)
 *
 * sine(2 * Math.PI)
 * // 0 (360 degrees, approximately)
 *
 * // 45 degrees (π/4)
 * sine(Math.PI / 4)
 * // 0.7071... (√2/2)
 *
 * // 30 degrees (π/6)
 * sine(Math.PI / 6)
 * // 0.5
 *
 * // 60 degrees (π/3)
 * sine(Math.PI / 3)
 * // 0.8660... (√3/2)
 *
 * // Negative angles
 * sine(-Math.PI / 2)
 * // -1
 *
 * sine(-Math.PI / 6)
 * // -0.5
 *
 * // Large angles (periodic)
 * sine(5 * Math.PI)
 * // 0 (approximately)
 *
 * // Invalid inputs return NaN
 * sine(null)
 * // NaN
 *
 * sine("1.57")
 * // NaN
 *
 * // Practical examples
 *
 * // Wave generation
 * const waveHeight = (time: number, frequency: number) =>
 *   sine(2 * Math.PI * frequency * time)
 * waveHeight(0.25, 1)  // 1 (peak at quarter period)
 * waveHeight(0.5, 1)   // 0 (zero crossing)
 *
 * // Circular motion
 * const yPosition = (angle: number, radius: number) =>
 *   radius * sine(angle)
 * yPosition(Math.PI / 2, 10)  // 10 (top of circle)
 *
 * // With degree conversion
 * import degreesToRadians from "../degreesToRadians/index.ts"
 * const sinDegrees = (degrees: number) =>
 *   sine(degreesToRadians(degrees))
 * sinDegrees(30)  // 0.5
 * sinDegrees(90)  // 1
 *
 * // Oscillation
 * const oscillate = (t: number, amplitude: number) =>
 *   amplitude * sine(t)
 * oscillate(0, 5)           // 0
 * oscillate(Math.PI / 2, 5) // 5
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Periodic - Repeats every 2π radians
 * @property Range - Output always between -1 and 1
 */
const sine = (
	radians: number | null | undefined,
): number => {
	if (radians == null || typeof radians !== "number") {
		return NaN
	}

	return Math.sin(radians)
}

export default sine
