import type { TimeAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: TimeAttributes) {

	const { id, dateTime, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("dateTime")(dateTime),
	}

}
