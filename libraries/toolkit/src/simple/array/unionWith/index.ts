import isNullish from "../../validation/isNullish/index.ts"

/**
 * Like union but uses a comparator function
 *
 * Combines two arrays and returns all unique elements using a custom
 * comparator function to determine equality. Removes duplicates within
 * and across arrays based on the comparator. Useful when you need custom
 * equality logic for objects, deep comparison, or property-based matching.
 *
 * @curried
 * @pure
 * @immutable
 * @safe
 * @param comparator - Function to compare elements (a, b) => boolean
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Array containing all unique elements from both arrays
 * @example
 * ```typescript
 * // Basic usage with custom equality
 * const eqById = (a: any, b: any) => a.id === b.id
 * const arr1 = [{ id: 1 }, { id: 2 }]
 * const arr2 = [{ id: 2 }, { id: 3 }]
 * unionWith(eqById)(arr1)(arr2)
 * // [{ id: 1 }, { id: 2 }, { id: 3 }]
 *
 * // Case-insensitive string comparison
 * const eqIgnoreCase = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * unionWith(eqIgnoreCase)(["Hello", "World"])(["WORLD", "foo"])
 * // ["Hello", "World", "foo"]
 *
 * // Deep object comparison
 * const deepEqual = (a: any, b: any) =>
 *   JSON.stringify(a) === JSON.stringify(b)
 * const configs1 = [{ settings: { theme: "dark" } }]
 * const configs2 = [{ settings: { theme: "dark" } }, { settings: { theme: "light" } }]
 * unionWith(deepEqual)(configs1)(configs2)
 * // [{ settings: { theme: "dark" } }, { settings: { theme: "light" } }]
 *
 * // Numeric tolerance comparison
 * const almostEqual = (a: number, b: number) =>
 *   Math.abs(a - b) < 0.01
 * unionWith(almostEqual)([1.0, 2.0, 3.0])([2.001, 3.0, 4.0])
 * // [1.0, 2.0, 3.0, 4.0] (2.0 and 2.001 considered equal)
 *
 * // Empty arrays and null handling
 * const eq = (a: any, b: any) => a === b
 * unionWith(eq)([])([1, 2, 3])  // [1, 2, 3]
 * unionWith(eq)(null)([1, 2])  // [1, 2]
 *
 * // Partial application for reusable unions
 * const unionById = unionWith((a: any, b: any) => a.id === b.id)
 * const data1 = [{ id: 1, val: "a" }, { id: 2, val: "b" }]
 * const data2 = [{ id: 2, val: "c" }, { id: 3, val: "d" }]
 * unionById(data1)(data2)
 * // [{ id: 1, val: "a" }, { id: 2, val: "b" }, { id: 3, val: "d" }]
 * ```
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
	if (isNullish(array1) || !Array.isArray(array1)) {
		if (isNullish(array2) || !Array.isArray(array2)) {
			return []
		}
		// Remove duplicates from array2 using comparator
		return array2.reduce<Array<T>>(
			(acc, item) =>
				acc.some((r) => comparator(r, item)) ? acc : [...acc, item],
			[],
		)
	}

	if (isNullish(array2) || !Array.isArray(array2)) {
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
