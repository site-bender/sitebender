import type { SummaryAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import { SUMMARY_ROLES } from "@sitebender/architect/constructors/elements/constants/aria-roles.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: SummaryAttributes) {
	const { id, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isMemberOf(SUMMARY_ROLES))("role")(role),
	}
}
