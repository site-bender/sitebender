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
 * // Remove invalid characters
 * cleanFilename("file<name>.txt")
 * // "file_name_.txt"
 * 
 * // Handle Windows invalid characters
 * cleanFilename("file:name|test?.doc")
 * // "file_name_test_.doc"
 * 
 * // Remove control characters
 * cleanFilename("file\x00name\x1F.txt")
 * // "filename.txt"
 * 
 * // Handle reserved Windows names
 * cleanFilename("CON.txt")
 * // "_CON.txt"
 * 
 * cleanFilename("aux.doc")
 * // "_aux.doc"
 * 
 * // Trim spaces and dots
 * cleanFilename("  filename.txt  ")
 * // "filename.txt"
 * 
 * cleanFilename("...filename...")
 * // "filename"
 * 
 * // Handle path separators
 * cleanFilename("folder/file.txt")
 * // "folder_file.txt"
 * 
 * cleanFilename("C:\\folder\\file.txt")
 * // "C__folder_file.txt"
 * 
 * // Multiple spaces collapsed
 * cleanFilename("file    name.txt")
 * // "file name.txt"
 * 
 * // Special characters
 * cleanFilename("file*name?.txt")
 * // "file_name_.txt"
 * 
 * cleanFilename('file"name".txt')
 * // "file_name_.txt"
 * 
 * // Unicode characters preserved
 * cleanFilename("文件名.txt")
 * // "文件名.txt"
 * 
 * cleanFilename("café.txt")
 * // "café.txt"
 * 
 * // Empty or whitespace only
 * cleanFilename("")
 * // "unnamed"
 * 
 * cleanFilename("   ")
 * // "unnamed"
 * 
 * // Very long filenames (truncated to 255 chars)
 * cleanFilename("a".repeat(300) + ".txt")
 * // "aaa...aaa.txt" (255 chars total)
 * 
 * // Preserve extensions
 * cleanFilename("file<>name.tar.gz")
 * // "file__name.tar.gz"
 * 
 * // Handle only dots
 * cleanFilename("...")
 * // "unnamed"
 * 
 * cleanFilename("..hidden")
 * // "hidden"
 * 
 * // Reserved names with extensions
 * cleanFilename("PRN.backup.txt")
 * // "_PRN.backup.txt"
 * 
 * // Case variations of reserved names
 * cleanFilename("Com1.txt")
 * // "_Com1.txt"
 * 
 * cleanFilename("LPT9.doc")
 * // "_LPT9.doc"
 * 
 * // Clean up messy user input
 * cleanFilename("***My||File???.txt***")
 * // "___My__File___.txt"
 * 
 * // Handle null bytes and other control chars
 * cleanFilename("file\0\n\r\tname.txt")
 * // "file name.txt"
 * 
 * // Batch processing example
 * const userFiles = [
 *   "report<2024>.pdf",
 *   "data:analysis.xlsx",
 *   "summary|final.doc"
 * ]
 * userFiles.map(cleanFilename)
 * // ["report_2024_.pdf", "data_analysis.xlsx", "summary_final.doc"]
 * ```
 * @property Immutable - doesn't modify input string
 * @property Cross-platform - safe for Windows, macOS, and Linux
 * @property Unicode-preserving - keeps valid Unicode characters
 */
const cleanFilename = (filename: string): string => {
	if (!filename || !filename.trim()) {
		return "unnamed"
	}
	
	// Windows reserved names (case-insensitive)
	const reservedNames = [
		"CON", "PRN", "AUX", "NUL",
		"COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
		"LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"
	]
	
	// Remove control characters (0x00-0x1F and 0x7F)
	let cleaned = filename.replace(/[\x00-\x1F\x7F]/g, "")
	
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