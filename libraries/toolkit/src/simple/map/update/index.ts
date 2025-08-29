/**
 * Updates a value in a Map using a function
 *
 * Creates a new Map with the value at the specified key transformed by
 * the update function. If the key exists, the function receives the current
 * value and returns the new value. If the key doesn't exist, the function
 * receives undefined. This allows for conditional updates, increments,
 * transformations, and default value handling in an immutable way.
 *
 * @curried (key) => (updater) => (map) => result
 * @param key - The key to update
 * @param updater - Function to transform the value
 * @param map - The Map to update
 * @returns A new Map with the updated value
 * @example
 * ```typescript
 * // Update existing value
 * const scores = new Map([["Alice", 85], ["Bob", 92]])
 * update("Alice")((score = 0) => score + 5)(scores)
 * // Map { "Alice" => 90, "Bob" => 92 }
 *
 * // Update non-existing key with default
 * update("Charlie")((score = 0) => score + 78)(scores)
 * // Map { "Alice" => 85, "Bob" => 92, "Charlie" => 78 }
 *
 * // Object value update
 * const users = new Map([[1, { name: "Alice", age: 30 }]])
 * update(1)(user => user ? { ...user, age: user.age + 1 } : null)(users)
 * // Map { 1 => {name:"Alice", age:31} }
 *
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * const state = new Map([["counter", 0]])
 * pipe(
 *   state,
 *   update("counter")(n => (n || 0) + 1),
 *   update("counter")(n => (n || 0) * 2)
 * )
 * // Map { "counter" => 2 }
 *
 * // Partial application patterns
 * const increment = <K>(key: K) =>
 *   update(key)((n: number = 0) => n + 1)
 * const counters = new Map([["a", 5], ["b", 3]])
 * increment("a")(counters)
 * // Map { "a" => 6, "b" => 3 }
 * ```
 * @pure
 * @curried
 */
const update =
	<K, V>(key: K) =>
	(updater: (value: V | undefined) => V) =>
	(map: Map<K, V>): Map<K, V> => {
		const result = new Map(map)
		const newValue = updater(map.get(key))
		result.set(key, newValue)
		return result
	}

export default update
