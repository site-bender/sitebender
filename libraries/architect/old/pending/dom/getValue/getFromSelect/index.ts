const getFromSelect = (
	select: HTMLSelectElement | Element | null | undefined,
): string => {
	if (!select) return ""

	// For real DOM
	if ("value" in select) {
		return (select as HTMLSelectElement).value || ""
	}

	// For deno-dom - find selected option
	const selectedOption = select.querySelector("option[selected]")
	if (selectedOption) {
		return selectedOption.getAttribute("value") || ""
	}

	// Default to first option if none selected
	const firstOption = select.querySelector("option")
	return firstOption?.getAttribute("value") || ""
}

export default getFromSelect
