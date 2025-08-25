/**
 * Removes an element from a Set, returning a new Set
 *
 * Creates a new Set containing all elements from the original Set except
 * the specified element. If the element doesn't exist, the returned Set
 * is equivalent to the original. This maintains immutability by not
 * modifying the original Set. Uses SameValueZero equality for comparison.
 *
 * @curried (element) => (set) => newSet
 * @param element - Element to remove from the Set
 * @param set - Set to remove element from
 * @returns New Set without the specified element
 * @example
 * ```typescript
 * // Remove from Set of numbers
 * deleteElement(3)(new Set([1, 2, 3, 4]))
 * // Set { 1, 2, 4 }
 *
 * // Remove non-existent element (no change)
 * deleteElement(5)(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 *
 * // Remove from single-element Set
 * deleteElement("hello")(new Set(["hello"]))
 * // Set { }
 *
 * // String Sets
 * deleteElement("b")(new Set(["a", "b", "c"]))
 * // Set { "a", "c" }
 *
 * // Object references (requires exact reference)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * deleteElement(obj1)(new Set([obj1, obj2]))
 * // Set { { id: 2 } }
 *
 * // Note: different reference doesn't match
 * deleteElement({ id: 1 })(new Set([{ id: 1 }, { id: 2 }]))
 * // Set { { id: 1 }, { id: 2 } } (no match - different objects)
 *
 * // Mixed types
 * deleteElement(true)(new Set([1, "two", true, null]))
 * // Set { 1, "two", null }
 *
 * // NaN handling (SameValueZero equality)
 * deleteElement(NaN)(new Set([1, 2, NaN, 3]))
 * // Set { 1, 2, 3 }
 *
 * // Remove null or undefined
 * deleteElement(null)(new Set([1, null, undefined]))
 * // Set { 1, undefined }
 *
 * deleteElement(undefined)(new Set([1, null, undefined]))
 * // Set { 1, null }
 *
 * // Partial application for filtering
 * const removeAdmin = deleteElement("admin")
 * removeAdmin(new Set(["user", "admin", "moderator"]))
 * // Set { "user", "moderator" }
 *
 * // Chain deletions
 * const numbers = new Set([1, 2, 3, 4, 5])
 * const remove2 = deleteElement(2)
 * const remove4 = deleteElement(4)
 * remove4(remove2(numbers))
 * // Set { 1, 3, 5 }
 *
 * // Blacklist implementation
 * const blacklisted = deleteElement("spam@example.com")
 * blacklisted(new Set(["user@example.com", "spam@example.com", "admin@example.com"]))
 * // Set { "user@example.com", "admin@example.com" }
 *
 * // Handle null/undefined gracefully
 * deleteElement(1)(null)       // Set { }
 * deleteElement(1)(undefined)  // Set { }
 *
 * // Symbols
 * const sym = Symbol("test")
 * deleteElement(sym)(new Set([1, 2, sym, 3]))
 * // Set { 1, 2, 3 }
 *
 * // Empty Set
 * deleteElement(1)(new Set())
 * // Set { }
 * ```
 * @property Immutable - returns new Set, doesn't modify original
 * @property Safe - removing non-existent element returns equivalent Set
 * @property SameValueZero - uses SameValueZero equality (NaN equals NaN)
 */
const deleteElement = <T>(
	element: T,
) =>
(
	set: Set<T> | null | undefined,
): Set<T> => {
	if (set == null || !(set instanceof Set)) {
		return new Set()
	}

	// Create new Set from original and delete element
	const result = new Set(set)
	result.delete(element)
	return result
}

// Note: Named 'deleteElement' instead of 'delete' because 'delete' is a reserved keyword
export default deleteElement
