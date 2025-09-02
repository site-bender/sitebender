const addAttributes =
	(elem: HTMLElement) => (attributes: Record<string, unknown> = {}) =>
		Object.entries(attributes).forEach(([attr, value]) =>
			typeof value === "boolean"
				? value && elem.setAttribute(attr, "")
				: elem.setAttribute(attr, `${value}`)
		)

export default addAttributes
