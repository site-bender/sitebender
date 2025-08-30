const addDataAttributes = (elem: HTMLElement) => (dataset: Record<string, unknown> = {}) => {
	Object.entries(dataset).forEach(([attr, value]) =>
		typeof value === "boolean"
			? value && elem.setAttribute(`data-${attr}`, "")
			: elem.setAttribute(`data-${attr}`, `${value}`)
	)
}

export default addDataAttributes
