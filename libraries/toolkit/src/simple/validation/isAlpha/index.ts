/**
 * Validates if a string contains only alphabetic characters
 *
 * Checks whether a string consists entirely of alphabetic characters (a-z, A-Z).
 * By default, validates basic Latin letters only. Can optionally allow spaces,
 * hyphens, apostrophes, and Unicode letters for international text support.
 * Returns false for empty strings or non-string values.
 *
 * Validation modes:
 * - Default: Only a-z and A-Z characters
 * - With spaces: Alphabetic characters and spaces
 * - With punctuation: Includes hyphens and apostrophes for names
 * - Unicode: Supports international alphabetic characters
 * - Empty strings always return false
 * - Non-string values always return false
 *
 * @param options - Optional configuration for validation behavior (AlphaOptions)
 * @returns A predicate function (value: unknown) => boolean that validates alphabetic strings
 * @example
 * ```typescript
 * // Basic alphabetic validation (default)
 * const isBasicAlpha = isAlpha()
 *
 * isBasicAlpha("HelloWorld")      // true
 * isBasicAlpha("abc")             // true
 * isBasicAlpha("ABC")             // true
 * isBasicAlpha("Hello World")     // false (contains space)
 * isBasicAlpha("Hello123")        // false (contains numbers)
 * isBasicAlpha("Hello-World")     // false (contains hyphen)
 * isBasicAlpha("")                // false (empty string)
 *
 * // Allowing spaces
 * const isAlphaWithSpaces = isAlpha({ allowSpaces: true })
 *
 * isAlphaWithSpaces("Hello World")         // true
 * isAlphaWithSpaces("John Doe")            // true
 * isAlphaWithSpaces("Mary Jane Smith")     // true
 * isAlphaWithSpaces("Hello  World")        // true (multiple spaces)
 * isAlphaWithSpaces("Hello123")            // false (contains numbers)
 * isAlphaWithSpaces("Hello-World")         // false (contains hyphen)
 *
 * // Allowing hyphens (for names)
 * const isAlphaWithHyphens = isAlpha({ allowHyphens: true })
 *
 * isAlphaWithHyphens("Mary-Jane")          // true
 * isAlphaWithHyphens("Jean-Paul")          // true
 * isAlphaWithHyphens("Anne-Marie")         // true
 * isAlphaWithHyphens("Double--Hyphen")     // true
 * isAlphaWithHyphens("Mary Jane")          // false (space not allowed)
 * isAlphaWithHyphens("Mary-Jane123")       // false (contains numbers)
 *
 * // Allowing apostrophes (for names)
 * const isAlphaWithApostrophes = isAlpha({ allowApostrophes: true })
 *
 * isAlphaWithApostrophes("O'Brien")        // true
 * isAlphaWithApostrophes("D'Angelo")       // true
 * isAlphaWithApostrophes("L'Oreal")        // true
 * isAlphaWithApostrophes("It's")           // true
 * isAlphaWithApostrophes("O Brien")        // false (space not allowed)
 *
 * // Combined options for name validation
 * const isValidName = isAlpha({
 *   allowSpaces: true,
 *   allowHyphens: true,
 *   allowApostrophes: true
 * })
 *
 * isValidName("Mary Jane")              // true
 * isValidName("Jean-Paul")              // true
 * isValidName("O'Brien")                // true
 * isValidName("Mary-Jane O'Sullivan")   // true
 * isValidName("José")                   // false (accented character)
 * isValidName("Mary123")                // false (contains numbers)
 *
 * // Unicode support for international text
 * const isUnicodeAlpha = isAlpha({ unicode: true })
 *
 * isUnicodeAlpha("José")                // true
 * isUnicodeAlpha("François")            // true
 * isUnicodeAlpha("Müller")              // true
 * isUnicodeAlpha("北京")                // true (Chinese characters)
 * isUnicodeAlpha("Москва")              // true (Cyrillic)
 * isUnicodeAlpha("مرحبا")               // true (Arabic)
 * isUnicodeAlpha("Hello123")            // false (contains numbers)
 *
 * // Unicode with spaces
 * const isUnicodeWithSpaces = isAlpha({ unicode: true, allowSpaces: true })
 *
 * isUnicodeWithSpaces("José García")       // true
 * isUnicodeWithSpaces("北京 中国")         // true
 * isUnicodeWithSpaces("Café Français")     // true
 *
 * // Non-string inputs
 * const validator = isAlpha()
 *
 * validator(123)                        // false
 * validator(null)                       // false
 * validator(undefined)                  // false
 * validator(true)                       // false
 * validator([])                         // false
 * validator({})                         // false
 *
 * // Form validation
 * const validateFirstName = (input: unknown): string | null => {
 *   const nameValidator = isAlpha({
 *     allowSpaces: true,
 *     allowHyphens: true,
 *     allowApostrophes: true
 *   })
 *
 *   if (typeof input !== "string") {
 *     return "Name must be text"
 *   }
 *   if (input.trim().length === 0) {
 *     return "Name is required"
 *   }
 *   if (!nameValidator(input)) {
 *     return "Name can only contain letters, spaces, hyphens, and apostrophes"
 *   }
 *   return null
 * }
 *
 * validateFirstName("Mary Jane")       // null (valid)
 * validateFirstName("Jean-Paul")       // null (valid)
 * validateFirstName("O'Brien")         // null (valid)
 * validateFirstName("John123")         // "Name can only contain..."
 * validateFirstName("")                // "Name is required"
 *
 * // Filtering valid entries
 * const names = ["John", "Mary123", "Jean-Paul", "5000", "O'Brien", ""]
 * const nameChecker = isAlpha({ allowHyphens: true, allowApostrophes: true })
 * const validNames = names.filter(nameChecker)
 * // ["John", "Jean-Paul", "O'Brien"]
 *
 * // Password validation (letters only)
 * const isLettersOnlyPassword = (password: string): boolean => {
 *   const alphaOnly = isAlpha()
 *   return alphaOnly(password) && password.length >= 8
 * }
 *
 * isLettersOnlyPassword("SecretPassword")  // true
 * isLettersOnlyPassword("Pass")            // false (too short)
 * isLettersOnlyPassword("Password123")     // false (contains numbers)
 *
 * // Language detection helper
 * const containsOnlyLatin = isAlpha()
 * const containsUnicode = isAlpha({ unicode: true })
 *
 * const detectScript = (text: string): string => {
 *   if (containsOnlyLatin(text)) {
 *     return "latin"
 *   }
 *   if (containsUnicode(text)) {
 *     return "unicode"
 *   }
 *   return "mixed"
 * }
 *
 * detectScript("Hello")        // "latin"
 * detectScript("José")         // "unicode"
 * detectScript("Hello123")     // "mixed"
 *
 * // Search query sanitization
 * const sanitizeSearchTerm = (term: string): string => {
 *   const alphaWithSpaces = isAlpha({ allowSpaces: true })
 *
 *   if (alphaWithSpaces(term)) {
 *     return term
 *   }
 *
 *   // Remove non-alphabetic characters
 *   return term.replace(/[^a-zA-Z\s]/g, "").trim()
 * }
 *
 * sanitizeSearchTerm("Hello World")    // "Hello World"
 * sanitizeSearchTerm("Hello123World")  // "HelloWorld"
 * sanitizeSearchTerm("Test@#$Case")    // "TestCase"
 *
 * // Username validation
 * const isValidUsername = (username: string): boolean => {
 *   const alphaOnly = isAlpha()
 *   return alphaOnly(username) &&
 *          username.length >= 3 &&
 *          username.length <= 20
 * }
 *
 * isValidUsername("johndoe")       // true
 * isValidUsername("ab")            // false (too short)
 * isValidUsername("john_doe")      // false (contains underscore)
 *
 * // Case-sensitive validation
 * const hasOnlyUppercase = (text: string): boolean => {
 *   const alphaOnly = isAlpha()
 *   return alphaOnly(text) && text === text.toUpperCase()
 * }
 *
 * const hasOnlyLowercase = (text: string): boolean => {
 *   const alphaOnly = isAlpha()
 *   return alphaOnly(text) && text === text.toLowerCase()
 * }
 *
 * hasOnlyUppercase("HELLO")    // true
 * hasOnlyUppercase("Hello")    // false
 * hasOnlyLowercase("hello")    // true
 * hasOnlyLowercase("Hello")    // false
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Configurable - Multiple options for different use cases
 * @property Unicode-aware - Optional support for international characters
 * @property Strict - Empty strings return false
 */
type AlphaOptions = {
	allowSpaces?: boolean
	allowHyphens?: boolean
	allowApostrophes?: boolean
	unicode?: boolean
}

const isAlpha = (options: AlphaOptions = {}): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const {
			allowSpaces = false,
			allowHyphens = false,
			allowApostrophes = false,
			unicode = false,
		} = options

		let pattern = unicode ? "\\p{L}" : "a-zA-Z"

		if (allowSpaces) {
			pattern += "\\s"
		}
		if (allowHyphens) {
			pattern += "\\-"
		}
		if (allowApostrophes) {
			pattern += "'"
		}

		const regex = unicode
			? new RegExp(`^[${pattern}]+$`, "u")
			: new RegExp(`^[${pattern}]+$`)

		return regex.test(value)
	}
}

export default isAlpha
