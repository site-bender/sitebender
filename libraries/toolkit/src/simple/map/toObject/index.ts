/**
 * Converts a Map to an object
 * 
 * Creates a new object from a Map's entries. Only string keys are preserved;
 * non-string keys are converted to strings. This is the inverse operation
 * of object/toMap.
 * 
 * @param map - The Map to convert to an object
 * @returns A new object with the Map's entries as properties
 * @example
 * ```typescript
 * // Basic conversion
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * toObject(map)
 * // { a: 1, b: 2, c: 3 }
 * 
 * const userMap = new Map([
 *   ["name", "John"],
 *   ["age", 30]
 * ])
 * toObject(userMap)
 * // { name: "John", age: 30 }
 * 
 * // Empty Map
 * toObject(new Map())
 * // {}
 * 
 * // With nested values
 * const map = new Map([
 *   ["user", { name: "Alice" }],
 *   ["count", 5]
 * ])
 * toObject(map)
 * // { user: { name: "Alice" }, count: 5 }
 * 
 * // Non-string keys are converted to strings
 * const mixedMap = new Map([
 *   [1, "one"],
 *   ["2", "two"],
 *   [true, "bool"]
 * ])
 * toObject(mixedMap)
 * // { "1": "one", "2": "two", "true": "bool" }
 * 
 * // Symbol keys are skipped (can't be object keys)
 * const sym = Symbol("key")
 * const mapWithSymbol = new Map([
 *   [sym, "symbol value"],
 *   ["regular", "regular value"]
 * ])
 * toObject(mapWithSymbol)
 * // { regular: "regular value" }
 * 
 * // Round-trip conversion
 * import toMap from "../../object/toMap/index.ts"
 * const original = { x: 10, y: 20, z: 30 }
 * const map = toMap(original)
 * const restored = toObject(map)
 * // { x: 10, y: 20, z: 30 }
 * 
 * // Use for serialization
 * const cache = new Map([
 *   ["user:1", { id: 1, name: "Alice" }],
 *   ["user:2", { id: 2, name: "Bob" }]
 * ])
 * const serializable = toObject(cache)
 * const json = JSON.stringify(serializable)
 * 
 * // Filtering before conversion
 * const settings = new Map([
 *   ["debug", true],
 *   ["timeout", 5000],
 *   ["_internal", "hidden"]
 * ])
 * const publicSettings = toObject(
 *   new Map([...settings].filter(([k]) => !k.startsWith("_")))
 * )
 * // { debug: true, timeout: 5000 }
 * ```
 * @property Pure - Creates a new object, doesn't modify the input Map
 * @property String-keys - Non-string keys are converted to strings
 * @property Symbol-skip - Symbol keys are not included in the result
 */
const toObject = <V>(map: Map<unknown, V>): Record<string, V> => {
	const obj: Record<string, V> = {}
	
	for (const [key, value] of map) {
		// Skip symbol keys as they can't be object property keys
		if (typeof key === "symbol") {
			continue
		}
		// Convert non-string keys to strings
		obj[String(key)] = value
	}
	
	return obj
}

export default toObject