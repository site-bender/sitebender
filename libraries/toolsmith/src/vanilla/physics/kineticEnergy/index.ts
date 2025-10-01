import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const kineticEnergy = (
	mass: number | null | undefined,
) =>
(
	velocity: number | null | undefined,
): number => {
	if (isNullish(mass) || typeof mass !== "number") {
		return NaN
	}

	if (mass < 0) {
		return NaN
	}

	if (isNullish(velocity) || typeof velocity !== "number") {
		return NaN
	}

	// KE = ½mv²
	return 0.5 * mass * velocity * velocity
}

export default kineticEnergy
