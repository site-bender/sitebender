import FilteredAllowText from "../../../../constructors/FilteredAllowText"
import filterAttribute from "../../../../guards/filterAttribute"
import isMemberOf from "../../../../guards/isMemberOf"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import generateShortId from "../../../../utilities/generateShortId"
import { HEADING_ROLES } from "../../../constants"

export const filterAttributes = attributes => {
	const globals = pickGlobalAttributes(attributes)
	const { role } = attributes || {}

	return {
		id: generateShortId(),
		...globals,
		...filterAttribute(isMemberOf(HEADING_ROLES))("role")(role),
	}
}

const Hn = FilteredAllowText("Hn")(filterAttributes)

export default Hn
