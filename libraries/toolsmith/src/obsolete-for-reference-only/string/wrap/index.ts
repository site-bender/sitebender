import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const wrap = (
	width: number,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string" || str.length === 0) {
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
				currentLine.length + (currentLine ? 1 : 0) + word.length <=
					width
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
