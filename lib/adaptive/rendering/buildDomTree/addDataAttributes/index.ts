const addDataAttributes = (elem) => (dataset = {}) => {
	Object.entries(dataset).forEach(([attr, value]) =>
		typeof value === "boolean"
			? value && elem.setAttribute(`data-${attr}`, "")
			: elem.setAttribute(`data-${attr}`, `${value}`)
	)
}

export default addDataAttributes
