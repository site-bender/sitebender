import type { InputColorAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"

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
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}

}
