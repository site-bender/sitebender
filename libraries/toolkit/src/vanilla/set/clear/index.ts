/**
 * Creates an empty Set of the same type
 *
 * Returns a new empty Set, effectively clearing all elements. This is
 * useful for resetting a Set while maintaining immutability. The type
 * parameter is preserved for type safety.
 *
 * @param set - Set to clear (used only for type inference)
 * @returns New empty Set
 * @example
 * ```typescript
 * // Basic usage
 * clear(new Set([1, 2, 3, 4, 5]))      // Set { }
 * clear(new Set(["a", "b", "c"]))      // Set { }
 * clear(new Set())                     // Set { }
 *
 * // Type preservation
 * const numberSet: Set<number> = new Set([1, 2, 3])
 * const cleared: Set<number> = clear(numberSet)  // Set<number> { }
 *
 * // Edge cases
 * clear(null)       // Set { }
 * clear(undefined)  // Set { }
 *
 * // Use case: Reset state
 * const selectedItems = new Set(["item1", "item2", "item3"])
 * const resetSelection = clear(selectedItems)  // Set { }
 * ```
 * @pure
 * @immutable
 * @safe
 */
const clear = <T>(
	_set: Set<T> | null | undefined,
): Set<T> => {
	// Always return a new empty Set
	// The input is only used for type inference
	return new Set<T>()
}

export default clear
