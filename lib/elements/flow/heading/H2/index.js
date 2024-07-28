import FilteredAllowText from "../../../../constructors/FilteredAllowText"
import filterAttribute from "../../../../guards/filterAttribute"
import isMemberOf from "../../../../guards/isMemberOf"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import generateShortId from "../../../../utilities/generateShortId"

export const HEADING_ROLES = ["tab", "presentation", "none"]

export const filterAttributes = attributes => {
	const globals = pickGlobalAttributes(attributes)
	const { role } = attributes || {}

	return {
		id: generateShortId(),
		...globals,
		...filterAttribute(isMemberOf(HEADING_ROLES))("role")(role),
	}
}

const H2 = FilteredAllowText("H2")(filterAttributes)

export default H2
