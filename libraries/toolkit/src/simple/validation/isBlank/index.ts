import isNullish from "../isNullish/index.ts"

/**
 * Checks if a string is empty or contains only whitespace
 *
 * Determines whether a string is blank - either empty, null, undefined,
 * or containing only whitespace characters (spaces, tabs, newlines, etc.).
 * This is useful for validating user input, checking form fields, or
 * filtering out meaningless strings in data processing.
 *
 * @param str - String to check for blankness
 * @returns True if string is blank, false otherwise
 * @example
 * ```typescript
 * // Blank strings
 * isBlank("")              // true
 * isBlank("   ")           // true
 * isBlank("\t\t")          // true
 * isBlank("\n\n")          // true
 * isBlank(" \t\n\r ")      // true
 *
 * // Non-blank strings
 * isBlank("hello")         // false
 * isBlank("  hello  ")     // false
 * isBlank("a")             // false
 *
 * // Null/undefined
 * isBlank(null)            // true
 * isBlank(undefined)       // true
 *
 * // Form validation
 * const validateInput = (input: string) => {
 *   if (isBlank(input)) {
 *     return "Field is required"
 *   }
 *   return null
 * }
 * validateInput("   ")     // "Field is required"
 * validateInput("John")    // null
 *
 * // Filter blank lines
 * const lines = ["hello", "", "  ", "world", "\t", "!"]
 * const meaningful = lines.filter(line => !isBlank(line))  // ["hello", "world", "!"]
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isBlank = (
	str: string | null | undefined,
): boolean => {
	if (isNullish(str)) {
		return true
	}

	if (typeof str !== "string") {
		// Convert to string for non-string values
		str = String(str)
	}

	// Check if string is empty or contains only whitespace
	// \s matches all whitespace characters including Unicode spaces
	return str.trim().length === 0
}

export default isBlank
