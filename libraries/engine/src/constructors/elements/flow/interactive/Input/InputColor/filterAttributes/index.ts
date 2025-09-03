import type { InputColorAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import type { InputColorAttributes } from "../index.ts"

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
