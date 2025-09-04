import type { Value } from "@sitebender/engine-types/index.ts"

import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

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
