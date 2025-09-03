import type { TableHeaderCellAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import type { TableHeaderCellAttributes } from "../index.ts"

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
