//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const chebyshevDistance = (
	point1: number[] | null | undefined,
) =>
(
	point2: number[] | null | undefined,
): number => {
	if (isNullish(point1) || !Array.isArray(point1)) {
		return NaN
	}

	if (isNullish(point2) || !Array.isArray(point2)) {
		return NaN
	}

	// Check dimension match
	if (point1.length !== point2.length) {
		return NaN
	}

	// Handle empty arrays
	if (point1.length === 0) {
		return 0
	}

	return point1.reduce((maxDist, coord1, i) => {
		const coord2 = point2[i]

		// Check for non-numeric values
		if (isNullish(coord1) || typeof coord1 !== "number") {
			return NaN
		}
		if (isNullish(coord2) || typeof coord2 !== "number") {
			return NaN
		}

		const distance = Math.abs(coord1 - coord2)
		return Math.max(maxDist, distance)
	}, 0)
}

export default chebyshevDistance
