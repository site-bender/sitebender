//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
