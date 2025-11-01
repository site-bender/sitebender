import not from "../../../validation/not/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toPascal = (s: string): string => {
	if (not(s)) return s

	// Handle kebab-case, snake_case, and space-separated
	//++ [EXCEPTION] .split() permitted in Toolsmith for performance - provides PascalCase wrapper
	const words = s.split(/[-_\s]+/)
	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides PascalCase wrapper
	if (words.length === 0) return s

	//++ [EXCEPTION] .map(), .charAt(), .toUpperCase(), .slice(), .toLowerCase(), .join(), and + permitted in Toolsmith for performance - provides PascalCase wrapper
	return words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("")
}

export default toPascal
