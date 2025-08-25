/**
 * Adds indentation to each line of a string
 *
 * Prepends a specified indentation string to the beginning of each line
 * in the input string. This is useful for formatting code, creating
 * nested structures in text output, or adjusting indentation levels
 * in generated content. Empty lines can optionally be indented.
 *
 * @curried (indentStr) => (str) => string
 * @param indentStr - String to use for indentation (e.g., "  ", "\t")
 * @param str - String to indent
 * @returns String with each line indented
 * @example
 * ```typescript
 * // Basic indentation with spaces
 * indent("  ")("line1\nline2\nline3")
 * // "  line1\n  line2\n  line3"
 *
 * // Indentation with tabs
 * indent("\t")("first\nsecond")
 * // "\tfirst\n\tsecond"
 *
 * // Four spaces
 * indent("    ")("hello\nworld")
 * // "    hello\n    world"
 *
 * // Custom prefix
 * indent("> ")("quoted\ntext")
 * // "> quoted\n> text"
 *
 * // Single line
 * indent("  ")("single line")
 * // "  single line"
 *
 * // Empty string
 * indent("  ")("")
 * // ""
 *
 * // Multiple empty lines
 * indent("  ")("line1\n\nline2")
 * // "  line1\n  \n  line2"
 *
 * // No indentation (empty indent string)
 * indent("")("line1\nline2")
 * // "line1\nline2"
 *
 * // Code block indentation
 * const code = "function hello() {\n  console.log('hi');\n}"
 * indent("  ")(code)
 * // "  function hello() {\n    console.log('hi');\n  }"
 *
 * // Markdown quote blocks
 * const quote = "This is a quote.\nIt has multiple lines."
 * indent("> ")(quote)
 * // "> This is a quote.\n> It has multiple lines."
 *
 * // Comment formatting
 * const comment = "This explains\nthe code below"
 * indent("// ")(comment)
 * // "// This explains\n// the code below"
 *
 * // XML/HTML nesting
 * const inner = "<child>content</child>"
 * indent("  ")(inner)
 * // "  <child>content</child>"
 *
 * // Log message formatting
 * const logMsg = "Error occurred\nStack trace:\nLine 1\nLine 2"
 * indent("[ERROR] ")(logMsg)
 * // "[ERROR] Error occurred\n[ERROR] Stack trace:\n[ERROR] Line 1\n[ERROR] Line 2"
 *
 * // Nested indentation
 * const nested = indent("    ")(indent("  ")("inner"))
 * // "      inner"
 *
 * // YAML formatting
 * const yaml = "name: test\nitems:\n  - one\n  - two"
 * indent("  ")(yaml)
 * // "  name: test\n  items:\n    - one\n    - two"
 *
 * // Python-style indentation
 * const pythonCode = "def func():\nreturn True"
 * indent("    ")(pythonCode)
 * // "    def func():\n    return True"
 *
 * // Line numbers
 * const addLineNumbers = (str: string) => {
 *   return str.split("\n").map((line, i) =>
 *     `${(i + 1).toString().padStart(3, " ")} ${line}`
 *   ).join("\n")
 * }
 * addLineNumbers("first\nsecond\nthird")
 * // "  1 first\n  2 second\n  3 third"
 *
 * // Bullet points
 * indent("• ")("Item 1\nItem 2\nItem 3")
 * // "• Item 1\n• Item 2\n• Item 3"
 *
 * // Partial application for reusable formatters
 * const indent2 = indent("  ")
 * const indent4 = indent("    ")
 * const indentTab = indent("\t")
 *
 * indent2("test")   // "  test"
 * indent4("test")   // "    test"
 * indentTab("test") // "\ttest"
 *
 * // Email reply formatting
 * const replyIndent = indent("> ")
 * replyIndent("Original message\nLine 2")
 * // "> Original message\n> Line 2"
 *
 * // Tree structure
 * const treeIndent = indent("│  ")
 * treeIndent("node1\nnode2")
 * // "│  node1\n│  node2"
 *
 * // Windows line endings (CRLF)
 * indent("  ")("line1\r\nline2")
 * // "  line1\r\n  line2"
 *
 * // Mixed line endings
 * indent("  ")("line1\nline2\r\nline3")
 * // "  line1\n  line2\r\n  line3"
 *
 * // Unicode indentation
 * indent("→ ")("First\nSecond")
 * // "→ First\n→ Second"
 *
 * // Emoji prefix
 * indent("📝 ")("Note 1\nNote 2")
 * // "📝 Note 1\n📝 Note 2"
 *
 * // Handle null/undefined gracefully
 * indent("  ")(null)       // ""
 * indent("  ")(undefined)  // ""
 * indent(null)("test")     // "test"
 * indent(undefined)("test") // "test"
 *
 * // Create markdown code block
 * const makeCodeBlock = (code: string, lang: string = "") => {
 *   return "```" + lang + "\n" + code + "\n```"
 * }
 * makeCodeBlock(indent("  ")("const x = 1"), "js")
 * // "```js\n  const x = 1\n```"
 *
 * // Diff formatting
 * const added = indent("+ ")("new line 1\nnew line 2")
 * const removed = indent("- ")("old line 1\nold line 2")
 * // "+ new line 1\n+ new line 2"
 * // "- old line 1\n- old line 2"
 *
 * // Config file formatting
 * const config = "host: localhost\nport: 3000"
 * indent("    ")(config)
 * // "    host: localhost\n    port: 3000"
 *
 * // Test output formatting
 * const testOutput = "✓ Test 1 passed\n✓ Test 2 passed"
 * indent("  ")(testOutput)
 * // "  ✓ Test 1 passed\n  ✓ Test 2 passed"
 *
 * // ASCII art alignment
 * const art = "╔══╗\n║  ║\n╚══╝"
 * indent("    ")(art)
 * // "    ╔══╗\n    ║  ║\n    ╚══╝"
 * ```
 * @property Line-based - operates on each line independently
 * @property Preserves-endings - maintains original line ending style
 * @property Curried - enables partial application for reusable indenters
 */
const indent = (
	indentStr: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	if (indentStr == null || typeof indentStr !== "string") {
		return str
	}

	if (str === "") {
		return ""
	}

	// Handle different line ending styles
	// Split on any line ending but preserve the line ending type
	const lines = str.split(/(\r?\n)/)

	// Process lines and separators
	return lines.map((part, index) => {
		// Even indices are content lines, odd indices are separators
		if (index % 2 === 0 && part !== "") {
			return indentStr + part
		}
		return part
	}).join("")
}

export default indent
