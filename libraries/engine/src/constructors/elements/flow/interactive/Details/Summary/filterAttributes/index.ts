import type { SummaryAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import { SUMMARY_ROLES } from "@sitebender/engine/constructors/elements/constants/aria-roles.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: SummaryAttributes) {

	const { id, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isMemberOf(SUMMARY_ROLES))("role")(role),
	}

}
