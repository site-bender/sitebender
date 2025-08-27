/**
 * Returns the size of a Map
 *
 * Gets the number of key-value pairs in a Map. This is a simple accessor
 * function that returns the Map's size property. Useful in functional
 * pipelines where you need the size as a value for further processing,
 * conditionals, or aggregations.
 *
 * @param map - The Map to get the size of
 * @returns The number of entries in the Map
 * @example
 * ```typescript
 * // Basic usage
 * const scores = new Map([
 *   ["Alice", 85],
 *   ["Bob", 92],
 *   ["Charlie", 78]
 * ])
 * size(scores)
 * // 3
 *
 * // Empty Map
 * size(new Map())
 * // 0
 *
 * // After operations
 * const initial = new Map([["a", 1], ["b", 2]])
 * const withAdded = set("c")(3)(initial)
 * size(withAdded)
 * // 3
 *
 * // Conditional logic
 * const isEmpty = <K, V>(map: Map<K, V>): boolean => size(map) === 0
 * const data = new Map([["x", 10], ["y", 20]])
 * isEmpty(data) // false
 *
 * // Size validation
 * const validateSize = (min: number, max: number) => <K, V>(map: Map<K, V>) => {
 *   const s = size(map)
 *   return s >= min && s <= max
 * }
 * const isValidSmall = validateSize(1, 5)
 * const small = new Map([["a", 1], ["b", 2]])
 * isValidSmall(small) // true
 * ```
 * @pure
 * @safe
 */
const size = <K, V>(map: Map<K, V>): number => {
	return map.size
}

export default size
