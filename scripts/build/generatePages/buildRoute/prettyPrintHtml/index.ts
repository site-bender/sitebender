//++ Pretty prints HTML with proper indentation and line breaks, handling nested elements correctly
export function prettyPrintHtml(html: string, indentSize: number = 2): string {
	const indent = " ".repeat(indentSize)

	// Void elements that don't have closing tags
	const voidElements = new Set([
		"area",
		"base",
		"br",
		"col",
		"embed",
		"hr",
		"img",
		"input",
		"link",
		"meta",
		"source",
		"track",
		"wbr",
	])

	// Elements that should prefer inline formatting when short
	const inlineElements = new Set([
		"a",
		"abbr",
		"acronym",
		"b",
		"bdi",
		"bdo",
		"big",
		"br",
		"button",
		"cite",
		"code",
		"dfn",
		"em",
		"i",
		"kbd",
		"label",
		"mark",
		"meter",
		"noscript",
		"object",
		"output",
		"progress",
		"q",
		"ruby",
		"s",
		"samp",
		"small",
		"span",
		"strong",
		"sub",
		"sup",
		"time",
		"tt",
		"u",
		"var",
		"wbr",
	])

	// Simple recursive formatter
	function formatHtml(html: string, currentIndent: number = 0): string {
		const lines: string[] = []
		let i = 0

		while (i < html.length) {
			if (html[i] === "<") {
				// Find the end of the tag
				let tagEnd = html.indexOf(">", i)
				if (tagEnd === -1) break

				const fullTag = html.slice(i, tagEnd + 1)
				const isDoctype = fullTag.startsWith("<!DOCTYPE") ||
					fullTag.startsWith("<!doctype")
				const isComment = fullTag.startsWith("<!--")
				const isClosing = fullTag.startsWith("</")

				let tagName = ""
				if (!isDoctype && !isComment) {
					const tagMatch = fullTag.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/)
					tagName = tagMatch ? tagMatch[1].toLowerCase() : ""
				}

				if (isDoctype || isComment) {
					// DOCTYPE and comments
					lines.push(indent.repeat(currentIndent) + fullTag)
				} else if (isClosing) {
					// Closing tag
					lines.push(indent.repeat(currentIndent) + fullTag)
				} else if (voidElements.has(tagName)) {
					// Void elements (self-closing)
					lines.push(indent.repeat(currentIndent) + fullTag)
				} else {
					// Opening tag - need to find matching closing tag
					const closingTag = `</${tagName}>`
					let depth = 1
					let searchPos = tagEnd + 1

					// Find matching closing tag
					while (searchPos < html.length && depth > 0) {
						const nextOpen = html.indexOf(`<${tagName}`, searchPos)
						const nextClose = html.indexOf(closingTag, searchPos)

						if (nextClose === -1) break

						if (nextOpen !== -1 && nextOpen < nextClose) {
							depth++
							searchPos = html.indexOf(">", nextOpen) + 1
						} else {
							depth--
							if (depth === 0) {
								// Found matching closing tag
								const content = html.slice(tagEnd + 1, nextClose)

								if (
									content.trim() === "" ||
									(inlineElements.has(tagName) && content.length < 50 &&
										!content.includes("<"))
								) {
									// Inline element or simple content
									lines.push(
										indent.repeat(currentIndent) + fullTag + content +
											closingTag,
									)
								} else {
									// Block element with content
									lines.push(indent.repeat(currentIndent) + fullTag)
									if (content.trim()) {
										if (content.includes("<")) {
											// Has nested HTML
											const formattedContent = formatHtml(
												content,
												currentIndent + 1,
											)
											lines.push(formattedContent)
										} else {
											// Plain text content
											lines.push(
												indent.repeat(currentIndent + 1) + content.trim(),
											)
										}
									}
									lines.push(indent.repeat(currentIndent) + closingTag)
								}

								i = html.indexOf(">", nextClose) + 1
								break
							} else {
								searchPos = nextClose + closingTag.length
							}
						}
					}

					if (depth > 0) {
						// No matching closing tag found
						lines.push(indent.repeat(currentIndent) + fullTag)
						i = tagEnd + 1
					}
				}

				if (i <= tagEnd) {
					i = tagEnd + 1
				}
			} else {
				// Text content - find next tag
				let textEnd = html.indexOf("<", i)
				if (textEnd === -1) textEnd = html.length

				const text = html.slice(i, textEnd).trim()
				if (text) {
					lines.push(indent.repeat(currentIndent) + text)
				}

				i = textEnd
			}
		}

		return lines.join("\n")
	}

	return formatHtml(html)
}

export default prettyPrintHtml
