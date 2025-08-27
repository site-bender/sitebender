/**
 * Maps a function over the values of a Map
 *
 * Transforms each value in a Map by applying a function to it, creating
 * a new Map with the same keys but transformed values. The mapping function
 * receives both the value and key for each entry, allowing transformations
 * that can use key context. This is the fundamental operation for value
 * transformation while preserving the Map's structure.
 *
 * @curried (fn) => (map) => result
 * @param fn - Function to transform each value
 * @param map - The Map to transform
 * @returns A new Map with transformed values
 * @example
 * ```typescript
 * // Basic value transformation
 * const prices = new Map([
 *   ["apple", 1.99],
 *   ["banana", 0.59],
 *   ["orange", 2.49]
 * ])
 * const doublePrices = map((price: number) => price * 2)
 * doublePrices(prices)
 * // Map { "apple" => 3.98, "banana" => 1.18, "orange" => 4.98 }
 *
 * // Transform using both value and key
 * const inventory = new Map([["apple", 10], ["banana", 5]])
 * map((count: number, item: string) => `${count} ${item}s`)(inventory)
 * // Map { "apple" => "10 apples", "banana" => "5 bananas" }
 *
 * // Object value transformation
 * const users = new Map([
 *   [1, { name: "Alice", age: 30 }],
 *   [2, { name: "Bob", age: 25 }]
 * ])
 * map((user: any) => ({ ...user, age: user.age + 1 }))(users)
 * // Map { 1 => {name:"Alice", age:31}, 2 => {name:"Bob", age:26} }
 *
 * // String transformation
 * const codes = new Map([["US", "united states"], ["UK", "united kingdom"]])
 * map((name: string) => name.toUpperCase())(codes)
 * // Map { "US" => "UNITED STATES", "UK" => "UNITED KINGDOM" }
 *
 * // Empty Map
 * map((v: any) => v * 2)(new Map())
 * // Map {}
 * ```
 * @curried
 * @pure
 * @immutable
 */
const map = <K, V, R>(
	fn: (value: V, key: K) => R,
) =>
(map: Map<K, V>): Map<K, R> => {
	const result = new Map<K, R>()
	for (const [key, value] of map) {
		result.set(key, fn(value, key))
	}
	return result
}

export default map