//++ [PRIVATE] Transposes a 2D array
//++ Converts rows to columns and columns to rows
export default function _transposeArray<T>(
	matrix: ReadonlyArray<ReadonlyArray<T>>,
): Array<Array<T | undefined>> {
	//++ [EXCEPTION] Using array.length for bounds check
	if (matrix.length === 0) {
		return []
	}

	//++ Find the maximum row length using reduce
	//++ [EXCEPTION] Using native .reduce() for performance
	const maxLength = matrix.reduce(
		function findMaxLength(
			max: number,
			row: ReadonlyArray<T>,
		): number {
			//++ [EXCEPTION] Using array.length for calculation
			return Array.isArray(row) ? Math.max(max, row.length) : max
		},
		0,
	)

	//++ If all rows are empty, return empty array
	if (maxLength === 0) {
		return []
	}

	//++ Create the transposed matrix using Array.from
	//++ [EXCEPTION] Using Array.from for creation and iteration
	const result = Array.from(
		{ length: maxLength },
		function transposeColumn(
			_,
			col: number,
		): Array<T | undefined> {
			//++ Map each row to get the element at column index
			//++ [EXCEPTION] Using native .map() for performance
			return matrix.map(
				function getColumnElement(
					row: ReadonlyArray<T>,
				): T | undefined {
					//++ [EXCEPTION] Using array.length for bounds check
					return Array.isArray(row) && col < row.length ? row[col] : undefined
				},
			)
		},
	)

	return result
}
