import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns a Set containing all unique elements from both Sets using custom equality
 *
 * Performs a union operation using a custom equality function to determine
 * element uniqueness. When elements are considered equal by the comparator,
 * the element from the first Set is kept in the result.
 *
 * @pure
 * @immutable
 * @curried
 * @safe Returns appropriate Set for null/undefined inputs
 * @param equals - Function to test element equality (a, b) => boolean
 * @param set2 - Second Set to union with
 * @param set1 - First Set to union
 * @returns New Set containing all unique elements per custom equality
 * @example
 * // Case-insensitive union
 * unionWith(
 *   (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * )(new Set(["WORLD", "FOO"]))(new Set(["hello", "world"]))
 * // Set { "hello", "world", "FOO" }
 *
 * // Object property comparison
 * interface User { id: number; name: string }
 * unionWith(
 *   (a: User, b: User) => a.id === b.id
 * )(
 *   new Set([{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }])
 * )(
 *   new Set([{ id: 1, name: "Alice" }, { id: 2, name: "Robert" }])
 * )
 * // Set { { id: 1, name: "Alice" }, { id: 2, name: "Robert" }, { id: 3, name: "Charlie" } }
 *
 * // Numeric tolerance
 * unionWith(
 *   (a: number, b: number) => Math.abs(a - b) < 0.1
 * )(new Set([1.05, 2.0, 3.0]))(new Set([1.0, 2.5, 4.0]))
 * // Set { 1.0, 2.5, 4.0, 2.0, 3.0 } (1.0≈1.05 considered equal)
 *
 * // Partial application
 * const caseInsensitiveUnion = unionWith(
 *   (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * )
 * caseInsensitiveUnion(new Set(["apple", "Cherry"]))(new Set(["Apple", "Banana"]))
 * // Set { "Apple", "Banana", "Cherry" }
 *
 * // Empty or nullish
 * unionWith(
 *   (a: number, b: number) => a === b
 * )(new Set())(new Set([1, 2, 3])) // Set { 1, 2, 3 }
 * unionWith(
 *   (a: number, b: number) => a === b
 * )(new Set([1, 2]))(null) // Set { 1, 2 }
 */
const unionWith = <T>(
	equals: (a: T, b: T) => boolean,
) =>
(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set1) || !(set1 instanceof Set)) {
		if (isNullish(set2) || !(set2 instanceof Set)) {
			return new Set()
		}
		return new Set(set2)
	}

	if (isNullish(set2) || !(set2 instanceof Set)) {
		return new Set(set1)
	}

	// Pure FP: Build result with reduce, checking for duplicates
	const arr1 = Array.from(set1)
	const arr2 = Array.from(set2)

	// Filter set2 elements that don't have equals in set1
	const uniqueFromSet2 = arr2.filter(
		(elem2) => !arr1.some((elem1) => equals(elem2, elem1)),
	)

	return new Set([...arr1, ...uniqueFromSet2])
}

export default unionWith
