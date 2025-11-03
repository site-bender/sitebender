import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const hyperbolicSine = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Use built-in Math.sinh for accuracy and performance
	// Fallback to manual calculation if not available
	if (typeof Math.sinh === "function") {
		return Math.sinh(x)
	}

	// Manual calculation: sinh(x) = (e^x - e^(-x)) / 2
	// For large |x|, e^(-x) becomes negligible
	if (Math.abs(x) > 20) {
		const sign = x < 0 ? -1 : 1
		return sign * Math.exp(Math.abs(x)) / 2
	}

	return (Math.exp(x) - Math.exp(-x)) / 2
}

export default hyperbolicSine
