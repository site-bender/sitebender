import type { TableDataCellAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import type { TableDataCellAttributes } from "../index.ts"

export default function filterAttributes(attributes: TableDataCellAttributes) {

	const { id, colSpan, headers, rowSpan, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("colSpan")(colSpan),
		...filterAttribute(isString)("headers")(headers),
		...filterAttribute(isInteger)("rowSpan")(rowSpan),
		...filterAttribute(isMemberOf(TD_ROLES))("role")(role),
	}

}
