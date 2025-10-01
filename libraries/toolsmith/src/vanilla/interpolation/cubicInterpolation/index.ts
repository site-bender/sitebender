import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const cubicInterpolation = (
	y0: number | null | undefined,
) =>
(
	y1: number | null | undefined,
) =>
(
	y2: number | null | undefined,
) =>
(
	y3: number | null | undefined,
) =>
(
	t: number | null | undefined,
): number => {
	if (isNullish(y0) || typeof y0 !== "number") {
		return NaN
	}

	if (isNullish(y1) || typeof y1 !== "number") {
		return NaN
	}

	if (isNullish(y2) || typeof y2 !== "number") {
		return NaN
	}

	if (isNullish(y3) || typeof y3 !== "number") {
		return NaN
	}

	if (isNullish(t) || typeof t !== "number") {
		return NaN
	}

	// Catmull-Rom spline interpolation formula
	// This gives a smooth curve through the middle two points
	const t2 = t * t
	const t3 = t2 * t

	const a0 = -0.5 * y0 + 1.5 * y1 - 1.5 * y2 + 0.5 * y3
	const a1 = y0 - 2.5 * y1 + 2 * y2 - 0.5 * y3
	const a2 = -0.5 * y0 + 0.5 * y2
	const a3 = y1

	return a0 * t3 + a1 * t2 + a2 * t + a3
}

export default cubicInterpolation
