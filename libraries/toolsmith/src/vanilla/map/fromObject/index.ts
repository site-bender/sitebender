/**
 * Creates a Map from an object
 *
 * Converts a plain JavaScript object to a Map, using the object's enumerable
 * own properties as entries. Property names become Map keys (as strings) and
 * property values become Map values. This is the inverse of the toObject
 * function. Symbol properties are ignored.
 *
 * @param obj - The object to convert to a Map
 * @returns A new Map with the object's properties as entries
 * @example
 * // Basic usage
 * const obj = { name: "Alice", age: 30, city: "NYC" }
 * fromObject(obj)
 * // Map { "name" => "Alice", "age" => 30, "city" => "NYC" }
 *
 * // Empty object
 * fromObject({})  // Map {}
 *
 * // Mixed value types
 * fromObject({ str: "hello", num: 123, bool: true, arr: [1, 2] })
 * // Map { "str" => "hello", "num" => 123, "bool" => true, "arr" => [1,2] }
 *
 * // Symbol properties are ignored
 * const sym = Symbol("key")
 * fromObject({ regular: "value", [sym]: "ignored" })
 * // Map { "regular" => "value" }
 *
 * // Configuration use case
 * const config = { host: "localhost", port: 3000, debug: true }
 * fromObject(config)
 * // Map { "host" => "localhost", "port" => 3000, "debug" => true }
 *
 * @pure
 * @immutable
 * @safe
 */
const fromObject = <V>(obj: Record<string, V>): Map<string, V> => {
	return new Map(Object.entries(obj))
}

export default fromObject
