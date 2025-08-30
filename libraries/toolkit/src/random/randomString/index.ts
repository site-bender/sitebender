import isNullish from "../../simple/validation/isNullish/index.ts"
import isEmpty from "../../simple/validation/isEmpty/index.ts"

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
 * @param length - Length of the string to generate
 * @param charset - Characters to use (default: alphanumeric)
 * @returns Random string of specified length, or empty string if invalid
 * @example
 * ```typescript
 * // Random alphanumeric string
 * randomString(8)()      // "K9mN3pQx"
 * randomString(16)()     // "a7Bc9XyZ2mNp4QrT"
 * 
 * // Custom character set
 * randomString(6)('ABC123')              // "1A3B2C"
 * randomString(32)('0123456789abcdef')   // hex string
 * randomString(8)('01')                  // "10110101" (binary)
 * 
 * // Random DNA sequence
 * randomString(20)('ACGT')  // "ATCGGATCGATCGTAGCTAG"
 * 
 * // Partial application for tokens
 * const generateToken = randomString(32)
 * const token1 = generateToken()
 * const token2 = generateToken('0123456789ABCDEF')
 * 
 * // Invalid inputs return empty string
 * randomString(null)()  // ""
 * randomString(-5)()    // ""
 * randomString(10)('')  // ""
 * ```
 * @curried
 * @impure
 * @safe
 */
const randomString = (
	length: number | null | undefined,
) =>
(
	charset: string | null | undefined =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
): string => {
	if (
		isNullish(length) || typeof length !== "number" || length <= 0 ||
		!isFinite(length)
	) {
		return ""
	}

	if (isNullish(charset) || typeof charset !== "string" || isEmpty(charset)) {
		return ""
	}

	const len = Math.floor(length)
	
	return Array.from({ length: len }, () => {
		const index = Math.floor(Math.random() * charset.length)
		return charset[index]
	}).join('')
}

export default randomString
