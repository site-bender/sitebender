import isNullish from "../../validation/isNullish/index.ts"

/**
 * Maps a function over Set elements, returning a new Set
 *
 * Applies a transformation function to each element in the Set, creating
 * a new Set with the transformed values. If the transformation produces
 * duplicate values, only one instance is kept (Set uniqueness is maintained).
 *
 * @pure
 * @immutable
 * @curried
 * @safe Returns an empty Set for null/undefined inputs
 * @param fn - Function to transform each element
 * @param set - Set to transform
 * @returns New Set with transformed elements
 * @example
 * // Basic transformation
 * map((x: number) => x * 2)(new Set([1, 2, 3])) // Set { 2, 4, 6 }
 *
 * // Deduping result values
 * map((x: number) => Math.floor(x / 2))(new Set([1, 2, 3, 4])) // Set { 0, 1, 2 }
 *
 * // Type conversion
 * map((n: number) => n.toString())(new Set([1, 2])) // Set { "1", "2" }
 *
 * // Object property extraction
 * map((u: { id: number; name: string }) => u.name)(
 *   new Set([{ id: 1, name: "A" }, { id: 2, name: "B" }, { id: 3, name: "A" }])
 * ) // Set { "A", "B" }
 *
 * // Boolean mapping
 * map((x: number) => x > 2)(new Set([1, 2, 3])) // Set { false, true }
 *
 * // Partial application
 * const double = map((x: number) => x * 2)
 * double(new Set([2, 4])) // Set { 4, 8 }
 *
 * // Empty or nullish
 * map((x: number) => x * 2)(new Set()) // Set {}
 * map((x: number) => x * 2)(null) // Set {}
 */
const map = <T, U>(fn: (value: T) => U) =>
(
	set: Set<T> | null | undefined,
): Set<U> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return new Set<U>()
	}
	// Functional, no loops: map values during Array.from and build a new Set
	return new Set<U>(Array.from(set, fn))
}

export default map
