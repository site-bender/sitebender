/**
 * Converts values to JSON strings
 * 
 * Safely serializes JavaScript values to JSON with error handling.
 * Returns null for values that cannot be serialized instead of throwing.
 * Handles circular references and other JSON serialization issues.
 * 
 * @curried (indent) => (value) => result
 * @param indent - Number of spaces for pretty printing (0 for compact)
 * @param value - The value to serialize to JSON
 * @returns The JSON string or null if serialization fails
 * @example
 * ```typescript
 * // Basic serialization (compact)
 * const compact = toJson(0)
 * compact({ name: "John", age: 30 })    // '{"name":"John","age":30}'
 * compact([1, 2, 3])                    // '[1,2,3]'
 * compact("hello")                       // '"hello"'
 * compact(42)                            // '42'
 * compact(true)                          // 'true'
 * compact(null)                          // 'null'
 * 
 * // Pretty printing
 * const pretty = toJson(2)
 * pretty({ name: "John", age: 30 })
 * // '{
 * //   "name": "John",
 * //   "age": 30
 * // }'
 * 
 * const indent4 = toJson(4)
 * indent4({ a: { b: { c: 1 } } })
 * // '{
 * //     "a": {
 * //         "b": {
 * //             "c": 1
 * //         }
 * //     }
 * // }'
 * 
 * // Values that cannot be serialized
 * toJson(0)(undefined)                  // null (undefined not valid JSON)
 * toJson(0)(Symbol("test"))              // null (symbols not serializable)
 * toJson(0)(() => {})                   // null (functions not serializable)
 * 
 * // Circular references handled
 * const obj: any = { a: 1 }
 * obj.self = obj
 * toJson(0)(obj)                         // null (circular reference)
 * 
 * // Special values in objects
 * toJson(0)({
 *   str: "hello",
 *   num: 42,
 *   bool: true,
 *   nil: null,
 *   undef: undefined,    // omitted
 *   func: () => {},      // omitted
 *   sym: Symbol("test")  // omitted
 * })
 * // '{"str":"hello","num":42,"bool":true,"nil":null}'
 * 
 * // Arrays with special values
 * toJson(0)([1, undefined, 3])          // '[1,null,3]'
 * toJson(0)([1, () => {}, 3])           // '[1,null,3]'
 * 
 * // Date serialization
 * const date = new Date("2024-03-15T12:00:00Z")
 * toJson(0)(date)                       // '"2024-03-15T12:00:00.000Z"'
 * 
 * // API request preparation
 * function sendData(endpoint: string, data: unknown) {
 *   const json = toJson(0)(data)
 *   if (!json) {
 *     throw new Error("Data cannot be serialized")
 *   }
 *   
 *   return fetch(endpoint, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: json
 *   })
 * }
 * 
 * // LocalStorage saving
 * function saveToStorage(key: string, value: unknown): boolean {
 *   const json = toJson(0)(value)
 *   if (!json) return false
 *   
 *   localStorage.setItem(key, json)
 *   return true
 * }
 * 
 * // Configuration export
 * function exportConfig(config: Record<string, unknown>) {
 *   const prettyJson = toJson(2)(config)
 *   if (!prettyJson) {
 *     console.error("Invalid configuration")
 *     return ""
 *   }
 *   return prettyJson
 * }
 * 
 * // Logging helper
 * function logData(label: string, data: unknown) {
 *   const json = toJson(2)(data) || "Unable to serialize"
 *   console.log(`${label}:\n${json}`)
 * }
 * 
 * logData("User Data", { id: 1, name: "Alice" })
 * // User Data:
 * // {
 * //   "id": 1,
 * //   "name": "Alice"
 * // }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null instead of throwing errors
 * @property Curried - Indent parameter can be partially applied
 * @property Standard - Uses native JSON.stringify internally
 */
const toJson = (indent: number = 0) => (value: unknown): string | null => {
	// Handle values that are not serializable
	if (value === undefined || typeof value === "symbol" || typeof value === "function") {
		return null
	}
	
	try {
		// Use indent for pretty printing (0 means no formatting)
		const space = indent > 0 ? indent : undefined
		return JSON.stringify(value, null, space)
	} catch {
		// Return null for circular references or other serialization errors
		return null
	}
}

export default toJson