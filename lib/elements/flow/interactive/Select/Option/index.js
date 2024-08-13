import filterAttribute from "../../../../../guards/filterAttribute"
import isBoolean from "../../../../../guards/isBoolean"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"
import TextNode from "../../../../TextNode"

export const filterAttributes = attributes => {
	const { disabled, label, selected, value, ...attrs } = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("label")(label),
		...filterAttribute(isBoolean)("selected")(selected),
		...filterAttribute(isString)("value")(value),
	}
}

const Option =
	(attributes = {}) =>
	label => {
		const { dataset, display, ...attrs } = attributes
		const { id, ...attribs } = filterAttributes(attrs)
		// This is why not using Filtered
		const kids = isString(label) ? [TextNode(label)] : undefined

		return {
			attributes: {
				...(id ? { id } : {}),
				...attribs,
			},
			children: kids,
			dataset,
			display,
			tag: "Option",
		}
	}

export default Option
