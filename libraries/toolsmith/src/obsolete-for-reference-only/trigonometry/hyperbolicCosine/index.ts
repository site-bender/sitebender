import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const hyperbolicCosine = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Use built-in Math.cosh for accuracy and performance
	// Fallback to manual calculation if not available
	if (typeof Math.cosh === "function") {
		return Math.cosh(x)
	}

	// Manual calculation: cosh(x) = (e^x + e^(-x)) / 2
	// For large |x|, e^(-x) becomes negligible
	if (Math.abs(x) > 20) {
		return Math.exp(Math.abs(x)) / 2
	}

	return (Math.exp(x) + Math.exp(-x)) / 2
}

export default hyperbolicCosine
