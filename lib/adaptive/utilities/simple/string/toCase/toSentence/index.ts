import not from "../../predicates/not/index.ts"

/**
 * Converts a string to sentence case
 * 
 * Transforms a string to sentence case where only the first letter is
 * capitalized and all other letters are lowercase. Trims whitespace
 * from the beginning and end of the string.
 * 
 * @curried Single parameter - already curried
 * @param s - The string to convert to sentence case
 * @returns The string in sentence case format
 * @example
 * ```typescript
 * // Basic conversion
 * toSentence("HELLO WORLD")    // "Hello world"
 * toSentence("test CASE")      // "Test case"
 * toSentence("MiXeD cAsE")     // "Mixed case"
 * 
 * // Trims whitespace
 * toSentence("  spaced  ")     // "Spaced"
 * toSentence("\n\ttabbed\n")   // "Tabbed"
 * toSentence("   hello   ")    // "Hello"
 * 
 * // Already sentence case
 * toSentence("Already good")   // "Already good"
 * toSentence("Sentence case")  // "Sentence case"
 * 
 * // Special characters preserved
 * toSentence("123 MAIN ST.")   // "123 main st."
 * toSentence("email@EXAMPLE")  // "Email@example"
 * toSentence("PRICE: $99")     // "Price: $99"
 * 
 * // Edge cases
 * toSentence("")               // ""
 * toSentence("   ")            // "   " (only whitespace)
 * toSentence("a")              // "A"
 * toSentence("A")              // "A"
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