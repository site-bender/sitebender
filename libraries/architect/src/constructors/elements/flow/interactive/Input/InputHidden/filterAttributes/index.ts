import type { InputHiddenAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: InputHiddenAttributes) {
	const { form, name, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}
}
