// Helper function to filter out JSX-specific attributes that should not appear in HTML
function shouldIncludeAttribute(key: string): boolean {
	const jsxOnlyAttributes = new Set([
		"key",
		"ref",
		"dangerouslySetInnerHTML",
	])
	return !jsxOnlyAttributes.has(key)
}

// Convert JSX attribute names to HTML attribute names
function toHtmlAttributeName(jsxAttr: string): string {
	// Common JSX to HTML attribute mappings
	const attributeMap: Record<string, string> = {
		charSet: "charset",
		className: "class",
		htmlFor: "for",
		maxLength: "maxlength",
		minLength: "minlength",
		tabIndex: "tabindex",
		useMap: "usemap",
		autoComplete: "autocomplete",
		autoFocus: "autofocus",
		autoPlay: "autoplay",
		contentEditable: "contenteditable",
		crossOrigin: "crossorigin",
		dateTime: "datetime",
		encType: "enctype",
		formAction: "formaction",
		formEncType: "formenctype",
		formMethod: "formmethod",
		formNoValidate: "formnovalidate",
		formTarget: "formtarget",
		frameBorder: "frameborder",
		marginHeight: "marginheight",
		marginWidth: "marginwidth",
		mediaGroup: "mediagroup",
		noValidate: "novalidate",
		radioGroup: "radiogroup",
		readOnly: "readonly",
		rowSpan: "rowspan",
		spellCheck: "spellcheck",
		srcDoc: "srcdoc",
		srcLang: "srclang",
		srcSet: "srcset",
	}

	// Return mapped name if it exists, otherwise convert camelCase to kebab-case
	if (attributeMap[jsxAttr]) {
		return attributeMap[jsxAttr]
	}

	// Convert camelCase to kebab-case for other attributes
	return jsxAttr.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
}

// Simple JSX to HTML renderer
function renderToString(element: unknown): string {
	if (typeof element === "string" || typeof element === "number") {
		return String(element)
	}

	if (
		element === null || element === undefined || typeof element === "boolean"
	) {
		return ""
	}

	if (Array.isArray(element)) {
		return element.map(renderToString).join("")
	}

	if (typeof element === "object" && element !== null && "type" in element) {
		const jsxElement = element as {
			type: string
			props?: {
				children?: unknown
				[key: string]: unknown
			}
		}
		const { type, props } = jsxElement
		const { children, ...attributes } = props || {}

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

		if (voidElements.has(type)) {
			const attrs = Object.entries(attributes)
				.filter(([key]) => shouldIncludeAttribute(key))
				.map(([key, value]) => {
					if (!value) return ""
					const htmlAttr = toHtmlAttributeName(key)
					return ` ${htmlAttr}="${String(value)}"`
				})
				.join("")
			return `<${type}${attrs}>`
		}

		const attrs = Object.entries(attributes)
			.filter(([key]) => shouldIncludeAttribute(key))
			.map(([key, value]) => {
				if (!value) return ""
				const htmlAttr = toHtmlAttributeName(key)
				return ` ${htmlAttr}="${String(value)}"`
			})
			.join("")

		const childrenHtml = children ? renderToString(children) : ""

		return `<${type}${attrs}>${childrenHtml}</${type}>`
	}

	return String(element)
}

export default renderToString
