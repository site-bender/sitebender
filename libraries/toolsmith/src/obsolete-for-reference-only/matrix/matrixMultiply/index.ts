//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const matrixMultiply = (
	a: number[][] | null | undefined,
) =>
(
	b: number[][] | null | undefined,
): number[][] => {
	if (isNullish(a) || !Array.isArray(a) || a.length === 0) {
		return []
	}

	if (isNullish(b) || !Array.isArray(b) || b.length === 0) {
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
		row.every((val) => !isNullish(val) && typeof val === "number")
	)
	const bValid = b.every((row) =>
		row.length === p &&
		row.every((val) => !isNullish(val) && typeof val === "number")
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
