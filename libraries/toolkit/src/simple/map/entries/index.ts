/**
 * Returns an array of [key, value] pairs from a Map
 *
 * Converts a Map to an array of tuples, where each tuple contains a key
 * and its corresponding value. The order of entries follows the Map's
 * insertion order. This is useful for serialization, transformation, or
 * when you need to work with Map data as an array.
 *
 * @param map - The Map to convert to entries
 * @returns Array of [key, value] tuples
 * @example
 * ```typescript
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * entries(map)
 * // [["a", 1], ["b", 2], ["c", 3]]
 *
 * // Different key types
 * const mixed = new Map([["string", "hello"], [1, "number"], [true, "boolean"]])
 * entries(mixed)
 * // [["string", "hello"], [1, "number"], [true, "boolean"]]
 *
 * // Transformation pipeline
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { map as arrayMap } from "../../array/map/index.ts"
 *
 * pipe(
 *   new Map([["Alice", 95], ["Bob", 87], ["Charlie", 92]]),
 *   entries,
 *   arrayMap(([name, score]) => `${name}: ${score}`)
 * )
 * // ["Alice: 95", "Bob: 87", "Charlie: 92"]
 *
 * // Converting to object
 * Object.fromEntries(entries(new Map([["name", "Alice"], ["age", 30]])))
 * // { name: "Alice", age: 30 }
 *
 * // Map to Map transformation
 * const prices = new Map([["apple", 1.99], ["banana", 0.59]])
 * const discounted = new Map(
 *   entries(prices).map(([item, price]) => [item, price * 0.9])
 * )
 * // Map { "apple" => 1.791, "banana" => 0.531 }
 *
 * // Reversing key-value pairs
 * const original = new Map([["a", 1], ["b", 2]])
 * const reversed = new Map(
 *   entries(original).map(([k, v]) => [v, k])
 * )
 * // Map { 1 => "a", 2 => "b" }
 *
 * // Combining with reduce
 * const inventory = new Map([["apples", 10], ["bananas", 5]])
 * const total = entries(inventory).reduce(
 *   (sum, [_, count]) => sum + count,
 *   0
 * )
 * // 15
 * ```
 * @pure Doesn't modify the input Map
 * @immutable Returns new array from Map entries
 * @safe Always returns valid array
 */
const entries = <K, V>(map: Map<K, V>): Array<[K, V]> => {
	return Array.from(map.entries())
}

export default entries
