import type { Value } from "@sitebender/architect-types/index.ts"
import type { OptionAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: OptionAttributes) {
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
