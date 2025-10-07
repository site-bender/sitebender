import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

import type { LabelElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: LabelElementAttributes) {
	const { id, for: forAttr, form, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("for")(forAttr),
		...filterAttribute(isString)("form")(form),
	}
}
