/**
 * Adds two matrices element-wise
 * 
 * Performs element-wise addition of two matrices with the same dimensions.
 * Each element in the result is the sum of corresponding elements from
 * the input matrices: C[i][j] = A[i][j] + B[i][j]. Returns NaN for
 * invalid inputs or mismatched dimensions.
 * 
 * @curried (matrix1) => (matrix2) => sum matrix
 * @param matrix1 - First matrix (2D array)
 * @param matrix2 - Second matrix (must have same dimensions)
 * @returns Sum of the matrices, or NaN if invalid
 * @example
 * ```typescript
 * // 2×2 matrices
 * matrixAddition([
 *   [1, 2],
 *   [3, 4]
 * ])([
 *   [5, 6],
 *   [7, 8]
 * ])
 * // [
 * //   [6, 8],
 * //   [10, 12]
 * // ]
 * 
 * // 3×3 matrices
 * matrixAddition([
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1]
 * ])([
 *   [2, 3, 4],
 *   [5, 6, 7],
 *   [8, 9, 10]
 * ])
 * // [
 * //   [3, 3, 4],
 * //   [5, 7, 7],
 * //   [8, 9, 11]
 * // ]
 * 
 * // 2×3 matrices
 * matrixAddition([
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ])([
 *   [10, 20, 30],
 *   [40, 50, 60]
 * ])
 * // [
 * //   [11, 22, 33],
 * //   [44, 55, 66]
 * // ]
 * 
 * // With negative values
 * matrixAddition([
 *   [1, -2],
 *   [-3, 4]
 * ])([
 *   [-1, 2],
 *   [3, -4]
 * ])
 * // [
 * //   [0, 0],
 * //   [0, 0]
 * // ]
 * 
 * // Single element matrices
 * matrixAddition([[5]])([[3]])
 * // [[8]]
 * 
 * // Row vectors
 * matrixAddition([[1, 2, 3]])([[4, 5, 6]])
 * // [[5, 7, 9]]
 * 
 * // Column vectors
 * matrixAddition([
 *   [1],
 *   [2],
 *   [3]
 * ])([
 *   [4],
 *   [5],
 *   [6]
 * ])
 * // [
 * //   [5],
 * //   [7],
 * //   [9]
 * // ]
 * 
 * // Mismatched dimensions return NaN
 * matrixAddition([
 *   [1, 2],
 *   [3, 4]
 * ])([
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ])
 * // NaN
 * 
 * // Invalid inputs
 * matrixAddition(null)([[1, 2]])
 * // NaN
 * 
 * matrixAddition([[1, "2"]])([[3, 4]])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Image processing - add brightness
 * const image = [
 *   [100, 150, 200],
 *   [120, 170, 220],
 *   [140, 190, 240]
 * ]
 * const brightness = [
 *   [20, 20, 20],
 *   [20, 20, 20],
 *   [20, 20, 20]
 * ]
 * const brightened = matrixAddition(image)(brightness)
 * // All pixels increased by 20
 * 
 * // Combine transformations
 * const translation1 = [
 *   [1, 0, 5],
 *   [0, 1, 3],
 *   [0, 0, 1]
 * ]
 * const translation2 = [
 *   [0, 0, 2],
 *   [0, 0, 4],
 *   [0, 0, 0]
 * ]
 * const combined = matrixAddition(translation1)(translation2)
 * // Combined translation matrix
 * 
 * // Neural network - add bias
 * const weights = [
 *   [0.5, 0.3],
 *   [0.2, 0.8]
 * ]
 * const bias = [
 *   [0.1, 0.1],
 *   [0.1, 0.1]
 * ]
 * const adjusted = matrixAddition(weights)(bias)
 * 
 * // Partial application for repeated addition
 * const addIdentity = matrixAddition([
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1]
 * ])
 * 
 * // Matrix accumulation
 * function sumMatrices(matrices: number[][][]): number[][] {
 *   if (matrices.length === 0) return []
 *   return matrices.reduce((acc, mat) => 
 *     matrixAddition(acc)(mat) as number[][]
 *   )
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Commutative - A + B = B + A
 */
const matrixAddition = (
	matrix1: number[][] | null | undefined
) => (
	matrix2: number[][] | null | undefined
): number[][] | number => {
	if (matrix1 == null || !Array.isArray(matrix1)) {
		return NaN
	}
	
	if (matrix2 == null || !Array.isArray(matrix2)) {
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
	
	// Validate all rows and perform addition
	const result: number[][] = []
	
	for (let i = 0; i < rows1; i++) {
		const row1 = matrix1[i]
		const row2 = matrix2[i]
		
		if (!Array.isArray(row1) || !Array.isArray(row2)) {
			return NaN
		}
		
		if (row1.length !== cols1 || row2.length !== cols2) {
			return NaN
		}
		
		const newRow: number[] = []
		
		for (let j = 0; j < cols1; j++) {
			const val1 = row1[j]
			const val2 = row2[j]
			
			if (val1 == null || typeof val1 !== 'number' ||
			    val2 == null || typeof val2 !== 'number') {
				return NaN
			}
			
			newRow.push(val1 + val2)
		}
		
		result.push(newRow)
	}
	
	return result
}

export default matrixAddition