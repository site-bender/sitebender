import type { InputRangeAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import { AUTOCOMPLETES } from "@sitebender/engine/constructors/elements/constants/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import isNumber from "@sitebender/engine/guards/isNumber/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: InputRangeAttributes) {

	const {
		autocomplete,
		autofocus,
		disabled,
		form,
		list,
		max,
		min,
		name,
		step,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isNumber)("max")(max),
		...filterAttribute(isNumber)("min")(min),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isNumber)("step")(step),
		...filterAttribute(isString)("value")(value),
	}

}
