/**
 * Converts degrees to radians
 *
 * Transforms an angle measured in degrees to its equivalent in radians
 * using the formula: radians = degrees × (π/180). This conversion is
 * essential for trigonometric functions which typically expect radians.
 * Returns NaN for invalid inputs.
 *
 * @param degrees - Angle in degrees to convert
 * @returns Angle in radians, or NaN if invalid
 * @pure
 * @safe
 * @example
 * ```typescript
 * // Common angles
 * degreesToRadians(0)    // 0
 * degreesToRadians(90)   // π/2
 * degreesToRadians(180)  // π
 * degreesToRadians(360)  // 2π
 *
 * // Special angles
 * degreesToRadians(45)   // π/4
 * degreesToRadians(-90)  // -π/2
 *
 * // Edge cases
 * degreesToRadians(NaN)  // NaN
 * degreesToRadians(null) // NaN
 *
 * // Use with trig functions
 * const sinDegrees = (deg: number) =>
 *   Math.sin(degreesToRadians(deg))
 * ```
 */
const degreesToRadians = (
	degrees: number | null | undefined,
): number => {
	if (degrees == null || typeof degrees !== "number") {
		return NaN
	}

	return degrees * (Math.PI / 180)
}

export default degreesToRadians
