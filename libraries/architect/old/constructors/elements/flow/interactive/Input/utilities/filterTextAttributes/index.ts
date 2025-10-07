import type { Value } from "@sitebender/architect-types/index.ts"

import { AUTOCOMPLETES } from "@sitebender/architect/constructors/elements/constants/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isInteger from "@sitebender/architect/guards/isInteger/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
		filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(
			autocomplete,
		),
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
	Object.assign(
		filteredAttrs,
		filterAttribute(isBoolean)("readonly")(readonly),
	)
	Object.assign(
		filteredAttrs,
		filterAttribute(isBoolean)("required")(required),
	)
	Object.assign(filteredAttrs, filterAttribute(isInteger)("size")(size))
	Object.assign(filteredAttrs, filterAttribute(isString)("value")(value))
	return filteredAttrs as Record<string, Value>
}

export default filterTextAttributes
