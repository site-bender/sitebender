import isNullish from "../../predicates/isNullish/index.ts"

//++ Union with custom comparator
const unionWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	// Handle null/undefined cases
	if (isNullish(array1)) {
		if (isNullish(array2)) {
			return []
		}
		// Remove duplicates from array2 using comparator
		return array2.reduce<Array<T>>(
			(acc, item) =>
				acc.some((r) => comparator(r, item)) ? acc : [...acc, item],
			[],
		)
	}

	if (isNullish(array2)) {
		// Remove duplicates from array1 using comparator
		return array1.reduce<Array<T>>(
			(acc, item) =>
				acc.some((r) => comparator(r, item)) ? acc : [...acc, item],
			[],
		)
	}

	// Recursively build unique array from both inputs
	const buildUnion = (
		items: ReadonlyArray<T>,
		acc: Array<T>,
	): Array<T> => {
		if (items.length === 0) {
			return acc
		}

		const [head, ...tail] = items
		const hasMatch = acc.some((existing) => comparator(existing, head))

		return buildUnion(
			tail,
			hasMatch ? acc : [...acc, head],
		)
	}

	// Start with array1, then add unique items from array2
	const withFirstArray = buildUnion(array1, [])
	return buildUnion(array2, withFirstArray)
}

export default unionWith
