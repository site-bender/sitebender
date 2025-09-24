import type { TimeAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: TimeAttributes) {
	const { id, dateTime, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("dateTime")(dateTime),
	}
}
