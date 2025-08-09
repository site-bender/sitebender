const getSelector = (source) => {
	const { form, id, name, selector, tag = "" } = source || {}

	const formId = form ? `#${form} ` : ""

	if (selector) {
		return selector
	}

	if (id) {
		return `#${id}`
	}

	if (name) {
		return `${formId}${tag.toLocaleLowerCase()}[name=${name}]`
	}

	return `${formId}${tag.toLocaleLowerCase()}`
}

export default getSelector
