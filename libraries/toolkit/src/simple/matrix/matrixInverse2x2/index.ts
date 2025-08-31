import isNullish from "../../validation/isNullish/index.ts"

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
 * // Basic usage
 * matrixInverse2x2([[2, 1], [1, 2]])
 * // [[0.666..., -0.333...], [-0.333..., 0.666...]]
 *
 * // Identity matrix (inverse is itself)
 * matrixInverse2x2([[1, 0], [0, 1]])
 * // [[1, 0], [0, 1]]
 *
 * // Rotation matrix inverse
 * matrixInverse2x2([[0, -1], [1, 0]])
 * // [[0, 1], [-1, 0]]
 *
 * // Singular matrix (determinant = 0)
 * matrixInverse2x2([[1, 2], [2, 4]])
 * // null
 *
 * // Invalid input
 * matrixInverse2x2([[1, 2]])  // null (not 2x2)
 * ```
 * @pure
 * @safe
 */
const matrixInverse2x2 = (
	matrix: Array<Array<number>> | null | undefined,
): Array<Array<number>> | null => {
	if (isNullish(matrix) || !Array.isArray(matrix)) {
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
	if (
		typeof a !== "number" || typeof b !== "number" ||
		typeof c !== "number" || typeof d !== "number"
	) {
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
		[-c * invDet, a * invDet],
	]
}

export default matrixInverse2x2
