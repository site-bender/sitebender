/**
 * Wraps a string at specified width with line breaks
 *
 * Breaks a string into lines of maximum width, inserting line breaks
 * at word boundaries when possible. Useful for formatting text for
 * display in fixed-width contexts like terminals, text files, or
 * print layouts.
 *
 * @curried - Function returns a function for partial application
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
 * wrap(20)("Short text")  // "Short text"
 *
 * // Single long word (forced break)
 * wrap(5)("verylongword")  // "veryl\nongwo\nrd"
 *
 * // Empty string
 * wrap(10)("")  // ""
 *
 * // Width of 1
 * wrap(1)("hello")  // "h\ne\nl\nl\no"
 *
 * // Preserve existing newlines
 * wrap(20)("First line\nSecond line here")
 * // "First line\nSecond line here"
 *
 * // Multiple spaces collapsed
 * wrap(10)("Too    many    spaces")  // "Too many\nspaces"
 *
 * // Partial application
 * const wrap40 = wrap(40)
 * const emailWrap = wrap(72)
 *
 * // Handle null/undefined
 * wrap(10)(null)  // ""
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
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
