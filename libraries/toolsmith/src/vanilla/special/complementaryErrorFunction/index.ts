import isNullish from "../../validation/isNullish/index.ts"
import errorFunction from "../errorFunction/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const complementaryErrorFunction = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// For better numerical stability with large |x|
	// we could implement a direct approximation,
	// but for simplicity we use: erfc(x) = 1 - erf(x)
	const erf = errorFunction(x)

	if (isNaN(erf)) {
		return NaN
	}

	return 1 - erf
}

export default complementaryErrorFunction
