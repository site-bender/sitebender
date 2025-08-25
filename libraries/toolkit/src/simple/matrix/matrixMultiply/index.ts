/**
 * Multiplies two matrices
 *
 * Performs matrix multiplication A × B where the number of columns in A
 * must equal the number of rows in B. The result has dimensions m×p where
 * A is m×n and B is n×p. Element (i,j) of the result is the dot product
 * of row i from A and column j from B. Returns empty array for invalid inputs.
 *
 * @curried (a) => (b) => number[][]
 * @param a - First matrix (m×n)
 * @param b - Second matrix (n×p)
 * @returns Product matrix (m×p), or empty array if invalid
 * @example
 * ```typescript
 * // 2×2 matrices
 * matrixMultiply([[1, 2], [3, 4]])([[5, 6], [7, 8]])
 * // [[19, 22], [43, 50]]
 * // (1×5 + 2×7 = 19, 1×6 + 2×8 = 22, etc.)
 *
 * matrixMultiply([[2, 0], [0, 2]])([[3, 4], [5, 6]])
 * // [[6, 8], [10, 12]] (scaling by 2)
 *
 * // Identity matrix (no change)
 * matrixMultiply([[1, 0], [0, 1]])([[5, 6], [7, 8]])
 * // [[5, 6], [7, 8]]
 *
 * // Different dimensions
 * matrixMultiply([[1, 2, 3]])([[4], [5], [6]])
 * // [[32]] (1×3 times 3×1 = 1×1)
 *
 * matrixMultiply([[1, 2], [3, 4], [5, 6]])([[7, 8, 9], [10, 11, 12]])
 * // [[27, 30, 33], [61, 68, 75], [95, 106, 117]]
 * // (3×2 times 2×3 = 3×3)
 *
 * // Vector as matrix
 * matrixMultiply([[2, 3]])([[4], [5]])
 * // [[23]] (2×4 + 3×5)
 *
 * // Rotation matrices
 * const cos90 = 0, sin90 = 1
 * matrixMultiply([[cos90, -sin90], [sin90, cos90]])([[1], [0]])
 * // [[0], [1]] (rotates [1,0] to [0,1])
 *
 * // Non-square matrices
 * matrixMultiply([[1, 2]])([[3, 4], [5, 6]])
 * // [[13, 16]] (1×2 times 2×2 = 1×2)
 *
 * // Order matters (non-commutative)
 * const A = [[1, 2], [3, 4]]
 * const B = [[0, 1], [1, 0]]
 * matrixMultiply(A)(B)
 * // [[2, 1], [4, 3]]
 * matrixMultiply(B)(A)
 * // [[3, 4], [1, 2]] (different result)
 *
 * // Incompatible dimensions return empty array
 * matrixMultiply([[1, 2]])([[3, 4, 5]])
 * // [] (1×2 can't multiply with 1×3)
 *
 * // Invalid inputs
 * matrixMultiply(null)([[1, 2]])
 * // []
 *
 * matrixMultiply([[1, "2"]])([[3], [4]])
 * // []
 *
 * // Practical examples
 *
 * // Linear transformation
 * const transform = [[2, 1], [1, 3]]
 * const vector = [[1], [2]]
 * matrixMultiply(transform)(vector)
 * // [[4], [7]] (transforms [1,2] to [4,7])
 *
 * // Composite transformations
 * const scale = [[2, 0], [0, 2]]
 * const rotate45 = [[0.707, -0.707], [0.707, 0.707]]
 * const composite = matrixMultiply(rotate45)
 * const result = composite(scale)
 * // [[1.414, -1.414], [1.414, 1.414]] (scale then rotate)
 *
 * // Projection matrix
 * const project = [[1, 0, 0], [0, 1, 0]]  // Project 3D to 2D
 * matrixMultiply(project)([[5], [10], [15]])
 * // [[5], [10]] (drops z-coordinate)
 *
 * // Markov chain transition
 * const transition = [[0.7, 0.2, 0.1], [0.3, 0.5, 0.2], [0.1, 0.3, 0.6]]
 * const state = [[0.2], [0.3], [0.5]]
 * matrixMultiply(transition)(state)
 * // [[0.25], [0.37], [0.38]] (next state probabilities)
 *
 * // Graphics transformation pipeline
 * const translate = [[1, 0, 5], [0, 1, 3], [0, 0, 1]]
 * const point = [[2], [4], [1]]  // Homogeneous coordinates
 * matrixMultiply(translate)(point)
 * // [[7], [7], [1]] (translated by [5, 3])
 *
 * // Neural network layer
 * const weights = [[0.5, 0.3], [0.2, 0.8], [0.7, 0.1]]
 * const inputs = [[0.9], [0.6]]
 * matrixMultiply(weights)(inputs)
 * // [[0.63], [0.66], [0.69]] (layer outputs)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns empty array for invalid inputs
 * @property Non-commutative - A×B ≠ B×A in general
 * @property Associative - (A×B)×C = A×(B×C)
 */
const matrixMultiply = (
	a: number[][] | null | undefined,
) =>
(
	b: number[][] | null | undefined,
): number[][] => {
	if (a == null || !Array.isArray(a) || a.length === 0) {
		return []
	}

	if (b == null || !Array.isArray(b) || b.length === 0) {
		return []
	}

	// Check if all rows are arrays
	for (const row of a) {
		if (!Array.isArray(row)) {
			return []
		}
	}

	for (const row of b) {
		if (!Array.isArray(row)) {
			return []
		}
	}

	// Get dimensions
	const m = a.length // rows in A
	const n = a[0].length // columns in A
	const n2 = b.length // rows in B
	const p = b[0].length // columns in B

	// Check dimension compatibility: columns of A must equal rows of B
	if (n !== n2) {
		return []
	}

	// Check all rows have consistent length and numeric values
	for (const row of a) {
		if (row.length !== n) {
			return []
		}
		for (const val of row) {
			if (val == null || typeof val !== "number") {
				return []
			}
		}
	}

	for (const row of b) {
		if (row.length !== p) {
			return []
		}
		for (const val of row) {
			if (val == null || typeof val !== "number") {
				return []
			}
		}
	}

	// Initialize result matrix m×p
	const result: number[][] = []

	// Perform multiplication
	for (let i = 0; i < m; i++) {
		result[i] = []
		for (let j = 0; j < p; j++) {
			let sum = 0
			for (let k = 0; k < n; k++) {
				sum += a[i][k] * b[k][j]
			}
			result[i][j] = sum
		}
	}

	return result
}

export default matrixMultiply
