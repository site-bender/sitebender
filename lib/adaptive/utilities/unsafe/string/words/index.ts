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
	
	// Strategy:
	// 1. Handle transitions from lowercase to uppercase (camelCase)
	// 2. Handle transitions from multiple uppercase to uppercase followed by lowercase (XMLHttp -> XML, Http)
	// 3. Handle underscores, hyphens, spaces as delimiters
	// 4. Handle numbers as separate words or part of words
	// 5. Remove non-alphanumeric characters (except during parsing)
	
	const result: Array<string> = []
	let current = ""
	
	for (let i = 0; i < str.length; i++) {
		const char = str[i]
		const nextChar = str[i + 1] || ""
		const prevChar = str[i - 1] || ""
		
		// Check if character is a delimiter
		if (/[-_\s]/.test(char)) {
			if (current) {
				result.push(current)
				current = ""
			}
			continue
		}
		
		// Skip non-alphanumeric characters
		if (!/[a-zA-Z0-9]/.test(char)) {
			if (current) {
				result.push(current)
				current = ""
			}
			continue
		}
		
		// Handle numbers
		if (/\d/.test(char)) {
			// If we have a current word and this is a number, split
			if (current && /[a-zA-Z]/.test(current[current.length - 1])) {
				result.push(current)
				current = char
			} else {
				current += char
			}
			continue
		}
		
		// Handle letters
		if (/[a-zA-Z]/.test(char)) {
			// Transition from number to letter
			if (current && /\d/.test(current[current.length - 1])) {
				result.push(current)
				current = char
				continue
			}
			
			// Transition from lowercase to uppercase (camelCase boundary)
			if (/[a-z]/.test(prevChar) && /[A-Z]/.test(char)) {
				result.push(current)
				current = char
				continue
			}
			
			// Multiple uppercase letters (acronym handling)
			if (/[A-Z]/.test(prevChar) && /[A-Z]/.test(char)) {
				// If next is lowercase, this is end of acronym
				if (/[a-z]/.test(nextChar)) {
					result.push(current)
					current = char
				} else {
					current += char
				}
				continue
			}
			
			current += char
		}
	}
	
	// Don't forget the last word
	if (current) {
		result.push(current)
	}
	
	return result.filter(word => word.length > 0)
}

export default words