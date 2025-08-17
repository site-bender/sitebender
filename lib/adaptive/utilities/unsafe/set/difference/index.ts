/**
 * Returns elements in the first Set but not in the second Set
 * 
 * Performs a set difference operation, returning a new Set containing
 * only the elements from the first Set that don't appear in the second.
 * Uses SameValueZero equality for comparison. This is the Set equivalent
 * of the array difference function.
 * 
 * @compatibility Uses native Set.difference when available (ES2025, ~84% browser support).
 * Falls back to filter-based implementation for older browsers (Opera Mobile, IE).
 * 
 * @curried (subtrahend) => (minuend) => result
 * @param subtrahend - Set of elements to exclude
 * @param minuend - Set to remove elements from
 * @returns New Set with elements from minuend not in subtrahend
 * @example
 * ```typescript
 * // Basic difference
 * difference(new Set([2, 3]))(new Set([1, 2, 3, 4, 5]))
 * // Set { 1, 4, 5 }
 * 
 * // Remove common elements
 * difference(new Set([10, 20, 30]))(new Set([5, 10, 15, 20, 25]))
 * // Set { 5, 15, 25 }
 * 
 * // String Sets
 * difference(new Set(["b", "c"]))(new Set(["a", "b", "c", "d"]))
 * // Set { "a", "d" }
 * 
 * // No common elements (returns original)
 * difference(new Set([4, 5, 6]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 * 
 * // All elements removed
 * difference(new Set([1, 2, 3]))(new Set([1, 2, 3]))
 * // Set { }
 * 
 * // Empty second Set (removes nothing)
 * difference(new Set())(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 * 
 * // Empty first Set
 * difference(new Set([1, 2]))(new Set())
 * // Set { }
 * 
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * difference(new Set([obj2]))(new Set([obj1, obj2, obj3]))
 * // Set { obj1, obj3 }
 * 
 * // Mixed types
 * difference(new Set([2, "2", false]))(new Set([1, 2, "2", 3, false, true]))
 * // Set { 1, 3, true }
 * 
 * // NaN handling
 * difference(new Set([NaN, 2]))(new Set([1, NaN, 2, 3]))
 * // Set { 1, 3 }
 * 
 * // Partial application for blacklisting
 * const removeStopWords = difference(new Set(["the", "a", "an", "and", "or"]))
 * removeStopWords(new Set(["the", "quick", "brown", "fox", "and", "the", "lazy", "dog"]))
 * // Set { "quick", "brown", "fox", "lazy", "dog" }
 * 
 * // Filter invalid values
 * const removeInvalid = difference(new Set([null, undefined, "", 0, false]))
 * removeInvalid(new Set([1, null, 2, undefined, 3, "", 4, 0, 5, false]))
 * // Set { 1, 2, 3, 4, 5 }
 * 
 * // Set operations
 * const setA = new Set([1, 2, 3, 4, 5])
 * const setB = new Set([4, 5, 6, 7, 8])
 * difference(setB)(setA) // A - B
 * // Set { 1, 2, 3 }
 * 
 * // Handle null/undefined gracefully
 * difference(new Set([1, 2]))(null)       // Set { }
 * difference(new Set([1, 2]))(undefined)  // Set { }
 * difference(null)(new Set([1, 2, 3]))    // Set { 1, 2, 3 }
 * difference(undefined)(new Set([1, 2]))  // Set { 1, 2 }
 * 
 * // Symbols
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * difference(new Set([sym2]))(new Set([sym1, sym2, Symbol("c")]))
 * // Set { Symbol(a), Symbol(c) }
 * ```
 * @property Immutable - returns new Set, doesn't modify originals
 * @property Set-operation - treats inputs as mathematical sets
 * @property SameValueZero - uses SameValueZero equality
 */
const difference = <T>(
	subtrahend: Set<T> | null | undefined
) => (
	minuend: Set<T> | null | undefined
): Set<T> => {
	if (minuend == null || !(minuend instanceof Set)) {
		return new Set()
	}
	
	if (subtrahend == null || !(subtrahend instanceof Set) || subtrahend.size === 0) {
		return new Set(minuend)
	}
	
	// Use native Set.difference if available (ES2025)
	if ('difference' in Set.prototype && typeof minuend.difference === 'function') {
		return minuend.difference(subtrahend)
	}
	
	// Fallback: Create new Set with elements not in subtrahend
	const result = new Set<T>()
	for (const element of minuend) {
		if (!subtrahend.has(element)) {
			result.add(element)
		}
	}
	return result
}

export default difference