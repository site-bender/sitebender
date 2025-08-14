const getFromSelect = (
	select: HTMLSelectElement | null | undefined,
): string => select?.value ?? ""

export default getFromSelect
