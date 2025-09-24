import isNullish from "../../validation/isNullish/index.ts"

/**
 * Unescapes HTML entities back to their original characters
 *
 * Converts HTML entities like &lt;, &gt;, &amp;, &quot;, and &#39;
 * back to their corresponding characters. This is the inverse of the
 * escape function, useful for displaying HTML-encoded content as plain
 * text or processing escaped data.
 *
 * @param str - String with HTML entities to unescape
 * @returns String with entities converted to characters
 * @example
 * ```typescript
 * // Basic HTML entities
 * unescape("&lt;div&gt;Hello&lt;/div&gt;")
 * // "<div>Hello</div>"
 *
 * // Ampersand
 * unescape("Tom &amp; Jerry")
 * // "Tom & Jerry"
 *
 * // Quotes
 * unescape("&quot;Hello&quot;")
 * // '"Hello"'
 *
 * unescape("It&#39;s working")
 * // "It's working"
 *
 * // Multiple entities
 * unescape("&lt;a href=&quot;url&quot;&gt;Link&lt;/a&gt;")
 * // '<a href="url">Link</a>'
 *
 * // Mixed content
 * unescape("5 &lt; 10 &amp;&amp; 10 &gt; 5")
 * // "5 < 10 && 10 > 5"
 *
 * // Handle null/undefined
 * unescape(null)       // ""
 * unescape(undefined)  // ""
 *
 * // Double swap returns original (with escape function)
 * const original = '<script>alert("XSS")</script>'
 * const escaped = escape(original)
 * const unescaped = unescape(escaped)
 * // unescaped === original
 * ```
 * @pure
 * @immutable
 * @safe
 */
const unescape = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Map of HTML entities to characters
	const entityMap: Record<string, string> = {
		"&amp;": "&",
		"&lt;": "<",
		"&gt;": ">",
		"&quot;": '"',
		"&#39;": "'",
	}

	// Replace entities with their characters
	return str.replace(
		/&amp;|&lt;|&gt;|&quot;|&#39;/g,
		(entity) => entityMap[entity],
	)
}

export default unescape
