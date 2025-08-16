import type {
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../../../../../types/index.ts"

import { AUTOCOMPLETES } from "../../../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../../../guards/isMemberOf/index.ts"
import isNumber from "../../../../../../../guards/isNumber/index.ts"
import isString from "../../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for date/time input types
 * Validates common date/time input attributes
 */
const filterDateTimeAttributes = (attributes: Record<string, Value>) => {
	const {
		autocomplete,
		form,
		list,
		max,
		min,
		name,
		readonly,
		required,
		step,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isString)("max")(max),
		...filterAttribute(isString)("min")(min),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("readonly")(readonly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isNumber)("step")(step),
		...filterAttribute(isString)("value")(value),
	}
}

export default filterDateTimeAttributes
