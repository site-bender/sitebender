import isUndefined from "../isUndefined"

const getAriaAttributes = aria => {
	if (isUndefined(aria)) {
		return {}
	}

	return Object.entries(aria).reduce(
		(out, [key, value]) => ({
			...out,
			[`aria-${key}`]: value,
		}),
		{},
	)
}

export default getAriaAttributes
