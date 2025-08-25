/**
 * Generates a random string of specified length from a character set
 *
 * Creates a random string by selecting characters from the provided
 * character set. By default, uses alphanumeric characters (a-z, A-Z, 0-9).
 * Useful for generating passwords, tokens, or test data.
 *
 * ⚠️ IMPURE: This function is non-deterministic and returns different
 * values each time it's called.
 *
 * @curried (length) => (charset?) => string
 * @param length - Length of the string to generate
 * @param charset - Characters to use (default: alphanumeric)
 * @returns Random string of specified length, or empty string if invalid
 * @example
 * ```typescript
 * // Random alphanumeric string
 * randomString(8)()
 * // "K9mN3pQx"
 *
 * randomString(16)()
 * // "a7Bc9XyZ2mNp4QrT"
 *
 * // Custom character set
 * randomString(6)('ABC123')
 * // "1A3B2C"
 *
 * // Hexadecimal string
 * randomString(32)('0123456789abcdef')
 * // "a3f7b9c2d8e1f4a7b2c9d3e8f1a4b7c2"
 *
 * // Binary string
 * randomString(8)('01')
 * // "10110101"
 *
 * // Password with special characters
 * const passwordChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
 * randomString(12)(passwordChars)
 * // "K9m!N3p@Qx7$"
 *
 * // Random DNA sequence
 * randomString(20)('ACGT')
 * // "ATCGGATCGATCGTAGCTAG"
 *
 * // Random vowels
 * randomString(5)('aeiou')
 * // "iaoue"
 *
 * // Partial application for tokens
 * const generateToken = randomString(32)
 * const token1 = generateToken()
 * const token2 = generateToken('0123456789ABCDEF')
 *
 * // Generate multiple codes
 * const codes = Array.from({ length: 5 }, () => randomString(6)())
 * // ["X9mK3p", "7aBc2N", "Qr4Ty8", "1zXc9V", "pL5mN7"]
 *
 * // Invalid inputs return empty string
 * randomString(null)()
 * // ""
 *
 * randomString(-5)()
 * // ""
 *
 * randomString(10)('')
 * // ""
 * ```
 * @property Impure - Non-deterministic pseudo-random generation
 * @property Curried - Enables partial application for token generators
 * @property Customizable - Supports any character set
 * @property Safe - Returns empty string for invalid inputs
 */
const randomString = (
	length: number | null | undefined,
) =>
(
	charset: string | null | undefined =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
): string => {
	if (
		length == null || typeof length !== "number" || length <= 0 ||
		!isFinite(length)
	) {
		return ""
	}

	if (charset == null || typeof charset !== "string" || charset.length === 0) {
		return ""
	}

	const len = Math.floor(length)
	let result = ""

	for (let i = 0; i < len; i++) {
		const index = Math.floor(Math.random() * charset.length)
		result += charset[index]
	}

	return result
}

export default randomString
