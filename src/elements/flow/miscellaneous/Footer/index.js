import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isMemberOf from "../../../../guards/isMemberOf"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const FOOTER_ROLES = ["group", "presentation", "none"]

export const filterAttributes = attributes => {
	const globals = pickGlobalAttributes(attributes)
	const { role } = attributes || {}

	return {
		...globals,
		...filterAttribute(isMemberOf(FOOTER_ROLES))("role")(role),
	}
}

const Footer = Filtered("Footer")(filterAttributes)

export default Footer
