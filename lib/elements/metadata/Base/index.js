import filterAttribute from "../../../guards/filterAttribute"
import isMemberOf from "../../../guards/isMemberOf"
import isString from "../../../guards/isString"
import pickGlobalAttributes from "../../../guards/pickGlobalAttributes"
import { TARGETS } from "../../../rendering/constants"
import generateShortId from "../../../utilities/generateShortId"

export const filterAttributes = attributes => {
	const { href, target, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("href")(href),
		...filterAttribute(isMemberOf(TARGETS))("target")(target),
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
