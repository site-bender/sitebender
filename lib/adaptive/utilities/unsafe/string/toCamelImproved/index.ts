import words from "../../string/words/index.ts"

/**
 * Converts a string to camelCase (improved version)
 * 
 * Transforms a string to camelCase format where the first word is lowercase
 * and subsequent words have their first letter capitalized, with no separators.
 * Intelligently handles various input formats including PascalCase, mixed case,
 * acronyms, and numbers.
 * 
 * @curried Single parameter - already curried
 * @param str - The string to convert to camelCase
 * @returns The string in camelCase format
 * @example
 * ```typescript
 * // From different formats
 * toCamelImproved("hello-world")       // "helloWorld"
 * toCamelImproved("foo_bar_baz")       // "fooBarBaz"
 * toCamelImproved("test case")         // "testCase"
 * toCamelImproved("SCREAMING_SNAKE")   // "screamingSnake"
 * toCamelImproved("PascalCase")        // "pascalCase"
 * 
 * // Handles existing camelCase properly
 * toCamelImproved("alreadyCamelCase")  // "alreadyCamelCase"
 * toCamelImproved("IOError")           // "ioError"
 * toCamelImproved("XMLHttpRequest")    // "xmlHttpRequest"
 * 
 * // Mixed separators and formats
 * toCamelImproved("mixed-case_string")    // "mixedCaseString"
 * toCamelImproved("one two-three_four")   // "oneTwoThreeFour"
 * toCamelImproved("getData_fromAPI")      // "getDataFromApi"
 * 
 * // Numbers
 * toCamelImproved("version-2.0")       // "version20"
 * toCamelImproved("HTML5-parser")      // "html5Parser"
 * toCamelImproved("3rd_place")         // "3rdPlace"
 * 
 * // Acronyms
 * toCamelImproved("HTTP_ERROR_CODE")   // "httpErrorCode"
 * toCamelImproved("parse-HTML-string") // "parseHtmlString"
 * 
 * // Edge cases
 * toCamelImproved("")                  // ""
 * toCamelImproved("a")                 // "a"
 * toCamelImproved("A")                 // "a"
 * toCamelImproved("--")                // ""
 * toCamelImproved("123-456")           // "123456"
 * 
 * // Null/undefined handling
 * toCamelImproved(null)                // ""
 * toCamelImproved(undefined)           // ""
 * ```
 * @property Intelligent - properly detects word boundaries
 * @property Acronym-aware - handles acronyms correctly
 * @property Format-preserving - maintains camelCase if already present
 */
const toCamelImproved = (str: string | null | undefined): string => {
	const wordList = words(str)
	
	if (wordList.length === 0) {
		return ""
	}
	
	const [first, ...rest] = wordList
	
	return [
		first.toLowerCase(),
		...rest.map(word => 
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
	].join("")
}

export default toCamelImproved