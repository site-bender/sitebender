/**
 * Extracts file extension from a filename
 *
 * Returns the file extension (without the leading dot) from a filename
 * or path. Handles various edge cases including URLs, paths with directories,
 * dotfiles, and files with multiple dots. Returns empty string if no
 * extension is found.
 *
 * @param filename - The filename or path to extract extension from
 * @returns The file extension without the dot, or empty string
 * @example
 * ```typescript
 * // Basic extension extraction
 * findExtension("document.pdf")
 * // "pdf"
 *
 * // Files with multiple dots
 * findExtension("archive.tar.gz")
 * // "gz"
 *
 * // File paths
 * findExtension("/home/user/documents/report.docx")
 * // "docx"
 *
 * // URLs with query parameters
 * findExtension("https://api.example.com/data.json?v=1.2")
 * // "json"
 *
 * // No extension
 * findExtension("README")
 * // ""
 *
 * // Dotfiles (no extension)
 * findExtension(".gitignore")
 * // ""
 *
 * // Dotfiles with extensions
 * findExtension(".env.production")
 * // "production"
 *
 * // Edge cases
 * findExtension("")
 * // ""
 *
 * // Case preservation
 * findExtension("Document.PDF")
 * // "PDF"
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify input
 * @safe - Returns safe values for invalid inputs
 */
const findExtension = (filename: string): string => {
	if (!filename) {
		return ""
	}

	// Remove query string and fragment from URLs
	const cleanName = filename.split("?")[0].split("#")[0]

	// Find the last path separator
	const lastSeparator = Math.max(
		cleanName.lastIndexOf("/"),
		cleanName.lastIndexOf("\\"),
	)

	// Get just the filename part
	const name = lastSeparator >= 0
		? cleanName.slice(lastSeparator + 1)
		: cleanName

	// Handle edge cases
	if (!name || name === "." || name === "..") {
		return ""
	}

	// Check if it's a dotfile without extension
	if (name.startsWith(".")) {
		const afterDot = name.slice(1)
		// If there's no other dot, it's a dotfile without extension
		if (!afterDot.includes(".")) {
			return ""
		}
		// Otherwise, find the extension after the last dot
		const lastDot = afterDot.lastIndexOf(".")
		if (lastDot === -1) {
			return ""
		}
		return afterDot.slice(lastDot + 1)
	}

	// Find the last dot
	const lastDot = name.lastIndexOf(".")

	// No dot found or dot is at the end
	if (lastDot === -1 || lastDot === name.length - 1) {
		return ""
	}

	// Return everything after the last dot
	return name.slice(lastDot + 1)
}

export default findExtension
