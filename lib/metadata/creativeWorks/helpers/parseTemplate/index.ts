const TEMPLATE_FUNCTIONS = {
	italics: (text: string) => (text ? `<i>${text}</i>` : ""),
	quotes: (text: string) => (text ? `"${text}"` : ""),
	bold: (text: string) => (text ? `<b>${text}</b>` : ""),

	linkISBN: (isbn: string) =>
		isbn ? `<a href="https://worldcat.org/isbn/${isbn}">${isbn}</a>` : "",
	linkDOI: (
		doi: string,
	) => (doi ? `<a href="https://doi.org/${doi}">${doi}</a>` : ""),
	linkURL: (url: string, text?: string) =>
		url ? `<a href="${url}">${text || url}</a>` : "",

	lastFirst: (name: string) => {
		if (!name) return ""
		const parts = name.split(" ")
		const last = parts.pop()
		const first = parts.join(" ")
		return `${last}, ${first}`
	},

	shortDate: (
		date: string,
	) => (date ? new Date(date).getFullYear().toString() : ""),
	fullDate: (date: string) => (date ? new Date(date).toLocaleDateString() : ""),

	caps: (text: string) => (text ? text.toUpperCase() : ""),
	lower: (text: string) => (text ? text.toLowerCase() : ""),
	title: (text: string) =>
		text
			? text.replace(
				/\w\S*/g,
				(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
			)
			: "",
} as const

export default function parseTemplate(
	template: string,
	data: Record<string, any>,
): string {
	if (!template) return ""

	return template.replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
		const trimmedExpression = expression.trim()

		// Handle function calls: linkISBN(isbn)
		const functionMatch = trimmedExpression.match(/(\w+)\(([^)]+)\)/)
		if (functionMatch) {
			const [, funcName, param] = functionMatch
			const func =
				TEMPLATE_FUNCTIONS[funcName as keyof typeof TEMPLATE_FUNCTIONS]
			const value = data[param]
			if (func && value != null) {
				const result = func(value)
				return result
			}
			return ""
		}

		// Handle simple variables: title, author
		const value = data[trimmedExpression]
		return value != null ? String(value) : ""
	})
}
