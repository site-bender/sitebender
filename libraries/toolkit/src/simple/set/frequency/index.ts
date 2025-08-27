/**
 * Returns Map with element frequencies (always 1 for sets)
 *
 * Creates a frequency map from a Set's elements. Since Sets only contain
 * unique values, each element will always have a frequency of 1. This
 * function exists for API consistency with array and object frequency
 * functions and can be useful when working with generic collection types.
 *
 * @param set - The Set to analyze
 * @returns Map with elements as keys and counts as values (always 1)
 * @example
 * ```typescript
 * // Basic usage
 * frequency(new Set([1, 2, 3]))        // Map { 1 => 1, 2 => 1, 3 => 1 }
 * frequency(new Set(["a", "b", "c"]))  // Map { "a" => 1, "b" => 1, "c" => 1 }
 * frequency(new Set())                 // Map {}
 *
 * // Mixed types
 * frequency(new Set([1, "1", true]))   // Map { 1 => 1, "1" => 1, true => 1 }
 *
 * // Set from array with duplicates
 * const arr = [1, 1, 2, 2, 3, 3]
 * frequency(new Set(arr))              // Map { 1 => 1, 2 => 1, 3 => 1 }
 *
 * // Convert to object
 * const counts = Object.fromEntries(frequency(new Set(["a", "b", "c"])))
 * // { a: 1, b: 1, c: 1 }
 * ```
 * @pure
 * @immutable
 */
const frequency = <T>(set: Set<T>): Map<T, number> => {
	return new Map(Array.from(set).map(item => [item, 1]))
}

export default frequency
