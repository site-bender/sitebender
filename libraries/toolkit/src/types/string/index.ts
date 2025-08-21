/**
 * String manipulation type definitions
 * 
 * Provides type definitions for string operations throughout the toolkit.
 * These types support various string transformation and manipulation functions.
 */

/**
 * Function signature for string replacement operations
 * Used by replace and replaceAll functions for dynamic replacements
 * 
 * @param substring - The matched substring
 * @param args - Additional arguments (capture groups, offset, full string)
 * @returns The replacement string
 */
export type ReplacerFunction = (
	substring: string,
	...args: Array<string | number>
) => string

/**
 * Function signature for case conversion operations
 * Transforms a string to a specific case format
 * 
 * @param s - The string to convert
 * @returns The converted string
 */
export type CaseConverter = (s: string) => string

/**
 * Supported case conversion types
 * Each type represents a different string casing convention
 */
export type CaseType = 
	| "camel"     // camelCase - firstName
	| "kebab"     // kebab-case - first-name
	| "lower"     // lowercase - first name
	| "pascal"    // PascalCase - FirstName
	| "sentence"  // Sentence case - First name
	| "snake"     // snake_case - first_name
	| "SNAKE"     // SCREAMING_SNAKE_CASE - FIRST_NAME
	| "title"     // Title Case - First Name
	| "train"     // Train-Case - First-Name
	| "upper"     // UPPERCASE - FIRST NAME