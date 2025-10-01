import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const manhattanDistance = (
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

	if (point1.length !== point2.length) {
		return NaN
	}

	if (point1.length === 0) {
		return NaN
	}

	return point1.reduce((distance, coord1, i) => {
		const coord2 = point2[i]
		if (isNullish(coord1) || typeof coord1 !== "number") {
			return NaN
		}
		if (isNullish(coord2) || typeof coord2 !== "number") {
			return NaN
		}
		return distance + Math.abs(coord2 - coord1)
	}, 0)
}

export default manhattanDistance
