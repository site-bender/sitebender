const getFromDataset = (
	element: HTMLElement | Element | null | undefined,
): string => {
	if (!element) return ""

	// For real DOM
	if ("dataset" in element && (element as HTMLElement).dataset) {
		return (element as HTMLElement).dataset.value || ""
	}

	// For deno-dom - use getAttribute
	return (element as Element).getAttribute("data-value") || ""
}

export default getFromDataset
