import type { InputHiddenAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"

export default function filterAttributes(attributes: InputHiddenAttributes) {

	const { form, name, value, ...attrs } =
		attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}

}
