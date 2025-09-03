import type { SummaryAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import { SUMMARY_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"

export default function filterAttributes(attributes: SummaryAttributes) {

	const { id, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isMemberOf(SUMMARY_ROLES))("role")(role),
	}

}
