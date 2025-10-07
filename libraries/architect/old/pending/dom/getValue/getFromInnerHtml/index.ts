const getFromInnerHtml = (element: Element | null | undefined): string => {
	if (!element) return ""

	// innerHTML works in both real DOM and deno-dom
	const html = element.innerHTML
	return html ? html.trim() : ""
}

export default getFromInnerHtml
