/**
 * Multiplies a matrix by a scalar value
 *
 * Performs scalar multiplication where each element of the matrix is
 * multiplied by the scalar value: B[i][j] = k × A[i][j]. This operation
 * scales all matrix values uniformly. Returns NaN for invalid inputs.
 *
 * @param scalar - Scalar value to multiply by
 * @param matrix - Matrix to scale (2D array)
 * @returns Scaled matrix, or NaN if invalid
 * @example
 * ```typescript
 * // Scale 2×2 matrix by 2
 * matrixScalarMultiply(2)([[1, 2], [3, 4]])
 * // [[2, 4], [6, 8]]
 *
 * // Scale by -1 (negate matrix)
 * matrixScalarMultiply(-1)([[1, -2], [-3, 4]])
 * // [[-1, 2], [3, -4]]
 *
 * // Scale 3×3 identity matrix
 * matrixScalarMultiply(3)([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
 * // [[3, 0, 0], [0, 3, 0], [0, 0, 3]]
 *
 * // Non-square matrix
 * matrixScalarMultiply(2)([[1, 2, 3], [4, 5, 6]])
 * // [[2, 4, 6], [8, 10, 12]]
 *
 * // Invalid inputs
 * matrixScalarMultiply(null)([[1, 2]])  // NaN
 * matrixScalarMultiply(2)(null)  // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const matrixScalarMultiply = (
	scalar: number | null | undefined,
) =>
(
	matrix: number[][] | null | undefined,
): number[][] | number => {
	if (scalar == null || typeof scalar !== "number") {
		return NaN
	}

	if (matrix == null || !Array.isArray(matrix)) {
		return NaN
	}

	// Handle empty matrix
	if (matrix.length === 0) {
		return []
	}

	// Validate and scale matrix using functional approach
	const result = matrix.map((row) => {
		if (!Array.isArray(row)) {
			return NaN
		}
		return row.map((val) => {
			if (val == null || typeof val !== "number") {
				return NaN
			}
			return scalar * val
		})
	})

	// Check if any NaN was returned
	if (
		result.some((row) =>
			row === NaN || (Array.isArray(row) && row.some((val) => isNaN(val)))
		)
	) {
		return NaN
	}

	return result
}

export default matrixScalarMultiply
