import isNullish from "../../validation/isNullish/index.ts"

/**
 * Transposes a matrix (2D array)
 *
 * Converts rows to columns and columns to rows in a 2D array. The element
 * at position [i][j] becomes the element at position [j][i]. For non-square
 * matrices, the result has dimensions swapped. Missing elements in jagged
 * arrays are filled with undefined. Useful for matrix operations, data
 * transformation, or rotating tabular data.
 *
 * @param matrix - 2D array to transpose
 * @returns Transposed 2D array
 * @pure
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Square matrix
 * transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
 * // [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
 *
 * // Rectangular matrix  
 * transpose([[1, 2, 3, 4], [5, 6, 7, 8]])
 * // [[1, 5], [2, 6], [3, 7], [4, 8]]
 *
 * // Jagged array (filled with undefined)
 * transpose([[1, 2, 3], [4, 5], [6]])
 * // [[1, 4, 6], [2, 5, undefined], [3, undefined, undefined]]
 *
 * // Table data transformation
 * const data = [["Name", "Age"], ["Alice", 25], ["Bob", 30]]
 * transpose(data)
 * // [["Name", "Alice", "Bob"], ["Age", 25, 30]]
 *
 * // Edge cases
 * transpose([])           // []
 * transpose(null)         // []
 * transpose([[42]])       // [[42]]
 * ```
 */
const transpose = <T>(
	matrix: ReadonlyArray<ReadonlyArray<T>> | null | undefined,
): Array<Array<T | undefined>> => {
	if (isNullish(matrix) || !Array.isArray(matrix) || matrix.length === 0) {
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
	const result = Array.from({ length: maxLength }, (_, col) =>
		matrix.map((row) =>
			Array.isArray(row) && col < row.length ? row[col] : undefined,
		),
	)

	return result
}

export default transpose
