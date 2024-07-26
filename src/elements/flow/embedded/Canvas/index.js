import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isInteger from "../../../../guards/isInteger"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { height, width, ...attrs } = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isInteger)("width")(width),
	}
}

const Canvas = Filtered("Canvas")(filterAttributes)

export default Canvas
