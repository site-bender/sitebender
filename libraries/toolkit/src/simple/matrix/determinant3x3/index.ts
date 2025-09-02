/**
 * Calculates the determinant of a 3x3 matrix
 *
 * Computes the determinant using cofactor expansion along the first row.
 * The determinant represents the scaling factor of the linear transformation
 * and the signed volume of the parallelepiped formed by the matrix columns.
 * A determinant of 0 indicates the matrix is singular (non-invertible).
 * Returns NaN for invalid inputs or non-3x3 matrices.
 *
 * @param matrix - 3x3 matrix as array of arrays [[a,b,c],[d,e,f],[g,h,i]]
 * @returns Determinant value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic 3x3 matrices
 * determinant3x3([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) // 0 (singular matrix)
 * determinant3x3([[2, 1, 3], [1, 0, 1], [0, 2, 4]]) // 2
 *
 * // Identity matrix
 * determinant3x3([[1, 0, 0], [0, 1, 0], [0, 0, 1]]) // 1
 *
 * // Diagonal matrix (product of diagonal elements)
 * determinant3x3([[2, 0, 0], [0, 3, 0], [0, 0, 4]]) // 24 (2×3×4)
 *
 * // Permutation matrix
 * determinant3x3([[0, 1, 0], [1, 0, 0], [0, 0, 1]]) // -1 (odd permutation)
 *
 * // Check if matrix is invertible
 * const isInvertible = (matrix: number[][]) =>
 *   determinant3x3(matrix) !== 0
 * isInvertible([[1, 2, 3], [0, 1, 4], [5, 6, 0]])  // true
 * isInvertible([[1, 2, 3], [4, 5, 6], [7, 8, 9]])  // false
 *
 * // Cramer's rule component (functional approach)
 * const solve3x3Component = (a: number[][], b: number[], col: number) => {
 *   const modified = a.map((row, i) =>
 *     row.map((val, j) => j === col ? b[i] : val))
 *   return determinant3x3(modified) / determinant3x3(a)
 * }
 *
 * // Edge cases
 * determinant3x3([[1, 2], [3, 4], [5, 6]]) // NaN (not 3x3)
 * determinant3x3(null) // NaN
 * ```
 * @pure
 * @safe
 */
import isNullish from "../../validation/isNullish/index.ts"

const determinant3x3 = (
	matrix: number[][] | null | undefined,
): number => {
	if (isNullish(matrix) || !Array.isArray(matrix)) {
		return NaN
	}

	// Check if it's a 3x3 matrix
	if (matrix.length !== 3) {
		return NaN
	}

	if (!matrix.every((row) => Array.isArray(row) && row.length === 3)) {
		return NaN
	}

	// Extract elements for readability
	const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2]
	const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2]
	const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2]

	// Check for non-numeric values
	if (
		isNullish(a) || typeof a !== "number" ||
		isNullish(b) || typeof b !== "number" ||
		isNullish(c) || typeof c !== "number" ||
		isNullish(d) || typeof d !== "number" ||
		isNullish(e) || typeof e !== "number" ||
		isNullish(f) || typeof f !== "number" ||
		isNullish(g) || typeof g !== "number" ||
		isNullish(h) || typeof h !== "number" ||
		isNullish(i) || typeof i !== "number"
	) {
		return NaN
	}

	// Calculate determinant using cofactor expansion along first row
	// det = a(ei - fh) - b(di - fg) + c(dh - eg)
	return a * (e * i - f * h) -
		b * (d * i - f * g) +
		c * (d * h - e * g)
}

export default determinant3x3
