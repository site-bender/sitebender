import isNullish from "../../validation/isNullish/index.ts"

//++ Multiplies an Array<number>; returns 1 for empty array; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const product = (
	numbers: Array<number> | null | undefined,
): number => {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return NaN
	}

	if (numbers.length === 0) {
		return 1 // multiplicative identity
	}

	// Check for non-numeric values
	const hasInvalidValue = numbers.some(
		(num) => isNullish(num) || typeof num !== "number" || isNaN(num),
	)

	if (hasInvalidValue) {
		return NaN
	}

	// Calculate product using reduce
	return numbers.reduce((acc, num) => acc * num, 1)
}

export default product

//?? [EXAMPLE] product([2, 3, 4]) // 24
//?? [EXAMPLE] product([]) // 1
//?? [EXAMPLE] product([1, NaN, 3]) // NaN
