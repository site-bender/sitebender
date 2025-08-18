import type { Value } from "../../../../types/index.ts"
import zipObj from "../zipObj/index.ts"

/**
 * Creates an object from arrays of keys and values
 * 
 * Combines two arrays into an object where the first array provides the keys
 * and the second array provides the corresponding values. This is an alias
 * for zipObj with identical behavior. If arrays have different lengths, the
 * shorter length is used.
 * 
 * @curried (keys) => (values) => result
 * @param keys - Array of property keys
 * @param values - Array of corresponding values
 * @returns An object with keys mapped to values
 * @example
 * ```typescript
 * // Basic object creation
 * zipObject(["a", "b", "c"])([1, 2, 3])
 * // { a: 1, b: 2, c: 3 }
 * 
 * zipObject(["name", "age", "city"])(["Alice", 30, "NYC"])
 * // { name: "Alice", age: 30, city: "NYC" }
 * 
 * // Different lengths - uses shorter
 * zipObject(["a", "b", "c"])([1, 2])
 * // { a: 1, b: 2 }
 * 
 * zipObject(["a", "b"])([1, 2, 3, 4])
 * // { a: 1, b: 2 }
 * 
 * // Empty arrays
 * zipObject([])([])
 * // {}
 * 
 * zipObject(["a", "b"])([])
 * // {}
 * 
 * zipObject([])([1, 2])
 * // {}
 * 
 * // Mixed value types
 * zipObject(["string", "number", "boolean", "array", "object"])([
 *   "text",
 *   42,
 *   true,
 *   [1, 2, 3],
 *   { nested: "value" }
 * ])
 * // {
 * //   string: "text",
 * //   number: 42,
 * //   boolean: true,
 * //   array: [1, 2, 3],
 * //   object: { nested: "value" }
 * // }
 * 
 * // Null and undefined values
 * zipObject(["a", "b", "c"])([null, undefined, 0])
 * // { a: null, b: undefined, c: 0 }
 * 
 * // Duplicate keys - last value wins
 * zipObject(["a", "b", "a"])([1, 2, 3])
 * // { a: 3, b: 2 }
 * 
 * // Number keys (converted to strings)
 * zipObject([1, 2, 3])(["one", "two", "three"])
 * // { "1": "one", "2": "two", "3": "three" }
 * 
 * // Symbol keys
 * const sym1 = Symbol("key1")
 * const sym2 = Symbol("key2")
 * zipObject([sym1, sym2, "regular"])(["value1", "value2", "value3"])
 * // { [Symbol(key1)]: "value1", [Symbol(key2)]: "value2", regular: "value3" }
 * 
 * // Practical use cases
 * 
 * // CSV header mapping
 * const headers = ["id", "name", "email", "role"]
 * const row = [1, "Alice", "alice@ex.com", "admin"]
 * zipObject(headers)(row)
 * // { id: 1, name: "Alice", email: "alice@ex.com", role: "admin" }
 * 
 * // Form field mapping
 * const fieldNames = ["username", "password", "email"]
 * const fieldValues = ["john_doe", "secure123", "john@ex.com"]
 * zipObject(fieldNames)(fieldValues)
 * // { username: "john_doe", password: "secure123", email: "john@ex.com" }
 * 
 * // Configuration from arrays
 * const configKeys = ["host", "port", "ssl", "timeout"]
 * const configValues = ["localhost", 3000, true, 5000]
 * zipObject(configKeys)(configValues)
 * // { host: "localhost", port: 3000, ssl: true, timeout: 5000 }
 * 
 * // Database column mapping
 * const columns = ["user_id", "user_name", "created_at"]
 * const values = [123, "Bob", "2024-01-01"]
 * zipObject(columns)(values)
 * // { user_id: 123, user_name: "Bob", created_at: "2024-01-01" }
 * 
 * // Query parameter construction
 * const paramNames = ["page", "limit", "sort", "order"]
 * const paramValues = [1, 10, "name", "asc"]
 * zipObject(paramNames)(paramValues)
 * // { page: 1, limit: 10, sort: "name", order: "asc" }
 * 
 * // Language translation mapping
 * const english = ["yes", "no", "maybe"]
 * const spanish = ["sí", "no", "quizás"]
 * zipObject(english)(spanish)
 * // { yes: "sí", no: "no", maybe: "quizás" }
 * 
 * // Coordinate mapping
 * const axes = ["x", "y", "z"]
 * const coordinates = [10, 20, 30]
 * zipObject(axes)(coordinates)
 * // { x: 10, y: 20, z: 30 }
 * 
 * // Partial application for reusable builders
 * const buildUser = zipObject(["id", "name", "email", "role"])
 * 
 * buildUser([1, "Alice", "alice@ex.com", "admin"])
 * // { id: 1, name: "Alice", email: "alice@ex.com", role: "admin" }
 * 
 * buildUser([2, "Bob", "bob@ex.com", "user"])
 * // { id: 2, name: "Bob", email: "bob@ex.com", role: "user" }
 * 
 * // Matrix to object conversion
 * const matrix = [
 *   ["name", "age", "city"],
 *   ["Alice", 30, "NYC"],
 *   ["Bob", 25, "LA"]
 * ]
 * 
 * const headers2 = matrix[0]
 * const objects = matrix.slice(1).map(zipObject(headers2))
 * // [
 * //   { name: "Alice", age: 30, city: "NYC" },
 * //   { name: "Bob", age: 25, city: "LA" }
 * // ]
 * 
 * // Environment variable mapping
 * const envKeys = ["NODE_ENV", "PORT", "HOST"]
 * const envValues = ["production", "8080", "0.0.0.0"]
 * zipObject(envKeys)(envValues)
 * // { NODE_ENV: "production", PORT: "8080", HOST: "0.0.0.0" }
 * 
 * // Comparison with zipObj (they're identical)
 * zipObject(["a", "b"])([1, 2])  // { a: 1, b: 2 }
 * zipObj(["a", "b"])([1, 2])     // { a: 1, b: 2 }
 * 
 * // Dynamic object creation
 * const createObject = (keys: Array<string>) => (values: Array<any>) =>
 *   zipObject(keys)(values)
 * 
 * const personBuilder = createObject(["firstName", "lastName", "age"])
 * personBuilder(["John", "Doe", 35])
 * // { firstName: "John", lastName: "Doe", age: 35 }
 * ```
 * @property Alias for zipObj - identical behavior to the zipObj function
 * @property Length matching - uses the shorter array length
 * @property Type flexible - works with any key and value types
 */
const zipObject = <K extends string | symbol, V extends Value>(
	keys: Array<K>,
) => (
	values: Array<V>,
): Record<K, V> => {
	// Use zipObj internally since zipObject is an alias
	return zipObj(keys)(values)
}

export default zipObject