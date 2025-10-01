//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const matrixAddition = (
	matrix1: number[][] | null | undefined,
) =>
(
	matrix2: number[][] | null | undefined,
): number[][] | number => {
	if (isNullish(matrix1) || !Array.isArray(matrix1)) {
		return NaN
	}

	if (isNullish(matrix2) || !Array.isArray(matrix2)) {
		return NaN
	}

	// Check dimensions match
	const rows1 = matrix1.length
	const rows2 = matrix2.length

	if (rows1 === 0 || rows2 === 0) {
		return []
	}

	if (rows1 !== rows2) {
		return NaN
	}

	// Check first row to get column count
	if (!Array.isArray(matrix1[0]) || !Array.isArray(matrix2[0])) {
		return NaN
	}

	const cols1 = matrix1[0].length
	const cols2 = matrix2[0].length

	if (cols1 !== cols2) {
		return NaN
	}

	// Validate all rows have consistent dimensions
	if (
		!matrix1.every((row) => Array.isArray(row) && row.length === cols1) ||
		!matrix2.every((row) => Array.isArray(row) && row.length === cols2)
	) {
		return NaN
	}

	// Validate all elements are numbers
	const hasNonNumber = (matrix: number[][]) =>
		matrix.some((row) =>
			row.some((val) => isNullish(val) || typeof val !== "number")
		)

	if (hasNonNumber(matrix1) || hasNonNumber(matrix2)) {
		return NaN
	}

	// Perform addition using map
	return matrix1.map((row1, i) => row1.map((val1, j) => val1 + matrix2[i][j]))
}

export default matrixAddition
