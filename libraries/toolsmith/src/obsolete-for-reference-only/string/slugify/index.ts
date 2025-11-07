import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const slugify = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	return str
		// Convert to lowercase
		.toLowerCase()
		// Normalize and remove diacritics
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		// Remove all apostrophes and quotation marks entirely
		.replace(/['''''""""`„"«»‹›]/g, "")
		// Replace non-alphanumeric characters with hyphens
		.replace(/[^a-z0-9]+/g, "-")
		// Remove leading and trailing hyphens
		.replace(/^-+|-+$/g, "")
}

export default slugify
