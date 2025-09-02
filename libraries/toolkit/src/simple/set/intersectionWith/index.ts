import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns elements present in both Sets using a custom equality function
 *
 * Like intersection, but allows you to specify how elements should be compared.
 * This is useful when you need to compare objects by a specific property or
 * use custom logic for equality. The comparator receives elements from both
 * sets and should return true if they are considered equal.
 *
 * @param comparator - Function to determine if elements are equal
 * @param set2 - Second Set to intersect with
 * @param set1 - First Set to intersect
 * @returns New Set with elements present in both Sets (per comparator)
 * @example
 * ```typescript
 * // Compare by id
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * const set1 = new Set([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }])
 * const set2 = new Set([{ id: 2, name: "Robert" }, { id: 3, name: "Charlie" }])
 * intersectionWith(byId)(set2)(set1)  // Set { { id: 2, name: "Bob" } }
 *
 * // Case-insensitive
 * const caseInsensitive = (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * intersectionWith(caseInsensitive)(new Set(["HELLO"]))(new Set(["hello", "world"]))
 * // Set { "hello" }
 *
 * // Edge cases
 * intersectionWith((a, b) => a === b)(new Set())(new Set([1, 2]))  // Set { }
 * intersectionWith((a, b) => a === b)(null)(new Set([1]))         // Set { }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const intersectionWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set1) || !(set1 instanceof Set) || set1.size === 0) {
		return new Set()
	}

	if (isNullish(set2) || !(set2 instanceof Set) || set2.size === 0) {
		return new Set()
	}

	return new Set(
		Array.from(set1).filter((element1) =>
			Array.from(set2).some((element2) => comparator(element1, element2))
		),
	)
}

export default intersectionWith
