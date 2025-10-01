import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const gammaFunction = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Gamma function has poles at non-positive integers
	if (x <= 0) {
		return NaN
	}

	// Lanczos approximation coefficients
	const g = 7
	const coef = [
		0.99999999999980993,
		676.5203681218851,
		-1259.1392167224028,
		771.32342877765313,
		-176.61502916214059,
		12.507343278686905,
		-0.13857109526572012,
		9.9843695780195716e-6,
		1.5056327351493116e-7,
	]

	// For x < 0.5, use reflection formula (not needed here as we only handle positive)

	const z = x - 1
	const sum = (() => {
		const addCoefficients = (i: number): number => {
			if (i >= 9) return 0
			return coef[i] / (z + i) + addCoefficients(i + 1)
		}
		return coef[0] + addCoefficients(1)
	})()

	const t = z + g + 0.5
	const sqrt2pi = Math.sqrt(2 * Math.PI)

	return sqrt2pi * Math.pow(t, z + 0.5) * Math.exp(-t) * sum
}

export default gammaFunction
