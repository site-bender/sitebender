import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns elements in either Set but not both, using custom equality
 *
 * Performs a symmetric difference operation (XOR for sets) using a custom
 * equality function to determine element equivalence. Returns a new Set
 * containing elements that appear in exactly one of the two Sets according
 * to the custom equality test. Elements that are considered equal by the
 * comparator are excluded from the result.
 *
 * @pure
 * @immutable
 * @curried
 * @safe Returns appropriate Set for null/undefined inputs
 * @param equals - Function to test element equality (a, b) => boolean
 * @param set2 - Second Set to compare
 * @param set1 - First Set to compare
 * @returns New Set with elements in exactly one Set per custom equality
 * @example
 * // Case-insensitive symmetric difference
 * symmetricDifferenceWith(
 *   (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * )(new Set(["WORLD", "FOO"]))(new Set(["hello", "world"]))
 * // Set { "hello", "FOO" } ("world"/"WORLD" excluded as equal)
 *
 * // Object property comparison
 * interface User { id: number; name: string }
 * symmetricDifferenceWith(
 *   (a: User, b: User) => a.id === b.id
 * )(
 *   new Set([{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }])
 * )(
 *   new Set([{ id: 1, name: "Alice" }, { id: 2, name: "Robert" }])
 * )
 * // Set { { id: 1, name: "Alice" }, { id: 3, name: "Charlie" } }
 *
 * // Numeric tolerance
 * symmetricDifferenceWith(
 *   (a: number, b: number) => Math.abs(a - b) < 0.1
 * )(new Set([1.05, 2.0, 3.0]))(new Set([1.0, 2.5, 4.0]))
 * // Set { 2.5, 3.0, 4.0 } (1.0≈1.05)
 *
 * // Partial application
 * const caseInsensitiveXor = symmetricDifferenceWith(
 *   (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * )
 * caseInsensitiveXor(new Set(["apple", "Cherry"]))(new Set(["Apple", "Banana"]))
 * // Set { "Banana", "Cherry" }
 *
 * // Empty or nullish
 * symmetricDifferenceWith(
 *   (a: number, b: number) => a === b
 * )(new Set())(new Set([1, 2, 3])) // Set { 1, 2, 3 }
 * symmetricDifferenceWith(
 *   (a: number, b: number) => a === b
 * )(new Set([1, 2]))(null) // Set { 1, 2 }
 */
const symmetricDifferenceWith = <T>(
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

	// Pure FP: use filter with Array.some for custom equality
	const arr1 = Array.from(set1)
	const arr2 = Array.from(set2)

	const onlyInSet1 = arr1.filter(
		(elem1) => !arr2.some((elem2) => equals(elem1, elem2)),
	)
	const onlyInSet2 = arr2.filter(
		(elem2) => !arr1.some((elem1) => equals(elem2, elem1)),
	)

	return new Set([...onlyInSet1, ...onlyInSet2])
}

export default symmetricDifferenceWith
