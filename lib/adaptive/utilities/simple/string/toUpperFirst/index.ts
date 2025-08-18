/**
 * Uppercases only the first character of a string
 * 
 * Converts the first character to uppercase while leaving the rest
 * of the string unchanged. Useful for capitalizing words, creating
 * PascalCase identifiers, or starting sentences properly.
 * 
 * @param str - String to process
 * @returns String with first character uppercased
 * @example
 * ```typescript
 * // Basic capitalization
 * toUpperFirst("hello")
 * // "Hello"
 * 
 * // Already uppercase
 * toUpperFirst("Hello")
 * // "Hello"
 * 
 * // All lowercase
 * toUpperFirst("hello world")
 * // "Hello world"
 * 
 * // camelCase to PascalCase
 * toUpperFirst("camelCase")
 * // "CamelCase"
 * 
 * // Single character
 * toUpperFirst("a")
 * // "A"
 * 
 * // Empty string
 * toUpperFirst("")
 * // ""
 * 
 * // Number/symbol start (unchanged)
 * toUpperFirst("123abc")
 * // "123abc"
 * 
 * toUpperFirst("!hello")
 * // "!hello"
 * 
 * // Variable to class name
 * toUpperFirst("userController")
 * // "UserController"
 * 
 * // Create React component name
 * toUpperFirst("button")
 * // "Button"
 * 
 * // SQL to proper case
 * toUpperFirst("firstname")
 * // "Firstname"
 * 
 * // Sentence start
 * toUpperFirst("the quick brown fox")
 * // "The quick brown fox"
 * 
 * // Whitespace preserved
 * toUpperFirst("  hello")
 * // "  hello" (first char is space)
 * 
 * // Unicode support
 * toUpperFirst("über")
 * // "Über"
 * 
 * toUpperFirst("école")
 * // "École"
 * 
 * // Create class name from prop
 * const toClassName = (prop: string) => {
 *   return toUpperFirst(prop) + "Component"
 * }
 * toClassName("header")  // "HeaderComponent"
 * 
 * // Title case helper
 * const toTitleCase = (str: string) => {
 *   return str.split(" ")
 *     .map(word => toUpperFirst(word.toLowerCase()))
 *     .join(" ")
 * }
 * toTitleCase("hello world test")  // "Hello World Test"
 * 
 * // Create setter name
 * const toSetter = (prop: string) => "set" + toUpperFirst(prop)
 * toSetter("name")  // "setName"
 * 
 * // Handle null/undefined
 * toUpperFirst(null)       // ""
 * toUpperFirst(undefined)  // ""
 * 
 * // File name to display name
 * const fileToDisplay = (filename: string) => {
 *   const name = filename.replace(/\.[^.]+$/, "")
 *   return toUpperFirst(name.replace(/-/g, " "))
 * }
 * fileToDisplay("my-document.pdf")  // "My document"
 * 
 * // Acronym handling
 * toUpperFirst("api")  // "Api" (not "API")
 * toUpperFirst("url")  // "Url" (not "URL")
 * 
 * // Create enum value
 * const toEnumValue = (value: string) => {
 *   return toUpperFirst(value.toLowerCase())
 * }
 * toEnumValue("SUCCESS")  // "Success"
 * ```
 * @property First-only - only affects first character
 * @property Unicode-aware - handles international characters
 * @property Rest-preserving - maintains remaining characters as-is
 */
const toUpperFirst = (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string" || str.length === 0) {
		return ""
	}
	
	return str[0].toUpperCase() + str.slice(1)
}

export default toUpperFirst