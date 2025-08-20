import type { Value } from "../../../types/index.ts"

/**
 * Returns an object with properties that don't satisfy a predicate
 * 
 * The complement of pickBy - creates a new object containing only the
 * properties for which the predicate returns false. The predicate receives
 * both the value and key. The original object is not modified.
 * 
 * @curried (predicate) => (obj) => result
 * @param predicate - Function to test each property (value, key) => boolean
 * @param obj - The object to filter
 * @returns A new object with properties that don't satisfy the predicate
 * @example
 * ```typescript
 * // Reject by value
 * reject((value: any) => typeof value === "number")({
 *   a: 1,
 *   b: "two",
 *   c: 3,
 *   d: "four"
 * })
 * // { b: "two", d: "four" }
 * 
 * reject((value: any) => value > 10)({
 *   small: 5,
 *   medium: 15,
 *   tiny: 2,
 *   large: 25
 * })
 * // { small: 5, tiny: 2 }
 * 
 * // Reject by key
 * reject((value: any, key: string) => key.startsWith("_"))({
 *   name: "Alice",
 *   _id: 123,
 *   email: "alice@ex.com",
 *   _internal: true
 * })
 * // { name: "Alice", email: "alice@ex.com" }
 * 
 * // Reject by both value and key
 * reject((value: any, key: string) => 
 *   key.length < 3 || typeof value !== "string"
 * )({
 *   id: 1,
 *   name: "Bob",
 *   email: "bob@ex.com",
 *   x: "short"
 * })
 * // { name: "Bob", email: "bob@ex.com" }
 * 
 * // Reject truthy values
 * reject((value: any) => Boolean(value))({
 *   a: 1,
 *   b: 0,
 *   c: "text",
 *   d: "",
 *   e: null,
 *   f: undefined
 * })
 * // { b: 0, d: "", e: null, f: undefined }
 * 
 * // Reject null/undefined
 * reject((value: any) => value == null)({
 *   a: 1,
 *   b: null,
 *   c: undefined,
 *   d: 0,
 *   e: ""
 * })
 * // { a: 1, d: 0, e: "" }
 * 
 * // Reject arrays
 * reject((value: any) => Array.isArray(value))({
 *   items: [1, 2, 3],
 *   config: { port: 3000 },
 *   tags: ["a", "b"],
 *   name: "Test"
 * })
 * // { config: { port: 3000 }, name: "Test" }
 * 
 * // Symbol keys
 * const sym = Symbol("special")
 * reject((value: any, key: string | symbol) => 
 *   typeof key === "symbol"
 * )({
 *   regular: "value",
 *   [sym]: "special value",
 *   another: "data"
 * })
 * // { regular: "value", another: "data" }
 * 
 * // Empty result (all rejected)
 * reject((value: any) => value < 100)({ a: 1, b: 2, c: 3 })
 * // {}
 * 
 * // Nothing rejected
 * reject((value: any) => value > 100)({ a: 1, b: 2, c: 3 })
 * // { a: 1, b: 2, c: 3 }
 * 
 * // Practical use cases
 * 
 * // Remove falsy values
 * const removeFalsy = reject((value: any) => !value)
 * removeFalsy({
 *   name: "Alice",
 *   email: "",
 *   age: 0,
 *   city: null,
 *   active: true
 * })
 * // { name: "Alice", active: true }
 * 
 * // Remove internal/private fields
 * const removePrivate = reject((value: any, key: string) =>
 *   key.startsWith("_") || key.startsWith("$")
 * )
 * 
 * removePrivate({
 *   id: 1,
 *   name: "Public",
 *   _internal: "hidden",
 *   $meta: "private",
 *   data: "visible"
 * })
 * // { id: 1, name: "Public", data: "visible" }
 * 
 * // Remove empty collections
 * const removeEmpty = reject((value: any) =>
 *   (Array.isArray(value) && value.length === 0) ||
 *   (typeof value === "object" && value && Object.keys(value).length === 0) ||
 *   (typeof value === "string" && value === "")
 * )
 * 
 * removeEmpty({
 *   name: "Test",
 *   items: [],
 *   config: {},
 *   description: "",
 *   tags: ["a", "b"]
 * })
 * // { name: "Test", tags: ["a", "b"] }
 * 
 * // Filter out specific values
 * const removeDefaults = reject((value: any) =>
 *   value === "N/A" || value === "unknown" || value === -1
 * )
 * 
 * removeDefaults({
 *   name: "Item",
 *   status: "N/A",
 *   category: "unknown",
 *   count: -1,
 *   price: 100
 * })
 * // { name: "Item", price: 100 }
 * 
 * // Remove expired dates
 * const removeExpired = reject((value: any) =>
 *   value instanceof Date && value < new Date()
 * )
 * 
 * removeExpired({
 *   created: new Date("2020-01-01"),
 *   expires: new Date("2025-01-01"),
 *   updated: new Date("2023-01-01")
 * })
 * // { expires: Date("2025-01-01") }
 * 
 * // API response cleaning
 * const cleanResponse = reject((value: any, key: string) =>
 *   key.includes("password") ||
 *   key.includes("secret") ||
 *   key.includes("token")
 * )
 * 
 * cleanResponse({
 *   id: 1,
 *   username: "alice",
 *   password_hash: "xxx",
 *   api_token: "yyy",
 *   secret_key: "zzz",
 *   email: "alice@ex.com"
 * })
 * // { id: 1, username: "alice", email: "alice@ex.com" }
 * 
 * // Remove temporary fields
 * const removeTempFields = reject((value: any, key: string) =>
 *   key.endsWith("_temp") ||
 *   key.endsWith("_old") ||
 *   key.endsWith("_backup")
 * )
 * 
 * removeTempFields({
 *   data: "current",
 *   data_old: "previous",
 *   cache_temp: "temporary",
 *   result: "final",
 *   config_backup: "backup"
 * })
 * // { data: "current", result: "final" }
 * 
 * // Validation errors cleanup
 * const removeValidFields = reject((value: any) => value === true)
 * 
 * const validationResults = {
 *   name: true,      // valid
 *   email: true,     // valid
 *   age: "Must be a number",
 *   phone: "Invalid format"
 * }
 * 
 * removeValidFields(validationResults)
 * // { age: "Must be a number", phone: "Invalid format" }
 * // Only keep error messages
 * 
 * // Range exclusion
 * const excludeRange = (min: number, max: number) =>
 *   reject((value: any) => 
 *     typeof value === "number" && value >= min && value <= max
 *   )
 * 
 * excludeRange(10, 20)({
 *   a: 5,
 *   b: 15,
 *   c: 25,
 *   d: 10,
 *   e: 20
 * })
 * // { a: 5, c: 25 }
 * 
 * // Partial application patterns
 * const rejectType = (type: string) =>
 *   reject((value: any) => typeof value === type)
 * 
 * const rejectStrings = rejectType("string")
 * const rejectNumbers = rejectType("number")
 * const rejectBooleans = rejectType("boolean")
 * 
 * const mixed = { a: "text", b: 42, c: true, d: null }
 * rejectStrings(mixed)   // { b: 42, c: true, d: null }
 * rejectNumbers(mixed)   // { a: "text", c: true, d: null }
 * rejectBooleans(mixed)  // { a: "text", b: 42, d: null }
 * ```
 * @property Complement of pickBy - keeps properties that fail the test
 * @property Flexible filtering - predicate receives both value and key
 * @property Immutable - creates a new object, doesn't modify the original
 */
const reject = <T extends Record<string | symbol, Value>>(
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
	
	// Keep properties where predicate returns false
	for (const key of allKeys) {
		const value = obj[key as keyof T]
		if (!predicate(value, key)) {
			(result as any)[key] = value
		}
	}
	
	return result
}

export default reject