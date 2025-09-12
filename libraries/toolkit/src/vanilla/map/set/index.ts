/**
 * Sets a key-value pair in a Map
 *
 * Creates a new Map with the specified key-value pair added or updated.
 * If the key already exists, its value is replaced. This maintains
 * immutability by returning a new Map instance rather than modifying
 * the original. Useful for functional updates in state management and
 * data transformations.
 *
 * @param key - The key to set
 * @param value - The value to associate with the key
 * @param map - The Map to update
 * @returns A new Map with the key-value pair set
 * @example
 * ```typescript
 * // Basic usage - add new entry
 * const scores = new Map([["Alice", 85], ["Bob", 92]])
 * set("Charlie")(78)(scores)
 * // Map { "Alice" => 85, "Bob" => 92, "Charlie" => 78 }
 *
 * // Update existing entry
 * const updated = set("Alice")(90)(scores)
 * // Map { "Alice" => 90, "Bob" => 92 }
 * // Original scores Map unchanged
 *
 * // Add to empty Map
 * set("key")("value")(new Map())
 * // Map { "key" => "value" }
 *
 * // Object values
 * const users = new Map([[1, { name: "Alice", age: 30 }]])
 * set(2)({ name: "Bob", age: 25 })(users)
 * // Map { 1 => {...}, 2 => {name:"Bob", age:25} }
 *
 * // Partial application
 * const setActive = set("active")
 * const status = new Map([["user", "Alice"]])
 * setActive(true)(status)
 * // Map { "user" => "Alice", "active" => true }
 * ```
 * @pure
 * @immutable
 * @curried
 */
const set = <K, V>(key: K) => (value: V) => (map: Map<K, V>): Map<K, V> =>
	new Map([...map, [key, value]])

export default set
