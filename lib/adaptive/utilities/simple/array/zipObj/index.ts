/**
 * Creates an object from arrays of keys and values
 * 
 * Takes two arrays - one of keys and one of values - and creates an object
 * where each key is paired with its corresponding value by index position.
 * If arrays have different lengths, extra keys get undefined values, and
 * extra values are ignored. Keys must be strings or numbers. Useful for
 * creating objects from parallel arrays, configuration building, or
 * transforming tabular data.
 * 
 * @curried (values) => (keys) => result
 * @param values - Array of values for the object
 * @param keys - Array of keys for the object
 * @returns Object with keys mapped to corresponding values
 * @example
 * ```typescript
 * // Basic usage
 * zipObj([1, 2, 3])(["a", "b", "c"])
 * // { a: 1, b: 2, c: 3 }
 * 
 * // String values
 * zipObj(["Alice", "Bob", "Charlie"])(["name1", "name2", "name3"])
 * // { name1: "Alice", name2: "Bob", name3: "Charlie" }
 * 
 * // Mixed value types
 * zipObj([25, true, "Engineer"])(["age", "active", "role"])
 * // { age: 25, active: true, role: "Engineer" }
 * 
 * // More keys than values
 * zipObj([1, 2])(["a", "b", "c", "d"])
 * // { a: 1, b: 2, c: undefined, d: undefined }
 * 
 * // More values than keys (extra values ignored)
 * zipObj([1, 2, 3, 4, 5])(["x", "y", "z"])
 * // { x: 1, y: 2, z: 3 }
 * 
 * // Configuration object from arrays
 * const settingNames = ["theme", "fontSize", "autoSave", "notifications"]
 * const settingValues = ["dark", 14, true, false]
 * zipObj(settingValues)(settingNames)
 * // { theme: "dark", fontSize: 14, autoSave: true, notifications: false }
 * 
 * // Database column mapping
 * const columns = ["id", "name", "email", "created_at"]
 * const row = [1, "John Doe", "john@example.com", "2024-01-15"]
 * zipObj(row)(columns)
 * // { id: 1, name: "John Doe", email: "john@example.com", created_at: "2024-01-15" }
 * 
 * // Form field values
 * const fieldNames = ["firstName", "lastName", "email", "phone"]
 * const fieldValues = ["John", "Smith", "john.smith@email.com"]
 * zipObj(fieldValues)(fieldNames)
 * // { firstName: "John", lastName: "Smith", email: "john.smith@email.com", phone: undefined }
 * 
 * // API response transformation
 * const headers = ["userId", "score", "level", "achievements"]
 * const playerData = [12345, 98750, 15, 23]
 * zipObj(playerData)(headers)
 * // { userId: 12345, score: 98750, level: 15, achievements: 23 }
 * 
 * // Empty arrays
 * zipObj([])([])
 * // {}
 * 
 * zipObj([])(["a", "b"])
 * // { a: undefined, b: undefined }
 * 
 * zipObj([1, 2])([])
 * // {}
 * 
 * // Single key-value pair
 * zipObj(["hello"])(["greeting"])
 * // { greeting: "hello" }
 * 
 * // Object property mapping
 * const propertyNames = ["width", "height", "color", "border"]
 * const cssValues = ["100px", "50px", "red"]
 * zipObj(cssValues)(propertyNames)
 * // { width: "100px", height: "50px", color: "red", border: undefined }
 * 
 * // Date-based keys
 * const dates = ["2024-01", "2024-02", "2024-03"]
 * const sales = [10000, 12000, 11500]
 * zipObj(sales)(dates)
 * // { "2024-01": 10000, "2024-02": 12000, "2024-03": 11500 }
 * 
 * // Complex nested values
 * const keys = ["user", "session", "preferences"]
 * const values = [
 *   { id: 1, name: "Alice" },
 *   { token: "abc123", expires: "2024-12-31" },
 *   { theme: "dark", lang: "en" }
 * ]
 * zipObj(values)(keys)
 * // {
 * //   user: { id: 1, name: "Alice" },
 * //   session: { token: "abc123", expires: "2024-12-31" },
 * //   preferences: { theme: "dark", lang: "en" }
 * // }
 * 
 * // Function values
 * const eventNames = ["onClick", "onHover", "onFocus"]
 * const handlers = [
 *   () => console.log("clicked"),
 *   () => console.log("hovered"),
 *   () => console.log("focused")
 * ]
 * zipObj(handlers)(eventNames)
 * // { onClick: [Function], onHover: [Function], onFocus: [Function] }
 * 
 * // Array values
 * const listNames = ["fruits", "colors", "numbers"]
 * const lists = [
 *   ["apple", "banana"],
 *   ["red", "blue", "green"],
 *   [1, 2, 3, 4, 5]
 * ]
 * zipObj(lists)(listNames)
 * // {
 * //   fruits: ["apple", "banana"],
 * //   colors: ["red", "blue", "green"],
 * //   numbers: [1, 2, 3, 4, 5]
 * // }
 * 
 * // Numeric keys
 * zipObj(["first", "second", "third"])([1, 2, 3])
 * // { 1: "first", 2: "second", 3: "third" }
 * 
 * // Environment variables
 * const envKeys = ["NODE_ENV", "PORT", "DB_HOST", "DB_PORT"]
 * const envValues = ["production", "3000", "localhost"]
 * zipObj(envValues)(envKeys)
 * // { NODE_ENV: "production", PORT: "3000", DB_HOST: "localhost", DB_PORT: undefined }
 * 
 * // Partial application for reusable object creation
 * const createPerson = zipObj(["name", "age", "city"])
 * createPerson(["Alice", 30, "New York"])
 * // { name: "Alice", age: 30, city: "New York" }
 * 
 * const createProduct = zipObj(["id", "title", "price", "category"])
 * createProduct([1, "Laptop", 999.99, "Electronics"])
 * // { id: 1, title: "Laptop", price: 999.99, category: "Electronics" }
 * 
 * // Handle null/undefined gracefully
 * zipObj([1, 2, 3])(null)       // {}
 * zipObj([1, 2, 3])(undefined)  // {}
 * zipObj(null)(["a", "b"])      // { a: undefined, b: undefined }
 * zipObj(undefined)(["a", "b"]) // { a: undefined, b: undefined }
 * 
 * // CSV-like data transformation
 * const csvHeaders = ["name", "age", "department", "salary"]
 * const csvRow = ["John Doe", "28", "Engineering", "75000"]
 * zipObj(csvRow)(csvHeaders)
 * // { name: "John Doe", age: "28", department: "Engineering", salary: "75000" }
 * 
 * // Query parameter object
 * const paramNames = ["page", "limit", "sort", "filter"]
 * const paramValues = [1, 10, "name"]
 * zipObj(paramValues)(paramNames)
 * // { page: 1, limit: 10, sort: "name", filter: undefined }
 * 
 * // Localization keys and values
 * const i18nKeys = ["welcome_message", "error_text", "success_text"]
 * const translations = ["Welcome!", "An error occurred"]
 * zipObj(translations)(i18nKeys)
 * // { welcome_message: "Welcome!", error_text: "An error occurred", success_text: undefined }
 * 
 * // Statistical data object
 * const metrics = ["mean", "median", "mode", "stddev"]
 * const stats = [45.2, 44.0, 42.0, 3.7]
 * zipObj(stats)(metrics)
 * // { mean: 45.2, median: 44.0, mode: 42.0, stddev: 3.7 }
 * 
 * // RGB color object
 * zipObj([255, 128, 64])(["red", "green", "blue"])
 * // { red: 255, green: 128, blue: 64 }
 * 
 * // Coordinates object
 * zipObj([10, 20, 30])(["x", "y", "z"])
 * // { x: 10, y: 20, z: 30 }
 * 
 * // Boolean flags
 * const featureNames = ["darkMode", "notifications", "autoUpdate", "analytics"]
 * const featureStates = [true, false, true]
 * zipObj(featureStates)(featureNames)
 * // { darkMode: true, notifications: false, autoUpdate: true, analytics: undefined }
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Undefined-safe - missing values become undefined
 * @property Type-preserving - maintains value types in result object
 */
const zipObj = <T>(
	values: ReadonlyArray<T> | null | undefined
) => (
	keys: ReadonlyArray<string | number> | null | undefined
): Record<string | number, T | undefined> => {
	if (keys == null || !Array.isArray(keys)) {
		return {}
	}
	
	if (values == null || !Array.isArray(values)) {
		const result: Record<string | number, T | undefined> = {}
		for (const key of keys) {
			result[key] = undefined
		}
		return result
	}
	
	const result: Record<string | number, T | undefined> = {}
	
	for (let i = 0; i < keys.length; i++) {
		result[keys[i]] = i < values.length ? values[i] : undefined
	}
	
	return result
}

export default zipObj