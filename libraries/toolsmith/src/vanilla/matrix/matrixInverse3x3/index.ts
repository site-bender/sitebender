//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const matrixInverse3x3 = (
	matrix: Array<Array<number>> | null | undefined,
): Array<Array<number>> | null => {
	if (isNullish(matrix) || !Array.isArray(matrix)) {
		return null
	}

	// Check if it's a 3x3 matrix
	if (matrix.length !== 3) {
		return null
	}

	const isValid = matrix.every((row) =>
		Array.isArray(row) &&
		row.length === 3 &&
		row.every((elem) => typeof elem === "number")
	)

	if (!isValid) {
		return null
	}

	// Extract matrix elements for readability
	const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2]
	const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2]
	const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2]

	// Calculate determinant using rule of Sarrus
	const determinant = a * (e * i - f * h) -
		b * (d * i - f * g) +
		c * (d * h - e * g)

	// Check if matrix is singular
	if (determinant === 0) {
		return null
	}

	const invDet = 1 / determinant

	// Calculate cofactor matrix elements
	const c11 = e * i - f * h
	const c12 = -(d * i - f * g)
	const c13 = d * h - e * g

	const c21 = -(b * i - c * h)
	const c22 = a * i - c * g
	const c23 = -(a * h - b * g)

	const c31 = b * f - c * e
	const c32 = -(a * f - c * d)
	const c33 = a * e - b * d

	// Return adjugate matrix divided by determinant
	// (adjugate is transpose of cofactor matrix)
	return [
		[c11 * invDet, c21 * invDet, c31 * invDet],
		[c12 * invDet, c22 * invDet, c32 * invDet],
		[c13 * invDet, c23 * invDet, c33 * invDet],
	]
}

export default matrixInverse3x3
