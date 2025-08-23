/**
 * Calculates the inverse of a 2x2 matrix
 * 
 * Computes the inverse of a 2x2 matrix [[a, b], [c, d]] using the formula:
 * inverse = (1/determinant) * [[d, -b], [-c, a]]. The determinant is ad - bc.
 * Returns null if the matrix is singular (determinant = 0) or invalid.
 * The inverse matrix satisfies: A * A^(-1) = I (identity matrix).
 * 
 * @param matrix - 2x2 matrix as array of arrays [[a, b], [c, d]]
 * @returns Inverse matrix or null if singular/invalid
 * @example
 * ```typescript
 * // Simple 2x2 matrix
 * matrixInverse2x2([[2, 1], [1, 2]])
 * // [[0.666..., -0.333...], [-0.333..., 0.666...]]
 * 
 * // Identity matrix (inverse is itself)
 * matrixInverse2x2([[1, 0], [0, 1]])
 * // [[1, 0], [0, 1]]
 * 
 * // Rotation matrix (90 degrees)
 * matrixInverse2x2([[0, -1], [1, 0]])
 * // [[0, 1], [-1, 0]] (rotation by -90 degrees)
 * 
 * // Scaling matrix
 * matrixInverse2x2([[2, 0], [0, 3]])
 * // [[0.5, 0], [0, 0.333...]]
 * 
 * // General matrix
 * matrixInverse2x2([[4, 7], [2, 6]])
 * // [[0.6, -0.7], [-0.2, 0.4]]
 * 
 * // Matrix with determinant 1
 * matrixInverse2x2([[3, 2], [1, 1]])
 * // [[1, -2], [-1, 3]]
 * 
 * // Singular matrix (determinant = 0)
 * matrixInverse2x2([[1, 2], [2, 4]])
 * // null (rows are linearly dependent)
 * 
 * // Another singular matrix
 * matrixInverse2x2([[0, 0], [0, 0]])
 * // null (zero matrix)
 * 
 * // Invalid inputs
 * matrixInverse2x2(null)
 * // null
 * 
 * matrixInverse2x2([[1, 2]])
 * // null (not 2x2)
 * 
 * matrixInverse2x2([[1, "2"], [3, 4]])
 * // null (non-numeric values)
 * 
 * // Practical examples
 * 
 * // Transform and untransform coordinates
 * const transform = [[2, 1], [1, 3]]
 * const inverse = matrixInverse2x2(transform)
 * // [[0.6, -0.2], [-0.2, 0.4]]
 * 
 * // Solve linear system: 2x + y = 5, x + 3y = 7
 * // Using x = A^(-1) * b
 * const A = [[2, 1], [1, 3]]
 * const Ainv = matrixInverse2x2(A)
 * // Solution: x = Ainv * [5, 7]
 * 
 * // Shear transformation inverse
 * const shear = [[1, 2], [0, 1]]
 * matrixInverse2x2(shear)
 * // [[1, -2], [0, 1]] (opposite shear)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for singular or invalid matrices
 */
const matrixInverse2x2 = (
	matrix: Array<Array<number>> | null | undefined
): Array<Array<number>> | null => {
	if (matrix == null || !Array.isArray(matrix)) {
		return null
	}
	
	// Check if it's a 2x2 matrix
	if (matrix.length !== 2) {
		return null
	}
	
	if (!Array.isArray(matrix[0]) || matrix[0].length !== 2) {
		return null
	}
	
	if (!Array.isArray(matrix[1]) || matrix[1].length !== 2) {
		return null
	}
	
	// Extract matrix elements
	const a = matrix[0][0]
	const b = matrix[0][1]
	const c = matrix[1][0]
	const d = matrix[1][1]
	
	// Validate all elements are numbers
	if (typeof a !== 'number' || typeof b !== 'number' ||
		typeof c !== 'number' || typeof d !== 'number') {
		return null
	}
	
	// Calculate determinant
	const determinant = a * d - b * c
	
	// Check if matrix is singular (determinant = 0)
	if (determinant === 0) {
		return null
	}
	
	// Calculate inverse using formula
	const invDet = 1 / determinant
	
	return [
		[d * invDet, -b * invDet],
		[-c * invDet, a * invDet]
	]
}

export default matrixInverse2x2