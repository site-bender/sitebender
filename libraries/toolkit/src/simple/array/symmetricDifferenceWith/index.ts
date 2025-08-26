/**
 * Like symmetricDifference but uses a comparator function
 *
 * Computes the symmetric difference of two arrays using a custom comparator
 * function to determine equality. Returns elements that exist in exactly one
 * of the arrays according to the comparator. Useful when you need custom
 * equality logic for objects, deep comparison, or property-based matching.
 *
 * @param comparator - Function to compare elements (a, b) => boolean
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Array of elements in either array but not both (per comparator)
 * @example
 * ```typescript
 * // Basic usage with custom equality
 * const eqById = (a: any, b: any) => a.id === b.id
 * const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }]
 * const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }]
 * symmetricDifferenceWith(eqById)(arr1)(arr2)  // [{ id: 1 }, { id: 4 }]
 *
 * // Case-insensitive string comparison
 * const eqIgnoreCase = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * symmetricDifferenceWith(eqIgnoreCase)(["Hello", "World"])(["WORLD", "foo"])
 * // ["Hello", "foo"]
 *
 * // Compare by property
 * const eqByName = (a: any, b: any) => a.name === b.name
 * const team1 = [{ name: "Alice", role: "dev" }, { name: "Bob", role: "mgr" }]
 * const team2 = [{ name: "Bob", role: "lead" }, { name: "Charlie", role: "dev" }]
 * symmetricDifferenceWith(eqByName)(team1)(team2)
 * // [{ name: "Alice", role: "dev" }, { name: "Charlie", role: "dev" }]
 *
 * // Numeric tolerance comparison
 * const almostEqual = (a: number, b: number) => Math.abs(a - b) < 0.01
 * symmetricDifferenceWith(almostEqual)([1.0, 2.0])([2.001, 3.0])
 * // [1.0, 3.0] (2.0 and 2.001 considered equal)
 *
 * // Empty arrays and null handling
 * const eq = (a: any, b: any) => a === b
 * symmetricDifferenceWith(eq)([])([1, 2, 3])      // [1, 2, 3]
 * symmetricDifferenceWith(eq)(null)([1, 2])       // [1, 2]
 * symmetricDifferenceWith(eq)([1, 2])(undefined)  // [1, 2]
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
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
			[]
		)

	// Handle null/undefined cases
	if (array1 == null || !Array.isArray(array1)) {
		if (array2 == null || !Array.isArray(array2)) {
			return []
		}
		return uniqueBy(array2)
	}

	if (array2 == null || !Array.isArray(array2)) {
		return uniqueBy(array1)
	}

	// Get elements from array1 not in array2
	const diff1 = array1.filter(
		(item1) => !array2.some((item2) => comparator(item1, item2))
	)
	
	// Get elements from array2 not in array1
	const diff2 = array2.filter(
		(item2) => !array1.some((item1) => comparator(item1, item2))
	)
	
	// Combine and remove duplicates
	return uniqueBy([...diff1, ...diff2])
}

export default symmetricDifferenceWith
