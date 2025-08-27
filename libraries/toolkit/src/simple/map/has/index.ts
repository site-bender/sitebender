/**
 * Checks if a Map contains a key
 *
 * Tests whether a key exists in a Map. Returns true if the key is present,
 * false otherwise. This function is curried to allow partial application
 * and composition in functional pipelines. It provides a functional
 * alternative to the Map.has() method.
 *
 * @param key - The key to check for
 * @param map - The Map to check
 * @returns True if the key exists, false otherwise
 * @example
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * has("a")(map)  // true
 * has("z")(map)  // false
 * 
 * // Different key types
 * const mixed = new Map([[123, "number"], [true, "bool"], [null, "null"]])
 * has(123)(mixed)  // true
 * has(false)(mixed)  // false
 * 
 * // Object keys (reference equality)
 * const key = { id: 1 }
 * const objMap = new Map([[key, "value"]])
 * has(key)(objMap)  // true
 * has({ id: 1 })(objMap)  // false (different object)
 * 
 * // Required field validation
 * const requiredFields = ["name", "email"]
 * const form = new Map([["name", "Alice"], ["email", "alice@example.com"]])
 * requiredFields.every(field => has(field)(form))  // true
 * 
 * // Empty Map
 * has("any")(new Map())  // false
 * 
 * @pure
 * @curried
 * @predicate
 */
const has = <K, V>(key: K) => (map: Map<K, V>): boolean => {
	return map.has(key)
}

export default has