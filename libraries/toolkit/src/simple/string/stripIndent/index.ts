/**
 * Removes common leading whitespace from all lines in a string
 *
 * Analyzes all non-empty lines to find the minimum indentation level,
 * then removes that amount of leading whitespace from every line.
 * This is useful for cleaning up template literals, heredocs, or
 * multiline strings while preserving relative indentation.
 *
 * @pure
 * @immutable
 * @safe
 * @param str - String to strip indentation from
 * @returns String with common indentation removed
 * @example
 * ```typescript
 * // Basic indentation removal
 * stripIndent(`
 *     line 1
 *     line 2
 *     line 3
 * `)
 * // "line 1\nline 2\nline 3"
 *
 * // Preserves relative indentation
 * stripIndent(`
 *     function test() {
 *         console.log('hello');
 *     }
 * `)
 * // "function test() {\n    console.log('hello');\n}"
 *
 * // Template literal cleanup
 * const sql = stripIndent(`
 *     SELECT *
 *     FROM users
 *     WHERE active = true
 * `)
 * // "SELECT *\nFROM users\nWHERE active = true"
 *
 * // Single line
 * stripIndent("    single line")
 * // "single line"
 *
 * // Handle null/undefined gracefully
 * stripIndent(null)       // ""
 * stripIndent(undefined)  // ""
 *
 * // Create dedent helper
 * const dedent = (strings: TemplateStringsArray, ...values: Array<any>) => {
 *   const result = strings.reduce((acc, str, i) => {
 *     return acc + str + (values[i] || "")
 *   }, "")
 *   return stripIndent(result)
 * }
 * ```
 */
const stripIndent = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	const lines = str.split("\n")

	// Find minimum indentation (excluding empty lines)
	let minIndent = Infinity
	for (const line of lines) {
		if (line.trim().length > 0) {
			const leadingWhitespace = line.match(/^(\s*)/)?.[1] || ""
			minIndent = Math.min(minIndent, leadingWhitespace.length)
		}
	}

	// If no non-empty lines found, return empty lines
	if (minIndent === Infinity) {
		return lines.map(() => "").join("\n")
	}

	// Remove common indentation from all lines
	return lines
		.map((line) => {
			// Only strip from non-empty lines
			if (line.trim().length > 0) {
				return line.slice(minIndent)
			}
			// Empty lines stay empty
			return line.trim().length === 0 ? "" : line
		})
		.join("\n")
		.trim() // Remove leading/trailing empty lines
}

export default stripIndent
