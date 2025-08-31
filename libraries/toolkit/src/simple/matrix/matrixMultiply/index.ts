/**
 * Multiplies two matrices
 *
 * Performs matrix multiplication A × B where the number of columns in A
 * must equal the number of rows in B. The result has dimensions m×p where
 * A is m×n and B is n×p. Element (i,j) of the result is the dot product
 * of row i from A and column j from B. Returns empty array for invalid inputs.
 *
 * @param a - First matrix (m×n)
 * @param b - Second matrix (n×p)
 * @returns Product matrix (m×p), or empty array if invalid
 * @example
 * ```typescript
 * // Basic 2×2 multiplication
 * matrixMultiply([[1, 2], [3, 4]])([[5, 6], [7, 8]])
 * // [[19, 22], [43, 50]]
 *
 * // Identity matrix (no change)
 * matrixMultiply([[1, 0], [0, 1]])([[5, 6], [7, 8]])
 * // [[5, 6], [7, 8]]
 *
 * // Different dimensions (3×2 times 2×3)
 * matrixMultiply([[1, 2], [3, 4], [5, 6]])([[7, 8, 9], [10, 11, 12]])
 * // [[27, 30, 33], [61, 68, 75], [95, 106, 117]]
 *
 * // Order matters (non-commutative)
 * const A = [[1, 2], [3, 4]]
 * const B = [[0, 1], [1, 0]]
 * matrixMultiply(A)(B)  // [[2, 1], [4, 3]]
 * matrixMultiply(B)(A)  // [[3, 4], [1, 2]]
 *
 * // Incompatible dimensions
 * matrixMultiply([[1, 2]])([[3, 4, 5]])  // []
 * ```
 * @pure
 * @curried
 * @safe
 * @associative
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
	if (
		!a.every((row) => Array.isArray(row)) ||
		!b.every((row) => Array.isArray(row))
	) {
		return []
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
	const aValid = a.every((row) =>
		row.length === n &&
		row.every((val) => val != null && typeof val === "number")
	)
	const bValid = b.every((row) =>
		row.length === p &&
		row.every((val) => val != null && typeof val === "number")
	)

	if (!aValid || !bValid) {
		return []
	}

	// Perform multiplication using functional approach
	const result = Array.from(
		{ length: m },
		(_, i) =>
			Array.from(
				{ length: p },
				(_, j) =>
					Array.from({ length: n }, (_, k) => a[i][k] * b[k][j])
						.reduce((sum, val) => sum + val, 0),
			),
	)

	return result
}

export default matrixMultiply
