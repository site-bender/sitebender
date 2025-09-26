import isNotUndefined from "../../validation/isNotUndefined/index.ts"

/**
 * Wraps a Map to provide default values for missing keys
 *
 * Creates a proxy-like wrapper around a Map that returns a default value
 * when accessing keys that don't exist. The wrapper provides a modified
 * get method while maintaining all other Map operations. This is useful
 * for configuration objects, counters, accumulators, and avoiding null
 * checks. The original Map remains unchanged.
 *
 * @curried (defaultValue) => (map) => wrappedMap
 * @param defaultValue - Value to return for missing keys
 * @param map - The Map to wrap
 * @returns A new Map-like object with default value behavior
 * @example
 * ```typescript
 * // Basic usage with default value
 * const scores = new Map([["Alice", 85], ["Bob", 92]])
 * const scoresWithDefault = withDefault(0)(scores)
 * scoresWithDefault.get("Alice")    // 85
 * scoresWithDefault.get("Charlie")  // 0 (default)
 *
 * // Counter with default
 * const counter = withDefault(0)(new Map<string, number>())
 * const increment = (key: string) => {
 *   counter.set(key, counter.get(key) + 1)
 * }
 * increment("clicks")  // clicks = 1
 * increment("clicks")  // clicks = 2
 *
 * // Configuration with defaults
 * const userConfig = new Map([["theme", "dark"]])
 * const config = withDefault("default")(userConfig)
 * config.get("theme")      // "dark"
 * config.get("language")   // "default"
 *
 * // Object default values
 * const users = new Map([[1, { name: "Alice", role: "admin" }]])
 * const usersWithDefault = withDefault({ name: "Unknown", role: "guest" })(users)
 * usersWithDefault.get(1)  // { name: "Alice", role: "admin" }
 * usersWithDefault.get(99) // { name: "Unknown", role: "guest" }
 *
 * // Safe calculations without null checks
 * const prices = new Map([["apple", 1.99], ["banana", 0.59]])
 * const pricesWithDefault = withDefault(0)(prices)
 * pricesWithDefault.get("apple")   // 1.99
 * pricesWithDefault.get("orange")  // 0
 * ```
 * @pure
 * @curried
 * @safe
 */
export default function withDefault<K, V>(defaultValue: V) {
	return function withDefaultValue(map: Map<K, V>): Map<K, V> {
		// Create a new Map that extends the original
		const wrappedMap = new Map(map)

		// Store the original get method
		const originalGet = wrappedMap.get.bind(wrappedMap)

		// Override the get method to return default for missing keys
		wrappedMap.get = function getWithDefault(key: K): V {
			const value = originalGet(key)
			return isNotUndefined(value) ? value : defaultValue
		}

		return wrappedMap
	}
}
