/**
 * Parses JSON strings to JavaScript values
 *
 * Safely parses JSON strings with error handling. Returns null for
 * invalid JSON instead of throwing, making it easy to wrap in Either
 * monad later. This is the simple version for basic JSON parsing.
 *
 * @param json - The JSON string to parse
 * @returns The parsed value or null if invalid
 * @example
 * ```typescript
 * // Valid JSON
 * fromJson('{"name":"John","age":30}')  // { name: "John", age: 30 }
 * fromJson('[1, 2, 3]')                 // [1, 2, 3]
 * fromJson('"hello"')                   // "hello"
 * fromJson('42')                        // 42
 * fromJson('true')                      // true
 * fromJson('null')                      // null
 *
 * // Invalid JSON
 * fromJson('{invalid}')                 // null
 * fromJson("{'single': 'quotes'}")      // null (must use double quotes)
 * fromJson('{name: "John"}')            // null (keys must be quoted)
 * fromJson('[1, 2, 3,]')                // null (trailing comma)
 * fromJson('undefined')                 // null (undefined not valid JSON)
 * fromJson('')                          // null (empty string)
 *
 * // Complex structures
 * fromJson('{"users":[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]}')
 * // { users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }] }
 *
 * // API response parsing
 * async function fetchData(url: string) {
 *   const response = await fetch(url)
 *   const text = await response.text()
 *   const data = fromJson(text)
 *
 *   if (data === null) {
 *     console.error("Invalid JSON response")
 *     return null
 *   }
 *
 *   return data
 * }
 *
 * // Configuration loading
 * function loadConfig(configString: string) {
 *   const config = fromJson(configString)
 *   if (!config || typeof config !== "object") {
 *     return { defaultKey: "defaultValue" }
 *   }
 *   return config
 * }
 *
 * // LocalStorage reading
 * function getStoredData(key: string) {
 *   const stored = localStorage.getItem(key)
 *   if (!stored) return null
 *
 *   return fromJson(stored)
 * }
 *
 * // Safe parsing with validation
 * function parseUserData(jsonString: string) {
 *   const data = fromJson(jsonString)
 *
 *   if (!data || typeof data !== "object") {
 *     return null
 *   }
 *
 *   if (!("name" in data) || !("email" in data)) {
 *     return null
 *   }
 *
 *   return data as { name: string; email: string }
 * }
 *
 * // Handling different input types
 * const inputs = [
 *   '{"valid": true}',
 *   'not json',
 *   '123',
 *   '[]',
 *   null,
 *   undefined
 * ]
 *
 * const results = inputs.map(input =>
 *   typeof input === "string" ? fromJson(input) : null
 * )
 * // [{ valid: true }, null, 123, [], null, null]
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null instead of throwing errors
 * @property Standard - Uses native JSON.parse internally
 */
const fromJson = (json: string): unknown => {
	// Handle empty or non-string input
	if (!json || typeof json !== "string") {
		return null
	}

	try {
		return JSON.parse(json)
	} catch {
		// Return null for any parsing errors
		return null
	}
}

export default fromJson
