/**
 * Removes common leading whitespace from all lines in a string
 * 
 * Analyzes all non-empty lines to find the minimum indentation level,
 * then removes that amount of leading whitespace from every line.
 * This is useful for cleaning up template literals, heredocs, or
 * multiline strings while preserving relative indentation.
 * 
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
 * // Mixed indentation levels
 * stripIndent(`
 *   outer
 *     inner
 *       nested
 *     inner
 *   outer
 * `)
 * // "outer\n  inner\n    nested\n  inner\nouter"
 * 
 * // Tabs and spaces (finds minimum)
 * stripIndent("\t\tline1\n\t\tline2")
 * // "line1\nline2"
 * 
 * // Empty lines ignored for calculation
 * stripIndent(`
 *     first
 * 
 *     second
 * `)
 * // "first\n\nsecond"
 * 
 * // Template literal cleanup
 * const sql = stripIndent(`
 *     SELECT *
 *     FROM users
 *     WHERE active = true
 * `)
 * // "SELECT *\nFROM users\nWHERE active = true"
 * 
 * // HTML template
 * const html = stripIndent(`
 *     <div>
 *         <h1>Title</h1>
 *         <p>Content</p>
 *     </div>
 * `)
 * // "<div>\n    <h1>Title</h1>\n    <p>Content</p>\n</div>"
 * 
 * // No common indentation
 * stripIndent("line1\nline2\nline3")
 * // "line1\nline2\nline3"
 * 
 * // Single line
 * stripIndent("    single line")
 * // "single line"
 * 
 * // Empty string
 * stripIndent("")
 * // ""
 * 
 * // Only whitespace
 * stripIndent("    \n    \n    ")
 * // "\n\n"
 * 
 * // Markdown code block
 * const markdown = stripIndent(`
 *     \`\`\`javascript
 *     const x = 1;
 *     const y = 2;
 *     \`\`\`
 * `)
 * // "```javascript\nconst x = 1;\nconst y = 2;\n```"
 * 
 * // YAML configuration
 * const yaml = stripIndent(`
 *     server:
 *       host: localhost
 *       port: 3000
 *       options:
 *         debug: true
 * `)
 * // "server:\n  host: localhost\n  port: 3000\n  options:\n    debug: true"
 * 
 * // Error message formatting
 * const error = stripIndent(`
 *     Error: Something went wrong
 *       at line 42
 *       in file test.js
 * `)
 * // "Error: Something went wrong\n  at line 42\n  in file test.js"
 * 
 * // Handle null/undefined gracefully
 * stripIndent(null)       // ""
 * stripIndent(undefined)  // ""
 * 
 * // Create dedent helper
 * const dedent = (strings: TemplateStringsArray, ...values: any[]) => {
 *   const result = strings.reduce((acc, str, i) => {
 *     return acc + str + (values[i] || "")
 *   }, "")
 *   return stripIndent(result)
 * }
 * 
 * // Use with tagged template
 * const name = "World"
 * dedent`
 *     Hello ${name}!
 *     How are you?
 * `
 * // "Hello World!\nHow are you?"
 * ```
 * @property Relative-preserving - maintains indentation relationships
 * @property Empty-aware - ignores empty lines when calculating
 * @property Whitespace-agnostic - works with tabs or spaces
 */
const stripIndent = (
	str: string | null | undefined
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
		.map(line => {
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