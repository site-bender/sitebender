import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the inverse cosine (arccosine) of a value
 *
 * Computes the angle whose cosine is the given value. Input must be
 * between -1 and 1 (inclusive). Returns the angle in radians between
 * 0 and π. Use radiansToDegrees to convert to degrees. Returns NaN
 * for values outside [-1, 1] or invalid inputs.
 *
 * @param x - Value between -1 and 1
 * @returns Angle in radians (0 to π), or NaN if invalid
 * @example
 * ```typescript
 * // Common values
 * arcCosine(1) // 0 (cos(0) = 1)
 * arcCosine(0) // 1.5707... (π/2)
 * arcCosine(-1) // 3.1415... (π)
 * arcCosine(0.5) // 1.047... (π/3)
 *
 * // Edge cases
 * arcCosine(Math.sqrt(2) / 2) // 0.7853... (π/4)
 * arcCosine(2) // NaN (out of range)
 * arcCosine(null) // NaN
 *
 * // Angle between vectors
 * const angleBetween = (v1: number[], v2: number[]) => {
 *   const dot = v1.reduce((sum, val, i) => sum + val * v2[i], 0)
 *   const mag1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0))
 *   const mag2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0))
 *   return arcCosine(dot / (mag1 * mag2))
 * }
 * angleBetween([1, 0], [0, 1]) // 1.5707... (90°)
 * ```
 * @pure
 * @safe
 */
const arcCosine = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Check domain: x must be in [-1, 1]
	if (x < -1 || x > 1) {
		return NaN
	}

	return Math.acos(x)
}

export default arcCosine
