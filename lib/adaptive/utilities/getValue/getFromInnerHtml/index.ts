const getFromInnerHtml = (element: Element | null | undefined): string =>
	element?.innerHTML.trim() ?? ""

export default getFromInnerHtml
