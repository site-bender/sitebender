import type { InputFileAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import type { Record } from "../index.ts"

export default function filterAttributes(attributes: Record<string, Value>) {

	const {
		accept,
		autofocus,
		disabled,
		form,
		multiple,
		name,
		required,
		...attrs
	} = attributes as unknown as InputFileAttributes
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
