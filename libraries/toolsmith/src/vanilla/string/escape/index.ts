/**
 * Escapes special HTML characters to prevent XSS attacks
 *
 * Converts special HTML characters to their corresponding HTML entities
 * to prevent cross-site scripting (XSS) attacks and ensure proper display
 * of text content in HTML contexts. This is essential when displaying
 * user-generated content or any untrusted data in HTML.
 *
 * @param str - String to escape HTML characters in
 * @returns String with HTML characters escaped
 * @example
 * ```typescript
 * // Basic HTML tags
 * escape("<script>alert('XSS')</script>")
 * // "&lt;script&gt;alert('XSS')&lt;/script&gt;"
 *
 * // HTML entities
 * escape("Tom & Jerry")
 * // "Tom &amp; Jerry"
 *
 * // Quotes and apostrophes
 * escape('She said "Hello" and it\'s true')
 * // "She said &quot;Hello&quot; and it&#39;s true"
 *
 * // Mixed HTML content
 * escape('<div class="container">Hello & goodbye</div>')
 * // "&lt;div class=&quot;container&quot;&gt;Hello &amp; goodbye&lt;/div&gt;"
 *
 * // Empty string and null handling
 * escape("")        // ""
 * escape(null)      // ""
 * escape(undefined) // ""
 *
 * // JavaScript code in HTML
 * escape("function test() { return x > 0 && x < 10; }")
 * // "function test() { return x &gt; 0 &amp;&amp; x &lt; 10; }"
 *
 * // User input sanitization
 * const userInput = "<script>steal()</script>"
 * const safeInput = escape(userInput)
 * // "&lt;script&gt;steal()&lt;/script&gt;"
 *
 * // Unicode characters preserved
 * escape("Hello 世界 🌍")
 * // "Hello 世界 🌍"
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify input
 * @safe - Returns safe values for invalid inputs
 */
import isNullish from "../../validation/isNullish/index.ts"

const escape = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Map of characters to escape and their HTML entities
	const escapeMap: Record<string, string> = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
	}

	// Replace special characters with their HTML entities
	return str.replace(/[&<>"']/g, (char) => escapeMap[char])
}

export default escape
