import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isMemberOf from "../../../../guards/isMemberOf"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import { FOOTER_ROLES } from "../../../constants"

export const filterAttributes = attributes => {
	const globals = pickGlobalAttributes(attributes)
	const { role } = attributes

	return {
		...globals,
		...filterAttribute(isMemberOf(FOOTER_ROLES))("role")(role),
	}
}

const Footer = Filtered("Footer")(filterAttributes)

export default Footer
