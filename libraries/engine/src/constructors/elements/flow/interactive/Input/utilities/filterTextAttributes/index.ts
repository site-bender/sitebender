import type { Value } from "@engineTypes/index.ts"

import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for text-based input types
 * Validates common text input attributes
 */
export const filterTextAttributes = (
	attributes: Record<string, Value>,
): Record<string, Value> => {
	const {
		autocomplete,
		dirname,
		form,
		list,
		maxlength,
		minlength,
		name,
		pattern,
		placeholder,
		readonly,
		required,
		size,
		value,
		...attrs
	} = attributes
	const filteredAttrs: Record<string, unknown> = {}
	Object.assign(filteredAttrs, pickGlobalAttributes(attrs))
	Object.assign(
		filteredAttrs,
		filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
	)
	Object.assign(filteredAttrs, filterAttribute(isString)("dirname")(dirname))
	Object.assign(filteredAttrs, filterAttribute(isString)("form")(form))
	Object.assign(filteredAttrs, filterAttribute(isString)("list")(list))
	Object.assign(
		filteredAttrs,
		filterAttribute(isInteger)("maxlength")(maxlength),
	)
	Object.assign(
		filteredAttrs,
		filterAttribute(isInteger)("minlength")(minlength),
	)
	Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	Object.assign(filteredAttrs, filterAttribute(isString)("pattern")(pattern))
	Object.assign(
		filteredAttrs,
		filterAttribute(isString)("placeholder")(placeholder),
	)
	Object.assign(filteredAttrs, filterAttribute(isBoolean)("readonly")(readonly))
	Object.assign(filteredAttrs, filterAttribute(isBoolean)("required")(required))
	Object.assign(filteredAttrs, filterAttribute(isInteger)("size")(size))
	Object.assign(filteredAttrs, filterAttribute(isString)("value")(value))
	return filteredAttrs as Record<string, Value>
}

export default filterTextAttributes
