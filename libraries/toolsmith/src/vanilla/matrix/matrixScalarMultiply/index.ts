//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const matrixScalarMultiply = (
	scalar: number | null | undefined,
) =>
(
	matrix: number[][] | null | undefined,
): number[][] | number => {
	if (isNullish(scalar) || typeof scalar !== "number") {
		return NaN
	}

	if (isNullish(matrix) || !Array.isArray(matrix)) {
		return NaN
	}

	// Handle empty matrix
	if (matrix.length === 0) {
		return []
	}

	// Validate and scale matrix using functional approach
	const result: Array<Array<number>> = []
	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i]
		if (!Array.isArray(row)) {
			return NaN
		}
		const newRow: Array<number> = []
		for (let j = 0; j < row.length; j++) {
			const val = row[j]
			if (isNullish(val) || typeof val !== "number") {
				return NaN
			}
			newRow.push(scalar * val)
		}
		result.push(newRow)
	}

	// Check if any NaN was returned
	if (
		result.some((
			row,
		) => (Array.isArray(row) && row.some((val) => Number.isNaN(val))))
	) {
		return NaN
	}

	return result
}

export default matrixScalarMultiply
