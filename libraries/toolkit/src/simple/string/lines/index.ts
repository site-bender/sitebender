/**
 * Splits a string into an array of lines
 * 
 * Breaks a string into an array where each element is a line of text.
 * Handles multiple line ending styles (LF, CRLF, CR) and preserves empty
 * lines. This is useful for processing multi-line text, parsing files,
 * or analyzing text structure. Does not include the line endings in results.
 * 
 * @param str - String to split into lines
 * @returns Array of lines without line endings
 * @example
 * ```typescript
 * // Basic line splitting
 * lines("line1\nline2\nline3")
 * // ["line1", "line2", "line3"]
 * 
 * // Windows line endings (CRLF)
 * lines("line1\r\nline2\r\nline3")
 * // ["line1", "line2", "line3"]
 * 
 * // Old Mac line endings (CR)
 * lines("line1\rline2\rline3")
 * // ["line1", "line2", "line3"]
 * 
 * // Mixed line endings
 * lines("line1\nline2\r\nline3\rline4")
 * // ["line1", "line2", "line3", "line4"]
 * 
 * // Empty lines preserved
 * lines("line1\n\nline3")
 * // ["line1", "", "line3"]
 * 
 * // Multiple empty lines
 * lines("line1\n\n\n\nline5")
 * // ["line1", "", "", "", "line5"]
 * 
 * // Single line (no line endings)
 * lines("single line")
 * // ["single line"]
 * 
 * // Empty string
 * lines("")
 * // [""]
 * 
 * // Only newlines
 * lines("\n\n\n")
 * // ["", "", "", ""]
 * 
 * // Trailing newline
 * lines("line1\nline2\n")
 * // ["line1", "line2", ""]
 * 
 * // Leading newline
 * lines("\nline1\nline2")
 * // ["", "line1", "line2"]
 * 
 * // Process file content
 * const fileContent = "Name,Age,City\nJohn,30,NYC\nJane,25,LA"
 * const rows = lines(fileContent)
 * // ["Name,Age,City", "John,30,NYC", "Jane,25,LA"]
 * 
 * // Count lines
 * const countLines = (text: string) => lines(text).length
 * countLines("one\ntwo\nthree")  // 3
 * countLines("")                 // 1 (empty string is one empty line)
 * countLines("\n\n")            // 3 (two newlines = three lines)
 * 
 * // Filter empty lines
 * const nonEmptyLines = (text: string) => 
 *   lines(text).filter(line => line.trim() !== "")
 * nonEmptyLines("line1\n\nline2\n  \nline3")
 * // ["line1", "line2", "line3"]
 * 
 * // Line numbering
 * const numberLines = (text: string) =>
 *   lines(text).map((line, i) => `${i + 1}: ${line}`)
 * numberLines("first\nsecond\nthird")
 * // ["1: first", "2: second", "3: third"]
 * 
 * // Parse configuration
 * const config = "host=localhost\nport=3000\ndebug=true"
 * lines(config).map(line => {
 *   const [key, value] = line.split("=")
 *   return { key, value }
 * })
 * // [
 * //   { key: "host", value: "localhost" },
 * //   { key: "port", value: "3000" },
 * //   { key: "debug", value: "true" }
 * // ]
 * 
 * // Code analysis
 * const code = "function hello() {\n  console.log('hi');\n}"
 * lines(code).map(line => ({
 *   line,
 *   indent: line.match(/^(\s*)/)?.[1].length || 0
 * }))
 * // [
 * //   { line: "function hello() {", indent: 0 },
 * //   { line: "  console.log('hi');", indent: 2 },
 * //   { line: "}", indent: 0 }
 * // ]
 * 
 * // CSV parsing (simple)
 * const csv = "a,b,c\n1,2,3\n4,5,6"
 * const [header, ...data] = lines(csv)
 * // header: "a,b,c"
 * // data: ["1,2,3", "4,5,6"]
 * 
 * // Log file processing
 * const logs = "[INFO] Start\n[ERROR] Failed\n[INFO] Retry"
 * lines(logs).filter(line => line.includes("[ERROR]"))
 * // ["[ERROR] Failed"]
 * 
 * // Markdown list processing
 * const mdList = "- Item 1\n- Item 2\n  - Nested\n- Item 3"
 * lines(mdList).map(line => ({
 *   content: line.trim().replace(/^- /, ""),
 *   level: line.match(/^(\s*)/)?.[1].length || 0
 * }))
 * // [
 * //   { content: "Item 1", level: 0 },
 * //   { content: "Item 2", level: 0 },
 * //   { content: "Nested", level: 2 },
 * //   { content: "Item 3", level: 0 }
 * // ]
 * 
 * // Git diff processing
 * const diff = "+added line\n-removed line\n unchanged"
 * lines(diff).map(line => ({
 *   type: line[0] === "+" ? "add" : line[0] === "-" ? "remove" : "context",
 *   content: line
 * }))
 * // [
 * //   { type: "add", content: "+added line" },
 * //   { type: "remove", content: "-removed line" },
 * //   { type: "context", content: " unchanged" }
 * // ]
 * 
 * // Comment extraction
 * const sourceCode = "code();\n// Comment 1\nmore();\n// Comment 2"
 * lines(sourceCode)
 *   .filter(line => line.trim().startsWith("//"))
 *   .map(line => line.trim().slice(2).trim())
 * // ["Comment 1", "Comment 2"]
 * 
 * // URL list processing
 * const urls = "https://example.com\nhttps://test.org\nftp://files.net"
 * lines(urls).filter(url => url.startsWith("https://"))
 * // ["https://example.com", "https://test.org"]
 * 
 * // Environment file parsing
 * const envFile = "NODE_ENV=production\nPORT=3000\n# Comment\nDEBUG=false"
 * lines(envFile)
 *   .filter(line => line && !line.startsWith("#"))
 *   .map(line => line.split("="))
 * // [["NODE_ENV", "production"], ["PORT", "3000"], ["DEBUG", "false"]]
 * 
 * // Template processing
 * const template = "Hello {{name}},\n\nWelcome to {{place}}!"
 * lines(template).map(line => 
 *   line.replace(/\{\{(\w+)\}\}/g, (_, key) => `<${key}>`)
 * )
 * // ["Hello <name>,", "", "Welcome to <place>!"]
 * 
 * // Handle null/undefined gracefully
 * lines(null)       // []
 * lines(undefined)  // []
 * 
 * // Statistics
 * const text = "Short.\nThis is a longer line.\nMedium line."
 * const lineStats = lines(text).map(line => ({
 *   line,
 *   length: line.length,
 *   words: line.split(/\s+/).filter(Boolean).length
 * }))
 * // [
 * //   { line: "Short.", length: 6, words: 1 },
 * //   { line: "This is a longer line.", length: 22, words: 5 },
 * //   { line: "Medium line.", length: 12, words: 2 }
 * // ]
 * 
 * // Longest line
 * const longestLine = (text: string) => {
 *   const allLines = lines(text)
 *   return allLines.reduce((longest, line) => 
 *     line.length > longest.length ? line : longest, ""
 *   )
 * }
 * longestLine("short\nthis is the longest\nmedium")
 * // "this is the longest"
 * 
 * // Average line length
 * const avgLineLength = (text: string) => {
 *   const allLines = lines(text)
 *   const totalLength = allLines.reduce((sum, line) => sum + line.length, 0)
 *   return totalLength / allLines.length
 * }
 * avgLineLength("hello\nworld\n!")  // 3.67
 * 
 * // Join with different separator
 * lines("a\nb\nc").join(" | ")
 * // "a | b | c"
 * ```
 * @property Platform-agnostic - handles Unix, Windows, and Mac line endings
 * @property Empty-preserving - maintains empty lines in output
 * @property Array-returning - always returns array, even for null/undefined
 */
const lines = (
	str: string | null | undefined
): Array<string> => {
	if (str == null || typeof str !== "string") {
		return []
	}
	
	// Split on all common line endings: \r\n (Windows), \n (Unix), \r (old Mac)
	// This regex matches any of these line ending patterns
	return str.split(/\r\n|\r|\n/)
}

export default lines