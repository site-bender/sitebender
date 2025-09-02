import isNullish from "../../validation/isNullish/index.ts"

/**
 * Wraps a string in quotes
 *
 * Surrounds a string with quotation marks, with options for different quote
 * styles (single, double, backticks, or custom). Useful for generating code,
 * formatting output, creating JSON strings, or preparing strings for display.
 * Does not escape internal quotes - use with escape functions if needed.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param quoteChar - Quote character(s) to use (default: '"')
 * @param str - String to wrap in quotes
 * @returns String wrapped in quotes
 * @example
 * ```typescript
 * // Default double quotes
 * quote()("hello")       // '"hello"'
 *
 * // Single quotes
 * quote("'")("hello")    // "'hello'"
 *
 * // Custom quotes
 * quote("**")("bold")    // "**bold**"
 *
 * // Empty string
 * quote()("")            // '""'
 *
 * // Paired delimiters
 * quote("[]")("array")   // "[array]"
 * quote("()")("group")   // "(group)"
 *
 * // Partial application
 * const doubleQuote = quote('"')
 * doubleQuote("test")    // '"test"'
 *
 * // HTML attributes
 * quote('"')("container")  // '"container"'
 * ```
 */
const quote = (
	quoteChar: string | null | undefined = '"',
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		str = ""
	}

	// Default to double quotes if quoteChar is invalid
	const quotes =
		isNullish(quoteChar) || typeof quoteChar !== "string" || quoteChar === ""
			? '"'
			: quoteChar

	// For multi-character quotes, determine if they're paired
	// e.g., "[]" -> "[" and "]", "{}" -> "{" and "}"
	let openQuote = quotes
	let closeQuote = quotes

	// Handle common paired delimiters
	if (quotes.length === 2) {
		const pairs: Record<string, string> = {
			"()": "()",
			"[]": "[]",
			"{}": "{}",
			"<>": "<>",
			"«»": "«»",
			"「」": "「」",
			"\u201C\u201D": "\u201C\u201D", // "" using unicode escapes
		}

		if (pairs[quotes]) {
			openQuote = quotes[0]
			closeQuote = quotes[1]
		}
	}

	// Handle special multi-character pairs
	if (quotes === "<!---->") {
		openQuote = "<!--"
		closeQuote = "-->"
	} else if (quotes === "{{}}") {
		openQuote = "{{"
		closeQuote = "}}"
	}

	return openQuote + str + closeQuote
}

export default quote
