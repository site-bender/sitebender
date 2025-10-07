import { TH_ROLES } from "@sitebender/architect/constructors/elements/constants/aria-roles.ts"
import { SCOPES } from "@sitebender/architect/constructors/elements/constants/index.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isInteger from "@sitebender/architect/guards/isInteger/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

import type { ThElementAttributes as TableHeaderCellAttributes } from "../index.ts"

export default function filterAttributes(
	attributes: TableHeaderCellAttributes,
) {
	const {
		id,
		abbr,
		colSpan,
		headers,
		rowSpan,
		scope,
		role,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("abbr")(abbr),
		...filterAttribute(isInteger)("colSpan")(colSpan),
		...filterAttribute(isString)("headers")(headers),
		...filterAttribute(isInteger)("rowSpan")(rowSpan),
		...filterAttribute(isMemberOf(SCOPES))("scope")(scope),
		...filterAttribute(isMemberOf(TH_ROLES))("role")(role),
	}
}
