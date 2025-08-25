import type { Value } from "../../../types/index.ts"

/**
 * Creates an object with a single key-value pair
 *
 * Constructs a new object containing only the specified key and value.
 * Useful for building objects programmatically or converting single
 * values into object form. Supports both string and symbol keys.
 *
 * @curried (key) => (value) => result
 * @param key - The property key for the object
 * @param value - The value to associate with the key
 * @returns An object with the single key-value pair
 * @example
 * ```typescript
 * // Basic object creation
 * objOf("name")("Alice")                  // { name: "Alice" }
 * objOf("age")(30)                        // { age: 30 }
 * objOf("active")(true)                   // { active: true }
 *
 * // Number keys (converted to strings)
 * objOf(42)("answer")                     // { "42": "answer" }
 * objOf(0)("first")                       // { "0": "first" }
 *
 * // Symbol keys
 * const sym = Symbol("id")
 * objOf(sym)(12345)                       // { [Symbol(id)]: 12345 }
 *
 * // Complex values
 * objOf("data")([1, 2, 3])                // { data: [1, 2, 3] }
 * objOf("config")({ port: 3000 })         // { config: { port: 3000 } }
 * objOf("handler")(() => "hello")         // { handler: [Function] }
 *
 * // Null and undefined values
 * objOf("value")(null)                    // { value: null }
 * objOf("value")(undefined)               // { value: undefined }
 *
 * // Empty string key
 * objOf("")("empty key")                  // { "": "empty key" }
 *
 * // Special characters in keys
 * objOf("user.name")("Bob")               // { "user.name": "Bob" }
 * objOf("data[0]")(100)                   // { "data[0]": 100 }
 * objOf("@id")("abc-123")                 // { "@id": "abc-123" }
 *
 * // Building objects from arrays
 * const pairs = [
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ]
 * const objects = pairs.map(([k, v]) => objOf(k)(v))
 * // [{ a: 1 }, { b: 2 }, { c: 3 }]
 *
 * // Merging single-property objects
 * const merge = (...objs: Array<Record<string, Value>>) =>
 *   Object.assign({}, ...objs)
 *
 * merge(
 *   objOf("name")("Alice"),
 *   objOf("age")(30),
 *   objOf("city")("NYC")
 * )
 * // { name: "Alice", age: 30, city: "NYC" }
 *
 * // Partial application for consistent keys
 * const makeError = objOf("error")
 * makeError("Not found")                  // { error: "Not found" }
 * makeError("Invalid input")              // { error: "Invalid input" }
 * makeError("Timeout")                    // { error: "Timeout" }
 *
 * const makeResult = objOf("result")
 * makeResult({ success: true })           // { result: { success: true } }
 * makeResult([1, 2, 3])                   // { result: [1, 2, 3] }
 *
 * // Creating response objects
 * const successResponse = objOf("data")
 * const errorResponse = objOf("error")
 *
 * const handleResult = (isSuccess: boolean, value: any) =>
 *   isSuccess ? successResponse(value) : errorResponse(value)
 *
 * handleResult(true, { id: 1 })           // { data: { id: 1 } }
 * handleResult(false, "Failed")           // { error: "Failed" }
 *
 * // Dynamic property names
 * const makeProperty = (prefix: string) => (name: string) => (value: any) =>
 *   objOf(`${prefix}_${name}`)(value)
 *
 * const userProp = makeProperty("user")
 * userProp("id")(123)                     // { user_id: 123 }
 * userProp("name")("Bob")                 // { user_name: "Bob" }
 *
 * // Configuration objects
 * const makeConfig = (key: string) => objOf(`config.${key}`)
 * makeConfig("timeout")(5000)             // { "config.timeout": 5000 }
 * makeConfig("retries")(3)                // { "config.retries": 3 }
 *
 * // Event payloads
 * const event = (type: string) => (payload: any) =>
 *   ({ ...objOf("type")(type), ...objOf("payload")(payload) })
 *
 * event("click")({ x: 100, y: 200 })
 * // { type: "click", payload: { x: 100, y: 200 } }
 *
 * // Building query parameters
 * const param = objOf
 * const query = merge(
 *   param("page")(1),
 *   param("limit")(10),
 *   param("sort")("name")
 * )
 * // { page: 1, limit: 10, sort: "name" }
 *
 * // Wrapping values for APIs
 * const wrapValue = (wrapper: string) => (value: any) =>
 *   objOf(wrapper)(value)
 *
 * const wrapData = wrapValue("data")
 * const wrapMeta = wrapValue("meta")
 *
 * wrapData([1, 2, 3])                     // { data: [1, 2, 3] }
 * wrapMeta({ total: 100 })                // { meta: { total: 100 } }
 *
 * // State updates
 * const setState = (key: string) => (value: any) => (state: any) => ({
 *   ...state,
 *   ...objOf(key)(value)
 * })
 *
 * const state = { count: 0, name: "App" }
 * setState("count")(5)(state)             // { count: 5, name: "App" }
 * setState("loading")(true)(state)        // { count: 0, name: "App", loading: true }
 * ```
 * @property Simple API - creates object with single property
 * @property Symbol support - works with symbol keys
 * @property Composable - easily combined to build larger objects
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
