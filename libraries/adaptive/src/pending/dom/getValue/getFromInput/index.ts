const getFromInput = (
	input: HTMLInputElement | Element | null | undefined,
): string => {
	// For deno-dom compatibility, try getAttribute first
	if (input && "getAttribute" in input) {
		return (input as Element).getAttribute("value") || ""
	}
	// Fallback to .value for real DOM
	return (input as HTMLInputElement)?.value ?? ""
}

export default getFromInput
