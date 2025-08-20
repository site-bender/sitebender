import type {
	GlobalAttributes,
	Value,
} from "../../../../../../../types/index.ts"

import filterAttribute from "../../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../../guards/isBoolean/index.ts"
import isString from "../../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for checked input types (checkbox, radio)
 * Validates common checked input attributes
 */
const filterCheckedAttributes = (attributes: Record<string, Value>) => {
	const { checked, form, name, required, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("checked")(checked),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isString)("value")(value),
	}
}

export default filterCheckedAttributes
