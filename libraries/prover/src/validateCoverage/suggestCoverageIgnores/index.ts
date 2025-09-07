/**
 * Suggests intelligent coverage ignores for uncoverable code
 * @param uncoveredLines Array of uncovered line numbers
 * @param functionPath Path to the function file
 * @returns Array of suggestions for coverage ignores
 */
export default function suggestCoverageIgnores(
	uncoveredLines: Array<number>,
	functionPath: string,
): Array<string> {
	const suggestions: Array<string> = []

	if (uncoveredLines.length === 0) {
		return suggestions
	}

	try {
		const source = Deno.readTextFileSync(functionPath)
		const lines = source.split("\n")

		uncoveredLines.forEach((lineNum) => {
			const line = lines[lineNum - 1]
			if (!line) return

			const trimmed = line.trim()

			if (trimmed === "}" || trimmed === "})" || trimmed === "})") {
				suggestions.push(
					`Line ${lineNum}: Closing brace (safe to ignore)`,
				)
			} else if (trimmed.startsWith("export default")) {
				suggestions.push(
					`Line ${lineNum}: Export statement (safe to ignore)`,
				)
			} else if (trimmed.startsWith("import ")) {
				suggestions.push(
					`Line ${lineNum}: Import statement (safe to ignore)`,
				)
			} else if (trimmed.startsWith("//")) {
				suggestions.push(`Line ${lineNum}: Comment (safe to ignore)`)
			} else if (
				trimmed.includes("/* c8 ignore") ||
				trimmed.includes("deno-coverage-ignore")
			) {
				suggestions.push(`Line ${lineNum}: Already has coverage ignore`)
			} else if (trimmed.includes("throw") && trimmed.includes("Error")) {
				suggestions.push(
					`Line ${lineNum}: Error case - may need specific test or ignore`,
				)
			} else if (trimmed === "default:") {
				suggestions.push(
					`Line ${lineNum}: Default case - may be unreachable`,
				)
			} else {
				suggestions.push(
					`Line ${lineNum}: Review needed - "${
						trimmed.substring(0, 50)
					}..."`,
				)
			}
		})
	} catch (error) {
		suggestions.push(`Could not analyze source file: ${error}`)
	}

	return suggestions
}
