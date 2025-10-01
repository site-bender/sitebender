import isNullish from "../../validation/isNullish/index.ts"

//++ Finds the most frequent value(s) in an Array<number>; returns [] on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function mode(
	numbers: Array<number> | null | undefined,
): Array<number> {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return []
	}

	if (numbers.length === 0) {
		return []
	}

	// Check for non-numeric values
	const hasInvalidValue = numbers.some(function checkInvalidNumber(num) {
		return isNullish(num) || typeof num !== "number" || isNaN(num)
	})

	if (hasInvalidValue) {
		return []
	}

	// Count frequencies using reduce
	const frequency = numbers.reduce(function countFrequencies(acc, num) {
		acc.set(num, (acc.get(num) || 0) + 1)
		return acc
	}, new Map<number, number>())

	// Find maximum frequency using reduce
	const maxFrequency = Array.from(frequency.values()).reduce(
		function findMaximumFrequency(max, count) {
			return count > max ? count : max
		},
		0,
	)

	// Collect all values with maximum frequency and sort
	return Array.from(frequency.entries())
		.filter(function hasMaxFrequency([_, count]) {
			return count === maxFrequency
		})
		.map(function extractValue([value, _]) {
			return value
		})
		.sort(function sortAscending(a, b) {
			return a - b
		})
}

//?? [EXAMPLE] mode([1, 2, 2, 3, 4]) // [2]
//?? [EXAMPLE] mode([1, 1, 2, 2, 3]) // [1, 2]
//?? [EXAMPLE] mode([]) // []
