/**
 * Transposes a matrix (2D array)
 * 
 * Converts rows to columns and columns to rows in a 2D array. The element
 * at position [i][j] becomes the element at position [j][i]. For non-square
 * matrices, the result has dimensions swapped. Missing elements in jagged
 * arrays are filled with undefined. Useful for matrix operations, data
 * transformation, or rotating tabular data.
 * 
 * @curried No currying (single parameter)
 * @param matrix - 2D array to transpose
 * @returns Transposed 2D array
 * @example
 * ```typescript
 * // Square matrix
 * transpose([
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ])
 * // [
 * //   [1, 4, 7],
 * //   [2, 5, 8],
 * //   [3, 6, 9]
 * // ]
 * 
 * // Rectangular matrix
 * transpose([
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8]
 * ])
 * // [
 * //   [1, 5],
 * //   [2, 6],
 * //   [3, 7],
 * //   [4, 8]
 * // ]
 * 
 * // Column to row
 * transpose([
 *   [1],
 *   [2],
 *   [3]
 * ])
 * // [[1, 2, 3]]
 * 
 * // Row to column
 * transpose([[1, 2, 3]])
 * // [
 * //   [1],
 * //   [2],
 * //   [3]
 * // ]
 * 
 * // Jagged array (filled with undefined)
 * transpose([
 *   [1, 2, 3],
 *   [4, 5],
 *   [6]
 * ])
 * // [
 * //   [1, 4, 6],
 * //   [2, 5, undefined],
 * //   [3, undefined, undefined]
 * // ]
 * 
 * // String matrix
 * transpose([
 *   ["a", "b", "c"],
 *   ["d", "e", "f"]
 * ])
 * // [
 * //   ["a", "d"],
 * //   ["b", "e"],
 * //   ["c", "f"]
 * // ]
 * 
 * // Table data transformation
 * const data = [
 *   ["Name", "Age", "City"],
 *   ["Alice", 25, "NYC"],
 *   ["Bob", 30, "LA"]
 * ]
 * transpose(data)
 * // [
 * //   ["Name", "Alice", "Bob"],
 * //   ["Age", 25, 30],
 * //   ["City", "NYC", "LA"]
 * // ]
 * 
 * // Coordinate pairs
 * transpose([
 *   [1, 2],
 *   [3, 4],
 *   [5, 6]
 * ])
 * // [
 * //   [1, 3, 5],  // all x coordinates
 * //   [2, 4, 6]   // all y coordinates
 * // ]
 * 
 * // Boolean matrix
 * transpose([
 *   [true, false, true],
 *   [false, true, false]
 * ])
 * // [
 * //   [true, false],
 * //   [false, true],
 * //   [true, false]
 * // ]
 * 
 * // Identity matrix (unchanged)
 * transpose([
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1]
 * ])
 * // [
 * //   [1, 0, 0],
 * //   [0, 1, 0],
 * //   [0, 0, 1]
 * // ]
 * 
 * // Single element
 * transpose([[42]])
 * // [[42]]
 * 
 * // Empty matrix
 * transpose([])
 * // []
 * 
 * // Empty rows
 * transpose([[], [], []])
 * // []
 * 
 * // Handle null/undefined
 * transpose(null)       // []
 * transpose(undefined)  // []
 * 
 * // Mixed types
 * transpose([
 *   [1, "a", true],
 *   [2, "b", false],
 *   [3, "c", null]
 * ])
 * // [
 * //   [1, 2, 3],
 * //   ["a", "b", "c"],
 * //   [true, false, null]
 * // ]
 * 
 * // Calendar week view to day view
 * const weekView = [
 *   ["Mon", "Tue", "Wed", "Thu", "Fri"],
 *   ["Meeting", "", "Review", "", "Demo"],
 *   ["", "Training", "", "Workshop", ""]
 * ]
 * transpose(weekView)
 * // [
 * //   ["Mon", "Meeting", ""],
 * //   ["Tue", "", "Training"],
 * //   ["Wed", "Review", ""],
 * //   ["Thu", "", "Workshop"],
 * //   ["Fri", "Demo", ""]
 * // ]
 * 
 * // RGB channels
 * const pixels = [
 *   [255, 128, 0],    // pixel 1: [R, G, B]
 *   [0, 255, 128],    // pixel 2: [R, G, B]
 *   [128, 0, 255]     // pixel 3: [R, G, B]
 * ]
 * transpose(pixels)
 * // [
 * //   [255, 0, 128],   // all R values
 * //   [128, 255, 0],   // all G values
 * //   [0, 128, 255]    // all B values
 * // ]
 * 
 * // Time series data
 * const timeSeries = [
 *   [1, 2, 3, 4, 5],        // timestamps
 *   [10, 15, 13, 18, 20],   // values1
 *   [5, 8, 6, 9, 11]        // values2
 * ]
 * transpose(timeSeries)
 * // [
 * //   [1, 10, 5],
 * //   [2, 15, 8],
 * //   [3, 13, 6],
 * //   [4, 18, 9],
 * //   [5, 20, 11]
 * // ]
 * 
 * // Survey responses
 * const responses = [
 *   ["Q1", "Q2", "Q3"],
 *   ["Yes", "No", "Maybe"],
 *   ["No", "Yes", "Yes"],
 *   ["Maybe", "Maybe", "No"]
 * ]
 * transpose(responses)
 * // [
 * //   ["Q1", "Yes", "No", "Maybe"],
 * //   ["Q2", "No", "Yes", "Maybe"],
 * //   ["Q3", "Maybe", "Yes", "No"]
 * // ]
 * 
 * // Matrix multiplication preparation
 * const matrixA = [[1, 2], [3, 4]]
 * const matrixB = [[5, 6], [7, 8]]
 * const transposedB = transpose(matrixB)
 * // [[5, 7], [6, 8]] ready for dot products
 * 
 * // Spreadsheet columns to rows
 * const columns = [
 *   ["A1", "A2", "A3"],
 *   ["B1", "B2", "B3"],
 *   ["C1", "C2", "C3"]
 * ]
 * transpose(columns)
 * // [
 * //   ["A1", "B1", "C1"],
 * //   ["A2", "B2", "C2"],
 * //   ["A3", "B3", "C3"]
 * // ]
 * 
 * // Game board rotation
 * const board = [
 *   ["X", "O", "X"],
 *   ["O", "X", "O"],
 *   ["X", "O", "X"]
 * ]
 * transpose(board)
 * // [
 * //   ["X", "O", "X"],
 * //   ["O", "X", "O"],
 * //   ["X", "O", "X"]
 * // ]
 * 
 * // Database rows to columns
 * const rows = [
 *   [1, "Alice", 25],
 *   [2, "Bob", 30],
 *   [3, "Charlie", 35]
 * ]
 * const [ids, names, ages] = transpose(rows)
 * // ids: [1, 2, 3]
 * // names: ["Alice", "Bob", "Charlie"]
 * // ages: [25, 30, 35]
 * 
 * // Sensor readings
 * const sensors = [
 *   [20.1, 20.3, 20.2],  // sensor 1
 *   [19.8, 19.9, 20.0],  // sensor 2
 *   [20.5, 20.4, 20.6]   // sensor 3
 * ]
 * transpose(sensors)
 * // [
 * //   [20.1, 19.8, 20.5],  // time 1
 * //   [20.3, 19.9, 20.4],  // time 2
 * //   [20.2, 20.0, 20.6]   // time 3
 * // ]
 * 
 * // Double transpose (returns original)
 * const original = [[1, 2], [3, 4]]
 * transpose(transpose(original))
 * // [[1, 2], [3, 4]]
 * 
 * // Adjacency matrix (symmetric remains symmetric)
 * const adjacency = [
 *   [0, 1, 1, 0],
 *   [1, 0, 1, 1],
 *   [1, 1, 0, 1],
 *   [0, 1, 1, 0]
 * ]
 * transpose(adjacency)
 * // Same matrix (symmetric)
 * 
 * // Feature vectors
 * const features = [
 *   [0.1, 0.2, 0.3],  // sample 1
 *   [0.4, 0.5, 0.6],  // sample 2
 *   [0.7, 0.8, 0.9]   // sample 3
 * ]
 * transpose(features)
 * // [
 * //   [0.1, 0.4, 0.7],  // feature 1 across samples
 * //   [0.2, 0.5, 0.8],  // feature 2 across samples
 * //   [0.3, 0.6, 0.9]   // feature 3 across samples
 * // ]
 * 
 * // Nested objects
 * transpose([
 *   [{ a: 1 }, { a: 2 }],
 *   [{ b: 3 }, { b: 4 }]
 * ])
 * // [
 * //   [{ a: 1 }, { b: 3 }],
 * //   [{ a: 2 }, { b: 4 }]
 * // ]
 * 
 * // Very tall matrix
 * const tall = Array.from({ length: 100 }, (_, i) => [i])
 * transpose(tall)
 * // [[0, 1, 2, ..., 99]] (single row)
 * 
 * // Very wide matrix
 * const wide = [Array.from({ length: 100 }, (_, i) => i)]
 * transpose(wide)
 * // [[0], [1], [2], ..., [99]] (single column)
 * 
 * // Diagonal extraction
 * const matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ]
 * const transposed = transpose(matrix)
 * const diagonal = transposed.map((row, i) => row[i])
 * // [1, 5, 9]
 * ```
 * @property Immutable - doesn't modify input matrix
 * @property Dimension-swap - Rows become columns, columns become rows
 * @property Jagged-handling - Fills missing elements with undefined
 */
const transpose = <T>(
	matrix: ReadonlyArray<ReadonlyArray<T>> | null | undefined
): Array<Array<T | undefined>> => {
	if (matrix == null || !Array.isArray(matrix) || matrix.length === 0) {
		return []
	}
	
	// Find the maximum row length
	let maxLength = 0
	for (const row of matrix) {
		if (Array.isArray(row) && row.length > maxLength) {
			maxLength = row.length
		}
	}
	
	// If all rows are empty, return empty array
	if (maxLength === 0) {
		return []
	}
	
	// Create the transposed matrix
	const result: Array<Array<T | undefined>> = []
	
	for (let col = 0; col < maxLength; col++) {
		const newRow: Array<T | undefined> = []
		for (let row = 0; row < matrix.length; row++) {
			newRow.push(
				Array.isArray(matrix[row]) && col < matrix[row].length
					? matrix[row][col]
					: undefined
			)
		}
		result.push(newRow)
	}
	
	return result
}

export default transpose