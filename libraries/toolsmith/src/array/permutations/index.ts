import isNullish from "../../validation/isNullish/index.ts"

//++ Generates all permutations
const permutations = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (isNullish(array)) {
		return [[]]
	}

	if (array.length === 0) {
		return [[]]
	}

	if (array.length === 1) {
		return [[...array]]
	}

	// Build permutations recursively
	// For each element, make it the first element and permute the rest
	const buildPermutations = (
		elements: ReadonlyArray<T>,
	): Array<Array<T>> => {
		if (elements.length <= 1) {
			return [[...elements]]
		}

		// Use reduce to build all permutations
		return elements.reduce<Array<Array<T>>>((acc, element, index) => {
			// Remove current element from array
			const remaining = [
				...elements.slice(0, index),
				...elements.slice(index + 1),
			]

			// Get all permutations of remaining elements
			const remainingPerms = buildPermutations(remaining)

			// Add current element to front of each permutation
			const currentPerms = remainingPerms.map((
				perm,
			) => [element, ...perm])

			return [...acc, ...currentPerms]
		}, [])
	}

	return buildPermutations(array)
}

export default permutations
