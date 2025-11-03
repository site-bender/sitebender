import isNullish from "../../validation/isNullish/index.ts"
import magnitude from "../magnitude/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const normalize = (
	vector: number[] | null | undefined,
): number[] => {
	if (isNullish(vector) || !Array.isArray(vector)) {
		return []
	}

	if (vector.length === 0) {
		return []
	}

	const mag = magnitude(vector)

	// Can't normalize zero vector or invalid vector
	if (mag === 0 || isNaN(mag)) {
		return vector.map(() => NaN)
	}

	return vector.map((component) => component / mag)
}

export default normalize
