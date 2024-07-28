import FilteredEmpty from "../../../../constructors/FilteredEmpty"
import filterAttribute from "../../../../guards/filterAttribute"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { charset, content, httpEquiv, media, name, ...attrs } =
		attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("charset")(charset),
		...filterAttribute(isString)("content")(content),
		...filterAttribute(isString)("httpEquiv")(httpEquiv),
		...filterAttribute(isString)("media")(media),
		...filterAttribute(isString)("name")(name),
	}
}

const Meta = FilteredEmpty("Meta")(filterAttributes)

export default Meta
