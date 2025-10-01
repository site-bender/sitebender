import isNullish from "../../validation/isNullish/index.ts"
import gammaFunction from "../gammaFunction/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const betaFunction = (
	x: number | null | undefined,
) =>
(
	y: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	if (isNullish(y) || typeof y !== "number") {
		return NaN
	}

	// Beta function is only defined for positive x and y
	if (x <= 0 || y <= 0) {
		return NaN
	}

	// B(x,y) = Γ(x)Γ(y)/Γ(x+y)
	const gammaX = gammaFunction(x)
	const gammaY = gammaFunction(y)
	const gammaXY = gammaFunction(x + y)

	// Check for invalid gamma values
	if (isNaN(gammaX) || isNaN(gammaY) || isNaN(gammaXY)) {
		return NaN
	}

	// Handle potential infinity/overflow
	if (!isFinite(gammaX) || !isFinite(gammaY)) {
		// Use logarithms for large values to avoid overflow
		const lnBeta = Math.log(gammaX) + Math.log(gammaY) - Math.log(gammaXY)
		return Math.exp(lnBeta)
	}

	return (gammaX * gammaY) / gammaXY
}

export default betaFunction
