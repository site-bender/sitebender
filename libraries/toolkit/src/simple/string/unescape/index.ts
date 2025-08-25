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
 * // No entities (unchanged)
 * unescape("Hello World")
 * // "Hello World"
 *
 * // Empty string
 * unescape("")
 * // ""
 *
 * // Mixed content
 * unescape("5 &lt; 10 &amp;&amp; 10 &gt; 5")
 * // "5 < 10 && 10 > 5"
 *
 * // Already escaped entities (double escaped)
 * unescape("&amp;lt;&amp;gt;")
 * // "&lt;&gt;"
 *
 * // From HTML attribute
 * unescape("data-value=&quot;5 &gt; 3&quot;")
 * // 'data-value="5 > 3"'
 *
 * // JavaScript code
 * unescape("if (x &gt; 0 &amp;&amp; x &lt; 10)")
 * // "if (x > 0 && x < 10)"
 *
 * // URL parameters
 * unescape("?name=John&amp;age=30")
 * // "?name=John&age=30"
 *
 * // JSON from HTML
 * unescape("{&quot;key&quot;: &quot;value&quot;}")
 * // '{"key": "value"}'
 *
 * // Process server response
 * const response = "&lt;p&gt;Server says: &quot;Success!&quot;&lt;/p&gt;"
 * unescape(response)
 * // '<p>Server says: "Success!"</p>'
 *
 * // Display code snippets
 * const code = "&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;"
 * unescape(code)
 * // "<script>alert('XSS')</script>"
 *
 * // Form data processing
 * const formData = "name=John&amp;message=Hello%20&lt;world&gt;"
 * unescape(formData)
 * // "name=John&message=Hello%20<world>"
 *
 * // Chat message display
 * const message = "User said: &quot;It&#39;s &lt; $100&quot;"
 * unescape(message)
 * // 'User said: "It\'s < $100"'
 *
 * // XML content
 * unescape("&lt;?xml version=&quot;1.0&quot;?&gt;")
 * // '<?xml version="1.0"?>'
 *
 * // Handle null/undefined
 * unescape(null)       // ""
 * unescape(undefined)  // ""
 *
 * // Partial entities (unchanged)
 * unescape("&lt &gt &amp")
 * // "&lt &gt &amp" (incomplete entities not converted)
 *
 * // Chain with other operations
 * const processHtml = (html: string) => {
 *   return unescape(html).toLowerCase().trim()
 * }
 * processHtml("  &lt;DIV&gt;TEST&lt;/DIV&gt;  ")
 * // "<div>test</div>"
 *
 * // Inverse of escape
 * const original = '<script>alert("XSS")</script>'
 * const escaped = escape(original)
 * const unescaped = unescape(escaped)
 * // unescaped === original
 * ```
 * @property Entity-aware - converts standard HTML entities
 * @property Safe - only converts known entities
 * @property Inverse - reverses the escape function
 */
const unescape = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
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
