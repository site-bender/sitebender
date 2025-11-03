//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const determinant3x3 = (
	matrix: number[][] | null | undefined,
): number => {
	if (isNullish(matrix) || !Array.isArray(matrix)) {
		return NaN
	}

	// Check if it's a 3x3 matrix
	if (matrix.length !== 3) {
		return NaN
	}

	if (!matrix.every((row) => Array.isArray(row) && row.length === 3)) {
		return NaN
	}

	// Extract elements for readability
	const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2]
	const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2]
	const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2]

	// Check for non-numeric values
	if (
		isNullish(a) || typeof a !== "number" ||
		isNullish(b) || typeof b !== "number" ||
		isNullish(c) || typeof c !== "number" ||
		isNullish(d) || typeof d !== "number" ||
		isNullish(e) || typeof e !== "number" ||
		isNullish(f) || typeof f !== "number" ||
		isNullish(g) || typeof g !== "number" ||
		isNullish(h) || typeof h !== "number" ||
		isNullish(i) || typeof i !== "number"
	) {
		return NaN
	}

	// Calculate determinant using cofactor expansion along first row
	// det = a(ei - fh) - b(di - fg) + c(dh - eg)
	return a * (e * i - f * h) -
		b * (d * i - f * g) +
		c * (d * h - e * g)
}

export default determinant3x3
