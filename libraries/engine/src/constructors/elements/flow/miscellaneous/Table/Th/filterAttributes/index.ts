import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import { SCOPES } from "@engineSrc/constructors/elements/constants/index.ts"
import { TH_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import type { ThElementAttributes as TableHeaderCellAttributes } from "../index.ts"

export default function filterAttributes(attributes: TableHeaderCellAttributes) {

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
