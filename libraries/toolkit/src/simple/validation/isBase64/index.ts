type Base64Options = {
	urlSafe?: boolean // Allow URL-safe characters (- and _)
	allowUnpadded?: boolean // Allow Base64 without padding
	strict?: boolean // Require proper padding when applicable
}

//++ Validates if a string is properly Base64 encoded
export default function isBase64(value: unknown, options: Base64Options = {}): boolean {
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

	// Build the regex pattern immutably
	const pattern = (strict || !allowUnpadded)
		? `^(?:[${chars}]{4})*(?:[${chars}]{2}==|[${chars}]{3}=)?$` // Strict mode or padded
		: allowUnpadded
		? `^[${chars}]+={0,2}$` // Allow unpadded: any valid Base64 characters
		: `^(?:[${chars}]{4})*(?:[${chars}]{2}==|[${chars}]{3}=|[${chars}]{4})$` // Default: standard Base64

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

//?? [EXAMPLE] isBase64("SGVsbG8gV29ybGQ=") // true
//?? [EXAMPLE] isBase64("YQ==") // true (single char)
//?? [EXAMPLE] isBase64("Hello World") // false (not encoded)
//?? [EXAMPLE] isBase64("") // false (empty)
//?? [EXAMPLE] isBase64("SGVsbG8tV29ybGQ", { urlSafe: true }) // true
/*??
 * [EXAMPLE]
 * isBase64("SGVsbG8gV29ybGQ=")  // true (standard Base64)
 * isBase64("YQ==")              // true (single character)
 * isBase64("Hello World")       // false (not encoded)
 *
 * // URL-safe Base64
 * isBase64("SGVsbG8tV29ybGQ", { urlSafe: true })  // true
 * isBase64("data-with_underscore", { urlSafe: true })  // true
 *
 * // Strict padding validation
 * isBase64("SGVsbG8gV29ybGQ", { strict: true })   // false (needs padding)
 * isBase64("SGVsbG8gV29ybGQ=", { strict: true })  // true (proper padding)
 *
 * // JWT validation helper
 * const isValidJwt = (token: string): boolean => {
 *   const parts = token.split(".")
 *   return parts.length === 3 && parts.every(p =>
 *     isBase64(p, { urlSafe: true, allowUnpadded: true })
 *   )
 * }
 *
 * [GOTCHA] Empty strings always return false
 * [GOTCHA] URL-safe and standard Base64 use different character sets
 */
