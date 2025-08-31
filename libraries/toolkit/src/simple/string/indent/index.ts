/**
 * Adds indentation to each line of a string
 *
 * Prepends a specified indentation string to the beginning of each line
 * in the input string. This is useful for formatting code, creating
 * nested structures in text output, or adjusting indentation levels
 * in generated content. Empty lines can optionally be indented.
 *
 * @param indentStr - String to use for indentation (e.g., "  ", "\t")
 * @param str - String to indent
 * @returns String with each line indented
 * @example
 * ```typescript
 * // Basic indentation with spaces
 * indent("  ")("line1\nline2\nline3")
 * // "  line1\n  line2\n  line3"
 *
 * // Custom prefixes
 * indent("> ")("quoted\ntext")
 * // "> quoted\n> text"
 *
 * // Code block indentation
 * const code = "function hello() {\n  console.log('hi');\n}"
 * indent("  ")(code)
 * // "  function hello() {\n    console.log('hi');\n  }"
 *
 * // Empty lines preserved
 * indent("  ")("line1\n\nline2")
 * // "  line1\n  \n  line2"
 *
 * // Handle null/undefined gracefully
 * indent("  ")(null)       // ""
 * indent(null)("test")     // "test"
 *
 * // Partial application for reusable formatters
 * const indent2 = indent("  ")
 * indent2("test")   // "  test"
 *
 * // Mixed line endings supported
 * indent("  ")("line1\r\nline2")
 * // "  line1\r\n  line2"
 *
 * // Unicode indentation
 * indent("→ ")("First\nSecond")
 * // "→ First\n→ Second"
 * ```
 * @pure - Function has no side effects
 * @curried - Function is curried for partial application
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 */
import isNullish from "../../validation/isNullish/index.ts"

const indent = (
	indentStr: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (isNullish(indentStr) || typeof indentStr !== "string") {
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
