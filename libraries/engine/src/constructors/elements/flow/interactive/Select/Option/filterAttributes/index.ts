import type { OptionAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import type { Record } from "../index.ts"

export default function filterAttributes(attributes: Record<string, Value>,) {

	const { disabled, label, selected, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	const out: Record<string, Value> = {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled as Value),
		...filterAttribute(isString)("label")(label as Value),
		...filterAttribute(isBoolean)("selected")(selected as Value),
		...filterAttribute(isString)("value")(value as Value),
	}

	return out

}
