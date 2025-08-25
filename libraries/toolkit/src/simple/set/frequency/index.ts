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
 * // Basic frequency (always 1 for each element)
 * frequency(new Set([1, 2, 3]))
 * // Map { 1 => 1, 2 => 1, 3 => 1 }
 *
 * // String set
 * frequency(new Set(["a", "b", "c"]))
 * // Map { "a" => 1, "b" => 1, "c" => 1 }
 *
 * // Empty set
 * frequency(new Set())
 * // Map {}
 *
 * // Mixed types
 * frequency(new Set([1, "1", true]))
 * // Map { 1 => 1, "1" => 1, true => 1 }
 *
 * // Set created from array with duplicates
 * const arr = [1, 1, 2, 2, 3, 3]
 * frequency(new Set(arr))
 * // Map { 1 => 1, 2 => 1, 3 => 1 }
 * // Note: Original duplicates are removed by Set
 *
 * // Comparing with array frequency
 * import { frequency as arrayFrequency } from "../array/frequency"
 * const data = [1, 2, 2, 3, 3, 3]
 * const arrayFreq = arrayFrequency(data)
 * // Map { 1 => 1, 2 => 2, 3 => 3 }
 * const setFreq = frequency(new Set(data))
 * // Map { 1 => 1, 2 => 1, 3 => 1 }
 *
 * // Use case: Checking if collection has duplicates
 * function hasDuplicates<T>(items: Array<T>): boolean {
 *   const setFreq = frequency(new Set(items))
 *   const arrayFreq = arrayFrequency(items)
 *   return setFreq.size !== arrayFreq.size
 * }
 *
 * // Use case: Normalizing frequencies
 * function normalizeFrequencies<T>(collection: Array<T> | Set<T>): Map<T, number> {
 *   if (collection instanceof Set) {
 *     return frequency(collection)
 *   }
 *   return arrayFrequency(collection)
 * }
 *
 * // Boolean set
 * frequency(new Set([true, false]))
 * // Map { true => 1, false => 1 }
 *
 * // Null and undefined
 * frequency(new Set([null, undefined, 0]))
 * // Map { null => 1, undefined => 1, 0 => 1 }
 *
 * // Object references
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * frequency(new Set([obj1, obj2]))
 * // Map { {id:1} => 1, {id:2} => 1 }
 *
 * // Converting to object for uniform counts
 * const uniformCounts = Object.fromEntries(
 *   frequency(new Set(["a", "b", "c"]))
 * )
 * // { a: 1, b: 1, c: 1 }
 *
 * // Use in generic function
 * function processCollection<T>(items: Set<T> | Array<T>): Map<T, number> {
 *   if (items instanceof Set) {
 *     return frequency(items)  // All 1s
 *   }
 *   // Would use array frequency for actual counts
 *   return new Map()
 * }
 *
 * // Symbol handling
 * const sym1 = Symbol("test")
 * const sym2 = Symbol("test")
 * frequency(new Set([sym1, sym2]))
 * // Map { Symbol(test) => 1, Symbol(test) => 1 }
 *
 * // Large set
 * const largeSet = new Set(Array.from({ length: 1000 }, (_, i) => i))
 * const freq = frequency(largeSet)
 * // Map with 1000 entries, all with value 1
 * freq.get(500)  // 1
 *
 * // Chaining with other operations
 * const words = new Set(["hello", "world", "test"])
 * const lengths = new Set([...words].map(w => w.length))
 * frequency(lengths)
 * // Map { 5 => 1, 4 => 1 }  // "hello" and "world" have 5, "test" has 4
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input set
 * @property Consistent - Always returns 1 for each element
 */
const frequency = <T>(set: Set<T>): Map<T, number> => {
	const freq = new Map<T, number>()
	for (const item of set) {
		freq.set(item, 1)
	}
	return freq
}

export default frequency
