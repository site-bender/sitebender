/**
 * Wraps a string with specified prefix and suffix
 * 
 * Surrounds a string with given prefix and suffix strings. More flexible
 * than quote() as it allows different strings for start and end. Useful
 * for creating tags, formatting output, or building markup.
 * 
 * @curried (prefix) => (suffix) => (str) => string
 * @param prefix - String to prepend
 * @param suffix - String to append
 * @param str - String to wrap
 * @returns String wrapped with prefix and suffix
 * @example
 * ```typescript
 * // HTML tags
 * wrapWith("<b>")("</b>")("bold text")
 * // "<b>bold text</b>"
 * 
 * // XML tags
 * wrapWith("<name>")("</name>")("John")
 * // "<name>John</name>"
 * 
 * // Markdown formatting
 * wrapWith("**")("**")("bold")
 * // "**bold**"
 * 
 * wrapWith("_")("_")("italic")
 * // "_italic_"
 * 
 * // Different prefix and suffix
 * wrapWith("(")(")")("content")
 * // "(content)"
 * 
 * wrapWith("[")("](url)")("link text")
 * // "[link text](url)"
 * 
 * // Empty string
 * wrapWith("<p>")("</p>")("")
 * // "<p></p>"
 * 
 * // No wrapper (empty prefix/suffix)
 * wrapWith("")("")("text")
 * // "text"
 * 
 * // Single wrapper
 * wrapWith(">>> ")("")("quoted")
 * // ">>> quoted"
 * 
 * wrapWith("")(" <<<")("quoted")
 * // "quoted <<<"
 * 
 * // Create HTML element helper
 * const element = (tag: string) => (content: string) =>
 *   wrapWith(`<${tag}>`))(`</${tag}>`)(content)
 * 
 * const div = element("div")
 * const span = element("span")
 * div("Hello")   // "<div>Hello</div>"
 * span("World")  // "<span>World</span>"
 * 
 * // Code block formatting
 * wrapWith("```\n")("\n```")("const x = 1;\nconst y = 2;")
 * // "```\nconst x = 1;\nconst y = 2;\n```"
 * 
 * // Comment wrapping
 * wrapWith("/* ")(" */")("TODO: fix this")
 * // "/* TODO: fix this */"
 * 
 * wrapWith("<!-- ")(" -->")("HTML comment")
 * // "<!-- HTML comment -->"
 * 
 * // String interpolation
 * wrapWith("${")("}")("variable")
 * // "${variable}"
 * 
 * // LaTeX commands
 * wrapWith("\\textbf{")("}")("bold text")
 * // "\\textbf{bold text}"
 * 
 * // SQL quoting
 * wrapWith("'")("'")("O'Brien")  // Note: doesn't escape
 * // "'O'Brien'"
 * 
 * // URL building
 * wrapWith("https://")("/api/v1")("example.com")
 * // "https://example.com/api/v1"
 * 
 * // Partial application for templates
 * const htmlTag = wrapWith("<"))(">")
 * const codeBlock = wrapWith("```")("```")
 * const quoted = wrapWith('"')('"')
 * 
 * htmlTag("div class='container'")  // "<div class='container'>"
 * codeBlock("code")                  // "```code```"
 * quoted("text")                     // '"text"'
 * 
 * // Logging prefix/suffix
 * const logFormat = wrapWith("[INFO] ")(" - processed")
 * logFormat("User login")  // "[INFO] User login - processed"
 * 
 * // Build CSS selector
 * wrapWith(".")(" { })")("className")
 * // ".className { }"
 * 
 * // Create function call
 * wrapWith("func(")(")")("arg1, arg2")
 * // "func(arg1, arg2)"
 * 
 * // Handle null/undefined
 * wrapWith("(")(")")(null)       // "()"
 * wrapWith("(")(")")(undefined)  // "()"
 * 
 * // Emoji decoration
 * wrapWith("🎉 ")(" 🎉")("Celebration")
 * // "🎉 Celebration 🎉"
 * 
 * // Build regex pattern
 * wrapWith("/")("/gi")("pattern")
 * // "/pattern/gi"
 * 
 * // Table cell
 * wrapWith("| ")(" |")("cell content")
 * // "| cell content |"
 * 
 * // Create styled console output
 * const styleLog = (style: string) => (text: string) =>
 *   wrapWith(`%c`)("")(text) + `, '${style}'`
 * styleLog("color: red; font-weight: bold")("Error!")
 * // "%cError!, 'color: red; font-weight: bold'"
 * ```
 * @property Flexible - allows different prefix and suffix
 * @property Composable - great for building formatters
 * @property Empty-safe - handles empty strings properly
 */
const wrapWith = (
	prefix: string | null | undefined
) => (
	suffix: string | null | undefined
) => (
	str: string | null | undefined
): string => {
	const safePrefix = prefix ?? ""
	const safeSuffix = suffix ?? ""
	const safeStr = str ?? ""
	
	return safePrefix + safeStr + safeSuffix
}

export default wrapWith