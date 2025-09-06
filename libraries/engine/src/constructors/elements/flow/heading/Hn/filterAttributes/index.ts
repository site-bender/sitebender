import type { Value } from "@sitebender/engine-types/index.ts"

import { HEADING_ROLES } from "../../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: Record<string, unknown>) {
	const { id, role, ...otherAttributes } = attributes as Record<string, Value>
	const globals = pickGlobalAttributes(otherAttributes)
	const roleFilter = filterAttribute(isMemberOf(HEADING_ROLES))("role")(
		role as Value,
	)

	return {
		...getId(id as Value),
		...globals,
		...roleFilter,
	}
}
