import type { TableColumnAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isInteger from "@sitebender/engine/guards/isInteger/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: TableColumnAttributes) {
	const { id, span, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("span")(span),
	}
}
