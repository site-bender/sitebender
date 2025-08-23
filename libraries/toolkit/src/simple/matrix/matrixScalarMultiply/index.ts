/**
 * Multiplies a matrix by a scalar value
 * 
 * Performs scalar multiplication where each element of the matrix is
 * multiplied by the scalar value: B[i][j] = k × A[i][j]. This operation
 * scales all matrix values uniformly. Returns NaN for invalid inputs.
 * 
 * @curried (scalar) => (matrix) => scaled matrix
 * @param scalar - Scalar value to multiply by
 * @param matrix - Matrix to scale (2D array)
 * @returns Scaled matrix, or NaN if invalid
 * @example
 * ```typescript
 * // Scale 2×2 matrix by 2
 * matrixScalarMultiply(2)([
 *   [1, 2],
 *   [3, 4]
 * ])
 * // [
 * //   [2, 4],
 * //   [6, 8]
 * // ]
 * 
 * // Scale by 0.5 (halve all values)
 * matrixScalarMultiply(0.5)([
 *   [10, 20],
 *   [30, 40]
 * ])
 * // [
 * //   [5, 10],
 * //   [15, 20]
 * // ]
 * 
 * // Scale by -1 (negate matrix)
 * matrixScalarMultiply(-1)([
 *   [1, -2],
 *   [-3, 4]
 * ])
 * // [
 * //   [-1, 2],
 * //   [3, -4]
 * // ]
 * 
 * // Scale 3×3 matrix
 * matrixScalarMultiply(3)([
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1]
 * ])
 * // [
 * //   [3, 0, 0],
 * //   [0, 3, 0],
 * //   [0, 0, 3]
 * // ]
 * 
 * // Scale by 0 (zero matrix)
 * matrixScalarMultiply(0)([
 *   [5, 10],
 *   [15, 20]
 * ])
 * // [
 * //   [0, 0],
 * //   [0, 0]
 * // ]
 * 
 * // Non-square matrices
 * matrixScalarMultiply(2)([
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ])
 * // [
 * //   [2, 4, 6],
 * //   [8, 10, 12]
 * // ]
 * 
 * // Row vector
 * matrixScalarMultiply(5)([[1, 2, 3, 4]])
 * // [[5, 10, 15, 20]]
 * 
 * // Column vector
 * matrixScalarMultiply(0.1)([
 *   [10],
 *   [20],
 *   [30]
 * ])
 * // [
 * //   [1],
 * //   [2],
 * //   [3]
 * // ]
 * 
 * // Single element
 * matrixScalarMultiply(7)([[3]])
 * // [[21]]
 * 
 * // Empty matrix
 * matrixScalarMultiply(5)([])
 * // []
 * 
 * // Invalid inputs
 * matrixScalarMultiply(null)([[1, 2]])
 * // NaN
 * 
 * matrixScalarMultiply(2)(null)
 * // NaN
 * 
 * matrixScalarMultiply(2)([[1, "2"]])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Image brightness adjustment
 * const pixels = [
 *   [100, 150, 200],
 *   [120, 170, 220],
 *   [140, 190, 240]
 * ]
 * const darker = matrixScalarMultiply(0.7)(pixels)
 * // 30% darker image
 * 
 * const brighter = matrixScalarMultiply(1.3)(pixels)
 * // 30% brighter (may need clamping to 255)
 * 
 * // Scale transformation matrix
 * const transform = [
 *   [1, 0, 5],
 *   [0, 1, 3],
 *   [0, 0, 1]
 * ]
 * const scaled = matrixScalarMultiply(2)(transform)
 * // Double all transformation values
 * 
 * // Neural network learning rate
 * const gradients = [
 *   [0.1, -0.2],
 *   [0.3, -0.1]
 * ]
 * const learningRate = 0.01
 * const updates = matrixScalarMultiply(-learningRate)(gradients)
 * // [
 * //   [-0.001, 0.002],
 * //   [-0.003, 0.001]
 * // ]
 * 
 * // Normalize matrix by maximum value
 * function normalizeMatrix(matrix: number[][]): number[][] {
 *   let maxVal = 0
 *   for (const row of matrix) {
 *     for (const val of row) {
 *       maxVal = Math.max(maxVal, Math.abs(val))
 *     }
 *   }
 *   return maxVal === 0 ? matrix : 
 *     matrixScalarMultiply(1 / maxVal)(matrix) as number[][]
 * }
 * 
 * // Partial application for common scales
 * const double = matrixScalarMultiply(2)
 * const halve = matrixScalarMultiply(0.5)
 * const negate = matrixScalarMultiply(-1)
 * 
 * // Matrix algebra operations
 * function matrixLinearCombination(
 *   a: number,
 *   matrixA: number[][],
 *   b: number,
 *   matrixB: number[][]
 * ): number[][] {
 *   const scaledA = matrixScalarMultiply(a)(matrixA)
 *   const scaledB = matrixScalarMultiply(b)(matrixB)
 *   return matrixAddition(scaledA)(scaledB) as number[][]
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Distributive - k(A+B) = kA + kB
 */
const matrixScalarMultiply = (
	scalar: number | null | undefined
) => (
	matrix: number[][] | null | undefined
): number[][] | number => {
	if (scalar == null || typeof scalar !== 'number') {
		return NaN
	}
	
	if (matrix == null || !Array.isArray(matrix)) {
		return NaN
	}
	
	// Handle empty matrix
	if (matrix.length === 0) {
		return []
	}
	
	// Validate and scale matrix
	const result: number[][] = []
	
	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i]
		
		if (!Array.isArray(row)) {
			return NaN
		}
		
		const newRow: number[] = []
		
		for (let j = 0; j < row.length; j++) {
			const val = row[j]
			
			if (val == null || typeof val !== 'number') {
				return NaN
			}
			
			newRow.push(scalar * val)
		}
		
		result.push(newRow)
	}
	
	return result
}

export default matrixScalarMultiply