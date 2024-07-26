import FilteredEmpty from "../../../../constructors/FilteredEmpty"
import filterAttribute from "../../../../guards/filterAttribute"
import isInteger from "../../../../guards/isInteger"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { height, media, sizes, src, srcset, type, width, ...attrs } =
		attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isString)("media")(media),
		...filterAttribute(isString)("sizes")(sizes),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("srcset")(srcset),
		...filterAttribute(isString)("type")(type),
		...filterAttribute(isInteger)("width")(width),
	}
}

const Source = FilteredEmpty("Source")(filterAttributes)

export default Source
