/**
 * Converts radians to degrees
 *
 * Transforms an angle measured in radians to its equivalent in degrees
 * using the formula: degrees = radians × (180/π). This conversion is
 * useful when working with user interfaces or geographic systems that
 * typically display angles in degrees. Returns NaN for invalid inputs.
 *
 * @param radians - Angle in radians to convert
 * @returns Angle in degrees, or NaN if invalid
 * @example
 * ```typescript
 * // Common angles
 * radiansToDegrees(0)
 * // 0
 *
 * radiansToDegrees(Math.PI / 2)
 * // 90
 *
 * radiansToDegrees(Math.PI)
 * // 180
 *
 * radiansToDegrees(3 * Math.PI / 2)
 * // 270
 *
 * radiansToDegrees(2 * Math.PI)
 * // 360
 *
 * // π/4 radians (45 degrees)
 * radiansToDegrees(Math.PI / 4)
 * // 45
 *
 * // Negative angles
 * radiansToDegrees(-Math.PI / 2)
 * // -90
 *
 * radiansToDegrees(-Math.PI)
 * // -180
 *
 * // Small angles
 * radiansToDegrees(0.1)
 * // 5.729...
 *
 * radiansToDegrees(1)
 * // 57.295... (1 radian ≈ 57.3°)
 *
 * // Invalid inputs return NaN
 * radiansToDegrees(null)
 * // NaN
 *
 * radiansToDegrees("1.57")
 * // NaN
 *
 * // Practical examples
 *
 * // Converting Math function results
 * const angle = Math.atan2(1, 1)  // Returns radians
 * radiansToDegrees(angle)
 * // 45 (degrees)
 *
 * // Display rotation values
 * const rotation = 0.7854  // radians
 * const displayDegrees = radiansToDegrees(rotation)
 * // 45.0 degrees for UI display
 *
 * // Round-trip conversion
 * import degreesToRadians from "../degreesToRadians/index.ts"
 * const original = 30
 * const rad = degreesToRadians(original)
 * radiansToDegrees(rad)
 * // 30
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 */
const radiansToDegrees = (
	radians: number | null | undefined,
): number => {
	if (radians == null || typeof radians !== "number") {
		return NaN
	}

	return radians * (180 / Math.PI)
}

export default radiansToDegrees
