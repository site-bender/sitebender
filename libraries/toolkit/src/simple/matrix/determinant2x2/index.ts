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
 * determinant2x2([[1, 2], [3, 4]])
 * // -2 (1*4 - 2*3)
 *
 * determinant2x2([[2, 3], [1, 4]])
 * // 5 (2*4 - 3*1)
 *
 * determinant2x2([[5, 6], [7, 8]])
 * // -2 (5*8 - 6*7)
 *
 * // Identity matrix
 * determinant2x2([[1, 0], [0, 1]])
 * // 1
 *
 * // Singular matrix (non-invertible)
 * determinant2x2([[2, 4], [1, 2]])
 * // 0 (rows are proportional)
 *
 * determinant2x2([[1, 1], [1, 1]])
 * // 0 (identical rows)
 *
 * // Negative determinant (reverses orientation)
 * determinant2x2([[0, 1], [1, 0]])
 * // -1 (reflection matrix)
 *
 * // Scaling matrix
 * determinant2x2([[3, 0], [0, 3]])
 * // 9 (scales area by factor of 9)
 *
 * // Rotation matrix (90 degrees)
 * determinant2x2([[0, -1], [1, 0]])
 * // 1 (preserves area)
 *
 * // Fractional values
 * determinant2x2([[0.5, 0.25], [0.75, 0.5]])
 * // 0.0625 (0.5*0.5 - 0.25*0.75)
 *
 * // Invalid inputs return NaN
 * determinant2x2([[1, 2]])
 * // NaN (not 2x2)
 *
 * determinant2x2([[1, 2], [3]])
 * // NaN (inconsistent dimensions)
 *
 * determinant2x2([[1, 2, 3], [4, 5, 6]])
 * // NaN (3x2 matrix)
 *
 * determinant2x2(null)
 * // NaN
 *
 * determinant2x2([[1, "2"], [3, 4]])
 * // NaN
 *
 * // Practical examples
 *
 * // Area of parallelogram
 * const parallelogramArea = (v1: number[], v2: number[]) =>
 *   Math.abs(determinant2x2([v1, v2]))
 * parallelogramArea([3, 0], [1, 2])
 * // 6 (area units)
 *
 * // Check if vectors are linearly independent
 * const areIndependent = (v1: number[], v2: number[]) =>
 *   determinant2x2([v1, v2]) !== 0
 * areIndependent([1, 2], [2, 4])  // false (parallel)
 * areIndependent([1, 0], [0, 1])  // true (perpendicular)
 *
 * // Transformation scaling
 * const transform = [[2, 1], [1, 3]]
 * const scaleFactor = determinant2x2(transform)
 * // 5 (transforms unit square to area 5)
 *
 * // Check if matrix is invertible
 * const isInvertible = (matrix: number[][]) =>
 *   determinant2x2(matrix) !== 0
 * isInvertible([[1, 2], [3, 4]])  // true
 * isInvertible([[2, 6], [1, 3]])  // false
 *
 * // Cramer's rule for 2x2 system
 * const solve2x2 = (a: number[][], b: number[]) => {
 *   const det = determinant2x2(a)
 *   if (det === 0) return null
 *   const detX = determinant2x2([[b[0], a[0][1]], [b[1], a[1][1]]])
 *   const detY = determinant2x2([[a[0][0], b[0]], [a[1][0], b[1]]])
 *   return [detX / det, detY / det]
 * }
 * solve2x2([[2, 1], [1, 3]], [5, 11])
 * // [1, 3] (solution to 2x + y = 5, x + 3y = 11)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Antisymmetric - Swapping rows negates the determinant
 * @property Multiplicative - det(AB) = det(A) * det(B)
 */
const determinant2x2 = (
	matrix: number[][] | null | undefined,
): number => {
	if (matrix == null || !Array.isArray(matrix)) {
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
	if (a == null || typeof a !== "number") {
		return NaN
	}
	if (b == null || typeof b !== "number") {
		return NaN
	}
	if (c == null || typeof c !== "number") {
		return NaN
	}
	if (d == null || typeof d !== "number") {
		return NaN
	}

	// Calculate determinant: ad - bc
	return a * d - b * c
}

export default determinant2x2
