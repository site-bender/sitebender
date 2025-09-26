import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Like symmetricDifference but uses a comparator function
 |
 | Computes the symmetric difference of two arrays using a custom comparator
 | function to determine equality. Returns elements that exist in exactly one
 | of the arrays according to the comparator. Useful when you need custom
 | equality logic for objects, deep comparison, or property-based matching.
 */
const symmetricDifferenceWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	// Helper function to remove duplicates based on comparator
	const uniqueBy = (arr: ReadonlyArray<T>): Array<T> =>
		arr.reduce<Array<T>>(
			(acc, item) =>
				acc.some((r) => comparator(r, item)) ? acc : [...acc, item],
			[],
		)

	// Handle null/undefined cases
	if (isNullish(array1) || !Array.isArray(array1)) {
		if (isNullish(array2) || !Array.isArray(array2)) {
			return []
		}
		return uniqueBy(array2)
	}

	if (isNullish(array2) || !Array.isArray(array2)) {
		return uniqueBy(array1)
	}

	// Get elements from array1 not in array2
	const diff1 = array1.filter(
		(item1) => !array2.some((item2) => comparator(item1, item2)),
	)

	// Get elements from array2 not in array1
	const diff2 = array2.filter(
		(item2) => !array1.some((item1) => comparator(item1, item2)),
	)

	// Combine and remove duplicates
	return uniqueBy([...diff1, ...diff2])
}

export default symmetricDifferenceWith

//?? [EXAMPLE] `symmetricDifferenceWith((a: {id: number}, b: {id: number}) => a.id === b.id)([{ id: 1 }, { id: 2 }, { id: 3 }])([{ id: 2 }, { id: 3 }, { id: 4 }]) // [{ id: 1 }, { id: 4 }]`
//?? [EXAMPLE] `symmetricDifferenceWith((a: string, b: string) => a.toLowerCase() === b.toLowerCase())(["Hello", "World"])(["WORLD", "foo"]) // ["Hello", "foo"]`
//?? [EXAMPLE] `symmetricDifferenceWith((a: number, b: number) => Math.abs(a - b) < 0.01)([1.0, 2.0])([2.001, 3.0]) // [1.0, 3.0]`
//?? [EXAMPLE] `symmetricDifferenceWith((a: any, b: any) => a === b)([])([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `symmetricDifferenceWith((a: any, b: any) => a === b)(null)([1, 2]) // [1, 2]`
//?? [EXAMPLE] `symmetricDifferenceWith((a: any, b: any) => a === b)([1, 2])(null) // [1, 2]`
