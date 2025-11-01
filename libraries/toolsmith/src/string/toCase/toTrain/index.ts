import not from "../../../validation/not/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toTrain = (s: string): string => {
	if (not(s)) return s

	// Handle camelCase, PascalCase, snake_case, kebab-case, and space-separated
	//++ [EXCEPTION] .replace(), .split(), .map(), .charAt(), .toUpperCase(), .slice(), .toLowerCase(), .join(), and + permitted in Toolsmith for performance - provides Train-Case wrapper
	return s
		.replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase/PascalCase
		.replace(/[_\s]+/g, "-") // underscores and spaces
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("-")
}

export default toTrain
