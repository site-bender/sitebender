import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the hypotenuse for multiple dimensions
 *
 * Computes the Euclidean norm (length) of a vector, equivalent to the
 * distance from the origin. For 2D, this is the Pythagorean theorem:
 * √(x² + y²). Generalizes to n dimensions as √(Σxᵢ²). Uses a numerically
 * stable algorithm to avoid overflow. Returns NaN for invalid inputs.
 *
 * @param values - Array of coordinate values
 * @returns Length of the vector (hypotenuse), or NaN if invalid
 * @example
 * ```typescript
 * // Classic Pythagorean theorem (3-4-5 triangle)
 * hypotenuse([3, 4]) // 5
 * hypotenuse([5, 12]) // 13
 *
 * // 3D and 4D space
 * hypotenuse([2, 3, 6]) // 7
 * hypotenuse([1, 2, 2, 2]) // 3.605...
 *
 * // Edge cases
 * hypotenuse([]) // 0
 * hypotenuse([-3, 4]) // 5 (signs don't matter)
 * hypotenuse([1e200, 1e200]) // 1.414...e200 (avoids overflow)
 *
 * // Invalid inputs
 * hypotenuse(null) // NaN
 *
 * // Practical use: normalize vector
 * const normalizeVector = (v: number[]): number[] => {
 *   const length = hypotenuse(v)
 *   return length === 0 ? v : v.map(x => x / length)
 * }
 * normalizeVector([3, 4]) // [0.6, 0.8]
 * ```
 * @pure
 * @safe
 */
const hypotenuse = (
	values: number[] | null | undefined,
): number => {
	if (isNullish(values) || !Array.isArray(values)) {
		return NaN
	}

	// Empty array returns 0 by convention
	if (values.length === 0) {
		return 0
	}

	// Check for non-numeric values
	for (const value of values) {
		if (isNullish(value) || typeof value !== "number") {
			return NaN
		}
	}

	// Use Math.hypot if available (it's numerically stable)
	if (typeof Math.hypot === "function") {
		return Math.hypot(...values)
	}

	// Manual implementation with numerical stability
	// Find the maximum absolute value to scale
	let max = 0
	for (const value of values) {
		const abs = Math.abs(value)
		if (abs > max) {
			max = abs
		}
	}

	// If all values are zero
	if (max === 0) {
		return 0
	}

	// Scale values to avoid overflow/underflow
	let sumOfSquares = 0
	for (const value of values) {
		const scaled = value / max
		sumOfSquares += scaled * scaled
	}

	return max * Math.sqrt(sumOfSquares)
}

export default hypotenuse
