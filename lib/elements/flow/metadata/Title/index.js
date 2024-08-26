import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import TextNode from "../../../TextNode"

const Title =
	(attributes = {}) =>
	content => {
		const { dataset, ...attrs } = attributes
		const attribs = pickGlobalAttributes(attrs)
		const children = typeof content === "string" ? [TextNode(content)] : []

		return {
			attributes: attribs,
			children,
			dataset,
			tag: "Title",
		}
	}

export default Title
