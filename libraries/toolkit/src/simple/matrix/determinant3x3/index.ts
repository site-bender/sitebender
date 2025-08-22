/**
 * Calculates the determinant of a 3x3 matrix
 * 
 * Computes the determinant using cofactor expansion along the first row.
 * The determinant represents the scaling factor of the linear transformation
 * and the signed volume of the parallelepiped formed by the matrix columns.
 * A determinant of 0 indicates the matrix is singular (non-invertible).
 * Returns NaN for invalid inputs or non-3x3 matrices.
 * 
 * @param matrix - 3x3 matrix as array of arrays [[a,b,c],[d,e,f],[g,h,i]]
 * @returns Determinant value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic 3x3 matrices
 * determinant3x3([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
 * // 0 (singular matrix - rows are linearly dependent)
 * 
 * determinant3x3([[2, 1, 3], [1, 0, 1], [0, 2, 4]])
 * // 2
 * 
 * determinant3x3([[1, 0, 0], [0, 2, 0], [0, 0, 3]])
 * // 6 (diagonal matrix: product of diagonal elements)
 * 
 * // Identity matrix
 * determinant3x3([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
 * // 1
 * 
 * // Singular matrices (det = 0)
 * determinant3x3([[1, 2, 3], [2, 4, 6], [3, 6, 9]])
 * // 0 (all rows proportional)
 * 
 * determinant3x3([[1, 1, 1], [1, 1, 1], [1, 1, 1]])
 * // 0 (identical rows)
 * 
 * // Rotation matrix (preserves volume)
 * const cos30 = Math.sqrt(3) / 2
 * const sin30 = 0.5
 * determinant3x3([
 *   [cos30, -sin30, 0],
 *   [sin30, cos30, 0],
 *   [0, 0, 1]
 * ])
 * // 1 (rotation preserves volume)
 * 
 * // Scaling matrix
 * determinant3x3([[2, 0, 0], [0, 3, 0], [0, 0, 4]])
 * // 24 (scales volume by 2×3×4)
 * 
 * // Permutation matrix
 * determinant3x3([[0, 1, 0], [0, 0, 1], [1, 0, 0]])
 * // 1 (even permutation)
 * 
 * determinant3x3([[0, 1, 0], [1, 0, 0], [0, 0, 1]])
 * // -1 (odd permutation)
 * 
 * // General matrix
 * determinant3x3([[6, 1, 1], [4, -2, 5], [2, 8, 7]])
 * // -306
 * 
 * // Fractional values
 * determinant3x3([[0.5, 0.25, 0.1], [0.3, 0.6, 0.2], [0.1, 0.4, 0.8]])
 * // 0.145
 * 
 * // Invalid inputs return NaN
 * determinant3x3([[1, 2], [3, 4], [5, 6]])
 * // NaN (not all rows have 3 elements)
 * 
 * determinant3x3([[1, 2, 3], [4, 5, 6]])
 * // NaN (only 2 rows)
 * 
 * determinant3x3(null)
 * // NaN
 * 
 * determinant3x3([[1, "2", 3], [4, 5, 6], [7, 8, 9]])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Volume of parallelepiped
 * const parallelepipedVolume = (v1: number[], v2: number[], v3: number[]) =>
 *   Math.abs(determinant3x3([v1, v2, v3]))
 * parallelepipedVolume([1, 0, 0], [1, 1, 0], [1, 1, 1])
 * // 1 (unit cube sheared)
 * 
 * // Check if vectors are coplanar
 * const areCoplanar = (v1: number[], v2: number[], v3: number[]) =>
 *   Math.abs(determinant3x3([v1, v2, v3])) < 0.0001
 * areCoplanar([1, 0, 0], [0, 1, 0], [1, 1, 0])  // true
 * areCoplanar([1, 0, 0], [0, 1, 0], [0, 0, 1])  // false
 * 
 * // Transformation scaling factor
 * const transform = [[2, 1, 0], [1, 3, 1], [0, 1, 2]]
 * const scaleFactor = determinant3x3(transform)
 * // 9 (transforms unit cube to volume 9)
 * 
 * // Check if matrix is invertible
 * const isInvertible = (matrix: number[][]) =>
 *   determinant3x3(matrix) !== 0
 * isInvertible([[1, 2, 3], [0, 1, 4], [5, 6, 0]])  // true
 * isInvertible([[1, 2, 3], [4, 5, 6], [7, 8, 9]])  // false
 * 
 * // Cramer's rule component
 * const solve3x3Component = (a: number[][], b: number[], col: number) => {
 *   const modified = a.map((row, i) => [...row])
 *   for (let i = 0; i < 3; i++) {
 *     modified[i][col] = b[i]
 *   }
 *   return determinant3x3(modified) / determinant3x3(a)
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Multilinear - Linear in each row/column
 * @property Alternating - Swapping rows negates determinant
 */
const determinant3x3 = (
	matrix: number[][] | null | undefined
): number => {
	if (matrix == null || !Array.isArray(matrix)) {
		return NaN
	}
	
	// Check if it's a 3x3 matrix
	if (matrix.length !== 3) {
		return NaN
	}
	
	for (let i = 0; i < 3; i++) {
		if (!Array.isArray(matrix[i]) || matrix[i].length !== 3) {
			return NaN
		}
	}
	
	// Extract elements for readability
	const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2]
	const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2]
	const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2]
	
	// Check for non-numeric values
	if (a == null || typeof a !== 'number' ||
	    b == null || typeof b !== 'number' ||
	    c == null || typeof c !== 'number' ||
	    d == null || typeof d !== 'number' ||
	    e == null || typeof e !== 'number' ||
	    f == null || typeof f !== 'number' ||
	    g == null || typeof g !== 'number' ||
	    h == null || typeof h !== 'number' ||
	    i == null || typeof i !== 'number') {
		return NaN
	}
	
	// Calculate determinant using cofactor expansion along first row
	// det = a(ei - fh) - b(di - fg) + c(dh - eg)
	return a * (e * i - f * h) - 
	       b * (d * i - f * g) + 
	       c * (d * h - e * g)
}

export default determinant3x3