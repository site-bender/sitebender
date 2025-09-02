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
 * // Standard Base64
 * isBase64("SGVsbG8gV29ybGQ=")  // true
 * isBase64("YQ==")  // true (single char)
 * isBase64("Hello World")  // false (not encoded)
 * isBase64("")  // false (empty)
 *
 * // URL-safe Base64
 * isBase64("SGVsbG8tV29ybGQ", { urlSafe: true })  // true
 *
 * // Strict padding
 * isBase64("SGVsbG8gV29ybGQ", { strict: true })  // false
 * isBase64("SGVsbG8gV29ybGQ=", { strict: true })  // true
 *
 * // JWT validation
 * const isValidJwt = (token: string): boolean => {
 *   const parts = token.split(".")
 *   return parts.length === 3 && parts.every(p =>
 *     isBase64(p, { urlSafe: true, allowUnpadded: true })
 *   )
 * }
 * ```
 *
 * @pure
 * @predicate
 * @safe
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
