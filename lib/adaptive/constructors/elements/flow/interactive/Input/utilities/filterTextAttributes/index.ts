import type {
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../../../../../types/index.ts"

import { AUTOCOMPLETES } from "../../../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for text-based input types
 * Validates common text input attributes
 */
export const filterTextAttributes = (attributes: Record<string, Value>) => {
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
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isString)("dirname")(dirname),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isInteger)("maxlength")(maxlength),
		...filterAttribute(isInteger)("minlength")(minlength),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("pattern")(pattern),
		...filterAttribute(isString)("placeholder")(placeholder),
		...filterAttribute(isBoolean)("readonly")(readonly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isInteger)("size")(size),
		...filterAttribute(isString)("value")(value),
	}
}

export default filterTextAttributes
