import type { Value } from "@engineTypes/index.ts"

import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isNumber from "@engineSrc/guards/isNumber/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for date/time input types
 * Validates common date/time input attributes
 */
const filterDateTimeAttributes = (
	attributes: Record<string, Value>,
): Record<string, Value> => {
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
	const filteredAttrs: Record<string, unknown> = {}
	Object.assign(filteredAttrs, pickGlobalAttributes(attrs))
	Object.assign(
		filteredAttrs,
		filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
	)
	Object.assign(filteredAttrs, filterAttribute(isString)("form")(form))
	Object.assign(filteredAttrs, filterAttribute(isString)("list")(list))
	Object.assign(filteredAttrs, filterAttribute(isString)("max")(max))
	Object.assign(filteredAttrs, filterAttribute(isString)("min")(min))
	Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	Object.assign(filteredAttrs, filterAttribute(isBoolean)("readonly")(readonly))
	Object.assign(filteredAttrs, filterAttribute(isBoolean)("required")(required))
	Object.assign(filteredAttrs, filterAttribute(isNumber)("step")(step))
	Object.assign(filteredAttrs, filterAttribute(isString)("value")(value))
	return filteredAttrs as Record<string, Value>
}

export default filterDateTimeAttributes
