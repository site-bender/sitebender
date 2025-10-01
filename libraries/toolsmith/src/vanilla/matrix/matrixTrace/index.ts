//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const matrixTrace = (
	matrix: Array<Array<number>> | null | undefined,
): number => {
	if (isNullish(matrix) || !Array.isArray(matrix)) {
		return NaN
	}

	// Empty matrix has trace 0
	if (matrix.length === 0) {
		return 0
	}

	const n = matrix.length

	// Check if matrix is square
	const isSquare = matrix.every((row) => Array.isArray(row) && row.length === n)

	if (!isSquare) {
		return NaN
	}

	// Calculate trace (sum of diagonal elements)
	const trace = matrix.reduce((sum, row, i) => {
		const diagonalElement = row[i]

		// Check if diagonal element is a valid number
		if (typeof diagonalElement !== "number" || !isFinite(diagonalElement)) {
			return NaN
		}

		return sum + diagonalElement
	}, 0)

	if (isNaN(trace)) {
		return NaN
	}

	return trace
}

export default matrixTrace
