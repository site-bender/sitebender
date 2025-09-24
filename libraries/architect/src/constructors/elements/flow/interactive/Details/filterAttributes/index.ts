import type { DetailsAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import { DETAILS_ROLES } from "@sitebender/architect/constructors/elements/constants/aria-roles.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: DetailsAttributes) {
	const { id, open, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("open")(open),
		...filterAttribute(isMemberOf(DETAILS_ROLES))("role")(role),
	}
}
