import isNullish from "../../validation/isNullish/index.ts"

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
 * @pure
 * @safe
 * @example
 * ```typescript
 * // Common angles
 * cosine(0)              // 1
 * cosine(Math.PI / 2)    // 0 (90°)
 * cosine(Math.PI)        // -1 (180°)
 * cosine(2 * Math.PI)    // 1 (360°)
 *
 * // Special angles
 * cosine(Math.PI / 3)    // 0.5 (60°)
 * cosine(Math.PI / 4)    // √2/2 (45°)
 *
 * // Edge cases
 * cosine(NaN)            // NaN
 * cosine(null)           // NaN
 *
 * // Circular motion x-coordinate
 * const xPos = (angle: number, radius: number) =>
 *   radius * cosine(angle)
 * ```
 */
const cosine = (
	radians: number | null | undefined,
): number => {
	if (isNullish(radians) || typeof radians !== "number") {
		return NaN
	}

	return Math.cos(radians)
}

export default cosine
