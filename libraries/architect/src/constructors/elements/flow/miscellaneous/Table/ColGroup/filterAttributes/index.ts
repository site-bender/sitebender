import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isInteger from "@sitebender/architect/guards/isInteger/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

import type { ColGroupElementAttributes as TableColumnGroupAttributes } from "../index.ts"

export default function filterAttributes(
	attributes: TableColumnGroupAttributes,
) {
	const { id, span, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("span")(span),
	}
}
