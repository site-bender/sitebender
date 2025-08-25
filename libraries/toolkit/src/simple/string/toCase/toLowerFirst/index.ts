/**
 * Lowercases only the first character of a string
 *
 * Converts the first character to lowercase while leaving the rest
 * of the string unchanged. Useful for converting PascalCase to camelCase,
 * adjusting sentence formatting, or creating identifiers.
 *
 * @param str - String to process
 * @returns String with first character lowercased
 * @example
 * ```typescript
 * // PascalCase to camelCase
 * toLowerFirst("PascalCase")
 * // "pascalCase"
 *
 * // Already lowercase
 * toLowerFirst("hello")
 * // "hello"
 *
 * // All caps
 * toLowerFirst("HELLO")
 * // "hELLO"
 *
 * // Single character
 * toLowerFirst("A")
 * // "a"
 *
 * // Empty string
 * toLowerFirst("")
 * // ""
 *
 * // Number/symbol start (unchanged)
 * toLowerFirst("123abc")
 * // "123abc"
 *
 * toLowerFirst("!Hello")
 * // "!Hello"
 *
 * // Class to variable name
 * toLowerFirst("UserController")
 * // "userController"
 *
 * // Component to prop name
 * toLowerFirst("MyComponent")
 * // "myComponent"
 *
 * // SQL column naming
 * toLowerFirst("FirstName")
 * // "firstName"
 *
 * // Sentence adjustment
 * toLowerFirst("THE QUICK BROWN FOX")
 * // "tHE QUICK BROWN FOX"
 *
 * // Whitespace preserved
 * toLowerFirst("  Hello")
 * // "  Hello" (first char is space)
 *
 * // Unicode support
 * toLowerFirst("Über")
 * // "über"
 *
 * toLowerFirst("École")
 * // "école"
 *
 * // Create getter name
 * const toGetter = (prop: string) => "get" + prop
 * const toVariable = (getter: string) => toLowerFirst(getter.slice(3))
 * toVariable("getName")  // "name"
 *
 * // Convert constants
 * const constantToVariable = (constant: string) => {
 *   const pascal = constant.split("_")
 *     .map(w => w[0] + w.slice(1).toLowerCase())
 *     .join("")
 *   return toLowerFirst(pascal)
 * }
 * constantToVariable("USER_NAME")  // "userName"
 *
 * // Handle null/undefined
 * toLowerFirst(null)       // ""
 * toLowerFirst(undefined)  // ""
 *
 * // Method chaining helper
 * const chain = ["Get", "User", "Name"]
 *   .map((part, i) => i === 0 ? toLowerFirst(part) : part)
 *   .join("")
 * // "getUserName"
 * ```
 * @property First-only - only affects first character
 * @property Unicode-aware - handles international characters
 * @property Rest-preserving - maintains remaining characters as-is
 */
const toLowerFirst = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string" || str.length === 0) {
		return ""
	}

	return str[0].toLowerCase() + str.slice(1)
}

export default toLowerFirst
