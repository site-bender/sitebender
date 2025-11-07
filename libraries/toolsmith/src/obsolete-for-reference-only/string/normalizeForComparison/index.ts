//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const normalizeForComparison = (text: string): string => {
	if (!text || typeof text !== "string") {
		return ""
	}

	// Normalize Unicode to decomposed form (NFD)
	let normalized = text.normalize("NFD")

	// Remove diacritical marks (combining characters)
	normalized = normalized.replace(/[\u0300-\u036f]/g, "")

	// Convert to lowercase
	normalized = normalized.toLowerCase()

	// Remove non-alphanumeric characters except spaces
	normalized = normalized.replace(
		/[^a-z0-9\s\u00C0-\u024F\u1E00-\u1EFF\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/gi,
		"",
	)

	// Collapse multiple spaces into single space
	normalized = normalized.replace(/\s+/g, " ")

	// Trim leading and trailing whitespace
	normalized = normalized.trim()

	return normalized
}

export default normalizeForComparison
