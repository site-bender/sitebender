import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the determinant of a 2x2 matrix
 *
 * Computes the determinant using the formula: ad - bc for matrix [[a, b], [c, d]].
 * The determinant represents the scaling factor of the linear transformation
 * described by the matrix. A determinant of 0 indicates the matrix is singular
 * (non-invertible). Returns NaN for invalid inputs or non-2x2 matrices.
 *
 * @param matrix - 2x2 matrix as array of arrays [[a, b], [c, d]]
 * @returns Determinant value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic 2x2 matrices
 * determinant2x2([[1, 2], [3, 4]]) // -2 (1*4 - 2*3)
 * determinant2x2([[2, 3], [1, 4]]) // 5 (2*4 - 3*1)
 *
 * // Identity matrix
 * determinant2x2([[1, 0], [0, 1]]) // 1
 *
 * // Singular matrix (non-invertible)
 * determinant2x2([[2, 4], [1, 2]]) // 0 (rows are proportional)
 *
 * // Rotation matrix (90 degrees)
 * determinant2x2([[0, -1], [1, 0]]) // 1 (preserves area)
 *
 * // Check if matrix is invertible
 * const isInvertible = (matrix: number[][]) =>
 *   determinant2x2(matrix) !== 0
 * isInvertible([[1, 2], [3, 4]])  // true
 * isInvertible([[2, 6], [1, 3]])  // false
 *
 * // Edge cases
 * determinant2x2([[1, 2]]) // NaN (not 2x2)
 * determinant2x2(null) // NaN
 * ```
 * @pure
 * @safe
 */
const determinant2x2 = (
	matrix: number[][] | null | undefined,
): number => {
	if (isNullish(matrix) || !Array.isArray(matrix)) {
		return NaN
	}

	// Check if it's a 2x2 matrix
	if (matrix.length !== 2) {
		return NaN
	}

	if (!Array.isArray(matrix[0]) || !Array.isArray(matrix[1])) {
		return NaN
	}

	if (matrix[0].length !== 2 || matrix[1].length !== 2) {
		return NaN
	}

	// Extract elements
	const a = matrix[0][0]
	const b = matrix[0][1]
	const c = matrix[1][0]
	const d = matrix[1][1]

	// Check for non-numeric values
	if (isNullish(a) || typeof a !== "number") {
		return NaN
	}
	if (isNullish(b) || typeof b !== "number") {
		return NaN
	}
	if (isNullish(c) || typeof c !== "number") {
		return NaN
	}
	if (isNullish(d) || typeof d !== "number") {
		return NaN
	}

	// Calculate determinant: ad - bc
	return a * d - b * c
}

export default determinant2x2
