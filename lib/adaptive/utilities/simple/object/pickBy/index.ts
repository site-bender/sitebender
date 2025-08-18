import type { Value } from "../../../../types/index.ts"

/**
 * Creates a new object with only the properties that satisfy a predicate
 * 
 * Filters an object's properties based on a predicate function that receives
 * both the value and key. Only properties for which the predicate returns
 * true are included in the result. The original object is not modified.
 * 
 * @curried (predicate) => (obj) => result
 * @param predicate - Function to test each property (value, key) => boolean
 * @param obj - The object to filter
 * @returns A new object with only properties that satisfy the predicate
 * @example
 * ```typescript
 * // Filter by value
 * pickBy((value: any) => typeof value === "number")({
 *   a: 1,
 *   b: "two",
 *   c: 3,
 *   d: null
 * })
 * // { a: 1, c: 3 }
 * 
 * pickBy((value: any) => value > 10)({
 *   small: 5,
 *   medium: 15,
 *   large: 25,
 *   tiny: 2
 * })
 * // { medium: 15, large: 25 }
 * 
 * // Filter by key
 * pickBy((value: any, key: string) => key.startsWith("user_"))({
 *   user_id: 1,
 *   user_name: "Alice",
 *   age: 30,
 *   role: "admin"
 * })
 * // { user_id: 1, user_name: "Alice" }
 * 
 * // Filter by both value and key
 * pickBy((value: any, key: string) => 
 *   key.length > 3 && typeof value === "string"
 * )({
 *   id: 1,
 *   name: "Bob",
 *   email: "bob@ex.com",
 *   age: 25
 * })
 * // { name: "Bob", email: "bob@ex.com" }
 * 
 * // Boolean values
 * pickBy((value: any) => value === true)({
 *   isActive: true,
 *   isEnabled: false,
 *   isVisible: true,
 *   count: 1
 * })
 * // { isActive: true, isVisible: true }
 * 
 * // Truthy values
 * pickBy((value: any) => Boolean(value))({
 *   a: 1,
 *   b: 0,
 *   c: "text",
 *   d: "",
 *   e: null,
 *   f: undefined
 * })
 * // { a: 1, c: "text" }
 * 
 * // Non-null values
 * pickBy((value: any) => value != null)({
 *   a: 1,
 *   b: null,
 *   c: undefined,
 *   d: 0,
 *   e: ""
 * })
 * // { a: 1, d: 0, e: "" }
 * 
 * // Arrays and objects
 * pickBy((value: any) => Array.isArray(value))({
 *   items: [1, 2, 3],
 *   config: { port: 3000 },
 *   tags: ["a", "b"],
 *   name: "Test"
 * })
 * // { items: [1, 2, 3], tags: ["a", "b"] }
 * 
 * // Symbol keys
 * const sym = Symbol("special")
 * pickBy((value: any, key: string | symbol) => 
 *   typeof key === "symbol"
 * )({
 *   regular: "value",
 *   [sym]: "special value",
 *   another: "data"
 * })
 * // { [Symbol(special)]: "special value" }
 * 
 * // Empty object
 * pickBy((value: any) => value > 0)({})
 * // {}
 * 
 * // All properties filtered out
 * pickBy((value: any) => value > 100)({ a: 1, b: 2, c: 3 })
 * // {}
 * 
 * // Practical use cases
 * 
 * // Remove falsy values
 * const compact = pickBy((value: any) => Boolean(value))
 * compact({
 *   name: "Alice",
 *   email: "",
 *   age: 0,
 *   city: null,
 *   active: true
 * })
 * // { name: "Alice", active: true }
 * 
 * // Filter by type
 * const pickStrings = pickBy((value: any) => 
 *   typeof value === "string" && value.length > 0
 * )
 * const pickNumbers = pickBy((value: any) => 
 *   typeof value === "number" && !isNaN(value)
 * )
 * 
 * const data = { a: "hello", b: 42, c: "", d: NaN, e: "world" }
 * pickStrings(data) // { a: "hello", e: "world" }
 * pickNumbers(data) // { b: 42 }
 * 
 * // Configuration validation
 * const pickValidConfig = pickBy((value: any, key: string) => {
 *   // Only keep non-null values with valid keys
 *   return value != null && !key.startsWith("_")
 * })
 * 
 * pickValidConfig({
 *   port: 3000,
 *   host: "localhost",
 *   _internal: "hidden",
 *   timeout: null,
 *   retries: 3
 * })
 * // { port: 3000, host: "localhost", retries: 3 }
 * 
 * // API response filtering
 * const pickPublicFields = pickBy((value: any, key: string) =>
 *   !key.startsWith("_") && !key.includes("password")
 * )
 * 
 * pickPublicFields({
 *   id: 1,
 *   username: "alice",
 *   password: "secret",
 *   _internal_id: "abc",
 *   email: "alice@ex.com"
 * })
 * // { id: 1, username: "alice", email: "alice@ex.com" }
 * 
 * // Range filtering
 * const inRange = (min: number, max: number) =>
 *   pickBy((value: any) => 
 *     typeof value === "number" && value >= min && value <= max
 *   )
 * 
 * const scores = { alice: 85, bob: 92, carol: 78, dave: 95 }
 * inRange(80, 90)(scores) // { alice: 85 }
 * inRange(90, 100)(scores) // { bob: 92, dave: 95 }
 * 
 * // Permission filtering
 * const pickPermissions = pickBy((value: any, key: string) =>
 *   key.startsWith("can") && value === true
 * )
 * 
 * pickPermissions({
 *   canRead: true,
 *   canWrite: false,
 *   canDelete: true,
 *   username: "admin",
 *   role: "superuser"
 * })
 * // { canRead: true, canDelete: true }
 * 
 * // Partial application patterns
 * const hasLength = (min: number) =>
 *   pickBy((value: any) => 
 *     (typeof value === "string" || Array.isArray(value)) && 
 *     value.length >= min
 *   )
 * 
 * hasLength(3)({
 *   short: "ab",
 *   medium: "hello",
 *   list: [1, 2, 3, 4],
 *   empty: []
 * })
 * // { medium: "hello", list: [1, 2, 3, 4] }
 * 
 * // Combining with other operations
 * const process = (obj: any) => {
 *   const nonNull = pickBy((v: any) => v != null)(obj)
 *   const strings = pickBy((v: any) => typeof v === "string")(nonNull)
 *   return strings
 * }
 * 
 * process({ a: "text", b: null, c: 42, d: "more" })
 * // { a: "text", d: "more" }
 * ```
 * @property Flexible filtering - predicate receives both value and key
 * @property Symbol support - works with symbol keys
 * @property Immutable - creates a new object, doesn't modify the original
 */
const pickBy = <T extends Record<string | symbol, Value>>(
	predicate: (value: Value, key: string | symbol) => boolean,
) => (
	obj: T,
): Partial<T> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {}
	}
	
	const result: Partial<T> = {}
	
	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj)
	]
	
	// Filter properties based on predicate
	for (const key of allKeys) {
		const value = obj[key as keyof T]
		if (predicate(value, key)) {
			(result as any)[key] = value
		}
	}
	
	return result
}

export default pickBy