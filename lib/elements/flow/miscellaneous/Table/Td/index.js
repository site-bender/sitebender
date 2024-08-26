import Filtered from "../../../../../constructors/Filtered"
import filterAttribute from "../../../../../guards/filterAttribute"
import isInteger from "../../../../../guards/isInteger"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"

export const filterAttributes = attributes => {
	const { colSpan, headers, rowSpan, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isInteger)("colSpan")(colSpan),
		...filterAttribute(isString)("headers")(headers),
		...filterAttribute(isInteger)("rowSpan")(rowSpan),
	}
}

const Td = Filtered("Td")(filterAttributes)

export default Td
