import isNotNull from "../isNotNull/index.ts"
import isNull from "../isNull/index.ts"

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
 * const validate = isJSON()
 * validate('{"name": "John", "age": 30}')  // true (object)
 * validate('[1, 2, 3]')                    // true (array)
 * validate('"hello"')                      // true (string)
 * validate('123')                           // true (number)
 * validate('null')                          // true (null)
 * validate('{invalid}')                     // false (malformed)
 *
 * // Validate specific types
 * const isJSONObject = isJSON({ type: 'object' })
 * isJSONObject('{"name": "John"}')         // true
 * isJSONObject('[1, 2, 3]')                // false (array)
 *
 * const isJSONArray = isJSON({ type: 'array' })
 * isJSONArray('[1, 2, 3]')                 // true
 * isJSONArray('{"name": "John"}')          // false (object)
 *
 * // Invalid JSON formats
 * const check = isJSON()
 * check("{name: 'John'}")                  // false (unquoted key)
 * check("{'name': 'John'}")                // false (single quotes)
 * check('{"name": "John",}')               // false (trailing comma)
 * check('undefined')                        // false (not valid JSON)
 *
 * // Safe JSON parsing
 * const safeParse = <T>(str: string, defaultVal: T): T => {
 *   return isJSON()(str) ? JSON.parse(str) : defaultVal
 * }
 * safeParse('{"x": 1}', {})                // { x: 1 }
 * safeParse('invalid', {})                 // {} (default)
 *
 * // Filter valid JSON
 * const inputs = ['{"valid": true}', 'not json', '[1, 2, 3]', 'null']
 * inputs.filter(isJSON())  // ['{"valid": true}', '[1, 2, 3]', 'null']
 *
 * // Edge cases
 * isJSON()(null)                           // false
 * isJSON()('')                             // false (empty)
 * isJSON()(123)                            // false (not a string)
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
					return isNotNull(parsed) && typeof parsed === "object" &&
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
					return isNull(parsed)
				default:
					return false
			}
		} catch {
			return false
		}
	}
}

export default isJSON
