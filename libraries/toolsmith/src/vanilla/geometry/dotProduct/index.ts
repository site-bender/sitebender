import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const dotProduct = (
	vector1: Array<number> | null | undefined,
) =>
(
	vector2: Array<number> | null | undefined,
): number => {
	if (isNullish(vector1) || !Array.isArray(vector1)) {
		return NaN
	}

	if (isNullish(vector2) || !Array.isArray(vector2)) {
		return NaN
	}

	// Vectors must have same dimensions
	if (vector1.length !== vector2.length) {
		return NaN
	}

	// Empty vectors have dot product 0
	if (vector1.length === 0) {
		return 0
	}

	// Calculate sum of products
	return vector1.reduce((sum, v1, i) => {
		const v2 = vector2[i]
		if (typeof v1 !== "number" || typeof v2 !== "number") {
			return NaN
		}
		return sum + v1 * v2
	}, 0)
}

export default dotProduct
