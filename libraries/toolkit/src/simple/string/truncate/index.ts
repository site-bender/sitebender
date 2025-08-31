import isNullish from "../../validation/isNullish/index.ts"

/**
 * Truncates a string to specified length with ellipsis
 *
 * Shortens a string to a maximum length and adds an ellipsis (or custom
 * suffix) if truncation occurs. Can optionally break at word boundaries
 * to avoid cutting words in half. Useful for preview text, UI constraints,
 * or summary generation.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param maxLength - Maximum length including suffix
 * @param suffix - String to append when truncated (default: "...")
 * @param str - String to truncate
 * @returns Truncated string with suffix if needed
 * @example
 * ```typescript
 * // Basic truncation
 * truncate(10)("...")("Hello World, how are you?")
 * // "Hello W..."
 *
 * // No truncation needed
 * truncate(20)("...")("Short text")
 * // "Short text"
 *
 * // Custom suffix
 * truncate(15)("…")("This is a long sentence")
 * // "This is a long…"
 *
 * // No suffix
 * truncate(10)("")("Hello World")
 * // "Hello Worl"
 *
 * // Partial application
 * const truncate50 = truncate(50)("...")
 * truncate50("Short")  // "Short"
 * truncate50("Very long text that needs to be shortened")
 * // "Very long text that needs to be shortened..."
 *
 * // Handle null/undefined
 * truncate(10)("...")(null)       // ""
 * truncate(10)("...")(undefined)  // ""
 * ```
 */
const truncate = (
	maxLength: number,
) =>
(
	suffix: string = "...",
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (str.length <= maxLength) {
		return str
	}

	// If maxLength is less than or equal to suffix length, return just suffix
	if (maxLength <= suffix.length) {
		return suffix.slice(0, maxLength)
	}

	// Truncate and add suffix
	return str.slice(0, maxLength - suffix.length) + suffix
}

export default truncate
