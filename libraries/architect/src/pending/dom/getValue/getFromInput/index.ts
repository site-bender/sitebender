const getFromInput = (
	input: HTMLInputElement | Element | null | undefined,
): string => {
	// For deno-dom compatibility, try getAttribute first
	if (input && "getAttribute" in input) {
		return (input as Element).getAttribute("value") || ""
	}
	// Fallback to .value for real DOM with safe cast
	const el = input as unknown as HTMLInputElement | null | undefined
	return el?.value ?? ""
}

export default getFromInput
