import type { InputRangeAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isNumber from "@engineSrc/guards/isNumber/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"

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
