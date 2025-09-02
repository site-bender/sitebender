import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns elements in the first Set but not in the second, using a custom equality function
 *
 * Like difference, but allows you to specify how elements should be compared.
 * This is useful when you need to compare objects by a specific property
 * or use custom logic for equality. The comparator function receives elements
 * from both sets and should return true if they are considered equal.
 *
 * @param comparator - Function to determine if elements are equal
 * @param subtrahend - Set of elements to exclude
 * @param minuend - Set to remove elements from
 * @returns New Set with elements from minuend not in subtrahend (per comparator)
 * @example
 * ```typescript
 * // Compare objects by id
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * const subtract = new Set([{ id: 2, name: "Bob" }])
 * const from = new Set([{ id: 1, name: "Alice" }, { id: 2, name: "Robert" }])
 * differenceWith(byId)(subtract)(from)  // Set { { id: 1, name: "Alice" } }
 *
 * // Case-insensitive comparison
 * const caseInsensitive = (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * differenceWith(caseInsensitive)(new Set(["HELLO"]))(new Set(["hello", "world"]))
 * // Set { "world" }
 *
 * // Edge cases
 * differenceWith((a, b) => a === b)(new Set())(new Set([1, 2, 3]))  // Set { 1, 2, 3 }
 * differenceWith((a, b) => a === b)(new Set([1]))(null)            // Set { }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const differenceWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	subtrahend: Set<T> | null | undefined,
) =>
(
	minuend: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(minuend) || !(minuend instanceof Set)) {
		return new Set()
	}

	if (
		isNullish(subtrahend) || !(subtrahend instanceof Set) ||
		subtrahend.size === 0
	) {
		return new Set(minuend)
	}

	// Build result with elements not matching any in subtrahend
	return new Set(
		Array.from(minuend).filter(
			(element) =>
				!Array.from(subtrahend).some((excludeElement) =>
					comparator(element, excludeElement)
				),
		),
	)
}

export default differenceWith
