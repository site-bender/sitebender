const getFromDataset = (element: HTMLElement | null | undefined): string =>
	element?.dataset?.value ?? ""

export default getFromDataset
