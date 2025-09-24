import type { InputFileAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: InputFileAttributes) {
	const {
		accept,
		autofocus,
		disabled,
		form,
		multiple,
		name,
		required,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("accept")(accept),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isBoolean)("multiple")(multiple),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("required")(required),
	}
}
