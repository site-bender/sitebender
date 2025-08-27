/**
 * Checks if a Map is empty
 *
 * Tests whether a Map has any entries. Returns true if the Map has no
 * key-value pairs, false otherwise. This is more semantic than checking
 * size === 0 and consistent with isEmpty functions for other data types.
 *
 * @param map - The Map to check
 * @returns True if the Map is empty, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isEmpty(new Map())
 * // true
 *
 * isEmpty(new Map([["a", 1]]))
 * // false
 *
 * // After clearing
 * const map = new Map([["x", 10], ["y", 20]])
 * map.clear()
 * isEmpty(map)
 * // true
 *
 * // Guard clause pattern
 * const processMap = (map: Map<string, any>) => {
 *   if (isEmpty(map)) {
 *     return "No data to process"
 *   }
 *   return `Processing ${map.size} entries`
 * }
 *
 * // Conditional operations
 * const cache = new Map()
 * if (isEmpty(cache)) {
 *   cache.set("data", "initial")
 * }
 * ```
 * @predicate
 * @pure
 * @safe
 */
const isEmpty = <K, V>(map: Map<K, V>): boolean => {
	return map.size === 0
}

export default isEmpty