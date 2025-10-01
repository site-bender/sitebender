import isNullish from "../../validation/isNullish/index.ts"

//++ Finds the median of an Array<number>; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function median(
	numbers: Array<number> | null | undefined,
): number {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return NaN
	}

	if (numbers.length === 0) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalidValue = numbers.some(function checkInvalidNumber(num) {
		return isNullish(num) || typeof num !== "number" || isNaN(num)
	})

	if (hasInvalidValue) {
		return NaN
	}

	// Create a sorted copy to avoid mutating the input
	const sorted = [...numbers].sort(function sortNumbers(a, b) {
		return a - b
	})

	const middle = Math.floor(sorted.length / 2)

	// If odd number of elements, return the middle one
	if (sorted.length % 2 !== 0) {
		return sorted[middle]
	}

	// If even number of elements, return average of the two middle ones
	return (sorted[middle - 1] + sorted[middle]) / 2
}

//?? [EXAMPLE] median([1, 2, 3, 4]) // 2.5
//?? [EXAMPLE] median([3, 1, 2]) // 2
//?? [EXAMPLE] median([]) // NaN
