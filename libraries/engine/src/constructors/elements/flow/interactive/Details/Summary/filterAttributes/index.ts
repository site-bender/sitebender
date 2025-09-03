import type { SummaryAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { SummaryAttributes } from "../index.ts"

export default function filterAttributes(attributes: SummaryAttributes) {

	const { id, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isMemberOf(SUMMARY_ROLES))("role")(role),
	}

}
