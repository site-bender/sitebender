import type { InputHiddenAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import type { Record } from "../index.ts"

export default function filterAttributes(attributes: Record<string, Value>) {

	const { form, name, value, ...attrs } =
		attributes as unknown as InputHiddenAttributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}

}
