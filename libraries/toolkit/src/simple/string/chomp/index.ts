import isNullish from "../../validation/isNullish/index.ts"

/**
 * Removes trailing newline characters from a string
 *
 * Removes line terminators from the end of a string including \n (LF),
 * \r\n (CRLF), and \r (CR). This is useful for cleaning up strings from
 * file reads, user input, or data processing where trailing newlines
 * are unwanted. Only removes newlines from the end, not from within
 * the string.
 *
 * @param str - String to remove trailing newlines from
 * @returns String with trailing newlines removed
 * @example
 * ```typescript
 * // Basic usage
 * chomp("hello\n")
 * // "hello"
 *
 * chomp("hello\r\n")
 * // "hello"
 *
 * chomp("hello\r")
 * // "hello"
 *
 * // Multiple newlines
 * chomp("hello\n\n\n")
 * // "hello"
 *
 * // Mixed newlines
 * chomp("hello\r\n\n\r")
 * // "hello"
 *
 * // Preserve internal newlines
 * chomp("hello\nworld\n")
 * // "hello\nworld"
 *
 * // Array processing
 * const lines = ["line1\n", "line2\n", "line3\n"]
 * lines.map(chomp)
 * // ["line1", "line2", "line3"]
 * ```
 * @pure
 * @immutable
 * @safe
 */
const chomp = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Remove all trailing \r and \n characters
	// This regex handles \n, \r\n, and \r line endings
	return str.replace(/[\r\n]+$/, "")
}

export default chomp
