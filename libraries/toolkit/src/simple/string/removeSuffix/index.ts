import isNullish from "../../validation/isNullish/index.ts"

/**
 * Removes a suffix from a string if present
 *
 * Strips a specified suffix from the end of a string, but only if the
 * string actually ends with that suffix. If the suffix is not found at
 * the end, returns the original string unchanged. This is useful for
 * removing file extensions, trailing punctuation, or any suffixed identifiers.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param suffix - The suffix to remove
 * @param str - The string to remove suffix from
 * @returns String with suffix removed if it was present
 * @example
 * ```typescript
 * // Basic suffix removal
 * removeSuffix(".txt")("document.txt")  // "document"
 *
 * // Suffix not present (unchanged)
 * removeSuffix(".txt")("document.pdf")  // "document.pdf"
 *
 * // Case sensitive
 * removeSuffix(".TXT")("document.txt")  // "document.txt"
 *
 * // Empty suffix (unchanged)
 * removeSuffix("")("hello")             // "hello"
 *
 * // File extension removal
 * removeSuffix(".min.js")("script.min.js")  // "script"
 *
 * // Trailing slash
 * removeSuffix("/")("https://example.com/")  // "https://example.com"
 *
 * // Partial application
 * const removeJs = removeSuffix(".js")
 * removeJs("app.js")                    // "app"
 * ```
 */
const removeSuffix = (
	suffix: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (isNullish(suffix) || typeof suffix !== "string" || suffix === "") {
		return str
	}

	// Only remove if string ends with the suffix
	return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
}

export default removeSuffix
