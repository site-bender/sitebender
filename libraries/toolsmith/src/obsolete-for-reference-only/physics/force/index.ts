import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const force = (
	mass: number | null | undefined,
) =>
(
	acceleration: number | null | undefined,
): number => {
	if (isNullish(mass) || typeof mass !== "number") {
		return NaN
	}

	if (isNullish(acceleration) || typeof acceleration !== "number") {
		return NaN
	}

	// F = ma
	return mass * acceleration
}

export default force
