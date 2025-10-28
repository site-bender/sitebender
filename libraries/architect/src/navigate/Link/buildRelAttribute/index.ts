import type { Props } from "../index.tsx"

export default function buildRelAttribute(
	props: Props,
	isExternal: boolean,
): string | undefined {
	const relParts: string[] = []

	// Add from semantic props
	if (props.toHelp) relParts.push("help")
	if (props.toGlossary) relParts.push("glossary")
	if (props.toNextPage) relParts.push("next")
	if (props.toPreviousPage) relParts.push("prev")

	// Handle external link defaults and overrides
	if (isExternal) {
		relParts.push("external")

		// Apply secure defaults unless explicitly overridden
		if (!props.allowTabJacking) {
			relParts.push("noopener")
		}
		if (!props.allowSearchArchitectIndexing) {
			relParts.push("nofollow")
		}
		if (props.hideReferringPage) {
			relParts.push("noreferrer")
		}
	}

	// Add from string rel prop if provided
	if (props.rel) {
		relParts.push(...props.rel.split(/\s+/).filter(Boolean))
	}

	// Remove duplicates and empty values
	const uniqueParts = [...new Set(relParts.filter((part) => part))]

	return uniqueParts.length > 0 ? uniqueParts.join(" ") : undefined
}
