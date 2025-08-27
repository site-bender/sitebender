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
 * // Use with Map methods
 * const map = toMap({ x: 10, y: 20 })
 * map.get("x")  // 10
 * map.has("y")  // true
 *
 * // Iteration
 * for (const [key, value] of toMap({ a: 1, b: 2 })) {
 *   console.log(key, value)
 * }
 * ```
 * @pure
 * @immutable
 * @safe
 */
const toMap = <T extends Record<string, unknown>>(
	obj: T,
): Map<string, T[keyof T]> => {
	return new Map(Object.entries(obj)) as Map<string, T[keyof T]>
}

export default toMap
