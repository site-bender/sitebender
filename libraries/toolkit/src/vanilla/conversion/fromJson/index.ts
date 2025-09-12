/**
 * Parses JSON strings to JavaScript values
 *
 * Safely parses JSON strings with error handling. Returns null for
 * invalid JSON instead of throwing, making it easy to wrap in Either
 * monad later. This is the simple version for basic JSON parsing.
 *
 * @pure
 * @safe
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
 *
 * // Invalid JSON
 * fromJson('{invalid}')                 // null
 * fromJson('')                          // null
 * fromJson('undefined')                 // null
 *
 * // LocalStorage pattern
 * const stored = localStorage.getItem(key)
 * const data = stored ? fromJson(stored) : null
 * ```
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
