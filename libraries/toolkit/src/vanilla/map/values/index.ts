/**
 * Returns an array of values from a Map
 *
 * Extracts all values from a Map and returns them as an array. The values
 * are returned in the same order as they appear in the Map's internal
 * iteration order (insertion order for Maps). This function is useful
 * for extracting values for further processing, aggregation, or conversion
 * to other data structures.
 *
 * @curried (map) => result
 * @param map - The Map to extract values from
 * @returns An array containing all values from the Map
 * @example
 * ```typescript
 * // Basic usage
 * const userRoles = new Map([["alice", "admin"], ["bob", "user"]])
 * values(userRoles)  // ["admin", "user"]
 *
 * // Numeric values
 * const scores = new Map([["team1", 95], ["team2", 87], ["team3", 92]])
 * values(scores)  // [95, 87, 92]
 *
 * // Object values
 * const users = new Map([[1, { name: "Alice", age: 30 }]])
 * values(users)  // [{ name: "Alice", age: 30 }]
 *
 * // Empty Map
 * values(new Map())  // []
 *
 * // Using with aggregation
 * const numbers = new Map([["a", 10], ["b", 20], ["c", 30]])
 * const sum = values(numbers).reduce((a, b) => a + b, 0)  // 60
 *
 * // Extract and process values
 * const products = new Map([["p1", { name: "Apple", price: 1.99 }]])
 * const prices = values(products).map(p => p.price)  // [1.99]
 *
 * // Type safety
 * const typed = new Map<string, number>([["a", 1], ["b", 2]])
 * const typedValues: Array<number> = values(typed)  // [1, 2]
 * ```
 * @pure
 */
const values = <K, V>(map: Map<K, V>): Array<V> => {
	return Array.from(map.values())
}

export default values
