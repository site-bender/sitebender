import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const magnitude = (
	vector: number[] | null | undefined,
): number => {
	if (isNullish(vector) || !Array.isArray(vector)) {
		return NaN
	}

	if (vector.length === 0) {
		return NaN
	}

	const sumOfSquares = vector.reduce((sum, component) => {
		if (isNullish(component) || typeof component !== "number") {
			return NaN
		}
		return sum + component * component
	}, 0)

	return Math.sqrt(sumOfSquares)
}

export default magnitude
