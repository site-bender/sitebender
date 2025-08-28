/**
 * Validates JSON strings
 *
 * Checks whether a string is valid JSON that can be parsed without errors.
 * Optionally validates that the parsed result matches a specific type
 * (object, array, string, number, boolean, or null). Returns false for
 * non-string values, empty strings, or malformed JSON.
 *
 * JSON validation rules:
 * - Must be syntactically valid JSON
 * - Can be any valid JSON type: object, array, string, number, boolean, null
 * - Properly escaped strings
 * - No trailing commas
 * - No undefined values
 * - No JavaScript expressions or functions
 *
 * @param options - Optional configuration to validate specific JSON types
 * @returns A predicate function that validates JSON strings
 * @example
 * ```typescript
 * // Basic JSON validation
 * const isValidJSON = isJSON()
 *
 * isValidJSON('{"name": "John", "age": 30}')     // true (object)
 * isValidJSON('[1, 2, 3]')                       // true (array)
 * isValidJSON('"hello"')                         // true (string)
 * isValidJSON('123')                              // true (number)
 * isValidJSON('true')                             // true (boolean)
 * isValidJSON('null')                             // true (null)
 * isValidJSON('{invalid}')                        // false (malformed)
 * isValidJSON('')                                 // false (empty)
 *
 * // Validate specific JSON type - objects only
 * const isJSONObject = isJSON({ type: 'object' })
 *
 * isJSONObject('{"name": "John"}')               // true
 * isJSONObject('{}')                              // true (empty object)
 * isJSONObject('[1, 2, 3]')                       // false (array)
 * isJSONObject('"string"')                        // false (string)
 * isJSONObject('123')                             // false (number)
 *
 * // Validate arrays only
 * const isJSONArray = isJSON({ type: 'array' })
 *
 * isJSONArray('[1, 2, 3]')                       // true
 * isJSONArray('[]')                               // true (empty array)
 * isJSONArray('[{"id": 1}, {"id": 2}]')          // true
 * isJSONArray('{"name": "John"}')                // false (object)
 * isJSONArray('123')                              // false (number)
 *
 * // Complex nested structures
 * const validator = isJSON()
 *
 * validator('{"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}')  // true
 * validator('[[[1, 2], [3, 4]], [[5, 6], [7, 8]]]')                               // true
 * validator('{"a": {"b": {"c": {"d": "deep"}}}}')                                 // true
 *
 * // Invalid JSON formats
 * const checker = isJSON()
 *
 * checker("{name: 'John'}")                      // false (unquoted key)
 * checker("{'name': 'John'}")                    // false (single quotes)
 * checker('{"name": "John",}')                   // false (trailing comma)
 * checker('undefined')                            // false (undefined not valid JSON)
 * checker('NaN')                                 // false (NaN not valid JSON)
 * checker('Infinity')                            // false (Infinity not valid JSON)
 * checker('{"name": "John" "age": 30}')          // false (missing comma)
 *
 * // API response validation
 * const validateAPIResponse = (
 *   response: unknown
 * ): string | null => {
 *   if (typeof response !== 'string') {
 *     return 'Response must be a string'
 *   }
 *
 *   if (!isJSON({ type: 'object' })(response)) {
 *     return 'Response must be valid JSON object'
 *   }
 *
 *   const data = JSON.parse(response)
 *   if (!data.status || !data.data) {
 *     return 'Response missing required fields'
 *   }
 *
 *   return null
 * }
 *
 * validateAPIResponse('{"status": "ok", "data": []}')  // null (valid)
 * validateAPIResponse('{"invalid": true}')             // "Response missing required fields"
 * validateAPIResponse('[1, 2, 3]')                     // "Response must be valid JSON object"
 *
 * // Configuration file validation
 * const validateConfig = (configStr: string): boolean => {
 *   if (!isJSON({ type: 'object' })(configStr)) {
 *     return false
 *   }
 *
 *   try {
 *     const config = JSON.parse(configStr)
 *     return 'version' in config && 'settings' in config
 *   } catch {
 *     return false
 *   }
 * }
 *
 * validateConfig('{"version": "1.0", "settings": {}}')  // true
 * validateConfig('{"name": "app"}')                      // false
 *
 * // Filter valid JSON from array
 * const inputs = [
 *   '{"valid": true}',
 *   'not json',
 *   '[1, 2, 3]',
 *   '',
 *   'null',
 *   '{invalid}',
 *   '"string"'
 * ]
 *
 * const validJSONs = inputs.filter(isJSON())
 * // ['{"valid": true}', '[1, 2, 3]', 'null', '"string"']
 *
 * // Safe JSON parsing
 * const parseJSONSafely = <T = unknown>(
 *   jsonStr: string,
 *   defaultValue: T
 * ): T => {
 *   if (!isJSON()(jsonStr)) {
 *     return defaultValue
 *   }
 *
 *   try {
 *     return JSON.parse(jsonStr) as T
 *   } catch {
 *     return defaultValue
 *   }
 * }
 *
 * parseJSONSafely('{"x": 1}', {})        // { x: 1 }
 * parseJSONSafely('invalid', {})         // {} (default)
 * parseJSONSafely('[1, 2, 3]', [])       // [1, 2, 3]
 *
 * // JSON type detection
 * const getJSONType = (jsonStr: string): string | null => {
 *   if (!isJSON()(jsonStr)) {
 *     return null
 *   }
 *
 *   try {
 *     const parsed = JSON.parse(jsonStr)
 *     if (parsed === null) return 'null'
 *     if (Array.isArray(parsed)) return 'array'
 *     return typeof parsed
 *   } catch {
 *     return null
 *   }
 * }
 *
 * getJSONType('{"a": 1}')      // "object"
 * getJSONType('[1, 2, 3]')     // "array"
 * getJSONType('"hello"')       // "string"
 * getJSONType('123')           // "number"
 * getJSONType('true')          // "boolean"
 * getJSONType('null')          // "null"
 *
 * // JSONP callback validation
 * const isJSONPResponse = (response: string): boolean => {
 *   const callbackPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*\((.*)\);?$/
 *   const match = response.match(callbackPattern)
 *
 *   if (!match) {
 *     return false
 *   }
 *
 *   return isJSON()(match[1])
 * }
 *
 * isJSONPResponse('callback({"data": "value"})')    // true
 * isJSONPResponse('myFunc([1, 2, 3]);')            // true
 * isJSONPResponse('{"data": "value"}')             // false (not JSONP)
 *
 * // Pretty-printed JSON validation
 * const isPrettyJSON = (jsonStr: string): boolean => {
 *   if (!isJSON()(jsonStr)) {
 *     return false
 *   }
 *
 *   // Check if it contains newlines and indentation
 *   return /\n\s+/.test(jsonStr)
 * }
 *
 * isPrettyJSON('{\n  "name": "John",\n  "age": 30\n}')  // true
 * isPrettyJSON('{"name":"John","age":30}')              // false (minified)
 *
 * // Invalid inputs
 * isJSON()(null)                        // false
 * isJSON()(undefined)                   // false
 * isJSON()(123)                         // false (not a string)
 * isJSON()({})                          // false (not a string)
 * isJSON()('')                          // false (empty)
 * isJSON()('undefined')                 // false
 * isJSON()('function() {}')             // false
 * isJSON()("{'key': 'value'}")          // false (single quotes)
 *
 * // Large JSON validation
 * const isValidLargeJSON = (jsonStr: string, maxSize: number = 1000000): boolean => {
 *   if (jsonStr.length > maxSize) {
 *     return false  // Too large
 *   }
 *
 *   return isJSON()(jsonStr)
 * }
 *
 * const largeJSON = JSON.stringify({ data: new Array(1000).fill({ id: 1 }) })
 * isValidLargeJSON(largeJSON, 100000)  // true/false based on size
 *
 * // Schema-like validation
 * const hasJSONStructure = (
 *   jsonStr: string,
 *   requiredKeys: Array<string>
 * ): boolean => {
 *   if (!isJSON({ type: 'object' })(jsonStr)) {
 *     return false
 *   }
 *
 *   try {
 *     const obj = JSON.parse(jsonStr)
 *     return requiredKeys.every(key => key in obj)
 *   } catch {
 *     return false
 *   }
 * }
 *
 * hasJSONStructure('{"id": 1, "name": "Test"}', ['id', 'name'])  // true
 * hasJSONStructure('{"id": 1}', ['id', 'name'])                   // false
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
type JSONType = "object" | "array" | "string" | "number" | "boolean" | "null"

type JSONOptions = {
	type?: JSONType
}

const isJSON = (
	options: JSONOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		try {
			const parsed = JSON.parse(value)

			// If no specific type requested, any valid JSON is acceptable
			if (!options.type) {
				return true
			}

			// Validate specific type
			switch (options.type) {
				case "object":
					return parsed !== null && typeof parsed === "object" &&
						!Array.isArray(parsed)
				case "array":
					return Array.isArray(parsed)
				case "string":
					return typeof parsed === "string"
				case "number":
					return typeof parsed === "number"
				case "boolean":
					return typeof parsed === "boolean"
				case "null":
					return parsed === null
				default:
					return false
			}
		} catch {
			return false
		}
	}
}

export default isJSON
