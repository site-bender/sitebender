/**
 * Validates if a string contains only alphanumeric characters
 *
 * Checks whether a string consists entirely of alphabetic characters (a-z, A-Z)
 * and numeric digits (0-9). By default, validates basic Latin letters and digits only.
 * Can optionally allow spaces, hyphens, underscores, and Unicode characters for
 * international text support. Returns false for empty strings or non-string values.
 *
 * Validation modes:
 * - Default: Only a-z, A-Z, and 0-9 characters
 * - With spaces: Alphanumeric characters and spaces
 * - With punctuation: Includes hyphens and underscores
 * - Unicode: Supports international alphabetic characters and digits
 * - Empty strings always return false
 * - Non-string values always return false
 *
 * @param options - Optional configuration for validation behavior
 * @returns A predicate function (value: unknown) => boolean that validates alphanumeric strings
 * @example
 * ```typescript
 * // Basic alphanumeric validation (default)
 * const isBasicAlphanumeric = isAlphanumeric()
 *
 * isBasicAlphanumeric("Hello123")      // true
 * isBasicAlphanumeric("abc456")        // true
 * isBasicAlphanumeric("ABC789")        // true
 * isBasicAlphanumeric("2024")          // true
 * isBasicAlphanumeric("Hello World")   // false (contains space)
 * isBasicAlphanumeric("Hello-123")     // false (contains hyphen)
 * isBasicAlphanumeric("test_case")     // false (contains underscore)
 * isBasicAlphanumeric("")              // false (empty string)
 *
 * // Allowing spaces
 * const isAlphanumericWithSpaces = isAlphanumeric({ allowSpaces: true })
 *
 * isAlphanumericWithSpaces("Hello World 123")    // true
 * isAlphanumericWithSpaces("Test 2024")          // true
 * isAlphanumericWithSpaces("Room 101")           // true
 * isAlphanumericWithSpaces("Hello  World")       // true (multiple spaces)
 * isAlphanumericWithSpaces("Hello-World")        // false (contains hyphen)
 *
 * // Allowing hyphens (for IDs, codes, etc.)
 * const isAlphanumericWithHyphens = isAlphanumeric({ allowHyphens: true })
 *
 * isAlphanumericWithHyphens("UUID-1234-ABCD")    // true
 * isAlphanumericWithHyphens("product-123")       // true
 * isAlphanumericWithHyphens("2024-01-01")        // true (not date validation, just chars)
 * isAlphanumericWithHyphens("test--123")         // true (multiple hyphens)
 * isAlphanumericWithHyphens("test_123")          // false (underscore not allowed)
 *
 * // Allowing underscores (for variable names, etc.)
 * const isAlphanumericWithUnderscores = isAlphanumeric({ allowUnderscores: true })
 *
 * isAlphanumericWithUnderscores("user_id_123")   // true
 * isAlphanumericWithUnderscores("MAX_VALUE")     // true
 * isAlphanumericWithUnderscores("__private")     // true
 * isAlphanumericWithUnderscores("test-case")     // false (hyphen not allowed)
 *
 * // Combined options for flexible validation
 * const isFlexible = isAlphanumeric({
 *   allowSpaces: true,
 *   allowHyphens: true,
 *   allowUnderscores: true
 * })
 *
 * isFlexible("user-name_123 test")     // true
 * isFlexible("ID_2024-01-01 ACTIVE")   // true
 * isFlexible("test@email.com")         // false (@ and . not allowed)
 *
 * // Unicode support for international text
 * const isUnicodeAlphanumeric = isAlphanumeric({ unicode: true })
 *
 * isUnicodeAlphanumeric("José123")     // true
 * isUnicodeAlphanumeric("Müller2024")  // true
 * isUnicodeAlphanumeric("北京2024")    // true (Chinese with numbers)
 * isUnicodeAlphanumeric("Москва123")   // true (Cyrillic with numbers)
 * isUnicodeAlphanumeric("مرحبا456")    // true (Arabic with numbers)
 * isUnicodeAlphanumeric("Hello@123")   // false (@ not allowed)
 *
 * // Unicode with spaces
 * const isUnicodeWithSpaces = isAlphanumeric({ unicode: true, allowSpaces: true })
 *
 * isUnicodeWithSpaces("José García 123")    // true
 * isUnicodeWithSpaces("北京 2024 年")       // true
 * isUnicodeWithSpaces("Test 测试 123")      // true
 *
 * // Non-string inputs
 * const validator = isAlphanumeric()
 *
 * validator(123)                        // false
 * validator(null)                       // false
 * validator(undefined)                  // false
 * validator(true)                       // false
 * validator([])                         // false
 * validator({})                         // false
 *
 * // Username validation
 * const validateUsername = (input: unknown): string | null => {
 *   const usernameValidator = isAlphanumeric({ allowUnderscores: true })
 *
 *   if (typeof input !== "string") {
 *     return "Username must be text"
 *   }
 *   if (input.length < 3 || input.length > 20) {
 *     return "Username must be 3-20 characters"
 *   }
 *   if (!usernameValidator(input)) {
 *     return "Username can only contain letters, numbers, and underscores"
 *   }
 *   return null
 * }
 *
 * validateUsername("john_doe123")      // null (valid)
 * validateUsername("user")             // null (valid)
 * validateUsername("test-user")        // "Username can only contain..."
 * validateUsername("ab")               // "Username must be 3-20 characters"
 *
 * // Product code validation
 * const validateProductCode = (code: string): boolean => {
 *   const codeValidator = isAlphanumeric({ allowHyphens: true })
 *   return codeValidator(code) && code.length === 10
 * }
 *
 * validateProductCode("ABC-123-XY")    // false (9 chars)
 * validateProductCode("ABC-1234-XY")   // true (10 chars)
 * validateProductCode("ABC.1234.XY")   // false (contains dots)
 *
 * // License key validation
 * const isValidLicenseKey = (key: string): boolean => {
 *   const parts = key.split("-")
 *   const validator = isAlphanumeric()
 *   return parts.length === 4 && parts.every(part =>
 *     part.length === 4 && validator(part)
 *   )
 * }
 *
 * isValidLicenseKey("ABCD-1234-WXYZ-5678")  // true
 * isValidLicenseKey("ABCD-12-WXYZ-5678")    // false (wrong part length)
 * isValidLicenseKey("AB@D-1234-WXYZ-5678")  // false (invalid character)
 *
 * // Search term sanitization
 * const sanitizeSearchTerm = (term: string): string => {
 *   const validator = isAlphanumeric({ allowSpaces: true })
 *
 *   if (validator(term)) {
 *     return term
 *   }
 *
 *   // Remove non-alphanumeric characters except spaces
 *   return term.replace(/[^a-zA-Z0-9\s]/g, "").trim()
 * }
 *
 * sanitizeSearchTerm("Hello World 123")    // "Hello World 123"
 * sanitizeSearchTerm("Hello@World#123")    // "HelloWorld123"
 * sanitizeSearchTerm("Test!@#$%")          // "Test"
 *
 * // Password complexity check
 * const hasAlphanumeric = (password: string): boolean => {
 *   const hasLetters = /[a-zA-Z]/.test(password)
 *   const hasNumbers = /[0-9]/.test(password)
 *   const onlyAlphanumeric = isAlphanumeric()(password.replace(/[^a-zA-Z0-9]/g, ""))
 *
 *   return hasLetters && hasNumbers && onlyAlphanumeric
 * }
 *
 * hasAlphanumeric("Password123")       // true
 * hasAlphanumeric("Password")          // false (no numbers)
 * hasAlphanumeric("12345678")          // false (no letters)
 *
 * // Filtering valid entries
 * const codes = ["ABC123", "DEF-456", "GHI 789", "JKL@789", "MNO456"]
 * const validator = isAlphanumeric()
 * const validCodes = codes.filter(validator)
 * // ["ABC123", "MNO456"]
 *
 * // Case-insensitive validation
 * const validateCode = (code: string): boolean => {
 *   const normalized = code.toUpperCase()
 *   return isAlphanumeric()(normalized) && normalized.length === 6
 * }
 *
 * validateCode("abc123")               // true
 * validateCode("ABC123")               // true
 * validateCode("AbC123")               // true
 * validateCode("ABC-123")              // false
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Configurable - Multiple options for different use cases
 * @property Unicode-aware - Optional support for international characters
 * @property Strict - Empty strings return false
 */
type AlphanumericOptions = {
	allowSpaces?: boolean
	allowHyphens?: boolean
	allowUnderscores?: boolean
	unicode?: boolean
}

const isAlphanumeric = (
	options: AlphanumericOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const {
			allowSpaces = false,
			allowHyphens = false,
			allowUnderscores = false,
			unicode = false,
		} = options

		let pattern = unicode ? "\\p{L}\\p{N}" : "a-zA-Z0-9"

		if (allowSpaces) {
			pattern += "\\s"
		}
		if (allowHyphens) {
			pattern += "\\-"
		}
		if (allowUnderscores) {
			pattern += "_"
		}

		const regex = unicode
			? new RegExp(`^[${pattern}]+$`, "u")
			: new RegExp(`^[${pattern}]+$`)

		return regex.test(value)
	}
}

export default isAlphanumeric
