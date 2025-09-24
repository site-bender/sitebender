import type { Value } from "../../../types/index.ts"

/**
 * Creates an object with a single key-value pair
 *
 * Constructs a new object containing only the specified key and value.
 * Useful for building objects programmatically or converting single
 * values into object form. Supports both string and symbol keys.
 *
 * @pure
 * @immutable
 * @curried
 * @param key - The property key for the object
 * @param value - The value to associate with the key
 * @returns An object with the single key-value pair
 * @example
 * ```typescript
 * // Basic usage
 * objOf("name")("Alice") // { name: "Alice" }
 * objOf("age")(30) // { age: 30 }
 *
 * // Symbol keys
 * const sym = Symbol("id")
 * objOf(sym)(12345) // { [Symbol(id)]: 12345 }
 *
 * // Complex values
 * objOf("data")([1, 2, 3]) // { data: [1, 2, 3] }
 * objOf("config")({ port: 3000 }) // { config: { port: 3000 } }
 *
 * // Partial application
 * const makeError = objOf("error")
 * makeError("Not found") // { error: "Not found" }
 * makeError("Timeout") // { error: "Timeout" }
 *
 * // Building objects
 * const merge = (...objs: Array<Record<string, Value>>) => Object.assign({}, ...objs)
 * merge(objOf("a")(1), objOf("b")(2)) // { a: 1, b: 2 }
 *
 * // Edge cases
 * objOf("")("empty") // { "": "empty" }
 * objOf("x")(null) // { x: null }
 * ```
 */
const objOf = <K extends string | symbol, V extends Value>(
	key: K,
) =>
(
	value: V,
): Record<K, V> => ({
	[key]: value,
} as Record<K, V>)

export default objOf
