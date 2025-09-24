import isNullish from "../../validation/isNullish/index.ts"

/**
 * Removes an element from a Set, returning a new Set
 *
 * Creates a new Set containing all elements from the original Set except
 * the specified element. If the element doesn't exist, the returned Set
 * is equivalent to the original. This maintains immutability by not
 * modifying the original Set. Uses SameValueZero equality for comparison.
 *
 * @param element - Element to remove from the Set
 * @param set - Set to remove element from
 * @returns New Set without the specified element
 * @example
 * ```typescript
 * // Basic usage
 * deleteElement(3)(new Set([1, 2, 3, 4]))   // Set { 1, 2, 4 }
 * deleteElement(5)(new Set([1, 2, 3]))      // Set { 1, 2, 3 } (not found)
 * deleteElement("b")(new Set(["a", "b", "c"]))  // Set { "a", "c" }
 *
 * // Edge cases
 * deleteElement(1)(new Set())           // Set { }
 * deleteElement(1)(null)                // Set { }
 * deleteElement(1)(undefined)           // Set { }
 *
 * // Special values
 * deleteElement(NaN)(new Set([1, 2, NaN, 3]))       // Set { 1, 2, 3 }
 * deleteElement(null)(new Set([1, null, undefined])) // Set { 1, undefined }
 *
 * // Composition
 * const numbers = new Set([1, 2, 3, 4, 5])
 * const result = deleteElement(4)(deleteElement(2)(numbers))  // Set { 1, 3, 5 }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const deleteElement = <T>(
	element: T,
) =>
(
	set: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return new Set()
	}

	// Create new Set from original and delete element
	const result = new Set(set)
	result.delete(element)
	return result
}

// Note: Named 'deleteElement' instead of 'delete' because 'delete' is a reserved keyword
export default deleteElement
