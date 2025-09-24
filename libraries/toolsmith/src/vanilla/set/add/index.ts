import isNullish from "../../validation/isNullish/index.ts"

/**
 * Adds an element to a Set, returning a new Set
 *
 * Creates a new Set containing all elements from the original Set plus
 * the new element. If the element already exists (using SameValueZero
 * equality), the returned Set is equivalent to the original. This
 * maintains immutability by not modifying the original Set.
 *
 * @param element - Element to add to the Set
 * @param set - Set to add element to
 * @returns New Set containing all original elements plus the new element
 * @example
 * ```typescript
 * // Basic usage
 * add(4)(new Set([1, 2, 3]))  // Set { 1, 2, 3, 4 }
 * add(2)(new Set([1, 2, 3]))  // Set { 1, 2, 3 } (already exists)
 *
 * // Edge cases
 * add("hello")(new Set())    // Set { "hello" }
 * add(1)(null)               // Set { 1 }
 * add(1)(undefined)          // Set { 1 }
 *
 * // Different types
 * add("d")(new Set(["a", "b", "c"]))        // Set { "a", "b", "c", "d" }
 * add(42)(new Set(["a", true, null]))       // Set { "a", true, null, 42 }
 * add(NaN)(new Set([1, 2, NaN]))            // Set { 1, 2, NaN }
 *
 * // Composition
 * const numbers = new Set([1, 2])
 * const result = add(4)(add(3)(numbers))    // Set { 1, 2, 3, 4 }
 * ```
 * @pure
 * @immutable
 * @curried
 * @idempotent
 */
const add = <T>(
	element: T,
) =>
(
	set: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return new Set([element])
	}

	// Create new Set from original and add element
	const result = new Set(set)
	result.add(element)
	return result
}

export default add
