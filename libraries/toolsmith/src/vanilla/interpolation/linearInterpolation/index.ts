import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const linearInterpolation = (
	start: number | null | undefined,
) =>
(
	end: number | null | undefined,
) =>
(
	t: number | null | undefined,
): number => {
	if (isNullish(start) || typeof start !== "number") {
		return NaN
	}

	if (isNullish(end) || typeof end !== "number") {
		return NaN
	}

	if (isNullish(t) || typeof t !== "number") {
		return NaN
	}

	return start + t * (end - start)
}

export default linearInterpolation
