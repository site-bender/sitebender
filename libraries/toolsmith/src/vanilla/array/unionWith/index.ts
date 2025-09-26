import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Like union but uses a comparator function
 |
 | Combines two arrays and returns all unique elements using a custom
 | comparator function to determine equality. Removes duplicates within
 | and across arrays based on the comparator. Useful when you need custom
 | equality logic for objects, deep comparison, or property-based matching.
 */
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

//?? [EXAMPLE] `unionWith((a: {id: number}, b: {id: number}) => a.id === b.id)([{ id: 1 }, { id: 2 }])([{ id: 2 }, { id: 3 }]) // [{ id: 1 }, { id: 2 }, { id: 3 }]`
//?? [EXAMPLE] `unionWith((a: string, b: string) => a.toLowerCase() === b.toLowerCase())(["Hello", "World"])(["WORLD", "foo"]) // ["Hello", "World", "foo"]`
//?? [EXAMPLE] `unionWith((a: number, b: number) => Math.abs(a - b) < 0.01)([1.0, 2.0, 3.0])([2.001, 3.0, 4.0]) // [1.0, 2.0, 3.0, 4.0]`
//?? [EXAMPLE] `unionWith((a: any, b: any) => a === b)([])([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `unionWith((a: any, b: any) => a === b)(null)([1, 2]) // [1, 2]`
//?? [EXAMPLE] `unionWith((a: any, b: any) => a === b)([1, 1, 2])([2, 3, 3]) // [1, 2, 3]`
