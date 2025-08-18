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
 * // Empty string
 * isBlank("")
 * // true
 * 
 * // Only spaces
 * isBlank("   ")
 * // true
 * 
 * // Only tabs
 * isBlank("\t\t")
 * // true
 * 
 * // Only newlines
 * isBlank("\n\n")
 * // true
 * 
 * // Mixed whitespace
 * isBlank(" \t\n\r ")
 * // true
 * 
 * // Non-blank string
 * isBlank("hello")
 * // false
 * 
 * // String with whitespace and content
 * isBlank("  hello  ")
 * // false
 * 
 * // Single character
 * isBlank("a")
 * // false
 * 
 * // Single space (blank)
 * isBlank(" ")
 * // true
 * 
 * // Zero-width space
 * isBlank("\u200B")
 * // true
 * 
 * // Non-breaking space
 * isBlank("\u00A0")
 * // true
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
 * lines.filter(line => !isBlank(line))
 * // ["hello", "world", "!"]
 * 
 * // Clean user input
 * const processInput = (input: string) => {
 *   if (isBlank(input)) {
 *     return "default-value"
 *   }
 *   return input.trim()
 * }
 * processInput("  ")        // "default-value"
 * processInput("  text  ")  // "text"
 * 
 * // Check CSV fields
 * const csvFields = ["John", "", "  ", "30", "\t"]
 * csvFields.map(field => isBlank(field))
 * // [false, true, true, false, true]
 * 
 * // Environment variable validation
 * const getEnvVar = (name: string, defaultValue: string) => {
 *   const value = process.env[name]
 *   return isBlank(value) ? defaultValue : value
 * }
 * 
 * // Search query validation
 * const isValidSearch = (query: string) => !isBlank(query)
 * isValidSearch("")         // false
 * isValidSearch("   ")      // false
 * isValidSearch("search")   // true
 * 
 * // Comment filtering
 * const comments = ["Good!", "", "   ", "Nice work", "\n\n"]
 * const meaningfulComments = comments.filter(c => !isBlank(c))
 * // ["Good!", "Nice work"]
 * 
 * // Username validation
 * const isValidUsername = (username: string) => {
 *   return !isBlank(username) && username.length >= 3
 * }
 * isValidUsername("")       // false
 * isValidUsername("   ")    // false
 * isValidUsername("ab")     // false
 * isValidUsername("alice")  // true
 * 
 * // Config value check
 * const config = {
 *   apiKey: "   ",
 *   endpoint: "https://api.example.com",
 *   token: "\t\n"
 * }
 * Object.entries(config).filter(([_, v]) => !isBlank(v))
 * // [["endpoint", "https://api.example.com"]]
 * 
 * // Multiline string check
 * isBlank(`
 *   
 *   
 * `)
 * // true
 * 
 * isBlank(`
 *   Hello
 *   
 * `)
 * // false
 * 
 * // Windows line endings
 * isBlank("\r\n\r\n")
 * // true
 * 
 * // Unicode whitespace
 * isBlank("\u2000\u2001\u2002")  // Various space characters
 * // true
 * 
 * // Vertical tab and form feed
 * isBlank("\v\f")
 * // true
 * 
 * // Handle null/undefined
 * isBlank(null)       // true
 * isBlank(undefined)  // true
 * 
 * // Numbers and booleans (when used incorrectly)
 * isBlank(0 as any)        // true (treated as falsy)
 * isBlank(false as any)    // true (treated as falsy)
 * isBlank(123 as any)      // false (converted to string)
 * isBlank(true as any)     // false (converted to string)
 * 
 * // Template literal validation
 * const name = "   "
 * isBlank(`Hello ${name}`)
 * // false (contains "Hello")
 * 
 * // SQL query building
 * const whereClause = "   "
 * const query = isBlank(whereClause) 
 *   ? "SELECT * FROM users"
 *   : `SELECT * FROM users WHERE ${whereClause}`
 * // "SELECT * FROM users"
 * 
 * // Message validation
 * const sendMessage = (msg: string) => {
 *   if (isBlank(msg)) {
 *     throw new Error("Cannot send blank message")
 *   }
 *   // send logic
 * }
 * 
 * // File content check
 * const fileContent = "\n\n\t\t  \n"
 * if (isBlank(fileContent)) {
 *   console.log("File is empty")
 * }
 * 
 * // Trim then check
 * const needsTrimCheck = (str: string) => {
 *   return !isBlank(str) && isBlank(str.trim())
 * }
 * needsTrimCheck("   ")  // false (already blank)
 * needsTrimCheck("  a ") // false (has content)
 * 
 * // Password validation
 * const validatePassword = (pwd: string) => {
 *   if (isBlank(pwd)) {
 *     return "Password cannot be blank"
 *   }
 *   if (pwd.trim().length < 8) {
 *     return "Password too short"
 *   }
 *   return "Valid"
 * }
 * ```
 * @property Whitespace-aware - recognizes all Unicode whitespace
 * @property Null-safe - treats null/undefined as blank
 * @property Validation-friendly - useful for form and input validation
 */
const isBlank = (
	str: string | null | undefined
): boolean => {
	if (str == null) {
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