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
 * identityMatrix(2)
 * // [
 * //   [1, 0],
 * //   [0, 1]
 * // ]
 *
 * // 3×3 identity matrix
 * identityMatrix(3)
 * // [
 * //   [1, 0, 0],
 * //   [0, 1, 0],
 * //   [0, 0, 1]
 * // ]
 *
 * // 4×4 identity matrix
 * identityMatrix(4)
 * // [
 * //   [1, 0, 0, 0],
 * //   [0, 1, 0, 0],
 * //   [0, 0, 1, 0],
 * //   [0, 0, 0, 1]
 * // ]
 *
 * // 1×1 identity matrix
 * identityMatrix(1)
 * // [[1]]
 *
 * // 5×5 identity matrix
 * identityMatrix(5)
 * // [
 * //   [1, 0, 0, 0, 0],
 * //   [0, 1, 0, 0, 0],
 * //   [0, 0, 1, 0, 0],
 * //   [0, 0, 0, 1, 0],
 * //   [0, 0, 0, 0, 1]
 * // ]
 *
 * // Invalid sizes return NaN
 * identityMatrix(0)
 * // NaN
 *
 * identityMatrix(-1)
 * // NaN
 *
 * identityMatrix(2.5)
 * // NaN (not an integer)
 *
 * identityMatrix(null)
 * // NaN
 *
 * identityMatrix("3")
 * // NaN
 *
 * // Practical examples
 *
 * // Initialize transformation matrix
 * const transform3D = identityMatrix(4)
 * // 4×4 identity for 3D transformations
 *
 * // Reset rotation matrix
 * function resetRotation(): number[][] {
 *   return identityMatrix(3)
 * }
 *
 * // Create diagonal matrix from identity
 * function diagonalMatrix(values: number[]): number[][] {
 *   const n = values.length
 *   const matrix = identityMatrix(n)
 *   if (matrix === NaN) return []
 *
 *   for (let i = 0; i < n; i++) {
 *     matrix[i][i] = values[i]
 *   }
 *   return matrix
 * }
 * diagonalMatrix([2, 3, 5])
 * // [
 * //   [2, 0, 0],
 * //   [0, 3, 0],
 * //   [0, 0, 5]
 * // ]
 *
 * // Check if matrix is identity
 * function isIdentity(matrix: number[][]): boolean {
 *   if (!matrix || matrix.length === 0) return false
 *   const n = matrix.length
 *
 *   for (let i = 0; i < n; i++) {
 *     if (!matrix[i] || matrix[i].length !== n) return false
 *     for (let j = 0; j < n; j++) {
 *       const expected = i === j ? 1 : 0
 *       if (matrix[i][j] !== expected) return false
 *     }
 *   }
 *   return true
 * }
 *
 * // Matrix power (A^0 = I)
 * function matrixPower(matrix: number[][], power: number): number[][] {
 *   if (power === 0) {
 *     return identityMatrix(matrix.length)
 *   }
 *   // ... compute matrix power
 * }
 *
 * // Initialize neural network weights
 * function initializeWeights(size: number): number[][] {
 *   const identity = identityMatrix(size)
 *   // Start with identity, then add small random values
 *   return identity.map(row =>
 *     row.map(val => val + (Math.random() - 0.5) * 0.1)
 *   )
 * }
 *
 * // Kronecker delta representation
 * function kroneckerDelta(i: number, j: number, size: number): number {
 *   const identity = identityMatrix(size)
 *   if (identity === NaN) return NaN
 *   return identity[i][j]
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Square - Always produces square matrices
 * @property Identity - Multiplicative identity for matrices
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

	// Create identity matrix
	const matrix: number[][] = []

	for (let i = 0; i < size; i++) {
		const row: number[] = []
		for (let j = 0; j < size; j++) {
			row.push(i === j ? 1 : 0)
		}
		matrix.push(row)
	}

	return matrix
}

export default identityMatrix
