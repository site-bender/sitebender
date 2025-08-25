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
 * matrixTranspose([
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ])
 * // [
 * //   [1, 4],
 * //   [2, 5],
 * //   [3, 6]
 * // ]
 *
 * // Square matrix
 * matrixTranspose([
 *   [1, 2],
 *   [3, 4]
 * ])
 * // [
 * //   [1, 3],
 * //   [2, 4]
 * // ]
 *
 * // 3×3 matrix
 * matrixTranspose([
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ])
 * // [
 * //   [1, 4, 7],
 * //   [2, 5, 8],
 * //   [3, 6, 9]
 * // ]
 *
 * // Row vector to column vector
 * matrixTranspose([[1, 2, 3, 4]])
 * // [
 * //   [1],
 * //   [2],
 * //   [3],
 * //   [4]
 * // ]
 *
 * // Column vector to row vector
 * matrixTranspose([
 *   [1],
 *   [2],
 *   [3]
 * ])
 * // [[1, 2, 3]]
 *
 * // Single element
 * matrixTranspose([[42]])
 * // [[42]]
 *
 * // Identity matrix (unchanged)
 * matrixTranspose([
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1]
 * ])
 * // [
 * //   [1, 0, 0],
 * //   [0, 1, 0],
 * //   [0, 0, 1]
 * // ]
 *
 * // Empty matrix
 * matrixTranspose([])
 * // []
 *
 * // Non-rectangular matrix returns NaN
 * matrixTranspose([
 *   [1, 2, 3],
 *   [4, 5]  // Different length
 * ])
 * // NaN
 *
 * // Invalid inputs
 * matrixTranspose(null)
 * // NaN
 *
 * matrixTranspose([1, 2, 3])  // Not 2D
 * // NaN
 *
 * matrixTranspose([[1, "2", 3]])
 * // NaN
 *
 * // Practical examples
 *
 * // Rotation matrix transpose (inverse for orthogonal)
 * const rotation = [
 *   [0.866, -0.5],
 *   [0.5, 0.866]
 * ]
 * const inverse = matrixTranspose(rotation)
 * // Transpose equals inverse for rotation matrices
 *
 * // Data table transformation
 * const data = [
 *   [100, 200, 300],  // Sales
 *   [10, 20, 30],     // Units
 *   [5, 10, 15]       // Returns
 * ]
 * const transposed = matrixTranspose(data)
 * // [
 * //   [100, 10, 5],   // Day 1
 * //   [200, 20, 10],  // Day 2
 * //   [300, 30, 15]   // Day 3
 * // ]
 *
 * // Image processing (flip dimensions)
 * const pixelRows = [
 *   [255, 128, 0],
 *   [128, 255, 128],
 *   [0, 128, 255]
 * ]
 * const pixelCols = matrixTranspose(pixelRows)
 *
 * // Linear algebra operations
 * function dotProductMatrix(a: number[][], b: number[][]): number[][] {
 *   // A × B^T is often needed
 *   const bTransposed = matrixTranspose(b)
 *   // ... matrix multiplication
 *   return result
 * }
 *
 * // Check if symmetric (A = A^T)
 * function isSymmetric(matrix: number[][]): boolean {
 *   const transposed = matrixTranspose(matrix)
 *   if (transposed === NaN) return false
 *   // Compare with original
 *   for (let i = 0; i < matrix.length; i++) {
 *     for (let j = 0; j < matrix[i].length; j++) {
 *       if (matrix[i][j] !== transposed[i][j]) return false
 *     }
 *   }
 *   return true
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Rectangular - Requires all rows to have same length
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
	for (let i = 0; i < rows; i++) {
		const row = matrix[i]
		if (!Array.isArray(row) || row.length !== cols) {
			return NaN
		}

		for (let j = 0; j < cols; j++) {
			if (row[j] == null || typeof row[j] !== "number") {
				return NaN
			}
		}
	}

	// Create transposed matrix
	const transposed: number[][] = []

	for (let j = 0; j < cols; j++) {
		const newRow: number[] = []
		for (let i = 0; i < rows; i++) {
			newRow.push(matrix[i][j])
		}
		transposed.push(newRow)
	}

	return transposed
}

export default matrixTranspose
