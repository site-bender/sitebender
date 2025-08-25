/**
 * Converts an object to a Map
 *
 * Creates a new Map from an object's own enumerable properties.
 * Each property becomes a key-value pair in the Map, preserving
 * the property insertion order.
 *
 * @param obj - The object to convert to a Map
 * @returns A new Map containing the object's properties as entries
 * @example
 * ```typescript
 * // Basic conversion
 * toMap({ a: 1, b: 2, c: 3 })
 * // Map(3) { "a" => 1, "b" => 2, "c" => 3 }
 *
 * toMap({ name: "John", age: 30 })
 * // Map(2) { "name" => "John", "age" => 30 }
 *
 * toMap({})
 * // Map(0) {}
 *
 * // With nested objects
 * toMap({
 *   user: { name: "Alice" },
 *   count: 5
 * })
 * // Map(2) { "user" => { name: "Alice" }, "count" => 5 }
 *
 * // Only own properties are included
 * const parent = { inherited: true }
 * const obj = Object.create(parent)
 * obj.own = "property"
 * toMap(obj)
 * // Map(1) { "own" => "property" }
 *
 * // Use with Map methods
 * const map = toMap({ x: 10, y: 20 })
 * map.get("x")              // 10
 * map.has("y")              // true
 * map.set("z", 30)          // Map(3) { "x" => 10, "y" => 20, "z" => 30 }
 * map.delete("x")           // true
 *
 * // Iteration
 * const map = toMap({ a: 1, b: 2 })
 * for (const [key, value] of map) {
 *   console.log(key, value)
 * }
 * // "a" 1
 * // "b" 2
 *
 * // Convert back to object if needed
 * const map = toMap({ a: 1, b: 2 })
 * const obj = Object.fromEntries(map)
 * // { a: 1, b: 2 }
 *
 * // Useful for preserving insertion order
 * const config = { z: 3, a: 1, m: 2 }
 * const orderedMap = toMap(config)
 * // Map preserves the order: z, a, m
 *
 * // Symbol properties are not included
 * const sym = Symbol("key")
 * toMap({ [sym]: "value", regular: "prop" })
 * // Map(1) { "regular" => "prop" }
 * ```
 * @property Pure - Creates a new Map, doesn't modify the input object
 * @property Own-properties - Only includes own enumerable properties
 * @property Order - Preserves property insertion order
 */
const toMap = <T extends Record<string, unknown>>(
	obj: T,
): Map<string, T[keyof T]> => {
	return new Map(Object.entries(obj)) as Map<string, T[keyof T]>
}

export default toMap
