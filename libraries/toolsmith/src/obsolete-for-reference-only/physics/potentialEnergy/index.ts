import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const potentialEnergy = (
	mass: number | null | undefined,
) =>
(
	height: number | null | undefined,
) =>
(
	gravity: number = 9.81,
): number => {
	if (isNullish(mass) || typeof mass !== "number") {
		return NaN
	}

	if (mass < 0) {
		return NaN
	}

	if (isNullish(height) || typeof height !== "number") {
		return NaN
	}

	if (isNullish(gravity) || typeof gravity !== "number") {
		return NaN
	}

	if (gravity < 0) {
		return NaN
	}

	// PE = mgh
	return mass * gravity * height
}

export default potentialEnergy
