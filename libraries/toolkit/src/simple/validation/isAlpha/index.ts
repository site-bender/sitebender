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
 * @pure
 * @curried
 * @predicate
 * @param options - Optional configuration for validation behavior (AlphaOptions)
 * @returns A predicate function (value: unknown) => boolean that validates alphabetic strings
 * @example
 * ```typescript
 * // Basic validation
 * const isBasicAlpha = isAlpha()
 * isBasicAlpha("HelloWorld")      // true
 * isBasicAlpha("Hello World")     // false (contains space)
 * isBasicAlpha("Hello123")        // false (contains numbers)
 *
 * // Name validation with options
 * const isValidName = isAlpha({
 *   allowSpaces: true,
 *   allowHyphens: true,
 *   allowApostrophes: true
 * })
 * isValidName("Mary Jane")        // true
 * isValidName("Jean-Paul")        // true
 * isValidName("O'Brien")          // true
 *
 * // Unicode support
 * const isUnicodeAlpha = isAlpha({ unicode: true })
 * isUnicodeAlpha("José")          // true
 * isUnicodeAlpha("北京")          // true (Chinese)
 * isUnicodeAlpha("Москва")        // true (Cyrillic)
 *
 * // Non-string inputs
 * isAlpha()(null)                 // false
 * isAlpha()("")                   // false (empty)
 * ```
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
