const getFromTextArea = (
	textarea: HTMLTextAreaElement | Element | null | undefined,
): string => {
	if (!textarea) return ""
	
	// For real DOM
	if ('value' in textarea) {
		return (textarea as HTMLTextAreaElement).value || ""
	}
	
	// For deno-dom - get text content
	return (textarea as Element).textContent || ""
}

export default getFromTextArea
