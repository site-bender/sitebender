//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
