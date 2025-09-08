import { TD_ROLES } from "@sitebender/engine/constructors/elements/constants/aria-roles.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isInteger from "@sitebender/engine/guards/isInteger/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

import type { TdElementAttributes as TableDataCellAttributes } from "../index.ts"

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
