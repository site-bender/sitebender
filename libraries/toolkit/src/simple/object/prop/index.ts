import type { Value } from "../../../types/index.ts"

/**
 * Returns the value of a property from an object
 *
 * Extracts and returns the value of the specified property from an object.
 * Returns undefined if the property doesn't exist or if the object is
 * null/undefined. Useful for property access in functional pipelines.
 *
 * @curried (key) => (obj) => value
 * @param key - The property key to extract
 * @param obj - The object to extract from
 * @returns The value of the property, or undefined if not found
 * @example
 * ```typescript
 * // Basic property access
 * prop("name")({ name: "Alice", age: 30 })        // "Alice"
 * prop("age")({ name: "Alice", age: 30 })         // 30
 * prop("city")({ name: "Alice", age: 30 })        // undefined
 *
 * // Different value types
 * prop("active")({ active: true })                // true
 * prop("count")({ count: 0 })                     // 0
 * prop("data")({ data: null })                    // null
 * prop("value")({ value: undefined })             // undefined
 *
 * // Array values
 * prop("items")({ items: [1, 2, 3] })             // [1, 2, 3]
 * prop("tags")({ tags: [] })                      // []
 *
 * // Object values
 * prop("config")({ config: { port: 3000 } })      // { port: 3000 }
 * prop("user")({ user: { name: "Bob" } })         // { name: "Bob" }
 *
 * // Symbol keys
 * const sym = Symbol("id")
 * prop(sym)({ [sym]: 12345, regular: "value" })   // 12345
 *
 * // Number keys (for arrays/array-like objects)
 * prop(0)([10, 20, 30])                           // 10
 * prop(2)([10, 20, 30])                           // 30
 * prop("length")([1, 2, 3])                       // 3
 *
 * // Missing property
 * prop("missing")({ a: 1, b: 2 })                 // undefined
 * prop("x")({})                                   // undefined
 *
 * // Null/undefined objects
 * prop("any")(null)                               // undefined
 * prop("any")(undefined)                          // undefined
 *
 * // Practical use cases
 *
 * // Extracting from array of objects
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Carol" }
 * ]
 *
 * users.map(prop("name"))                         // ["Alice", "Bob", "Carol"]
 * users.map(prop("id"))                           // [1, 2, 3]
 *
 * // Sorting by property
 * const products = [
 *   { name: "Widget", price: 50 },
 *   { name: "Gadget", price: 100 },
 *   { name: "Doohickey", price: 75 }
 * ]
 *
 * products.sort((a, b) => prop("price")(a) - prop("price")(b))
 * // Sorted by price ascending
 *
 * // Filtering by property existence
 * const data = [
 *   { id: 1, value: "A" },
 *   { id: 2 },
 *   { id: 3, value: "C" }
 * ]
 *
 * data.filter(item => prop("value")(item) !== undefined)
 * // [{ id: 1, value: "A" }, { id: 3, value: "C" }]
 *
 * // Property getter functions
 * const getId = prop("id")
 * const getName = prop("name")
 * const getEmail = prop("email")
 *
 * const user = { id: 1, name: "Alice", email: "alice@ex.com" }
 * getId(user)                                     // 1
 * getName(user)                                   // "Alice"
 * getEmail(user)                                  // "alice@ex.com"
 *
 * // Configuration access
 * const getPort = prop("port")
 * const getHost = prop("host")
 *
 * const configs = [
 *   { host: "localhost", port: 3000 },
 *   { host: "0.0.0.0", port: 8080 }
 * ]
 *
 * configs.map(getPort)                            // [3000, 8080]
 * configs.map(getHost)                            // ["localhost", "0.0.0.0"]
 *
 * // Nested property access (single level)
 * const response = {
 *   data: { users: [1, 2, 3] },
 *   status: 200,
 *   headers: {}
 * }
 *
 * prop("data")(response)                          // { users: [1, 2, 3] }
 * prop("status")(response)                        // 200
 *
 * // Partial application in pipelines
 * const process = (obj: any) => {
 *   const id = prop("id")(obj)
 *   const type = prop("type")(obj)
 *   return `${type}-${id}`
 * }
 *
 * process({ id: 123, type: "user" })              // "user-123"
 *
 * // Finding max/min by property
 * const scores = [
 *   { player: "Alice", score: 100 },
 *   { player: "Bob", score: 85 },
 *   { player: "Carol", score: 95 }
 * ]
 *
 * const maxScore = Math.max(...scores.map(prop("score")))  // 100
 * const minScore = Math.min(...scores.map(prop("score")))  // 85
 *
 * // Grouping by property value
 * const items = [
 *   { category: "A", name: "Item1" },
 *   { category: "B", name: "Item2" },
 *   { category: "A", name: "Item3" }
 * ]
 *
 * const byCategory = items.reduce((acc, item) => {
 *   const cat = prop("category")(item)
 *   if (!acc[cat]) acc[cat] = []
 *   acc[cat].push(item)
 *   return acc
 * }, {} as Record<string, typeof items>)
 * // { A: [Item1, Item3], B: [Item2] }
 *
 * // Checking for property values
 * const hasName = (obj: any) => prop("name")(obj) !== undefined
 * const isActive = (obj: any) => prop("active")(obj) === true
 *
 * hasName({ name: "Test" })                       // true
 * hasName({ id: 1 })                              // false
 * isActive({ active: true })                      // true
 * isActive({ active: false })                     // false
 * ```
 * @property Safe access - returns undefined for missing properties
 * @property Symbol support - works with symbol keys
 * @property Composable - useful in map, filter, and other array operations
 */
const prop = <T extends Record<string | symbol, Value>, K extends keyof T>(
	key: K,
) =>
(
	obj: T,
): T[K] | undefined => {
	// Handle null/undefined objects
	if (obj == null) {
		return undefined
	}

	// Return the property value
	return obj[key]
}

export default prop
