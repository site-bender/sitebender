import filterAttribute from "../../../guards/filterAttribute"
import isString from "../../../guards/isString"
import pickGlobalAttributes from "../../../guards/pickGlobalAttributes"
import generateShortId from "../../../utilities/generateShortId"

export const filterAttributes = attributes => {
	const { href, target, ...attrs } = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("href")(href),
		...filterAttribute(isString)("target")(target),
	}
}

const Base = (attributes = {}) => {
	const { dataset, ...attrs } = attributes
	const { id = generateShortId(), ...attribs } = filterAttributes(attrs)

	return {
		attributes: {
			id,
			...attribs,
		},
		dataset,
		tag: "Base",
	}
}

export default Base
