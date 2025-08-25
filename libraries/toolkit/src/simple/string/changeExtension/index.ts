/**
 * Changes the file extension of a filename
 *
 * Replaces the existing file extension with a new one, or adds an extension
 * if none exists. The extension should be provided without a leading dot
 * unless you want multiple dots. Handles edge cases like files with multiple
 * dots and files without extensions.
 *
 * @curried (newExtension) => (filename) => result
 * @param newExtension - The new extension to apply (without leading dot)
 * @param filename - The filename to modify
 * @returns Filename with the new extension
 * @example
 * ```typescript
 * // Change extension
 * changeExtension("md")("readme.txt")
 * // "readme.md"
 *
 * // Add extension to file without one
 * changeExtension("js")("script")
 * // "script.js"
 *
 * // Replace complex extension
 * changeExtension("js")("app.min.ts")
 * // "app.min.js"
 *
 * // Handle multiple dots correctly
 * changeExtension("pdf")("document.backup.old.txt")
 * // "document.backup.old.pdf"
 *
 * // Empty extension removes extension
 * changeExtension("")("file.txt")
 * // "file"
 *
 * // Handle dot files (hidden files)
 * changeExtension("bak")(".gitignore")
 * // ".gitignore.bak"
 *
 * // Handle files with path
 * changeExtension("js")("src/components/Button.tsx")
 * // "src/components/Button.js"
 *
 * // Windows path
 * changeExtension("exe")("C:\\Program Files\\app.dll")
 * // "C:\\Program Files\\app.exe"
 *
 * // URL paths
 * changeExtension("min.js")("https://cdn.example.com/lib/script.js")
 * // "https://cdn.example.com/lib/script.min.js"
 *
 * // Partial application for batch processing
 * const toMarkdown = changeExtension("md")
 * toMarkdown("doc1.txt")  // "doc1.md"
 * toMarkdown("doc2.html") // "doc2.md"
 * toMarkdown("doc3.rtf")  // "doc3.md"
 *
 * const toTypeScript = changeExtension("ts")
 * toTypeScript("app.js")        // "app.ts"
 * toTypeScript("component.jsx")  // "component.ts"
 *
 * // Handle edge cases
 * changeExtension("txt")("")           // ".txt"
 * changeExtension("txt")(".")          // "..txt"
 * changeExtension("txt")("..")         // "...txt"
 * changeExtension("txt")("no_ext")     // "no_ext.txt"
 *
 * // Files ending with dot
 * changeExtension("txt")("file.")      // "file.txt"
 * changeExtension("")("file.")         // "file"
 *
 * // Multiple extensions
 * changeExtension("gz")("archive.tar")
 * // "archive.gz" (replaces .tar, use "tar.gz" if you want both)
 *
 * changeExtension("tar.gz")("archive.zip")
 * // "archive.tar.gz"
 *
 * // Preserve query strings and fragments in URLs
 * changeExtension("min.js")("script.js?v=1.2.3#module")
 * // "script.min.js?v=1.2.3#module"
 *
 * // No extension on dotfile
 * changeExtension("")(".bashrc")
 * // ".bashrc" (dotfiles aren't considered as having extensions)
 *
 * // Add extension to dotfile
 * changeExtension("backup")(".bashrc")
 * // ".bashrc.backup"
 * ```
 * @property Immutable - doesn't modify input strings
 * @property Path-aware - handles file paths correctly
 * @property Cross-platform - works with Unix and Windows paths
 */
const changeExtension = (
	newExtension: string,
) =>
(
	filename: string,
): string => {
	if (!filename) {
		return newExtension ? `.${newExtension}` : ""
	}

	// Handle URLs with query strings or fragments
	const urlMatch = filename.match(/^(.*?)(\?[^#]*)?(\#.*)?$/)
	if (!urlMatch) {
		return filename
	}

	const [, basePath, query = "", fragment = ""] = urlMatch

	// Find the last path separator (Unix or Windows)
	const lastSeparator = Math.max(
		basePath.lastIndexOf("/"),
		basePath.lastIndexOf("\\"),
	)

	const dir = lastSeparator >= 0 ? basePath.slice(0, lastSeparator + 1) : ""
	const name = basePath.slice(lastSeparator + 1)

	// Handle dotfiles (files starting with . but with no other dots)
	if (name.startsWith(".") && name.indexOf(".", 1) === -1) {
		// This is a dotfile without an extension
		if (newExtension) {
			return `${basePath}.${newExtension}${query}${fragment}`
		}
		return `${basePath}${query}${fragment}`
	}

	// Find the last dot in the filename (not in the directory)
	const lastDot = name.lastIndexOf(".")

	if (lastDot === -1) {
		// No extension found, add the new one
		if (newExtension) {
			return `${basePath}.${newExtension}${query}${fragment}`
		}
		return `${basePath}${query}${fragment}`
	}

	// Replace existing extension
	const nameWithoutExt = name.slice(0, lastDot)
	const result = newExtension
		? `${dir}${nameWithoutExt}.${newExtension}`
		: `${dir}${nameWithoutExt}`

	return `${result}${query}${fragment}`
}

export default changeExtension
