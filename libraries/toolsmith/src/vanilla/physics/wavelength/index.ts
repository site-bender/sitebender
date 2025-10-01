import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const wavelength = (
	speed: number | null | undefined,
) =>
(
	frequency: number | null | undefined,
): number => {
	if (isNullish(speed) || typeof speed !== "number") {
		return NaN
	}

	if (isNullish(frequency) || typeof frequency !== "number") {
		return NaN
	}

	// Check for non-finite values
	if (!isFinite(speed) || !isFinite(frequency)) {
		return NaN
	}

	// Speed must be non-negative
	if (speed < 0) {
		return NaN
	}

	// Frequency must be positive (cannot be zero or negative)
	if (frequency <= 0) {
		return NaN
	}

	// Calculate wavelength
	return speed / frequency
}

export default wavelength
