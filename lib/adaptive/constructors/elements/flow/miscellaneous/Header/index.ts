import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import { HEADER_ROLES } from "../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Header element
 * Allows global attributes and validates role attribute against HEADER_ROLES
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)
	const roleFilter = filterAttribute(isMemberOf(HEADER_ROLES))("role")(role)

	return {
		...globals,
		...roleFilter,
	}
}

/**
 * Creates a Header element configuration object
 *
 * @example
 * ```typescript
 * const header = Header({ id: "site-header", role: "group" })([
 *   TextNode("Site Header")
 * ])
 * ```
 */
export const Header = Filtered("Header")(filterAttributes)

export default Header
