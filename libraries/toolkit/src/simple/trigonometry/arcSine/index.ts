import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the inverse sine (arcsine) of a value
 *
 * Computes the angle whose sine is the given value. Input must be
 * between -1 and 1 (inclusive). Returns the angle in radians between
 * -π/2 and π/2. Use radiansToDegrees to convert to degrees. Returns
 * NaN for values outside [-1, 1] or invalid inputs.
 *
 * @param x - Value between -1 and 1
 * @returns Angle in radians (-π/2 to π/2), or NaN if invalid
 * @example
 * ```typescript
 * // Common values
 * arcSine(0) // 0 (sin(0) = 0)
 * arcSine(1) // 1.5707... (π/2)
 * arcSine(-1) // -1.5707... (-π/2)
 * arcSine(0.5) // 0.5235... (π/6)
 *
 * // Edge cases
 * arcSine(Math.sqrt(2) / 2) // 0.7853... (π/4)
 * arcSine(2) // NaN (out of range)
 * arcSine(null) // NaN
 *
 * // Finding angle from height
 * const angleFromHeight = (height: number, hypotenuse: number) => {
 *   const sinValue = height / hypotenuse
 *   return arcSine(sinValue)
 * }
 * angleFromHeight(5, 10) // 0.5235... (30 degrees)
 * ```
 * @pure
 * @safe
 */
const arcSine = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Check domain: x must be in [-1, 1]
	if (x < -1 || x > 1) {
		return NaN
	}

	return Math.asin(x)
}

export default arcSine
