import not from "../../../validation/not/index.ts"

/**
 * Converts a string to Train-Case (HTTP-Header-Case)
 *
 * Transforms a string to Train-Case format where each word starts with
 * an uppercase letter and words are separated by hyphens. Commonly used
 * for HTTP headers and similar conventions. Handles various input formats
 * including camelCase, snake_case, kebab-case, and space-separated.
 *
 * @param s - The string to convert to Train-Case
 * @returns The string in Train-Case format
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 * @idempotent - f(f(x)) = f(x)
 * @example
 * ```typescript
 * // From different formats
 * toTrain("hello world")      // "Hello-World"
 * toTrain("content_type")     // "Content-Type"
 * toTrain("helloWorld")       // "Hello-World"
 * toTrain("foo-bar-baz")      // "Foo-Bar-Baz"
 * toTrain("SCREAMING_SNAKE")  // "Screaming-Snake"
 *
 * // HTTP header examples
 * toTrain("accept_encoding")  // "Accept-Encoding"
 * toTrain("x-forwarded-for")  // "X-Forwarded-For"
 * toTrain("contentLength")    // "Content-Length"
 *
 * // Mixed formats
 * toTrain("mixed_case-string") // "Mixed-Case-String"
 *
 * // Edge cases
 * toTrain("")                 // ""
 * toTrain("123-456")          // "123-456"
 * ```
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
