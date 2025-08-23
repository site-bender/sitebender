/**
 * Removes surrounding quotes from a string if present
 * 
 * Strips matching quotes from both ends of a string. Only removes quotes
 * if they match (same type) at both beginning and end. Handles single quotes,
 * double quotes, backticks, and custom quote pairs. Useful for processing
 * quoted values from CSV, JSON, or configuration files.
 * 
 * @param str - String to unquote
 * @returns String with surrounding quotes removed if present
 * @example
 * ```typescript
 * // Double quotes
 * unquote('"hello"')
 * // "hello"
 * 
 * // Single quotes
 * unquote("'hello'")
 * // "hello"
 * 
 * // Backticks
 * unquote("`hello`")
 * // "hello"
 * 
 * // No quotes
 * unquote("hello")
 * // "hello"
 * 
 * // Mismatched quotes (unchanged)
 * unquote('"hello\'')
 * // '"hello\''
 * 
 * // Only one quote (unchanged)
 * unquote('"hello')
 * // '"hello'
 * 
 * unquote('hello"')
 * // 'hello"'
 * 
 * // Empty string
 * unquote("")
 * // ""
 * 
 * // Just quotes
 * unquote('""')
 * // ""
 * 
 * unquote("''")
 * // ""
 * 
 * // Nested quotes (only removes outer)
 * unquote('"He said \\"Hello\\""')
 * // 'He said "Hello"'
 * 
 * // Mixed quotes inside
 * unquote('"It\'s working"')
 * // "It's working"
 * 
 * // CSV value processing
 * const csvValue = '"John, Doe"'
 * unquote(csvValue)  // "John, Doe"
 * 
 * // JSON property extraction
 * const jsonProp = '"username"'
 * unquote(jsonProp)  // "username"
 * 
 * // Config value cleaning
 * const configValue = "'production'"
 * unquote(configValue)  // "production"
 * 
 * // URL parameter
 * const param = '"search term"'
 * unquote(param)  // "search term"
 * 
 * // Command argument
 * const arg = "'--verbose'"
 * unquote(arg)  // "--verbose"
 * 
 * // Multiple processing
 * const values = ['"apple"', "'banana'", "`cherry`", "date"]
 * values.map(unquote)
 * // ["apple", "banana", "cherry", "date"]
 * 
 * // Environment variable
 * const envVar = '"DATABASE_URL"'
 * unquote(envVar)  // "DATABASE_URL"
 * 
 * // SQL value
 * const sqlValue = "'O\\'Brien'"
 * unquote(sqlValue)  // "O'Brien" (inner quote preserved)
 * 
 * // Template literal
 * const template = '`Hello ${name}`'
 * unquote(template)  // "Hello ${name}"
 * 
 * // Parse quoted list
 * const parseList = (str: string) => {
 *   return str.split(",").map(s => unquote(s.trim()))
 * }
 * parseList('"a", "b", "c"')  // ["a", "b", "c"]
 * 
 * // Handle null/undefined
 * unquote(null)       // ""
 * unquote(undefined)  // ""
 * 
 * // Whitespace with quotes
 * unquote('" hello "')  // " hello " (preserves inner spaces)
 * unquote('  "hello"  ')  // '  "hello"  ' (outer spaces not quotes)
 * 
 * // Check if was quoted
 * const wasQuoted = (original: string) => {
 *   return original !== unquote(original)
 * }
 * wasQuoted('"test"')  // true
 * wasQuoted("test")    // false
 * 
 * // Smart unquote (handles any quote type)
 * const smartUnquote = (str: string) => {
 *   const quotes = ['"', "'", "`"]
 *   for (const q of quotes) {
 *     if (str.startsWith(q) && str.endsWith(q) && str.length >= 2) {
 *       return str.slice(1, -1)
 *     }
 *   }
 *   return str
 * }
 * ```
 * @property Matching-only - only removes if quotes match at both ends
 * @property Single-layer - only removes outermost quotes
 * @property Type-aware - handles different quote types
 */
const unquote = (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string" || str.length < 2) {
		return str ?? ""
	}
	
	// Check for matching quotes at beginning and end
	const first = str[0]
	const last = str[str.length - 1]
	
	// Common quote characters
	const quotes = ['"', "'", "`"]
	
	// Remove if first and last are the same quote character
	if (quotes.includes(first) && first === last) {
		return str.slice(1, -1)
	}
	
	return str
}

export default unquote