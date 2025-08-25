/**
 * Calculates the tangent of an angle in radians
 *
 * Computes the trigonometric tangent function, which represents the
 * ratio of sine to cosine (sin/cos). Input must be in radians; use
 * degreesToRadians for degree inputs. Returns NaN for invalid inputs
 * or when cosine equals zero (at π/2 + nπ).
 *
 * @param radians - Angle in radians
 * @returns Tangent of the angle, or NaN if invalid or undefined
 * @example
 * ```typescript
 * // Common angles
 * tangent(0)
 * // 0
 *
 * tangent(Math.PI / 4)
 * // 1 (45 degrees)
 *
 * tangent(Math.PI)
 * // 0 (180 degrees, approximately)
 *
 * tangent(-Math.PI / 4)
 * // -1 (-45 degrees)
 *
 * // 30 degrees (π/6)
 * tangent(Math.PI / 6)
 * // 0.5773... (1/√3)
 *
 * // 60 degrees (π/3)
 * tangent(Math.PI / 3)
 * // 1.732... (√3)
 *
 * // Asymptotes (undefined at π/2 + nπ)
 * tangent(Math.PI / 2)
 * // Very large number (approaching infinity)
 *
 * tangent(-Math.PI / 2)
 * // Very large negative number
 *
 * // Negative angles
 * tangent(-Math.PI / 6)
 * // -0.5773...
 *
 * // Large angles (periodic with period π)
 * tangent(5 * Math.PI / 4)
 * // 1 (same as π/4)
 *
 * // Invalid inputs return NaN
 * tangent(null)
 * // NaN
 *
 * tangent("0.785")
 * // NaN
 *
 * // Practical examples
 *
 * // Slope calculation
 * const slope = (angle: number) => tangent(angle)
 * slope(Math.PI / 4)  // 1 (45° slope = 100% grade)
 * slope(Math.PI / 6)  // 0.577 (30° slope ≈ 58% grade)
 *
 * // Shadow length calculation
 * const shadowLength = (height: number, sunAngle: number) =>
 *   height / tangent(sunAngle)
 * shadowLength(10, Math.PI / 4)  // 10 (45° sun angle)
 * shadowLength(10, Math.PI / 3)  // 5.77 (60° sun angle)
 *
 * // With degree conversion
 * import degreesToRadians from "../degreesToRadians/index.ts"
 * const tanDegrees = (degrees: number) =>
 *   tangent(degreesToRadians(degrees))
 * tanDegrees(45)  // 1
 * tanDegrees(30)  // 0.577...
 *
 * // Navigation bearing
 * const bearing = (dx: number, dy: number) =>
 *   Math.atan2(dy, dx)  // Returns angle whose tangent is dy/dx
 * const checkTangent = tangent(bearing(3, 4))
 * // 1.333... (4/3)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Periodic - Repeats every π radians
 * @property Discontinuous - Has asymptotes at π/2 + nπ
 */
const tangent = (
	radians: number | null | undefined,
): number => {
	if (radians == null || typeof radians !== "number") {
		return NaN
	}

	return Math.tan(radians)
}

export default tangent
