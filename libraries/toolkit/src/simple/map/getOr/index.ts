/**
 * Gets a value from a Map with a default fallback
 *
 * Retrieves the value associated with a given key from a Map, returning
 * a default value if the key doesn't exist. This function is curried to
 * allow partial application and composition. Unlike get(), it guarantees
 * a non-undefined return value.
 *
 * @param defaultValue - The value to return if key is not found
 * @param key - The key to look up
 * @param map - The Map to get the value from
 * @returns The value associated with the key, or defaultValue if not found
 * @example
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2]])
 * getOr(0)("a")(map)  // 1
 * getOr(0)("z")(map)  // 0
 * 
 * // Partial application
 * const getWithDefault = getOr("default")
 * getWithDefault("key")(new Map([["key", "value"]]))  // "value"
 * getWithDefault("missing")(new Map())  // "default"
 * 
 * // Configuration with defaults
 * const config = new Map([["host", "localhost"], ["port", 3000]])
 * const getConfig = getOr(null)
 * getConfig("host")(config)  // "localhost"
 * getConfig("ssl")(config)  // null
 * 
 * // Null/undefined values are returned as-is
 * const nullable = new Map([["a", null], ["b", undefined]])
 * getOr("default")("a")(nullable)  // null
 * getOr("default")("c")(nullable)  // "default"
 * 
 * // Object keys (reference equality)
 * const key = { id: 1 }
 * const objMap = new Map([[key, "value"]])
 * getOr("not found")(key)(objMap)  // "value"
 * getOr("not found")({ id: 1 })(objMap)  // "not found" (different object)
 * 
 * @pure
 * @curried
 * @safe
 */
const getOr = <K, V>(defaultValue: V) => (key: K) => (map: Map<K, V>): V => {
	return map.has(key) ? map.get(key)! : defaultValue
}

export default getOr