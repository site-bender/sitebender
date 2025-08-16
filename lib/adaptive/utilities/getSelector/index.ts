type SelectorSource = {
	form?: string
	id?: string
	name?: string
	selector?: string
	tag?: string
}

/**
 * Generates a CSS selector from various source properties
 * 
 * @param source - Object containing selector information
 * @returns CSS selector string
 * @example
 * ```typescript
 * getSelector({ id: "myId" }) // "#myId"
 * getSelector({ name: "fieldName", tag: "input" }) // "input[name=fieldName]"
 * getSelector({ selector: ".custom" }) // ".custom"
 * ```
 */
const getSelector = (source: SelectorSource): string | null => {
	if (!source) return null
	const { form, id, name, selector, tag } = source

	const formId = form ? `#${form} ` : ""

	if (selector) {
		return selector
	}

	if (id) {
		return `#${id}`
	}

	if (name) {
		const tagPart = tag ? tag.toLocaleLowerCase() : ""
		return `${formId}${tagPart}[name=${name}]`
	}

	if (tag) {
		return `${formId}${tag.toLocaleLowerCase()}`
	}
	
	return null
}

export default getSelector
