import type { Value } from "../../../../types/index.ts"

/**
 * Maps a function over the keys of an object
 * 
 * Creates a new object with the same values but with keys transformed
 * by the provided function. If the mapping function produces duplicate
 * keys, the last value wins. The original object is not modified.
 * 
 * @curried (fn) => (obj) => result
 * @param fn - Function to transform each key
 * @param obj - The object whose keys to transform
 * @returns A new object with transformed keys
 * @example
 * ```typescript
 * // Basic key transformation
 * mapKeys((key: string) => key.toUpperCase())({
 *   name: "Alice",
 *   age: 30,
 *   city: "NYC"
 * })
 * // { NAME: "Alice", AGE: 30, CITY: "NYC" }
 * 
 * // Add prefix to keys
 * mapKeys((key: string) => `user_${key}`)({
 *   id: 1,
 *   name: "Bob",
 *   email: "bob@ex.com"
 * })
 * // { user_id: 1, user_name: "Bob", user_email: "bob@ex.com" }
 * 
 * // Convert to camelCase
 * mapKeys((key: string) => 
 *   key.replace(/_([a-z])/g, (_, char) => char.toUpperCase())
 * )({
 *   first_name: "John",
 *   last_name: "Doe",
 *   phone_number: "123-456"
 * })
 * // { firstName: "John", lastName: "Doe", phoneNumber: "123-456" }
 * 
 * // Convert to snake_case
 * mapKeys((key: string) => 
 *   key.replace(/([A-Z])/g, "_$1").toLowerCase()
 * )({
 *   firstName: "Jane",
 *   lastName: "Smith",
 *   phoneNumber: "789-012"
 * })
 * // { first_name: "Jane", last_name: "Smith", phone_number: "789-012" }
 * 
 * // Numeric keys
 * mapKeys((key: string) => parseInt(key) * 10)({
 *   "1": "one",
 *   "2": "two",
 *   "3": "three"
 * })
 * // { "10": "one", "20": "two", "30": "three" }
 * 
 * // Duplicate keys - last value wins
 * mapKeys((key: string) => key.charAt(0))({
 *   apple: 1,
 *   apricot: 2,
 *   banana: 3
 * })
 * // { a: 2, b: 3 } (apricot overwrites apple)
 * 
 * // Symbol keys
 * const sym1 = Symbol("test")
 * const sym2 = Symbol("demo")
 * mapKeys((key: string | symbol) => 
 *   typeof key === "symbol" ? key : `prefixed_${key}`
 * )({
 *   regular: "value",
 *   [sym1]: "symValue"
 * })
 * // { prefixed_regular: "value", [Symbol(test)]: "symValue" }
 * 
 * // Empty object
 * mapKeys((key: string) => key.toUpperCase())({})
 * // {}
 * 
 * // Complex transformation
 * mapKeys((key: string) => {
 *   const parts = key.split(".")
 *   return parts[parts.length - 1]
 * })({
 *   "user.name": "Alice",
 *   "user.email": "alice@ex.com",
 *   "config.timeout": 5000
 * })
 * // { name: "Alice", email: "alice@ex.com", timeout: 5000 }
 * 
 * // Practical use cases
 * 
 * // API response key normalization
 * const normalizeApiResponse = mapKeys((key: string) =>
 *   key.replace(/^response_/, "").replace(/_/g, "-")
 * )
 * 
 * normalizeApiResponse({
 *   response_data: "content",
 *   response_status_code: 200,
 *   response_headers: {}
 * })
 * // { data: "content", "status-code": 200, headers: {} }
 * 
 * // Database column mapping
 * const dbToModel = mapKeys((key: string) => {
 *   const columnMap: Record<string, string> = {
 *     user_id: "id",
 *     user_name: "name",
 *     created_at: "createdAt",
 *     updated_at: "updatedAt"
 *   }
 *   return columnMap[key] || key
 * })
 * 
 * dbToModel({
 *   user_id: 123,
 *   user_name: "John",
 *   created_at: "2024-01-01",
 *   updated_at: "2024-01-02"
 * })
 * // { id: 123, name: "John", createdAt: "2024-01-01", updatedAt: "2024-01-02" }
 * 
 * // Environment variable formatting
 * const toEnvVars = mapKeys((key: string) =>
 *   `APP_${key.toUpperCase().replace(/\./g, "_")}`
 * )
 * 
 * toEnvVars({
 *   "server.port": 3000,
 *   "server.host": "localhost",
 *   "db.connection": "postgres://..."
 * })
 * // {
 * //   APP_SERVER_PORT: 3000,
 * //   APP_SERVER_HOST: "localhost",
 * //   APP_DB_CONNECTION: "postgres://..."
 * // }
 * 
 * // Partial application for reusable transformers
 * const toUpperKeys = mapKeys((key: string) => key.toUpperCase())
 * const toLowerKeys = mapKeys((key: string) => key.toLowerCase())
 * const addPrefix = (prefix: string) => 
 *   mapKeys((key: string) => `${prefix}${key}`)
 * 
 * const obj = { Name: "Alice", Age: 30 }
 * toUpperKeys(obj)    // { NAME: "Alice", AGE: 30 }
 * toLowerKeys(obj)    // { name: "Alice", age: 30 }
 * addPrefix("user_")(obj) // { user_Name: "Alice", user_Age: 30 }
 * 
 * // Filtering keys through transformation
 * const keepValidKeys = mapKeys((key: string) => {
 *   // Return empty string for invalid keys (will be overwritten if duplicates)
 *   if (key.startsWith("_")) return ""
 *   return key
 * })
 * 
 * keepValidKeys({
 *   valid: 1,
 *   _internal: 2,
 *   another: 3
 * })
 * // { valid: 1, "": 2, another: 3 }
 * ```
 * @property Immutable - creates a new object, doesn't modify the original
 * @property Key collision - when transformation creates duplicate keys, last wins
 * @property Flexible transformation - function can return any valid key type
 */
const mapKeys = <T extends Record<string | symbol, Value>>(
	fn: (key: string | symbol) => string | symbol,
) => (
	obj: T,
): Record<string | symbol, Value> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}
	
	const result: Record<string | symbol, Value> = {}
	
	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj)
	]
	
	// Transform each key and preserve the value
	for (const key of allKeys) {
		const newKey = fn(key)
		result[newKey] = obj[key]
	}
	
	return result
}

export default mapKeys