import isNullish from "../../validation/isNullish/index.ts"

/**
 * Sanitizes strings for safe use in HTML/URLs
 *
 * Aggressively cleans strings to prevent XSS attacks and injection vulnerabilities.
 * Unlike escape which preserves content with HTML entities, sanitize removes
 * potentially dangerous content entirely. Strips HTML tags, JavaScript protocols,
 * dangerous attributes, and normalizes whitespace. Use this for untrusted user
 * input that needs to be displayed as plain text.
 *
 * @pure
 * @immutable
 * @safe
 * @param input - String to sanitize
 * @returns Sanitized string safe for HTML/URL contexts
 * @example
 * ```typescript
 * // Remove HTML tags completely
 * sanitize("<script>alert('XSS')</script>Hello")  // "Hello"
 *
 * // Remove all HTML formatting
 * sanitize("<b>Bold</b> and <i>italic</i> text")  // "Bold and italic text"
 *
 * // Remove dangerous protocols
 * sanitize("javascript:alert('XSS')")             // ""
 *
 * // Clean up URLs
 * sanitize("https://example.com/page")            // "https://example.com/page"
 *
 * // Remove event handlers
 * sanitize("Click me <span onclick='alert(1)'>here</span>")  // "Click me here"
 *
 * // Strip comments
 * sanitize("<!-- Hidden comment -->Visible text")  // "Visible text"
 *
 * // Normalize whitespace
 * sanitize("Too    many\n\n\nspaces")             // "Too many spaces"
 *
 * // Plain text preserved
 * sanitize("Hello World! This is safe text.")     // "Hello World! This is safe text."
 * ```
 */
const sanitize = (
	input: string | null | undefined,
): string => {
	if (isNullish(input) || typeof input !== "string") {
		return ""
	}

	// Remove null bytes
	let cleaned = input.replace(/\x00/g, "")

	// Handle CSS expressions and javascript: in styles BEFORE general protocol removal
	cleaned = cleaned.replace(
		/style\s*=\s*["']([^"']*?)(?:javascript|expression)([^"']*?)["']/gi,
		(match, before, after) => {
			// For "background:url(javascript:alert(1))" we want "background:url"
			// Remove trailing opening parenthesis if present
			const cleanBefore = before.replace(/\(\s*$/, "")
			return `style="${cleanBefore}"`
		},
	)

	// Then remove dangerous protocols (but not within already-cleaned styles)
	cleaned = cleaned.replace(
		/(?:javascript|jscript|vbscript|data|file|about|blob):[^\s]*/gi,
		"",
	)

	// Remove all HTML/XML tags and their contents for script, style, etc.
	const dangerousTags = [
		"script",
		"style",
		"iframe",
		"frame",
		"frameset",
		"object",
		"embed",
		"applet",
		"meta",
		"link",
		"base",
		"form",
		"input",
		"button",
		"select",
		"textarea",
		"svg",
		"math",
		"video",
		"audio",
	]

	// Remove dangerous tags with their content
	dangerousTags.forEach((tag) => {
		const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, "gis")
		cleaned = cleaned.replace(regex, "")
		// Also handle self-closing
		const selfClosing = new RegExp(`<${tag}[^>]*\\/?>`, "gi")
		cleaned = cleaned.replace(selfClosing, "")
	})

	// Remove HTML comments
	cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "")

	// Now decode HTML entities and check for dangerous content AFTER decoding
	// First decode to catch encoded dangerous tags
	let decoded = cleaned.replace(/&#x?([0-9a-f]+);/gi, (match, num) => {
		const code = num.startsWith("x") || num.match(/[a-f]/i)
			? parseInt(num, 16)
			: parseInt(num, 10)
		return String.fromCharCode(code)
	})
	decoded = decoded.replace(/&([a-z]+);/gi, (match, entity) => {
		const entities: Record<string, string> = {
			"lt": "<",
			"gt": ">",
			"amp": "&",
			"quot": '"',
			"apos": "'",
			"nbsp": " ",
			"copy": "©",
			"reg": "®",
			"trade": "™",
			"mdash": "—",
			"ndash": "–",
			"hellip": "…",
		}
		return entities[entity.toLowerCase()] || match
	})

	// After decoding, remove any dangerous tags that were encoded
	dangerousTags.forEach((tag) => {
		const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, "gis")
		decoded = decoded.replace(regex, "")
		// Also handle self-closing
		const selfClosing = new RegExp(`<${tag}[^>]*\\/?>`, "gi")
		decoded = decoded.replace(selfClosing, "")
	})

	// Remove remaining HTML tags but keep their content
	cleaned = decoded.replace(/<[^>]+>/g, "")

	// Remove any on* event handlers that might remain
	cleaned = cleaned.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "")

	// Normalize whitespace
	cleaned = cleaned.replace(/\s+/g, " ")

	// Trim
	cleaned = cleaned.trim()

	return cleaned
}

export default sanitize
