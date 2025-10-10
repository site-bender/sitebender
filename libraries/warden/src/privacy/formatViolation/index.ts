//++ Format a privacy violation as a human-readable error message
//++
//++ This function takes a PrivacyViolation and returns a formatted string
//++ suitable for display to developers. The message includes:
//++ - File location (with line/column if available)
//++ - Clear description of the violation
//++ - Suggested fix (if available)
//++
//++ This is a curried pure function: formatViolation(violation) => string
//++
//++ Examples:
//++   formatViolation({
//++     fromFile: "src/foo/index.ts",
//++     toFile: "src/bar/_private/index.ts",
//++     line: 10,
//++     message: "Cannot import..."
//++   })
//++   => "Privacy violation in src/foo/index.ts:10\n  Cannot import..."

import type { PrivacyViolation } from "../../types/index.ts"

export default function formatViolation(
	violation: PrivacyViolation,
): string {
	const { fromFile, toFile, line, column, message, suggestedFix } = violation

	// Build location string
	const locationParts = [fromFile]

	if (line !== undefined) {
		locationParts.push(`:${line}`)

		if (column !== undefined) {
			locationParts.push(`:${column}`)
		}
	}

	const location = locationParts.join("")

	// Build message parts
	const parts = [
		`Privacy violation in ${location}`,
		`  ${message}`,
		`  Attempted to import: ${toFile}`,
	]

	// Add suggested fix if present
	if (suggestedFix !== undefined && suggestedFix.length > 0) {
		parts.push(`  Suggested fix: ${suggestedFix}`)
	}

	// Join all parts with newlines
	const formatted = parts.join("\n")

	return formatted
}
