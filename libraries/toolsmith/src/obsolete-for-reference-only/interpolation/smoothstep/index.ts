import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const smoothstep = (
	edge0: number | null | undefined,
) =>
(
	edge1: number | null | undefined,
) =>
(
	x: number | null | undefined,
): number => {
	if (isNullish(edge0) || typeof edge0 !== "number") {
		return NaN
	}

	if (isNullish(edge1) || typeof edge1 !== "number") {
		return NaN
	}

	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Edges must be in correct order
	if (edge0 >= edge1) {
		return NaN
	}

	// Clamp x to [0, 1] range
	if (x <= edge0) {
		return 0
	}
	if (x >= edge1) {
		return 1
	}

	// Scale and bias x to [0, 1]
	const t = (x - edge0) / (edge1 - edge0)

	// Apply smoothstep formula: 3t² - 2t³
	return t * t * (3 - 2 * t)
}

export default smoothstep
