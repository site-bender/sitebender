/**
 * Removes invalid characters from filenames (filesystem-safe)
 *
 * Sanitizes a filename by removing or replacing characters that are
 * invalid or problematic across different filesystems (Windows, macOS, Linux).
 * Replaces invalid characters with underscores and handles special cases
 * like reserved names and leading/trailing spaces or dots.
 *
 * @param filename - The filename to clean
 * @returns Cleaned filename safe for use across filesystems
 * @example
 * ```typescript
 * // Basic usage
 * cleanFilename("file<name>.txt")
 * // "file_name_.txt"
 *
 * cleanFilename("file:name|test?.doc")
 * // "file_name_test_.doc"
 *
 * // Remove control characters
 * cleanFilename("file\x00name\x1F.txt")
 * // "filename.txt"
 *
 * // Handle reserved names
 * cleanFilename("CON.txt")
 * // "_CON.txt"
 *
 * // Trim spaces and dots
 * cleanFilename("  filename.txt  ")
 * // "filename.txt"
 *
 * // Path separators
 * cleanFilename("folder/file.txt")
 * // "folder_file.txt"
 *
 * // Unicode preserved
 * cleanFilename("café.txt")
 * // "café.txt"
 *
 * // Empty input
 * cleanFilename("")
 * // "unnamed"
 * ```
 * @pure
 * @immutable
 * @safe
 */
const cleanFilename = (filename: string): string => {
	if (!filename || !filename.trim()) {
		return "unnamed"
	}

	// Windows reserved names (case-insensitive)
	const reservedNames = [
		"CON",
		"PRN",
		"AUX",
		"NUL",
		"COM1",
		"COM2",
		"COM3",
		"COM4",
		"COM5",
		"COM6",
		"COM7",
		"COM8",
		"COM9",
		"LPT1",
		"LPT2",
		"LPT3",
		"LPT4",
		"LPT5",
		"LPT6",
		"LPT7",
		"LPT8",
		"LPT9",
	]

	// Remove control characters (0x00-0x1F and 0x7F) without regex
	let cleaned = Array.from(filename)
		.filter((ch) => {
			const code = ch.codePointAt(0)
			return typeof code === "number" && code >= 32 && code !== 127
		})
		.join("")

	// Replace invalid characters with underscore
	// Invalid: < > : " / \ | ? * and ASCII 0-31
	cleaned = cleaned.replace(/[<>:"/\\|?*]/g, "_")

	// Collapse multiple spaces into single space
	cleaned = cleaned.replace(/\s+/g, " ")

	// Remove leading and trailing spaces and dots
	cleaned = cleaned.replace(/^[\s.]+/, "").replace(/[\s.]+$/, "")

	// Check if the name (without extension) is a reserved name
	const parts = cleaned.split(".")
	const nameWithoutExt = parts[0] || ""

	if (reservedNames.includes(nameWithoutExt.toUpperCase())) {
		parts[0] = "_" + parts[0]
		cleaned = parts.join(".")
	}

	// Handle empty result
	if (!cleaned || cleaned === ".") {
		return "unnamed"
	}

	// Truncate to 255 characters (common filesystem limit)
	if (cleaned.length > 255) {
		// Try to preserve the extension
		const lastDot = cleaned.lastIndexOf(".")
		if (lastDot > 0 && lastDot > 200) {
			const extension = cleaned.slice(lastDot)
			const nameLength = 255 - extension.length
			cleaned = cleaned.slice(0, nameLength) + extension
		} else {
			cleaned = cleaned.slice(0, 255)
		}
	}

	return cleaned
}

export default cleanFilename
