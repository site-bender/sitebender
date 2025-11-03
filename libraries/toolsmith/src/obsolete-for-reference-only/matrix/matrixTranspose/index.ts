//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const matrixTranspose = (
	matrix: number[][] | null | undefined,
): number[][] | number => {
	if (isNullish(matrix) || !Array.isArray(matrix)) {
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
	const isValid = matrix.every((row) =>
		Array.isArray(row) &&
		row.length === cols &&
		row.every((val) => !isNullish(val) && typeof val === "number")
	)

	if (!isValid) {
		return NaN
	}

	// Create transposed matrix using functional approach
	const transposed = Array.from(
		{ length: cols },
		(_, j) => Array.from({ length: rows }, (_, i) => matrix[i][j]),
	)

	return transposed
}

export default matrixTranspose
