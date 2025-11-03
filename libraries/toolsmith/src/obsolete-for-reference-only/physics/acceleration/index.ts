import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const acceleration = (
	force: number | null | undefined,
) =>
(
	mass: number | null | undefined,
): number => {
	if (isNullish(force) || typeof force !== "number") {
		return NaN
	}

	if (isNullish(mass) || typeof mass !== "number") {
		return NaN
	}

	// Cannot divide by zero mass
	if (mass === 0) {
		return NaN
	}

	// a = F/m
	return force / mass
}

export default acceleration
