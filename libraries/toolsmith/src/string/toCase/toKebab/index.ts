import not from "../../../validation/not/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toKebab = (s: string): string => {
	if (not(s)) return s

	// Handle camelCase, PascalCase, snake_case, and space-separated
	return s
		.replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase/PascalCase
		.replace(/[\s_]+/g, "-") // spaces and underscores
		.toLowerCase()
}

export default toKebab
