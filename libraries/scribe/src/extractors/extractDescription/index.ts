/**
 * Extracts single-line description from source code
 */
export default function extractDescription(
	source: string,
	lineNumber: number = 0,
): string | undefined {
	// Split source into lines
	const lines = source.split("\n")

	// Look for comment on the line before the function
	if (lineNumber > 0 && lineNumber <= lines.length) {
		const previousLine = lines[lineNumber - 1]

		// Check for single-line comment
		const singleLineMatch = previousLine.match(/^\s*\/\/\s*(.+)/)
		if (singleLineMatch) {
			return singleLineMatch[1].trim()
		}
	}

	// Look for comment at the start of the file
	for (let i = 0; i < Math.min(lines.length, 10); i++) {
		const line = lines[i]

		// Skip empty lines
		if (!line.trim()) continue

		// Check for single-line comment
		const match = line.match(/^\s*\/\/\s*(.+)/)
		if (match) {
			return match[1].trim()
		}

		// Stop at first non-comment line
		if (!line.trim().startsWith("//") && !line.trim().startsWith("/*")) {
			break
		}
	}

	return undefined
}
