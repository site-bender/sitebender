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
 * findExtension("image.png")
 * // "png"
 * 
 * findExtension("archive.tar.gz")
 * // "gz"
 * 
 * // Files with multiple dots
 * findExtension("app.min.js")
 * // "js"
 * 
 * findExtension("backup.2024.01.01.sql")
 * // "sql"
 * 
 * // File paths
 * findExtension("/home/user/documents/report.docx")
 * // "docx"
 * 
 * findExtension("C:\\Users\\Documents\\file.txt")
 * // "txt"
 * 
 * // URLs
 * findExtension("https://example.com/assets/style.css")
 * // "css"
 * 
 * findExtension("https://api.example.com/data.json?v=1.2")
 * // "json"
 * 
 * // No extension
 * findExtension("README")
 * // ""
 * 
 * findExtension("Makefile")
 * // ""
 * 
 * // Dotfiles (no extension)
 * findExtension(".gitignore")
 * // ""
 * 
 * findExtension(".bashrc")
 * // ""
 * 
 * // Dotfiles with extensions
 * findExtension(".gitignore.local")
 * // "local"
 * 
 * findExtension(".env.production")
 * // "production"
 * 
 * // Hidden files with normal extensions
 * findExtension(".hidden.txt")
 * // "txt"
 * 
 * // Edge cases
 * findExtension("")
 * // ""
 * 
 * findExtension(".")
 * // ""
 * 
 * findExtension("..")
 * // ""
 * 
 * findExtension("file.")
 * // ""
 * 
 * findExtension("file..")
 * // ""
 * 
 * // Very long extensions
 * findExtension("file.verylongextension")
 * // "verylongextension"
 * 
 * // Numbers in extensions
 * findExtension("video.mp4")
 * // "mp4"
 * 
 * findExtension("data.sqlite3")
 * // "sqlite3"
 * 
 * // Case preservation
 * findExtension("Document.PDF")
 * // "PDF"
 * 
 * findExtension("Image.JPG")
 * // "JPG"
 * 
 * // Complex paths
 * findExtension("/path.to/some.dir/file.ext")
 * // "ext"
 * 
 * findExtension("./relative/path/script.sh")
 * // "sh"
 * 
 * // URL with fragment
 * findExtension("page.html#section")
 * // "html"
 * 
 * // URL with query parameters
 * findExtension("api.php?action=get&id=123")
 * // "php"
 * 
 * // Checking file types
 * const files = [
 *   "photo.jpg",
 *   "document.pdf",
 *   "video.mp4",
 *   "README",
 *   ".gitignore"
 * ]
 * 
 * files.map(findExtension)
 * // ["jpg", "pdf", "mp4", "", ""]
 * 
 * // Filter by extension
 * const hasExtension = (file: string) => findExtension(file) !== ""
 * files.filter(hasExtension)
 * // ["photo.jpg", "document.pdf", "video.mp4"]
 * 
 * // Group by extension
 * const images = ["pic1.jpg", "pic2.png", "pic3.jpg", "pic4.gif"]
 * const byExt = images.reduce((acc, file) => {
 *   const ext = findExtension(file)
 *   if (!acc[ext]) acc[ext] = []
 *   acc[ext].push(file)
 *   return acc
 * }, {} as Record<string, string[]>)
 * // { jpg: ["pic1.jpg", "pic3.jpg"], png: ["pic2.png"], gif: ["pic4.gif"] }
 * ```
 * @property Immutable - doesn't modify input string
 * @property Path-aware - correctly handles file paths and URLs
 * @property Dotfile-aware - distinguishes between dotfiles and extensions
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
		cleanName.lastIndexOf("\\")
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