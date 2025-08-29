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
 * tangent(0) // 0
 * tangent(Math.PI / 4) // 1 (45 degrees)
 * tangent(Math.PI) // ~0 (180 degrees)
 *
 * // Special angles
 * tangent(Math.PI / 6) // 0.5773... (1/√3)
 * tangent(Math.PI / 3) // 1.732... (√3)
 *
 * // Asymptotes (undefined at π/2 + nπ)
 * tangent(Math.PI / 2) // Very large number
 *
 * // Invalid inputs
 * tangent(null) // NaN
 *
 * // Slope calculation
 * const slope = (angle: number) => tangent(angle)
 * slope(Math.PI / 4) // 1 (45° slope = 100% grade)
 *
 * // Shadow length calculation
 * const shadowLength = (height: number, sunAngle: number) =>
 *   height / tangent(sunAngle)
 * shadowLength(10, Math.PI / 4) // 10 (45° sun angle)
 * ```
 * @pure
 * @safe
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
