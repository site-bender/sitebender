/**
 * Calculates the inverse of a 3x3 matrix
 *
 * Computes the inverse of a 3x3 matrix using the adjugate (adjoint) method.
 * The inverse is calculated as: A^(-1) = (1/det(A)) * adj(A), where adj(A)
 * is the adjugate matrix (transpose of the cofactor matrix). Returns null
 * if the matrix is singular (determinant = 0) or invalid. The inverse
 * satisfies: A * A^(-1) = I (identity matrix).
 *
 * @param matrix - 3x3 matrix as array of arrays [[a,b,c],[d,e,f],[g,h,i]]
 * @returns Inverse matrix or null if singular/invalid
 * @example
 * ```typescript
 * // Simple 3x3 matrix
 * matrixInverse3x3([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
 * // [[1, 0, 0], [0, 1, 0], [0, 0, 1]] (identity)
 *
 * // Diagonal matrix
 * matrixInverse3x3([[2, 0, 0], [0, 3, 0], [0, 0, 4]])
 * // [[0.5, 0, 0], [0, 0.333..., 0], [0, 0, 0.25]]
 *
 * // Rotation matrix (around z-axis by 90 degrees)
 * matrixInverse3x3([[0, -1, 0], [1, 0, 0], [0, 0, 1]])
 * // [[0, 1, 0], [-1, 0, 0], [0, 0, 1]] (rotation by -90)
 *
 * // General matrix
 * matrixInverse3x3([[1, 2, 3], [0, 1, 4], [5, 6, 0]])
 * // [[-24, 18, 5], [20, -15, -4], [-5, 4, 1]] / determinant
 *
 * // Upper triangular matrix
 * matrixInverse3x3([[1, 2, 3], [0, 1, 2], [0, 0, 1]])
 * // [[1, -2, 1], [0, 1, -2], [0, 0, 1]]
 *
 * // Matrix with determinant 1
 * matrixInverse3x3([[2, -1, 0], [-1, 2, -1], [0, -1, 2]])
 * // [[0.75, 0.5, 0.25], [0.5, 1, 0.5], [0.25, 0.5, 0.75]]
 *
 * // Singular matrix (determinant = 0)
 * matrixInverse3x3([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
 * // null (rows are linearly dependent)
 *
 * // Another singular matrix
 * matrixInverse3x3([[1, 0, 0], [0, 0, 0], [0, 0, 1]])
 * // null (middle row is zero)
 *
 * // Invalid inputs
 * matrixInverse3x3(null)
 * // null
 *
 * matrixInverse3x3([[1, 2], [3, 4]])
 * // null (not 3x3)
 *
 * matrixInverse3x3([[1, 2, "3"], [4, 5, 6], [7, 8, 9]])
 * // null (non-numeric values)
 *
 * // Practical examples
 *
 * // 3D transformation matrix inverse
 * const scale = [[2, 0, 0], [0, 2, 0], [0, 0, 2]]
 * matrixInverse3x3(scale)
 * // [[0.5, 0, 0], [0, 0.5, 0], [0, 0, 0.5]]
 *
 * // Solve 3x3 linear system
 * // 2x + y - z = 1
 * // x + 3y + 2z = 4
 * // x - y + 4z = 3
 * const A = [[2, 1, -1], [1, 3, 2], [1, -1, 4]]
 * const Ainv = matrixInverse3x3(A)
 * // Use Ainv to solve: x = Ainv * [1, 4, 3]
 *
 * // Orthogonal matrix (preserves lengths)
 * const orth = [[0.6, -0.8, 0], [0.8, 0.6, 0], [0, 0, 1]]
 * matrixInverse3x3(orth)
 * // [[0.6, 0.8, 0], [-0.8, 0.6, 0], [0, 0, 1]] (transpose)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns null for singular or invalid matrices
 */
const matrixInverse3x3 = (
	matrix: Array<Array<number>> | null | undefined,
): Array<Array<number>> | null => {
	if (matrix == null || !Array.isArray(matrix)) {
		return null
	}

	// Check if it's a 3x3 matrix
	if (matrix.length !== 3) {
		return null
	}

	for (let i = 0; i < 3; i++) {
		if (!Array.isArray(matrix[i]) || matrix[i].length !== 3) {
			return null
		}
		// Validate all elements are numbers
		for (let j = 0; j < 3; j++) {
			if (typeof matrix[i][j] !== "number") {
				return null
			}
		}
	}

	// Extract matrix elements for readability
	const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2]
	const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2]
	const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2]

	// Calculate determinant using rule of Sarrus
	const determinant = a * (e * i - f * h) -
		b * (d * i - f * g) +
		c * (d * h - e * g)

	// Check if matrix is singular
	if (determinant === 0) {
		return null
	}

	const invDet = 1 / determinant

	// Calculate cofactor matrix elements
	const c11 = e * i - f * h
	const c12 = -(d * i - f * g)
	const c13 = d * h - e * g

	const c21 = -(b * i - c * h)
	const c22 = a * i - c * g
	const c23 = -(a * h - b * g)

	const c31 = b * f - c * e
	const c32 = -(a * f - c * d)
	const c33 = a * e - b * d

	// Return adjugate matrix divided by determinant
	// (adjugate is transpose of cofactor matrix)
	return [
		[c11 * invDet, c21 * invDet, c31 * invDet],
		[c12 * invDet, c22 * invDet, c32 * invDet],
		[c13 * invDet, c23 * invDet, c33 * invDet],
	]
}

export default matrixInverse3x3
