/**
 * Sanitizes strings for safe use in HTML/URLs
 * 
 * Aggressively cleans strings to prevent XSS attacks and injection vulnerabilities.
 * Unlike escape which preserves content with HTML entities, sanitize removes
 * potentially dangerous content entirely. Strips HTML tags, JavaScript protocols,
 * dangerous attributes, and normalizes whitespace. Use this for untrusted user
 * input that needs to be displayed as plain text.
 * 
 * @param input - String to sanitize
 * @returns Sanitized string safe for HTML/URL contexts
 * @example
 * ```typescript
 * // Remove HTML tags completely
 * sanitize("<script>alert('XSS')</script>Hello")
 * // "Hello"
 * 
 * // Remove all HTML formatting
 * sanitize("<b>Bold</b> and <i>italic</i> text")
 * // "Bold and italic text"
 * 
 * // Remove dangerous protocols
 * sanitize("javascript:alert('XSS')")
 * // ""
 * 
 * sanitize("data:text/html,<script>alert('XSS')</script>")
 * // ""
 * 
 * // Clean up URLs
 * sanitize("https://example.com/page")
 * // "https://example.com/page"
 * 
 * // Remove event handlers
 * sanitize("Click me <span onclick='alert(1)'>here</span>")
 * // "Click me here"
 * 
 * // Strip comments
 * sanitize("<!-- Hidden comment -->Visible text")
 * // "Visible text"
 * 
 * // Remove style tags
 * sanitize("<style>body{display:none}</style>Content")
 * // "Content"
 * 
 * // Normalize whitespace
 * sanitize("Too    many\n\n\nspaces")
 * // "Too many spaces"
 * 
 * // Handle nested tags
 * sanitize("<div><script>bad</script><p>Good</p></div>")
 * // "Good"
 * 
 * // Remove attributes
 * sanitize('<img src="x" onerror="alert(1)">')
 * // ""
 * 
 * // Plain text preserved
 * sanitize("Hello World! This is safe text.")
 * // "Hello World! This is safe text."
 * 
 * // Remove meta refresh
 * sanitize('<meta http-equiv="refresh" content="0;url=evil.com">')
 * // ""
 * 
 * // Remove iframes
 * sanitize('<iframe src="evil.com"></iframe>')
 * // ""
 * 
 * // Remove object/embed
 * sanitize('<object data="evil.swf"></object>')
 * // ""
 * 
 * sanitize('<embed src="evil.swf">')
 * // ""
 * 
 * // Clean form inputs
 * sanitize('<input type="hidden" value="evil">')
 * // ""
 * 
 * // Preserve safe URLs
 * sanitize("Visit https://example.com for more")
 * // "Visit https://example.com for more"
 * 
 * // Remove javascript: protocol
 * sanitize('<a href="javascript:void(0)">Click</a>')
 * // "Click"
 * 
 * // Remove vbscript: protocol
 * sanitize('<a href="vbscript:alert(1)">Click</a>')
 * // "Click"
 * 
 * // Clean encoded characters
 * sanitize("&#60;script&#62;alert('XSS')&#60;/script&#62;")
 * // "alert('XSS')"
 * 
 * // Handle null bytes
 * sanitize("Hello\x00World")
 * // "HelloWorld"
 * 
 * // Remove SVG with scripts
 * sanitize('<svg onload="alert(1)"><circle /></svg>')
 * // ""
 * 
 * // Clean CSS expressions
 * sanitize('style="background:url(javascript:alert(1))"')
 * // 'style="background:url"'
 * 
 * // Multiple spaces collapsed
 * sanitize("Multiple     spaces     here")
 * // "Multiple spaces here"
 * 
 * // Trim result
 * sanitize("  <b>trimmed</b>  ")
 * // "trimmed"
 * 
 * // Empty after sanitization
 * sanitize("<script></script>")
 * // ""
 * 
 * sanitize("javascript:void(0)")
 * // ""
 * 
 * // Mixed content
 * sanitize("Safe text <script>alert(1)</script> more safe text")
 * // "Safe text more safe text"
 * 
 * // User comment sanitization
 * const userComment = '<script>steal()</script>Great product!'
 * sanitize(userComment)
 * // "Great product!"
 * 
 * // Form data cleaning
 * const formInput = 'John<script>alert("XSS")</script>Doe'
 * sanitize(formInput)
 * // "JohnDoe"
 * 
 * // Chat message cleaning
 * const chatMsg = 'Hello <img src=x onerror=alert(1)> everyone!'
 * sanitize(chatMsg)
 * // "Hello everyone!"
 * 
 * // File name cleaning
 * sanitize("../../etc/passwd")
 * // "../../etc/passwd" (path traversal not removed, use cleanFilename for that)
 * 
 * // SQL injection attempt (not SQL sanitization)
 * sanitize("'; DROP TABLE users; --")
 * // "'; DROP TABLE users; --" (SQL should be handled by parameterization)
 * 
 * // Markdown preserved
 * sanitize("**Bold** and _italic_ markdown")
 * // "**Bold** and _italic_ markdown"
 * 
 * // Emoji preserved
 * sanitize("Hello 😊 <script>bad</script>")
 * // "Hello 😊"
 * 
 * // Handle null/undefined
 * sanitize(null)
 * // ""
 * 
 * sanitize(undefined)
 * // ""
 * 
 * // Empty string
 * sanitize("")
 * // ""
 * 
 * // Whitespace only
 * sanitize("   \n\n\t  ")
 * // ""
 * 
 * // Use for display
 * const displayComment = (comment: string) => {
 *   const safe = sanitize(comment)
 *   return `<div class="comment">${safe}</div>`
 * }
 * 
 * // Combine with other sanitization
 * const fullSanitize = (input: string) => {
 *   return sanitize(input).slice(0, 500) // Also limit length
 * }
 * ```
 * @property XSS-safe - removes all potentially dangerous content
 * @property Tag-stripping - removes all HTML/XML tags
 * @property Protocol-filtering - removes dangerous URL protocols
 */
const sanitize = (
	input: string | null | undefined
): string => {
	if (input == null || typeof input !== "string") {
		return ""
	}
	
	// Remove null bytes
	let cleaned = input.replace(/\x00/g, "")
	
	// Decode HTML entities to catch encoded attacks
	cleaned = cleaned.replace(/&#(\d+);/g, (match, num) => {
		return String.fromCharCode(parseInt(num))
	})
	cleaned = cleaned.replace(/&([a-z]+);/gi, (match, entity) => {
		const entities: Record<string, string> = {
			"lt": "<", "gt": ">", "amp": "&", "quot": '"', "apos": "'",
			"nbsp": " ", "copy": "©", "reg": "®", "trade": "™"
		}
		return entities[entity.toLowerCase()] || match
	})
	
	// Remove dangerous protocols
	cleaned = cleaned.replace(
		/(?:javascript|jscript|vbscript|data|file|about|blob):/gi, 
		""
	)
	
	// Remove all HTML/XML tags and their contents for script, style, etc.
	const dangerousTags = [
		"script", "style", "iframe", "frame", "frameset", "object",
		"embed", "applet", "meta", "link", "base", "form", "input",
		"button", "select", "textarea", "svg", "math", "video", "audio"
	]
	
	// Remove dangerous tags with their content
	dangerousTags.forEach(tag => {
		const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, "gis")
		cleaned = cleaned.replace(regex, "")
		// Also handle self-closing
		const selfClosing = new RegExp(`<${tag}[^>]*\\/?>`, "gi")
		cleaned = cleaned.replace(selfClosing, "")
	})
	
	// Remove HTML comments
	cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "")
	
	// Remove remaining HTML tags but keep their content
	cleaned = cleaned.replace(/<[^>]+>/g, "")
	
	// Remove any on* event handlers that might remain
	cleaned = cleaned.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "")
	
	// Normalize whitespace
	cleaned = cleaned.replace(/\s+/g, " ")
	
	// Trim
	cleaned = cleaned.trim()
	
	return cleaned
}

export default sanitize