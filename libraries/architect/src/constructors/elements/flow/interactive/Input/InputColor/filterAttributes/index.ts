import type { InputColorAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import { AUTOCOMPLETES } from "@sitebender/architect/constructors/elements/constants/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: InputColorAttributes) {
	const {
		autocomplete,
		autofocus,
		disabled,
		form,
		list,
		name,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(
			autocomplete,
		),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}
}
