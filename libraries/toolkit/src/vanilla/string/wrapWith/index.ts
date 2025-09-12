/**
 * Wraps a string with specified prefix and suffix
 *
 * Surrounds a string with given prefix and suffix strings. More flexible
 * than quote() as it allows different strings for start and end. Useful
 * for creating tags, formatting output, or building markup.
 *
 * @curried - Function returns a function for partial application
 * @param prefix - String to prepend
 * @param suffix - String to append
 * @param str - String to wrap
 * @returns String wrapped with prefix and suffix
 * @example
 * ```typescript
 * // HTML tags
 * wrapWith("<b>")("</b>")("bold text")  // "<b>bold text</b>"
 *
 * // XML tags
 * wrapWith("<name>")("</name>")("John")  // "<name>John</name>"
 *
 * // Markdown formatting
 * wrapWith("**")("**")("bold")  // "**bold**"
 * wrapWith("_")("_")("italic")   // "_italic_"
 *
 * // Different prefix and suffix
 * wrapWith("(")(")")("content")  // "(content)"
 * wrapWith("[")("](url)")("link text")  // "[link text](url)"
 *
 * // Empty string
 * wrapWith("<p>")("</p>")("")  // "<p></p>"
 *
 * // No wrapper (empty prefix/suffix)
 * wrapWith("")("")("text")  // "text"
 *
 * // Partial application
 * const htmlTag = wrapWith("<")(">")
 * const quoted = wrapWith('"')('"')
 *
 * // Handle null/undefined
 * wrapWith("(")(")")(null)  // "()"
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 */
const wrapWith = (
	prefix: string | null | undefined,
) =>
(
	suffix: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	const safePrefix = prefix ?? ""
	const safeSuffix = suffix ?? ""
	const safeStr = str ?? ""

	return safePrefix + safeStr + safeSuffix
}

export default wrapWith
