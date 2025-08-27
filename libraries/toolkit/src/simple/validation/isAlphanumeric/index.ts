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
 * // Basic usage
 * const validator = isAlphanumeric()
 * validator("Hello123")  // true
 * validator("abc456")    // true  
 * validator("Hello World")  // false (space)
 * validator("")  // false (empty)
 *
 * // With options
 * const withSpaces = isAlphanumeric({ allowSpaces: true })
 * withSpaces("Hello World 123")  // true
 *
 * const withHyphens = isAlphanumeric({ allowHyphens: true })
 * withHyphens("UUID-1234-ABCD")  // true
 *
 * // Unicode support
 * const unicode = isAlphanumeric({ unicode: true })
 * unicode("José123")  // true
 * unicode("北京2024")  // true
 *
 * // Non-string inputs
 * validator(123)  // false
 * validator(null)  // false
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
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
