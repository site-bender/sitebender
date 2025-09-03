import type { OptionGroupAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { Record } from "../index.ts"

export default function filterAttributes(attributes: Record<string, Value>,) {

	const { disabled, label, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	const out: Record<string, Value> = {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled as Value),
		...filterAttribute(isString)("label")(label as Value),
	}

	return out

}
