import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isMemberOf from "../../../../guards/isMemberOf"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"

export const HEADER_ROLES = ["group", "presentation", "none"]

export const filterAttributes = attributes => {
	const globals = pickGlobalAttributes(attributes)
	const { role } = attributes || {}

	return {
		...globals,
		...filterAttribute(isMemberOf(HEADER_ROLES))("role")(role),
	}
}

const Header = Filtered("Header")(filterAttributes)

export default Header
