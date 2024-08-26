import FilteredEmpty from "../../../../constructors/FilteredEmpty"
import filterAttribute from "../../../../guards/filterAttribute"
import isInteger from "../../../../guards/isInteger"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { height, src, type, width, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("type")(type),
		...filterAttribute(isInteger)("width")(width),
	}
}

const Embed = FilteredEmpty("Embed")(filterAttributes)

export default Embed
