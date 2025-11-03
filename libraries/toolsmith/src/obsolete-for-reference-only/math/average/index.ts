import isNullish from "../../validation/isNullish/index.ts"

//++ Calculates the arithmetic mean of an Array<number>; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const average = (
	numbers: Array<number> | null | undefined,
): number => {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return NaN
	}

	if (numbers.length === 0) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalid = numbers.some((num) => typeof num !== "number")
	if (hasInvalid) {
		return NaN
	}

	const sum = numbers.reduce((acc, num) => acc + num, 0)
	return sum / numbers.length
}

export default average
