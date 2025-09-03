import type { OptionGroupAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { Value } from "@engineTypes/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"

export default function filterAttributes(attributes: OptionGroupAttributes) {

	const { disabled, label, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	const out: Record<string, Value> = {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled as Value),
		...filterAttribute(isString)("label")(label as Value),
	}

	return out

}
