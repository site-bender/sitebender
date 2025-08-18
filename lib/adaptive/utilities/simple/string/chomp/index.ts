/**
 * Removes trailing newline characters from a string
 * 
 * Removes line terminators from the end of a string including \n (LF),
 * \r\n (CRLF), and \r (CR). This is useful for cleaning up strings from
 * file reads, user input, or data processing where trailing newlines
 * are unwanted. Only removes newlines from the end, not from within
 * the string.
 * 
 * @param str - String to remove trailing newlines from
 * @returns String with trailing newlines removed
 * @example
 * ```typescript
 * // Unix newline (LF)
 * chomp("hello\n")
 * // "hello"
 * 
 * // Windows newline (CRLF)
 * chomp("hello\r\n")
 * // "hello"
 * 
 * // Old Mac newline (CR)
 * chomp("hello\r")
 * // "hello"
 * 
 * // Multiple newlines
 * chomp("hello\n\n\n")
 * // "hello"
 * 
 * // Mixed newlines
 * chomp("hello\r\n\n\r")
 * // "hello"
 * 
 * // No trailing newline
 * chomp("hello")
 * // "hello"
 * 
 * // Empty string
 * chomp("")
 * // ""
 * 
 * // Only newlines
 * chomp("\n\n\n")
 * // ""
 * 
 * // Newlines in middle preserved
 * chomp("hello\nworld\n")
 * // "hello\nworld"
 * 
 * // Spaces after newline (removes newlines only)
 * chomp("hello\n  ")
 * // "hello\n  "
 * 
 * // Spaces before newline
 * chomp("hello  \n")
 * // "hello  "
 * 
 * // Tab and newline
 * chomp("hello\t\n")
 * // "hello\t"
 * 
 * // Complex multiline
 * chomp("line1\nline2\nline3\n\n")
 * // "line1\nline2\nline3"
 * 
 * // File reading cleanup
 * const fileContent = "First line\nSecond line\n"
 * chomp(fileContent)
 * // "First line\nSecond line"
 * 
 * // User input cleanup
 * const userInput = "John Doe\r\n"
 * chomp(userInput)
 * // "John Doe"
 * 
 * // CSV line cleanup
 * const csvLine = "name,age,city\n"
 * chomp(csvLine)
 * // "name,age,city"
 * 
 * // Command output cleanup
 * const cmdOutput = "Process completed successfully\n\n"
 * chomp(cmdOutput)
 * // "Process completed successfully"
 * 
 * // HTTP response cleanup
 * const response = "HTTP/1.1 200 OK\r\n"
 * chomp(response)
 * // "HTTP/1.1 200 OK"
 * 
 * // Log line cleanup
 * const logLine = "[INFO] Application started\n"
 * chomp(logLine)
 * // "[INFO] Application started"
 * 
 * // JSON string cleanup
 * const jsonStr = '{"name": "test"}\n'
 * chomp(jsonStr)
 * // '{"name": "test"}'
 * 
 * // Preserve internal structure
 * chomp("{\n  key: value\n}\n")
 * // "{\n  key: value\n}"
 * 
 * // Handle null/undefined gracefully
 * chomp(null)       // ""
 * chomp(undefined)  // ""
 * 
 * // Chain with other operations
 * const lines = ["line1\n", "line2\n", "line3\n"]
 * lines.map(chomp)
 * // ["line1", "line2", "line3"]
 * 
 * // Use with template literals
 * const template = `
 * Hello World
 * `
 * chomp(template)
 * // "\nHello World"  (only trailing newline removed)
 * 
 * // Use in text processing
 * const processLine = (line: string) => {
 *   return chomp(line).toUpperCase()
 * }
 * processLine("hello\n")
 * // "HELLO"
 * 
 * // Multiple CRLF
 * chomp("data\r\n\r\n\r\n")
 * // "data"
 * 
 * // Mixed whitespace (only removes newlines)
 * chomp("text \t \n \r\n")
 * // "text \t "
 * 
 * // Unicode with newlines
 * chomp("hello 世界\n")
 * // "hello 世界"
 * 
 * // Emoji with newlines
 * chomp("🎉 party\n\n")
 * // "🎉 party"
 * ```
 * @property Platform-agnostic - handles Unix, Windows, and Mac line endings
 * @property End-only - only removes from the end, preserves internal newlines
 * @property Greedy - removes all trailing newline characters
 */
const chomp = (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}
	
	// Remove all trailing \r and \n characters
	// This regex handles \n, \r\n, and \r line endings
	return str.replace(/[\r\n]+$/, "")
}

export default chomp