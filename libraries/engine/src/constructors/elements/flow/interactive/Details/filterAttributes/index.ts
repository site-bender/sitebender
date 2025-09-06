import type { DetailsAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import { DETAILS_ROLES } from "@sitebender/engine/constructors/elements/constants/aria-roles.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

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
