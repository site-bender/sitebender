import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const unescape = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Map of HTML entities to characters
	const entityMap: Record<string, string> = {
		"&amp;": "&",
		"&lt;": "<",
		"&gt;": ">",
		"&quot;": '"',
		"&#39;": "'",
	}

	// Replace entities with their characters
	return str.replace(
		/&amp;|&lt;|&gt;|&quot;|&#39;/g,
		(entity) => entityMap[entity],
	)
}

export default unescape
