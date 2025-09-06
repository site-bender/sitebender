/**
 * Minimal camelCase converter for tags and names
 */
const toCamel = (str: string | null | undefined): string => {
	if (!str) return ""
	// Split on non-alphanumerics and case boundaries
	const parts = String(str)
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
		.split(/[^a-zA-Z0-9]+/)
		.filter(Boolean)

	if (parts.length === 0) return ""

	const [first, ...rest] = parts
	return [
		first.toLowerCase(),
		...rest.map((w) =>
			w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
		),
	].join("")
}

export default toCamel
