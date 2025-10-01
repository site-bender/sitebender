import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const euclideanDistance = (
	point1: Array<number> | null | undefined,
) =>
(
	point2: Array<number> | null | undefined,
): number => {
	if (isNullish(point1) || !Array.isArray(point1)) {
		return NaN
	}

	if (isNullish(point2) || !Array.isArray(point2)) {
		return NaN
	}

	// Points must have same dimensions
	if (point1.length !== point2.length) {
		return NaN
	}

	// Handle empty arrays (distance is 0)
	if (point1.length === 0) {
		return 0
	}

	// Calculate sum of squared differences
	const sumSquaredDiff = point1.reduce((sum, coord1, i) => {
		const coord2 = point2[i]
		if (typeof coord1 !== "number" || typeof coord2 !== "number") {
			return NaN
		}
		const diff = coord1 - coord2
		return sum + diff * diff
	}, 0)

	return Math.sqrt(sumSquaredDiff)
}

export default euclideanDistance
