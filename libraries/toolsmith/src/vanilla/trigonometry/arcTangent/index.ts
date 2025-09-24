import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the inverse tangent (arctangent) of a value
 *
 * Computes the angle whose tangent is the given value. Unlike arcSine
 * and arcCosine, input can be any real number. Returns the angle in
 * radians between -π/2 and π/2. Use radiansToDegrees to convert to
 * degrees. Returns NaN for invalid inputs.
 *
 * @param x - Any real number
 * @returns Angle in radians (-π/2 to π/2), or NaN if invalid
 * @pure
 * @safe
 * @example
 * ```typescript
 * // Basic usage
 * arcTangent(0)            // 0
 * arcTangent(1)            // 0.7853... (π/4)
 * arcTangent(-1)           // -0.7853... (-π/4)
 * arcTangent(Math.sqrt(3)) // 1.047... (π/3)
 *
 * // Limits
 * arcTangent(Infinity)     // 1.5707... (π/2)
 * arcTangent(-Infinity)    // -1.5707... (-π/2)
 *
 * // Edge cases
 * arcTangent(NaN)          // NaN
 * arcTangent(null)         // NaN
 *
 * // Slope to angle conversion
 * const slopeAngle = (rise: number, run: number) =>
 *   arcTangent(rise / run)
 * ```
 */
const arcTangent = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	return Math.atan(x)
}

export default arcTangent
