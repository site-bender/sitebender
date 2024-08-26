import Filtered from "../../../../../constructors/Filtered"
import filterAttribute from "../../../../../guards/filterAttribute"
import isBoolean from "../../../../../guards/isBoolean"
import isInteger from "../../../../../guards/isInteger"
import isMemberOf from "../../../../../guards/isMemberOf"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"
import { SCOPES } from "../../../../../rendering/constants"

export const filterAttributes = attributes => {
	const { abbr, colSpan, headers, rowSpan, scope, sorted, ...attrs } =
		attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("abbr")(abbr),
		...filterAttribute(isInteger)("colSpan")(colSpan),
		...filterAttribute(isString)("headers")(headers),
		...filterAttribute(isInteger)("rowSpan")(rowSpan),
		...filterAttribute(isMemberOf(SCOPES))("scope")(scope),
		...filterAttribute(isBoolean)("sorted")(sorted),
	}
}

const Th = Filtered("Th")(filterAttributes)

export default Th
