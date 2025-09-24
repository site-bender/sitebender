import type { Value } from "@sitebender/architect-types/index.ts"

import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for checked input types (checkbox, radio)
 * Validates common checked input attributes
 */
const filterCheckedAttributes = (
	attributes: Record<string, Value>,
): Record<string, Value> => {
	const { checked, form, name, required, value, ...attrs } = attributes
	const out: Record<string, unknown> = {}
	Object.assign(out, pickGlobalAttributes(attrs))
	Object.assign(out, filterAttribute(isBoolean)("checked")(checked))
	Object.assign(out, filterAttribute(isString)("form")(form))
	Object.assign(out, filterAttribute(isString)("name")(name))
	Object.assign(out, filterAttribute(isBoolean)("required")(required))
	Object.assign(out, filterAttribute(isString)("value")(value))
	return out as Record<string, Value>
}

export default filterCheckedAttributes
