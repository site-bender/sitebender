import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const sanitize = (
	input: string | null | undefined,
): string => {
	if (isNullish(input) || typeof input !== "string") {
		return ""
	}

	// Remove null bytes without regex (avoid control-regex lint)
	let cleaned = input.split("\u0000").join("")

	// Handle CSS expressions and javascript: in styles BEFORE general protocol removal
	cleaned = cleaned.replace(
		/style\s*=\s*["']([^"']*?)(?:javascript|expression)([^"']*?)["']/gi,
		(_match, before, _after) => {
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
	let decoded = cleaned.replace(/&#x?([0-9a-f]+);/gi, (_match, num) => {
		const code = num.startsWith("x") || num.match(/[a-f]/i)
			? parseInt(num, 16)
			: parseInt(num, 10)
		return String.fromCharCode(code)
	})
	decoded = decoded.replace(/&([a-z]+);/gi, (_match, entity) => {
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
		return entities[entity.toLowerCase()] || _match
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
