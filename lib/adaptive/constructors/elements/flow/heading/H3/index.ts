import FilteredAllowText from "../../../../../constructors/abstracted/FilteredAllowText/index.ts"
import { HEADING_ROLES } from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for H3 element
 * Allows global attributes and validates role attribute against HEADING_ROLES
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)
	const roleFilter = filterAttribute(isMemberOf(HEADING_ROLES))("role")(role)

	return {
		...getId(id),
		...globals,
		...roleFilter,
	}
}

/**
 * Creates an H3 element configuration object
 */
export const H3 = FilteredAllowText("H3")(filterAttributes)

export default H3
