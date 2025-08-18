/**
 * Extracts a list of property values from an array of objects
 * 
 * Maps over an array of objects and extracts the value of a specified
 * property from each object. Returns an array of the extracted values.
 * If an object doesn't have the property, undefined is included in the
 * result. This is a specialized map operation for property extraction.
 * 
 * @curried (key) => (array) => result
 * @param key - The property key to extract from each object
 * @param array - Array of objects to extract property from
 * @returns Array of extracted property values
 * @example
 * ```typescript
 * // Extract names from users
 * const users = [
 *   { id: 1, name: "Alice", age: 30 },
 *   { id: 2, name: "Bob", age: 25 },
 *   { id: 3, name: "Charlie", age: 35 }
 * ]
 * pluck("name")(users)
 * // ["Alice", "Bob", "Charlie"]
 * 
 * // Extract ages
 * pluck("age")(users)
 * // [30, 25, 35]
 * 
 * // Extract nested properties using dot notation (requires implementation)
 * const data = [
 *   { user: { name: "Alice", email: "alice@example.com" } },
 *   { user: { name: "Bob", email: "bob@example.com" } },
 *   { user: { name: "Charlie", email: "charlie@example.com" } }
 * ]
 * // For nested, you'd need to use: data.map(d => d.user.email)
 * // This pluck handles single-level properties
 * 
 * // Extract from array of products
 * const products = [
 *   { sku: "ABC123", price: 29.99, stock: 10 },
 *   { sku: "DEF456", price: 49.99, stock: 5 },
 *   { sku: "GHI789", price: 19.99, stock: 0 }
 * ]
 * pluck("price")(products)
 * // [29.99, 49.99, 19.99]
 * 
 * pluck("stock")(products)
 * // [10, 5, 0]
 * 
 * // Handle missing properties
 * const mixed = [
 *   { a: 1, b: 2 },
 *   { a: 3 },
 *   { a: 4, b: 5, c: 6 },
 *   { b: 7 }
 * ]
 * pluck("a")(mixed)
 * // [1, 3, 4, undefined]
 * 
 * pluck("c")(mixed)
 * // [undefined, undefined, 6, undefined]
 * 
 * // Extract boolean flags
 * const items = [
 *   { id: 1, active: true, verified: false },
 *   { id: 2, active: false, verified: true },
 *   { id: 3, active: true, verified: true }
 * ]
 * pluck("active")(items)
 * // [true, false, true]
 * 
 * pluck("verified")(items)
 * // [false, true, true]
 * 
 * // Extract dates
 * const events = [
 *   { name: "Meeting", date: new Date("2024-01-01") },
 *   { name: "Conference", date: new Date("2024-02-15") },
 *   { name: "Workshop", date: new Date("2024-03-20") }
 * ]
 * pluck("date")(events)
 * // [Date("2024-01-01"), Date("2024-02-15"), Date("2024-03-20")]
 * 
 * // Extract from records/maps
 * const records = [
 *   { id: "a", value: 100 },
 *   { id: "b", value: 200 },
 *   { id: "c", value: 300 }
 * ]
 * pluck("id")(records)
 * // ["a", "b", "c"]
 * 
 * // Empty array
 * pluck("any")([])
 * // []
 * 
 * // Single object
 * pluck("key")([{ key: "value" }])
 * // ["value"]
 * 
 * // Numeric keys (array indices)
 * const arrays = [
 *   [10, 20, 30],
 *   [40, 50, 60],
 *   [70, 80, 90]
 * ]
 * pluck(1)(arrays)  // Extract index 1 from each array
 * // [20, 50, 80]
 * 
 * // Symbol keys
 * const sym = Symbol("special")
 * const withSymbols = [
 *   { [sym]: "secret1", public: "data1" },
 *   { [sym]: "secret2", public: "data2" },
 *   { [sym]: "secret3", public: "data3" }
 * ]
 * pluck(sym)(withSymbols)
 * // ["secret1", "secret2", "secret3"]
 * 
 * // Partial application for reusable extractors
 * const getName = pluck("name")
 * const getId = pluck("id")
 * const getEmail = pluck("email")
 * 
 * const contacts = [
 *   { id: 1, name: "Alice", email: "alice@example.com" },
 *   { id: 2, name: "Bob", email: "bob@example.com" }
 * ]
 * getName(contacts)   // ["Alice", "Bob"]
 * getId(contacts)     // [1, 2]
 * getEmail(contacts)  // ["alice@example.com", "bob@example.com"]
 * 
 * // Extract for calculations
 * const scores = [
 *   { student: "Alice", score: 85 },
 *   { student: "Bob", score: 92 },
 *   { student: "Charlie", score: 78 }
 * ]
 * const values = pluck("score")(scores)
 * const average = values.reduce((a, b) => a + b, 0) / values.length
 * // average: 85
 * 
 * // Extract for filtering
 * const tasks = [
 *   { id: 1, title: "Task 1", completed: true },
 *   { id: 2, title: "Task 2", completed: false },
 *   { id: 3, title: "Task 3", completed: true }
 * ]
 * const completedIds = tasks
 *   .filter(t => t.completed)
 *   .map(t => t.id)
 * // Or using pluck:
 * const allIds = pluck("id")(tasks.filter(t => t.completed))
 * // [1, 3]
 * 
 * // Handle null/undefined gracefully
 * pluck("key")(null)       // []
 * pluck("key")(undefined)  // []
 * 
 * // Mixed types in array
 * const mixedTypes = [
 *   { val: 1 },
 *   "not an object",
 *   { val: 2 },
 *   42,
 *   { val: 3 },
 *   null
 * ] as any[]
 * pluck("val")(mixedTypes)
 * // [1, undefined, 2, undefined, 3, undefined]
 * 
 * // Extract method results (note: doesn't call methods)
 * const objects = [
 *   { getValue: () => 10, value: 10 },
 *   { getValue: () => 20, value: 20 },
 *   { getValue: () => 30, value: 30 }
 * ]
 * pluck("getValue")(objects)  // Returns the functions, doesn't call them
 * // [function, function, function]
 * pluck("value")(objects)
 * // [10, 20, 30]
 * 
 * // Database-like operations
 * const rows = [
 *   { id: 1, firstName: "Alice", lastName: "Smith" },
 *   { id: 2, firstName: "Bob", lastName: "Jones" },
 *   { id: 3, firstName: "Charlie", lastName: "Brown" }
 * ]
 * const firstNames = pluck("firstName")(rows)
 * // ["Alice", "Bob", "Charlie"]
 * const lastNames = pluck("lastName")(rows)
 * // ["Smith", "Jones", "Brown"]
 * ```
 * @property Immutable - doesn't modify input array or objects
 * @property Type-safe - preserves property value types
 * @property Undefined-safe - returns undefined for missing properties
 */
const pluck = <T, K extends keyof T>(
	key: K
) => (
	array: ReadonlyArray<T> | null | undefined
): Array<T[K] | undefined> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}
	
	return array.map(item => 
		item != null && typeof item === "object" ? item[key] : undefined
	)
}

export default pluck