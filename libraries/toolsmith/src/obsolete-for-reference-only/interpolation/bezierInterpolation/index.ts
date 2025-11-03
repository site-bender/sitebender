import type { Pair } from "../../../types/tuple/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const bezierInterpolation = (
	controlPoints: Array<Array<number>> | null | undefined,
) =>
(
	t: number | null | undefined,
): Pair<number, number> => {
	if (isNullish(controlPoints) || !Array.isArray(controlPoints)) {
		return [NaN, NaN]
	}

	if (isNullish(t) || typeof t !== "number") {
		return [NaN, NaN]
	}

	// Need at least 2 control points
	if (controlPoints.length < 2) {
		return [NaN, NaN]
	}

	// Validate all control points are 2D numeric arrays
	const isValid = controlPoints.every((point) =>
		Array.isArray(point) &&
		point.length === 2 &&
		typeof point[0] === "number" &&
		typeof point[1] === "number"
	)

	if (!isValid) {
		return [NaN, NaN]
	}

	// Clamp t to [0, 1]
	const clampedT = Math.max(0, Math.min(1, t))

	// De Casteljau's algorithm - recursive implementation
	const deCasteljau = (points: Array<Array<number>>): Array<number> => {
		if (points.length === 1) {
			return points[0]
		}

		const interpolated = points.slice(0, -1).map((point, i) => [
			point[0] * (1 - clampedT) + points[i + 1][0] * clampedT,
			point[1] * (1 - clampedT) + points[i + 1][1] * clampedT,
		])

		return deCasteljau(interpolated)
	}

	const result = deCasteljau(controlPoints)

	return [result[0], result[1]]
}

export default bezierInterpolation
