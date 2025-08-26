import not from "../../predicates/not/index.ts"

/**
 * Converts a string to sentence case
 *
 * Transforms a string to sentence case where only the first letter is
 * capitalized and all other letters are lowercase. Trims whitespace
 * from the beginning and end of the string.
 *
 * @param s - The string to convert to sentence case
 * @returns The string in sentence case format
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 * @example
 * ```typescript
 * // Basic conversion
 * toSentence("HELLO WORLD")    // "Hello world"
 * toSentence("test CASE")      // "Test case"
 * toSentence("MiXeD cAsE")     // "Mixed case"
 *
 * // Trims whitespace
 * toSentence("  spaced  ")     // "Spaced"
 * toSentence("   hello   ")    // "Hello"
 *
 * // Already sentence case
 * toSentence("Already good")   // "Already good"
 *
 * // Special characters preserved
 * toSentence("123 MAIN ST.")   // "123 main st."
 *
 * // Edge cases
 * toSentence("")               // ""
 * toSentence("123")            // "123" (no letters to capitalize)
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
