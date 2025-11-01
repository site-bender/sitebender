import not from "../../../validation/not/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toScreamingSnake = (s: string): string => {
	if (not(s)) return s

	// Handle camelCase, PascalCase, kebab-case, and space-separated
	//++ [EXCEPTION] .replace(), .toUpperCase() permitted in Toolsmith for performance - provides SCREAMING_SNAKE_CASE wrapper
	return s
		.replace(/([a-z])([A-Z])/g, "$1_$2") // camelCase/PascalCase
		.replace(/[-\s]+/g, "_") // kebab-case and spaces
		.toUpperCase()
}

export default toScreamingSnake
