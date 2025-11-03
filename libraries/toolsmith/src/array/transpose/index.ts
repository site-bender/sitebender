import isNullish from "../../validation/isNullish/index.ts"

//++ Transposes a 2D array
const transpose = <T>(
	matrix: ReadonlyArray<ReadonlyArray<T>> | null | undefined,
): Array<Array<T | undefined>> => {
	if (isNullish(matrix) || matrix.length === 0) {
		return []
	}

	// Find the maximum row length
	const maxLength = matrix.reduce(
		(max, row) => (Array.isArray(row) ? Math.max(max, row.length) : max),
		0,
	)

	// If all rows are empty, return empty array
	if (maxLength === 0) {
		return []
	}

	// Create the transposed matrix using Array.from for functional approach
	const result = Array.from(
		{ length: maxLength },
		(_, col) =>
			matrix.map((row) =>
				Array.isArray(row) && col < row.length ? row[col] : undefined
			),
	)

	return result
}

export default transpose
