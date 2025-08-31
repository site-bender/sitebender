/**
 * Calculates the trace of a square matrix
 *
 * Computes the sum of the elements on the main diagonal of a square matrix.
 * The trace is defined only for square matrices (n×n). For a matrix A,
 * tr(A) = Σ(a_ii) for i from 0 to n-1. Returns NaN for non-square matrices
 * or invalid inputs.
 *
 * @param matrix - Square matrix as 2D array
 * @returns Sum of diagonal elements, or NaN if invalid
 * @example
 * ```typescript
 * // 2x2 matrix trace
 * matrixTrace([[1, 2], [3, 4]])
 * // 5 (1 + 4)
 *
 * // 3x3 matrix trace
 * matrixTrace([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
 * // 15 (1 + 5 + 9)
 *
 * // Identity matrix
 * matrixTrace([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
 * // 3
 *
 * // Non-square matrix (invalid)
 * matrixTrace([[1, 2, 3], [4, 5, 6]])
 * // NaN
 *
 * // Empty matrix
 * matrixTrace([])  // 0
 * matrixTrace(null)  // NaN
 * ```
 * @pure
 * @safe
 */
const matrixTrace = (
	matrix: Array<Array<number>> | null | undefined,
): number => {
	if (matrix == null || !Array.isArray(matrix)) {
		return NaN
	}

	// Empty matrix has trace 0
	if (matrix.length === 0) {
		return 0
	}

	const n = matrix.length

	// Check if matrix is square
	const isSquare = matrix.every((row) => Array.isArray(row) && row.length === n)

	if (!isSquare) {
		return NaN
	}

	// Calculate trace (sum of diagonal elements)
	const trace = matrix.reduce((sum, row, i) => {
		const diagonalElement = row[i]

		// Check if diagonal element is a valid number
		if (typeof diagonalElement !== "number" || !isFinite(diagonalElement)) {
			return NaN
		}

		return sum + diagonalElement
	}, 0)

	if (isNaN(trace)) {
		return NaN
	}

	return trace
}

export default matrixTrace
