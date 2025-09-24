/**
 * Merges multiple Maps into a single Map
 *
 * Combines entries from multiple Maps into a new Map. When keys appear
 * in multiple Maps, values from later Maps override those from earlier ones.
 * This follows left-to-right precedence, making it predictable for configuration
 * merging and similar use cases. The function is curried and accepts either
 * an array of Maps or individual Maps via rest parameters.
 *
 * @param maps - Maps to merge together
 * @returns A new Map containing all entries, with later values overriding earlier ones
 * @example
 * ```typescript
 * // Basic merge of two Maps
 * const defaults = new Map([
 *   ["timeout", 5000],
 *   ["retries", 3],
 *   ["debug", false]
 * ])
 * const overrides = new Map([
 *   ["timeout", 10000],
 *   ["debug", true]
 * ])
 * merge(defaults, overrides)
 * // Map { "timeout" => 10000, "retries" => 3, "debug" => true }
 *
 * // Merge multiple Maps
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["b", 3], ["c", 4]])
 * const map3 = new Map([["c", 5], ["d", 6]])
 * merge(map1, map2, map3)
 * // Map { "a" => 1, "b" => 3, "c" => 5, "d" => 6 }
 *
 * // Configuration merging
 * const baseConfig = new Map([["apiUrl", "api.example.com"], ["timeout", 5000]])
 * const envConfig = new Map([["apiUrl", "staging.api.example.com"]])
 * const userConfig = new Map([["timeout", 10000], ["theme", "dark"]])
 * merge(baseConfig, envConfig, userConfig)
 * // Map { "apiUrl" => "staging.api.example.com", "timeout" => 10000, "theme" => "dark" }
 *
 * // Empty Maps
 * merge(new Map(), new Map())
 * // Map {}
 *
 * // Single Map
 * merge(new Map([["key", "value"]]))
 * // Map { "key" => "value" }
 * ```
 * @pure
 * @immutable
 * @safe
 */
const merge = <K, V>(...maps: Array<Map<K, V>>): Map<K, V> =>
	maps.reduce((acc, map) => new Map([...acc, ...map]), new Map<K, V>())

export default merge
