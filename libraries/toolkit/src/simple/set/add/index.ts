/**
 * Adds an element to a Set, returning a new Set
 * 
 * Creates a new Set containing all elements from the original Set plus
 * the new element. If the element already exists (using SameValueZero
 * equality), the returned Set is equivalent to the original. This
 * maintains immutability by not modifying the original Set.
 * 
 * @curried (element) => (set) => newSet
 * @param element - Element to add to the Set
 * @param set - Set to add element to
 * @returns New Set containing all original elements plus the new element
 * @example
 * ```typescript
 * // Add to Set of numbers
 * add(4)(new Set([1, 2, 3]))
 * // Set { 1, 2, 3, 4 }
 * 
 * // Adding existing element (no change)
 * add(2)(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 * 
 * // Add to empty Set
 * add("hello")(new Set())
 * // Set { "hello" }
 * 
 * // String Sets
 * add("d")(new Set(["a", "b", "c"]))
 * // Set { "a", "b", "c", "d" }
 * 
 * // Object references
 * const obj = { id: 1 }
 * add(obj)(new Set([{ id: 2 }]))
 * // Set { { id: 2 }, { id: 1 } }
 * 
 * // Mixed types
 * add(42)(new Set(["a", true, null]))
 * // Set { "a", true, null, 42 }
 * 
 * // NaN handling (SameValueZero equality)
 * add(NaN)(new Set([1, 2, NaN]))
 * // Set { 1, 2, NaN } (NaN already present)
 * 
 * // Partial application for building Sets
 * const addUser = add({ id: 3, name: "Charlie" })
 * addUser(new Set([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]))
 * // Set { { id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" } }
 * 
 * // Chain additions with pipe
 * const numbers = new Set([1, 2])
 * const add3 = add(3)
 * const add4 = add(4)
 * add4(add3(numbers))
 * // Set { 1, 2, 3, 4 }
 * 
 * // Building unique collections
 * const tags = new Set(["javascript", "functional"])
 * add("immutable")(tags)
 * // Set { "javascript", "functional", "immutable" }
 * 
 * // Handle null/undefined gracefully
 * add(1)(null)       // Set { 1 }
 * add(1)(undefined)  // Set { 1 }
 * 
 * // Add undefined or null as values
 * add(undefined)(new Set([1, 2]))  // Set { 1, 2, undefined }
 * add(null)(new Set([1, 2]))       // Set { 1, 2, null }
 * 
 * // Symbols
 * const sym = Symbol("test")
 * add(sym)(new Set([1, 2, 3]))
 * // Set { 1, 2, 3, Symbol(test) }
 * ```
 * @property Immutable - returns new Set, doesn't modify original
 * @property Idempotent - adding existing element returns equivalent Set
 * @property SameValueZero - uses SameValueZero equality (NaN equals NaN)
 */
const add = <T>(
	element: T
) => (
	set: Set<T> | null | undefined
): Set<T> => {
	if (set == null || !(set instanceof Set)) {
		return new Set([element])
	}
	
	// Create new Set from original and add element
	const result = new Set(set)
	result.add(element)
	return result
}

export default add