import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the magnitude (length) of a vector
 *
 * Computes the Euclidean norm (L2 norm) of a vector, which represents
 * its length in n-dimensional space. This is the square root of the sum
 * of squared components. Returns NaN for invalid inputs or empty arrays.
 *
 * @param vector - Array of vector components
 * @returns Magnitude of the vector (always non-negative), or NaN if invalid
 * @pure
 * @safe
 * @immutable
 * @example
 * ```typescript
 * // 2D vectors
 * magnitude([3, 4])  // 5 (Pythagorean theorem)
 * magnitude([1, 1])  // 1.414... (√2)
 *
 * // 3D vectors
 * magnitude([2, 3, 6])  // 7
 * magnitude([1, 1, 1])  // 1.732... (√3)
 *
 * // Zero vector returns 0
 * magnitude([0, 0, 0])  // 0
 *
 * // Single dimension (absolute value)
 * magnitude([5])  // 5
 * magnitude([-5])  // 5 (always positive)
 *
 * // Invalid inputs return NaN
 * magnitude([])  // NaN (empty array)
 * magnitude(null)  // NaN
 * magnitude([1, "2", 3])  // NaN
 * ```
 */
const magnitude = (
	vector: number[] | null | undefined,
): number => {
	if (isNullish(vector) || !Array.isArray(vector)) {
		return NaN
	}

	if (vector.length === 0) {
		return NaN
	}

	const sumOfSquares = vector.reduce((sum, component) => {
		if (isNullish(component) || typeof component !== "number") {
			return NaN
		}
		return sum + component * component
	}, 0)

	return Math.sqrt(sumOfSquares)
}

export default magnitude
