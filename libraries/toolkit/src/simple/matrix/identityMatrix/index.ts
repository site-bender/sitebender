/**
 * Generates an identity matrix of specified size
 *
 * Creates a square matrix with 1s on the main diagonal and 0s elsewhere.
 * The identity matrix is the multiplicative identity for matrix multiplication,
 * meaning A × I = I × A = A for any compatible matrix A. Returns NaN for
 * invalid inputs or non-positive sizes.
 *
 * @param size - Dimension of the square matrix (must be positive integer)
 * @returns Identity matrix of given size, or NaN if invalid
 * @example
 * ```typescript
 * // 2×2 identity matrix
 * identityMatrix(2) // [[1, 0], [0, 1]]
 *
 * // 3×3 identity matrix
 * identityMatrix(3) // [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
 *
 * // 1×1 identity matrix
 * identityMatrix(1) // [[1]]
 *
 * // Create diagonal matrix from identity (functional approach)
 * const diagonalMatrix = (values: number[]): number[][] =>
 *   values.map((val, i) => 
 *     values.map((_, j) => i === j ? val : 0))
 * diagonalMatrix([2, 3, 5]) // [[2, 0, 0], [0, 3, 0], [0, 0, 5]]
 *
 * // Check if matrix is identity (functional approach)
 * const isIdentity = (matrix: number[][]): boolean =>
 *   matrix.every((row, i) => 
 *     row.length === matrix.length &&
 *     row.every((val, j) => val === (i === j ? 1 : 0)))
 *
 * // Edge cases
 * identityMatrix(0) // NaN
 * identityMatrix(2.5) // NaN (not an integer)
 * identityMatrix(null) // NaN
 * ```
 * @pure
 * @safe
 */
const identityMatrix = (
	size: number | null | undefined,
): number[][] | number => {
	if (size == null || typeof size !== "number") {
		return NaN
	}

	// Check for non-integer
	if (!Number.isInteger(size)) {
		return NaN
	}

	// Check for non-positive size
	if (size <= 0) {
		return NaN
	}

	// Create identity matrix using functional approach
	return Array.from({ length: size }, (_, i) =>
		Array.from({ length: size }, (_, j) => i === j ? 1 : 0)
	)
}

export default identityMatrix
