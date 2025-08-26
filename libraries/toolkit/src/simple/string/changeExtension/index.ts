/**
 * Changes the file extension of a filename
 *
 * Replaces the existing file extension with a new one, or adds an extension
 * if none exists. The extension should be provided without a leading dot
 * unless you want multiple dots. Handles edge cases like files with multiple
 * dots and files without extensions.
 *
 * @param newExtension - The new extension to apply (without leading dot)
 * @param filename - The filename to modify
 * @returns Filename with the new extension
 * @example
 * ```typescript
 * // Basic usage
 * changeExtension("md")("readme.txt")
 * // "readme.md"
 *
 * changeExtension("js")("script")
 * // "script.js"
 *
 * changeExtension("js")("app.min.ts")
 * // "app.min.js"
 *
 * // Remove extension
 * changeExtension("")("file.txt")
 * // "file"
 *
 * // Dot files
 * changeExtension("bak")(".gitignore")
 * // ".gitignore.bak"
 *
 * // Path handling
 * changeExtension("js")("src/components/Button.tsx")
 * // "src/components/Button.js"
 *
 * // Partial application
 * const toMarkdown = changeExtension("md")
 * toMarkdown("doc1.txt")  // "doc1.md"
 * toMarkdown("doc2.html") // "doc2.md"
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
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
