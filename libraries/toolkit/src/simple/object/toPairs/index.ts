import type { Value } from "../../../../types/index.ts"

/**
 * Converts an object to an array of [key, value] pairs
 * 
 * Transforms an object into an array of tuples, where each tuple contains
 * a key-value pair from the object. Only own enumerable properties are
 * included (not inherited properties). The order of pairs follows the
 * same order as Object.entries(). Includes symbol keys.
 * 
 * @param obj - The object to convert
 * @returns Array of [key, value] pairs
 * @example
 * ```typescript
 * // Basic conversion
 * toPairs({ a: 1, b: 2, c: 3 })
 * // [["a", 1], ["b", 2], ["c", 3]]
 * 
 * toPairs({ name: "Alice", age: 30, city: "NYC" })
 * // [["name", "Alice"], ["age", 30], ["city", "NYC"]]
 * 
 * // Different value types
 * toPairs({
 *   string: "text",
 *   number: 42,
 *   boolean: true,
 *   array: [1, 2, 3],
 *   object: { x: 1 }
 * })
 * // [
 * //   ["string", "text"],
 * //   ["number", 42],
 * //   ["boolean", true],
 * //   ["array", [1, 2, 3]],
 * //   ["object", { x: 1 }]
 * // ]
 * 
 * // Empty object
 * toPairs({})
 * // []
 * 
 * // Single property
 * toPairs({ only: "one" })
 * // [["only", "one"]]
 * 
 * // Null and undefined values
 * toPairs({ a: null, b: undefined, c: 0 })
 * // [["a", null], ["b", undefined], ["c", 0]]
 * 
 * // Symbol keys are included
 * const sym1 = Symbol("key1")
 * const sym2 = Symbol("key2")
 * toPairs({
 *   regular: "value",
 *   [sym1]: "symbol1",
 *   another: "data",
 *   [sym2]: "symbol2"
 * })
 * // [
 * //   ["regular", "value"],
 * //   ["another", "data"],
 * //   [Symbol(key1), "symbol1"],
 * //   [Symbol(key2), "symbol2"]
 * // ]
 * 
 * // Number-like keys
 * toPairs({ "1": "one", "2": "two", "10": "ten" })
 * // [["1", "one"], ["2", "two"], ["10", "ten"]]
 * 
 * // Inherited properties are NOT included
 * class Parent {
 *   inherited = "parent"
 * }
 * class Child extends Parent {
 *   own = "child"
 * }
 * const instance = new Child()
 * toPairs(instance)
 * // [["inherited", "parent"], ["own", "child"]]
 * // Note: Only if properties are on instance, not prototype
 * 
 * // Practical use cases
 * 
 * // Converting for iteration
 * const config = { host: "localhost", port: 3000, ssl: true }
 * const pairs = toPairs(config)
 * 
 * pairs.forEach(([key, value]) => {
 *   console.log(`${key}: ${value}`)
 * })
 * // host: localhost
 * // port: 3000
 * // ssl: true
 * 
 * // URL query parameters
 * const params = { page: 1, limit: 10, sort: "name" }
 * const queryString = toPairs(params)
 *   .map(([key, value]) => `${key}=${value}`)
 *   .join("&")
 * // "page=1&limit=10&sort=name"
 * 
 * // Form data creation
 * const formFields = { username: "alice", email: "alice@ex.com" }
 * const formData = new FormData()
 * toPairs(formFields).forEach(([key, value]) => {
 *   formData.append(key, String(value))
 * })
 * 
 * // Map conversion
 * const obj = { a: 1, b: 2, c: 3 }
 * const map = new Map(toPairs(obj))
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 * 
 * // Filtering pairs
 * const data = { a: 1, b: null, c: 3, d: undefined, e: 5 }
 * const nonNullPairs = toPairs(data)
 *   .filter(([key, value]) => value != null)
 * // [["a", 1], ["c", 3], ["e", 5]]
 * 
 * // Sorting by key
 * const unsorted = { z: 26, a: 1, m: 13 }
 * const sortedPairs = toPairs(unsorted)
 *   .sort(([a], [b]) => a.localeCompare(b))
 * // [["a", 1], ["m", 13], ["z", 26]]
 * 
 * // Sorting by value
 * const scores = { alice: 85, bob: 92, carol: 78 }
 * const sortedByScore = toPairs(scores)
 *   .sort(([, a], [, b]) => b - a)
 * // [["bob", 92], ["alice", 85], ["carol", 78]]
 * 
 * // Object transformation
 * const original = { firstName: "John", lastName: "Doe" }
 * const swapped = Object.fromEntries(
 *   toPairs(original).map(([k, v]) => [v, k])
 * )
 * // { John: "firstName", Doe: "lastName" }
 * 
 * // Key-value statistics
 * const inventory = { apples: 10, bananas: 5, oranges: 8 }
 * const total = toPairs(inventory)
 *   .reduce((sum, [, count]) => sum + count, 0)
 * // 23
 * 
 * // Debugging/logging
 * const state = { user: "alice", role: "admin", active: true }
 * const debugOutput = toPairs(state)
 *   .map(([k, v]) => `[${k}]: ${JSON.stringify(v)}`)
 *   .join("\n")
 * // [user]: "alice"
 * // [role]: "admin"
 * // [active]: true
 * 
 * // CSV row generation
 * const record = { id: 1, name: "Product", price: 99.99 }
 * const headers = ["id", "name", "price"]
 * const csvRow = headers.map(h => {
 *   const pair = toPairs(record).find(([k]) => k === h)
 *   return pair ? pair[1] : ""
 * })
 * // [1, "Product", 99.99]
 * 
 * // Environment variables
 * const env = { NODE_ENV: "production", PORT: "3000", HOST: "0.0.0.0" }
 * const envString = toPairs(env)
 *   .map(([key, value]) => `${key}="${value}"`)
 *   .join(" ")
 * // NODE_ENV="production" PORT="3000" HOST="0.0.0.0"
 * 
 * // Comparison with Object.entries
 * const obj2 = { a: 1, b: 2 }
 * const sym = Symbol("c")
 * obj2[sym] = 3
 * 
 * Object.entries(obj2)  // [["a", 1], ["b", 2]] (no symbols)
 * toPairs(obj2)         // [["a", 1], ["b", 2], [Symbol(c), 3]] (includes symbols)
 * 
 * // Pipeline processing
 * const process = (obj: Record<string, number>) =>
 *   toPairs(obj)
 *     .filter(([, v]) => v > 10)
 *     .map(([k, v]) => [k.toUpperCase(), v * 2])
 *     .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
 * 
 * process({ a: 5, b: 15, c: 20 })
 * // { B: 30, C: 40 }
 * ```
 * @property Own properties only - doesn't include inherited properties
 * @property Symbol support - includes symbol keys in the output
 * @property Order preserved - maintains insertion order for string keys
 */
const toPairs = <T extends Record<string | symbol, Value>>(
	obj: T,
): Array<[string | symbol, Value]> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return []
	}
	
	// Get string keys
	const stringPairs = Object.entries(obj) as Array<[string, Value]>
	
	// Get symbol keys and their values
	const symbolPairs = Object.getOwnPropertySymbols(obj)
		.map(sym => [sym, obj[sym]] as [symbol, Value])
	
	// Combine string and symbol pairs
	return [...stringPairs, ...symbolPairs]
}

export default toPairs