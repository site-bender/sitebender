/**
 * Transposes a matrix (2D array)
 *
 * Swaps rows and columns of a matrix, converting an m×n matrix to
 * an n×m matrix where element [i][j] becomes element [j][i].
 * Returns NaN for invalid inputs or non-rectangular matrices.
 * Returns empty array for empty input.
 *
 * @param matrix - 2D array representing the matrix
 * @returns Transposed matrix, or NaN if invalid
 * @example
 * ```typescript
 * // 2×3 matrix to 3×2
 * matrixTranspose([[1, 2, 3], [4, 5, 6]])
 * // [[1, 4], [2, 5], [3, 6]]
 *
 * // Square matrix
 * matrixTranspose([[1, 2], [3, 4]])
 * // [[1, 3], [2, 4]]
 *
 * // Row vector to column vector
 * matrixTranspose([[1, 2, 3, 4]])
 * // [[1], [2], [3], [4]]
 *
 * // Column vector to row vector
 * matrixTranspose([[1], [2], [3]])
 * // [[1, 2, 3]]
 *
 * // Non-rectangular matrix
 * matrixTranspose([[1, 2, 3], [4, 5]])  // NaN
 *
 * // Invalid inputs
 * matrixTranspose(null)  // NaN
 * matrixTranspose([1, 2, 3])  // NaN (not 2D)
 * ```
 * @pure
 * @safe
 */
const matrixTranspose = (
	matrix: number[][] | null | undefined,
): number[][] | number => {
	if (matrix == null || !Array.isArray(matrix)) {
		return NaN
	}

	// Handle empty matrix
	if (matrix.length === 0) {
		return []
	}

	// Check if it's a 2D array and get dimensions
	const rows = matrix.length
	let cols = 0

	// Validate first row
	const firstRow = matrix[0]
	if (!Array.isArray(firstRow)) {
		return NaN
	}
	cols = firstRow.length

	// Handle empty rows
	if (cols === 0) {
		return []
	}

	// Validate all rows have same length and contain numbers
	const isValid = matrix.every(row =>
		Array.isArray(row) &&
		row.length === cols &&
		row.every(val => val != null && typeof val === "number")
	)
	
	if (!isValid) {
		return NaN
	}

	// Create transposed matrix using functional approach
	const transposed = Array.from({ length: cols }, (_, j) =>
		Array.from({ length: rows }, (_, i) => matrix[i][j])
	)

	return transposed
}

export default matrixTranspose
