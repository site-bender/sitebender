type SelectorSource = {
	form?: string
	id?: string
	name?: string
	selector?: string
	tag?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
