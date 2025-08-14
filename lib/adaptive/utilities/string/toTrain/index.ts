import not from "../../predicates/not/index.ts"

/**
 * Converts a string to Train-Case (also known as HTTP-Header-Case)
 * Each word is capitalized and separated by hyphens
 * @example
 * toTrain("hello world") // "Hello-World"
 * toTrain("content_type") // "Content-Type"
 */
const toTrain = (s: string): string => {
	if (not(s)) return s

	// Handle camelCase, PascalCase, snake_case, kebab-case, and space-separated
	return s
		.replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase/PascalCase
		.replace(/[_\s]+/g, "-") // underscores and spaces
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("-")
}

export default toTrain