import isEmpty from "../../array/isEmpty/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Sums an Array<number>; returns 0 for empty array; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const sum = (
	numbers: Array<number> | null | undefined,
): number => {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return NaN
	}

	if (isEmpty(numbers)) {
		return 0 // additive identity
	}

	// Check for non-numeric values
	const hasInvalidValue = numbers.some(
		(num) => isNullish(num) || typeof num !== "number" || isNaN(num),
	)

	if (hasInvalidValue) {
		return NaN
	}

	// Calculate sum using reduce
	return numbers.reduce((acc, num) => acc + num, 0)
}

export default sum

//?? [EXAMPLE] sum([1, 2, 3]) // 6
//?? [EXAMPLE] sum([]) // 0
//?? [EXAMPLE] sum([1, NaN, 3]) // NaN
