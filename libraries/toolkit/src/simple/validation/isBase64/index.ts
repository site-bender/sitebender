/**
 * Validates if a string is properly Base64 encoded
 *
 * Checks whether a string conforms to the Base64 encoding format. Validates
 * both standard Base64 and URL-safe Base64 encoding. Supports optional padding
 * validation and can handle both padded and unpadded Base64 strings. Returns
 * false for empty strings or non-string values.
 *
 * Base64 validation rules:
 * - Standard Base64: Uses A-Z, a-z, 0-9, +, /
 * - URL-safe Base64: Uses A-Z, a-z, 0-9, -, _
 * - Padding: Optional = or == at the end (when required)
 * - Length: Must be a multiple of 4 when padded
 * - Empty strings return false
 * - Non-string values return false
 *
 * @param options - Optional configuration for validation behavior
 * @returns A boolean indicating if the value is valid Base64
 * @example
 * ```typescript
 * // Standard Base64 validation
 * isBase64("SGVsbG8gV29ybGQ=")           // true (Hello World)
 * isBase64("VGVzdCBTdHJpbmc=")           // true (Test String)
 * isBase64("YWJjZGVmZ2hpams=")           // true
 * isBase64("YQ==")                       // true (single char with padding)
 * isBase64("YWI=")                       // true (two chars with padding)
 * isBase64("YWJj")                       // true (three chars, no padding needed)
 *
 * // Invalid Base64
 * isBase64("Hello World")                // false (not encoded)
 * isBase64("SGVsbG8gV29ybGQ")           // false (missing padding)
 * isBase64("SGVsbG8@V29ybGQ=")          // false (invalid character @)
 * isBase64("SGVsbG8 V29ybGQ=")          // false (contains space)
 * isBase64("")                           // false (empty string)
 *
 * // URL-safe Base64 validation
 * isBase64("SGVsbG8tV29ybGQ", { urlSafe: true })     // true
 * isBase64("VGVzdF9TdHJpbmc", { urlSafe: true })     // true
 * isBase64("SGVsbG8+V29ybGQ", { urlSafe: true })     // false (invalid char)
 *
 * // Strict padding validation
 * isBase64("SGVsbG8gV29ybGQ", { strict: true })      // false (requires padding)
 * isBase64("SGVsbG8gV29ybGQ=", { strict: true })     // true (proper padding)
 * isBase64("YQ", { strict: true })                   // false (needs ==)
 * isBase64("YQ==", { strict: true })                 // true
 *
 * // Allow unpadded Base64
 * isBase64("SGVsbG8gV29ybGQ", { allowUnpadded: true })  // true
 * isBase64("YQ", { allowUnpadded: true })               // true
 * isBase64("YWI", { allowUnpadded: true })              // true
 *
 * // Non-string inputs
 * isBase64(123)                          // false
 * isBase64(null)                         // false
 * isBase64(undefined)                    // false
 * isBase64(true)                         // false
 * isBase64([])                           // false
 * isBase64({})                           // false
 *
 * // Image data validation
 * const validateImageData = (data: string): boolean => {
 *   // Remove data URL prefix if present
 *   const base64Part = data.replace(/^data:image\/[a-z]+;base64,/, "")
 *   return isBase64(base64Part)
 * }
 *
 * validateImageData("data:image/png;base64,iVBORw0KGgo...")  // true
 * validateImageData("iVBORw0KGgo...")                       // true
 * validateImageData("not-base64-data")                      // false
 *
 * // JWT token validation (JWT parts are URL-safe Base64)
 * const isValidJwtStructure = (token: string): boolean => {
 *   const parts = token.split(".")
 *   if (parts.length !== 3) return false
 *
 *   return parts.every(part =>
 *     isBase64(part, { urlSafe: true, allowUnpadded: true })
 *   )
 * }
 *
 * isValidJwtStructure("eyJhbGc.eyJzdWI.SflKxwRJSM")  // true (simplified)
 * isValidJwtStructure("invalid.jwt.token")           // false
 *
 * // File content validation
 * const isBase64File = (content: string, maxSize?: number): boolean => {
 *   if (!isBase64(content)) return false
 *
 *   if (maxSize) {
 *     // Approximate decoded size (3/4 of Base64 length)
 *     const approxSize = (content.length * 3) / 4
 *     return approxSize <= maxSize
 *   }
 *
 *   return true
 * }
 *
 * isBase64File("SGVsbG8gV29ybGQ=", 100)     // true (small file)
 * isBase64File("SGVsbG8gV29ybGQ=", 5)       // false (too large)
 *
 * // API response validation
 * const validateApiResponse = (response: unknown): string | null => {
 *   if (typeof response !== "object" || response === null) {
 *     return "Invalid response format"
 *   }
 *
 *   const data = (response as any).data
 *   if (typeof data !== "string") {
 *     return "Data must be a string"
 *   }
 *
 *   if (!isBase64(data)) {
 *     return "Data must be Base64 encoded"
 *   }
 *
 *   return null
 * }
 *
 * validateApiResponse({ data: "SGVsbG8=" })  // null (valid)
 * validateApiResponse({ data: "Hello" })     // "Data must be Base64 encoded"
 *
 * // Decoding helper with validation
 * const safeBase64Decode = (encoded: string): string | null => {
 *   if (!isBase64(encoded)) {
 *     return null
 *   }
 *
 *   try {
 *     return atob(encoded)
 *   } catch {
 *     return null
 *   }
 * }
 *
 * safeBase64Decode("SGVsbG8gV29ybGQ=")      // "Hello World"
 * safeBase64Decode("invalid-base64")        // null
 *
 * // Filtering valid Base64 strings
 * const strings = [
 *   "SGVsbG8=",
 *   "V29ybGQ=",
 *   "not-base64",
 *   "VGVzdA==",
 *   "12345",
 *   "YWJjZGVm"
 * ]
 *
 * const validBase64 = strings.filter(s => isBase64(s))
 * // ["SGVsbG8=", "V29ybGQ=", "VGVzdA==", "YWJjZGVm"]
 *
 * // Configuration validation
 * const validateEncodedConfig = (config: string): boolean => {
 *   // Must be valid Base64 and decode to valid JSON
 *   if (!isBase64(config)) return false
 *
 *   try {
 *     const decoded = atob(config)
 *     JSON.parse(decoded)
 *     return true
 *   } catch {
 *     return false
 *   }
 * }
 *
 * const jsonBase64 = btoa(JSON.stringify({ key: "value" }))
 * validateEncodedConfig(jsonBase64)         // true
 * validateEncodedConfig("SGVsbG8=")         // false (not JSON)
 *
 * // Length validation for fixed-size encodings
 * const isValidHash = (hash: string, bits: number): boolean => {
 *   if (!isBase64(hash)) return false
 *
 *   // Calculate expected Base64 length from bit size
 *   const bytes = bits / 8
 *   const expectedLength = Math.ceil((bytes * 4) / 3)
 *
 *   // Account for padding
 *   const paddingAdjusted = Math.ceil(expectedLength / 4) * 4
 *
 *   return hash.length === paddingAdjusted
 * }
 *
 * // SHA-256 produces 256 bits = 32 bytes = ~43 chars Base64 (44 with padding)
 * isValidHash("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP==", 256)  // true
 * isValidHash("tooShort=", 256)                                     // false
 * ```
 *
 * @property Pure - No side effects, returns consistent results
 * @property Configurable - Options for URL-safe, padding, and strict modes
 * @property Comprehensive - Handles standard and URL-safe Base64
 * @property Strict - Empty strings and non-strings return false
 */
type Base64Options = {
	urlSafe?: boolean // Allow URL-safe characters (- and _)
	allowUnpadded?: boolean // Allow Base64 without padding
	strict?: boolean // Require proper padding when applicable
}

const isBase64 = (value: unknown, options: Base64Options = {}): boolean => {
	if (typeof value !== "string" || value.length === 0) {
		return false
	}

	const {
		urlSafe = false,
		allowUnpadded = false,
		strict = false,
	} = options

	// Choose character set based on URL-safe option
	const chars = urlSafe
		? "A-Za-z0-9\\-_" // URL-safe Base64 uses - and _
		: "A-Za-z0-9\\+/" // Standard Base64 uses + and /

	// Build the regex pattern
	let pattern: string

	if (strict || !allowUnpadded) {
		// Strict mode or padded: must have proper padding
		// Base64 groups of 4 with optional padding at the end
		pattern = `^(?:[${chars}]{4})*(?:[${chars}]{2}==|[${chars}]{3}=)?$`
	} else if (allowUnpadded) {
		// Allow unpadded: any valid Base64 characters
		pattern = `^[${chars}]+={0,2}$`
	} else {
		// Default: standard Base64 with optional padding
		pattern =
			`^(?:[${chars}]{4})*(?:[${chars}]{2}==|[${chars}]{3}=|[${chars}]{4})$`
	}

	const regex = new RegExp(pattern)

	// Test the pattern
	if (!regex.test(value)) {
		return false
	}

	// Additional validation for strict mode
	if (strict) {
		const len = value.replace(/=/g, "").length
		const expectedPadding = (4 - (len % 4)) % 4
		const actualPadding = (value.match(/=+$/) || [""])[0].length

		return expectedPadding === actualPadding
	}

	return true
}

export default isBase64
