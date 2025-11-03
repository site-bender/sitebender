import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
