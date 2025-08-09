import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import { FOOTER_ROLES } from "../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Footer element
 * Allows global attributes and validates role attribute against FOOTER_ROLES
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)
	const roleFilter = filterAttribute(isMemberOf(FOOTER_ROLES))("role")(role)

	return {
		...globals,
		...roleFilter,
	}
}

/**
 * Creates a Footer element configuration object
 *
 * @example
 * ```typescript
 * const footer = Footer({ id: "site-footer", role: "group" })([
 *   TextNode("Site Footer")
 * ])
 * ```
 */
export const Footer = Filtered("Footer")(filterAttributes)

export default Footer
