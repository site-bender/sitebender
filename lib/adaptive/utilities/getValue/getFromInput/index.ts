const getFromInput = (input: HTMLInputElement | null | undefined): string =>
	input?.value ?? ""

export default getFromInput
