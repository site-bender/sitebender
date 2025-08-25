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
 * // Quotes
 * escape('She said "Hello"')
 * // "She said &quot;Hello&quot;"
 *
 * // Single quotes
 * escape("It's a test")
 * // "It&#39;s a test"
 *
 * // Less than and greater than
 * escape("5 < 10 && 10 > 5")
 * // "5 &lt; 10 &amp;&amp; 10 &gt; 5"
 *
 * // Mixed HTML content
 * escape('<div class="container">Hello & goodbye</div>')
 * // "&lt;div class=&quot;container&quot;&gt;Hello &amp; goodbye&lt;/div&gt;"
 *
 * // Empty string
 * escape("")
 * // ""
 *
 * // No special characters
 * escape("Hello World")
 * // "Hello World"
 *
 * // URL with parameters
 * escape("https://example.com?name=John&age=30")
 * // "https://example.com?name=John&amp;age=30"
 *
 * // JavaScript code
 * escape("function test() { return x > 0 && x < 10; }")
 * // "function test() { return x &gt; 0 &amp;&amp; x &lt; 10; }"
 *
 * // HTML attributes
 * escape('<img src="image.jpg" alt="A & B">')
 * // "&lt;img src=&quot;image.jpg&quot; alt=&quot;A &amp; B&quot;&gt;"
 *
 * // Prevent XSS in user input
 * const userInput = "<script>steal()</script>"
 * const safe = escape(userInput)
 * // "&lt;script&gt;steal()&lt;/script&gt;"
 * // Now safe to insert into HTML
 *
 * // Form data sanitization
 * const formData = 'Robert"); DROP TABLE users;--'
 * escape(formData)
 * // "Robert&quot;); DROP TABLE users;--"
 *
 * // Chat message sanitization
 * const message = "Hi <b>there</b> & welcome!"
 * escape(message)
 * // "Hi &lt;b&gt;there&lt;/b&gt; &amp; welcome!"
 *
 * // Code snippet display
 * const code = 'if (x < y) { return "x is less"; }'
 * escape(code)
 * // "if (x &lt; y) { return &quot;x is less&quot;; }"
 *
 * // XML content
 * escape('<?xml version="1.0"?><root>data</root>')
 * // "&lt;?xml version=&quot;1.0&quot;?&gt;&lt;root&gt;data&lt;/root&gt;"
 *
 * // HTML comments
 * escape("<!-- This is a comment -->")
 * // "&lt;!-- This is a comment --&gt;"
 *
 * // Special characters in attributes
 * escape('data-value="5 > 3"')
 * // "data-value=&quot;5 &gt; 3&quot;"
 *
 * // Unicode (not escaped)
 * escape("Hello 世界 🌍")
 * // "Hello 世界 🌍"
 *
 * // Mathematical expressions
 * escape("2 < 3 && 4 > 1")
 * // "2 &lt; 3 &amp;&amp; 4 &gt; 1"
 *
 * // Template literals
 * escape("${name} & ${value}")
 * // "${name} &amp; ${value}"
 *
 * // SQL in HTML context
 * escape("SELECT * FROM users WHERE age > 18")
 * // "SELECT * FROM users WHERE age &gt; 18"
 *
 * // JSON in HTML
 * escape('{"name": "John", "active": true}')
 * // "{&quot;name&quot;: &quot;John&quot;, &quot;active&quot;: true}"
 *
 * // Multiple escapes needed
 * escape('&lt;&gt;&amp;&quot;&#39;')
 * // "&amp;lt;&amp;gt;&amp;amp;&amp;quot;&amp;#39;"
 *
 * // Path traversal attempt
 * escape("../../etc/passwd")
 * // "../../etc/passwd" (slashes not escaped)
 *
 * // Handle null/undefined gracefully
 * escape(null)       // ""
 * escape(undefined)  // ""
 *
 * // Chain with other operations
 * const sanitizeAndFormat = (input: string) => {
 *   return escape(input.trim().toLowerCase())
 * }
 * sanitizeAndFormat("  <SCRIPT>alert('xss')</SCRIPT>  ")
 * // "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;"
 *
 * // Use in template building
 * const buildHtml = (title: string, content: string) => {
 *   return `<h1>${escape(title)}</h1><p>${escape(content)}</p>`
 * }
 * buildHtml("News & Updates", "Today's temperature is > 30°C")
 * // "<h1>News &amp; Updates</h1><p>Today&#39;s temperature is &gt; 30°C</p>"
 *
 * // Escape for HTML attribute
 * const attr = escape('"onclick="alert(1)"')
 * // "&quot;onclick=&quot;alert(1)&quot;"
 * // Safe to use: <div title="${attr}">
 *
 * // Markdown code blocks
 * escape("```<script>alert('xss')</script>```")
 * // "```&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;```"
 *
 * // CSS in HTML
 * escape("<style>body { color: red; }</style>")
 * // "&lt;style&gt;body { color: red; }&lt;/style&gt;"
 *
 * // Event handlers
 * escape('onmouseover="alert(1)"')
 * // "onmouseover=&quot;alert(1)&quot;"
 * ```
 * @property XSS-safe - prevents script injection when used properly
 * @property HTML-entities - converts to standard HTML entities
 * @property Unicode-preserving - doesn't escape Unicode characters
 */
const escape = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
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
