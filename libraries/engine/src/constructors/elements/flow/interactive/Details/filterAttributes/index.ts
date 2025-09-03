import type { DetailsAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"

import { DETAILS_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import getAriaAttributes from "@engineSrc/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "@engineSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

import type {
import type { DetailsAttributes } from "../index.ts"

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
