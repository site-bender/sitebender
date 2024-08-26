import FilteredEmpty from "../../../../../constructors/FilteredEmpty"
import filterAttribute from "../../../../../guards/filterAttribute"
import isInteger from "../../../../../guards/isInteger"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { span, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isInteger)("span")(span),
	}
}

const Col = FilteredEmpty("Col")(filterAttributes)

export default Col
