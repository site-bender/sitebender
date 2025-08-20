/**
 * Splits a string into an array of words
 * 
 * Intelligently identifies word boundaries in various formats including
 * camelCase, PascalCase, snake_case, kebab-case, and regular sentences.
 * Handles acronyms, numbers, and special cases gracefully.
 * 
 * @curried Single parameter - already curried
 * @param str - String to split into words
 * @returns Array of words found in the string
 * @example
 * ```typescript
 * // camelCase and PascalCase
 * words("camelCase")          // ["camel", "Case"]
 * words("PascalCase")         // ["Pascal", "Case"]
 * words("IOError")            // ["IO", "Error"]
 * words("XMLHttpRequest")     // ["XML", "Http", "Request"]
 * 
 * // snake_case and kebab-case
 * words("snake_case_example") // ["snake", "case", "example"]
 * words("kebab-case-example") // ["kebab", "case", "example"]
 * words("SCREAMING_SNAKE")    // ["SCREAMING", "SNAKE"]
 * 
 * // Regular sentences
 * words("Hello, world!")      // ["Hello", "world"]
 * words("It's a test")        // ["It", "s", "a", "test"]
 * 
 * // Mixed formats
 * words("getData_fromAPI")    // ["get", "Data", "from", "API"]
 * words("user-id_123")        // ["user", "id", "123"]
 * words("API_KEY_v2")         // ["API", "KEY", "v", "2"]
 * 
 * // Numbers
 * words("version2.0")         // ["version", "2", "0"]
 * words("3rdPlace")           // ["3", "rd", "Place"]
 * words("HTML5Parser")        // ["HTML", "5", "Parser"]
 * 
 * // Consecutive capitals (acronyms)
 * words("HTTPSConnection")    // ["HTTPS", "Connection"]
 * words("IOErrorCode")        // ["IO", "Error", "Code"]
 * words("USA")                // ["USA"]
 * 
 * // Edge cases
 * words("")                   // []
 * words("   ")                // []
 * words("123")                // ["123"]
 * words("!!!")                // []
 * words("a")                  // ["a"]
 * 
 * // Complex real-world examples
 * words("parseHTMLFromURL")   // ["parse", "HTML", "From", "URL"]
 * words("iOS_AppStore-v2.1")  // ["i", "OS", "App", "Store", "v", "2", "1"]
 * words("__private_method")   // ["private", "method"]
 * ```
 * @property Intelligent - recognizes various naming conventions
 * @property Acronym-aware - keeps acronyms together
 * @property Number-aware - handles embedded numbers
 */
const words = (str: string | null | undefined): Array<string> => {
	if (!str || typeof str !== "string") {
		return []
	}
	
	// Convert string to array for functional processing
	const chars = Array.from(str)
	
	// Process characters using reduce to build words
	const wordsWithEmpty = chars.reduce<{ words: Array<string>, current: string }>(
		(acc, char, i) => {
			const nextChar = chars[i + 1] || ""
			const prevChar = chars[i - 1] || ""
			
			// Check if character is a delimiter
			if (/[-_\s]/.test(char)) {
				return acc.current 
					? { words: [...acc.words, acc.current], current: "" }
					: acc
			}
			
			// Skip non-alphanumeric characters
			if (!/[a-zA-Z0-9]/.test(char)) {
				return acc.current
					? { words: [...acc.words, acc.current], current: "" }
					: acc
			}
			
			// Handle numbers
			if (/\d/.test(char)) {
				// If we have a current word and this is a number, split
				if (acc.current && /[a-zA-Z]/.test(acc.current[acc.current.length - 1])) {
					return { words: [...acc.words, acc.current], current: char }
				}
				return { ...acc, current: acc.current + char }
			}
			
			// Handle letters
			if (/[a-zA-Z]/.test(char)) {
				// Transition from number to letter
				if (acc.current && /\d/.test(acc.current[acc.current.length - 1])) {
					return { words: [...acc.words, acc.current], current: char }
				}
				
				// Transition from lowercase to uppercase (camelCase boundary)
				if (/[a-z]/.test(prevChar) && /[A-Z]/.test(char)) {
					return { words: [...acc.words, acc.current], current: char }
				}
				
				// Multiple uppercase letters (acronym handling)
				if (/[A-Z]/.test(prevChar) && /[A-Z]/.test(char)) {
					// If next is lowercase, this is end of acronym
					if (/[a-z]/.test(nextChar)) {
						return { words: [...acc.words, acc.current], current: char }
					}
					return { ...acc, current: acc.current + char }
				}
				
				return { ...acc, current: acc.current + char }
			}
			
			return acc
		},
		{ words: [], current: "" }
	)
	
	// Add the last word if present and filter empty strings
	const allWords = wordsWithEmpty.current 
		? [...wordsWithEmpty.words, wordsWithEmpty.current]
		: wordsWithEmpty.words
	
	return allWords.filter(word => word.length > 0)
}

export default words