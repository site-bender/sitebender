import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
	const quotes = isNullish(quoteChar) || typeof quoteChar !== "string" ||
			quoteChar === ""
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
