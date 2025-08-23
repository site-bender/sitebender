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
 * ```typescript
 * // Basic usage
 * const obj = { name: "Alice", age: 30, city: "NYC" }
 * fromObject(obj)
 * // Map { "name" => "Alice", "age" => 30, "city" => "NYC" }
 * 
 * // Empty object
 * fromObject({})
 * // Map {}
 * 
 * // Single property
 * fromObject({ only: 42 })
 * // Map { "only" => 42 }
 * 
 * // Mixed value types
 * fromObject({
 *   string: "hello",
 *   number: 123,
 *   boolean: true,
 *   array: [1, 2, 3],
 *   object: { nested: true }
 * })
 * // Map { "string" => "hello", "number" => 123, "boolean" => true, "array" => [1,2,3], "object" => {nested:true} }
 * 
 * // Numeric string keys
 * fromObject({ "1": "one", "2": "two", "3": "three" })
 * // Map { "1" => "one", "2" => "two", "3" => "three" }
 * 
 * // Round-trip with toObject
 * import { toObject } from "../toObject/index.ts"
 * 
 * const original = { x: 10, y: 20, z: 30 }
 * const map = fromObject(original)
 * const restored = toObject(map)
 * // { x: 10, y: 20, z: 30 }
 * 
 * // Configuration objects
 * const config = {
 *   host: "localhost",
 *   port: 3000,
 *   debug: true,
 *   timeout: 5000
 * }
 * fromObject(config)
 * // Map { "host" => "localhost", "port" => 3000, "debug" => true, "timeout" => 5000 }
 * 
 * // User preferences
 * const preferences = {
 *   theme: "dark",
 *   language: "en",
 *   notifications: true,
 *   fontSize: 14
 * }
 * fromObject(preferences)
 * // Map { "theme" => "dark", "language" => "en", "notifications" => true, "fontSize" => 14 }
 * 
 * // API response conversion
 * const apiResponse = {
 *   status: "success",
 *   data: { id: 123, name: "Product" },
 *   timestamp: Date.now()
 * }
 * fromObject(apiResponse)
 * // Map { "status" => "success", "data" => {...}, "timestamp" => 1234567890 }
 * 
 * // Environment variables
 * const env = {
 *   NODE_ENV: "production",
 *   API_KEY: "secret123",
 *   PORT: "8080",
 *   DEBUG: "false"
 * }
 * fromObject(env)
 * // Map { "NODE_ENV" => "production", "API_KEY" => "secret123", ... }
 * 
 * // Form data conversion
 * const formData = {
 *   username: "alice",
 *   email: "alice@example.com",
 *   password: "secret",
 *   remember: true
 * }
 * fromObject(formData)
 * // Map { "username" => "alice", "email" => "alice@example.com", ... }
 * 
 * // Nested objects (values remain objects)
 * const nested = {
 *   user: {
 *     id: 1,
 *     profile: {
 *       name: "Alice",
 *       age: 30
 *     }
 *   },
 *   settings: {
 *     theme: "dark"
 *   }
 * }
 * fromObject(nested)
 * // Map { "user" => {id:1, profile:{...}}, "settings" => {theme:"dark"} }
 * 
 * // Function values
 * const handlers = {
 *   onClick: () => console.log("click"),
 *   onHover: () => console.log("hover"),
 *   onFocus: () => console.log("focus")
 * }
 * fromObject(handlers)
 * // Map { "onClick" => Function, "onHover" => Function, "onFocus" => Function }
 * 
 * // Null and undefined values
 * fromObject({
 *   a: null,
 *   b: undefined,
 *   c: 0,
 *   d: "",
 *   e: false
 * })
 * // Map { "a" => null, "b" => undefined, "c" => 0, "d" => "", "e" => false }
 * 
 * // Symbol properties are ignored
 * const sym = Symbol("key")
 * const objWithSymbol = {
 *   regular: "value",
 *   [sym]: "symbol value"
 * }
 * fromObject(objWithSymbol)
 * // Map { "regular" => "value" } (symbol property ignored)
 * 
 * // Inherited properties are ignored
 * class Parent {
 *   inherited = "parent value"
 * }
 * class Child extends Parent {
 *   own = "child value"
 * }
 * const instance = new Child()
 * fromObject(instance)
 * // Map { "inherited" => "parent value", "own" => "child value" }
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { filter } from "../filter/index.ts"
 * 
 * const data = {
 *   name: "Alice",
 *   age: 30,
 *   _internal: "hidden",
 *   email: "alice@example.com",
 *   _debug: true
 * }
 * 
 * pipe(
 *   data,
 *   fromObject,
 *   filter((_, key) => !key.startsWith("_"))
 * )
 * // Map { "name" => "Alice", "age" => 30, "email" => "alice@example.com" }
 * 
 * // Converting class instances
 * class User {
 *   constructor(
 *     public id: number,
 *     public name: string,
 *     public email: string
 *   ) {}
 * }
 * 
 * const user = new User(1, "Alice", "alice@example.com")
 * fromObject(user)
 * // Map { "id" => 1, "name" => "Alice", "email" => "alice@example.com" }
 * 
 * // Query parameters object
 * const queryParams = {
 *   page: "2",
 *   limit: "10",
 *   sort: "name",
 *   order: "asc"
 * }
 * fromObject(queryParams)
 * // Map { "page" => "2", "limit" => "10", "sort" => "name", "order" => "asc" }
 * 
 * // Headers object
 * const headers = {
 *   "Content-Type": "application/json",
 *   "Authorization": "Bearer token123",
 *   "X-Request-ID": "abc-123"
 * }
 * fromObject(headers)
 * // Map { "Content-Type" => "application/json", ... }
 * 
 * // Metrics/stats object
 * const metrics = {
 *   requests: 1000,
 *   errors: 23,
 *   latency: 45.6,
 *   uptime: 0.999
 * }
 * fromObject(metrics)
 * // Map { "requests" => 1000, "errors" => 23, "latency" => 45.6, "uptime" => 0.999 }
 * 
 * // Enum-like objects
 * const Colors = {
 *   RED: "#FF0000",
 *   GREEN: "#00FF00",
 *   BLUE: "#0000FF"
 * }
 * fromObject(Colors)
 * // Map { "RED" => "#FF0000", "GREEN" => "#00FF00", "BLUE" => "#0000FF" }
 * 
 * // Mapping for transformations
 * const prices = {
 *   apple: 1.99,
 *   banana: 0.59,
 *   orange: 2.49
 * }
 * const priceMap = fromObject(prices)
 * const discounted = new Map(
 *   [...priceMap].map(([item, price]) => [item, price * 0.9])
 * )
 * // Map { "apple" => 1.791, "banana" => 0.531, "orange" => 2.241 }
 * 
 * // Serialization workflow
 * const state = {
 *   user: { id: 1, name: "Alice" },
 *   cart: ["item1", "item2"],
 *   total: 99.99
 * }
 * const stateMap = fromObject(state)
 * // Can now use Map methods for manipulation
 * stateMap.set("timestamp", Date.now())
 * const serialized = JSON.stringify([...stateMap])
 * 
 * // Comparison with Object.entries
 * const obj = { a: 1, b: 2, c: 3 }
 * fromObject(obj)              // Direct conversion
 * new Map(Object.entries(obj)) // Alternative approach
 * // Both produce Map { "a" => 1, "b" => 2, "c" => 3 }
 * 
 * // Type safety
 * interface Config {
 *   host: string
 *   port: number
 *   ssl: boolean
 * }
 * const config: Config = { host: "localhost", port: 3000, ssl: true }
 * const configMap: Map<string, string | number | boolean> = fromObject(config)
 * // Map<string, string | number | boolean>
 * 
 * // Array-like objects
 * const arrayLike = {
 *   "0": "first",
 *   "1": "second",
 *   "2": "third",
 *   length: 3
 * }
 * fromObject(arrayLike)
 * // Map { "0" => "first", "1" => "second", "2" => "third", "length" => 3 }
 * 
 * // Performance note
 * const hugeObject = Object.fromEntries(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i])
 * )
 * fromObject(hugeObject)
 * // Creates Map with 10000 entries
 * ```
 * @property Pure - Creates a new Map without modifying the input
 * @property Own-properties - Only includes own enumerable properties
 * @property String-keys - All keys are strings in the resulting Map
 */
const fromObject = <V>(obj: Record<string, V>): Map<string, V> => {
	return new Map(Object.entries(obj))
}

export default fromObject