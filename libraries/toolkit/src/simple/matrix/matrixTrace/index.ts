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
 * matrixTrace([[5, -2], [7, 3]])
 * // 8 (5 + 3)
 *
 * // 3x3 matrix trace
 * matrixTrace([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
 * // 15 (1 + 5 + 9)
 *
 * matrixTrace([[2, 0, 0], [0, 3, 0], [0, 0, 4]])
 * // 9 (diagonal matrix: 2 + 3 + 4)
 *
 * // Identity matrix
 * matrixTrace([[1, 0], [0, 1]])
 * // 2 (sum of 1s on diagonal)
 *
 * matrixTrace([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
 * // 3 (3x3 identity)
 *
 * // Zero matrix
 * matrixTrace([[0, 0], [0, 0]])
 * // 0
 *
 * // Negative values
 * matrixTrace([[-1, 2], [3, -4]])
 * // -5 (-1 + -4)
 *
 * // 4x4 matrix
 * matrixTrace([
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 *   [9, 10, 11, 12],
 *   [13, 14, 15, 16]
 * ])
 * // 34 (1 + 6 + 11 + 16)
 *
 * // 1x1 matrix
 * matrixTrace([[5]])
 * // 5
 *
 * // Non-square matrix (invalid)
 * matrixTrace([[1, 2, 3], [4, 5, 6]])
 * // NaN (2x3 is not square)
 *
 * // Empty matrix
 * matrixTrace([])
 * // 0 (by convention)
 *
 * // Invalid inputs
 * matrixTrace([[1, 2], [3]])
 * // NaN (rows have different lengths)
 *
 * matrixTrace(null)
 * // NaN
 *
 * matrixTrace([[1, "2"], [3, 4]])
 * // NaN (non-numeric element)
 *
 * // Rotation matrix trace (2D)
 * const theta = Math.PI / 4
 * const rotation = [
 *   [Math.cos(theta), -Math.sin(theta)],
 *   [Math.sin(theta), Math.cos(theta)]
 * ]
 * matrixTrace(rotation)
 * // 1.414... (2 * cos(π/4) = √2)
 *
 * // Properties demonstration
 * // tr(A + B) = tr(A) + tr(B)
 * const A = [[1, 2], [3, 4]]
 * const B = [[5, 6], [7, 8]]
 * const sum = [[6, 8], [10, 12]]
 * matrixTrace(A) + matrixTrace(B) === matrixTrace(sum) // true
 *
 * // tr(cA) = c * tr(A) for scalar c
 * const scaled = [[2, 4], [6, 8]]
 * 2 * matrixTrace(A) === matrixTrace(scaled) // true
 *
 * // Characteristic polynomial coefficient
 * // For 2x2: det(A - λI) = λ² - tr(A)λ + det(A)
 * const trace = matrixTrace([[3, 1], [2, 4]]) // 7
 * // Eigenvalues sum to trace
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Domain - Only defined for square matrices
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
	for (let i = 0; i < n; i++) {
		if (!Array.isArray(matrix[i]) || matrix[i].length !== n) {
			return NaN
		}
	}

	// Calculate trace (sum of diagonal elements)
	let trace = 0
	for (let i = 0; i < n; i++) {
		const diagonalElement = matrix[i][i]

		// Check if diagonal element is a valid number
		if (typeof diagonalElement !== "number" || !isFinite(diagonalElement)) {
			return NaN
		}

		trace += diagonalElement
	}

	return trace
}

export default matrixTrace
