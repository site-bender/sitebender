/**
 * Gets a value from a Map by key
 *
 * Retrieves the value associated with a given key from a Map. Returns
 * undefined if the key doesn't exist. This function is curried to allow
 * partial application and composition in functional pipelines. It provides
 * a functional alternative to the Map.get() method.
 *
 * @param key - The key to look up
 * @param map - The Map to get the value from
 * @returns The value associated with the key, or undefined if not found
 * @example
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * get("a")(map)  // 1
 * get("z")(map)  // undefined
 *
 * // Different key types
 * const mixed = new Map([[1, "one"], [true, "bool"], [null, "null"]])
 * get(1)(mixed)  // "one"
 * get(false)(mixed)  // undefined
 *
 * // Object keys (reference equality)
 * const key = { id: 1 }
 * const objMap = new Map([[key, "value"]])
 * get(key)(objMap)  // "value"
 * get({ id: 1 })(objMap)  // undefined (different object)
 *
 * // Partial application
 * const getUserId = get("userId")
 * getUserId(new Map([["userId", 123]]))  // 123
 * getUserId(new Map([["name", "Alice"]]))  // undefined
 *
 * // Empty Map
 * get("any")(new Map())  // undefined
 *
 * @pure
 * @curried
 * @safe
 */
const get = <K, V>(key: K) => (map: Map<K, V>): V | undefined => {
	return map.get(key)
}

export default get
