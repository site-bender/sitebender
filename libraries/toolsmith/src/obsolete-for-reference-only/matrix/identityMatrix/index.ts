//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const identityMatrix = (
	size: number | null | undefined,
): number[][] | number => {
	if (isNullish(size) || typeof size !== "number") {
		return NaN
	}

	// Check for non-integer
	if (!Number.isInteger(size)) {
		return NaN
	}

	// Check for non-positive size
	if (size <= 0) {
		return NaN
	}

	// Create identity matrix using functional approach
	return Array.from(
		{ length: size },
		(_, i) => Array.from({ length: size }, (_, j) => i === j ? 1 : 0),
	)
}

export default identityMatrix
