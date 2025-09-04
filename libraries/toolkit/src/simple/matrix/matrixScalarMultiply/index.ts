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
import isNullish from "../../validation/isNullish/index.ts"

const matrixScalarMultiply = (
	scalar: number | null | undefined,
) =>
(
	matrix: number[][] | null | undefined,
): number[][] | number => {
	if (isNullish(scalar) || typeof scalar !== "number") {
		return NaN
	}

	if (isNullish(matrix) || !Array.isArray(matrix)) {
		return NaN
	}

	// Handle empty matrix
	if (matrix.length === 0) {
		return []
	}

	// Validate and scale matrix using functional approach
	const result: Array<Array<number>> = []
	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i]
		if (!Array.isArray(row)) {
			return NaN
		}
		const newRow: Array<number> = []
		for (let j = 0; j < row.length; j++) {
			const val = row[j]
			if (isNullish(val) || typeof val !== "number") {
				return NaN
			}
			newRow.push(scalar * val)
		}
		result.push(newRow)
	}

	// Check if any NaN was returned
	if (
		result.some((row) =>
			(Array.isArray(row) && row.some((val) => Number.isNaN(val)))
		)
	) {
		return NaN
	}

	return result
}

export default matrixScalarMultiply
