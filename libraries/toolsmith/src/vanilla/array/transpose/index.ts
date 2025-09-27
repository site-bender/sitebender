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

//?? [EXAMPLE] `transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) // [[1, 4, 7], [2, 5, 8], [3, 6, 9]]`
//?? [EXAMPLE] `transpose([[1, 2, 3, 4], [5, 6, 7, 8]]) // [[1, 5], [2, 6], [3, 7], [4, 8]]`
//?? [EXAMPLE] `transpose([[1, 2, 3], [4, 5], [6]]) // [[1, 4, 6], [2, 5, undefined], [3, undefined, undefined]]`
//?? [EXAMPLE] `transpose([["Name", "Age"], ["Alice", 25], ["Bob", 30]]) // [["Name", "Alice", "Bob"], ["Age", 25, 30]]`
//?? [EXAMPLE] `transpose([]) // []`
//?? [EXAMPLE] `transpose([[42]]) // [[42]]`
