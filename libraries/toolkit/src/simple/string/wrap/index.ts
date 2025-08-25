/**
 * Wraps a string at specified width with line breaks
 *
 * Breaks a string into lines of maximum width, inserting line breaks
 * at word boundaries when possible. Useful for formatting text for
 * display in fixed-width contexts like terminals, text files, or
 * print layouts.
 *
 * @curried (width) => (str) => string
 * @param width - Maximum line width
 * @param str - String to wrap
 * @returns String with line breaks inserted
 * @example
 * ```typescript
 * // Basic wrapping
 * wrap(10)("This is a long sentence that needs wrapping")
 * // "This is a\nlong\nsentence\nthat needs\nwrapping"
 *
 * // Short string (no wrapping needed)
 * wrap(20)("Short text")
 * // "Short text"
 *
 * // Single long word (forced break)
 * wrap(5)("verylongword")
 * // "veryl\nongwo\nrd"
 *
 * // Empty string
 * wrap(10)("")
 * // ""
 *
 * // Width of 1
 * wrap(1)("hello")
 * // "h\ne\nl\nl\no"
 *
 * // Preserve existing newlines
 * wrap(20)("First line\nSecond line here")
 * // "First line\nSecond line here"
 *
 * // Multiple spaces collapsed
 * wrap(10)("Too    many    spaces")
 * // "Too many\nspaces"
 *
 * // Terminal output formatting
 * const terminal = wrap(80)
 * terminal("Long error message that should fit in terminal window...")
 *
 * // Code comments
 * const commentWrap = wrap(60)
 * commentWrap("This is a very long comment that explains complex logic...")
 *
 * // Email body formatting
 * const emailBody = wrap(72)  // Traditional email width
 * emailBody("Dear recipient, This is a long email message...")
 *
 * // SMS message splitting
 * const smsWrap = wrap(160)
 * smsWrap("Long SMS message that might need to be split...")
 *
 * // Markdown paragraph
 * const markdown = wrap(80)
 * markdown("Lorem ipsum dolor sit amet, consectetur adipiscing elit...")
 *
 * // Log message formatting
 * const logWrap = wrap(100)
 * logWrap("[ERROR] A very detailed error message with lots of information...")
 *
 * // Help text formatting
 * const helpText = wrap(70)
 * helpText("Usage: command [options] - This command does something useful...")
 *
 * // Partial application for consistent formatting
 * const wrap40 = wrap(40)
 * const wrap60 = wrap(60)
 * const wrap80 = wrap(80)
 *
 * // Handle null/undefined
 * wrap(10)(null)       // ""
 * wrap(10)(undefined)  // ""
 *
 * // Hyphenation (simple - breaks at width)
 * wrap(10)("extraordinary")
 * // "extraordin\nary"
 *
 * // Paragraph formatting
 * const formatParagraph = (text: string, indent: string = "") => {
 *   return wrap(70)(text).split("\n").map(line => indent + line).join("\n")
 * }
 * formatParagraph("Long paragraph text...", "  ")
 * // Each line indented with 2 spaces
 *
 * // Create text box
 * const textBox = (text: string, width: number) => {
 *   const wrapped = wrap(width - 4)(text)  // Account for borders
 *   const lines = wrapped.split("\n")
 *   const border = "+" + "-".repeat(width - 2) + "+"
 *   return [
 *     border,
 *     ...lines.map(line => "| " + line.padEnd(width - 4) + " |"),
 *     border
 *   ].join("\n")
 * }
 * ```
 * @property Word-aware - tries to break at word boundaries
 * @property Width-enforced - ensures no line exceeds width
 * @property Newline-preserving - maintains existing line breaks
 */
const wrap = (
	width: number,
) =>
(
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string" || str.length === 0) {
		return ""
	}

	if (width <= 0) {
		return str
	}

	const lines: Array<string> = []
	const paragraphs = str.split("\n")

	for (const paragraph of paragraphs) {
		if (paragraph.length === 0) {
			lines.push("")
			continue
		}

		const words = paragraph.split(/\s+/)
		let currentLine = ""

		for (const word of words) {
			// If word itself is longer than width, force break it
			if (word.length > width) {
				// Add any accumulated line
				if (currentLine) {
					lines.push(currentLine)
					currentLine = ""
				}

				// Break the long word
				let remaining = word
				while (remaining.length > width) {
					lines.push(remaining.slice(0, width))
					remaining = remaining.slice(width)
				}
				currentLine = remaining
			} else if (
				currentLine.length + (currentLine ? 1 : 0) + word.length <= width
			) {
				// Add word to current line
				currentLine = currentLine ? currentLine + " " + word : word
			} else {
				// Start new line
				if (currentLine) {
					lines.push(currentLine)
				}
				currentLine = word
			}
		}

		// Add any remaining text
		if (currentLine) {
			lines.push(currentLine)
		}
	}

	return lines.join("\n")
}

export default wrap
