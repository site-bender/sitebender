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
 * // Clear a Set of numbers
 * clear(new Set([1, 2, 3, 4, 5]))
 * // Set { }
 *
 * // Clear a Set of strings
 * clear(new Set(["a", "b", "c"]))
 * // Set { }
 *
 * // Already empty Set
 * clear(new Set())
 * // Set { }
 *
 * // Clear Set with objects
 * clear(new Set([{ id: 1 }, { id: 2 }]))
 * // Set { }
 *
 * // Type preservation
 * const numberSet: Set<number> = new Set([1, 2, 3])
 * const cleared: Set<number> = clear(numberSet)
 * // cleared is Set<number> { }
 *
 * // Mixed types
 * clear(new Set([1, "two", true, null]))
 * // Set { }
 *
 * // Use case: Reset state
 * const selectedItems = new Set(["item1", "item2", "item3"])
 * const resetSelection = clear(selectedItems)
 * // Set { }
 *
 * // Use case: Filter pipeline
 * const data = new Set([1, 2, 3, 4, 5])
 * const filtered = data.size > 10 ? data : clear(data)
 * // Set { } (since size is 5)
 *
 * // Handle null/undefined gracefully
 * clear(null)       // Set { }
 * clear(undefined)  // Set { }
 *
 * // Symbols and special values
 * clear(new Set([Symbol("test"), NaN, undefined, null]))
 * // Set { }
 *
 * // Use with conditional logic
 * const errors = new Set(["error1", "error2"])
 * const errorsAfterFix = hasErrors ? errors : clear(errors)
 *
 * // Chain with other operations
 * const items = new Set([1, 2, 3])
 * const processedItems = shouldReset ? clear(items) : items
 * // Conditionally clear
 * ```
 * @property Immutable - returns new Set, doesn't modify original
 * @property Type-safe - preserves the type parameter of the original Set
 * @property Constant - always returns empty Set regardless of input
 */
const clear = <T>(
	_set: Set<T> | null | undefined,
): Set<T> => {
	// Always return a new empty Set
	// The input is only used for type inference
	return new Set<T>()
}

export default clear
