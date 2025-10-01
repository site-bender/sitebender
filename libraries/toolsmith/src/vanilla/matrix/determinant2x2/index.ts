import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const determinant2x2 = (
	matrix: number[][] | null | undefined,
): number => {
	if (isNullish(matrix) || !Array.isArray(matrix)) {
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
	if (isNullish(a) || typeof a !== "number") {
		return NaN
	}
	if (isNullish(b) || typeof b !== "number") {
		return NaN
	}
	if (isNullish(c) || typeof c !== "number") {
		return NaN
	}
	if (isNullish(d) || typeof d !== "number") {
		return NaN
	}

	// Calculate determinant: ad - bc
	return a * d - b * c
}

export default determinant2x2
