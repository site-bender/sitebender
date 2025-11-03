import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const hyperbolicTangent = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Use built-in Math.tanh for accuracy and performance
	// Fallback to manual calculation if not available
	if (typeof Math.tanh === "function") {
		return Math.tanh(x)
	}

	// Manual calculation: tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))
	// For large |x|, approaches ±1
	if (x > 20) {
		return 1
	}
	if (x < -20) {
		return -1
	}

	const expX = Math.exp(x)
	const expNegX = Math.exp(-x)
	return (expX - expNegX) / (expX + expNegX)
}

export default hyperbolicTangent
