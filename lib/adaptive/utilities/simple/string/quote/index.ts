/**
 * Wraps a string in quotes
 * 
 * Surrounds a string with quotation marks, with options for different quote
 * styles (single, double, backticks, or custom). Useful for generating code,
 * formatting output, creating JSON strings, or preparing strings for display.
 * Does not escape internal quotes - use with escape functions if needed.
 * 
 * @curried (quoteChar?) => (str) => string
 * @param quoteChar - Quote character(s) to use (default: '"')
 * @param str - String to wrap in quotes
 * @returns String wrapped in quotes
 * @example
 * ```typescript
 * // Default double quotes
 * quote()("hello")
 * // '"hello"'
 * 
 * // Single quotes
 * quote("'")("hello")
 * // "'hello'"
 * 
 * // Backticks
 * quote("`")("hello")
 * // "`hello`"
 * 
 * // Custom quotes
 * quote("**")("bold")
 * // "**bold**"
 * 
 * // Empty string
 * quote()("")
 * // '""'
 * 
 * // String with spaces
 * quote()("hello world")
 * // '"hello world"'
 * 
 * // String already containing quotes
 * quote()('"Already quoted"')
 * // '""Already quoted""' (doesn't escape internal quotes)
 * 
 * // Mixed quotes
 * quote('"')("It's a test")
 * // '"It\'s a test"'
 * 
 * // Angle brackets
 * quote("<>")("tag")
 * // "<tag>"
 * 
 * // Square brackets
 * quote("[]")("array")
 * // "[array]"
 * 
 * // Curly braces
 * quote("{}")("object")
 * // "{object}"
 * 
 * // Parentheses
 * quote("()")("group")
 * // "(group)"
 * 
 * // Markdown formatting
 * quote("*")("italic")
 * // "*italic*"
 * 
 * quote("**")("bold")
 * // "**bold**"
 * 
 * quote("***")("bold italic")
 * // "***bold italic***"
 * 
 * // Code formatting
 * quote("`")("code")
 * // "`code`"
 * 
 * quote("```")("code block")
 * // "```code block```"
 * 
 * // Partial application for consistent quoting
 * const doubleQuote = quote('"')
 * const singleQuote = quote("'")
 * const backtickQuote = quote("`")
 * 
 * doubleQuote("test")   // '"test"'
 * singleQuote("test")   // "'test'"
 * backtickQuote("test") // "`test`"
 * 
 * // JSON string generation
 * const toJsonString = (value: string) => quote('"')(value)
 * toJsonString("hello")  // '"hello"'
 * 
 * // SQL string literals
 * const sqlString = quote("'")
 * sqlString("O'Brien")  // "'O'Brien'" (note: doesn't escape)
 * 
 * // HTML attribute values
 * const htmlAttr = (name: string, value: string) => 
 *   `${name}=${quote('"')(value)}`
 * htmlAttr("class", "container")  // 'class="container"'
 * 
 * // CSV field quoting
 * const csvField = (field: string) => {
 *   if (field.includes(",") || field.includes('"')) {
 *     return quote('"')(field.replace(/"/g, '""'))
 *   }
 *   return field
 * }
 * csvField("simple")           // "simple"
 * csvField("has,comma")        // '"has,comma"'
 * 
 * // Shell command arguments
 * const shellArg = quote("'")
 * shellArg("my file.txt")  // "'my file.txt'"
 * 
 * // XML/HTML tags
 * const tag = (name: string) => quote("<>")(name + "/")
 * tag("br")  // "<br/>"
 * 
 * // Lisp-style quoting
 * quote("'")("symbol")
 * // "'symbol'"
 * 
 * // Ruby symbols
 * quote(":")("symbol")
 * // ":symbol:"
 * 
 * // Custom delimiters
 * quote("<<>>")("placeholder")
 * // "<<placeholder>>"
 * 
 * quote("{{"}}")("variable")
 * // "{{variable}}"
 * 
 * // Quoting for display
 * const displayQuote = (text: string) => {
 *   return `User said: ${quote('"')(text)}`
 * }
 * displayQuote("Hello!")  // 'User said: "Hello!"'
 * 
 * // Emphasis markers
 * quote("_")("emphasis")
 * // "_emphasis_"
 * 
 * quote("__")("strong")
 * // "__strong__"
 * 
 * // Unicode quotes
 * quote(""")("fancy")
 * // ""fancy""
 * 
 * quote("«»")("French")
 * // "«French»"
 * 
 * quote("「」")("Japanese")
 * // "「Japanese」"
 * 
 * // Multi-character symmetric quotes
 * quote("<!---->")("comment")
 * // "<!--comment-->"
 * 
 * // Handle null/undefined gracefully
 * quote()(null)       // '""'
 * quote()(undefined)  // '""'
 * quote(null)("test") // '"test"' (defaults to double quotes)
 * 
 * // Chain with other operations
 * const quotedUpper = (str: string) => 
 *   quote('"')(str.toUpperCase())
 * quotedUpper("hello")  // '"HELLO"'
 * 
 * // Create quoted list
 * const items = ["apple", "banana", "cherry"]
 * items.map(quote('"')).join(", ")
 * // '"apple", "banana", "cherry"'
 * 
 * // Nested quoting
 * quote("'")('He said "Hello"')
 * // '\'He said "Hello"\''
 * 
 * // Template literal with quotes
 * const name = "World"
 * quote("`")(`Hello ${name}`)
 * // "`Hello World`"
 * 
 * // URL encoding helper
 * const urlParam = (key: string, value: string) => {
 *   return `${key}=${quote('"')(encodeURIComponent(value))}`
 * }
 * urlParam("q", "search term")  // 'q="search%20term"'
 * 
 * // Log formatting
 * const logValue = (label: string, value: any) => {
 *   return `${label}: ${quote('"')(String(value))}`
 * }
 * logValue("Status", "OK")  // 'Status: "OK"'
 * 
 * // RegExp pattern quoting
 * const pattern = quote("/")("\\d+")
 * // "/\\d+/"
 * 
 * // YAML string
 * const yamlString = (value: string) => {
 *   if (value.includes("\n")) {
 *     return quote("|")(value)
 *   }
 *   return quote('"')(value)
 * }
 * yamlString("single line")    // '"single line"'
 * yamlString("multi\nline")    // "|multi\nline|"
 * ```
 * @property Symmetric - uses same character(s) for opening and closing
 * @property Non-escaping - doesn't escape internal quotes
 * @property Customizable - supports any quote character(s)
 */
const quote = (
	quoteChar: string | null | undefined = '"'
) => (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string") {
		str = ""
	}
	
	// Default to double quotes if quoteChar is invalid
	const quotes = quoteChar == null || typeof quoteChar !== "string" || quoteChar === ""
		? '"'
		: quoteChar
	
	// For multi-character quotes, determine if they're paired
	// e.g., "[]" -> "[" and "]", "{}" -> "{" and "}"
	let openQuote = quotes
	let closeQuote = quotes
	
	// Handle common paired delimiters
	if (quotes.length === 2) {
		const pairs: Record<string, string> = {
			"()": "()",
			"[]": "[]",
			"{}": "{}",
			"<>": "<>",
			"«»": "«»",
			"「」": "「」",
			"""": """",
		}
		
		if (pairs[quotes]) {
			openQuote = quotes[0]
			closeQuote = quotes[1]
		}
	}
	
	// Handle special multi-character pairs
	if (quotes === "<!---->") {
		openQuote = "<!--"
		closeQuote = "-->"
	} else if (quotes === "{{}}") {
		openQuote = "{{"
		closeQuote = "}}"
	}
	
	return openQuote + str + closeQuote
}

export default quote