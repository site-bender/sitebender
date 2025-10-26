import not from "../../../validation/not/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toPascal = (s: string): string => {
	if (not(s)) return s

	// Handle kebab-case, snake_case, and space-separated
	const words = s.split(/[-_\s]+/)
	if (words.length === 0) return s

	return words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("")
}

export default toPascal
