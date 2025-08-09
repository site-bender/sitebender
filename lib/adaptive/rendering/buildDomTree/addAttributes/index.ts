const addAttributes = (elem) => (attributes = {}) =>
	Object.entries(attributes).forEach(([attr, value]) =>
		typeof value === "boolean"
			? value && elem.setAttribute(attr, "")
			: elem.setAttribute(attr, `${value}`)
	)

export default addAttributes
