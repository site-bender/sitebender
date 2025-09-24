import isNullish from "../../validation/isNullish/index.ts"

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
 * radiansToDegrees(0) // 0
 * radiansToDegrees(Math.PI / 2) // 90
 * radiansToDegrees(Math.PI) // 180
 * radiansToDegrees(2 * Math.PI) // 360
 *
 * // Other angles
 * radiansToDegrees(Math.PI / 4) // 45
 * radiansToDegrees(-Math.PI) // -180
 * radiansToDegrees(1) // 57.295... (1 radian ≈ 57.3°)
 *
 * // Invalid inputs
 * radiansToDegrees(null) // NaN
 *
 * // Converting Math function results
 * const angle = Math.atan2(1, 1)  // Returns radians
 * radiansToDegrees(angle) // 45 (degrees)
 * ```
 * @pure
 * @safe
 */
const radiansToDegrees = (
	radians: number | null | undefined,
): number => {
	if (isNullish(radians) || typeof radians !== "number") {
		return NaN
	}

	return radians * (180 / Math.PI)
}

export default radiansToDegrees
