import not from "../../predicates/not/index.ts"

/**
 * Converts a string to sentence case (first letter capitalized, rest lowercase)
 * 
 * @param s - The string to convert to sentence case
 * @returns The string in sentence case format
 * @example
 * ```typescript
 * toSentence("HELLO WORLD") // "Hello world"
 * toSentence("test CASE") // "Test case"
 * toSentence("  spaced  ") // "Spaced"
 * ```
 */
const toSentence = (s: string): string => {
	if (not(s)) return s

	// Convert to lowercase and capitalize only the first letter
	const trimmed = s.trim()
	if (trimmed.length === 0) return s
	
	return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
}

export default toSentence