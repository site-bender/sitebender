/**
 * Adds two matrices element-wise
 *
 * Performs element-wise addition of two matrices with the same dimensions.
 * Each element in the result is the sum of corresponding elements from
 * the input matrices: C[i][j] = A[i][j] + B[i][j]. Returns NaN for
 * invalid inputs or mismatched dimensions.
 *
 * @param matrix1 - First matrix (2D array)
 * @param matrix2 - Second matrix (must have same dimensions)
 * @returns Sum of the matrices, or NaN if invalid
 * @example
 * ```typescript
 * // 2×2 matrices
 * matrixAddition([[1, 2], [3, 4]])([[5, 6], [7, 8]])
 * // [[6, 8], [10, 12]]
 *
 * // 3×3 matrices
 * matrixAddition([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
 *   ([[2, 3, 4], [5, 6, 7], [8, 9, 10]])
 * // [[3, 3, 4], [5, 7, 7], [8, 9, 11]]
 *
 * // With negative values (results in zero matrix)
 * matrixAddition([[1, -2], [-3, 4]])([[-1, 2], [3, -4]])
 * // [[0, 0], [0, 0]]
 *
 * // Row vectors
 * matrixAddition([[1, 2, 3]])([[4, 5, 6]]) // [[5, 7, 9]]
 *
 * // Partial application for repeated addition
 * const addIdentity = matrixAddition([[1, 0], [0, 1]])
 * addIdentity([[5, 3], [2, 7]]) // [[6, 3], [2, 8]]
 *
 * // Matrix accumulation (functional approach)
 * const sumMatrices = (matrices: number[][][]): number[][] =>
 *   matrices.reduce((acc, mat) => matrixAddition(acc)(mat) as number[][])
 *
 * // Edge cases
 * matrixAddition([[1, 2]])([[1, 2, 3]]) // NaN (mismatched dimensions)
 * matrixAddition(null)([[1, 2]]) // NaN
 * ```
 * @pure
 * @curried
 * @safe
 * @commutative
 */
import isNullish from "../../validation/isNullish/index.ts"

const matrixAddition = (
	matrix1: number[][] | null | undefined,
) =>
(
	matrix2: number[][] | null | undefined,
): number[][] | number => {
	if (isNullish(matrix1) || !Array.isArray(matrix1)) {
		return NaN
	}

	if (isNullish(matrix2) || !Array.isArray(matrix2)) {
		return NaN
	}

	// Check dimensions match
	const rows1 = matrix1.length
	const rows2 = matrix2.length

	if (rows1 === 0 || rows2 === 0) {
		return []
	}

	if (rows1 !== rows2) {
		return NaN
	}

	// Check first row to get column count
	if (!Array.isArray(matrix1[0]) || !Array.isArray(matrix2[0])) {
		return NaN
	}

	const cols1 = matrix1[0].length
	const cols2 = matrix2[0].length

	if (cols1 !== cols2) {
		return NaN
	}

	// Validate all rows have consistent dimensions
	if (
		!matrix1.every((row) => Array.isArray(row) && row.length === cols1) ||
		!matrix2.every((row) => Array.isArray(row) && row.length === cols2)
	) {
		return NaN
	}

	// Validate all elements are numbers
	const hasNonNumber = (matrix: number[][]) =>
		matrix.some((row) =>
			row.some((val) => isNullish(val) || typeof val !== "number")
		)

	if (hasNonNumber(matrix1) || hasNonNumber(matrix2)) {
		return NaN
	}

	// Perform addition using map
	return matrix1.map((row1, i) => row1.map((val1, j) => val1 + matrix2[i][j]))
}

export default matrixAddition
